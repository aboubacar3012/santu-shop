import Link from 'next/link';
import { BookMarked } from "lucide-react";
import { ResponsiveContainer } from './ResponsiveContainer';

export const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-gray-900 border-t border-gray-800">
      <ResponsiveContainer>
        <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-8">
          <div className="mb-8 lg:mb-0 max-w-xs">
            <h3 className="text-xl font-bold mb-4 text-white flex items-center">
              <BookMarked className="h-6 w-6 text-orange-400 mr-2" />
              KodeCraft
            </h3>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              La plateforme d&apos;apprentissage qui forme la prochaine génération de développeurs.
            </p>
            <div className="flex space-x-4">
              <SocialIcon href="#" aria="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="#" aria="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="#" aria="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                </svg>
              </SocialIcon>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            <FooterLinksColumn 
              title="Formations" 
              links={[
                { label: "Frontend", href: "/formations/frontend" },
                { label: "Backend", href: "/formations/backend" },
                { label: "Mobile", href: "/formations/mobile" },
                { label: "DevOps", href: "/formations/devops" },
              ]}
            />
            
            <FooterLinksColumn 
              title="Ressources" 
              links={[
                { label: "Blog Technique", href: "/blog" },
                { label: "Documentation", href: "/docs" },
                { label: "Projets Pratiques", href: "/projets" },
                { label: "Communauté", href: "/community" },
              ]}
            />

            <FooterLinksColumn 
              title="KodeCraft" 
              links={[
                { label: "À propos", href: "/about" },
                { label: "Tarifs", href: "/pricing" },
                { label: "Pour les entreprises", href: "/business" },
                { label: "Nous contacter", href: "/contact" },
              ]}
            />
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p className="text-sm mb-4 md:mb-0">© {new Date().getFullYear()} KodeCraft. Tous droits réservés.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm hover:text-orange-400 transition-colors duration-300">Confidentialité</a>
            <a href="#" className="text-sm hover:text-orange-400 transition-colors duration-300">Conditions</a>
          </div>
        </div>
      </ResponsiveContainer>
    </footer>
  );
};

interface SocialIconProps {
  href: string;
  aria: string;
  children: React.ReactNode;
}

const SocialIcon = ({ href, aria, children }: SocialIconProps) => (
  <a 
    href={href} 
    aria-label={aria}
    className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
  >
    {children}
  </a>
);

interface FooterLinksColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

const FooterLinksColumn = ({ title, links }: FooterLinksColumnProps) => (
  <div>
    <h4 className="text-lg font-semibold mb-4 text-white">{title}</h4>
    <ul className="space-y-2 text-gray-400">
      {links.map((link, index) => (
        <li key={index}>
          <Link 
            href={link.href} 
            className="text-sm sm:text-base hover:text-orange-400 transition-colors duration-300"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);