"use client"; 

import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";

export default function NavBarWrapper() {
    const pathname = usePathname();

    const hideNavBarRoutes = ["/", "/login", "/signup", "/forgot-password"];

    const shouldShowNavBar = !(
        hideNavBarRoutes.includes(pathname) || 
        pathname.startsWith("/reset-password/")
    );

    return shouldShowNavBar ? <NavBar /> : null;
}
