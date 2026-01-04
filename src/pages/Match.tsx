import { useState, useEffect, useRef, useCallback } from "react";
import Picker, { PickerValue } from "react-mobile-picker";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

// Long press hook
const useLongPress = (callback: () => void, ms: number = 800) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    timerRef.current = setTimeout(callback, ms);
  }, [callback, ms]);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchStart: start,
    onTouchEnd: clear,
  };
};

const TEAMS = [
  "MILAN AC",
  "STOCKY FC",
  "BIMBAM",
  "DYNAMO KEV",
  "TRAKNAR FC",
  "FC GRINTA",
  "COMARDINHO",
  "MAMBA TEAM",
  "WARNAQUE",
  "NOPIGOAL FC",
  "GUNNERS",
];

const CHAMPIONNATS = [
  { id: "FRANCE", flag: "🇫🇷", name: "France" },
  { id: "ESPAGNE", flag: "🇪🇸", name: "Espagne" },
  { id: "ITALIE", flag: "🇮🇹", name: "Italie" },
  { id: "ANGLETERRE", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", name: "Angleterre" },
];

const SAISONS = ["S7", "S8", "S9", "S10"];
const JOURNEES = Array.from({ length: 18 }, (_, i) => `J.${i + 1}`);

interface MatchData {
  homeTeam: string;
  awayTeam: string;
  homeScore: string;
  awayScore: string;
  validated: boolean;
}

interface JourneeData {
  championnat: string;
  season: string;
  journee: string;
  exempt: string;
  matches: Record<number, MatchData>;
}

const getStorageKey = (championnat: string, season: string, journee: string) =>
  `ldh_${championnat}_${season.toLowerCase()}_${journee.toLowerCase().replace(".", "")}`;

const createEmptyMatches = (): Record<number, MatchData> => {
  const matches: Record<number, MatchData> = {};
  for (let i = 1; i <= 5; i++) {
    matches[i] = { homeTeam: "", awayTeam: "", homeScore: "", awayScore: "", validated: false };
  }
  return matches;
};

const Match = () => {
  const [championnat, setChampionnat] = useState("FRANCE");
  const [season, setSeason] = useState("S9");
  const [journee, setJournee] = useState("J.1");
  const [exempt, setExempt] = useState("");
  const [matches, setMatches] = useState<Record<number, MatchData>>(createEmptyMatches);
  const [showPicker, setShowPicker] = useState(false);
  const [showImportMenu, setShowImportMenu] = useState(false);
  const [showResetModal, setShowResetModal] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState<number | null>(null);
  const [showExemptPicker, setShowExemptPicker] = useState(false);
  const [pickerValue, setPickerValue] = useState({ championnat: "FRANCE", season: "S9", journee: "J.1" });
  const [journeeStats, setJourneeStats] = useState<Record<string, number>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const seasonFileInputRef = useRef<HTMLInputElement>(null);

  // Load data from localStorage
  const loadData = useCallback(() => {
    const key = getStorageKey(championnat, season, journee);
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const data: JourneeData = JSON.parse(saved);
        setExempt(data.exempt || "");
        setMatches(data.matches || createEmptyMatches());
      } catch {
        setExempt("");
        setMatches(createEmptyMatches());
      }
    } else {
      setExempt("");
      setMatches(createEmptyMatches());
    }
  }, [championnat, season, journee]);

  // Save data to localStorage
  const saveData = useCallback(() => {
    const key = getStorageKey(championnat, season, journee);
    const data: JourneeData = { championnat, season, journee, exempt, matches };
    localStorage.setItem(key, JSON.stringify(data));
    updateJourneeStats();
  }, [championnat, season, journee, exempt, matches]);

  // Update journee stats (count validated matches)
  const updateJourneeStats = useCallback(() => {
    const stats: Record<string, number> = {};
    JOURNEES.forEach((j) => {
      const key = getStorageKey(championnat, season, j);
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          const data: JourneeData = JSON.parse(saved);
          stats[j] = Object.values(data.matches).filter((m) => m.validated).length;
        } catch {
          stats[j] = 0;
        }
      } else {
        stats[j] = 0;
      }
    });
    setJourneeStats(stats);
  }, [championnat, season]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    saveData();
  }, [exempt, matches]);

  useEffect(() => {
    updateJourneeStats();
  }, [updateJourneeStats]);

  const validatedCount = Object.values(matches).filter((m) => m.validated).length;
  const allValidated = validatedCount === 5;

  const getUsedTeams = (excludeMatchIndex?: number) => {
    const used = new Set<string>();
    if (exempt) used.add(exempt);
    Object.entries(matches).forEach(([idx, m]) => {
      if (excludeMatchIndex !== undefined && parseInt(idx) === excludeMatchIndex) return;
      if (m.homeTeam) used.add(m.homeTeam);
      if (m.awayTeam) used.add(m.awayTeam);
    });
    return used;
  };

  const validateMatch = (matchIndex: number) => {
    const match = matches[matchIndex];
    if (!match.homeTeam || !match.awayTeam) return;
    if (match.homeScore === "" || match.awayScore === "") return;

    if (match.homeTeam === match.awayTeam) {
      toast.error("❌ Une équipe ne peut pas jouer contre elle-même !");
      return;
    }

    if (match.homeTeam === exempt || match.awayTeam === exempt) {
      toast.warning("⚠️ L'équipe exempte ne peut pas jouer !");
      return;
    }

    setMatches((prev) => ({
      ...prev,
      [matchIndex]: { ...prev[matchIndex], validated: true },
    }));
    toast.success("✓ Match validé !");
  };

  const handleScoreChange = (matchIndex: number, field: "homeScore" | "awayScore", value: string) => {
    const num = parseInt(value);
    if (value !== "" && (isNaN(num) || num < 0 || num > 20)) {
      toast.error("Score invalide ! Utilisez 0-20");
      return;
    }
    setMatches((prev) => ({
      ...prev,
      [matchIndex]: { ...prev[matchIndex], [field]: value, validated: false },
    }));
  };

  const handleTeamChange = (matchIndex: number, field: "homeTeam" | "awayTeam", value: string) => {
    setMatches((prev) => ({
      ...prev,
      [matchIndex]: { ...prev[matchIndex], [field]: value, validated: false },
    }));
  };

  const resetMatch = (matchIndex: number) => {
    setMatches((prev) => ({
      ...prev,
      [matchIndex]: { homeTeam: "", awayTeam: "", homeScore: "", awayScore: "", validated: false },
    }));
    setShowResetModal(null);
    toast.success("Match réinitialisé");
  };

  const enableMatchEdit = (matchIndex: number) => {
    setMatches((prev) => ({
      ...prev,
      [matchIndex]: { ...prev[matchIndex], validated: false },
    }));
    setShowEditModal(null);
    toast.success("Match déverrouillé pour édition");
  };

  const handleExemptChange = (value: string) => {
    // Check if team is used in matches
    const used = getUsedTeams();
    if (used.has(value) && value !== exempt) {
      toast.warning("⚠️ Cette équipe est déjà dans un match !");
      return;
    }
    setExempt(value);
  };

  const applyPickerSelection = () => {
    setChampionnat(pickerValue.championnat);
    setSeason(pickerValue.season);
    setJournee(pickerValue.journee);
    setShowPicker(false);
  };

  // CSV Import handlers
  const parseCSV = (content: string): MatchData[] => {
    const lines = content.trim().split("\n");
    const matches: MatchData[] = [];
    
    lines.forEach((line, idx) => {
      if (idx === 0 && line.toLowerCase().includes("home")) return; // Skip header
      const parts = line.split(/[,;]/).map(p => p.trim().toUpperCase());
      if (parts.length >= 4) {
        const homeTeam = parts[0];
        const homeScore = parts[1];
        const awayScore = parts[2];
        const awayTeam = parts[3];
        
        if (TEAMS.includes(homeTeam) && TEAMS.includes(awayTeam)) {
          const hScore = parseInt(homeScore);
          const aScore = parseInt(awayScore);
          if (!isNaN(hScore) && !isNaN(aScore) && hScore >= 0 && hScore <= 20 && aScore >= 0 && aScore <= 20) {
            matches.push({
              homeTeam,
              awayTeam,
              homeScore: homeScore,
              awayScore: awayScore,
              validated: true
            });
          }
        }
      }
    });
    return matches;
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>, isSeason: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const parsedMatches = parseCSV(content);
      
      if (parsedMatches.length === 0) {
        toast.error("Aucun match valide trouvé dans le fichier");
        return;
      }

      if (!isSeason) {
        // Import single journée
        const newMatches: Record<number, MatchData> = createEmptyMatches();
        parsedMatches.slice(0, 5).forEach((m, i) => {
          newMatches[i + 1] = m;
        });
        setMatches(newMatches);
        toast.success(`${Math.min(parsedMatches.length, 5)} matchs importés !`);
      } else {
        // Import full season (multiple journées)
        // Simplified: just import current journée
        const newMatches: Record<number, MatchData> = createEmptyMatches();
        parsedMatches.slice(0, 5).forEach((m, i) => {
          newMatches[i + 1] = m;
        });
        setMatches(newMatches);
        toast.success(`Saison importée: ${parsedMatches.length} matchs !`);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
    setShowImportMenu(false);
  };

  const currentChamp = CHAMPIONNATS.find(c => c.id === championnat);

  const pickerSelections = {
    championnat: CHAMPIONNATS.map(c => c.id),
    season: SAISONS,
    journee: JOURNEES
  };

  return (
    <div className="phone-screen">
      <div className="content-container match-content">
        {/* Title with glassmorphism + glow */}
        <div className="match-title-glass">
          <h1 className="match-page-title">MATCH</h1>
        </div>

        {/* 4-Segment Selection Bar */}
        <div className="match-segment-bar">
          <button 
            className="match-segment"
            onClick={() => {
              setPickerValue({ championnat, season, journee });
              setShowPicker(true);
            }}
          >
            <span className="match-segment-icon">{currentChamp?.flag}</span>
            <span className="match-segment-label">{currentChamp?.name}</span>
          </button>
          <button 
            className="match-segment"
            onClick={() => {
              setPickerValue({ championnat, season, journee });
              setShowPicker(true);
            }}
          >
            <span className="match-segment-icon">📅</span>
            <span className="match-segment-label">{season}</span>
          </button>
          <button 
            className="match-segment"
            onClick={() => {
              setPickerValue({ championnat, season, journee });
              setShowPicker(true);
            }}
          >
            <span className="match-segment-icon">⚽</span>
            <span className="match-segment-label">{journee} ({validatedCount}/5)</span>
          </button>
          <button 
            className="match-segment match-segment-import"
            onClick={() => setShowImportMenu(!showImportMenu)}
          >
            <span className="match-segment-icon">📤</span>
            <span className="match-segment-label">Import</span>
          </button>
          {showImportMenu && (
            <div className="import-menu match-import-menu">
              <button onClick={() => fileInputRef.current?.click()}>
                📄 Import Journée
              </button>
              <button onClick={() => seasonFileInputRef.current?.click()}>
                📚 Import Saison
              </button>
            </div>
          )}
        </div>

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.txt"
          className="hidden"
          onChange={(e) => handleFileImport(e, false)}
        />
        <input
          ref={seasonFileInputRef}
          type="file"
          accept=".csv,.txt"
          className="hidden"
          onChange={(e) => handleFileImport(e, true)}
        />

        {/* Tableau des Matchs */}
        <div className="matches-card">
          <div className="matches-header">
            <span>ÉQUIPE DOM.</span>
            <span>SCORE</span>
            <span>ÉQUIPE EXT.</span>
          </div>

          {[1, 2, 3, 4, 5].map((matchIdx) => {
            const match = matches[matchIdx];
            const usedTeams = getUsedTeams(matchIdx);
            
            // Long press handler for validated matches
            const longPressHandlers = useLongPress(() => {
              if (match.validated) {
                setShowEditModal(matchIdx);
              }
            }, 800);

            return (
              <div
                key={matchIdx}
                className={`match-row ${match.validated ? "validated" : ""} ${matchIdx === 1 ? "first" : ""}`}
                {...(match.validated ? longPressHandlers : {})}
              >
                {/* Small discrete checkmark for validated matches */}
                {match.validated && <span className="match-validated-check">✓</span>}
                
                {/* Home Team Select */}
                <select
                  className="team-select"
                  value={match.homeTeam}
                  onChange={(e) => handleTeamChange(matchIdx, "homeTeam", e.target.value)}
                  disabled={match.validated}
                >
                  <option value="">—</option>
                  {TEAMS
                    .filter(team => !usedTeams.has(team) || team === match.homeTeam)
                    .filter(team => team !== exempt)
                    .map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                </select>

                {/* Score inputs */}
                <div className="score-container">
                  <input
                    type="number"
                    className="score-input"
                    min="0"
                    max="20"
                    placeholder="-"
                    value={match.homeScore}
                    onChange={(e) => handleScoreChange(matchIdx, "homeScore", e.target.value)}
                    disabled={match.validated}
                  />
                  <span className="vs-separator">VS</span>
                  <input
                    type="number"
                    className="score-input"
                    min="0"
                    max="20"
                    placeholder="-"
                    value={match.awayScore}
                    onChange={(e) => handleScoreChange(matchIdx, "awayScore", e.target.value)}
                    disabled={match.validated}
                  />
                </div>

                {/* Away Team Select */}
                <select
                  className="team-select"
                  value={match.awayTeam}
                  onChange={(e) => handleTeamChange(matchIdx, "awayTeam", e.target.value)}
                  disabled={match.validated}
                >
                  <option value="">—</option>
                  {TEAMS
                    .filter(team => !usedTeams.has(team) || team === match.awayTeam)
                    .filter(team => team !== exempt)
                    .map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                </select>

                {/* Auto-validate button */}
                {!match.validated && match.homeTeam && match.awayTeam && match.homeScore !== "" && match.awayScore !== "" && (
                  <button
                    className="auto-validate-btn"
                    onClick={() => validateMatch(matchIdx)}
                  >
                    ✓
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Exempt Card - Bottom */}
        <div 
          className="match-exempt-bottom"
          onClick={() => setShowExemptPicker(true)}
        >
          <span className="match-exempt-label">Exempt :</span>
          <span className="match-exempt-value">{exempt || "— Sélectionner —"}</span>
          <span className="match-exempt-arrow">▾</span>
        </div>

        <div className="h-20" />
      </div>

      <BottomNav />

      {/* Wheel Picker Modal */}
      {showPicker && (
        <div className="picker-overlay" onClick={() => setShowPicker(false)}>
          <div className="picker-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="picker-title">SÉLECTION</h2>

            {/* Section 1: Championnats Horizontal */}
            <div className="picker-section">
              <span className="picker-section-label">CHAMPIONNAT</span>
              <div className="championnat-selector">
                {CHAMPIONNATS.map((c) => (
                  <button
                    key={c.id}
                    className={`championnat-item ${pickerValue.championnat === c.id ? "selected" : ""}`}
                    onClick={() => setPickerValue(prev => ({ ...prev, championnat: c.id }))}
                  >
                    <span className="championnat-flag">{c.flag}</span>
                    <span className="championnat-name">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 2: Saison + Journée Vertical */}
            <div className="picker-labels-bottom">
              <span>SAISON</span>
              <span>JOURNÉE</span>
            </div>

            <Picker
              value={{ season: pickerValue.season, journee: pickerValue.journee }}
              onChange={(value: PickerValue) => setPickerValue(prev => ({
                ...prev,
                season: String(value.season),
                journee: String(value.journee)
              }))}
              wheelMode="natural"
              height={180}
            >
              <Picker.Column name="season">
                {SAISONS.map((s) => (
                  <Picker.Item key={s} value={s}>
                    {({ selected }) => (
                      <span className={`picker-item ${selected ? "selected" : ""}`}>
                        {s}
                      </span>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
              <Picker.Column name="journee">
                {JOURNEES.map((j) => (
                  <Picker.Item key={j} value={j}>
                    {({ selected }) => (
                      <span className={`picker-item journee ${selected ? "selected" : ""}`}>
                        {j} <span className={`journee-status ${journeeStats[j] === 5 ? "complete" : journeeStats[j] > 0 ? "partial" : ""}`}>({journeeStats[j] || 0}/5)</span>
                      </span>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
            </Picker>

            <div className="picker-buttons">
              <button className="picker-btn cancel" onClick={() => setShowPicker(false)}>
                ANNULER
              </button>
              <button className="picker-btn confirm" onClick={applyPickerSelection}>
                VALIDER
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetModal !== null && (
        <div className="reset-overlay" onClick={() => setShowResetModal(null)}>
          <div className="reset-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Réinitialiser ce match ?</h3>
            <p>Cette action effacera les équipes et scores de ce match.</p>
            <div className="reset-buttons">
              <button className="reset-modal-btn cancel" onClick={() => setShowResetModal(null)}>
                ANNULER
              </button>
              <button className="reset-modal-btn confirm" onClick={() => resetMatch(showResetModal)}>
                CONFIRMER
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Confirmation Modal (Long Press) */}
      {showEditModal !== null && (
        <div className="reset-overlay" onClick={() => setShowEditModal(null)}>
          <div className="reset-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Éditer ce match ?</h3>
            <p>Cette action déverrouillera le match pour modification.</p>
            <div className="reset-buttons">
              <button className="reset-modal-btn cancel" onClick={() => setShowEditModal(null)}>
                ANNULER
              </button>
              <button className="reset-modal-btn confirm" onClick={() => enableMatchEdit(showEditModal)}>
                ÉDITER
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exempt Picker Modal */}
      {showExemptPicker && (
        <div className="picker-overlay" onClick={() => setShowExemptPicker(false)}>
          <div className="exempt-picker-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="picker-title">ÉQUIPE EXEMPTE</h2>
            <div className="exempt-team-list">
              <button 
                className={`exempt-team-item ${exempt === "" ? "selected" : ""}`}
                onClick={() => { setExempt(""); setShowExemptPicker(false); }}
              >
                <span className="exempt-team-name">— Aucune —</span>
              </button>
              {TEAMS
                .filter(team => !getUsedTeams().has(team) || team === exempt)
                .map((team) => (
                  <button
                    key={team}
                    className={`exempt-team-item ${exempt === team ? "selected" : ""}`}
                    onClick={() => { handleExemptChange(team); setShowExemptPicker(false); }}
                  >
                    <span className="exempt-team-name">{team}</span>
                    {exempt === team && <span className="exempt-team-check">✓</span>}
                  </button>
                ))}
            </div>
            <button className="picker-btn cancel" onClick={() => setShowExemptPicker(false)}>
              FERMER
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Match;
