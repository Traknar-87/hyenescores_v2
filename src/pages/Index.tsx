import BottomNav from "@/components/BottomNav";

const teams = [
  { pos: 1, name: "Milan AC", pts: 95, v: 30, n: 5, d: 18, bp: 116, bc: 97, diff: 49 },
  { pos: 2, name: "Stocky FC", pts: 86, v: 24, n: 14, d: 15, bp: 115, bc: 88, diff: 27 },
  { pos: 3, name: "BimBam", pts: 84, v: 25, n: 9, d: 19, bp: 119, bc: 96, diff: 23 },
  { pos: 4, name: "Dynamo Kev", pts: 82, v: 26, n: 4, d: 23, bp: 119, bc: 110, diff: 9 },
  { pos: 5, name: "Traknar FC", pts: 74, v: 21, n: 11, d: 21, bp: 111, bc: 106, diff: 6 },
  { pos: 6, name: "FC Grinta", pts: 74, v: 22, n: 8, d: 23, bp: 96, bc: 102, diff: -6 },
  { pos: 7, name: "Comardinho", pts: 71, v: 20, n: 11, d: 22, bp: 94, bc: 107, diff: -13 },
  { pos: 8, name: "Mamba Team", pts: 64, v: 18, n: 10, d: 25, bp: 96, bc: 110, diff: -14 },
  { pos: 9, name: "Warnaque", pts: 61, v: 17, n: 10, d: 26, bp: 94, bc: 110, diff: -16 },
  { pos: 10, name: "NopiGoal FC", pts: 61, v: 15, n: 12, d: 26, bp: 86, bc: 121, diff: -35 },
];

const getPositionClass = (pos: number) => {
  if (pos === 1) return "gold";
  if (pos <= 3) return "green";
  if (pos <= 7) return "cyan";
  if (pos <= 9) return "orange";
  return "red";
};

const getZoneClass = (pos: number) => {
  if (pos === 1) return "zone-gold";
  if (pos <= 3) return "zone-green";
  if (pos <= 7) return "zone-cyan";
  if (pos <= 9) return "zone-orange";
  return "zone-red";
};

const Index = () => {
  const progressPercent = 74;
  const currentMatchday = 53;
  const totalMatchdays = 72;

  // Calculate stroke dasharray for circular progress
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="phone-screen">
      <div className="content-container">
        {/* Title with glassmorphism + glow */}
        <div className="classement-title-glass">
          <h1 className="classement-page-title">CLASSEMENT</h1>
        </div>

        {/* Combined Menu */}
        <button className="classement-combined-menu">
          <span>🏆 Ligue des Hyènes</span>
          <span className="classement-menu-separator">•</span>
          <span>Saison 9</span>
          <span className="classement-menu-arrow">▾</span>
        </button>

        {/* Circular Progress Indicator */}
        <div className="classement-progress-row">
          <svg className="classement-progress-circle" width="36" height="36" viewBox="0 0 36 36">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00d9ff" />
                <stop offset="100%" stopColor="#00ff88" />
              </linearGradient>
            </defs>
            <circle
              cx="18"
              cy="18"
              r={radius}
              fill="none"
              stroke="rgba(0, 217, 255, 0.15)"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r={radius}
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 18 18)"
            />
            <text
              x="18"
              y="18"
              textAnchor="middle"
              dominantBaseline="central"
              className="classement-progress-text"
            >
              {progressPercent}%
            </text>
          </svg>
          <span className="classement-progress-label">
            J.{currentMatchday} / {totalMatchdays} journées
          </span>
        </div>

        {/* Ranking Table */}
        <div className="ranking-wrapper">
          <table className="ranking-table">
            <thead>
              <tr>
                <th style={{ width: "10%", paddingLeft: "12px" }}>#</th>
                <th style={{ width: "31%", textAlign: "left", paddingLeft: "10px" }}>ÉQUIPE</th>
                <th style={{ width: "15%" }}>PTS</th>
                <th style={{ width: "18%" }}>V-N-D</th>
                <th style={{ width: "16%" }}>BP-BC</th>
                <th style={{ width: "10%", paddingRight: "12px" }}>+/-</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr 
                  key={team.pos} 
                  className={`${getZoneClass(team.pos)} transition-colors duration-300`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td style={{ paddingLeft: "12px" }}>
                    <div className={`position-badge ${getPositionClass(team.pos)}`}>
                      {team.pos}
                    </div>
                  </td>
                  <td style={{ textAlign: "left", paddingLeft: "8px", paddingRight: "2px" }}>
                    <span className="team-name">{team.name}</span>
                  </td>
                  <td className="points-cell">{team.pts}</td>
                  <td className="stats-cell">
                    {team.v}-{team.n}-{team.d}
                  </td>
                  <td className="stats-cell">
                    {team.bp}-{team.bc}
                  </td>
                  <td style={{ paddingRight: "10px", textAlign: "right" }}>
                    <span className={team.diff >= 0 ? "diff-positive" : "diff-negative"}>
                      {team.diff >= 0 ? `+${team.diff}` : team.diff}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Caviste - Compact inline */}
        <div className="classement-caviste">
          <span className="classement-caviste-label">Caviste :</span>
          <span className="classement-caviste-value">GUNNERS</span>
        </div>

        <div className="h-12" />
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;
