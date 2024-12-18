import { Link } from "react-router-dom"



export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row">

                    <div className="col-lg-12 col-12 d-flex align-items-center mb-4 pb-2">
                        <div>
                            <img src="/bubbles.png" className="logo img-fluid" alt="" />
                        </div>

                        <ul className="footer-menu d-flex flex-wrap ms-5">
                            <li className="footer-menu-item"><Link to={'/about'} className="footer-menu-link">A propos de nous</Link></li>

                            <li className="footer-menu-item"><Link to={'/contact'} className="footer-menu-link">Contacts</Link></li>
                        </ul>
                    </div>

                    <div className="col-lg-5 col-12 mb-4 mb-lg-0">
                        <h5 className="site-footer-title mb-3">Nos Services</h5>

                        <ul className="footer-menu">
                            <li className="footer-menu-item">
                                <Link href="#" className="footer-menu-link">
                                    <i className="bi-chevron-double-right footer-menu-link-icon me-2"></i>
                                    Lavage de vetements
                                </Link>
                            </li>

                            <li className="footer-menu-item">
                                <Link href="#" className="footer-menu-link">
                                    <i className="bi-chevron-double-right footer-menu-link-icon me-2"></i>
                                    Netoyage des Tapis
                                </Link>
                            </li>

                            <li className="footer-menu-item">
                                <Link href="#" className="footer-menu-link">
                                    <i className="bi-chevron-double-right footer-menu-link-icon me-2"></i>
                                    Netoyage des draps, couvertures...
                                </Link>
                            </li>

                            <li className="footer-menu-item">
                                <Link href="#" className="footer-menu-link">
                                    <i className="bi-chevron-double-right footer-menu-link-icon me-2"></i>
                                    Repassage professionnel
                                </Link>
                            </li>

                            <li className="footer-menu-item">
                                <Link href="#" className="footer-menu-link">
                                    <i className="bi-chevron-double-right footer-menu-link-icon me-2"></i>
                                    Services personnalisés
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0 mb-md-0">
                        <h5 className="site-footer-title mb-3">Adresse physique</h5>

                        <p className="text-white d-flex mt-3 mb-2">
                            <i className="bi-geo-alt-fill me-2"></i>
                            Goma 20, Av. du lac, Q.Himbi
                        </p>

                        <p className="text-white d-flex mb-2">
                            <i className="bi-telephone-fill me-2"></i>

                            <Link className="site-footer-link">
                                +243 971-736-244
                            </Link>
                        </p>

                        <p className="text-white d-flex">
                            <i className="bi-envelope-fill me-2"></i>

                            <Link  className="site-footer-link">
                                info@namba.com
                            </Link>
                        </p>

                        <ul className="social-icon mt-4">
                            <li className="social-icon-item">
                                <Link href="#" className="social-icon-link button button--skoll">
                                    <span></span>
                                    <span className="bi-twitter"></span>
                                </Link>
                            </li>

                            <li className="social-icon-item">
                                <Link href="#" className="social-icon-link button button--skoll">
                                    <span></span>
                                    <span className="bi-facebook"></span>
                                </Link>
                            </li>

                            <li className="social-icon-item">
                                <Link href="#" className="social-icon-link button button--skoll">
                                    <span></span>
                                    <span className="bi-instagram"></span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6 col-6 mt-3 mt-lg-0 mt-md-0">
                        <div className="featured-block">
                            <h5 className="text-white mb-3">Horaire de Service</h5>

                            <strong className="d-block text-white mb-1">Lundi - Lundi</strong>

                            <p className="text-white mb-3">24h/24</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-footer-bottom">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-6 col-12">
                            <p className="copyright-text mb-0">Copyright © NAMBA Co., Ltd.</p>
                        </div>

                        <div className="col-lg-6 col-12 text-end">
                            <p className="copyright-text mb-0">
                            Designed by <Link href="https://www.tooplate.com" target="_parent">NAMBA IT TEAM</Link></p>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    )
}