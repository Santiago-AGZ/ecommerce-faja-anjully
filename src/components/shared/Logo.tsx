import { Link } from "react-router-dom";

export const Logo = () => {
    return (
        <Link to="/" className={"text-2xl font-bold tracking-tighter transition-all text-[#6d3843]"}>
            <p className="hidden lg:block">
                Fajas
                <span className="text-[#fbeaea]">Anjully</span>
            </p>

            <p className="flex text-4xl lg:hidden">
                <span className="-skew-x-6 text-[#6d3843]">F</span>
                <span className="text-[#fbeaea] skew-x-6">A</span>
            </p>
        </Link>
    );
};