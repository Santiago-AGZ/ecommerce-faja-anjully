import { Link } from "react-router-dom";

export const Logo = () => {
    return (
        <Link to="/" className={"text-2xl font-bold tracking-tighter transition-all text-[#f3c1c0]"}>
            <p className="hidden lg:block">
                Fajas
                <span className="text-[#f4c4c2]">Anjully</span>
            </p>

            <p className="flex text-4xl lg:hidden">
                <span className="-skew-x-6 text-[#f3c1c0]">F</span>
                <span className="text-[#f4c4c2] skew-x-6">A</span>
            </p>
        </Link>
    );
};