import Link from "next/link";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { LINKS } from "@/lib/constants";

export default function WhatsAppFloat() {
  return (
    <Link
      href={LINKS.whatsappVendas}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Alagoas Medical pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-medium text-white shadow-[0_4px_20px_rgba(7,94,84,0.4)] transition-all hover:-translate-y-0.5 hover:bg-whatsapp-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-whatsapp"
    >
      <WhatsAppIcon size={22} />
      <span className="hidden sm:inline">Falar pelo WhatsApp</span>
    </Link>
  );
}
