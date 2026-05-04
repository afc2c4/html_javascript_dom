import fs from "fs";

const fileContent = fs.readFileSync("src/App.tsx", "utf-8");
const preApp = fileContent.substring(0, fileContent.indexOf("export default function App() {"));

const replacement = `export default function App() {
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
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-4 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl">
        <button 
          onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
          disabled={currentSlide === 0}
          className="text-white/50 hover:text-white transition-colors disabled:opacity-20 flex items-center justify-center cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5"/>
        </button>
        <div className="flex gap-2 relative items-center">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentSlide(idx)} 
              className={\`rounded-full transition-all duration-500 ease-out cursor-pointer \${currentSlide === idx ? 'h-2 w-6 bg-blue-500' : 'h-1.5 w-1.5 bg-white/20 hover:bg-white/40'}\`} 
            />
          ))}
        </div>
        <button 
          onClick={() => setCurrentSlide(prev => Math.min(totalSlides - 1, prev + 1))}
          disabled={currentSlide === totalSlides - 1}
          className="text-white/50 hover:text-white transition-colors disabled:opacity-20 flex items-center justify-center cursor-pointer"
        >
          <ChevronRight className="w-5 h-5"/>
        </button>
      </div>

      {/* Slides Track */}
      <div 
        className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-10"
        style={{ transform: \`translateX(-\${currentSlide * 100}vw)\` }}
      >
        {/* SLIDE 0: Overview */}
        <div className="w-screen h-screen flex-shrink-0 overflow-y-auto flex flex-col relative items-center justify-start p-4 py-10 sm:py-20 sm:p-10">
          <div className="w-full max-w-[1024px] flex flex-col flex-grow relative">
            <header className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4 sm:gap-0 mt-10 sm:mt-0">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-blue-400 mb-1">Dominando o DOM</h1>
                <p className="text-gray-400">Guia Visual de Desenvolvimento Frontend</p>
              </div>
              <div className="flex space-x-2">
                <span className="px-3 py-1 bg-blue-900/30 border border-blue-500/50 rounded-full text-xs font-mono text-blue-300 tracking-widest">V.2.0.4</span>
                <span className="px-3 py-1 bg-green-900/30 border border-green-500/50 rounded-full text-xs font-mono text-green-300 tracking-widest hidden sm:inline-block">CERTIFICADO</span>
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow pb-10">
              <div onClick={() => setCurrentSlide(1)} className="cursor-pointer group bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-[1.02]">
                <div><div className="text-blue-500 font-mono text-xs mb-2">01. CONCEITO</div><h3 className="text-lg font-semibold">HTML DOM</h3><p className="text-xs text-gray-500 mt-2">A estrutura em árvore (Tree) que representa o seu documento HTML.</p></div>
                <div className="mt-8 h-1 w-full bg-white/10 rounded-full overflow-hidden"><div className="w-full h-full bg-blue-500 group-hover:opacity-70 transition-opacity"></div></div>
              </div>
              <div onClick={() => setCurrentSlide(2)} className="cursor-pointer group bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-[1.02]">
                <div><div className="text-purple-500 font-mono text-xs mb-2">02. INTERFACE</div><h3 className="text-lg font-semibold">HTML DOM API</h3><p className="text-xs text-gray-500 mt-2">Conjunto de métodos para interagir com os objetos do navegador.</p></div>
                <div className="mt-8 h-1 w-full bg-white/10 rounded-full overflow-hidden"><div className="w-1/2 h-full bg-purple-500 group-hover:w-[80%] transition-all duration-500 ease-out"></div></div>
              </div>
              <div onClick={() => setCurrentSlide(3)} className="cursor-pointer group bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-[1.02]">
                <div><div className="text-cyan-500 font-mono text-xs mb-2">03. QUERY</div><h3 className="text-lg font-semibold">Selecting Elements</h3><p className="text-xs text-gray-500 mt-2">Aprenda a encontrar elementos usando ID, Classe ou Seletores CSS.</p></div>
                <div className="mt-8 flex space-x-1"><div className="h-2 w-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform"></div><div className="h-2 w-2 rounded-full bg-white/20 group-hover:bg-cyan-400 transition-colors delay-75"></div><div className="h-2 w-2 rounded-full bg-white/20 group-hover:bg-cyan-400 transition-colors delay-150"></div></div>
              </div>
              <div onClick={() => setCurrentSlide(4)} className="cursor-pointer group bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-[1.02]">
                <div><div className="text-green-500 font-mono text-xs mb-2">04. CONTEÚDO</div><h3 className="text-lg font-semibold">Changing HTML</h3><p className="text-xs text-gray-500 mt-2">Manipule innerHTML, textContent e atributos em tempo real.</p></div>
                <div className="mt-8 bg-black/40 rounded p-2 font-mono text-[10px] text-green-400 flex items-center group-hover:bg-black/80 transition-colors"><span className="text-gray-500 mr-2">&gt;</span> element.innerHTML = "Update";</div>
              </div>
              <div onClick={() => setCurrentSlide(5)} className="cursor-pointer group bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-[1.02]">
                <div><div className="text-pink-500 font-mono text-xs mb-2">05. ESTILO</div><h3 className="text-lg font-semibold">Changing CSS</h3><p className="text-xs text-gray-500 mt-2">Controle o visual e o layout dinamicamente via JavaScript.</p></div>
                <div className="mt-8 flex items-center space-x-2"><div className="w-6 h-6 rounded bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)] group-hover:-translate-y-1 transition-transform"></div><div className="w-6 h-6 rounded bg-indigo-500 group-hover:-translate-y-1 transition-transform delay-75"></div><div className="w-6 h-6 rounded bg-orange-500 group-hover:-translate-y-1 transition-transform delay-150"></div></div>
              </div>
              <div onClick={() => setCurrentSlide(6)} className="cursor-pointer group bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-[1.02]">
                <div><div className="text-yellow-500 font-mono text-xs mb-2">06. SEGURANÇA</div><h3 className="text-lg font-semibold">Form Validation</h3><p className="text-xs text-gray-500 mt-2">Garanta a integridade dos dados antes do envio ao servidor.</p></div>
                <div className="mt-8 flex justify-between text-[10px] uppercase"><span className="text-yellow-500 group-hover:text-green-400 transition-colors">Aguardando...</span><span className="text-gray-600 group-hover:text-white transition-colors">88%</span></div>
              </div>
              <div onClick={() => setCurrentSlide(7)} className="cursor-pointer group bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-[1.02]">
                <div><div className="text-indigo-400 font-mono text-xs mb-2">07. MOTION</div><h3 className="text-lg font-semibold">DOM Animations</h3><p className="text-xs text-gray-500 mt-2">Crie movimento suave e transições fluidas entre estados.</p></div>
                <div className="mt-8 h-6 border-b border-indigo-400/30 relative overflow-hidden group"><div className="absolute bottom-0 left-0 w-4 h-4 bg-indigo-400 rounded-sm translate-x-12 group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div></div>
              </div>
              <div onClick={() => setCurrentSlide(8)} className="cursor-pointer group bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-[1.02]">
                <div><div className="text-red-400 font-mono text-xs mb-2">08. GLOBAL</div><h3 className="text-lg font-semibold">Document Reference</h3><p className="text-xs text-gray-500 mt-2">Acesso completo às propriedades globais da página.</p></div>
                <div className="mt-8 flex space-x-2"><div className="bg-white/10 px-2 py-0.5 rounded text-[10px] group-hover:bg-red-400/20 group-hover:text-red-200 transition-colors">URL</div><div className="bg-white/10 px-2 py-0.5 rounded text-[10px] group-hover:bg-red-400/20 group-hover:text-red-200 transition-colors delay-75">TITLE</div><div className="bg-white/10 px-2 py-0.5 rounded text-[10px] group-hover:bg-red-400/20 group-hover:text-red-200 transition-colors delay-150">BODY</div></div>
              </div>
              <div onClick={() => setCurrentSlide(9)} className="cursor-pointer group bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-[1.02]">
                <div><div className="text-emerald-400 font-mono text-xs mb-2">09. LOCAL</div><h3 className="text-lg font-semibold">Element Reference</h3><p className="text-xs text-gray-500 mt-2">Propriedades específicas para cada tipo de tag HTML.</p></div>
                <div className="mt-8 flex items-end h-6 space-x-1"><div className="w-1 bg-emerald-400 h-2 group-hover:h-6 transition-all duration-300"></div><div className="w-1 bg-emerald-400 h-4 group-hover:h-2 transition-all duration-300 delay-75"></div><div className="w-1 bg-emerald-400 h-6 group-hover:h-5 transition-all duration-300 delay-150"></div></div>
              </div>
            </div>

            <footer className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-500 tracking-widest font-mono uppercase pb-32 sm:pb-32 gap-4 sm:gap-0 mt-8">
              <div>SISTEMA DE ENSINO INTERATIVO</div>
              <div className="flex space-x-4">
                <span>0101010101</span>
                <span className="text-blue-500">STATUS: ESTÁVEL</span>
              </div>
            </footer>
          </div>
        </div>

        {/* SLIDES 1 to 9 */}
        {detailedTopics.map((topic, index) => {
          const IconComponent = topic.icon;
          return (
            <div key={topic.id} className="w-screen h-screen flex-shrink-0 overflow-y-auto flex items-center justify-center p-4 py-20 pb-32 sm:p-10 relative">
              <div className="w-full max-w-[1100px] z-10 flex flex-col h-full justify-center">
                <button 
                  onClick={() => setCurrentSlide(0)} 
                  className="mb-6 text-gray-400 hover:text-white flex items-center gap-2 text-sm font-mono tracking-wider transition-colors cursor-pointer w-max"
                >
                  <ChevronLeft className="w-4 h-4" /> MENU PRINCIPAL
                </button>
                <div className="relative group bg-[#0a0f18]/80 border border-white/10 rounded-2xl p-6 sm:p-12 backdrop-blur-xl overflow-hidden flex flex-col lg:flex-row gap-8 items-start lg:items-center shadow-2xl">
                  
                  {/* Huge Number */}
                  <div className={\`absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 text-[250px] font-bold opacity-[0.02] \${topic.colorText} pointer-events-none font-mono selection:bg-transparent transition-transform duration-1000 group-hover:scale-110\`}>
                    {topic.id}
                  </div>

                  <div className="flex-1 w-full relative z-10">
                    <div className={\`font-mono text-xs mb-4 font-semibold tracking-widest flex items-center gap-3 \${topic.colorText}\`}>
                      <div className={\`p-2 rounded-lg bg-white/5 border border-white/5\`}>
                         <IconComponent className="w-5 h-5 opacity-90" />
                      </div>
                      <span>{topic.id}. {topic.label}</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight text-white">{topic.title}</h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
                      {topic.description}
                    </p>
                    
                    <ul className="space-y-4 mb-8">
                      {topic.points.map((point, idx) => (
                        <li key={idx} className="flex flex-row items-start gap-4">
                          <CheckCircle2 className={\`w-5 h-5 shrink-0 mt-0.5 \${topic.colorText}\`} />
                          <span className="text-gray-400 text-sm leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {topic.details.map((detail, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-full text-xs text-gray-300 font-mono flex items-center gap-2 backdrop-blur-sm">
                          <div className={\`w-1.5 h-1.5 rounded-full \${topic.colorDot}\`}></div>
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-full lg:w-[45%] relative z-10 shrink-0">
                    <div className="bg-[#05080f] border border-white/5 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                      <div className="flex px-4 py-3 bg-white/5 border-b border-white/5 items-center justify-between">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="text-[10px] text-gray-500 font-mono tracking-wider ml-auto">script.js</div>
                      </div>
                      <div className="p-6 overflow-x-auto h-full min-h-[250px] flex items-center w-full">
                        <pre className={\`text-sm font-mono leading-relaxed \${topic.colorText}\`}>
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
    </div>
  );
}
`;

fs.writeFileSync("src/App.tsx", preApp + replacement);
console.log("Rewrite completed successfully!");
