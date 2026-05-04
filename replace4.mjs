import fs from "fs";

let content = fs.readFileSync("src/App.tsx", "utf-8");
content = content.replace(
  "document.onmousemove = function(e){\n    console.log('X:', e.clientX, 'Y:', e.clientY);\\n};",
  "document.onmousemove = function(e){\\n    console.log('X:', e.clientX, 'Y:', e.clientY);\\n};"
);

// Actually, let me just fix the entire code block for index 11.
content = content.replace(
  \`    code: "caixa.onmouseenter = function() {\\n  caixa.style.opacity = '1';\\n}\\n\\ndocument.onmousemove = function(e){
  console.log('X:', e.clientX, 'Y:', e.clientY);\\n};"\`,
  \`    code: "caixa.onmouseenter = function() {\\\\n  caixa.style.opacity = '1';\\\\n}\\\\n\\\\ndocument.onmousemove = function(e){\\\\n  console.log('X:', e.clientX, 'Y:', e.clientY);\\\\n};"\`
);

// Fallback replace since the precise regex might fail due to spaces
content = content.replace(/document\\.onmousemove = function\\(e\\)\\{\\n/g, "document.onmousemove = function(e){\\\\n");
// And another check:
content = content.replace(/\\console\\.log\\('X:',/g, "  console.log('X:',");

fs.writeFileSync("src/App.tsx", content);
