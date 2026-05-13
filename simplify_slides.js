import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  let content = fs.readFileSync('src/App.tsx', 'utf-8');
  
  for (let i = 8; i <= 47; i++) {
    const num = i.toString().padStart(2, '0');
    const idStr = `id: "v${num}"`;
    
    // Find the slide in content
    const startIndex = content.indexOf(idStr);
    if (startIndex === -1) continue;
    
    // We'll extract description and points
    const descriptionMatch = content.substring(startIndex, startIndex + 1000).match(/description:\s*"([^"]+)",/);
    const pointsMatch = content.substring(startIndex, startIndex + 3000).match(/points:\s*\[([\s\S]*?)\]/);
    
    if (descriptionMatch && pointsMatch) {
      console.log(`Processing v${num}...`);
      const origDesc = descriptionMatch[1];
      const origPoints = pointsMatch[1];
      
      const prompt = `
Você é um especialista em reescrever conteúdo para slides.
Eu tenho o seguinte conteúdo de um slide sobre Vue.js:

Descrição Original: ${origDesc}
Pontos Originais: [${origPoints}]

A regra é: "reescreva o conteudo em forma de Texto Corrido Simplificado (Ideal para narração). Remova Textos Repetitivos e Elimine Legendas Redundantes".

Por favor, forneça o Novo Descrição e os Novos Pontos.
Os Novos Pontos devem ser duas ou três frases curtas, em texto corrido (sem jargão que repete a legenda).
Retorne APENAS um JSON válido com o seguinte formato:
{
  "description": "...",
  "points": ["...", "..."]
}
      `;
      
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-1.5-flash',
          contents: prompt
        });
        
        let jsonStr = response.text().trim();
        if (jsonStr.startsWith('\`\`\`json')) {
            jsonStr = jsonStr.substring(7);
        }
        if (jsonStr.endsWith('\`\`\`')) {
            jsonStr = jsonStr.substring(0, jsonStr.length - 3);
        }
        
        const newContent = JSON.parse(jsonStr);
        
        // Replacement
        const descRegex = new RegExp(`description:\\s*"${origDesc.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")}",`);
        const pointsRegex = new RegExp(`points:\\s*\\[${origPoints.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")}\\]`);
        
        const textChunk = content.substring(startIndex, startIndex + 3500);
        
        let newPointsStr = newContent.points.map(p => `      "${p.replace(/"/g, '\\"')}"`).join(',\n');
        
        let updatedChunk = textChunk
          .replace(descRegex, `description: "${newContent.description}",`)
          .replace(pointsRegex, `points: [\n${newPointsStr}\n    ]`);
          
        content = content.substring(0, startIndex) + updatedChunk + content.substring(startIndex + 3500);
        fs.writeFileSync('src/App.tsx', content);
        console.log(`Updated v${num}!`);
      } catch (e) {
          console.error(`Error on v${num}:`, e);
      }
    }
  }
}

run();
