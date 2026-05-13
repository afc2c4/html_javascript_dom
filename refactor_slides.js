import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// We need to replace details: [ ... ] with details: [] for v08 to v47
for (let i = 8; i <= 47; i++) {
  const num = i.toString().padStart(2, '0');
  const idStr = `id: "v${num}"`;
  
  const idIndex = content.indexOf(idStr);
  if (idIndex !== -1) {
    // Find the details array in this object
    const detailsRegex = /details:\s*\[[^\]]*\]/;
    // Search only within the next 2000 characters
    const textChunk = content.substring(idIndex, idIndex + 2000);
    const updatedChunk = textChunk.replace(detailsRegex, 'details: []');
    content = content.substring(0, idIndex) + updatedChunk + content.substring(idIndex + 2000);
  }
}

fs.writeFileSync('src/App.tsx', content);
console.log('Details removed.');
