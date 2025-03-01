"use client"
import { useRouter } from "next/router";

export default function OrderDetail() {
    const router = useRouter();
    const { id } = router.query;

    return <h1>Détails de la commande {id}</h1>;
}