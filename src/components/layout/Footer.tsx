import Logo from "@/components/ui/Logo";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { EMPRESA, LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-brand-blue-footer pt-12 pb-7 text-white">
      <div className="mx-auto max-w-site px-6">
        {/* Topo */}
        <div className="flex flex-col gap-6 border-b border-white/[0.08] pb-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo variant="footer" />
            <address className="mt-3 text-xs not-italic leading-[1.9] text-white/60">
              <a
                href={LINKS.mapas}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {EMPRESA.endereco}
              </a>
              <br />
              <a
                href={LINKS.whatsappTelefone}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {EMPRESA.telefone}
              </a>
              {" · "}
              <a
                href={`mailto:${EMPRESA.email}`}
                className="transition-colors hover:text-white"
              >
                {EMPRESA.email}
              </a>
              <br />
              CNPJ: {EMPRESA.cnpj}
            </address>
          </div>

          {/* Redes sociais */}
          <ul className="flex items-center gap-4">
            <li>
              <a
                href={LINKS.whatsappTelefone}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Alagoas Medical"
                className="block text-white/55 transition-colors hover:text-white"
              >
                <WhatsAppIcon size={20} />
              </a>
            </li>
            <li>
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Alagoas Medical"
                className="block text-white/55 transition-colors hover:text-white"
              >
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a
                href={LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook da Alagoas Medical"
                className="block text-white/55 transition-colors hover:text-white"
              >
                <FacebookIcon />
              </a>
            </li>
          </ul>
        </div>

        {/* Base */}
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.6875rem] text-white/55">
            © {new Date().getFullYear()} {EMPRESA.nome} · Todos os direitos
            reservados
          </p>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
