import { Link } from "react-router-dom";
import CompaniesThatTrustUs from "../components/companies";



export default function About() {
    return (
        <main>
            <section className="banner-section d-flex justify-content-center align-items-end">
                <div className="section-overlay"></div>

                <div className="container">
                    <div className="row">

                        <div className="col-lg-7 col-12">
                            <h1 className="text-white mb-lg-0">A propos de nous</h1>
                        </div>

                        <div className="col-lg-4 col-12 d-flex justify-content-lg-end align-items-center ms-auto">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center">
                                    <li className="breadcrumb-item"><Link to={'/'}>Accueil</Link></li>

                                    <li className="breadcrumb-item active" aria-current="page">A propos</li>
                                </ol>
                            </nav>
                        </div>

                    </div>
                </div>
            </section>


            <section className="section-padding">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-6 col-12">
                            <img src="/cleaning-concept-with-man-showing-business-card.jpg" className="featured-image img-fluid" />
                        </div>

                        <div className="col-lg-6 col-12">
                            <div className="featured-block">
                                <h2 className="mb-4">Rendez-vous la vie facile</h2>

                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veritatis in, quia dolor accusantium magni accusamus repellendus quisquam, sunt !</p>

                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, a numquam qui, accusantium, expedita accusamus.</p>

                                <Link className="custom-btn btn button button--atlas mt-3" href="contact.html">
                                    <span>Nous contacter</span>

                                    <div className="marquee" aria-hidden="true">
                                        <div className="marquee__inner">
                                            <span>Nous contacter</span>
                                            <span>Nous contacter</span>
                                            <span>Nous contacter</span>
                                            <span>Nous contacter</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            <section className="team-section section-padding section-bg">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12 col-12">
                            <h2 className="mb-4">La team</h2>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12 mb-lg-0 mb-md-5">
                            <img src="/teams/young-cleaning-man-wearing-casual-clothes.jpg" className="team-image img-fluid" />
                        </div>

                        <div className="col-lg-3 col-md-6 col-12 d-flex justify-content-lg-center mt-4 mt-lg-0 mt-md-0 mb-5 mb-lg-0">
                            <div className="team-info mx-auto mx-lg-0">
                                <h4 className="mb-2">Michel</h4>

                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing tempor incididunt dolore magna</p>

                                <div className="border-top mt-3 pt-3">
                                    <p className="d-flex mb-0">
                                        <i className="bi-whatsapp me-2"></i>

                                        <Link href="tel: 110-220-9800">
                                            110-220-9800
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12">
                            <img src="/teams/happy-young-woman-wiping-kitchen-counter-wearing-yellow-gloves.jpg" className="team-image img-fluid" />
                        </div>

                        <div className="col-lg-3 col-md-6 col-12 d-flex justify-content-lg-center mt-4 mt-lg-0 mt-md-0">
                            <div className="team-info mx-auto mx-lg-0">
                                <h4 className="mb-2">Namegabe</h4>

                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing tempor incididunt dolore magna</p>

                                <div className="border-top mt-3 pt-3">
                                    <p className="d-flex mb-0">
                                        <i className="bi-whatsapp me-2"></i>

                                        <Link href="tel: 110-220-9800">
                                            110-220-9800
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <CompaniesThatTrustUs />
        </main>
    )
}