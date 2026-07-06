import fs from 'fs';

try {
  const html = fs.readFileSync('evaluator_standalone.html', 'utf8');
  
  // Find all <script> tags
  console.log("--- Finding all script tags ---");
  const scriptRegex = /<script([^>]*?)>([\s\S]*?)<\/script>/gi;
  let match;
  let count = 0;
  while ((match = scriptRegex.exec(html)) !== null) {
    count++;
    const attrs = match[1].trim();
    const body = match[2].trim();
    console.log(`\n[Script #${count}]`);
    console.log(`Attributes: "${attrs}"`);
    console.log(`Body length: ${body.length} characters`);
    if (body.length > 0) {
      console.log(`Body starts with: "${body.substring(0, 100).replace(/\n/g, '\\n')}"...`);
      console.log(`Body ends with: ..."${body.substring(body.length - 100).replace(/\n/g, '\\n')}"`);
    }
  }
  
  console.log(`\nTotal script tags found: ${count}`);
} catch (err) {
  console.error("Error:", err);
}
