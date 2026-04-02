<div className="container mt-3">
  <div className="row g-3">

    {/* LEFT IMAGE */}
    <div className="col-md-6">
      <Skeleton height={250} className="rounded-3" />
    </div>

    {/* RIGHT DETAILS */}
    <div className="col-md-6 d-flex flex-column gap-2">

      {/* title + heart */}
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <Skeleton width={180} height={20} />
          <Skeleton width={120} height={12} />
          <Skeleton width={100} height={15} />
        </div>
        <Skeleton circle width={30} height={30} />
      </div>

      {/* specs table */}
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className="d-flex justify-content-between">
          <Skeleton width={120} height={15} />
          <Skeleton width={60} height={15} />
        </div>
      ))}

      {/* price */}
      <div className="mt-2">
        <Skeleton width={100} height={25} />
      </div>

      {/* buttons */}
      <div className="d-flex gap-2 mt-2">
        <Skeleton height={40} width={120} borderRadius={8} />
        <Skeleton height={40} width={120} borderRadius={8} />
      </div>
    </div>
  </div>

  {/* ABOUT */}
  <div className="mt-4">
    <Skeleton width={150} height={20} />
    <Skeleton width={300} height={15} />
  </div>

  {/* AMENITIES */}
  <div className="mt-3 d-flex gap-2 flex-wrap">
    {Array(5).fill(0).map((_, i) => (
      <Skeleton key={i} width={70} height={25} borderRadius={20} />
    ))}
  </div>

  {/* ENTERTAINMENT */}
  <div className="mt-4">
    <Skeleton width={150} height={20} />
    {Array(3).fill(0).map((_, i) => (
      <div key={i} className="d-flex justify-content-between mt-2">
        <Skeleton width={120} height={15} />
        <Skeleton width={80} height={15} />
      </div>
    ))}
  </div>

  {/* REVIEWS */}
  <div className="mt-4">
    <div className="d-flex justify-content-between">
      <Skeleton width={150} height={20} />
      <Skeleton width={100} height={30} />
    </div>

    {Array(2).fill(0).map((_, i) => (
      <div key={i} className="d-flex gap-2 mt-3">
        <Skeleton circle width={40} height={40} />
        <div>
          <Skeleton width={120} height={15} />
          <Skeleton width={200} height={15} />
        </div>
      </div>
    ))}
  </div>
</div>