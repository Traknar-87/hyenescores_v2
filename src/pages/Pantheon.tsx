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
  { id: 3, name: 'BIMBAM', ldh: null, france: 2, espagne: 1, italie: 2, angleterre: 3, total: 8 },
  { id: 4, name: 'COMARDINHO', ldh: 1, france: 1, espagne: 2, italie: null, angleterre: null, total: 4 },
  { id: 5, name: 'DYNAMO KEV', ldh: null, france: 2, espagne: 1, italie: null, angleterre: 1, total: 4 },
  { id: 6, name: 'WARNAQUE', ldh: null, france: 1, espagne: 1, italie: null, angleterre: null, total: 2 },
  { id: 7, name: 'MAMBA TEAM', ldh: null, france: null, espagne: null, italie: 2, angleterre: null, total: 2 },
  { id: 8, name: 'TRAKNAR FC', ldh: null, france: 1, espagne: null, italie: null, angleterre: null, total: 1 },
];

const Pantheon = () => {
  const renderCell = (value: number | null) => {
    if (value === null || value === 0) {
      return <span className="pantheon-empty-cell">–</span>;
    }
    return value;
  };

  return (
    <div className="phone-screen">
      <div className="pantheon-page">
        <div className="pantheon-page-header">
          <div className="pantheon-title-glass">
            <h1 className="pantheon-page-title">PANTHÉON</h1>
          </div>
        </div>

        <div className="pantheon-table-wrapper">
          <div className="pantheon-table-container">
            <table className="pantheon-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Équipe</th>
                  <th>🏆</th>
                  <th>🇫🇷</th>
                  <th>🇪🇸</th>
                  <th>🇮🇹</th>
                  <th>🏴󠁧󠁢󠁥󠁮󠁧󠁿</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr key={team.id} className={`pantheon-rank-${index + 1}`}>
                    <td>
                      <div className="pantheon-rank-badge">{index + 1}</div>
                    </td>
                    <td className="pantheon-team-name">{team.name}</td>
                    <td>{renderCell(team.ldh)}</td>
                    <td>{renderCell(team.france)}</td>
                    <td>{renderCell(team.espagne)}</td>
                    <td>{renderCell(team.italie)}</td>
                    <td>{renderCell(team.angleterre)}</td>
                    <td className="pantheon-total">{team.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="h-16" />
      </div>

      <BottomNav />
    </div>
  );
};

export default Pantheon;