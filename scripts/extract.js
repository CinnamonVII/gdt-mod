const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, '..', 'main.original.js');
const outDir = path.join(__dirname, '..', 'src');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const lines = fs.readFileSync(srcFile, 'utf8').split('\n');

function findLine(str, startFrom = 0) {
    for (let i = startFrom; i < lines.length; i++) {
        if (lines[i].includes(str)) return i;
    }
    throw new Error(`Could not find "${str}"`);
}

// Ensure the first line is the IIFE wrapper and we skip it
if (!lines[0].includes('(function () {')) throw new Error("Expected IIFE start on line 0");

const bounds = [];

// Module 00: Polyfills
const lPoly = 1; // start after wrapper
bounds.push({ name: '00_polyfills.js', start: lPoly });

// Module 01: Styles
const lStyles = findLine('(function injectModStyles() {');
bounds.push({ name: '01_styles.js', start: lStyles });

// Module 02: Helpers
const lHelpers = findLine('function makeSelectSearchable');
bounds.push({ name: '02_helpers.js', start: lHelpers });

// Module 03: DataInit
const lDataInit = findLine("GDT.on('all-games-loaded'");
bounds.push({ name: '03_dataInit.js', start: lDataInit });

// Module 04: CoreHooks (Weekly update hook)
const lCoreHooks = findLine('var GameManager_proceedToNextWeek');
bounds.push({ name: '04_coreHooks.js', start: lCoreHooks });

// Module 05: Economy/Market
const lEconomy = findLine('function calculateMarketShares');
bounds.push({ name: '05_economy.js', start: lEconomy });

// Module 06: Companies/Rivals
const lCompanies = findLine('function processAIGames');
bounds.push({ name: '06_companies.js', start: lCompanies });

// Module 07: Subsidiaries
const lSubsidiaries = findLine('function checkSubsidiaryCompletion');
bounds.push({ name: '07_subsidiaries.js', start: lSubsidiaries });

// Module 08: Projects/DLC
const lProjects = findLine('function handleCoDev');
bounds.push({ name: '08_projects.js', start: lProjects });

// Module 09: Media/Franchises
const lMedia = findLine('function csGetMediaProjectById');
bounds.push({ name: '09_media.js', start: lMedia });

// Module 10: Crossovers/Licensing
const lCrossovers = findLine('function csAttemptCrossover');
bounds.push({ name: '10_crossovers.js', start: lCrossovers });

// Module 11: Platforms/Streaming
const lPlatforms = findLine('function csUpdateStreamingPlatforms');
bounds.push({ name: '11_platforms.js', start: lPlatforms });

// Module 12: UI Base/Navigation
const lUIBase = findLine('var currentModTab = "subsidiaries";');
bounds.push({ name: '12_ui_base.js', start: lUIBase });

// Module 13: UI Tabs (Subsidiaries, Market)
const lUITabs = findLine('function renderSubsidiariesTab');
bounds.push({ name: '13_ui_tabs.js', start: lUITabs });

// Module 14: UI Projects (DLC, CoDev)
const lUIProjects = findLine('function renderDLCTab');
bounds.push({ name: '14_ui_projects.js', start: lUIProjects });

// Module 15: UI Media (Grid, Movies)
const lUIMedia = findLine('function csRenderDistributionTab');
bounds.push({ name: '15_ui_media.js', start: lUIMedia });

// End of file wrapper
const lEnd = findLine('})();');

// Finalize bounds
for (let i = 0; i < bounds.length; i++) {
    const endIdx = (i < bounds.length - 1) ? bounds[i+1].start : lEnd;
    const chunkLines = lines.slice(bounds[i].start, endIdx);
    
    // Trim trailing empty lines
    while(chunkLines.length > 0 && chunkLines[chunkLines.length - 1].trim() === '') {
        chunkLines.pop();
    }
    
    fs.writeFileSync(path.join(outDir, bounds[i].name), chunkLines.join('\n') + '\n');
    console.log(`Wrote ${bounds[i].name} (lines ${bounds[i].start + 1} to ${endIdx})`);
}

console.log("Extraction complete.");
