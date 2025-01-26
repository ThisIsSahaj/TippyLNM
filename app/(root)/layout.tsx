import NavbarWrapper from "@/components/NavbarWrapper";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="font-work-sans">
            <NavbarWrapper />
            {children}
        </main>
    )
}