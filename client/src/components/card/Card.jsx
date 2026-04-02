import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import noImage from "../../assets/noImage.jpg";

// Inline styles to avoid modifying card.css — drop these into card.css if preferred
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  .busCard {
    font-family: 'DM Sans', sans-serif;
    background: #ffffff;
    border-radius: 20px !important;
    border: 1px solid rgba(0,0,0,0.07);
    box-shadow: 0 2px 8px rgba(0,0,0,0.05), 0 0 0 0 rgba(59,130,246,0);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    overflow: visible !important;
    position: relative;
  }

  .busCard:hover {
    box-shadow: 0 12px 36px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.04);
    transform: translateY(-3px);
  }

  /* Ribbon */
  .ribbon {
    position: absolute;
    top: 16px;
    left: -6px;
    padding: 4px 14px 4px 10px;
    border-radius: 0 6px 6px 0;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    clip-path: polygon(0 0, 100% 0, 94% 50%, 100% 100%, 0 100%);
    z-index: 10;
    box-shadow: 2px 2px 6px rgba(0,0,0,0.15);
  }

  /* Image area */
  .bus-img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 12px !important;
    transition: transform 0.4s ease;
  }

  .busCard:hover .bus-img {
    transform: scale(1.03);
  }

  .img-wrapper {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
  }

  /* Views badge */
  .views-badge {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(6px);
    color: #fff;
    border-radius: 20px;
    padding: 3px 9px;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: 'DM Sans', sans-serif;
  }

  /* Brand text */
  .brand-text {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: #6b7280;
    font-family: 'DM Sans', sans-serif;
  }

  /* Bus name */
  .bus-name {
    font-family: 'Sora', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #111827;
    line-height: 1.2;
    margin: 2px 0 6px;
  }

  /* Location chip */
  .location-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: #f3f4f6;
    border-radius: 20px;
    padding: 3px 10px 3px 6px;
    font-size: 12px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 10px;
  }

  /* Spec pills */
  .spec-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 4px 10px;
    font-size: 12px;
    color: #374151;
    font-weight: 500;
  }

  .spec-pill svg {
    opacity: 0.6;
  }

  .spec-pill.ac-active {
    background: #eff6ff;
    border-color: #bfdbfe;
    color: #1d4ed8;
  }

  /* Divider */
  .card-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, #e5e7eb 20%, #e5e7eb 80%, transparent);
    margin: 12px 0;
  }

  /* Price section */
  .price-main {
    font-family: 'Sora', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #111827;
    line-height: 1;
  }

  .price-unit {
    font-size: 12px;
    color: #9ca3af;
    font-weight: 400;
    font-family: 'DM Sans', sans-serif;
  }

  .price-note {
    font-size: 11px;
    color: #9ca3af;
    margin-top: 3px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* More button */
  .more-btn {
    background: linear-gradient(135deg, #1d4ed8, #2563eb);
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 10px 20px;
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: background 0.25s, box-shadow 0.25s, transform 0.2s;
    box-shadow: 0 4px 14px rgba(37,99,235,0.35);
    white-space: nowrap;
  }

  .more-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #1e40af, #1d4ed8);
    box-shadow: 0 6px 20px rgba(37,99,235,0.45);
    transform: translateY(-1px);
  }

  .more-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .more-btn .btn-arrow {
    background: rgba(255,255,255,0.2);
    border-radius: 6px;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Card = ({ post, label }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavigation = () => {
    setLoading(true);
    navigate(`/info/${post.postId}`, {
      state: { from: location.pathname },
    });
  };

  const labelConfig = {
    pending:  { bg: "#fef3c7", color: "#92400e", border: "#fde68a" },
    rejected: { bg: "#fee2e2", color: "#991b1b", border: "#fecaca" },
    accepted: { bg: "#dbeafe", color: "#1e40af", border: "#bfdbfe" },
  };
  const lc = label ? labelConfig[label] : null;

  return (
    <>
      <style>{styles}</style>
      <div className="busCard p-3 mb-3" style={{ position: "relative" }}>

        {/* Ribbon */}
        {label && lc && (
          <div
            className="ribbon"
            style={{ background: lc.bg, color: lc.color, border: `1px solid ${lc.border}` }}
          >
            {label.toUpperCase()}
          </div>
        )}

        {/* Top section */}
        <div className="row g-2 align-items-start">

          {/* Left: details */}
          <div className="col-6 d-flex flex-column" style={{ paddingTop: label ? "10px" : "0" }}>
            <span className="brand-text">{post.busBrand || "Bus Brand"}</span>
            <div className="bus-name">{post.busName || "Bus Name"}</div>

            <div className="location-chip">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="#6b7280" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
              </svg>
              {post.city ? post.city.toUpperCase() : "City"}
            </div>

            {/* Spec pills */}
            <div className="d-flex flex-wrap gap-1">
              <div className="spec-pill">
                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 24 24" width="14">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M5.35 5.64c-.9-.64-1.12-1.88-.49-2.79.63-.9 1.88-1.12 2.79-.49.9.64 1.12 1.88.49 2.79-.64.9-1.88 1.12-2.79.49zM16 19H8.93c-1.48 0-2.74-1.08-2.96-2.54L4 7H2l1.99 9.76C4.37 19.2 6.47 21 8.94 21H16v-2zm.23-4h-4.88l-1.03-4.1c1.58.89 3.28 1.54 5.15 1.22V9.99c-1.63.31-3.44-.27-4.69-1.25L9.14 7.47c-.23-.18-.49-.3-.76-.38-.32-.09-.66-.12-.99-.06h-.02c-1.23.22-2.05 1.39-1.84 2.61l1.35 5.92C7.16 16.98 8.39 18 9.83 18h6.85l3.82 3 1.5-1.5-5.77-4.5z"/>
                </svg>
                {post.numberOfSeats || "—"} Seats
              </div>

              <div className={`spec-pill${post.ac ? " ac-active" : ""}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793V8.866l-3.4 1.963-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.884-.237a.5.5 0 1 1 .26-.966l1.848.495L7 8 3.6 6.037l-1.85.495a.5.5 0 0 1-.258-.966l.883-.237-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646-.237-.883a.5.5 0 1 1 .966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 1 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v3.927l3.4-1.963.496-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l3.4 1.963 1.849-.495a.5.5 0 0 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-3.4-1.963v3.927l1.353 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5z"/>
                </svg>
                {post.ac ? "AC" : "Non-AC"}
              </div>

              {post.mileage && (
                <div className="spec-pill d-none d-xl-flex">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5z"/>
                    <path d="M1 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1 2 2v.5a.5.5 0 0 0 1 0V8h-.5a.5.5 0 0 1-.5-.5V4.375a.5.5 0 0 1 .5-.5h1.495c-.011-.476-.053-.894-.201-1.222a.97.97 0 0 0-.394-.458c-.184-.11-.464-.195-.9-.195a.5.5 0 0 1 0-1q.846-.002 1.412.336c.383.228.634.551.794.907.295.655.294 1.465.294 2.081v3.175a.5.5 0 0 1-.5.501H15v4.5a1.5 1.5 0 0 1-3 0V12a1 1 0 0 0-1-1v4h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1zm9 0a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v13h8z"/>
                  </svg>
                  {post.mileage} km
                </div>
              )}
            </div>
          </div>

          {/* Right: image */}
          <div className="col-6">
            <div className="img-wrapper">
              <img
                src={post.img1 || noImage}
                loading="lazy"
                className="bus-img"
                alt={post.busName || "Bus"}
              />
              <div className="views-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                </svg>
                {post.views || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="card-divider" />

        {/* Price + CTA */}
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <div className="d-flex align-items-baseline gap-1">
              <span className="price-main">₹{post.cost || "—"}</span>
              <span className="price-unit">/100km</span>
            </div>
            <div className="price-note">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="#9ca3af" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
              </svg>
              Prices exclude fuel cost
            </div>
          </div>

          <button
            className="more-btn"
            onClick={handleNavigation}
            disabled={loading}
          >
            {loading ? "Loading…" : "View Details"}
            {!loading && (
              <span className="btn-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="white" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
              </span>
            )}
          </button>
        </div>

      </div>
    </>
  );
};

export default Card;