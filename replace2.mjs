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
              className={\`rounded-full transition-all duration-500 ease-out cursor-pointer \${currentSlide === idx ? 'h-1.5 w-4 sm:h-2 sm:w-6 bg-blue-500' : 'h-1 w-1 sm:h-1.5 sm:w-1.5 bg-white/20 hover:bg-white/40'}\`} 
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
        style={{ transform: \`translateX(-\${currentSlide * 100}vw)\` }}
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
                  <div className={\`absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 text-[120px] sm:text-[200px] lg:text-[250px] font-bold opacity-[0.03] \${topic.colorText} pointer-events-none font-mono selection:bg-transparent transition-transform duration-1000 group-hover:scale-110 z-0\`}>
                    {topic.id}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 w-full relative z-10 flex flex-col overflow-hidden">
                    <div className={\`font-mono text-[10px] sm:text-xs mb-2 sm:mb-4 font-semibold tracking-widest flex items-center gap-2 sm:gap-3 \${topic.colorText} flex-shrink-0\`}>
                      <div className={\`p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/5\`}>
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
                          <CheckCircle2 className={\`w-3.5 h-3.5 sm:w-5 sm:h-5 shrink-0 mt-0.5 sm:mt-1 \${topic.colorText}\`} />
                          <span className="text-gray-400 text-[10px] sm:text-sm leading-snug sm:leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto pt-2 flex-shrink-0">
                      {topic.details.map((detail, idx) => (
                        <span key={idx} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/5 border border-white/5 rounded-full text-[9px] sm:text-xs text-gray-300 font-mono flex items-center gap-1.5 backdrop-blur-sm">
                          <div className={\`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full \${topic.colorDot}\`}></div>
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
                        <pre className={\`text-[9px] sm:text-xs lg:text-sm font-mono leading-relaxed \${topic.colorText}\`}>
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

fs.writeFileSync("src/App.tsx", preApp + replacement);
console.log("Rewrite completed successfully!");
