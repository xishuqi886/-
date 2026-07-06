import fs from 'fs';

const html = fs.readFileSync('evaluator_standalone.html', 'utf8');

console.log("=== HEAD SECTION ===");
const headMatch = html.match(/<head>([\s\S]*?)<\/head>/);
if (headMatch) {
  console.log(headMatch[1].trim());
}

console.log("\n=== SCRIPT TAGS ===");
const scriptMatches = html.match(/<script[\s\S]*?>/gi);
console.log(scriptMatches);
