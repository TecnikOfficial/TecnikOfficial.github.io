const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const { PurgeCSS } = require('purgecss');
const Terser = require('terser');
const { minify: htmlMinify } = require('html-minifier');

// Paths
const SRC_HTML = path.join(__dirname, 'src', 'index.html');
const OUT_HTML = path.join(__dirname, 'index.html');
const ASSETS_DIR = path.join(__dirname, 'assets');
const OUT_CSS = path.join(ASSETS_DIR, 'style.min.css');
const OUT_JS = path.join(ASSETS_DIR, 'script.min.js');

// Ensure assets dir exists
if (!fs.existsSync(ASSETS_DIR)) fs.mkdirSync(ASSETS_DIR);

// Read src/index.html
const htmlContent = fs.readFileSync(SRC_HTML, 'utf8');
const dom = new JSDOM(htmlContent);
const document = dom.window.document;

// Extract CSS and JS
const styleTag = document.querySelector('style');
const scriptTag = document.querySelector('script');

const css = styleTag ? styleTag.textContent : '';
const js = scriptTag ? scriptTag.textContent : '';

// PurgeCSS (remove unused CSS based on HTML content)
async function processCSS() {
  // Write HTML to temp file, as PurgeCSS expects a file
  const tempHtmlPath = path.join(__dirname, 'assets', 'purge-tmp.html');
  fs.writeFileSync(tempHtmlPath, dom.serialize(), 'utf8');
  const purgeCSSResult = await new PurgeCSS().purge({
    content: [tempHtmlPath],
    css: [{ raw: css }],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
  });
  fs.unlinkSync(tempHtmlPath);

  const purgedCSS = purgeCSSResult[0] ? purgeCSSResult[0].css : css;
  // PostCSS with Autoprefixer and cssnano
  const result = await postcss([autoprefixer, cssnano]).process(purgedCSS, { from: undefined });
  return result.css;
}

// Minify JS
async function processJS() {
  const minified = await Terser.minify(js);
  return minified.code || '';
}

(async () => {
  // Process CSS & JS
  const cssFinal = await processCSS();
  const jsFinal = await processJS();

  // Write minified CSS & JS to assets
  fs.writeFileSync(OUT_CSS, cssFinal, 'utf8');
  fs.writeFileSync(OUT_JS, jsFinal, 'utf8');

  // Remove old <style> and <script> tags from DOM
  if (styleTag) styleTag.remove();
  if (scriptTag) scriptTag.remove();

  // Add <link> and <script> references
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'assets/style.min.css';
  document.head.appendChild(link);

  const script = document.createElement('script');
  script.src = 'assets/script.min.js';
  script.defer = true;
  document.body.appendChild(script);

  // Minify HTML
  const finalHtml = htmlMinify(dom.serialize(), {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: false,
    minifyJS: false
  });

  // Write output HTML
  fs.writeFileSync(OUT_HTML, finalHtml, 'utf8');
  console.log('Build complete: index.html and assets/style.min.css + script.min.js created/updated.');
})();