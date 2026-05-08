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

const missing = [];
for (const id of allIds) {
  if (id.includes('-g')) continue;
  if (!id.match(/^\d{2}$/) && !id.match(/^[var]\d{2}$/)) continue; // Topics like 01, 74, v01, r01, a01
  if (!allAnalogies.has(id)) {
    missing.push(id);
  }
}
console.log("Missing analogies for:", missing);
