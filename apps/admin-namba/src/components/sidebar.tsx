import "@/styles/globals.css";
import Image from "next/image";
import Link from "next/link";

export default function SideBar() {
    return (
        <div className="sidebar">
            {/* Logo en haut */}
            <div className="logo-container">
                <Link href="/dashboard">
                    <Image 
                        src="/LOGO_NAMBA.png" 
                        alt="Logo" 
                        width={70}
                        height={60} 
                        priority
                    />
                </Link>
            </div>

            {/* Menu */}
            <ul>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/dashboard/services">Services</Link></li>
                <li><Link href="/dashboard/collector">Collecteurs</Link></li>
                <li><Link href="/dashboard/settings">Paramètres</Link></li>
            </ul>
        </div>
    );
}