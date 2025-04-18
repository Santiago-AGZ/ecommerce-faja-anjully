import { Link, NavLink } from "react-router-dom";
import { navbarLinks } from "../../constants/links";
import { MdOutlineSearch, MdOutlineShoppingBag } from "react-icons/md";
import { FaBarsStaggered } from "react-icons/fa6";
import { Logo } from "./Logo";

export const Navbar = () => { 
    return (
        <header className="bg-[#a06078] text-[#f3c1c0] py-4 flex items-center justify-between px-5 border-b border-[#d19ba1] lg:px-12">
            <Logo />
        
            <nav className="space-x-5 hidden md:flex">
                {
                    navbarLinks.map((link) => (
                        <NavLink
                            key={link.id}
                            to={link.href}
                            className={({ isActive }) => 
                                `${
                                    isActive ? "text-[#f4c4c2] underline" : "text-[#f3c1c0]"
                                } transition-all duration-300 font-medium hover:text-[#f4c4c2]`
                            }
                        >
                            {link.title}
                        </NavLink>
                    ))}
            </nav>

            <div className="flex gap-5 items-center">
                <button className="text-[#f3c1c0] hover:text-[#f4c4c2]">
                    <MdOutlineSearch size={25} />
                </button>
                <div className="relative">
                    <Link
                        to="/account"
                        className="border-2 border-[#f3c1c0] w-9 h-9 rounded-full grid place-items-center text-lg font-bold text-[#f3c1c0] hover:border-[#f4c4c2] hover:text-[#f4c4c2]"
                    >
                        R
                    </Link>
                </div>

                <button className="relative text-[#f3c1c0] hover:text-[#f4c4c2]">
                    <span className="absolute -bottom-2 -right-2 w-4 h-5 grid place-items-center bg-[#f4c4c2] text-[#a06078] text-xs rounded-full">0</span>
                    <MdOutlineShoppingBag size={25} />
                </button>
            </div>

            <button className="md:hidden text-[#f3c1c0] hover:text-[#f4c4c2]">
                <FaBarsStaggered size={25} />
            </button>
        </header>
    );
};