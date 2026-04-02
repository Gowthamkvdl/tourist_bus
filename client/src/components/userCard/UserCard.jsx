import React, { useRef } from "react";
import DismissibleToast from "../../components/dismissibleToast/DismissibleToast";
import toast from "react-hot-toast";
import apiRequest from "../../lib/apiRequest";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  .user-card {
    font-family: 'DM Sans', sans-serif;
    background: #fff;
    border-radius: 16px;
    border: 1px solid #ececf2;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    overflow: hidden;
    transition: box-shadow 0.25s, transform 0.25s;
    margin-bottom: 16px;
  }

  .user-card:hover {
    box-shadow: 0 8px 28px rgba(0,0,0,0.09);
    transform: translateY(-2px);
  }

  /* ── Colored top accent bar ── */
  .user-card-accent {
    height: 4px;
    background: linear-gradient(90deg, #5346f3, #7c6ff7);
  }

  .user-card-accent.banned {
    background: linear-gradient(90deg, #ef4444, #f97316);
  }

  .user-card-body {
    padding: 16px 18px 18px;
  }

  /* ── Avatar ── */
  .uc-avatar {
    width: 46px;
    height: 46px;
    border-radius: 12px;
    background: linear-gradient(135deg, #5346f3, #7c6ff7);
    color: #fff;
    font-family: 'Sora', sans-serif;
    font-size: 18px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .uc-avatar.banned {
    background: linear-gradient(135deg, #ef4444, #f97316);
  }

  /* ── Name / phone / city ── */
  .uc-name {
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #0d0d1a;
    line-height: 1.2;
  }

  .uc-phone {
    font-size: 12.5px;
    color: #6b7280;
    font-weight: 500;
    margin-top: 1px;
  }

  .uc-city {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 11.5px;
    color: #9ca3af;
    margin-top: 3px;
  }

  /* ── Banned badge ── */
  .banned-badge {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    background: #fee2e2;
    color: #b91c1c;
    border-radius: 6px;
    padding: 2px 8px;
    margin-left: 6px;
  }

  /* ── Stats row ── */
  .uc-stats {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 12px;
  }

  .uc-stat {
    flex: 1;
    min-width: 70px;
    background: #f8f8fc;
    border: 1px solid #ebebf4;
    border-radius: 10px;
    padding: 8px 10px;
    text-align: center;
  }

  .uc-stat .stat-val {
    font-family: 'Sora', sans-serif;
    font-size: 17px;
    font-weight: 700;
    line-height: 1;
    color: #0d0d1a;
  }

  .uc-stat .stat-val.warning { color: #d97706; }
  .uc-stat .stat-val.danger  { color: #dc2626; }
  .uc-stat .stat-val.success { color: #16a34a; }

  .uc-stat .stat-label {
    font-size: 10.5px;
    color: #9ca3af;
    margin-top: 2px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* ── Divider ── */
  .uc-divider {
    height: 1px;
    background: #f0f0f5;
    margin: 14px 0;
  }

  /* ── Action row ── */
  .uc-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }

  /* Contact buttons */
  .uc-contact-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border: none;
    border-radius: 10px;
    padding: 8px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: filter 0.2s, transform 0.15s;
  }

  .uc-contact-btn:hover { filter: brightness(0.92); transform: translateY(-1px); }

  .uc-contact-btn.call {
    background: #5346f3;
    color: #fff;
    box-shadow: 0 3px 10px rgba(83,70,243,0.3);
  }

  .uc-contact-btn.whatsapp {
    background: #22c55e;
    color: #fff;
    box-shadow: 0 3px 10px rgba(34,197,94,0.3);
  }

  /* Toggle switches */
  .uc-toggles {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .uc-toggle-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12.5px;
    color: #374151;
    font-weight: 500;
    cursor: pointer;
    user-select: none;
  }

  /* Custom toggle */
  .toggle-track {
    width: 36px;
    height: 20px;
    border-radius: 20px;
    background: #e5e7eb;
    position: relative;
    transition: background 0.2s;
    flex-shrink: 0;
  }

  .toggle-track.on { background: #5346f3; }
  .toggle-track.on.danger-toggle { background: #ef4444; }

  .toggle-thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: left 0.2s;
  }

  .toggle-track.on .toggle-thumb { left: 19px; }

  /* hidden real checkbox */
  .toggle-input { display: none; }
`;

const UserCard = ({ user }) => {
  const adminRef = useRef(null);
  const banRef   = useRef(null);

  const posts    = user.Post ?? [];
  const total    = posts.length;
  const pending  = posts.filter(p => p.verificationStatus === "pending").length;
  const rejected = posts.filter(p => p.verificationStatus === "rejected").length;
  const accepted = posts.filter(p => p.verificationStatus === "accepted").length;

  const notify = (msg, id) =>
    toast((t) => <DismissibleToast message={msg} toastProps={t} />, {
      icon: "🔔", duration: 5000, id,
    });

  const handleAdminChange = async () => {
    try {
      await apiRequest.put(`admin/makeadmin/${user.id}`, {
        adminStatus: adminRef.current.checked,
      });
      notify(`Admin status updated (${adminRef.current.checked})`, "admin-status");
    } catch {
      notify("Failed to update admin status", "admin-status");
    }
  };

  const handleBanChange = async () => {
    try {
      await apiRequest.put(`admin/banuser/${user.id}`, {
        banStatus: banRef.current.checked,
      });
      notify(`Ban status updated (${banRef.current.checked})`, "ban-status");
    } catch {
      notify("Failed to update ban status", "ban-status");
    }
  };

  const initials = user.name?.[0]?.toUpperCase() ?? "?";
  const cityFormatted = user.city
    ?.toLowerCase()
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <>
      <style>{styles}</style>
      <div className="user-card">
        <div className={`user-card-accent${user.isBanned ? " banned" : ""}`} />

        <div className="user-card-body">
          {/* ── Top: avatar + name ── */}
          <div className="d-flex align-items-center gap-3">
            <div className={`uc-avatar${user.isBanned ? " banned" : ""}`}>
              {initials}
            </div>
            <div>
              <div className="d-flex align-items-center">
                <span className="uc-name">{user.name}</span>
                {user.isBanned && <span className="banned-badge">Banned</span>}
                {user.admin && (
                  <span className="banned-badge" style={{background:'#ede9fe',color:'#5346f3',marginLeft:6}}>
                    Admin
                  </span>
                )}
              </div>
              <div className="uc-phone">{user.phone}</div>
              <div className="uc-city">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                </svg>
                {cityFormatted}
              </div>
            </div>
          </div>

          {/* ── Stats ── */}
          <div className="uc-stats">
            <div className="uc-stat">
              <div className="stat-val">{total}</div>
              <div className="stat-label">Total</div>
            </div>
            <div className="uc-stat">
              <div className="stat-val warning">{pending}</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="uc-stat">
              <div className="stat-val success">{accepted}</div>
              <div className="stat-label">Accepted</div>
            </div>
            <div className="uc-stat">
              <div className="stat-val danger">{rejected}</div>
              <div className="stat-label">Rejected</div>
            </div>
          </div>

          <div className="uc-divider" />

          {/* ── Actions ── */}
          <div className="uc-actions">
            {/* Contact buttons */}
            <div className="d-flex gap-2">
              <button
                className="uc-contact-btn call"
                onClick={() => user.phone && (window.location.href = `tel:${user.phone}`)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                </svg>
                Call
              </button>
              <button
                className="uc-contact-btn whatsapp"
                onClick={() => window.open(`https://wa.me/+91${user.phone}`, "_blank")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
                WhatsApp
              </button>
            </div>

            {/* Toggles */}
            <div className="uc-toggles">
              {/* Admin toggle */}
              <label className="uc-toggle-row">
                <input
                  ref={adminRef}
                  type="checkbox"
                  className="toggle-input"
                  defaultChecked={user.admin}
                  onChange={handleAdminChange}
                />
                <div
                  className={`toggle-track${user.admin ? " on" : ""}`}
                  onClick={() => adminRef.current?.click()}
                >
                  <div className="toggle-thumb" />
                </div>
                Make Admin
              </label>

              {/* Ban toggle */}
              <label className="uc-toggle-row">
                <input
                  ref={banRef}
                  type="checkbox"
                  className="toggle-input"
                  defaultChecked={user.isBanned}
                  onChange={handleBanChange}
                />
                <div
                  className={`toggle-track danger-toggle${user.isBanned ? " on" : ""}`}
                  onClick={() => banRef.current?.click()}
                >
                  <div className="toggle-thumb" />
                </div>
                Ban User
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;