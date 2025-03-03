import SideBar from "@/components/sidebar"
import SpinnerClient from "@/components/spinner";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SpinnerClient />
            <div className="main-container">
                <SideBar />
                <main className="main-content">{children}</main>
            </div>
        </>
    );
}
