import BottomNav from "@/components/BottomNav";

interface TeamStats {
  id: number;
  name: string;
  ldh: number | null;
  france: number | null;
  espagne: number | null;
  italie: number | null;
  angleterre: number | null;
  total: number;
}

const teams: TeamStats[] = [
  { id: 1, name: 'MILAN AC', ldh: 5, france: 1, espagne: 2, italie: 2, angleterre: 2, total: 12 },
  { id: 2, name: 'STOCKY FC', ldh: 2, france: 1, espagne: 1, italie: 1, angleterre: 2, total: 7 },
  { id: 3, name: 'COMARDINHO', ldh: 1, france: 1, espagne: 2, italie: null, angleterre: null, total: 4 },
  { id: 4, name: 'BIMBAM', ldh: null, france: 2, espagne: 1, italie: 2, angleterre: 3, total: 8 },
  { id: 5, name: 'DYNAMO KEV', ldh: null, france: 2, espagne: 1, italie: null, angleterre: 1, total: 4 },
  { id: 6, name: 'WARNAQUE', ldh: null, france: 1, espagne: 1, italie: null, angleterre: null, total: 2 },
  { id: 7, name: 'MAMBA TEAM', ldh: null, france: null, espagne: null, italie: 2, angleterre: null, total: 2 },
  { id: 8, name: 'TRAKNAR FC', ldh: null, france: 1, espagne: null, italie: null, angleterre: null, total: 1 },
];

// Panthéon: Gold for #1, Cyan for all others
const getBadgeColor = (position: number): string => {
  return position === 1 ? "gold" : "cyan";
};

const Pantheon = () => {
  const renderCell = (value: number | null) => {
    if (value === null || value === 0) {
      return <span className="ds-empty">–</span>;
    }
    return value;
  };

  return (
    <div className="ds-page">
      {/* Title with glassmorphism + glow */}
      <div className="ds-page-title">
        <h1>Panthéon</h1>
      </div>

      {/* Table Card */}
      <div className="ds-card">
        <table className="ds-table">
          <thead>
            <tr>
              <th style={{ width: "36px" }}>#</th>
              <th className="left">Équipe</th>
              <th style={{ width: "32px" }}>🏆</th>
              <th style={{ width: "32px" }}>🇫🇷</th>
              <th style={{ width: "32px" }}>🇪🇸</th>
              <th style={{ width: "32px" }}>🇮🇹</th>
              <th style={{ width: "32px" }}>🏴󠁧󠁢󠁥󠁮󠁧󠁿</th>
              <th style={{ width: "45px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => {
              const position = index + 1;
              const badgeColor = getBadgeColor(position);
              const isChampion = position === 1;
              
              return (
                <tr key={team.id}>
                  <td>
                    <span className={`ds-badge ${badgeColor}`}>{position}</span>
                  </td>
                  <td className="left">
                    <span className="ds-team-name">{team.name}</span>
                  </td>
                  <td>{renderCell(team.ldh)}</td>
                  <td>{renderCell(team.france)}</td>
                  <td>{renderCell(team.espagne)}</td>
                  <td>{renderCell(team.italie)}</td>
                  <td>{renderCell(team.angleterre)}</td>
                  <td>
                    <span className={`ds-total ${isChampion ? "gold" : ""}`}>
                      {team.total}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <BottomNav />
    </div>
  );
};

export default Pantheon;
