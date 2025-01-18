import React from "react";
import { Link } from "react-router-dom";
import ServiceCard from "../components/serviceCard";
import alldata from "../data.json";
import CompaniesThatTrustUs from "../components/companies";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const services = alldata.services;
  const navigate = useNavigate();

  const handleCliqueToService = () => {
    navigate("/services");
  };

  return (
    <main>
      <section className="hero-section hero-section-full-height d-flex justify-content-center align-items-center">
        <div className="section-overlay"></div>

        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-12 text-center mx-auto">
              <h1 className="cd-headline rotate-1 text-white mb-4 pb-2">
                <span>Nous nettoyons</span>
                <span className="cd-words-wrapper">
                  <b className="is-visible">vos linges</b>
                  <b>votre lingerie</b>
                  <b>vos tapis, rideaux et autres...</b>
                </span>
              </h1>

              <button
                className="custom-btn custom-border-btn custom-btn-bg-white btn button button--pan smoothscroll"
                onClick={handleCliqueToService}
              >
                Voir Nos Services
              </button>
            </div>
          </div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L40,229.3C80,235,160,245,240,250.7C320,256,400,256,480,240C560,224,640,192,720,176C800,160,880,160,960,138.7C1040,117,1120,75,1200,80C1280,85,1360,139,1400,165.3L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </section>

      <section className="intro-section" id="intro-section">
        <div className="container">
          <div className="row justify-content-lg-center align-items-center">
            <div className="col-lg-6 col-12">
              <h2 className="mb-4">
                Une équipe Heureuse et prête à vous Servir !
              </h2>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                corporis facere impedit. Optio natus a est rem quod mollitia
                vitae, porro ullam incidunt, quidem magnam ab eius voluptate
                accusamus ea.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                nobis assumenda iste rerum eligendi quo maxime.
              </p>
            </div>

            <div className="col-lg-6 col-12 custom-block-wrap">
              <img
                src="/male-wearing-apron-female-white-t-shirt-smiling-broadly-being-glad-clean.png"
                className="img-fluid"
              />

              <div className="custom-block d-flex flex-column">
                <h6 className="text-white mb-3">
                  Besoin d`aide ? <br /> Appel nous directement:
                </h6>

                <p className="d-flex mb-0">
                  <i className="bi-telephone-fill custom-icon me-2"></i>

                  <Link to="tel: 110-220-9800">+243 971 736 244</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="services-section section-padding section-bg"
        id="services-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12">
              <h2 className="mb-4">Nos services !</h2>
            </div>
            {services.map((service, index) => (
              <ServiceCard key={index} data={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="testimonial-section section-padding section-bg">
        <div className="section-overlay"></div>

        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12 text-center">
              <h2 className="text-white mb-4">Nos clients témoignent !</h2>
            </div>

            <div className="col-lg-4 col-12">
              <div className="featured-block">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/avatar/happy-customer-01.jpg"
                    className="avatar-image img-fluid"
                  />

                  <div className="ms-3">
                    <h4 className="mb-0">Marie</h4>

                    <div className="reviews-icons mb-1">
                      <i className="bi-star-fill"></i>
                      <i className="bi-star-fill"></i>
                      <i className="bi-star-fill"></i>
                      <i className="bi-star-fill"></i>
                      <i className="bi-star"></i>
                    </div>
                  </div>
                </div>

                <p className="mb-0">
                  Best Cleaning Service Provider Ipsum dolor sit consectetur
                  kengan
                </p>
              </div>

              <div className="featured-block mb-lg-0">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/avatar/happy-customer-02.jpg"
                    className="avatar-image img-fluid"
                  />

                  <div className="ms-3">
                    <h4 className="mb-0">Nana</h4>

                    <div className="reviews-icons mb-1">
                      <i className="bi-star-fill"></i>
                      <i className="bi-star-fill"></i>
                      <i className="bi-star-fill"></i>
                      <i className="bi-star-fill"></i>
                      <i className="bi-star"></i>
                    </div>
                  </div>
                </div>

                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-12">
              <div className="featured-block">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/avatar/happy-customer-03.jpg"
                    className="avatar-image img-fluid"
                  />

                  <div className="ms-3">
                    <h4 className="mb-0">Elon</h4>

                    <div className="reviews-icons mb-1">
                      <i className="bi-star-fill"></i>
                      <i className="bi-star-fill"></i>
                      <i className="bi-star-fill"></i>
                      <i className="bi-star-fill"></i>
                      <i className="bi-star-fill"></i>
                    </div>
                  </div>
                </div>

                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore.
                </p>
              </div>

              <div className="featured-block mb-lg-0">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/avatar/happy-customer-04.jpg"
                    className="avatar-image img-fluid"
                  />

                  <div className="ms-3">
                    <h4 className="mb-0">Josh</h4>

                    <div className="reviews-icons mb-1">
                      <i className="bi-star-fill"></i>
                      <i className="bi-star-fill"></i>
                      <i className="bi-star-fill"></i>
                      <i className="bi-star"></i>
                      <i className="bi-star"></i>
                    </div>
                  </div>
                </div>

                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-12">
              <div className="featured-block">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/avatar/happy-customer-05.jpg"
                    className="avatar-image img-fluid"
                  />

                  <div className="ms-3">
                    <h4 className="mb-0">Katie</h4>

                    <div className="reviews-icons mb-1">
                      <i className="bi-star-fill"></i>
                      <i className="bi-star-fill"></i>
                      <i className="bi-star-fill"></i>
                      <i className="bi-star-fill"></i>
                      <i className="bi-star-fill"></i>
                    </div>
                  </div>
                </div>

                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore.
                </p>
              </div>

              <div className="featured-block mb-lg-0">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/avatar/happy-customer-06.jpg"
                    className="avatar-image img-fluid"
                  />

                  <div className="ms-3">
                    <h4 className="mb-0">Shai</h4>

                    <div className="reviews-icons mb-1">
                      <i className="bi-star-fill"></i>
                      <i className="bi-star-fill"></i>
                      <i className="bi-star-fill"></i>
                      <i className="bi-star"></i>
                      <i className="bi-star"></i>
                    </div>
                  </div>
                </div>

                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CompaniesThatTrustUs />
    </main>
  );
}
