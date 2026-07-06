import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

try {
  console.log("=== Post-Build Standalone Generation ===");
  
  // Read CSS compiled by Vite
  const distAssetsPath = path.resolve("dist/assets");
  const assetFiles = fs.readdirSync(distAssetsPath);
  const cssFile = assetFiles.find(f => f.endsWith(".css"));
  
  if (!cssFile) {
    throw new Error("Could not find compiled CSS file in dist/assets!");
  }
  const cssContent = fs.readFileSync(path.join(distAssetsPath, cssFile), "utf8");

  // Read IIFE JS compiled by esbuild
  const iifeJsContent = fs.readFileSync("dist/standalone_bundle.js", "utf8");

  // Generate self-contained HTML
  const htmlTemplate = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>创业与合伙抉择评估器</title>
  <style>
    ${cssContent}
  </style>
</head>
<body>
  <div id="root"></div>
  <script>
    ${iifeJsContent}
  </script>
</body>
</html>`;

  // Write standalone HTML to root and dist
  fs.writeFileSync("evaluator_standalone.html", htmlTemplate, "utf8");
  fs.writeFileSync("dist/evaluator_standalone.html", htmlTemplate, "utf8");
  console.log("Created evaluator_standalone.html successfully!");

  // Clean up the intermediate standalone_bundle.js
  if (fs.existsSync("dist/standalone_bundle.js")) {
    fs.unlinkSync("dist/standalone_bundle.js");
  }

  // Package everything into a tar.gz archive
  console.log("Creating web pack...");
  execSync("tar -czf evaluator_web_html.tar.gz dist/ evaluator_standalone.html", { stdio: 'inherit' });
  fs.copyFileSync("evaluator_web_html.tar.gz", "dist/evaluator_web_html.tar.gz");
  console.log("Created evaluator_web_html.tar.gz successfully!");

  console.log("=== Post-Build completed successfully ===");
} catch (err) {
  console.error("Post-build error:", err);
}
