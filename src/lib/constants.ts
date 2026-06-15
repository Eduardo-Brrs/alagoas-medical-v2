/**
 * Fonte única de verdade para todos os dados da empresa.
 * Nunca hardcodar esses valores diretamente nos componentes — sempre importar daqui.
 */

export const EMPRESA = {
  nome: "Alagoas Medical",
  slogan: "Produtos Hospitalares",
  cnpj: "30.788.967/0001-40",
  email: "alagoasmedical@gmail.com",
  telefone: "(82) 3024-7070",
  endereco: "R. Srg. Nelmont, 76b - Gruta de Lourdes, Maceió - AL, 57052-815",
  fundacao: "2018",
} as const;

export const LINKS = {
  whatsappVendas: "https://wa.me/message/PRTC3KC2G4JCD1",
  whatsappCleocina: "https://wa.me/558299245371",
  whatsappMariana: "https://wa.me/558296777171",
  whatsappTelefone: "https://wa.me/558230247070",
  instagram: "https://instagram.com/alagoasmedical",
  facebook: "https://facebook.com/alagoasmedical",
  mapas: "https://maps.app.goo.gl/fzEaUimbvkdFTwAn9",
  carilex: "https://www.carilexmedical.com/",
  curatec: "https://www.curatec.com.br/",
  flenHealth: "https://www.flenhealth.com/",
} as const;

export type Parceiro = {
  nome: string;
  descricao: string;
  logo: string;
  site: string;
  /** true enquanto o arquivo do logo ainda não foi enviado pelo cliente */
  placeholder?: boolean;
};

export const PARCEIROS: Parceiro[] = [
  {
    nome: "Carilex Medical",
    descricao: "Colchões e superfícies terapêuticas",
    logo: "/images/carilex-logo.png",
    site: LINKS.carilex,
  },
  {
    nome: "Curatec",
    descricao: "Curativos de alta complexidade",
    logo: "/images/curatec-logo.jpg",
    site: LINKS.curatec,
  },
  {
    nome: "Flen Health",
    descricao: "Curativos enzimáticos especializados",
    logo: "/images/flenhealth-logo.png",
    site: LINKS.flenHealth,
  },
];

/**
 * Produto em destaque — componente intercambiável.
 * Para trocar o produto destacado no futuro, basta editar este objeto.
 */
export const PRODUTO_DESTAQUE = {
  nome: "Flaminal",
  marca: "Flen Health",
  badge: "Em destaque",
  descricao: "PLACEHOLDER — aguardando texto do cliente.",
  indicacoes: [
    "PLACEHOLDER indicação 1",
    "PLACEHOLDER indicação 2",
    "PLACEHOLDER indicação 3",
  ],
  imagem: "/images/flaminal-produto.png",
  logoMarca: "/images/flenhealth-logo.png",
  linkWhatsapp: LINKS.whatsappVendas,
} as const;

export type Depoimento = {
  nome: string;
  texto: string;
};

export const DEPOIMENTOS: Depoimento[] = [
  {
    nome: "Ana Carolina Beltrão Peixoto",
    texto:
      "Atendimento personalizado. Respeito e empatia. Profissionais com o compromisso na escuta junto ao que a gente precisa. Parabéns.",
  },
  {
    nome: "Meiga Menina Theotonio",
    texto:
      "Uma profissional super competente a Cléo e dispõe de um mix de curativos bem diferenciado. Parabéns.",
  },
  {
    nome: "Tatiana Michaello",
    texto: "Excelente! Competência e atenção sempre igual.",
  },
  {
    nome: "Aline Viana",
    texto:
      "Sou cliente antiga! Toda assistência que precisei recebi com plenitude! Equipe top! Sempre indico!",
  },
];

/**
 * Conteúdo da seção "Sobre" — texto institucional, missão, checklist e fundadora.
 * Urgo removida do texto original (mantidas Curatec, Carilex e Flen Health).
 */
export const SOBRE = {
  titulo: "Alagoas Medical",
  subtitulo: "Desde 2018 · Maceió - AL",
  texto:
    "A Alagoas Medical, com sede em Maceió-AL, atua desde 2018 na distribuição de materiais hospitalares voltados para clínicas, hospitais, instituições públicas e atendimentos domiciliares (Home Care). Com expertise no tratamento de feridas de alta complexidade, oferecemos suporte técnico e produtos de alto desempenho. Trabalhamos com seriedade, ética e foco total na satisfação dos nossos clientes.",
  missao:
    "Promover saúde com responsabilidade, oferecendo produtos de qualidade e suporte técnico especializado para hospitais, clínicas e pacientes. Nosso compromisso é com a excelência, a ética e o bem-estar de todos que confiam no nosso trabalho.",
  checklist: [
    "Atendimento humanizado e profissional",
    "Representação de marcas líderes em curativos",
    "Agilidade, confiança e suporte técnico em cada entrega",
  ],
  fundadora: {
    nome: "Cleocina Barros",
    cargo: "Sócia-Proprietária",
    foto: "/images/proprietaria.jpeg",
    bio: "Cleocina Oliveira de Souza Barros é enfermeira e fundadora da Alagoas Medical. Com mais de 10 anos de experiência na área da saúde, ela se dedica ao tratamento de feridas complexas, curativos especiais e atendimentos Home Care. Há 7 anos atua também na gestão da empresa, oferecendo suporte técnico, orientações especializadas e trabalhando em parceria com profissionais da área médica para garantir cuidado, confiança e excelência em cada atendimento.",
  },
  foto: {
    src: "/images/alagoas-medical-foto.jpeg",
    legenda: "Nossa fundadora em evento de vendas do setor, 2025.",
  },
} as const;

/** Estatísticas exibidas no hero. `accent` é o sufixo destacado em vermelho. */
export const HERO_STATS = [
  { num: "7", accent: "+", label: "anos de experiência" },
  { num: "Home Care", accent: "", label: "& linha hospitalar" },
  { num: "100", accent: "%", label: "suporte técnico" },
] as const;

export const NAV_LINKS = [
  { href: "#parceiros", label: "Parceiros" },
  { href: "#produto", label: "Produtos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#avaliacoes", label: "Avaliações" },
] as const;
