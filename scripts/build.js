#!/usr/bin/env node
/**
 * Build Script — Concurrent Studios Mod
 * 
 * Concatenates all src/*.js files (in numeric order) into a single main.js
 * wrapped in an IIFE, matching the original monolithic structure.
 * 
 * Usage: node scripts/build.js
 * 
 * Zero external dependencies.
 */

var fs = require('fs');
var path = require('path');

var SRC_DIR = path.join(__dirname, '..', 'src');
var OUT_FILE = path.join(__dirname, '..', 'main.js');

// 1. Discover source files
var files = fs.readdirSync(SRC_DIR)
    .filter(function (f) { return f.endsWith('.js'); })
    .sort(); // Numeric prefix ensures correct order (00_, 01_, ...)

if (files.length === 0) {
    console.error('[BUILD] ERROR: No .js files found in src/');
    process.exit(1);
}

console.log('[BUILD] Found ' + files.length + ' source files:');
files.forEach(function (f) { console.log('  - ' + f); });

// 2. Read and concatenate
var chunks = [];
files.forEach(function (f) {
    var content = fs.readFileSync(path.join(SRC_DIR, f), 'utf8');
    chunks.push('    // ========== ' + f + ' ==========');
    chunks.push(content);
    chunks.push('');
});

// 3. Wrap in IIFE
var output = '(function () {\n' + chunks.join('\n') + '\n})();\n';

// 4. Syntax validation
try {
    new Function(output);
    console.log('[BUILD] Syntax validation: PASSED');
} catch (e) {
    console.error('[BUILD] SYNTAX ERROR in generated output:');
    console.error('  ' + e.message);
    
    // Try to find which file caused the error
    var lineNum = 0;
    try {
        var match = e.message.match(/line (\d+)/i) || e.stack.match(/:(\d+)/);
        if (match) lineNum = parseInt(match[1]);
    } catch (ignored) {}
    
    if (lineNum > 0) {
        var lines = output.split('\n');
        var start = Math.max(0, lineNum - 3);
        var end = Math.min(lines.length, lineNum + 3);
        console.error('  Near line ' + lineNum + ':');
        for (var i = start; i < end; i++) {
            var marker = (i + 1 === lineNum) ? ' >> ' : '    ';
            console.error(marker + (i + 1) + ': ' + lines[i]);
        }
    }
    
    // Still write the file so the user can inspect it
    fs.writeFileSync(OUT_FILE, output, 'utf8');
    console.error('[BUILD] Output written despite errors for inspection: ' + OUT_FILE);
    process.exit(1);
}

// 5. Write output
fs.writeFileSync(OUT_FILE, output, 'utf8');
var stats = fs.statSync(OUT_FILE);
console.log('[BUILD] Output: ' + OUT_FILE + ' (' + stats.size + ' bytes)');
console.log('[BUILD] Done.');
