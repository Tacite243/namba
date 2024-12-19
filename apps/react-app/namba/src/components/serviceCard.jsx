import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthPopup from "../client/AuthPopup"; // Importer le composant AuthPopup

export default function ServiceCard({ data }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="col-lg-6 col-12">
      <div className="services-thumb">
        <div className="row">
          <div className="col-lg-5 col-md-5 col-12">
            <div className="services-image-wrap">
              <Link to="services-detail.html">
                <img
                  src={data.avatar}
                  className="services-image img-fluid"
                  alt=""
                />
                <img
                  src={data.hover}
                  className="services-image services-image-hover img-fluid"
                  alt=""
                />
                <div className="services-icon-wrap">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="text-white mb-0">
                      <i className="bi-cash me-2"></i>${data.tarif.amount}
                    </p>
                    <p className="text-white mb-0">
                      <i className="bi-clock-fill me-2"></i>
                      {data.tarif.unity}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-7 col-md-7 col-12 d-flex align-items-center">
            <div className="services-info mt-4">
              <h4 className="services-title mb-1">
                <Link className="services-title-link" to="services-detail.html">
                  {data.title}
                </Link>
              </h4>
              <p>{data.description}</p>
              <div className="d-flex flex-wrap align-items-center">
                <div className="reviews-icons">
                  <i className="bi-star-fill"></i>
                  <i className="bi-star-fill"></i>
                  <i className="bi-star-fill"></i>
                  <i className="bi-star"></i>
                  <i className="bi-star"></i>
                </div>
                <button
                  className="custom-btn btn button mt-2 ms-auto"
                  onClick={openPopup}
                >
                  <span>Réserver</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPopupOpen && <AuthPopup closePopup={closePopup} />}
    </div>
  );
}
