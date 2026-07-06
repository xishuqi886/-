import vm from 'vm';
import fs from 'fs';

try {
  const html = fs.readFileSync('evaluator_standalone.html', 'utf8');
  const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
  if (!scriptMatch) {
    console.error("No script tag found!");
    process.exit(1);
  }
  const scriptContent = scriptMatch[1];
  
  console.log("Found script of length:", scriptContent.length);
  
  // Set up a basic window mock
  const sandbox = {
    window: {},
    document: {
      createElement: () => ({ relList: { supports: () => false } }),
      addEventListener: () => {},
      head: {
        appendChild: () => {}
      },
      body: {
        appendChild: () => {}
      },
      getElementById: () => null,
    },
    navigator: {
      userAgent: 'node',
    },
    console: {
      log: console.log,
      error: console.error,
      warn: console.warn,
    }
  };
  sandbox.window = sandbox;
  sandbox.global = sandbox;
  
  const context = vm.createContext(sandbox);
  const script = new vm.Script(scriptContent);
  script.runInContext(context);
  console.log("Script executed successfully without syntax errors in mock VM!");
} catch (err) {
  console.error("VM Execution Error:", err);
}
