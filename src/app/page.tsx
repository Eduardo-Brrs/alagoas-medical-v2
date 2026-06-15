import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Parceiros from "@/components/sections/Parceiros";
import ProdutoDestaque from "@/components/sections/ProdutoDestaque";
import Sobre from "@/components/sections/Sobre";
import Contato from "@/components/sections/Contato";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <Parceiros />
        <ProdutoDestaque />
        <Sobre />
        <Contato />
      </main>
    </>
  );
}
