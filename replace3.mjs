import fs from "fs";

const replacement = `import React, { useState, useEffect } from 'react';
import {
  Network, Settings2, Search, FileEdit, Palette, ShieldCheck, PlaySquare, Globe, Fingerprint, CheckCircle2,
  ChevronLeft, ChevronRight, Zap, MousePointer2, Keyboard, Loader2, Clock, Ear, ArrowUpCircle
} from 'lucide-react';

const detailedTopics = [
  {
    id: "01", label: "CONCEITO", title: "HTML DOM (Document Object Model)", colorText: "text-blue-500", colorDot: "bg-blue-500", icon: Network,
    description: "O DOM do HTML é um padrão oficial do W3C. Ele define o modelo estrutural do HTML como uma árvore de objetos. Através do DOM, o JavaScript adquire todo o poder necessário para criar documentos HTML fluidos e dinâmicos.",
    points: [
      "Atua como uma ponte entre a página e a linguagem de programação.",
      "Cada tag HTML é convertida em um 'Nó' (Node) na árvore hierárquica.",
      "A espinha dorsal dita: o HTML como objetos, propriedades e eventos globais."
    ],
    details: ["Document (Raiz)", "Element Node (Tags)", "Attribute Node", "Text Node"],
    code: "/* Com o DOM, o JavaScript realiza magias: */\\n\\n- Alterar todos os elemento da página\\n- Mudar todos os atributos das tags\\n- Modificar estilos CSS instantaneamente\\n- Reagir a Eventos de forma veloz"
  },
  {
    id: "02", label: "INTERFACE", title: "HTML DOM API", colorText: "text-purple-500", colorDot: "bg-purple-500", icon: Settings2,
    description: "A API do DOM é a Interface nativa de Programação para o HTML. Ela provê Métodos (ações) e Propriedades (valores), funcionando como uma ponte de comunicação direta.",
    points: [
      "Método ex: 'getElementById()' (uma ação no Browser).",
      "Propriedade ex: 'innerHTML' (um dado que você pode extrair).",
      "Interface de Eventos como clássicos 'onclick'."
    ],
    details: ["Métodos (Ações)", "Propriedades (Valores)", "Lidar com Eventos", "Navegação Estrutural"],
    code: "// .getElementById é um MÉTODO\\n// .innerHTML é uma PROPRIEDADE\\n\\ndocument.getElementById(\\"demo\\").innerHTML = \\"Hello\\";\\n\\nlet nodeName = meuElemento.nodeName;"
  },
  {
    id: "03", label: "QUERIES VIVAS", title: "Selecting Elements", colorText: "text-cyan-500", colorDot: "bg-cyan-500", icon: Search,
    description: "Para manipular o DOM, você deve antes encontrar as raízes visuais da aba. O navegador nos fornece seletores avançados para localizar instâncias exatas de tags na memória.",
    points: [
      "Buscando únicos: document.getElementById('id_alvo')",
      "Capturando múltiplos nós: document.querySelectorAll()",
      "Iterando por Coleções: document.forms e links"
    ],
    details: ["getElementById()", "getElementsByClassName()", "querySelectorAll()"],
    code: "// Seleciona único por ID (Rápido)\\nconst mainSection = document.getElementById(\\"intro\\");\\n\\n// Seleciona um grupo de Tags 'p' via CSS Class\\nconst pl = document.querySelectorAll(\\"p.descricao\\");"
  },
  {
    id: "04", label: "CONTEÚDO", title: "Changing HTML", colorText: "text-green-500", colorDot: "bg-green-500", icon: FileEdit,
    description: "Com o Nó em mãos, o HTML é seu alvo de mudanças. O JS troca conteúdos brutos e injeta nós na engrenagem viva atualizando a interface sem recarregar a tela.",
    points: [
      "innerHTML clona e substitui as árvores de Nodes filhas.",
      "Alterações de atributos vitais com '.setAttribute()'.",
      "Entenda 'document.createElement' para montagens robustas."
    ],
    details: [".innerHTML", "element.attribute", "document.write()", "setAttribute()"],
    code: "// Injetando e clonando texto via DOM API\\nconst b = document.getElementById(\\"msg\\");\\nb.innerHTML = \\"Olá <b>Usuário</b>!\\";\\n\\n// Mudando os atributos (Src de imagem)\\ndocument.getElementById(\\"avatar\\").src = \\"a.jpg\\";"
  },
  {
    id: "05", label: "ESTILO & CSSOM", title: "Changing CSS", colorText: "text-pink-500", colorDot: "bg-pink-500", icon: Palette,
    description: "Cada elemento lido pelo DOM contém o objeto '.style', onde as regras do motor CSS entram em ação. A sintaxe dash do CSS troca para CamelCase em JS.",
    points: [
      "Injeção Inline: 'elemento.style.propriedade = valor;'.",
      "CamelCase JS: 'background-color' vira 'backgroundColor'.",
      "Uso de 'classList' para gerenciar toggles profissionais."
    ],
    details: [".style.property", "backgroundColor", ".classList.toggle()", "fontFamily"],
    code: "const painel = document.getElementById(\\"aviso\\");\\npainel.style.backgroundColor = \\"tomato\\";\\n\\n// Padrão Ouro: Desligar/Ligar via classe do CSS\\nbotao.onclick = function() {\\n  container.classList.toggle(\\"dark-mode\\");\\n}"
  },
  {
    id: "06", label: "SEGURANÇA", title: "Form Validation", colorText: "text-yellow-500", colorDot: "bg-yellow-500", icon: ShieldCheck,
    description: "A grande magia de poupar rede recai nos Forms. O JavaScript e a API Constraints inspecionam as regras (Required, URL) antes de liberar envios HTTP.",
    points: [
      "APIs essenciais de validade: checkValidity().",
      "Interceptar o Evento extraindo seu '.value'.",
      "Use 'e.preventDefault()' se a validação falhar."
    ],
    details: ["checkValidity()", ".value", "validationMessage", "Range Constraints"],
    code: "function validarCadastro() {\\n  let x = document.forms[\\"frm\\"][\\"nome\\"].value;\\n  if (x == \\"\\") {\\n    alert(\\"Atenção!\\");\\n    return false;\\n  }\\n}"
  },
  {
    id: "07", label: "FPS E MOTION", title: "DOM Animations", colorText: "text-indigo-400", colorDot: "bg-indigo-400", icon: PlaySquare,
    description: "Anime a interface manipulando Top/Left para dar vida. A API Web possui atalhos matemáticos ligados à taxa de atualização do monitor.",
    points: [
      "Requer Base CSS position 'absolute' ou 'relative'.",
      "Animações limpidas com 'requestAnimationFrame()'.",
      "Aceleração eficiente por GPU usando TransformX."
    ],
    details: ["requestAnimationFrame()", "setInterval()", "position absoluto"],
    code: "function animar() {\\n  let c = document.getElementById(\\"caixa\\");\\n  let e = 0;\\n  setInterval(() => {\\n    if(e == 200) return;\\n    e++;\\n    c.style.left = e + \\"px\\";\\n  }, 10);\\n}"
  },
  {
    id: "08", label: "NAVEGADOR", title: "Document Reference", colorText: "text-red-400", colorDot: "bg-red-400", icon: Globe,
    description: "O super objeto global 'document' carrega metadados fundamentais (Cookies, URLs e Títulos) daquela instância de aba isolada no desktop.",
    points: [
      "Document.title troca a assinatura na guia da página.",
      "Manipula strings seguras lendo 'document.cookie'.",
      "Atalhos práticos do W3C como document.body."
    ],
    details: ["document.anchors", "document.cookie", "document.domain", "document.documentURI"],
    code: "// Modificar Aba Instantaneamente\\ndocument.title = \\"(3) Mensagens!\\";\\n\\n// Leitura dos cookies\\nlet cookiesString = document.cookie;"
  },
  {
    id: "09", label: "PERFIL DO NÓ", title: "Element Reference", colorText: "text-emerald-400", colorDot: "bg-emerald-400", icon: Fingerprint,
    description: "Invocando referências profundas sobre 'Este Elemento'. Ele desvenda as dimensões reais renderizadas e como flui a herança paterna da DOM Tree.",
    points: [
      "Navegando entre familiares: 'parentNode', 'children'.",
      "Medições exclusivas da placa visual 'clientWidth'.",
      "Extração ágil de NodeTypes da biblioteca visual."
    ],
    details: ["getBoundingClientRect()", "parentNode", "children", "nodeName"],
    code: "const divMaior = itemLista.parentNode;\\n\\n// Lendo espaço físico no Browser (bounding-box)\\nconst w_px = itemLista.getBoundingClientRect().width;\\n\\n// Que Node É Este?\\nlet r = mainTag.nodeName;"
  },
  {
    id: "10", label: "INTRO EVENTS", title: "JS Events", colorText: "text-orange-500", colorDot: "bg-orange-500", icon: Zap,
    description: "Trata-se da maneira como o JavaScript 'ouve' o que acontece. Ações como clique, digitação e movimento disparam sinais em frações de segundo.",
    points: [
      "Eventos reagem à vida do documento web.",
      "O navegador os dispara de acordo com ações físicas.",
      "O JS registra 'Escutadores' para reagir via Funções."
    ],
    details: ["HTML Events", "DOM Event Object", "Event Handlers"],
    code: "// Invocação na raiz HTML (Legado)\\n<button onclick=\\"func()\\">Click</button>\\n\\n// Moderno / DOM Nível 0\\nuserBtn.onclick = function() {\\n  exibirMenu();\\n};"
  },
  {
    id: "11", label: "MOUSE", title: "Mouse Events", colorText: "text-rose-500", colorDot: "bg-rose-500", icon: MousePointer2,
    description: "Vão desde os clássicos cliques (click) a monitoramento sub-pixel (mousemove) do ponteiro atravessando o canvas HTML e gerando tooltips fluidas.",
    points: [
      "Click e dblclick para confirmações eficientes.",
      "MouseEnter/Leave para transições hover lógicas.",
      "Mousemove captura ClientX e ClientY no grid visual."
    ],
    details: ["click", "mouseenter", "mouseleave", "mousemove"],
    code: "caixa.onmouseenter = function() {\\n  caixa.style.opacity = '1';\\n}\\n\\ndocument.onmousemove = function(e){\n  console.log('X:', e.clientX, 'Y:', e.clientY);\\n};"
  },
  {
    id: "12", label: "TECLADO", title: "Keyboard Events", colorText: "text-amber-500", colorDot: "bg-amber-500", icon: Keyboard,
    description: "Responsável pelo rastreamento das digitações, leitura de atalhos em tempo real e jogos. Através dele nós identificamos códigos seriais das teclas.",
    points: [
      "keydown: Dispara quando a tecla aperta.",
      "Extrai chaves vitais da matriz via 'e.key' / 'e.code'.",
      "Impede envios duplos forçando preventDefault."
    ],
    details: ["keydown", "keyup", "Event Property", "e.key"],
    code: "searchBox.addEventListener('keydown', (ev) => {\\n  if (ev.key === 'Enter') {\\n    fetchQuery(this.value);\\n  }\\n  if (/\\\\d/.test(ev.key)) {\\n    ev.preventDefault(); // Nega nros\\n  }\\n});"
  },
  {
    id: "13", label: "CRONOMETRIA", title: "Timing Events", colorText: "text-violet-500", colorDot: "bg-violet-500", icon: Clock,
    description: "A linguagem provê manipuladores de relógio engatilhados pela Global API e repetições perpétuas usando a matemática de milissegundos local.",
    points: [
      "setTimeout: O atraso unitário seguro de futuro.",
      "setInterval: O loop autoinvocado de contagem.",
      "Fundamental expurgar com clearTimeout na UI virtual."
    ],
    details: ["setTimeout", "setInterval", "clearTimeout"],
    code: "let t = setTimeout(() => {\\n  modalAlert('Você inativo 5min!');\\n}, 30000);\\n\\n// Caso o usuário confirme presença antes:\\nclearTimeout(t);"
  },
  {
    id: "14", label: "LOAD EVENT", title: "Load Events", colorText: "text-sky-500", colorDot: "bg-sky-500", icon: Loader2,
    description: "Você não deve acionar interações no DOM antes que suas árvores e imagens de base desçam pelo cano da Rede e entrem de fato na memória alocada do Render.",
    points: [
      "window.onload = Confirma mídia visual bruta.",
      "DOMContentLoaded = Árvore primária de tags liberada.",
      "Eventos cruciais na desmontagem unload e beforeunload."
    ],
    details: ["onload", "DOMContentLoaded", "onbeforeunload"],
    code: "// Disparando rápido sem imagens\\ndocument.addEventListener('DOMContentLoaded', () => {\\n  console.log('DOM Montado!');\\n});\\n\\n// Disparando lento com imagens\\nwindow.onload = () => console.log('Pronto');"
  },
  {
    id: "15", label: "LISTENERS", title: "addEventListener", colorText: "text-fuchsia-500", colorDot: "bg-fuchsia-500", icon: Ear,
    description: "Adicionar 'Ouvintes' via JavaScript puro permite empilhar dezenas de gatilhos na mesma ação. É a filosofia canônica moderna da Separation of Concerns.",
    points: [
      "O listener oficial 'element.addEventListener'.",
      "Separação drástica de HTML em relação à lógica.",
      "Aceita remoção elegante com 'removeEventListener'."
    ],
    details: ["addEventListener", "removeEventListener", "Event Handler"],
    code: "const btn = document.getElementById('save');\\n\\nfunction startAnim() { ... }\\nfunction sendData() { ... }\\n\\n// Acoplando camadas juntas\\nbtn.addEventListener('click', startAnim);\\nbtn.addEventListener('click', sendData);"
  },
  {
    id: "16", label: "PROPAGAÇÃO", title: "Manage Bubbling", colorText: "text-teal-500", colorDot: "bg-teal-500", icon: ArrowUpCircle,
    description: "Se uma janela tem um botão, como controlar um clique quando cai em ambos? Bubbling espalha a onda desse clique hierarquia HTML acima na Tree de modo assíncrono.",
    points: [
      "Bubbling Default: Criança recebe, espalha pros Pais.",
      "Capturing Inv: De fora desce perfurando pro centro.",
      "e.stopPropagation(): Método salva as sub-camadas de loops."
    ],
    details: ["Bubbling", "Capturing", "stopPropagation()"],
    code: "// 3º arg: false(Bubble), true(Capture)\\nboxPai.addEventListener('click', () => {}, false);\\n\\nbtnFilho.addEventListener('click', (ev) => {\\n  ev.stopPropagation(); // Trava!\\n  console.log('So no filho!');\\n}, false);"
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = detailedTopics.length + 1; // 1 home + 16 topics

  // Keyboard navigation
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
    <div className="h-screen w-screen bg-[#05060a] text-white font-sans overflow-hidden flex flex-col relative selection:bg-blue-500/30">
      {/* Background Orbs */}
      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none z-0"></div>
      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none z-0"></div>

      {/* Navigation Overlay */}
      <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-1 sm:gap-2 bg-black/60 backdrop-blur-md px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-white/10 shadow-lg">
        <button 
          onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
          disabled={currentSlide === 0}
          className="text-white/50 hover:text-white transition-colors disabled:opacity-20 flex items-center justify-center cursor-pointer p-1"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5"/>
        </button>
        <div className="flex gap-1 sm:gap-1.5 relative items-center px-1">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentSlide(idx)} 
              className={\`rounded-full transition-all duration-300 ease-out cursor-pointer \${currentSlide === idx ? 'h-1.5 w-3 sm:h-1.5 sm:w-5 bg-blue-500' : 'h-1 w-1 sm:h-1.5 sm:w-1.5 bg-white/20 hover:bg-white/40'}\`} 
            />
          ))}
        </div>
        <button 
          onClick={() => setCurrentSlide(prev => Math.min(totalSlides - 1, prev + 1))}
          disabled={currentSlide === totalSlides - 1}
          className="text-white/50 hover:text-white transition-colors disabled:opacity-20 flex items-center justify-center cursor-pointer p-1"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5"/>
        </button>
      </div>

      {/* Slides Track */}
      <div 
        className="flex w-full h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] z-10"
        style={{ transform: \`translateX(-\${currentSlide * 100}vw)\` }}
      >
        {/* SLIDE 0: Overview Map Grid */}
        <div className="w-screen h-screen flex-shrink-0 flex flex-col relative items-center justify-center py-4 px-2 sm:p-6 lg:p-8 box-border overflow-hidden">
          <div className="w-full h-full max-w-[1400px] flex flex-col pb-10 sm:pb-12 pt-2 sm:pt-4">
            
            <header className="flex flex-row items-end justify-between mb-3 sm:mb-6 flex-shrink-0 px-2 sm:px-0">
              <div>
                <h1 className="text-[22px] sm:text-3xl lg:text-4xl font-bold tracking-tight text-blue-400 mb-0.5 sm:mb-1">O Core do JavaScript</h1>
                <p className="text-[10px] sm:text-xs lg:text-sm text-gray-400">Guia Visual: DOM API & Eventos (W3C DOM Reference)</p>
              </div>
              <div className="flex space-x-2">
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-900/30 border border-blue-500/50 rounded-full text-[8px] sm:text-[10px] font-mono text-blue-300 tracking-widest hidden sm:inline-block">V.DOM.EVENTS</span>
              </div>
            </header>

            {/* Tight Grid to fit 16 items without scrolling */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 flex-grow min-h-0">
              {detailedTopics.map((topic, index) => {
                const IconComponent = topic.icon;
                return (
                  <div 
                    key={topic.id} 
                    onClick={() => setCurrentSlide(index + 1)} 
                    className="cursor-pointer group bg-white/5 border border-white/5 sm:border-white/10 rounded-lg sm:rounded-xl p-2.5 sm:p-4 backdrop-blur-sm flex flex-col justify-between hover:bg-white/[0.08] transition-all hover:scale-[1.03] active:scale-95 shadow-sm overflow-hidden"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
                        <IconComponent className={\`w-3 h-3 sm:w-4 sm:h-4 \${topic.colorText}\`} />
                        <span className={\`font-mono text-[8px] sm:text-[10px] tracking-wider \${topic.colorText}\`}>{topic.id} {topic.label}</span>
                      </div>
                      <h3 className="text-[11px] sm:text-sm lg:text-base font-semibold leading-tight line-clamp-1 mb-0.5">{topic.title}</h3>
                      <p className="text-[9px] sm:text-[11px] text-gray-400 leading-snug line-clamp-2 md:line-clamp-3 block">{topic.description}</p>
                    </div>
                    <div className="mt-2 text-right">
                      <span className="text-[8px] sm:text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-gray-400 font-mono inline-block group-hover:bg-white/10 transition-colors">ACESSAR &rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <footer className="mt-4 pt-3 border-t border-white/10 flex flex-row justify-between items-center text-[8px] sm:text-[10px] text-gray-500 tracking-widest font-mono uppercase flex-shrink-0 relative px-2 sm:px-0">
              <div>SISTEMA DE ENSINO (Baseado W3C Schools)</div>
              <div className="flex space-x-3">
                <span className="text-blue-500/80">INTERATIVO 16 MÓDULOS</span>
              </div>
            </footer>
          </div>
        </div>

        {/* SLIDES 1 to 16 */}
        {detailedTopics.map((topic, index) => {
          const IconComponent = topic.icon;
          return (
            <div key={topic.id} className="w-screen h-screen flex-shrink-0 flex items-center justify-center p-3 sm:p-8 pb-14 sm:pb-20 box-border overflow-hidden">
              <div className="w-full h-full max-w-[1200px] z-10 flex flex-col justify-center max-h-full">
                
                <button 
                  onClick={() => setCurrentSlide(0)} 
                  className="mb-2 sm:mb-4 text-gray-400 hover:text-white flex items-center gap-1 sm:gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider transition-colors cursor-pointer w-max flex-shrink-0 bg-white/5 px-3 py-1.5 rounded-full hover:bg-white/10"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" /> MAPA DE CONTEÚDO
                </button>
                
                <div className="relative group bg-[#080b12]/90 border border-white/5 sm:border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-8 backdrop-blur-2xl flex flex-col lg:flex-row gap-4 lg:gap-8 items-stretch shadow-2xl h-[calc(100%-3rem)] max-h-[800px] overflow-hidden">
                  
                  {/* Huge Background Number */}
                  <div className={\`absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 text-[150px] sm:text-[250px] lg:text-[400px] font-bold opacity-[0.02] \${topic.colorText} pointer-events-none font-mono selection:bg-transparent z-0\`}>
                    {topic.id}
                  </div>

                  {/* Text Content */}
                  <div className="flex-[1.2] w-full relative z-10 flex flex-col overflow-hidden justify-center min-h-0">
                    <div className={\`font-mono text-[9px] sm:text-xs mb-2 sm:mb-4 font-semibold tracking-widest flex items-center gap-2 sm:gap-3 \${topic.colorText} flex-shrink-0\`}>
                      <div className={\`p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/5 shadow-inner\`}>
                         <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 opacity-90" />
                      </div>
                      <span>{topic.id}. {topic.label}</span>
                    </div>
                    
                    <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 tracking-tight text-white flex-shrink-0">{topic.title}</h3>
                    
                    <p className="text-gray-300 text-[11px] sm:text-sm lg:text-base leading-relaxed mb-3 sm:mb-6 flex-shrink-0 font-medium">
                      {topic.description}
                    </p>
                    
                    {/* Points Container with Auto Scroll if needed */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-[80px]">
                      <ul className="space-y-2.5 sm:space-y-4">
                        {topic.points.map((point, idx) => (
                          <li key={idx} className="flex flex-row items-start gap-2.5 sm:gap-3 bg-white/[0.02] p-2.5 sm:p-3 rounded-lg border border-white/[0.03] hover:bg-white/[0.04] transition-colors">
                            <CheckCircle2 className={\`w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 \${topic.colorText}\`} />
                            <span className="text-gray-300 md:text-gray-400 text-[10px] sm:text-[13px] lg:text-[14px] leading-snug sm:leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 pt-3 border-t border-white/5 flex-shrink-0">
                      {topic.details.map((detail, idx) => (
                        <span key={idx} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-black/40 border border-white/5 rounded-full text-[9px] sm:text-xs text-gray-300 font-mono flex items-center gap-1.5 shadow-sm">
                          <div className={\`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full \${topic.colorDot}\`}></div>
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Code Panel */}
                  <div className="flex-[0.8] lg:w-[45%] relative z-10 shrink-0 flex flex-col h-[35%] lg:h-auto min-h-[160px] lg:min-h-0 bg-[#030408] rounded-xl overflow-hidden border border-white/10 shadow-xl lg:my-auto">
                    <div className="flex px-3 sm:px-4 py-2 sm:py-2.5 bg-white/[0.03] border-b border-white/5 items-center justify-between flex-shrink-0">
                      <div className="flex space-x-1.5 sm:space-x-2">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/80"></div>
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/80"></div>
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/80"></div>
                      </div>
                      <div className="text-[8px] sm:text-[10px] text-gray-500 font-mono tracking-wider ml-auto flex items-center gap-2">
                        <span>{topic.title.split(' ')[0].toLowerCase()}.js</span>
                      </div>
                    </div>
                    <div className="p-3 sm:p-5 overflow-auto flex-grow custom-scrollbar relative">
                      <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
                        <IconComponent className="w-16 h-16 sm:w-24 sm:h-24" />
                      </div>
                      <pre className={\`text-[10px] sm:text-xs lg:text-[13px] font-mono leading-[1.6] \${topic.colorText} brightness-125\`}>
                        <code>{topic.code}</code>
                      </pre>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: \`
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
      \`}} />
    </div>
  );
}
`;

fs.writeFileSync("src/App.tsx", replacement);
console.log("Rewrite completed successfully!");
