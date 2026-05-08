const fs = require('fs');
const content = fs.readFileSync('./src/App.tsx', 'utf-8');

// Find all topic arrays arrays
const allTopics = [];

// extract arrays content:
const arrayNames = ['detailedTopics', 'vueDetailedTopics', 'reactDetailedTopics', 'angularDetailedTopics'];
for (const arrName of arrayNames) {
    const listRegex = new RegExp(`const ${arrName} = \\[([\\s\\S]*?)\\];`, 'g');
    const match = listRegex.exec(content);
    if (match) {
        const idRegex = /id:\s*"([^"]+)"/g;
        let idMatch;
        while ((idMatch = idRegex.exec(match[1])) !== null) {
            allTopics.push(idMatch[1]);
        }
    }
}

const analogiesRegex = /"([^"]+)":\s*\{\s*items:/g;
const allAnalogies = new Set();
let match;
while ((match = analogiesRegex.exec(content)) !== null) {
  allAnalogies.add(match[1]);
}

const missing = allTopics.filter(id => !allAnalogies.has(id));
console.log("Found topics size:", allTopics.length);
console.log("Found analogies size:", allAnalogies.size);
console.log("Missing analogies for:", missing);
