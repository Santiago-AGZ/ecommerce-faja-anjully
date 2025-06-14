import { Link } from "react-router-dom";
import { socialLinks } from "../../constants/links";

export const Footer = () => {
    return (
        <footer className="py-16 bg-[#D19BA1] px-12 flex justify-between gap-10 text-[#fbeaea] text-sm flex-wrap mt-10 md:flex-nowrap">
            <Link 
                to="/" 
                className="text-2xl font-bold tracking-tighter transition-all text-[#fbeaea] flex-1"
            >
                Fajas Anjully
            </Link>
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
                                className="text-[#fbeaea] border border-[#fbeaea] w-full h-full py-3.5 flex items-center justify-center transition-all hover:bg-[#fbeaea] hover:text-[#c4879b]"
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