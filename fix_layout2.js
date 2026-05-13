import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const regex = /topic\.id === 'v05' \|\| topic\.id === 'v06' \|\| topic\.id === 'v07'/g;
content = content.replace(regex, "topic.id.startsWith('v') && topic.id !== 'v01' && topic.id !== 'v02' && topic.id !== 'v03' && topic.id !== 'v04'");

fs.writeFileSync('src/App.tsx', content);
