import fs from "fs";

let content = fs.readFileSync("src/App.tsx", "utf-8");

const ajaxTopics = `  },
  {
    id: "17", label: "AJAX", title: "Capa e Visão Geral", colorText: "text-blue-400", colorDot: "bg-blue-400", icon: Globe,
    description: "Visão Geral do AJAX (Asynchronous JavaScript and XML). Revolução na forma como construímos aplicações web rápidas e dinâmicas.",
    points: [
      "Atualiza uma página web sem precisar recarregá-la.",
      "Solicita e recebe dados de um servidor em background.",
      "A base das aplicações Single Page (SPA) modernas."
    ],
    details: ["Apresentação", "Introdução", "Visão Geral"],
    code: "// AJAX não é uma linguagem de programação.\\n// É uma técnica para acessar servidores.\\nconsole.log('AJAX Iniciado!');"
  },
  {
    id: "18", label: "CONCEITO", title: "Compreendendo o Conceito", colorText: "text-indigo-400", colorDot: "bg-indigo-400", icon: Network,
    description: "A transição de páginas estáticas para interfaces fluidas. AJAX quebra o paradigma de 'clicar e esperar'.",
    points: [
      "Antes do AJAX: Toda ação exigia uma página inteira nova.",
      "Com AJAX: Apenas pequenos pedaços trafegam pela rede.",
      "Permite interatividade em tempo real e interfaces ricas."
    ],
    details: ["Evolução Web", "Paradigma", "Asincronicidade"],
    code: "// Exemplo de Transição Visual\\nUI.showLoading();\\nfetchData().then(() => UI.hideLoading());"
  },
  {
    id: "19", label: "DEFINIÇÃO", title: "O que é AJAX?", colorText: "text-purple-400", colorDot: "bg-purple-400", icon: FileEdit,
    description: "AJAX é um acrônimo e a combinação de tecnologias existentes trabalhando em conjunto (JS + API).",
    points: [
      "A = Asynchronous (Assíncrono): A página não trava.",
      "J = JavaScript: O motor que faz a requisição.",
      "X = XML: O formato original (JSON é o atual)."
    ],
    details: ["Técnica", "Acrônimo", "Combinação"],
    code: "// Asynchronous JavaScript And XML\\n// Usa o objeto XMLHttpRequest do navegador."
  },
  {
    id: "20", label: "BENEFÍCIOS", title: "Principais Benefícios", colorText: "text-emerald-400", colorDot: "bg-emerald-400", icon: Zap,
    description: "Atualizações parciais sem recarregamento (reload) trazem um salto gigantesco na UX (User Experience).",
    points: [
      "Atualização em Background sem piscar a tela.",
      "Economia de Banda e velocidade na troca de dados.",
      "Separação clara entre Dados e Interface (Cliente)."
    ],
    details: ["Sem Reload", "UX Superior", "Separação"],
    code: "button.onclick = function() {\\n  // Apenas a div de preço é atualizada!\\n  atualizarPrecoAsync();\\n};"
  },
  {
    id: "21", label: "PILARES", title: "Os Pilares do AJAX", colorText: "text-yellow-400", colorDot: "bg-yellow-400", icon: ShieldCheck,
    description: "As tecnologias built-in no navegador que tornam o AJAX possível. Baseia-se em Web Standards puros.",
    points: [
      "1. O objeto XMLHttpRequest (XHR) ou a API Fetch.",
      "2. JavaScript, a cola lógica que engatilha tudo.",
      "3. O HTML DOM, modificado visualmente no fim."
    ],
    details: ["XHR / Fetch", "JavaScript", "HTML DOM"],
    code: "const xhttp = new XMLHttpRequest();\\nxhttp.onload = function() {\\n  div.innerHTML = this.responseText;\\n}"
  },
  {
    id: "22", label: "FUNCIONALIDADE", title: "Como Funciona", colorText: "text-orange-400", colorDot: "bg-orange-400", icon: Settings2,
    description: "Comunicação via protocolo HTTP. Navegador cria a requisição, servidor processa e devolve os dados.",
    points: [
      "O evento ocorre (ex: um botão de 'Ler Mais' clicado).",
      "XMLHttpRequest é criado pelo JavaScript na memória.",
      "XHR envia uma requisição silenciosa ao servidor."
    ],
    details: ["Client / Server", "Network", "HTTP"],
    code: "xhttp.open('GET', 'ajax_info.txt', true);\\nxhttp.send();\\n// O 'true' garante que é Assíncrono!"
  },
  {
    id: "23", label: "FLUXO", title: "Fluxo de Execução", colorText: "text-red-400", colorDot: "bg-red-400", icon: PlaySquare,
    description: "Uma linha do tempo de como os dados são despachados, recebidos e renderizados na DOM API visual.",
    points: [
      "1. Navegador envia HTTP Request -> Servidor.",
      "2. Servidor processa o arquivo e retorna Response.",
      "3. JS processa o Response texto e atualiza o DOM."
    ],
    details: ["Timeline", "Request", "Response", "DOM"],
    code: "xhttp.onreadystatechange = function() {\\n  if (this.readyState == 4 && this.status == 200) {\\n     // Fim do Fluxo: Atualizar Tela!\\n  }\\n};"
  },
  {
    id: "24", label: "FORMATOS", title: "Versatilidade (JSON)", colorText: "text-cyan-400", colorDot: "bg-cyan-400", icon: FileEdit,
    description: "Apesar do 'X' significar XML, o AJAX é inteligente o suficiente para trafegar múltiplos conteúdos hoje em dia.",
    points: [
      "Substituição de XML por JSON (Object Notation).",
      "Recebe e lê Texto Puro (Plain Text) das requisições.",
      "Transporta Streams e Blobs para uploads pesados."
    ],
    details: ["JSON", "XML", "Text", "Blob"],
    code: "// Lendo JSON com Fetch API (Modern)\\nfetch('dados.json')\\n  .then(r => r.json())\\n  .then(d => render(d));"
  },
  {
    id: "25", label: "COMPARAÇÃO", title: "AJAX vs Tradicional", colorText: "text-rose-400", colorDot: "bg-rose-400", icon: Search,
    description: "O fluxo inteligente assíncrono vs modelo antiquado síncrono da Web 1.0 onde cada clique custava uma aba inteira nova.",
    points: [
      "Tradicional: Form Submit -> Tela Branca -> Página.",
      "AJAX: Interação -> Loader -> Modifica 1 Quadrado.",
      "AJAX evita reflow bruto de CSS re-processado do zero."
    ],
    details: ["Síncrono", "Assíncrono", "Eficiência"],
    code: "// Tradicional: \\n<form action='/send'>...</form>\\n\\n// AJAX:\\nform.onsubmit = (e) => { e.preventDefault(); postAjax(); }"
  },
  {
    id: "26", label: "PERFORMANCE", title: "Impacto e Escalabilidade", colorText: "text-green-500", colorDot: "bg-green-500", icon: ArrowUpCircle,
    description: "Redução drástica do tamanho dos bytes gastos pelas requests (payload). Imprescindível para alta escala em servidores.",
    points: [
      "Menos bytes, pois apenas dados puros trafegam em HTTP.",
      "Economia do CSS/JS global ser recarregado na rede.",
      "Excelente para autocomplete (onde a div muda sozinha)."
    ],
    details: ["Baixa Latência", "Min. Bytes", "UX Boost"],
    code: "/* Custo Performance: \\n   Request HTML + Imgs = 2.5 MB\\n   Request AJAX JSON   = 5 KB\\n*/"
  },
  {
    id: "27", label: "CASOS", title: "Exemplos Reais (W3)", colorText: "text-amber-400", colorDot: "bg-amber-400", icon: Globe,
    description: "A popularização técnica se deve pelo sucesso maciço no ecossistema gigante, que ensinou que UX dinâmica salva tempo.",
    points: [
      "Google Autocomplete: Carrega sem dar refresh da guia.",
      "Google Maps: Pan/Zoom sem interromper navegação.",
      "Gmail: Atualiza o lado esquerdo de forma invisível."
    ],
    details: ["Maps", "Gmail", "Auto-Complete"],
    code: "// Simulando Gmail Background Check:\\nsetInterval(() => {\\n  checkNewEmailsAjax();\\n}, 15000);"
  },
  {
    id: "28", label: "QA & FIM", title: "Conclusão e Q&A", colorText: "text-white", colorDot: "bg-white", icon: CheckCircle2,
    description: "Resumo nuclear assíncrono. O AJAX fundacional pavimentou a chegada do Fetch, Node, SPAs como React e WebSockets no mercado.",
    points: [
      "Familiaridade com XMLHttpRequest e Fetch são a chave.",
      "Consultar w3schools/xml/ajax_intro nas horas vagas.",
      "Aba Network (F12) é a melhor lousa para debugar isso."
    ],
    details: ["Conclusão", "Axios", "Fetch API", "DOM"],
    code: "// Aulas concluídas!\\nconsole.log('Utilize a aba Network do Console!');"
  }
];`;

content = content.replace("  }\n];", ajaxTopics);

// Now tweak grid layout slightly so 28 items fit beautifully without scrolling if zoomed properly
// We change `grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4` to `grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1 sm:gap-1.5 lg:gap-2`
// We also reduce paddings to make things more compact
content = content.replace(
  'className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 flex-grow min-h-0"',
  'className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-1.5 sm:gap-2 lg:gap-2.5 flex-grow min-h-0 mt-2"'
);

// Reduce item padding and text sizes
content = content.replace(
  'rounded-lg sm:rounded-xl p-2.5 sm:p-4 backdrop-blur-sm',
  'rounded-lg sm:rounded-xl p-2 sm:p-2.5 lg:p-3 backdrop-blur-sm'
);
content = content.replace(
  'O Core do JavaScript',
  'O Core do JavaScript & AJAX'
);
content = content.replace(
  'INTERATIVO 16 MÓDULOS',
  'INTERATIVO 28 MÓDULOS'
);

content = content.replace(
  'const totalSlides = detailedTopics.length + 1; // 1 home + 16 topics',
  'const totalSlides = detailedTopics.length + 1; // 1 home + topics'
);

fs.writeFileSync("src/App.tsx", content);
console.log("Updated App.tsx successfully with 12 new slides");
