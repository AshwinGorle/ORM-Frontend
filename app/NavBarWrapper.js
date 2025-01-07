"use client"; 

import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";

export default function NavBarWrapper() {
    const pathname = usePathname();

    const hideNavBarRoutes = ["/", "/login", "/signup"];

    const shouldShowNavBar = !hideNavBarRoutes.includes(pathname);

    return shouldShowNavBar ? <NavBar /> : null;
}
