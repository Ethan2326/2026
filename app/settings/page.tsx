"use client";
import { useState } from "react";
import { Nav } from "../components/Nav";

type Tab = "profile" | "integrations" | "notifications" | "team";

const INTEGRATIONS = [
  { id: "salesforce", name: "Salesforce", desc: "Sync deals, contacts, and activity.", icon: "☁️", connected: true },
  { id: "gong", name: "Gong", desc: "Pull call recordings and transcripts.", icon: "🎙️", connected: true },
  { id: "slack", name: "Slack", desc: "Get score alerts and suggestions in Slack.", icon: "💬", connected: false },
  { id: "hubspot", name: "HubSpot", desc: "Sync pipeline data from HubSpot CRM.", icon: "🟠", connected: false },
  { id: "zoom", name: "Zoom", desc: "Join and coach live calls via Zoom.", icon: "📹", connected: false },
  { id: "gmail", name: "Gmail", desc: "Track email opens and replies.", icon: "✉️", connected: false },
];

const TEAM = [
  { name: "Sarah K.", email: "sarah@acme.co", role: "Admin", avatar: "SK", active: true },
  { name: "James L.", email: "james@acme.co", role: "Rep", avatar: "JL", active: true },
  { name: "Maria T.", email: "maria@acme.co", role: "Rep", avatar: "MT", active: true },
  { name: "Tom B.", email: "tom@acme.co", role: "Rep", avatar: "TB", active: false },
];

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("profile");
  const [integrations, setIntegrations] = useState(INTEGRATIONS);
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({
    scoreDrop: true,
    newSuggestion: true,
    callEnded: false,
    weeklyDigest: true,
    meddicGap: false,
  });

  function toggleIntegration(id: string) {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, connected: !i.connected } : i))
    );
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "profile", label: "Profile" },
    { id: "integrations", label: "Integrations" },
    { id: "notifications", label: "Notifications" },
    { id: "team", label: "Team" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <Nav />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-[#0F0F0F] tracking-tight">Settings</h1>
          <p className="text-sm text-[#0F0F0F]/50 mt-0.5">Manage your account and workspace</p>
        </div>

        <div className="flex gap-1 mb-8 bg-[#FFFFFF] border border-[#E8E8E4] rounded-full p-1 w-fit shadow-[0_1px_3px_0_rgb(0_0_0/0.04)]">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                tab === t.id ? "bg-[#0F0F0F] text-[#F8F7F4]" : "text-[#0F0F0F]/60 hover:text-[#0F0F0F]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "profile" && (
          <form onSubmit={handleSave} className="flex flex-col gap-5 max-w-lg">
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
              <h2 className="text-sm font-bold text-[#0F0F0F] mb-5">Personal info</h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#E8FF5A] flex items-center justify-center text-xl font-black text-[#0F0F0F]">
                  SK
                </div>
                <div>
                  <button type="button" className="text-sm font-semibold text-[#B8A060] hover:text-[#0F0F0F] transition-colors">
                    Change photo
                  </button>
                  <p className="text-xs text-[#0F0F0F]/40 mt-0.5">JPG or PNG, max 2MB</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { label: "Full name", placeholder: "Sarah Kim", defaultVal: "Sarah K." },
                  { label: "Work email", placeholder: "sarah@acme.co", defaultVal: "sarah@acme.co" },
                  { label: "Job title", placeholder: "Account Executive", defaultVal: "Account Executive" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs font-semibold text-[#0F0F0F]/50 uppercase tracking-widest block mb-1.5">
                      {f.label}
                    </label>
                    <input
                      defaultValue={f.defaultVal}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E4] bg-[#F8F7F4] text-sm text-[#0F0F0F] outline-none focus:border-[#0F0F0F]/40 transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
              <h2 className="text-sm font-bold text-[#0F0F0F] mb-5">Workspace</h2>
              <div className="flex flex-col gap-4">
                {[
                  { label: "Workspace name", defaultVal: "Acme Corp Sales" },
                  { label: "Workspace URL", defaultVal: "acme-corp.2026.ai" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs font-semibold text-[#0F0F0F]/50 uppercase tracking-widest block mb-1.5">
                      {f.label}
                    </label>
                    <input
                      defaultValue={f.defaultVal}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E4] bg-[#F8F7F4] text-sm text-[#0F0F0F] outline-none focus:border-[#0F0F0F]/40 transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className={`w-fit px-8 py-3 rounded-full font-bold text-sm transition-colors ${
                saved ? "bg-[#E8FF5A] text-[#0F0F0F]" : "bg-[#0F0F0F] text-[#F8F7F4] hover:bg-[#0F0F0F]/80"
              }`}
            >
              {saved ? "Saved ✓" : "Save changes"}
            </button>
          </form>
        )}

        {tab === "integrations" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {integrations.map((intg) => (
              <div
                key={intg.id}
                className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-5 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)] flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{intg.icon}</span>
                  <div>
                    <p className="font-bold text-[#0F0F0F] text-sm">{intg.name}</p>
                    <p className="text-xs text-[#0F0F0F]/50 mt-0.5 leading-relaxed">{intg.desc}</p>
                    {intg.connected && (
                      <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-[#B8A060]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8A060]" />
                        Connected
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => toggleIntegration(intg.id)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    intg.connected
                      ? "bg-[#F8F7F4] border border-[#E8E8E4] text-[#E05252] hover:bg-[#E05252]/10"
                      : "bg-[#E8FF5A] text-[#0F0F0F] hover:bg-[#E8FF5A]/80"
                  }`}
                >
                  {intg.connected ? "Disconnect" : "Connect"}
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "notifications" && (
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)] max-w-lg">
            <h2 className="text-sm font-bold text-[#0F0F0F] mb-5">Email & push notifications</h2>
            <div className="flex flex-col divide-y divide-[#E8E8E4]">
              {(
                [
                  { key: "scoreDrop", label: "Deal score drops", desc: "Alert when a deal drops more than 10 points." },
                  { key: "newSuggestion", label: "New suggestion", desc: "Notify when a new high-impact suggestion is generated." },
                  { key: "callEnded", label: "Call ended", desc: "Summary after each coaching session." },
                  { key: "weeklyDigest", label: "Weekly digest", desc: "Pipeline health summary every Monday." },
                  { key: "meddicGap", label: "MEDDIC gap detected", desc: "Alert when a deal has fewer than 4 criteria covered." },
                ] as { key: keyof typeof notifs; label: string; desc: string }[]
              ).map((n) => (
                <div key={n.key} className="flex items-center justify-between py-4 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#0F0F0F]">{n.label}</p>
                    <p className="text-xs text-[#0F0F0F]/50 mt-0.5">{n.desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifs((prev) => ({ ...prev, [n.key]: !prev[n.key] }))}
                    className={`shrink-0 w-10 h-6 rounded-full transition-colors relative ${
                      notifs[n.key] ? "bg-[#0F0F0F]" : "bg-[#E8E8E4]"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                        notifs[n.key] ? "left-5" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "team" && (
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-bold text-[#0F0F0F]">Team members</h2>
                <button className="bg-[#E8FF5A] text-[#0F0F0F] text-xs font-bold px-4 py-2 rounded-full hover:bg-[#E8FF5A]/80 transition-colors">
                  + Invite
                </button>
              </div>
              <div className="flex flex-col divide-y divide-[#E8E8E4]">
                {TEAM.map((member) => (
                  <div key={member.email} className="flex items-center justify-between py-3.5 gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                          member.active ? "bg-[#E8FF5A] text-[#0F0F0F]" : "bg-[#E8E8E4] text-[#0F0F0F]/40"
                        }`}
                      >
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0F0F0F]">{member.name}</p>
                        <p className="text-xs text-[#0F0F0F]/40">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        member.role === "Admin"
                          ? "bg-[#0F0F0F] text-[#F8F7F4]"
                          : "bg-[#F8F7F4] border border-[#E8E8E4] text-[#0F0F0F]/60"
                      }`}>
                        {member.role}
                      </span>
                      {!member.active && (
                        <span className="text-xs text-[#E05252] font-medium">Inactive</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
              <h2 className="text-sm font-bold text-[#0F0F0F] mb-2">Invite by link</h2>
              <p className="text-xs text-[#0F0F0F]/50 mb-4">Share this link to invite teammates to your workspace.</p>
              <div className="flex gap-2">
                <div className="flex-1 bg-[#F8F7F4] border border-[#E8E8E4] rounded-xl px-4 py-2.5 text-xs text-[#0F0F0F]/60 font-mono truncate">
                  acme-corp.2026.ai/invite/Xk9mP2vL
                </div>
                <button className="shrink-0 bg-[#0F0F0F] text-[#F8F7F4] text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#0F0F0F]/80 transition-colors">
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
