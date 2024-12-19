import CompaniesThatTrustUs from "../components/companies";
import ServiceCard from "../components/serviceCard";
import allData from "../data.json";

export default function Service() {
  const services = allData.services;

  return (
    <main>
      <section className="banner-section d-flex justify-content-center align-items-end">
        <div className="section-overlay"></div>

        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-12">
              <h1 className="text-white mb-lg-0">Nos Services</h1>
            </div>

            <div className="col-lg-4 col-12 d-flex justify-content-lg-end align-items-center ms-auto">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <a href="index.html">Accueil</a>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">
                    Nos Services
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section section-padding">
        <div className="container">
          <div className="row">
            <ServiceCard data={services[0]} />
            <ServiceCard data={services[1]} />
          </div>
        </div>
      </section>

      <section className="services-section section-padding section-bg">
        <div className="container">
          <div className="row">
            <ServiceCard data={services[2]} />
            <ServiceCard data={services[3]} />
          </div>
        </div>
      </section>

      <CompaniesThatTrustUs />
    </main>
  );
}
