import { Link } from "react-router-dom"



export default function Header() {
    return (
        <header className="site-header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-12 d-flex flex-wrap">

                        <p className="d-flex me-4 mb-0">
                            <i className="bi-house-fill me-2"></i>
                            Le meuilleur Service de Pressing d'Afrique
                        </p>

                        <p className="d-flex d-lg-block d-md-block d-none me-4 mb-0">
                            <i className="bi-clock-fill me-2"></i>
                            <strong className="me-2">Du Lundi au Lundi</strong> de 8h00 à 17h00
                        </p>

                        <p className="site-header-icon-wrap text-white d-flex mb-0 ms-auto">
                            <i className="site-header-icon bi-whatsapp me-2"></i>

                            <Link className="text-white">
                                +243 971 736 244
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </header>
    )
}