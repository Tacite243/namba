


export default function Footer() {
    return (
        <footer class="site-footer">
            <div class="container">
                <div class="row">

                    <div class="col-lg-12 col-12 d-flex align-items-center mb-4 pb-2">
                        <div>
                            <img src="/bubbles.png" class="logo img-fluid" alt="" />
                        </div>

                        <ul class="footer-menu d-flex flex-wrap ms-5">
                            <li class="footer-menu-item"><a href="#" class="footer-menu-link">A propos de nous</a></li>

                            <li class="footer-menu-item"><a href="#" class="footer-menu-link">Contacts</a></li>
                        </ul>
                    </div>

                    <div class="col-lg-5 col-12 mb-4 mb-lg-0">
                        <h5 class="site-footer-title mb-3">Nos Services</h5>

                        <ul class="footer-menu">
                            <li class="footer-menu-item">
                                <a href="#" class="footer-menu-link">
                                    <i class="bi-chevron-double-right footer-menu-link-icon me-2"></i>
                                    Lavage de vetements
                                </a>
                            </li>

                            <li class="footer-menu-item">
                                <a href="#" class="footer-menu-link">
                                    <i class="bi-chevron-double-right footer-menu-link-icon me-2"></i>
                                    Netoyage des Tapis
                                </a>
                            </li>

                            <li class="footer-menu-item">
                                <a href="#" class="footer-menu-link">
                                    <i class="bi-chevron-double-right footer-menu-link-icon me-2"></i>
                                    Netoyage des draps, couvertures...
                                </a>
                            </li>

                            <li class="footer-menu-item">
                                <a href="#" class="footer-menu-link">
                                    <i class="bi-chevron-double-right footer-menu-link-icon me-2"></i>
                                    Repassage professionnel
                                </a>
                            </li>

                            <li class="footer-menu-item">
                                <a href="#" class="footer-menu-link">
                                    <i class="bi-chevron-double-right footer-menu-link-icon me-2"></i>
                                    Services personnalisés
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0 mb-md-0">
                        <h5 class="site-footer-title mb-3">Adresse physique</h5>

                        <p class="text-white d-flex mt-3 mb-2">
                            <i class="bi-geo-alt-fill me-2"></i>
                            Goma 20, Av. du lac, Q.Himbi
                        </p>

                        <p class="text-white d-flex mb-2">
                            <i class="bi-telephone-fill me-2"></i>

                            <a class="site-footer-link">
                                +243 971-736-244
                            </a>
                        </p>

                        <p class="text-white d-flex">
                            <i class="bi-envelope-fill me-2"></i>

                            <a  class="site-footer-link">
                                info@namba.com
                            </a>
                        </p>

                        <ul class="social-icon mt-4">
                            <li class="social-icon-item">
                                <a href="#" class="social-icon-link button button--skoll">
                                    <span></span>
                                    <span class="bi-twitter"></span>
                                </a>
                            </li>

                            <li class="social-icon-item">
                                <a href="#" class="social-icon-link button button--skoll">
                                    <span></span>
                                    <span class="bi-facebook"></span>
                                </a>
                            </li>

                            <li class="social-icon-item">
                                <a href="#" class="social-icon-link button button--skoll">
                                    <span></span>
                                    <span class="bi-instagram"></span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-md-6 col-6 mt-3 mt-lg-0 mt-md-0">
                        <div class="featured-block">
                            <h5 class="text-white mb-3">Horaire de Service</h5>

                            <strong class="d-block text-white mb-1">Lundi - Lundi</strong>

                            <p class="text-white mb-3">8h00 - 17h00</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="site-footer-bottom">
                <div class="container">
                    <div class="row">

                        <div class="col-lg-6 col-12">
                            <p class="copyright-text mb-0">Copyright © NAMBA Co., Ltd.</p>
                        </div>

                        <div class="col-lg-6 col-12 text-end">
                            <p class="copyright-text mb-0">
                            Designed by <a href="https://www.tooplate.com" target="_parent">NAMBA IT TEAM</a></p>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    )
}