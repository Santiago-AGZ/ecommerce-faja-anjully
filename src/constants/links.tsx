import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";

// This file contains the links for the navbar
export const navbarLinks = [
    {
        id: 1,
        title: "Inicio",
        href: "/",
    },
    {
        id: 2,
        title: "Fajas",
        href: "/productos",
    },
    {
        id: 3,
        title: "Sobre Nosotros",
        href: "/sobre-nosotros",
    },
];

export const  socialLinks = [
    {
        id: 1,
        title: "Facebook",
        href: "https://www.facebook.com/people/Julieth-Angelica-Alvarez/100089795958009/?ref=ig_profile_ac",
        icon: <FaFacebook/>,
    },
    {
        id: 2,
        title: "Instagram",
        href: "https://www.instagram.com/fajas.anjully/?hl=es",
        icon: <FaInstagram/>,
    },
    {
        id: 3,
        title: "Twitter",
        href: "https://www.tiktok.com/@fajasanjully",
        icon: <FaTiktok/>,
    },
];