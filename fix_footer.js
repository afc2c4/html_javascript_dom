import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(/topic\.id !== 'v02' && topic\.id !== 'v03' && topic\.id !== 'v04' && topic\.id !== 'v05' && topic\.id !== 'v06' && topic\.id !== 'v07' && \(/g, 
  "!(topic.id.startsWith('v')) && topic.details && topic.details.length > 0 && (");

content = content.replace(/\{\(topic\.details\[idx\] \|\| topic\.details\[0\]\) && \(/g, "{!(topic.id.startsWith('v')) && (topic.details[idx] || topic.details[0]) && (");
content = content.replace(/\{topic\.details && topic\.details\.length > 0 && \(/g, "{!(topic.id.startsWith('v')) && topic.details && topic.details.length > 0 && (");

fs.writeFileSync('src/App.tsx', content);
