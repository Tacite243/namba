import { Link } from "react-router-dom"


export default function Contacts() {
    return (
        <main>

            <section className="banner-section d-flex justify-content-center align-items-end">
                <div className="section-overlay"></div>

                <div className="container">
                    <div className="row">

                        <div className="col-lg-7 col-12">
                            <h1 className="text-white mb-lg-0">Contact</h1>
                        </div>

                        <div className="col-lg-4 col-12 d-flex justify-content-lg-end align-items-center ms-auto">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center">
                                    <li className="breadcrumb-item"><Link href="index.html">Home</Link></li>

                                    <li className="breadcrumb-item active" aria-current="page">Contact</li>
                                </ol>
                            </nav>
                        </div>

                    </div>
                </div>
            </section>


            <section className="contact-section section-padding">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-5 col-12 me-auto mb-lg-0 mb-5">
                            <h2 className="my-3">Vous servir, c`est notre bonheur !</h2>

                            <p>Contactez-nous pour savoir plus sur nos offres et services, venez tirer le maximum d`avantages en confiant vos lourdes taches à une équipe qui éprouve du plaisir à vous les alléger !</p>

                            <div className="contact-info bg-white shadow-lg">
                                <h3 className="mb-4">Contacts</h3>

                                <h5 className="d-flex mt-3 mb-3">
                                    <i className="bi-geo-alt-fill custom-icon me-3"></i>
                                    Goma 20, Av. du lac, Q.Himbi
                                </h5>

                                <h5 className="d-flex mb-3">
                                    <i className="bi-telephone-fill custom-icon me-3"></i>

                                    <Link>
                                        +243 971-736-244
                                    </Link>
                                </h5>

                                <h5 className="d-flex">
                                    <i className="bi-envelope-fill custom-icon me-3"></i>

                                    <Link>
                                        info@namba.com
                                    </Link>
                                </h5>
                            </div>
                        </div>

                        <div className="col-lg-6 col-12">
                            <form className="custom-form consulting-form bg-white shadow-lg mb-5 mb-lg-0" action="#" method="post" role="form">
                                <div className="consulting-form-header d-flex align-items-center">
                                    <h3 className="mb-4">Réserver un service !</h3>
                                </div>

                                <div className="consulting-form-body">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <input type="text" name="volunteer-name" id="volunteer-name" className="form-control" placeholder="Nom" required />
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-12">
                                            <input type="email" name="volunteer-email" id="volunteer-email" pattern="[^ @]*@[^ @]*" className="form-control" placeholder="yours@mail.com" required />
                                        </div>
                                    </div>

                                    <select className="form-select form-control" name="job-salary" id="job-salary" aria-label="Default select example">
                                        <option selected>Liste des services</option>
                                        <option value="1">Netoyage des Tapis</option>
                                        <option value="2">Lavage de vetements</option>
                                        <option value="2">Netoyage des draps, couvertures...</option>
                                        <option value="2">Repassage professionnel</option>
                                    </select>

                                    <textarea name="volunteer-message" rows="3" className="form-control" id="volunteer-message" placeholder="Commentaire (Optionel)"></textarea>

                                    <div className="col-lg-6 col-md-10 col-8 mx-auto">
                                        <button type="submit" className="form-control">Réserver</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}