import SideBar from "@/components/sidebar"
import SpinnerClient from "@/components/spinner";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <SpinnerClient/>
            <SideBar />
            <>{children}</>
        </>
    );
}
