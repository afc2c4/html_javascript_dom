import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const regex1 = /topic\.id === 'v04' \|\| topic\.id === 'v05' \|\| topic\.id === 'v06' \|\| topic\.id === 'v07'/g;
content = content.replace(regex1, "topic.id.startsWith('v') && topic.id !== 'v01' && topic.id !== 'v02' && topic.id !== 'v03'");

const regex2 = /topic\.id !== 'v01' && topic\.id !== 'v02' && topic\.id !== 'v03' && topic\.id !== 'v04' && topic\.id !== 'v05' && topic\.id !== 'v06' && topic\.id !== 'v07'/g;
content = content.replace(regex2, "!(topic.id.startsWith('v'))"); 

const regex3 = /\(topic\.id === 'v04' && idx !== 2\) \|\| topic\.id === 'v05' \|\| topic\.id === 'v06' \|\| topic\.id === 'v07'/g;
content = content.replace(regex3, "(topic.id.startsWith('v') && topic.id !== 'v01' && topic.id !== 'v02' && topic.id !== 'v03' && !(topic.id === 'v04' && idx === 2))");

// Remove prefix from points for all slides v08 to v47
for (let i = 8; i <= 47; i++) {
  const num = i.toString().padStart(2, '0');
  const idStr = `id: "v${num}"`;
  
  const startIndex = content.indexOf(idStr);
  if (startIndex !== -1) {
    const pointsMatch = content.substring(startIndex, startIndex + 3000).match(/points:\s*\[([\s\S]*?)\]/);
    if (pointsMatch) {
      let origPoints = pointsMatch[1];
      // Regex to remove "Title: " or "Name - " etc at the beginning of each string
      // A point string looks like: "Ponto de Entrada: A instância..."
      // We want to replace `"Something: ` with `"`
      let newPoints = origPoints.replace(/"[^":]+:\s*/g, '"');
      
      const origRegex = new RegExp(`points:\\s*\\[${origPoints.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")}\\]`);
      const updatedChunk = content.substring(startIndex, startIndex + 3000).replace(origRegex, `points: [${newPoints}]`);
      content = content.substring(0, startIndex) + updatedChunk + content.substring(startIndex + 3000);
    }
  }
}

fs.writeFileSync('src/App.tsx', content);
