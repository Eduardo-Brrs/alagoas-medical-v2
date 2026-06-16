import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { LINKS } from "@/lib/constants";

export default function Contato() {
  return (
    <section id="contato" className="bg-brand-blue py-[72px]">
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionHeader
          label="Contato"
          title="Fale com a nossa equipe"
          subtitle="Prontos para atender clínicas, hospitais e pacientes"
          onDark
          className="mb-10"
        />

        <div className="grid gap-5 md:grid-cols-2">
          {/* Vendas */}
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-7">
            <BoxIcon />
            <h3 className="mt-3.5 text-base font-medium text-white">
              Vendas e produtos
            </h3>
            <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-white/70">
              Dúvidas sobre produtos, pedidos ou suporte comercial.
            </p>
            <div className="mt-5">
              <Button href={LINKS.whatsappVendas} variant="whatsapp" external>
                <WhatsAppIcon />
                Falar com vendas
              </Button>
            </div>
          </div>

          {/* Curativos e Home Care */}
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-7">
            <CareIcon />
            <h3 className="mt-3.5 text-base font-medium text-white">
              Curativos e Home Care
            </h3>
            <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-white/70">
              Orientações técnicas e atendimentos domiciliares com nossas
              especialistas.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href={LINKS.whatsappCleocina} variant="whatsapp" external>
                <WhatsAppIcon />
                Cleocina
              </Button>
              <Button href={LINKS.whatsappMariana} variant="whatsapp" external>
                <WhatsAppIcon />
                Mariana
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BoxIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-brand-red"
      aria-hidden="true"
    >
      <path d="m7.5 4.27 9 5.15M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
    </svg>
  );
}

function CareIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-brand-red"
      aria-hidden="true"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
