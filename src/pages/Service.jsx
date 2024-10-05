import CompaniesThatTrustUs from "../components/companies";
import ServiceCard from "../components/serviceCard";
import allData from "../data.json"


export default function Service() {
    const services = allData.services;

    return (
        <main>

            <section class="banner-section d-flex justify-content-center align-items-end">
                <div class="section-overlay"></div>

                <div class="container">
                    <div class="row">

                        <div class="col-lg-7 col-12">
                            <h1 class="text-white mb-lg-0">Nos Services</h1>
                        </div>

                        <div class="col-lg-4 col-12 d-flex justify-content-lg-end align-items-center ms-auto">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb justify-content-center">
                                    <li class="breadcrumb-item"><a href="index.html">Accueil</a></li>

                                    <li class="breadcrumb-item active" aria-current="page">Nos Services</li>
                                </ol>
                            </nav>
                        </div>

                    </div>
                </div>
            </section>


            <section class="services-section section-padding">
                <div class="container">
                    <div class="row">

                        <ServiceCard data={services[0]} />
                        <ServiceCard data={services[1]} />

                    </div>
                </div>
            </section>


            <section class="services-section section-padding section-bg">
                <div class="container">
                    <div class="row">

                        <ServiceCard data={services[2]}/>
                        <ServiceCard data={services[3]}/>

                    </div>
                </div>
            </section>

            <CompaniesThatTrustUs />
        </main>
    )
}