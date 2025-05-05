const fs = require('fs');
const { minify } = require('terser');
const cssnano = require('cssnano');
const postcss = require('postcss');
const htmlMinifier = require('html-minifier').minify;

async function minifyHTML() {
    // Read the HTML file from the src folder
    const html = fs.readFileSync('src/index.html', 'utf8');

    // Extract inline CSS and JS
    const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
    const jsMatch = html.match(/<script>([\s\S]*?)<\/script>/);

    const css = cssMatch ? cssMatch[1] : '';
    const js = jsMatch ? jsMatch[1] : '';

    // Minify CSS
    const minifiedCSS = await postcss([cssnano]).process(css, { from: undefined }).then(result => result.css);

    // Minify JS
    const minifiedJS = await minify(js);

    // Minify HTML (without inline CSS and JS)
    const minifiedHTML = htmlMinifier(html, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: false, // We will insert minified CSS later
        minifyJS: false,  // We will insert minified JS later
    });

    // Insert minified CSS and JS back into HTML
    const finalHTML = minifiedHTML
        .replace(/<style>[\s\S]*?<\/style>/, `<style>${minifiedCSS}</style>`)
        .replace(/<script>[\s\S]*?<\/script>/, `<script>${minifiedJS.code}</script>`);

    // Write the final minified HTML to the root
    fs.writeFileSync('index.html', finalHTML);
    console.log('Minification complete! Updated index.html in the root folder.');
}

// Run the minification process
minifyHTML().catch(console.error);
