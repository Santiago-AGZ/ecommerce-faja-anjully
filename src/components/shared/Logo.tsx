import { Link } from "react-router-dom";

interface Props {
    isDashboard?: boolean;
}

export const Logo = ({ isDashboard }: Props) => {
    return (
        <Link 
            to="/" 
            className={`flex items-center gap-1 text-2xl font-bold tracking-tighter transition-all text-[#6d3843] ${
                isDashboard && 'hover:scale-105'
            }`}
        >
            {/* Icono - visible en todos los tamaños */}
            <img 
                src="/LogoFA.ico" 
                alt="Fajas Anjully Logo" 
                className="w-16 h-16 object-contain"
            />
            
            {/* Texto completo - visible solo en pantallas grandes */}
            <p className="hidden lg:block">
                Fajas
                <span className="text-[#fbeaea]">Anjully</span>
            </p>

            {/* Texto abreviado - visible solo en móviles */}
            <p className="flex text-4xl lg:hidden">
                <span className="-skew-x-6 text-[#6d3843]">F</span>
                <span className="text-[#fbeaea] skew-x-6">A</span>
            </p>
        </Link>
    );
};