import { Link } from "react-router-dom";
import React, { useState } from "react";

interface ServiceCardProps {
  data: object;
}

export default function ServiceCard({ data }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
    console.log(isPopupOpen);
  };

  const handleClosePopup = () => {
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
            <div className="services-info mt-4 mt-lg-0 mt-md-0">
              <h4 className="services-title mb-1 mb-lg-2">
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
                  className="custom-btn btn button button--atlas mt-2 ms-auto"
                  onClick={handleOpenPopup}
                >
                  <span>Réserver</span>

                  <div className="marquee" aria-hidden="true">
                    <div className="marquee__inner">
                      <span>Pas la peine</span>
                      <span>Pas la peine de vous deplacer</span>
                      <span>deplacer</span>
                    </div>
                  </div>
                </button>
                {/* Popup pour le formulaire de réservation */}
                {isPopupOpen && (
                  <div className="col-lg-6 col-12">
                    <form
                      className="custom-form consulting-form bg-white shadow-lg mb-5 mb-lg-0"
                      action="#"
                      method="post"
                      role="form"
                    >
                      <div className="consulting-form-header d-flex align-items-center">
                        <h3 className="mb-4">Réserver un service !</h3>
                      </div>

                      <div className="consulting-form-body">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-12">
                            <input
                              type="text"
                              name="volunteer-name"
                              id="volunteer-name"
                              className="form-control"
                              placeholder="Nom"
                              required
                            />
                          </div>

                          <div className="col-lg-6 col-md-6 col-12">
                            <input
                              type="email"
                              name="volunteer-email"
                              id="volunteer-email"
                              pattern="[^ @]*@[^ @]*"
                              className="form-control"
                              placeholder="yours@mail.com"
                              required
                            />
                          </div>
                        </div>

                        <select
                          className="form-select form-control"
                          name="job-salary"
                          id="job-salary"
                          aria-label="Default select example"
                        >
                          <option value="">{data.title}</option>
                        </select>

                        <textarea
                          name="volunteer-message"
                          rows={3}
                          className="form-control"
                          id="volunteer-message"
                          placeholder="Commentaire (Optionel)"
                        ></textarea>

                        <div className="col-lg-6 col-md-10 col-8 mx-auto">
                          <button type="submit" className="form-control">
                            Réserver
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
