/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Network, Settings2, Search, FileEdit, Palette, ShieldCheck, PlaySquare, Globe, Fingerprint, CheckCircle2,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const detailedTopics = [
  {
    id: "01", label: "CONCEITO", title: "HTML DOM (Document Object Model)", colorText: "text-blue-500", colorDot: "bg-blue-500", icon: Network,
    description: "O DOM do HTML é um padrão oficial do W3C. Ele define o modelo estrutural do HTML como uma árvore de objetos. Através do DOM, o JavaScript adquire todo o poder necessário para criar documentos HTML fluidos e dinâmicos. Quando a página é carregada, seu navegador constrói o 'Document Object Model' da página da web.",
    points: [
      "Atua como uma ponte entre a página e a linguagem de programação.",
      "Cada tag HTML é convertida em um 'Nó' (Node) na árvore hierárquica.",
      "A espinha dorsal dita: o HTML como objetos, suas propriedades, métodos de acesso e eventos globais."
    ],
    details: ["Document (Raiz)", "Element Node (Tags)", "Attribute Node (href, src)", "Text Node (Texto interno)"],
    code: "/* Com o DOM, o JavaScript pode realizar magias plenas: */\n\n- Alterar todos os elemento da página\n- Mudar todos os atributos das tags\n- Modificar todos os estilos CSS instantaneamente\n- Remover e injetar novos elementos HTML\n- Reagir a todos os eventos como Cliques e Teclados"
  },
  {
    id: "02", label: "INTERFACE", title: "HTML DOM API (Programação)", colorText: "text-purple-500", colorDot: "bg-purple-500", icon: Settings2,
    description: "A API do DOM é a Interface nativa de Programação para o HTML. Ela provê Métodos (ações) e Propriedades (valores). Os Métodos são as funções que você executa. Já as Propriedades são as variáveis (textos, estilos) atreladas aos Elementos que você extrai ou sobrescreve.",
    points: [
      "Método ex: 'getElementById()' (uma ação a ser cumprida pelo Browser).",
      "Propriedade ex: 'innerHTML' (um dado que você pode extrair ou registrar).",
      "Interface de Eventos como os clássicos 'onclick' e 'onhover'."
    ],
    details: ["Métodos (Ações)", "Propriedades (Valores)", "Lidar com Eventos", "Navegação Estrutural"],
    code: "// .getElementById é um MÉTODO\n// .innerHTML é uma PROPRIEDADE\n\ndocument.getElementById(\"demo\").innerHTML = \"Hello World!\";\n\n// Extraindo um dado do objeto nativo Node do Browser\nlet nodeName = meuElemento.nodeName;"
  },
  {
    id: "03", label: "Queries Vivas", title: "Selecting Elements", colorText: "text-cyan-500", colorDot: "bg-cyan-500", icon: Search,
    description: "Para manipular o DOM, você deve antes encontrar as raízes visuais da aba. No jargão da engenharia front-end, isso são as 'Queries'. O navegador nos fornece seletores avançados para localizar instâncias exatas de tags na memória.",
    points: [
      "Buscando únicos: document.getElementById('id_alvo')",
      "Capturando múltiplos nós por Regra CSS (.classe, #id): document.querySelectorAll()",
      "Iterando pelas Coleções Nativas do DOM: document.forms, document.images e document.links"
    ],
    details: ["getElementById()", "getElementsByTagName()", "getElementsByClassName()", "querySelectorAll()"],
    code: "// Encontrando elemento singular pelo ID (Mais Rápido)\nconst mainSection = document.getElementById(\"intro\");\n\n// Almejando todo um grupo de Tags 'p' via CSS Class\nconst paragraphs = document.querySelectorAll(\"p.descricao\");"
  },
  {
    id: "04", label: "CONTEÚDO & ATRIBUTOS", title: "Changing HTML", colorText: "text-green-500", colorDot: "bg-green-500", icon: FileEdit,
    description: "Uma vez que o Nó foi interceptado pelo Query Selector, agora o HTML é seu alvo de mudanças. O JS troca conteúdos brutos e injeta nós na engrenagem viva do navegador atualizando o front sem recarregar a tela (SPAs usam esse conceito).",
    points: [
      "A propriedade 'innerHTML' clona e substitui as árvores menores de Nodes dentro da tag principal.",
      "Alterações de atributos vitais são feitas utilizando '.setAttribute()' ou direto pelo ponto: 'el.href'.",
      "É vital entender 'document.createElement' par gerenciar memória antes de anexar na tela real."
    ],
    details: [".innerHTML", "element.attribute", "document.write()", "element.setAttribute()"],
    code: "// Injetando e clonando novo texto (Parseia tags que vierem justas)\ndocument.getElementById(\"boas_vindas\").innerHTML = \"Olá <b>Usuário</b>!\";\n\n// Mudando os atributos (Src de imagem)\ndocument.getElementById(\"imagem_perfil\").src = \"avatar.jpg\";\n\n// Adicionando uma flag de URL âncora\ndocument.getElementById(\"btn_saiba_mais\").setAttribute(\"href\", \"#topo\");"
  },
  {
    id: "05", label: "ESTILO & CSSOM", title: "Changing CSS", colorText: "text-pink-500", colorDot: "bg-pink-500", icon: Palette,
    description: "Além do HTML DOM, os frameworks reativos dominam o CSSOM. Cada elemento lido pelo DOM contém o objeto `.style`, onde as regras de layout entram em ação. A sintaxe dash do CSS troca para CamelCase em JS.",
    points: [
      "Injeção Inline Ativa: 'elemento.style.propriedade = valor;'.",
      "O traço ('background-color') migra para CamelCase JS: 'backgroundColor'.",
      "Gerenciamento Profissional: usar 'classList' permite gerir estilos isolados em arquivos CSS nativos focando em regras aditivas ou de remoção."
    ],
    details: [".style.property", "backgroundColor", ".classList.toggle()", "fontFamily"],
    code: "/* Modificando estilos diretos na Camada Computada do Nodo */\nconst painel = document.getElementById(\"aviso_topo\");\npainel.style.color = \"white\";\npainel.style.backgroundColor = \"tomato\";\n\n// Padrão Ouro: Desligando/Ligando uma classe inteira via gatilho\nbotao.onclick = function() {\n  container.classList.toggle(\"dark-theme-active\");\n}"
  },
  {
    id: "06", label: "VERIFICAÇÕES LÓGICAS", title: "Form Validation", colorText: "text-yellow-500", colorDot: "bg-yellow-500", icon: ShieldCheck,
    description: "A grande magia de poupar tráfego de rede recai nos Forms. O JavaScript e a API Constraints do navegador inspecionam as regras (Required, URL Pattern, Tamanho do Telefone) antes de liberar envios HTTP, tudo na memória do Client-side.",
    points: [
      "APIs essenciais de validade: checkValidity(), setCustomValidity().",
      "Interceptar o Evento de Input extraindo seu '.value'.",
      "Impedimos o servidor de travar utilizando eventos como 'e.preventDefault()' se a validação falhar."
    ],
    details: ["checkValidity()", ".value", "validationMessage", "Range Constraints"],
    code: "function validarCadastro() {\n  let inputName = document.forms[\"cadastro\"][\"nome_usuario\"].value;\n  if (inputName == \"\") {\n    alert(\"Usuário deve preencher esse bloco!\");\n    return false;\n  }\n}\n\n// Usando checagem da Constraint Base \nif (!meuCampo.checkValidity()) {\n  estadoHTML = meuCampo.validationMessage;\n}"
  },
  {
    id: "07", label: "FPS E MOTION", title: "DOM Animations", colorText: "text-indigo-400", colorDot: "bg-indigo-400", icon: PlaySquare,
    description: "Manipulamos as posições Top/Left/Transform para dar vida ao SVG e blocos de Canvas HTML. A API Web entende cronômetros precisos ativando o cálculo em loop atrelado à taxa de atualização do monitor.",
    points: [
      "Configuração Inicial base para a tag mover: definir position 'absolute' ou 'relative' e transformações matriciais.",
      "Antigamente dominado por 'setInterval()', as animações do DOM hoje devem sempre invocar 'requestAnimationFrame()'.",
      "Transições controlam os cenários antes e depois dos cálculos."
    ],
    details: ["requestAnimationFrame()", "setInterval()", "clearInterval()", "position absolute"],
    code: "function moverQuadrado() {\n  let caixaObjeto = document.getElementById(\"caixa\");\n  let eixoX = 0;\n  let stopId = setInterval(framingProcess, 10);\n  \n  function framingProcess() {\n    if (eixoX == 350) clearInterval(stopId);\n    else {\n      eixoX++;\n      caixaObjeto.style.left = eixoX + \"px\";\n    }\n  }\n}"
  },
  {
    id: "08", label: "O NAVEGADOR GLOBAL", title: "Document Reference", colorText: "text-red-400", colorDot: "bg-red-400", icon: Globe,
    description: "O super objeto global 'document' é seu gateway principal na memória. Você tem em suas mãos propriedades exclusivas de quem é o dono de toda a árvore, descobrindo chaves sobre a conexão, as URIs e as bolachas (Cookies).",
    points: [
      "Capta metadados invisíveis à UI: Título da Aba (.title) e a URI originária.",
      "Poder de injeção global manipulando Document.cookie.",
      "Referencia rapidamente o DOM inteiro sem Query limitando-se ao 'document.head' ou 'document.body'."
    ],
    details: ["document.anchors", "document.cookie", "document.domain", "document.documentURI"],
    code: "// Retornando contadores da Aba\nlet metaFormsNoEcosistema = document.forms.length;\n\n// Leitura e manipulação sobre do Domínio e Título no navegador\nlet dominioExecutando = document.domain;\ndocument.title = \"Notificação Especial (3)\";\n\n// Capturando Cookies logados salvos no arquivo Web do Servidor do DOM\nlet stringDeCookies = document.cookie;"
  },
  {
    id: "09", label: "PERFIL DO NÓ", title: "Element Reference", colorText: "text-emerald-400", colorDot: "bg-emerald-400", icon: Fingerprint,
    description: "Diferente da busca ou mudança, este capítulo explora 'O Que É Este Elemento'. Obtenha acesso rico em informações de altura e largura, hierarquia de parentes próximos (pais, padrastos e filhos) e o rastreamento espacial.",
    points: [
      "Ecosistema Node Familiar: Acesso via properties '.parentNode', '.children', '.nextElementSibling'.",
      "Medições exclusivas de Renderização Visual sem regras CSS: '.clientWidth', '.getBoundingClientRect()'.",
      "Verificação de NodeType confirmando se estamos lendo uma ElementTag (1) ou apenas um TextNode (3)."
    ],
    details: ["getBoundingClientRect()", "parentNode", "children", "nodeType / nodeName"],
    code: "// Quem é o elemento Acima na Hierarquia desse card?\nconst divAgrupadoraCard = itemLista.parentNode;\n\n// Rastejando ao redor dos pixels da janela!\nconst metricasFisicas = itemDestaque.getBoundingClientRect();\nconsole.log(\"X Atual do Botão:\", metricasFisicas.left);\n\n// Identificando o Tipo Oficial na árvore W3C do DOM (ex: Retorna 'P' ou 'DIV')\nlet rootNominalName = mainTag.nodeName;"
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = detailedTopics.length + 1; // 1 home + 9 topics

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  return (
    <div className="h-screen w-screen bg-[#05060a] text-white font-sans overflow-hidden flex flex-col relative">
      {/* Background Orbs */}
      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none z-0"></div>
      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none z-0"></div>

      {/* Navigation Overlay */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-2 sm:gap-4 bg-black/50 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/10 shadow-2xl">
        <button 
          onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
          disabled={currentSlide === 0}
          className="text-white/50 hover:text-white transition-colors disabled:opacity-20 flex items-center justify-center cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5"/>
        </button>
        <div className="flex gap-1.5 sm:gap-2 relative items-center">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentSlide(idx)} 
              className={`rounded-full transition-all duration-500 ease-out cursor-pointer ${currentSlide === idx ? 'h-1.5 w-4 sm:h-2 sm:w-6 bg-blue-500' : 'h-1 w-1 sm:h-1.5 sm:w-1.5 bg-white/20 hover:bg-white/40'}`} 
            />
          ))}
        </div>
        <button 
          onClick={() => setCurrentSlide(prev => Math.min(totalSlides - 1, prev + 1))}
          disabled={currentSlide === totalSlides - 1}
          className="text-white/50 hover:text-white transition-colors disabled:opacity-20 flex items-center justify-center cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5"/>
        </button>
      </div>

      {/* Slides Track */}
      <div 
        className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-10"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {/* SLIDE 0: Overview */}
        <div className="w-screen h-screen flex-shrink-0 flex flex-col relative items-center justify-center p-4 sm:p-6 lg:p-10 box-border overflow-hidden">
          <div className="w-full h-full max-w-[1200px] flex flex-col justify-between pb-12 sm:pb-16 pt-2 sm:pt-6">
            <header className="flex flex-row items-end justify-between mb-3 sm:mb-6 flex-shrink-0">
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-blue-400 mb-0.5 sm:mb-1">Dominando o DOM</h1>
                <p className="text-[10px] sm:text-sm text-gray-400">Guia Visual de Desenvolvimento Frontend</p>
              </div>
              <div className="flex space-x-2">
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-900/30 border border-blue-500/50 rounded-full text-[8px] sm:text-xs font-mono text-blue-300 tracking-widest hidden sm:inline-block">V.2.0.4</span>
              </div>
            </header>

            {/* Grid responds nicely to height constraints to avoid scroll */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 lg:gap-6 flex-grow min-h-0">
              <div onClick={() => setCurrentSlide(1)} className="cursor-pointer group bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-5 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-[1.02]">
                <div><div className="text-blue-500 font-mono text-[8px] sm:text-xs mb-1 sm:mb-2">01. CONCEITO</div><h3 className="text-xs sm:text-lg lg:text-xl font-semibold leading-tight">HTML DOM</h3><p className="text-[9px] sm:text-xs text-gray-500 mt-1 sm:mt-2 hidden sm:block line-clamp-2">A estrutura em árvore (Tree) que representa o HTML.</p></div>
                <div className="mt-2 sm:mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden"><div className="w-full h-full bg-blue-500 group-hover:opacity-70 transition-opacity"></div></div>
              </div>
              <div onClick={() => setCurrentSlide(2)} className="cursor-pointer group bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-5 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-[1.02]">
                <div><div className="text-purple-500 font-mono text-[8px] sm:text-xs mb-1 sm:mb-2">02. INTERFACE</div><h3 className="text-xs sm:text-lg lg:text-xl font-semibold leading-tight">HTML DOM API</h3><p className="text-[9px] sm:text-xs text-gray-500 mt-1 sm:mt-2 hidden sm:block line-clamp-2">Métodos para interagir com objetos.</p></div>
                <div className="mt-2 sm:mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden"><div className="w-1/2 h-full bg-purple-500 group-hover:w-[80%] transition-all duration-500 ease-out"></div></div>
              </div>
              <div onClick={() => setCurrentSlide(3)} className="cursor-pointer group bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-5 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-[1.02]">
                <div><div className="text-cyan-500 font-mono text-[8px] sm:text-xs mb-1 sm:mb-2">03. QUERY</div><h3 className="text-xs sm:text-lg lg:text-xl font-semibold leading-tight">Selecting Elements</h3><p className="text-[9px] sm:text-xs text-gray-500 mt-1 sm:mt-2 hidden sm:block line-clamp-2">Aprenda a encontrar elementos CSS.</p></div>
                <div className="mt-2 sm:mt-4 flex space-x-1"><div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform"></div><div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/20 group-hover:bg-cyan-400 transition-colors delay-75"></div><div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/20 group-hover:bg-cyan-400 transition-colors delay-150"></div></div>
              </div>
              <div onClick={() => setCurrentSlide(4)} className="cursor-pointer group bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-5 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-[1.02]">
                <div><div className="text-green-500 font-mono text-[8px] sm:text-xs mb-1 sm:mb-2">04. CONTEÚDO</div><h3 className="text-xs sm:text-lg lg:text-xl font-semibold leading-tight">Changing HTML</h3><p className="text-[9px] sm:text-xs text-gray-500 mt-1 sm:mt-2 hidden sm:block line-clamp-2">Manipule innerHTML em tempo real.</p></div>
                <div className="mt-2 sm:mt-4 bg-black/40 rounded p-1 sm:p-2 flex items-center group-hover:bg-black/80 transition-colors overflow-hidden"><span className="text-gray-500 font-mono text-[8px] sm:text-[10px] text-green-400 truncate">&gt; el.innerHTML = "Up";</span></div>
              </div>
              <div onClick={() => setCurrentSlide(5)} className="cursor-pointer group bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-5 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-[1.02]">
                <div><div className="text-pink-500 font-mono text-[8px] sm:text-xs mb-1 sm:mb-2">05. ESTILO</div><h3 className="text-xs sm:text-lg lg:text-xl font-semibold leading-tight">Changing CSS</h3><p className="text-[9px] sm:text-xs text-gray-500 mt-1 sm:mt-2 hidden sm:block line-clamp-2">Controle o visual dinamicamente.</p></div>
                <div className="mt-2 sm:mt-4 flex items-center space-x-1.5 sm:space-x-2"><div className="w-4 h-4 sm:w-6 sm:h-6 rounded bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)] group-hover:-translate-y-1 transition-transform"></div><div className="w-4 h-4 sm:w-6 sm:h-6 rounded bg-indigo-500 group-hover:-translate-y-1 transition-transform delay-75"></div><div className="w-4 h-4 sm:w-6 sm:h-6 rounded bg-orange-500 group-hover:-translate-y-1 transition-transform delay-150"></div></div>
              </div>
              <div onClick={() => setCurrentSlide(6)} className="cursor-pointer group bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-5 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-[1.02]">
                <div><div className="text-yellow-500 font-mono text-[8px] sm:text-xs mb-1 sm:mb-2">06. SEGURANÇA</div><h3 className="text-xs sm:text-lg lg:text-xl font-semibold leading-tight">Form Validation</h3><p className="text-[9px] sm:text-xs text-gray-500 mt-1 sm:mt-2 hidden sm:block line-clamp-2">Garanta a integridade dos dados.</p></div>
                <div className="mt-2 sm:mt-4 flex justify-between text-[8px] sm:text-[10px] uppercase font-mono"><span className="text-yellow-500 group-hover:text-green-400 transition-colors">Aguardando</span><span className="text-gray-600 group-hover:text-white transition-colors hidden sm:block">88%</span></div>
              </div>
              <div onClick={() => setCurrentSlide(7)} className="cursor-pointer group bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-5 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-[1.02]">
                <div><div className="text-indigo-400 font-mono text-[8px] sm:text-xs mb-1 sm:mb-2">07. MOTION</div><h3 className="text-xs sm:text-lg lg:text-xl font-semibold leading-tight">DOM Animations</h3><p className="text-[9px] sm:text-xs text-gray-500 mt-1 sm:mt-2 hidden sm:block line-clamp-2">Crie movimento suave e transições.</p></div>
                <div className="mt-2 sm:mt-4 h-4 sm:h-6 border-b border-indigo-400/30 relative overflow-hidden group"><div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 bg-indigo-400 rounded-sm translate-x-4 sm:translate-x-12 group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div></div>
              </div>
              <div onClick={() => setCurrentSlide(8)} className="cursor-pointer group bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-5 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-[1.02]">
                <div><div className="text-red-400 font-mono text-[8px] sm:text-xs mb-1 sm:mb-2">08. GLOBAL</div><h3 className="text-xs sm:text-lg lg:text-xl font-semibold leading-tight">Document Ref</h3><p className="text-[9px] sm:text-xs text-gray-500 mt-1 sm:mt-2 hidden sm:block line-clamp-2">Acesso às propriedades globais.</p></div>
                <div className="mt-2 sm:mt-4 flex space-x-1 sm:space-x-2"><div className="bg-white/10 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[10px] font-mono group-hover:bg-red-400/20 group-hover:text-red-200 transition-colors">URL</div><div className="bg-white/10 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[10px] font-mono group-hover:bg-red-400/20 group-hover:text-red-200 transition-colors delay-75">TITLE</div></div>
              </div>
              <div onClick={() => setCurrentSlide(9)} className="cursor-pointer group bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-5 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-[1.02]">
                <div><div className="text-emerald-400 font-mono text-[8px] sm:text-xs mb-1 sm:mb-2">09. LOCAL</div><h3 className="text-xs sm:text-lg lg:text-xl font-semibold leading-tight">Element Ref</h3><p className="text-[9px] sm:text-xs text-gray-500 mt-1 sm:mt-2 hidden sm:block line-clamp-2">Propriedades web locais.</p></div>
                <div className="mt-2 sm:mt-4 flex items-end h-4 sm:h-6 space-x-1"><div className="w-1 bg-emerald-400 h-1 sm:h-2 group-hover:h-4 sm:group-hover:h-6 transition-all duration-300"></div><div className="w-1 bg-emerald-400 h-3 sm:h-4 group-hover:h-2 transition-all duration-300 delay-75"></div><div className="w-1 bg-emerald-400 h-4 sm:h-6 group-hover:h-3 sm:group-hover:h-5 transition-all duration-300 delay-150"></div></div>
              </div>
            </div>

            <footer className="mt-4 sm:mt-6 pt-4 border-t border-white/10 flex flex-row justify-between items-center text-[8px] sm:text-[10px] text-gray-500 tracking-widest font-mono uppercase flex-shrink-0 relative">
              <div>SISTEMA DE ENSINO</div>
              <div className="flex space-x-4">
                <span className="hidden sm:inline">0101010101</span>
                <span className="text-blue-500">STATUS: ESTÁVEL</span>
              </div>
            </footer>
          </div>
        </div>

        {/* SLIDES 1 to 9 */}
        {detailedTopics.map((topic, index) => {
          const IconComponent = topic.icon;
          return (
            <div key={topic.id} className="w-screen h-screen flex-shrink-0 flex items-center justify-center p-4 sm:p-8 pb-16 sm:pb-20 box-border overflow-hidden">
              <div className="w-full h-full max-w-[1200px] z-10 flex flex-col justify-center max-h-full">
                
                <button 
                  onClick={() => setCurrentSlide(0)} 
                  className="mb-2 sm:mb-4 text-gray-400 hover:text-white flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-mono tracking-wider transition-colors cursor-pointer w-max flex-shrink-0"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" /> MENU PRINCIPAL
                </button>
                
                <div className="relative group bg-[#0a0f18]/80 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-8 backdrop-blur-xl flex flex-col lg:flex-row gap-4 sm:gap-8 items-stretch shadow-2xl h-[calc(100%-2rem)] max-h-[800px] overflow-hidden">
                  
                  {/* Huge Number */}
                  <div className={`absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 text-[120px] sm:text-[200px] lg:text-[250px] font-bold opacity-[0.03] ${topic.colorText} pointer-events-none font-mono selection:bg-transparent transition-transform duration-1000 group-hover:scale-110 z-0`}>
                    {topic.id}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 w-full relative z-10 flex flex-col overflow-hidden">
                    <div className={`font-mono text-[10px] sm:text-xs mb-2 sm:mb-4 font-semibold tracking-widest flex items-center gap-2 sm:gap-3 ${topic.colorText} flex-shrink-0`}>
                      <div className={`p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/5`}>
                         <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 opacity-90" />
                      </div>
                      <span>{topic.id}. {topic.label}</span>
                    </div>
                    
                    <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 tracking-tight text-white line-clamp-2 md:line-clamp-none flex-shrink-0 break-words">{topic.title}</h3>
                    
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-6 line-clamp-3 md:line-clamp-none flex-shrink-0">
                      {topic.description}
                    </p>
                    
                    <ul className="space-y-2 sm:space-y-3 mb-2 sm:mb-6 flex-grow overflow-y-auto min-h-0 pr-2 custom-scrollbar">
                      {topic.points.map((point, idx) => (
                        <li key={idx} className="flex flex-row items-start gap-2 sm:gap-3">
                          <CheckCircle2 className={`w-3.5 h-3.5 sm:w-5 sm:h-5 shrink-0 mt-0.5 sm:mt-1 ${topic.colorText}`} />
                          <span className="text-gray-400 text-[10px] sm:text-sm leading-snug sm:leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto pt-2 flex-shrink-0">
                      {topic.details.map((detail, idx) => (
                        <span key={idx} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/5 border border-white/5 rounded-full text-[9px] sm:text-xs text-gray-300 font-mono flex items-center gap-1.5 backdrop-blur-sm">
                          <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${topic.colorDot}`}></div>
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Code Panel */}
                  <div className="w-full lg:w-[45%] relative z-10 shrink-0 flex flex-col h-1/3 lg:h-full min-h-[150px] lg:min-h-0">
                    <div className="bg-[#05080f] border border-white/5 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:-translate-y-1 sm:group-hover:-translate-y-2 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col h-full">
                      <div className="flex px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border-b border-white/5 items-center justify-between flex-shrink-0">
                        <div className="flex space-x-1.5 sm:space-x-2">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></div>
                          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></div>
                          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="text-[8px] sm:text-[10px] text-gray-500 font-mono tracking-wider ml-auto">script.js</div>
                      </div>
                      <div className="p-3 sm:p-5 overflow-auto flex-grow custom-scrollbar">
                        <pre className={`text-[9px] sm:text-xs lg:text-sm font-mono leading-relaxed ${topic.colorText}`}>
                          <code>{topic.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
}
