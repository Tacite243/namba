import { Link } from "react-router-dom";



export default function ServiceCard({data}) {
    return (
        <div class="col-lg-6 col-12">
            <div class="services-thumb">
                <div class="row">
                    <div class="col-lg-5 col-md-5 col-12">
                        <div class="services-image-wrap">
                            <Link href="services-detail.html">
                                <img src={data.avatar} class="services-image img-fluid" alt="" />
                                <img src={data.hover} class="services-image services-image-hover img-fluid" alt="" />

                                <div class="services-icon-wrap">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <p class="text-white mb-0">
                                            <i class="bi-cash me-2"></i>
                                            ${data.tarif.amount}
                                        </p>

                                        <p class="text-white mb-0">
                                            <i class="bi-clock-fill me-2"></i>
                                            {data.tarif.unity}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div class="col-lg-7 col-md-7 col-12 d-flex align-items-center">
                        <div class="services-info mt-4 mt-lg-0 mt-md-0">
                            <h4 class="services-title mb-1 mb-lg-2">
                                <a class="services-title-link" href="services-detail.html">{data.title}</a>
                            </h4>

                            <p>{data.description}</p>

                            <div class="d-flex flex-wrap align-items-center">
                                <div class="reviews-icons">
                                    <i class="bi-star-fill"></i>
                                    <i class="bi-star-fill"></i>
                                    <i class="bi-star-fill"></i>
                                    <i class="bi-star"></i>
                                    <i class="bi-star"></i>
                                </div>

                                <a href="services-detail.html" class="custom-btn btn button button--atlas mt-2 ms-auto">
                                    <span>Réserver</span>

                                    <div class="marquee" aria-hidden="true">
                                        <div class="marquee__inner">
                                            <span>Pas la peine</span>
                                            <span>Pas la peine de vous deplacer</span>
                                            <span>deplacer</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}