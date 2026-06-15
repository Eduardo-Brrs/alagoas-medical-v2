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
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-white shadow-[0_4px_20px_rgba(37,211,102,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
    >
      <WhatsAppIcon size={22} />
      <span className="hidden sm:inline">Falar pelo WhatsApp</span>
    </Link>
  );
}
