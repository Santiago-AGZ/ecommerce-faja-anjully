import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { socialLinks } from "../../constants/links";

export const Footer = () => {
    return (
        <footer className="py-16 bg-[#a06078] px-12 flex justify-between gap-10 text-[#f3c1c0] text-sm flex-wrap mt-10 md:flex-nowrap">
            <Link 
                to="/" 
                className="text-2xl font-bold tracking-tighter transition-all text-[#f3c1c0] flex-1"
            >
                Fajas Anjully
            </Link>
            <div className="flex flex-col gap-4 flex-1">
                <p className="font-semibold uppercase tracking-tighter">Suscríbete</p>
                <p className="text-xs font-medium">Recibe Promociones exclusivas</p>
                <div className="border border-[#f4c4c2] flex items-center gap-2 px-3 py-2 rounded-full">
                    <input 
                        type="email" 
                        placeholder="Ingresa tu correo" 
                        className="pl-2 bg-[#a06078] text-[#f3c1c0] w-full focus:outline-none"
                    />
                    <button className="text-[#f3c1c0] hover:text-[#f4c4c2]">
                        <BiChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4 flex-1">
                <p className="font-semibold uppercase tracking-tighter">
                    Políticas
                </p>
                <nav className="flex flex-col gap-2 text-xs font-medium">
                    <Link to="/productos" className="text-[#f3c1c0] hover:text-[#f4c4c2]">Productos</Link>
                    <Link to="#" className="text-[#f4c4c2] hover:text-[#f3c1c0]">
                        Políticas de Privacidad
                    </Link>
                    <Link to="#" className="text-[#f4c4c2] hover:text-[#f3c1c0]">
                        Términos y Condiciones
                    </Link>
                </nav>
            </div>

            <div className="flex flex-col gap-4 flex-1">
                <p className="font-semibold uppercase tracking-tighter">
                    Síguenos
                </p>

                <p className="text-xs leading-6">
                    Encuentra lo que buscas en nuestras redes sociales y no te pierdas de nada.
                </p>

                <div className="flex">
                    {
                        socialLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#f4c4c2] border border-[#f4c4c2] w-full h-full py-3.5 flex items-center justify-center transition-all hover:bg-[#f3c1c0] hover:text-[#a06078]"
                            >
                                {link.icon}
                            </a>
                        ))
                    }
                </div>
            </div>
        </footer>
    );
};