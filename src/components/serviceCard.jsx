import { Link } from "react-router-dom";



export default function ServiceCard({data}) {
    return (
        <div className="col-lg-6 col-12">
            <div className="services-thumb">
                <div className="row">
                    <div className="col-lg-5 col-md-5 col-12">
                        <div className="services-image-wrap">
                            <Link href="services-detail.html">
                                <img src={data.avatar} className="services-image img-fluid" alt="" />
                                <img src={data.hover} className="services-image services-image-hover img-fluid" alt="" />

                                <div className="services-icon-wrap">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="text-white mb-0">
                                            <i className="bi-cash me-2"></i>
                                            ${data.tarif.amount}
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
                                <Link className="services-title-link" href="services-detail.html">{data.title}</Link>
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

                                <Link href="services-detail.html" className="custom-btn btn button button--atlas mt-2 ms-auto">
                                    <span>Réserver</span>

                                    <div className="marquee" aria-hidden="true">
                                        <div className="marquee__inner">
                                            <span>Pas la peine</span>
                                            <span>Pas la peine de vous deplacer</span>
                                            <span>deplacer</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}