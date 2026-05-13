import { Nav } from "../components/Nav";
import { Score } from "../components/Score";

const stages = [
  { name: "Prospecting", count: 18, value: "$640k", color: "#E8E8E4" },
  { name: "Discovery", count: 11, value: "$820k", color: "#B8A060" },
  { name: "Proposal", count: 7, value: "$910k", color: "#E8FF5A" },
  { name: "Negotiation", count: 4, value: "$680k", color: "#E8FF5A" },
  { name: "Closed Won", count: 9, value: "$540k", color: "#E8FF5A" },
];

const wonByMonth = [
  { month: "Jan", value: 3, arr: "$120k" },
  { month: "Feb", value: 5, arr: "$210k" },
  { month: "Mar", value: 4, arr: "$180k" },
  { month: "Apr", value: 7, arr: "$310k" },
  { month: "May", value: 9, arr: "$540k" },
];
const maxWon = Math.max(...wonByMonth.map((m) => m.value));

const scoreDistribution = [
  { range: "0–24", count: 3, color: "#E05252" },
  { range: "25–49", count: 7, color: "#E05252" },
  { range: "50–74", count: 12, color: "#B8A060" },
  { range: "75–100", count: 14, color: "#E8FF5A" },
];
const maxDist = Math.max(...scoreDistribution.map((d) => d.count));

const topReps = [
  { name: "Tom B.", won: 4, arr: "$240k", winRate: 80, score: 88 },
  { name: "Sarah K.", won: 3, arr: "$360k", winRate: 75, score: 84 },
  { name: "Maria T.", won: 2, arr: "$400k", winRate: 50, score: 71 },
  { name: "James L.", won: 0, arr: "$0", winRate: 0, score: 61 },
];

const metrics = [
  { label: "Pipeline Value", value: "$3.1M", sub: "+18% vs last quarter" },
  { label: "Win Rate", value: "36%", sub: "+4 pts vs last quarter" },
  { label: "Avg Deal Size", value: "$96k", sub: "Median $84k" },
  { label: "Avg Sales Cycle", value: "42d", sub: "-6 days vs last quarter" },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <Nav />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-[#0F0F0F] tracking-tight">Analytics</h1>
          <p className="text-sm text-[#0F0F0F]/50 mt-0.5">Pipeline health · Q2 2026</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-5 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]"
            >
              <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest mb-2">
                {m.label}
              </p>
              <p className="text-3xl font-black text-[#0F0F0F]">{m.value}</p>
              <p className="text-xs text-[#B8A060] mt-1 font-medium">{m.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
            <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest mb-6">
              Pipeline by Stage
            </p>
            <div className="flex flex-col gap-4">
              {stages.map((s) => {
                const pct = (s.count / 18) * 100;
                return (
                  <div key={s.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-[#0F0F0F]">{s.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#0F0F0F]/50">{s.count} deals</span>
                        <span className="text-xs font-bold text-[#0F0F0F]">{s.value}</span>
                      </div>
                    </div>
                    <div className="h-2.5 bg-[#F8F7F4] rounded-full overflow-hidden">
                      <div
                        className="h-2.5 rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: s.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
            <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest mb-6">
              Closed Won by Month
            </p>
            <div className="flex items-end gap-3 h-40">
              {wonByMonth.map((m) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-bold text-[#0F0F0F]/60">{m.arr}</span>
                  <div className="w-full flex items-end" style={{ height: "80px" }}>
                    <div
                      className="w-full rounded-t-lg bg-[#E8FF5A] transition-all"
                      style={{ height: `${(m.value / maxWon) * 80}px` }}
                    />
                  </div>
                  <span className="text-xs text-[#0F0F0F]/40 font-medium">{m.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
            <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest mb-6">
              Deal Score Distribution
            </p>
            <div className="flex items-end gap-4 h-36">
              {scoreDistribution.map((d) => (
                <div key={d.range} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-bold text-[#0F0F0F]">{d.count}</span>
                  <div
                    className="w-full rounded-t-lg transition-all"
                    style={{
                      height: `${(d.count / maxDist) * 100}px`,
                      backgroundColor: d.color,
                    }}
                  />
                  <span className="text-xs text-[#0F0F0F]/40 font-medium">{d.range}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#E05252]" />At risk</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#B8A060]" />Moderate</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#E8FF5A]" />Strong</span>
            </div>
          </div>

          <div className="bg-[#0F0F0F] rounded-2xl p-6">
            <p className="text-xs font-semibold text-[#F8F7F4]/40 uppercase tracking-widest mb-6">
              Pipeline Health Score
            </p>
            <div className="flex justify-center mb-6">
              <Score value={73} label="Overall Health" size="lg" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-black" style={{ color: "#E8FF5A" }}>14</p>
                <p className="text-xs text-[#F8F7F4]/40 mt-1">Strong</p>
              </div>
              <div>
                <p className="text-2xl font-black" style={{ color: "#B8A060" }}>12</p>
                <p className="text-xs text-[#F8F7F4]/40 mt-1">Moderate</p>
              </div>
              <div>
                <p className="text-2xl font-black" style={{ color: "#E05252" }}>10</p>
                <p className="text-xs text-[#F8F7F4]/40 mt-1">At Risk</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
          <p className="text-xs font-semibold text-[#0F0F0F]/40 uppercase tracking-widest mb-5">
            Rep Leaderboard · Q2 2026
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-[#0F0F0F]/40 font-semibold uppercase tracking-widest">
                  <th className="text-left pb-3">Rep</th>
                  <th className="text-right pb-3">Won</th>
                  <th className="text-right pb-3">ARR</th>
                  <th className="text-right pb-3">Win Rate</th>
                  <th className="text-right pb-3">Avg Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E4]">
                {topReps.map((r, i) => (
                  <tr key={r.name}>
                    <td className="py-3 font-semibold text-[#0F0F0F] flex items-center gap-2">
                      <span className="text-xs text-[#0F0F0F]/30 w-4">{i + 1}</span>
                      {r.name}
                    </td>
                    <td className="py-3 text-right text-[#0F0F0F]/70">{r.won}</td>
                    <td className="py-3 text-right font-bold text-[#0F0F0F]">{r.arr}</td>
                    <td className="py-3 text-right">
                      <span
                        className="font-bold"
                        style={{
                          color:
                            r.winRate >= 70 ? "#22c55e" : r.winRate >= 40 ? "#B8A060" : "#E05252",
                        }}
                      >
                        {r.winRate}%
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className="font-bold"
                        style={{
                          color:
                            r.score >= 75 ? "#E8FF5A" : r.score >= 50 ? "#B8A060" : "#E05252",
                        }}
                      >
                        {r.score}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
