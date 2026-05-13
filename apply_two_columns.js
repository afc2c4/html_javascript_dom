import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// The block starts around:
// {/* Text Content */}
// <div className="w-full relative z-10 flex flex-col overflow-hidden justify-center min-h-0">

const searchStr = `
                    {/* Text Content */}
                    <div className="w-full relative z-10 flex flex-col overflow-hidden justify-center min-h-0">
                      <div className={\`font-mono text-[10px] sm:text-sm mb-3 sm:mb-5 font-semibold tracking-widest flex items-center gap-2 sm:gap-4 \${topic.colorText} flex-shrink-0 uppercase\`}>
                        <div className={\`relative p-1.5 sm:p-2.5 rounded-lg \${topic.colorDot} bg-opacity-20 border border-white/20 group\`}>
                           <div className={\`absolute inset-0 \${topic.colorDot} opacity-50 blur-md animate-pulse\`}></div>
                           <IconComponent className={\`w-4 h-4 sm:w-6 sm:h-6 drop-shadow-[0_0_8px_currentColor] animate-bounce relative z-10\`} style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
                        </div>
                        <span className="drop-shadow-[0_0_5px_currentColor] text-sm sm:text-xl">{topic.id}. {topic.label}</span>
                      </div>
                      
                      <h3 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-4 tracking-tight text-white flex-shrink-0 drop-shadow-2xl leading-[1.1]">{topic.title}</h3>
                      
                      <p className={\`\${selectedTecnologia === 'Análise de Dados' ? 'text-white' : 'text-gray-300'} text-base sm:text-lg lg:text-2xl leading-relaxed mb-6 flex-shrink-0 font-light max-w-5xl whitespace-pre-wrap \${topic.id.startsWith('v') && topic.id !== 'v01' && topic.id !== 'v02' && topic.id !== 'v03' && topic.id !== 'v04' ? 'text-left' : ''}\`}>
                        {topic.description}
                      </p>
                      
                      <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-white/20 to-transparent mb-6"></div>
                      
                      {/* Points Grid */}
                      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-[80px]">
                        <div className={\`grid grid-cols-1 \${topic.id === 'v02' ? 'md:grid-cols-1' : topic.id === 'v03' ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4 sm:gap-6\`}>`;

// We will replace it with a responsive two-column layout if topic.id is Vue
const replaceStr = `
                    {/* Text Content */}
                    <div className={\`w-full relative z-10 flex \${topic.id.startsWith('v') && topic.id !== 'v01' && topic.id !== 'v02' && topic.id !== 'v03' ? 'flex-col md:flex-row gap-8' : 'flex-col'} overflow-hidden justify-center min-h-0\`}>
                      
                      {/* Left Column (or Top) */}
                      <div className={\`flex flex-col \${topic.id.startsWith('v') && topic.id !== 'v01' && topic.id !== 'v02' && topic.id !== 'v03' ? 'w-full md:w-5/12 justify-center' : ''}\`}>
                        <div className={\`font-mono text-[10px] sm:text-sm mb-3 sm:mb-5 font-semibold tracking-widest flex items-center gap-2 sm:gap-4 \${topic.colorText} flex-shrink-0 uppercase\`}>
                          <div className={\`relative p-1.5 sm:p-2.5 rounded-lg \${topic.colorDot} bg-opacity-20 border border-white/20 group\`}>
                             <div className={\`absolute inset-0 \${topic.colorDot} opacity-50 blur-md animate-pulse\`}></div>
                             <IconComponent className={\`w-4 h-4 sm:w-6 sm:h-6 drop-shadow-[0_0_8px_currentColor] animate-bounce relative z-10\`} style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
                          </div>
                          <span className="drop-shadow-[0_0_5px_currentColor] text-sm sm:text-xl">{topic.id}. {topic.label}</span>
                        </div>
                        
                        <h3 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 tracking-tight text-white flex-shrink-0 drop-shadow-2xl leading-[1.1]">{topic.title}</h3>
                        
                        <p className={\`\${selectedTecnologia === 'Análise de Dados' ? 'text-white' : 'text-gray-300'} text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed mb-6 flex-shrink-0 font-light max-w-5xl whitespace-pre-wrap \${topic.id.startsWith('v') && topic.id !== 'v01' && topic.id !== 'v02' && topic.id !== 'v03' ? 'text-left' : ''}\`}>
                          {topic.description}
                        </p>
                        
                        <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-white/20 to-transparent mb-6"></div>
                      </div>
                      
                      {/* Points Grid (Right Column or Bottom) */}
                      <div className={\`flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-[80px] \${topic.id.startsWith('v') && topic.id !== 'v01' && topic.id !== 'v02' && topic.id !== 'v03' ? 'w-full md:w-7/12 flex flex-col justify-center' : ''}\`}>
                        <div className={\`grid grid-cols-1 \${topic.id === 'v02' ? 'md:grid-cols-1' : topic.id === 'v03' ? 'md:grid-cols-3' : topic.id.startsWith('v') && topic.id !== 'v01' && topic.id !== 'v04' ? 'md:grid-cols-1 gap-4' : 'md:grid-cols-2'} gap-4 sm:gap-6\`}>`;

let testStr = content.indexOf('w-full relative z-10 flex flex-col overflow-hidden justify-center min-h-0');

if (testStr !== -1) {
    // using a more flexible regex because spacing might differ slightly
    const startStr = '{/* Text Content */}';
    const endStr = 'gap-4 sm:gap-6`}>';
    
    const sIdx = content.indexOf(startStr);
    if (sIdx !== -1) {
        const subStr = content.substring(sIdx);
        const eIdx = subStr.indexOf(endStr);
        if (eIdx !== -1) {
            const originalBlock = subStr.substring(0, eIdx + endStr.length);
            content = content.replace(originalBlock, replaceStr.trim());
            console.log("Successfully replaced the block!");
            fs.writeFileSync('src/App.tsx', content);
        } else {
             console.log("Could not find the end string");
        }
    } else {
        console.log("Could not find start block");
    }
}
