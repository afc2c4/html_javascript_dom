const fs = require('fs');
const content = fs.readFileSync('./src/App.tsx', 'utf-8');

const topicIdsRegex = /id:\s*"([^"]+)"/g;
let match;
const allIds = new Set();
while ((match = topicIdsRegex.exec(content)) !== null) {
  allIds.add(match[1]);
}

const analogiesRegex = /"([^"]+)":\s*\{\s*items:/g;
const allAnalogies = new Set();
while ((match = analogiesRegex.exec(content)) !== null) {
  allAnalogies.add(match[1]);
}

console.log("Total Analogies:", Array.from(allAnalogies).length);

const missing = [];
for (const id of allIds) {
  if (id.includes('-g')) continue;
  if (!id.match(/^\d+$/) && !id.match(/^[var]\d+$/)) continue; // Keep only topics like 01, v01, etc.
  if (!allAnalogies.has(id)) {
    missing.push(id);
  }
}
console.log("Missing analogies for:", missing);
