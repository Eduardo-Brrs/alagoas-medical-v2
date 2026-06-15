import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Parceiros from "@/components/sections/Parceiros";
import ProdutosDestaque from "@/components/sections/ProdutosDestaque";
import Sobre from "@/components/sections/Sobre";
import Contato from "@/components/sections/Contato";
import Avaliacoes from "@/components/sections/Avaliacoes";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <Parceiros />
        <ProdutosDestaque />
        <Sobre />
        <Contato />
        <Avaliacoes />
      </main>
      <Footer />
    </>
  );
}
