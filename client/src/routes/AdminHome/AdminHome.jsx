import { useQuery } from "@tanstack/react-query";
import React from "react";
import apiRequest from "../../lib/apiRequest";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .adh-root {
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    background: #f5f5fb;
    padding: 32px 20px 60px;
  }

  /* ── Header ── */
  .adh-header {
    margin-bottom: 36px;
  }

  .adh-header-inner {
    background: linear-gradient(135deg, #1a1040 0%, #2d1b69 50%, #1e3a8a 100%);
    border-radius: 20px;
    padding: 36px 40px;
    position: relative;
    overflow: hidden;
  }

  .adh-header-inner::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 220px; height: 220px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }

  .adh-header-inner::after {
    content: '';
    position: absolute;
    bottom: -40px; left: 30%;
    width: 160px; height: 160px;
    border-radius: 50%;
    background: rgba(255,255,255,0.03);
  }

  .adh-title {
    font-family: 'Sora', sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: #fff;
    margin: 0 0 6px;
    position: relative;
    z-index: 1;
  }

  .adh-subtitle {
    font-size: 14px;
    color: rgba(255,255,255,0.55);
    margin: 0;
    position: relative;
    z-index: 1;
  }

  .adh-header-badge {
    position: absolute;
    top: 28px; right: 36px;
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 30px;
    padding: 6px 16px;
    font-size: 12px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .adh-live-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 0 0 rgba(74,222,128,0.4);
    animation: adh-pulse 1.8s infinite;
  }

  @keyframes adh-pulse {
    0%   { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
    70%  { box-shadow: 0 0 0 7px rgba(74,222,128,0); }
    100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
  }

  /* ── Section label ── */
  .adh-section-label {
    font-family: 'Sora', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #9ca3af;
    margin-bottom: 14px;
    padding-left: 2px;
  }

  /* ── Stat cards ── */
  .adh-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
    gap: 14px;
    margin-bottom: 28px;
  }

  .adh-stat-card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #ececf2;
    padding: 20px 18px 18px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    transition: transform 0.25s, box-shadow 0.25s;
    position: relative;
    overflow: hidden;
  }

  .adh-stat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  }

  /* accent stripe top */
  .adh-stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    border-radius: 16px 16px 0 0;
    background: var(--card-accent, #e5e7eb);
  }

  .adh-stat-card.c-total   { --card-accent: linear-gradient(90deg,#5346f3,#7c6ff7); }
  .adh-stat-card.c-pending { --card-accent: linear-gradient(90deg,#f59e0b,#fbbf24); }
  .adh-stat-card.c-accepted{ --card-accent: linear-gradient(90deg,#10b981,#34d399); }
  .adh-stat-card.c-rejected{ --card-accent: linear-gradient(90deg,#ef4444,#f87171); }
  .adh-stat-card.c-disabled{ --card-accent: linear-gradient(90deg,#6b7280,#9ca3af); }
  .adh-stat-card.c-users   { --card-accent: linear-gradient(90deg,#0ea5e9,#38bdf8); }

  .adh-stat-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 14px;
    font-size: 17px;
  }

  .adh-stat-card.c-total    .adh-stat-icon { background: #ede9fe; }
  .adh-stat-card.c-pending  .adh-stat-icon { background: #fef3c7; }
  .adh-stat-card.c-accepted .adh-stat-icon { background: #d1fae5; }
  .adh-stat-card.c-rejected .adh-stat-icon { background: #fee2e2; }
  .adh-stat-card.c-disabled .adh-stat-icon { background: #f3f4f6; }
  .adh-stat-card.c-users    .adh-stat-icon { background: #e0f2fe; }

  .adh-stat-val {
    font-family: 'Sora', sans-serif;
    font-size: 30px;
    font-weight: 800;
    line-height: 1;
    color: #0d0d1a;
  }

  .adh-stat-card.c-pending  .adh-stat-val { color: #d97706; }
  .adh-stat-card.c-accepted .adh-stat-val { color: #059669; }
  .adh-stat-card.c-rejected .adh-stat-val { color: #dc2626; }
  .adh-stat-card.c-disabled .adh-stat-val { color: #6b7280; }
  .adh-stat-card.c-users    .adh-stat-val { color: #0284c7; }

  .adh-stat-label {
    font-size: 12.5px;
    color: #9ca3af;
    font-weight: 500;
    margin-top: 4px;
  }

  /* skeleton shimmer */
  .adh-skeleton {
    background: linear-gradient(90deg, #f0f0f5 25%, #e8e8f0 50%, #f0f0f5 75%);
    background-size: 200% 100%;
    animation: adh-shimmer 1.4s infinite;
    border-radius: 8px;
  }

  @keyframes adh-shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* ── Bus breakdown bar ── */
  .adh-breakdown {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #ececf2;
    padding: 22px 24px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    margin-bottom: 14px;
  }

  .adh-breakdown-title {
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #0d0d1a;
    margin-bottom: 16px;
  }

  .adh-bar-track {
    height: 10px;
    border-radius: 10px;
    background: #f3f4f6;
    overflow: hidden;
    display: flex;
    gap: 2px;
    margin-bottom: 14px;
  }

  .adh-bar-seg {
    height: 100%;
    border-radius: 10px;
    transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
    min-width: 4px;
  }

  .adh-bar-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .adh-legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #6b7280;
    font-weight: 500;
  }

  .adh-legend-dot {
    width: 9px; height: 9px;
    border-radius: 3px;
    flex-shrink: 0;
  }

  /* ── Error ── */
  .adh-error {
    background: #fee2e2;
    border: 1px solid #fecaca;
    border-radius: 12px;
    padding: 16px 20px;
    color: #991b1b;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const StatCard = ({ cls, icon, value, label, loading }) => (
  <div className={`adh-stat-card ${cls}`}>
    <div className="adh-stat-icon">{icon}</div>
    {loading
      ? <div className="adh-skeleton" style={{height:32,width:60,marginBottom:6}} />
      : <div className="adh-stat-val">{value}</div>
    }
    <div className="adh-stat-label">{label}</div>
  </div>
);

const AdminHome = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminPosts"],
    queryFn: async () => {
      const response = await apiRequest.get(`/admin/posts`);
      return response.data;
    },
    staleTime: 0,
    cacheTime: 0,
  });

  const { data: users = [], isLoading: isLoadingUser, error: errorUser } = useQuery({
    queryKey: ["adminHomeUsers"],
    queryFn: async () => {
      const response = await apiRequest.get(`/admin/users`);
      return response.data;
    },
    staleTime: 0,
    cacheTime: 0,
  });

  const totalBuses    = data?.postData?.length || 0;
  const pendingBuses  = data?.postData?.filter(p => p.verificationStatus === "pending").length  || 0;
  const acceptedBuses = data?.postData?.filter(p => p.verificationStatus === "accepted").length || 0;
  const rejectedBuses = data?.postData?.filter(p => p.verificationStatus === "rejected").length || 0;
  const disabledBuses = data?.postData?.filter(p => p.disabled === true).length || 0;
  const totalUsers    = Array.isArray(users) ? users.length : 0;

  const pct = (n) => totalBuses > 0 ? `${((n / totalBuses) * 100).toFixed(1)}%` : "0%";

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <>
      <style>{styles}</style>
      <div className="adh-root">

        {/* ── Header banner ── */}
        <div className="adh-header">
          <div className="adh-header-inner">
            <div className="adh-header-badge">
              <div className="adh-live-dot" />
              Live · {timeStr}
            </div>
            <div className="adh-title">Admin Dashboard</div>
            <p className="adh-subtitle">{dateStr} · Tourist Bus Management</p>
          </div>
        </div>

        {/* ── Error ── */}
        {(error || errorUser) && (
          <div className="adh-error mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
            </svg>
            Unable to load data. Please try again later.
          </div>
        )}

        {/* ── Bus stats ── */}
        <div className="adh-section-label">Bus Overview</div>
        <div className="adh-cards-grid">
          <StatCard cls="c-total"    loading={isLoading} value={totalBuses}    label="Total Buses"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#5346f3" viewBox="0 0 16 16"><path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5V9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 9zM3.5 6a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm-2 3.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0m12 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0"/><path d="M2 2h12v1H2z"/></svg>}
          />
          <StatCard cls="c-pending"  loading={isLoading} value={pendingBuses}  label="Pending"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#d97706" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/></svg>}
          />
          <StatCard cls="c-accepted" loading={isLoading} value={acceptedBuses} label="Approved"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#059669" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/></svg>}
          />
          <StatCard cls="c-rejected" loading={isLoading} value={rejectedBuses} label="Rejected"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#dc2626" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>}
          />
          <StatCard cls="c-disabled" loading={isLoading} value={disabledBuses} label="Disabled"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6b7280" viewBox="0 0 16 16"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/><path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/></svg>}
          />
        </div>

        {/* ── Users ── */}
        <div className="adh-section-label">Users</div>
        <div className="adh-cards-grid" style={{gridTemplateColumns:'repeat(auto-fill,minmax(155px,1fr))'}}>
          <StatCard cls="c-users" loading={isLoadingUser} value={totalUsers} label="Total Users"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#0284c7" viewBox="0 0 16 16"><path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/></svg>}
          />
        </div>

        {/* ── Breakdown bar ── */}
        {!isLoading && totalBuses > 0 && (
          <>
            <div className="adh-section-label">Bus Status Breakdown</div>
            <div className="adh-breakdown">
              <div className="adh-breakdown-title">
                Distribution across {totalBuses} buses
              </div>
              <div className="adh-bar-track">
                <div className="adh-bar-seg" style={{width: pct(acceptedBuses), background:'#10b981'}} />
                <div className="adh-bar-seg" style={{width: pct(pendingBuses),  background:'#f59e0b'}} />
                <div className="adh-bar-seg" style={{width: pct(rejectedBuses), background:'#ef4444'}} />
                <div className="adh-bar-seg" style={{width: pct(disabledBuses), background:'#9ca3af'}} />
              </div>
              <div className="adh-bar-legend">
                {[
                  { color:'#10b981', label:'Approved', val: acceptedBuses },
                  { color:'#f59e0b', label:'Pending',  val: pendingBuses  },
                  { color:'#ef4444', label:'Rejected', val: rejectedBuses },
                  { color:'#9ca3af', label:'Disabled', val: disabledBuses },
                ].map(({ color, label, val }) => (
                  <div className="adh-legend-item" key={label}>
                    <div className="adh-legend-dot" style={{background: color}} />
                    {label} · <strong style={{color:'#374151'}}>{val}</strong>
                    <span style={{color:'#d1d5db'}}>({pct(val)})</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

      </div>
    </>
  );
};

export default AdminHome;