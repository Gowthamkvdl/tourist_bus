import React, { useContext, useEffect, useRef, useState } from "react";
import "./info.css";
import BackBtn from "../../components/backBtn/BackBtn";
import DisplayStarRating from "react-star-ratings";
import toast from "react-hot-toast";
import { format } from "timeago.js";
import { useLoaderData, useNavigate } from "react-router-dom";
import { StarRating } from "star-ratings-react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";
import InfoSkeleton from "../../components/infoSkeleton/InfoSkeleton";
import DismissibleToast from "../../components/dismissibleToast/DismissibleToast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import noImage from "../../assets/noImage.jpg";

const Info = () => {
  const { id } = useLoaderData();
  const { data, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const response = await apiRequest.get(`/post/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const queryClient = useQueryClient();
  const [fav, setFav] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [remarkUpdating, setRemarkUpdating] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [addingReview, setAddingReview] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const reviewBox = useRef(null);
  const verificationStatus = useRef(null);
  const disableStatus = useRef(null);
  const remarkRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (data) {
      setFav(data.isSaved || false);
      setReviews(data.reviews || []);
    }
  }, [data]);

  useEffect(() => {
    if (!data) return;
    const addView = async () => {
      try {
        await apiRequest.put(`post/view/${data.postId}`, { postId: data.postId });
      } catch (error) {
        console.error("Error adding view:", error);
      }
    };
    addView();
  }, [data]);

  const toTitleCase = (str) =>
    str?.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "";

  const toNormalText = (str) =>
    str?.toLowerCase().split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "";

  const convertToAgo = (timestamp) => format(new Date(timestamp));

  if (isLoading) return <InfoSkeleton />;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddFav = async () => {
    if (!currentUser) {
      return toast((t) => <DismissibleToast message="Login to add to your Favorites!" toastProps={t} />, { icon: "🔔", duration: 5000 });
    }
    try {
      setFav((prev) => !prev);
      const response = await apiRequest.post("/post/fav", { postId: data.postId, userId: currentUser.id });
      if (response.data) {
        toast((t) => <DismissibleToast message={fav ? "Removed from favorites" : "Added to favorites"} toastProps={t} />, { icon: "🔔", duration: 5000, id: "fav" });
      } else {
        setFav((prev) => !prev);
      }
    } catch {
      setFav((prev) => !prev);
    }
  };

  const handleReviewtoggle = () => {
    if (!currentUser)
      toast((t) => <DismissibleToast message="Login to add your review!" toastProps={t} />, { icon: "🔔", duration: 5000 });
  };

  const addReview = async (e) => {
    e.preventDefault();
    if (!data) return;
    setAddingReview(true);

    if (!review) {
      setAddingReview(false);
      return toast((t) => <DismissibleToast message="Review cannot be empty" toastProps={t} />, { icon: "🔔", duration: 5000 });
    }
    if (rating === 0) {
      setAddingReview(false);
      return toast((t) => <DismissibleToast message="Please provide a rating" toastProps={t} />, { icon: "🔔", duration: 5000 });
    }

    try {
      await apiRequest.post("/review", { review, userId: currentUser?.id, name: currentUser?.name, postId: id });
      await apiRequest.post("/post/rating", { starCount: rating, post: data });
      toast((t) => <DismissibleToast message="Review added successfully" toastProps={t} />, { icon: "🔔", duration: 5000 });
      queryClient.invalidateQueries(["post", id]);
    } catch {
      toast((t) => <DismissibleToast message="Failed to add review" toastProps={t} />, { icon: "🔔", duration: 5000 });
    } finally {
      setReview("");
      setRating(0);
      setAddingReview(false);

      // ✅ Close the Bootstrap collapse
      const collapseEl = document.getElementById("collapseExample");
      if (collapseEl) {
        const bsCollapse = window.bootstrap.Collapse.getInstance(collapseEl);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    }
  };

  const handleVerificationChange = async () => {
    try {
      await apiRequest.put(`admin/verify/${data.postId}`, { verificationStatus: verificationStatus.current.value, remark: "" });
      toast((t) => <DismissibleToast message="Verification status updated" toastProps={t} />, { icon: "🔔", duration: 5000 });
    } catch {
      toast((t) => <DismissibleToast message="Failed to update verification status" toastProps={t} />, { icon: "🔔", duration: 5000 });
    }
  };

  const handleDisableChange = async () => {
    try {
      await apiRequest.put(`admin/disable/${data.postId}`, { status: disableStatus.current.value === "true" });
      toast((t) => <DismissibleToast message="Disable status updated" toastProps={t} />, { icon: "🔔", duration: 5000 });
    } catch {
      toast((t) => <DismissibleToast message="Failed to update disable status" toastProps={t} />, { icon: "🔔", duration: 5000 });
    }
  };

  const handleAddRemark = async () => {
    try {
      setRemarkUpdating(true);
      await apiRequest.put(`admin/remark/${data.postId}`, { remark: remarkRef.current.value });
      toast((t) => <DismissibleToast message="Remark updated" toastProps={t} />, { icon: "🔔", duration: 5000 });
    } catch {
      toast((t) => <DismissibleToast message="Failed to update remark" toastProps={t} />, { icon: "🔔", duration: 5000 });
    } finally {
      setRemarkUpdating(false);
    }
  };

  const handleNavigation = (postId) => {
    setLoadingEdit(true);
    navigate(`/edit/${postId}`, { state: { from: location.pathname } });
  };

  // ── Helpers ──────────────────────────────────────────────────────
  const SpecRow = ({ label, value }) => (
    <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
      <span className="small text-muted">{label}</span>
      <span className="small fw-semibold">{value}</span>
    </div>
  );

  const AmenityBadge = ({ active, label }) => (
    <span className={`badge rounded-pill px-3 py-2 me-2 mb-2 ${active ? "bg-success" : "bg-light text-secondary border"}`}>
      {label}
    </span>
  );

  return (
    <div className="info-page">

      {/* ── Top Bar ──────────────────────────────────────────────── */}
      <div className="header pt-md-3 mb-3">
        <div className="d-flex justify-content-between align-items-center px-3 pt-3">
          <BackBtn />
          <span className="title-text fs-5">Bus Details</span>
          {currentUser?.id === data.userId ? (
            <button
              className="btn btn-warning btn-sm px-3"
              onClick={() => handleNavigation(data.postId)}
              disabled={loadingEdit}
            >
              {loadingEdit ? "Loading..." : "Edit"}
            </button>
          ) : (
            <div style={{ width: 60 }} />
          )}
        </div>
      </div>

      {/* ── Status Banners ───────────────────────────────────────── */}
      {data.verificationStatus === "rejected" && !currentUser?.admin && (
        <div className="mx-3 my-3 p-3 bg-warning rounded-4">
          <div className="fw-bold mb-1">Listing Not Approved</div>
          <div className="small mb-1">
            Your bus couldn't be approved because it doesn't meet our guidelines.
          </div>
          <div className="small mb-1">
            <span className="fw-semibold">Reason:</span> {data.remark}
          </div>
          <div className="small opacity-75">
            Please review, make corrections, and re-submit. Contact support if you need help.
          </div>
        </div>
      )}

      {data.verificationStatus === "pending" && !currentUser?.admin && (
        <div className="mx-3 my-3 p-3 bg-info text-dark rounded-4">
          <div className="fw-bold mb-1">Under Review</div>
          <div className="small">
            Our team is verifying your listing. You'll be notified once complete. Thank you for your patience!
          </div>
        </div>
      )}

      {/* ── Admin Controls ───────────────────────────────────────── */}
      {currentUser?.admin && (
        <div className="mx-3 my-3 p-3 secondary-800 text-white rounded-4">
          <div className="fw-bold fs-5 mb-3">Admin Controls</div>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label small fw-semibold">Verification Status</label>
              <select onChange={handleVerificationChange} ref={verificationStatus} className="form-select form-select-sm shadow-none">
                <option value="accepted" selected={data.verificationStatus === "accepted"}>Accepted</option>
                <option value="rejected" selected={data.verificationStatus === "rejected"}>Rejected</option>
                <option value="pending" selected={data.verificationStatus === "pending"}>Pending</option>
              </select>
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label small fw-semibold">Disable Status</label>
              <select onChange={handleDisableChange} ref={disableStatus} className="form-select form-select-sm shadow-none">
                <option value={true} selected={data.disabled === true}>Disabled</option>
                <option value={false} selected={data.disabled === false}>Active</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label small fw-semibold">Remark / Reason</label>
              <textarea ref={remarkRef} className="form-control form-control-sm shadow-none" rows="3" placeholder="Add rejection reason or remark">
                {data.remark}
              </textarea>
              <button className="btn btn-info btn-sm float-end mt-2" onClick={handleAddRemark} disabled={remarkUpdating}>
                {remarkUpdating ? "Updating..." : "Update Remark"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="others box-shadow bg-white">

        {/* ── Image Left + Key Details Right ───────────────────── */}
        <div className="row g-0">

          {/* Left — Carousel */}
          <div className="col-12 col-md-6">
            <div
              id="carouselExampleIndicators"
              className="carousel slide h-100 m-4 pt-2"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                {[0, 1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={i}
                    className={i === 0 ? "active" : ""}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
              <div className="carousel-inner h-100">
                {[data.img1, data.img2, data.img3, data.img4, data.img5].map((img, i) => (
                  <div key={i} className={`carousel-item h-100 ${i === 0 ? "active" : ""}`}>
                    <img
                      src={img || noImage}
                      loading="lazy"
                      className="d-block w-100"
                      style={{ objectFit: "fit", height: 380 }}
                      alt={`Bus image ${i + 1}`}
                    />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" />
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" />
              </button>
            </div>
          </div>

          {/* Right — Bus Name, Location, Rating, Price, CTAs */}
          <div className="col-12 col-md-6 d-flex flex-column justify-content-between p-4">

            {/* Name + Location + Fav */}
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h5 className="title-text mb-1">{data.busName}</h5>
                <div className="d-flex align-items-center gap-1 text-muted mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
                  <span className="small">{data.city}</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <DisplayStarRating
                    rating={data.averageRating || 0}
                    numberOfStars={5}
                    starDimension="18px"
                    starRatedColor="#FFD700"
                    starSpacing="1px"
                  />
                  <span className="small text-muted">({data.totalRating || 0})</span>
                </div>
              </div>
              <button className="btn btn-light border rounded-circle p-2" onClick={handleAddFav}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={fav ? "red" : "currentColor"} className={`bi bi-heart${fav ? "-fill" : ""}`} viewBox="0 0 16 16">
                  {fav
                    ? <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                    : <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                  }
                </svg>
              </button>
            </div>

            {/* Key Specs */}
            <div className="mb-3">
              <SpecRow label="Bus Type" value={toNormalText(data.busType)} />
              <SpecRow label="No. of Seats" value={data.numberOfSeats} />
              <SpecRow label="AC / Non-AC" value={data.ac ? "AC" : "Non-AC"} />
              <SpecRow label="Pushback Seats" value={data.recliningSeats ? "Yes" : "No"} />
              <SpecRow label="USB Charging" value={data.usb ? "Yes" : "No"} />
              <SpecRow label="Wi-Fi" value={data.wifi ? "Yes" : "No"} />
              <SpecRow label="TV" value={data.tv ? "Yes" : "No"} />
            </div>

            {/* Price */}
            <div className="mb-3">
              <div className="small text-muted">Price per 100km</div>
              <div className="title-text fs-3 fw-bold">₹{data.cost}</div>
            </div>

            {/* CTAs */}
            <div className="d-flex gap-2">
              <button
                className="btn primary-600 flex-fill d-flex justify-content-center align-items-center gap-2"
                onClick={() => data.user?.phone && (window.location.href = `tel:${data.user.phone}`)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-telephone text-white" viewBox="0 0 16 16">
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                </svg>
                <span className="text-white small">Call</span>
              </button>
              <button
                className="btn btn-warning flex-fill d-flex justify-content-center align-items-center gap-2"
                onClick={() => (window.location.href = `https://wa.me/+91${data.user.phone}`)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
                <span className="small">WhatsApp</span>
              </button>
            </div>

          </div>
        </div>

        {/* ── Below the fold ────────────────────────────────────── */}
        <div className="px-3 px-md-4 pt-4">

          {/* Description */}
          {data.description && (
            <div className="mb-4">
              <div className="subtitle-text text-muted mb-2">About this Bus</div>
              <p className="body-text mb-0">{data.description}</p>
            </div>
          )}

          {/* Amenities */}
          <div className="mb-4">
            <div className="subtitle-text text-muted mb-2">Amenities</div>
            <div className="d-flex flex-wrap">
              <AmenityBadge active={data.ac} label="AC" />
              <AmenityBadge active={data.wifi} label="Wi-Fi" />
              <AmenityBadge active={data.tv} label="TV" />
              <AmenityBadge active={data.usb} label="USB Charging" />
              <AmenityBadge active={data.recliningSeats} label="Pushback Seats" />
            </div>
          </div>

          {/* Entertainment */}
          <div className="mb-4">
            <div className="subtitle-text text-muted mb-2">Entertainment</div>
            <SpecRow label="Audio System" value={`${toTitleCase(data.speakerType)} (${toTitleCase(data.speakerBrand)})`} />
            <SpecRow label="TV / Display" value={data.tv ? "Available" : "Not Available"} />
            <SpecRow label="Wi-Fi" value={data.wifi ? "Available" : "Not Available"} />
          </div>

          <hr />

          {/* Reviews */}
          <div className="reviews">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="subtitle-text text-muted">Customer Reviews</div>
                <div className="small text-muted">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</div>
              </div>
              <button
                className="btn primary-700 btn-sm px-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                onClick={handleReviewtoggle}
              >
                Add Review
              </button>
            </div>

            {/* Add Review Form */}
            {currentUser && (
              <div className="collapse mb-3" id="collapseExample">
                <div className="border rounded-3 p-3 bg-light">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div
                      className="d-flex justify-content-center align-items-center primary-600 text-white rounded-circle fw-bold"
                      style={{ width: 38, height: 38, fontSize: 16 }}
                    >
                      {currentUser.name[0]}
                    </div>
                    <span className="subtitle-text fw-semibold">{currentUser.name}</span>
                  </div>
                  <form ref={reviewBox} onSubmit={addReview}>
                    <textarea
                      placeholder="Share your experience..."
                      className="form-control shadow-none mb-3"
                      rows="3"
                      required
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />
                    <div className="d-flex flex-column align-items-center mb-3">
                      <p className="small text-muted mb-2">Rate your experience</p>
                      <StarRating
                        rating={rating}
                        maxRating={5}
                        starColor="#FFD700"
                        textColor="white"
                        onSetRating={setRating}
                        size={24}
                      />
                      <span className="small text-muted mt-1">
                        {rating > 0 ? `${rating} star${rating > 1 ? "s" : ""}` : "Select rating"}
                      </span>
                    </div>
                    <button type="submit" className="btn primary-700 w-100" disabled={addingReview}>
                      {addingReview ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Review List */}
            {reviews.length > 0 ? (
              reviews.slice().reverse().map((review) => (
                <div className="d-flex gap-3 mt-3 pb-3 border-bottom" key={review.reviewId}>
                  <div
                    className="d-flex justify-content-center align-items-center primary-600 text-white rounded-circle fw-bold flex-shrink-0"
                    style={{ width: 40, height: 40, fontSize: 16 }}
                  >
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="subtitle-text fw-semibold">{review.name}</span>
                      <span className="small text-muted">{convertToAgo(review.createdAt)}</span>
                    </div>
                    <div className="body-text mt-1">{review.review}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted py-4">
                <div className="body-text">No reviews yet. Be the first to review!</div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Info;