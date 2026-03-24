(function () {
    console.log("Concurrent Studios mod loaded.");

    
    (function injectModStyles() {
        if (document.getElementById('cs-mod-styles')) return;
        var css = document.createElement('style');
        css.id = 'cs-mod-styles';
        css.textContent = [
            
            '#modUI .selectorButton, #modUI button, .simplemodal-data .selectorButton, .simplemodal-data button {',
            '  transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease !important;',
            '}',
            '#modUI .selectorButton:hover, #modUI button:hover, .simplemodal-data .selectorButton:hover, .simplemodal-data button:hover {',
            '  transform: translateY(-1px) !important;',
            '  box-shadow: 0 3px 8px rgba(0,0,0,0.18) !important;',
            '  filter: brightness(1.08) !important;',
            '}',
            '#modUI .selectorButton:active, #modUI button:active, .simplemodal-data .selectorButton:active, .simplemodal-data button:active {',
            '  transform: translateY(0px) scale(0.97) !important;',
            '  box-shadow: 0 1px 2px rgba(0,0,0,0.15) !important;',
            '  filter: brightness(0.95) !important;',
            '}',

            
            '.studioCard {',
            '  transition: transform 0.2s ease, box-shadow 0.2s ease !important;',
            '}',
            '.studioCard:hover {',
            '  transform: translateY(-2px) !important;',
            '  box-shadow: 0 4px 12px rgba(0,0,0,0.14) !important;',
            '}',

            
            '.dlcItem {',
            '  transition: transform 0.2s ease, box-shadow 0.2s ease !important;',
            '}',
            '.dlcItem:hover {',
            '  transform: translateY(-2px) !important;',
            '  box-shadow: 0 4px 12px rgba(0,0,0,0.14) !important;',
            '}',

            
            '.cs-stagger-item {',
            '  transition: transform 0.2s ease, box-shadow 0.2s ease !important;',
            '}',
            '.cs-stagger-item:hover {',
            '  transform: translateY(-2px) !important;',
            '  box-shadow: 0 4px 12px rgba(0,0,0,0.14) !important;',
            '}',

            
            '#modUI_header > div {',
            '  transition: background-color 0.2s ease, color 0.2s ease, transform 0.15s ease !important;',
            '}',
            '#modUI_header > div:hover {',
            '  filter: brightness(1.06);',
            '  transform: translateY(-1px);',
            '}',

            
            '#modUI input:focus, #modUI select:focus, .simplemodal-data input:focus, .simplemodal-data select:focus {',
            '  border-color: #d35400 !important;',
            '  box-shadow: 0 0 0 2px rgba(211,84,0,0.15) !important;',
            '  outline: none !important;',
            '  transition: border-color 0.2s ease, box-shadow 0.2s ease !important;',
            '}',

            
            '@keyframes csFadeSlideIn {',
            '  from { opacity: 0; transform: translateY(8px); }',
            '  to { opacity: 1; transform: translateY(0); }',
            '}',
            '.cs-animate-in {',
            '  animation: csFadeSlideIn 0.25s ease-out forwards !important;',
            '}',

            
            '@keyframes csCardEnter {',
            '  from { opacity: 0; transform: translateX(-12px); }',
            '  to { opacity: 1; transform: translateX(0); }',
            '}',
            '.cs-card-enter {',
            '  animation: csCardEnter 0.3s ease-out forwards !important;',
            '}',

            
            '#modUI_content { scroll-behavior: smooth; }',
            '#modUI_content::-webkit-scrollbar { width: 6px; }',
            '#modUI_content::-webkit-scrollbar-track { background: #ecf0f1; }',
            '#modUI_content::-webkit-scrollbar-thumb { background: #bdc3c7; border-radius: 3px; }',
            '#modUI_content::-webkit-scrollbar-thumb:hover { background: #95a5a6; }'
        ].join('\n');
        document.head.appendChild(css);
    })();


    
    var store = GDT.getDataStore("concurrent_studios");
    var isShowingDraft = false;
    
    
    var originalFinishDevelopment = (typeof GameManager !== 'undefined') ? GameManager.finishDevelopment : null;
    if (originalFinishDevelopment) {
        GameManager.finishDevelopment = function () {
            var playerGame = GameManager.company.currentGame;
            if (!playerGame) { originalFinishDevelopment.apply(this, arguments); return; }
            
            var scrubEntry = store.data.coDevScrubMap[playerGame.title];
            
            
            originalFinishDevelopment.apply(this, arguments);
            
            
            if (scrubEntry) {
                var c = GameManager.company;
                
                var props = ["prevDesignPoints", "prevTechnologyPoints", "designBaseline", "technologyBaseline", "lastDesignPoints", "lastTechPoints"];
                
                if (typeof c.prevDesignPoints !== 'undefined') c.prevDesignPoints = Math.max(0, c.prevDesignPoints - scrubEntry.design);
                if (typeof c.prevTechnologyPoints !== 'undefined') c.prevTechnologyPoints = Math.max(0, c.prevTechnologyPoints - scrubEntry.tech);
                if (typeof c.designBaseline !== 'undefined') c.designBaseline = Math.max(0, c.designBaseline - scrubEntry.design);
                if (typeof c.technologyBaseline !== 'undefined') c.technologyBaseline = Math.max(0, c.technologyBaseline - scrubEntry.tech);
                
                
                if (c.gameLog && c.gameLog.length > 0) {
                    var lastG = c.gameLog[c.gameLog.length - 1];
                    if (lastG.title === playerGame.title || lastG.name === playerGame.title) {
                        lastG.designPoints = Math.max(0, lastG.designPoints - scrubEntry.design);
                        lastG.technologyPoints = Math.max(0, lastG.technologyPoints - scrubEntry.tech);
                    }
                }
                
                
                delete store.data.coDevScrubMap[playerGame.title];
                GDT.saveData("concurrent_studios", store.data);
            }
        };
    }

    
    GDT.on(GDT.eventKeys.saves.loading, function (e) {
        initData();
    });

    GDT.on(GDT.eventKeys.saves.newGame, function (e) {
        initData();
    });

    GDT.on(GDT.eventKeys.ui.contextMenuShowing, function (e) {
        if (e && e.items) {
            e.items.push({
                label: "Market & Studios...",
                action: function () {
                    Sound.click();
                    showModMenu("market");
                }
            });

        }
    });

    function initData() {
        if (!store.data.studios || store.data.studios.length === 0) {
            store.data.studios = generateInitialStudios();
        }
        if (!store.data.dlcData) {
            store.data.dlcData = {};
        }
        if (!store.data.lastWeekProcessed) {
            store.data.lastWeekProcessed = -1;
        }
        if (!store.data.releaseHistory) {
            store.data.releaseHistory = []; 
        }
        if (!store.data.publishingOffers) {
            store.data.publishingOffers = [];
        }
        if (!store.data.activeAIGames) {
            store.data.activeAIGames = []; 
        }
        if (!store.data.coDevScrubMap) {
            store.data.coDevScrubMap = {}; 
        }

        
        if (typeof GameManager !== 'undefined' && GameManager.company && GameManager.company.gameLog) {
            GameManager.company.gameLog = GameManager.company.gameLog.filter(function(g) {
                return !g.modAI && !(store.data.modGameIds && store.data.modGameIds[g.id]);
            });
            
            store.data.modGameIds = {};
        }

        
        if (typeof GameManager !== 'undefined' && GameManager.company && GameManager.company.gameLog) {
            var c = GameManager.company;
            var log = c.gameLog;
            var repairedCount = 0;
            
            
            var staffCount = (c.staff ? c.staff.length : 0) + 1; 
            var techBonus = (c.techLevel || 1) * 20;
            var maxReasonable = (staffCount * 300) + techBonus + 500; 
            
            for (var i = 0; i < log.length; i++) {
                var g = log[i];
                var scrub = store.data.coDevScrubMap[g.title] || store.data.coDevScrubMap[g.name];
                
                var wasScrubbed = false;
                
                if (g.modCoDevDesignAdded || g.modCoDevTechAdded || scrub) {
                    var d = (g.modCoDevDesignAdded || 0) + (scrub ? scrub.design : 0);
                    var t = (g.modCoDevTechAdded || 0) + (scrub ? scrub.tech : 0);
                    g.designPoints = Math.max(0, g.designPoints - d);
                    g.technologyPoints = Math.max(0, g.technologyPoints - t);
                    delete g.modCoDevDesignAdded; delete g.modCoDevTechAdded;
                    repairedCount++; wasScrubbed = true;
                }
                
                
                if (!wasScrubbed) {
                    if (g.designPoints > (maxReasonable * 2.5)) { g.designPoints = Math.min(g.designPoints, maxReasonable); repairedCount++; }
                    if (g.technologyPoints > (maxReasonable * 2.5)) { g.technologyPoints = Math.min(g.technologyPoints, maxReasonable); repairedCount++; }
                }
            }
            
            
            if (log.length > 0) {
                var lastG = log[log.length - 1];
                if (typeof c.prevDesignPoints !== 'undefined') c.prevDesignPoints = lastG.designPoints;
                if (typeof c.prevTechnologyPoints !== 'undefined') c.prevTechnologyPoints = lastG.technologyPoints;
                if (typeof c.designBaseline !== 'undefined') c.designBaseline = lastG.designPoints;
                if (typeof c.technologyBaseline !== 'undefined') c.technologyBaseline = lastG.technologyPoints;
                
                if (repairedCount > 0) console.log("[Mod] Heuristic Baseline Repair: Scrubbed " + repairedCount + " data-points. Solo potential restored.");
            }
        }
    }

    function generateGameName(topic, genre) {
        var pre = ["Super", "Mega", "Ultra", "The", "Call of", "World of", "Age of", "Return to", "Escape from", "Chronicles of", "Legend of", "Project", "Secret of", "Rise of", "Fall of", "Dark", "Light", "Shadow", "Blood", "Iron"];
        var mid = ["Duty", "Craft", "Star", "Wars", "Knight", "Dragon", "City", "Quest", "Fantasy", "Space", "Zombies", "Ninja", "Pirate", "Cyber", "Steam", "Magic", "Blade", "Gun", "Soul", "Heart"];
        var post = ["II", "III", "IV", "V", "X", "Alpha", "Omega", "Origins", "Awakening", "Rebirth", "Online", "Plus", "Ultra", "HD", "Remastered", "Zero", "Infinite", "Evolved", "Unleashed", "Reckoning"];
        
        var name = "";
        var rand = Math.random();
        if (rand < 0.3) {
            name = pre[Math.floor(Math.random() * pre.length)] + " " + mid[Math.floor(Math.random() * mid.length)];
        } else if (rand < 0.6) {
            name = mid[Math.floor(Math.random() * mid.length)] + " " + post[Math.floor(Math.random() * post.length)];
        } else if (rand < 0.9) {
            name = pre[Math.floor(Math.random() * pre.length)] + " " + mid[Math.floor(Math.random() * mid.length)] + " " + post[Math.floor(Math.random() * post.length)];
        } else {
            name = topic + " " + genre + " " + post[Math.floor(Math.random() * post.length)];
        }
        return name;
    }

    function generateInitialStudios() {
        var baseNames = [
            "Electronic Farts", "Microslop", "Ubislopt", "Nintendih", "Sonny", 
            "Take-Three", "Actiblizzion", "Square Index", "Crapcom", "Sega Megadrive",
            "BeThesduh", "Epic Fails", "Wavel", "Rockstarving", "CD Projekt Blue",
            "Bungie Jumping", "Naughty Doge", "Insomniac Nap", "Biowarehouse", "Telltall",
            "Konamii", "Bandaiscam", "FromSoftly", "Platinum Bronze", "Kojima Productions (Real)",
            "Respawn Dead", "Infinity Wardrobe", "Treyarchite", "Dicey", "Criterion Missing",
            "Maxiss", "Maxisss", "Bullfrogger", "Lionheadache", "Rareware Tearware",
            "Playground Sand", "Turn 11", "Polyphony Null", "Guerrilla Warfare", "Sucker Punchline",
            "Media Molecule", "Quantic Dreamer", "Remedy Sickness", "Halftone Life", "Gearbox Broken",
            "Obsidian Glass", "Larian Studios", "Double Fine Dining", "InXile Exile", "TaleWorlds Empty",
            "Creative Assembly Line", "Paradox Illusion", "Firaxis Axis", "Relic Ancient", "Blizzard Cold",
            "Riot Peaceful", "Valve Time", "Mojang Jang", "Zyngagag", "King Kong",
            "Supercell Battery", "Niantic Titanic", "Rovio Angry", "Crytek Cry", "Engine Software",
            "Monolith Softly", "Retro Studios Past", "Hal Laboratory", "Intelligent Systems Dumb", "Game Freak Nerd",
            "Creatures Inc", "Genius Sonority", "Level-4", "Atlus Shrugged", "Nippon Ichi Dos",
            "Koei Tecmo No", "Arc System Bad Works", "SNK Playmore Or Less", "Capcom Cup", "Sega Sammy",
            "Taito Potato", "Namco Bandango", "Hudson Soft Hard", "Compile Heart Attack", "Idea Factory Out of Ideas",
            "Gust Wind", "Nihon Falcom", "Spike Chunsoftly", "Marvelous Wonderful", "Grezzo Gross",
            "Dimps Dumps", "Eighting Nine", "Arika Paprika", "Treasure Trash", "Cave Cave",
            "MOSS Boss", "Qute Cute", "G.rev G.forward", "Triangle Service", "Alfa System Beta",
            "Cygames Cy", "Craft Egg", "Colopl Cop", "Mixi Maxi", "GungHo GungNo",
            "KLab Lab", "DeNA DNA", "GREE Tree", "Netmarble Marble", "Nexon Next"
        ];
        
        var generated = [];
        for (var i = 0; i < baseNames.length; i++) {
            
            var val = Math.floor((Math.random() * 148000000) + 2000000);
            generated.push({ 
                id: "S_" + i, 
                name: baseNames[i], 
                valuation: val, 
                sharesOwned: 0, 
                currentProject: null,
                isFounded: false
            });
        }
        return generated;
    }

    
    setInterval(function () {
        
        if (typeof GameManager === 'undefined' || typeof UI === 'undefined' || !GameManager.company) {
            return;
        }

        tickEconomy();
    }, 1000);

    function tickEconomy() {
        var currentWeek = Math.floor(GameManager.company.currentWeek);
        if (store.data.lastWeekProcessed === currentWeek) {
            return;
        }
        store.data.lastWeekProcessed = currentWeek;

        
        try {
            processCompetitors();
        } catch(e) { console.error("[Mod] processCompetitors error:", e); }
        try {
            processDLCs();
        } catch(e) { console.error("[Mod] processDLCs error:", e); }
        try {
            processAISales();
        } catch(e) { console.error("[Mod] processAISales error:", e); }
        try {
            processPublishingProjects();
        } catch(e) { console.error("[Mod] processPublishingProjects error:", e); }
        
        
        for (var i = 0; i < GameManager.company.gameLog.length; i++) {
            var g = GameManager.company.gameLog[i];
            if (g.flags && g.flags.isExtensionPack && g.sequelTo && !g.modDlcRevived) {
                g.modDlcRevived = true;
                var baseGame = GameManager.company.getGameById(g.sequelTo);
                if (baseGame && !baseGame.flags.mmo) {
                    var dlcBonus = (g.score || 5) * 250000; 
                    GameManager.company.adjustCash(dlcBonus, "Base Game Surge: " + baseGame.title);
                    GameManager.company.notifications.push(new Notification({
                        header: "Storefront Surge",
                        text: "The DLC launch for " + baseGame.title + " generated a massive surge of $" + UI.getShortNumberString(dlcBonus) + " in classic back-catalog sales!",
                        image: ""
                    }));
                }
            }
        }
        
        
        for (var i = 0; i < GameManager.company.gameLog.length; i++) {
            var g = GameManager.company.gameLog[i];
            if (g.state === GameState.released && g.modIsPublishingDeal) {
                if (g.modLastSalesCash === undefined) {
                    g.modLastSalesCash = g.totalSalesCash;
                } else {
                    var delta = g.totalSalesCash - g.modLastSalesCash;
                    if (delta > 0) {
                        var takeBack = delta * 0.70;
                        GameManager.company.adjustCash(-takeBack, "Publisher 70% Cut: " + g.title);
                        g.modLastSalesCash = g.totalSalesCash;
                    }
                }
            }
        }

        
        for (var i = 0; i < GameManager.company.gameLog.length; i++) {
            var g = GameManager.company.gameLog[i];
            var scrubEntry = store.data.coDevScrubMap[g.title];
            if (scrubEntry) {
                if (scrubEntry.design) {
                    g.designPoints = Math.max(0, g.designPoints - scrubEntry.design);
                }
                if (scrubEntry.tech) {
                    g.technologyPoints = Math.max(0, g.technologyPoints - scrubEntry.tech);
                }
                
                delete store.data.coDevScrubMap[g.title];
            }
        }
    }

    function processAISales() {
        if (!store.data.activeAIGames) store.data.activeAIGames = [];
        for (var i = store.data.activeAIGames.length - 1; i >= 0; i--) {
            var g = store.data.activeAIGames[i];
            if (typeof g.modSalesWeeks === 'undefined') g.modSalesWeeks = 0;
            if (typeof g.modTotalSalesCash === 'undefined') g.modTotalSalesCash = 0;
            
            g.modSalesWeeks++;
            
            
            g.modCurrentWeeklySales = Math.floor(g.modCurrentWeeklySales * 0.85); 
            var weeklyCash = g.modCurrentWeeklySales;
            g.modTotalSalesCash += weeklyCash;

            if (weeklyCash > 0) {
                var studio = null;
                for (var s = 0; s < store.data.studios.length; s++) {
                    if (store.data.studios[s].id === g.modStudioId) {
                        studio = store.data.studios[s];
                        break;
                    }
                }

                if (g.modIsPublishingDeal) {
                    var cut = weeklyCash * 0.70; 
                    if (cut > 0) GameManager.company.adjustCash(cut, "Publishing Royalties: " + g.title);
                } else if (studio && studio.sharesOwned > 0) {
                    var div = weeklyCash * (studio.sharesOwned / 100);
                    if (div > 0) GameManager.company.adjustCash(div, "Dividend: " + studio.name + " (" + studio.sharesOwned + "%)");
                }
            }

            
            if (g.modSalesWeeks > 20 || g.modCurrentWeeklySales < 1000) {
                store.data.activeAIGames.splice(i, 1);
            }
        }
    }

    var starTiers = {
        1: { hire: 2000, fire: 1000, maint: 200, speed: 0.02, score: 0.2, label: "1-Star" },
        2: { hire: 5000, fire: 2500, maint: 500, speed: 0.05, score: 0.5, label: "2-Star" },
        3: { hire: 15000, fire: 7500, maint: 1500, speed: 0.10, score: 1.0, label: "3-Star" },
        4: { hire: 50000, fire: 25000, maint: 5000, speed: 0.20, score: 1.5, label: "4-Star" },
        5: { hire: 200000, fire: 100000, maint: 15000, speed: 0.40, score: 2.5, label: "5-Star" }
    };

    function ensureStaffObj(studio) {
        if (!studio.staff || typeof studio.staff !== 'object') {
            studio.staff = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        }
        for (var t = 1; t <= 5; t++) {
            if (typeof studio.staff[t] !== 'number') studio.staff[t] = 0;
        }

        if (typeof studio.employees === "number") {
             studio.staff[2] = (studio.staff[2] || 0) + studio.employees; 
             delete studio.employees;
        }

        var total = studio.staff[1] + studio.staff[2] + studio.staff[3] + studio.staff[4] + studio.staff[5];
        if (total === 0) {
            var initialEmp = studio.isFounded ? 5 : Math.floor(Math.random() * 10) + 5;
            for (var i = 0; i < initialEmp; i++) {
                var r = Math.random();
                if (r < 0.2) studio.staff[1]++;
                else if (r < 0.6) studio.staff[2]++;
                else if (r < 0.85) studio.staff[3]++;
                else if (r < 0.95) studio.staff[4]++;
                else studio.staff[5]++;
            }
        }
    }

    function processCompetitors() {
        var currentWeek = Math.floor(GameManager.company.currentWeek);
        var studios = store.data.studios;
        for (var i = 0; i < studios.length; i++) {
            var studio = studios[i];
            
            ensureStaffObj(studio);

            
            if (studio.sharesOwned >= 50 && (currentWeek % 4 === 0)) {
                var maint = 0;
                for (var t=1; t<=5; t++) maint += (starTiers[t].maint * (studio.staff[t] || 0));
                maint *= 4; 
                if (maint > 0) {
                    GameManager.company.adjustCash(-maint, "Upkeep: " + studio.name);
                }
            }

            if (studio.currentProject) {
                if (studio.currentProject.isPublishedByPlayer) continue;

                if (studio.currentProject.isCoDev) {
                    var playerGame = GameManager.company.currentGame;
                    if (playerGame) { 
                        
                        var dBonus = Math.floor(studio.valuation / 1000000) + 1;
                        var tBonus = Math.floor(studio.valuation / 1000000) + 1;
                        playerGame.designPoints += dBonus;
                        playerGame.technologyPoints += tBonus;
                        
                        
                        if (!store.data.coDevScrubMap[playerGame.title]) {
                            store.data.coDevScrubMap[playerGame.title] = { design: 0, tech: 0 };
                        }
                        store.data.coDevScrubMap[playerGame.title].design += dBonus;
                        store.data.coDevScrubMap[playerGame.title].tech += tBonus;
                        
                        
                    } else {
                        
                        studio.currentProject = null;
                        
                    }
                    continue; 
                }

                var speedMultiplier = 1;
                for (var t=1; t<=5; t++) speedMultiplier += (starTiers[t].speed * studio.staff[t]);

                studio.currentProject.weeksRemaining -= speedMultiplier;
                if (studio.currentProject.weeksRemaining <= 0) {
                    finishAndReleaseGame(studio);
                }
            } else {
                
                if (studio.sharesOwned >= 50) {
                    
                    if (isShowingDraft && $("#simplemodal-overlay").length === 0) {
                        isShowingDraft = false;
                    }

                    if (typeof studio.draftCooldown === 'undefined') studio.draftCooldown = 4;
                    if (studio.draftCooldown > 0) {
                        studio.draftCooldown--;
                    } else if (!isShowingDraft) {
                        try {
                            var draft = generateBestDraft(studio);
                            promptDraft(studio, draft);
                        } catch (e) {
                            console.error("[Mod] Draft trigger error:", e);
                            isShowingDraft = false;
                        }
                    }
                    continue; 
                }

                
                var acceptedOffer = false;
                if (!studio.isFounded && store.data.publishingOffers && store.data.publishingOffers.length > 0) {
                    for (var j = 0; j < store.data.publishingOffers.length; j++) {
                        var offer = store.data.publishingOffers[j];
                        if (offer.status !== "Pending Evaluation") continue;
                        var canHandle = false;
                        if (offer.size === "Small") canHandle = true;
                        if (offer.size === "Medium" && studio.valuation > 5000000) canHandle = true;
                        if (offer.size === "Large" && studio.valuation > 20000000) canHandle = true;
                        if (offer.size === "AAA" && studio.valuation > 50000000) canHandle = true;

                        
                        if (canHandle && Math.random() < 0.1) {
                            var chance = Math.random();
                            if (chance > 0.5) {
                                offer.status = "Approved";
                                if (!store.data.publishingProjects) store.data.publishingProjects = [];
                                store.data.publishingProjects.push({
                                    id: GameManager.getGUID(),
                                    studioId: studio.id,
                                    topic: offer.topic,
                                    genre: offer.genre,
                                    size: offer.size,
                                    platforms: offer.platforms || [offer.platform],
                                    weeksRemaining: (offer.size==="Small"?15:(offer.size==="Medium"?30:(offer.size==="Large"?50:80))),
                                    isPublishedByPlayer: true,
                                    publishedGameAdvance: offer.advance,
                                    offerId: offer.id
                                });
                                GameManager.company.notifications.push(new Notification({
                                    header: "Publishing Deal Accepted",
                                    text: studio.name + " accepted your advance of $" + UI.getShortNumberString(offer.advance) + " and will develop a " + offer.size + " " + offer.genre + " game!",
                                    image: ""
                                }));
                                acceptedOffer = true;
                                break; 
                            }
                        }
                    }
                }
                
                
                var hasActivePublishing = false;
                if (store.data.publishingProjects) {
                    for (var p=0; p<store.data.publishingProjects.length; p++) {
                        if (store.data.publishingProjects[p].studioId === studio.id) hasActivePublishing = true;
                    }
                }
                if (!acceptedOffer && !hasActivePublishing && Math.random() < 0.05) {
                    startAIProject(studio);
                }
            }
        }
    }

    function generateBestDraft(studio) {
        try {
            var currentWk = GameManager.company.currentWeek;
            var activePlats = Platforms.allPlatforms.filter(function(p) {
                return (p.published && p.published <= currentWk) &&
                       (!p.retireDate || p.retireDate > currentWk);
            });
            activePlats.sort(function(a, b) { return b.marketShare - a.marketShare; });
            var topPlat = activePlats[0] ? activePlats[0].name : Platforms.allPlatforms[0].name;
            
            var t = Topics.topics[Math.floor(Math.random() * Topics.topics.length)];
            var bestG = GameGenre.getAll()[0];
            var bestW = -1;
            var genreIndexMap = {"Action":0, "Adventure":1, "RPG":2, "Simulation":3, "Strategy":4, "Casual":5};
            var gList = GameGenre.getAll();
            for(var i=0; i<gList.length; i++) {
                var g = gList[i];
                var idx = genreIndexMap[g.name];
                var w = (t.genreWeightings && t.genreWeightings[idx]) || 0;
                if (w > bestW) { bestW = w; bestG = g; }
            }
            
            var size = "Small";
            if (studio.valuation > 50000000) size = "AAA";
            else if (studio.valuation > 20000000) size = "Large";
            else if (studio.valuation > 5000000) size = "Medium";

            return {
                topic: t.name,
                genre: bestG.name,
                size: size,
                platforms: [topPlat],
                cost: (size === "AAA" ? 1000000 : (size === "Large" ? 400000 : (size === "Medium" ? 100000 : 25000)))
            };
        } catch (e) {
            console.error("[Mod] generateBestDraft error, using fallback:", e);
            return { topic: "Zombies", genre: "Action", size: "Small", platforms: ["PC"], cost: 20000 };
        }
    }

    function promptDraft(studio, draft) {
        if (isShowingDraft) return; 
        try {
            isShowingDraft = true;
            Sound.click();

            var genreIndexMap = {"Action":0, "Adventure":1, "RPG":2, "Simulation":3, "Strategy":4, "Casual":5};
            var container = $('<div class="windowBorder" style="background-color: #fdf6e3; color: #2c3e50; padding: 0; overflow: hidden; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.4);"></div>');

            var header = $('<div style="background-color: #1a5276; padding: 15px 20px; position: relative; border-bottom: 3px solid #154360;"></div>');
            header.append('<div style="position: absolute; right: 15px; top: 18px; background: #d35400; color: white; padding: 3px 12px; border-radius: 20px; font-size: 10pt; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1px;">DLC</div>');
            header.append('<div style="font-size: 16pt; font-weight: bold; color: white; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-right: 60px; text-shadow: 1px 1px 3px rgba(0,0,0,0.5);">' + studio.name + '</div>');
            header.append('<div style="font-size: 11pt; color: rgba(255,255,255,0.85); margin-top: 4px; font-style: italic;">Subsidiary Project Proposal</div>');
            container.append(header);

            var body = $('<div style="padding: 20px; background: #ffffff; border-bottom: 1px solid #d5dbdb;"></div>');
            
            function makeRow(labelText, color, selectEl) {
                var row = $('<div style="display: flex; align-items: center; margin-bottom: 12px;"></div>');
                row.append('<div style="width: 85px; font-size: 11pt; font-weight: bold; color: #34495e; text-transform: uppercase; letter-spacing: 0.5px;">' + labelText + '</div>');
                selectEl.css({ 
                    "flex": "1", 
                    "min-width": "0", 
                    "font-size": "11pt", 
                    "padding": "6px 10px", 
                    "border-radius": "4px", 
                    "border": "1px solid #bdc3c7", 
                    "background": "#f9f9f9", 
                    "color": "#2c3e50", 
                    "outline": "none", 
                    "cursor": "pointer", 
                    "box-shadow": "inset 0 1px 2px rgba(0,0,0,0.05)",
                    "transition": "border-color 0.2s"
                });
                selectEl.hover(function(){ $(this).css("border-color", color); }, function(){ $(this).css("border-color", "#bdc3c7"); });
                row.append(selectEl);
                return row;
            }

            var topicSelect = $('<select id="draft_topic"></select>');
            Topics.topics.forEach(function(t) {
                var opt = $('<option value="' + t.name + '">' + t.name + '</option>');
                if (t.name === draft.topic) opt.attr("selected", true);
                topicSelect.append(opt);
            });
            body.append(makeRow("Topic", "#2980b9", topicSelect));

            var genreSelect = $('<select id="draft_genre"></select>');
            GameGenre.getAll().forEach(function(g) {
                var opt = $('<option value="' + g.name + '">' + g.name + '</option>');
                if (g.name === draft.genre) opt.attr("selected", true);
                genreSelect.append(opt);
            });
            body.append(makeRow("Genre", "#8e44ad", genreSelect));

            var sizeSelect = $('<select id="draft_size"></select>');
            ["Small", "Medium", "Large", "AAA"].forEach(function(s) {
                var opt = $('<option value="' + s + '">' + s + '</option>');
                if (s === draft.size) opt.attr("selected", true);
                sizeSelect.append(opt);
            });
            body.append(makeRow("Size", "#d35400", sizeSelect));

            var matchBar = $('<div style="display: flex; align-items: center; margin-top: 5px; margin-bottom: 10px;"></div>');
            matchBar.append('<div style="width: 85px; font-size: 11pt; font-weight: bold; color: #7f8c8d; text-transform: uppercase;">Match</div>');
            var matchLabel = $('<span id="draft_match" style="font-size: 10.5pt; font-weight: bold; padding: 4px 12px; border-radius: 20px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);"></span>');
            matchBar.append(matchLabel);
            body.append(matchBar);

            function updateDraftMatch() {
                var selTopic = $('#draft_topic').val();
                var selGenre = $('#draft_genre').val();
                var t = Topics.topics.filter(function(x) { return x.name === selTopic; })[0];
                var g = GameGenre.getAll().filter(function(x) { return x.name === selGenre; })[0];
                if (t && g) {
                    var idx = genreIndexMap[g.name]; if (idx === undefined) idx = 0;
                    var w = (t.genreWeightings && t.genreWeightings[idx]) || 0;
                    var el = $('#draft_match');
                    if (w >= 1.0) { el.text("Premium Quality \u2605\u2605\u2605").css({ "color": "white", "background": "#27ae60" }); }
                    else if (w >= 0.8) { el.text("Standard Quality \u2605\u2605").css({ "color": "white", "background": "#f39c12" }); }
                    else if (w >= 0.7) { el.text("Fair Quality \u2605").css({ "color": "white", "background": "#e67e22" }); }
                    else { el.text("Low Synergy \u2717").css({ "color": "white", "background": "#c0392b" }); }
                }
            }

            var costLine = $('<div style="text-align: center; margin-top: 15px; padding: 12px; background: #f4f6f7; border: 2px dashed #bdc3c7; border-radius: 8px; font-size: 13pt; color: #2c3e50;">Required Funding: \u003cstrong style=\"color: #c0392b; font-size: 15pt;\"\u003e$' + UI.getShortNumberString(draft.cost) + '\u003c/strong\u003e</div>');
            body.append(costLine);
            container.append(body);

            var btnArea = $('<div style=\"display: flex; gap: 10px; padding: 15px 20px; background: #ecf0f1;\"></div>');
            var btnAccept = $('<div class=\"selectorButton greenButton\" style=\"flex: 1.5; text-align: center; padding: 12px 0; font-size: 13pt; font-weight: bold; cursor: pointer; border-radius: 6px; box-shadow: 0 3px 0 #1e8449;\">Accept \u0026 Fund</div>');
            btnAccept.click(function() {
                var selTopic = $('#draft_topic').val();
                var selGenre = $('#draft_genre').val();
                var selSize = $('#draft_size').val();
                var cost = draft.cost;
                var currentWk = Math.floor(GameManager.company.currentWeek);
                var activePlats = Platforms.allPlatforms.filter(function(p) { return (p.published && p.published <= currentWk) && (!p.retireDate || p.retireDate > currentWk); });
                activePlats.sort(function(a, b) { return b.marketShare - a.marketShare; });
                var finalPlats = [];
                if (activePlats.length > 0) { finalPlats.push(activePlats[0].name); if ((selSize === "Large" || selSize === "AAA") && activePlats.length > 1) finalPlats.push(activePlats[1].name); }
                else { finalPlats.push(Platforms.allPlatforms[0].name); }

                if (GameManager.company.cash >= cost) {
                    GameManager.company.adjustCash(-cost, "Subsidiary Funding: " + studio.name);
                    studio.currentProject = { name: generateGameName(selTopic, selGenre), topic: selTopic, genre: selGenre, size: selSize, platforms: finalPlats, isSubsidiaryDeal: true, weeksRemaining: (selSize==="Small"?15:(selSize==="Medium"?30:(selSize==="Large"?50:80))) };
                    isShowingDraft = false;
                    studio.draftCooldown = 4;
                    $.modal.close();
                } else { alert("You need $" + UI.getShortNumberString(cost) + " to fund this draft!"); }
            });

            var btnDecline = $('<div class=\"selectorButton deleteButton\" style=\"flex: 1; text-align: center; padding: 12px 0; font-size: 13pt; font-weight: bold; cursor: pointer; border-radius: 6px; box-shadow: 0 3px 0 #943126;\">Decline</div>');
            btnDecline.click(function() { isShowingDraft = false; studio.draftCooldown = 8; $.modal.close(); });

            btnArea.append(btnAccept).append(btnDecline);
            container.append(btnArea);
            
            container.modal({ 
                overlayClose: false, 
                opacity: 80, 
                overlayCss: { backgroundColor: "#000" }, 
                containerCss: { width: "550px", height: "auto", border: "none", background: "transparent" } 
            });

            setTimeout(function() { $('#draft_topic, #draft_genre').change(updateDraftMatch); updateDraftMatch(); }, 100);
        } catch (e) {
            console.error("[Mod] promptDraft fatal error:", e);
            isShowingDraft = false;
        }
    }

    
    function processPublishingProjects() {
        if (!store.data.publishingProjects) store.data.publishingProjects = [];
        for (var i = store.data.publishingProjects.length - 1; i >= 0; i--) {
            var project = store.data.publishingProjects[i];
            var studio = null;
            for (var k = 0; k < store.data.studios.length; k++) {
                if (store.data.studios[k].id === project.studioId) {
                    studio = store.data.studios[k];
                    break;
                }
            }

            if (!studio) { 
                store.data.publishingProjects.splice(i, 1);
                continue;
            }

            
            if (studio.currentProject && studio.currentProject.id !== project.id) {
                continue;
            }

            
            if (!studio.currentProject) {
                studio.currentProject = {
                    id: project.id,
                    name: generateGameName(project.topic, project.genre),
                    topic: project.topic,
                    genre: project.genre,
                    size: project.size,
                    platforms: project.platforms,
                    weeksRemaining: project.weeksRemaining,
                    isPublishedByPlayer: project.isPublishedByPlayer,
                    publishedGameAdvance: project.publishedGameAdvance
                };
            }

            
            ensureStaffObj(studio);
            var speedMultiplier = 1;
            for (var t=1; t<=5; t++) speedMultiplier += (starTiers[t].speed * (studio.staff[t] || 0));
            studio.currentProject.weeksRemaining -= speedMultiplier;
            project.weeksRemaining = studio.currentProject.weeksRemaining;

            if (studio.currentProject.weeksRemaining <= 0) {
                finishAndReleaseGame(studio);
                
                store.data.publishingProjects.splice(i, 1);
                i--; 
                
                var offerIndex = -1;
                for (var m = 0; m < store.data.publishingOffers.length; m++) {
                    if (store.data.publishingOffers[m].id === project.offerId) {
                        offerIndex = m;
                        break;
                    }
                }
                if (offerIndex !== -1) {
                    store.data.publishingOffers.splice(offerIndex, 1);
                }
            }
        }
    }

    function startAIProject(studio) {
        var t = Topics.topics[Math.floor(Math.random() * Topics.topics.length)].name;
        var genres = ["Action", "Adventure", "RPG", "Simulation", "Strategy", "Casual"];
        var g = genres[Math.floor(Math.random() * genres.length)];
        var sizeOptions = [{s:"Small", w:15}, {s:"Medium", w:30}, {s:"Large", w:50}, {s:"AAA", w:80}];
        
        var size = sizeOptions[0];
        if (studio.valuation > 50000000) size = sizeOptions[Math.floor(Math.random() * 4)];
        else if (studio.valuation > 10000000) size = sizeOptions[Math.floor(Math.random() * 2)];

        studio.currentProject = {
            name: generateGameName(t, g),
            topic: t,
            genre: g,
            size: size.s,
            weeksRemaining: size.w,
            isPublishedByPlayer: false,
            isSubsidiaryDeal: (studio.sharesOwned > 0)
        };
    }

    function finishAndReleaseGame(studio) {
        var proj = studio.currentProject;
        studio.currentProject = null;
        studio.draftCooldown = 4; 

        ensureStaffObj(studio);
        var teamQuality = 0;
        for (var t=1; t<=5; t++) teamQuality += (starTiers[t].score * (studio.staff[t] || 0));
        var workerCount = (studio.staff[1] || 0) + (studio.staff[2] || 0) + (studio.staff[3] || 0) + (studio.staff[4] || 0) + (studio.staff[5] || 0);
        var avgQuality = workerCount > 0 ? (teamQuality / workerCount) : 0.5;
        
        var baseScore = 4 + (avgQuality * 2.5);
        if (proj.size === "AAA") baseScore += 1;
        
        var randomFactor = (Math.random() * 4) - 2; 
        var score = Math.floor(baseScore + randomFactor);
        
        if (score > 10) score = 10;
        if (score < 1) score = 1;

        var multiplier = score * score; 
        var units = Math.floor(Math.random() * 50000 * multiplier) + 5000;
        if (proj.size === "AAA") units *= 5;
        if (proj.size === "Large") units *= 3;
        
        var designAvg = 500;
        var techAvg = 500;
        if (proj.size === "Medium") { designAvg = 1500; techAvg = 1500; }
        if (proj.size === "Large") { designAvg = 4000; techAvg = 4000; }
        if (proj.size === "AAA") { designAvg = 10000; techAvg = 10000; }
        
        var price = 10;
        if (proj.size === "Medium") price = 15;
        if (proj.size === "Large") price = 25;
        if (proj.size === "AAA") price = 40;

        if (proj.isDLC) {
            store.data.dlcData[proj.gameId] = {
                activeWeeksLeft: 20,
                weeklyRevenue: proj.weeklyRevenue
            };
            GameManager.company.notifications.push(new Notification({
                header: "Subsidiary DLC Released",
                text: studio.name + " finished developing " + proj.name + "! It is now generating revenue.",
                image: ""
            }));
            return;
        }

        var selectedPlats = [];
        var projPlats = proj.platforms || [proj.platform];
        
        if (projPlats && projPlats.length > 0 && projPlats[0] != null) {
            var allP = Platforms.allPlatforms;
            for (var i = 0; i < allP.length; i++) {
                if (projPlats.indexOf(allP[i].name) !== -1) selectedPlats.push(allP[i]);
            }
        }

        if (selectedPlats.length === 0) {
            var currentWk = GameManager.company.currentWeek;
            var activePlats = Platforms.allPlatforms.filter(function(p) {
                return (p.published && p.published <= currentWk) &&
                       (!p.retireDate || p.retireDate > currentWk);
            });
            if (activePlats.length > 0) {
                activePlats.sort(function() { return 0.5 - Math.random(); });
                selectedPlats.push(activePlats[0]);
                if ((proj.size === "Large" || proj.size === "AAA") && activePlats.length > 1) {
                    selectedPlats.push(activePlats[1]); 
                }
            } else {
                selectedPlats.push(Platforms.allPlatforms[0]); 
            }
        }

        
        var game = {
            modStudioId: studio.id,
            id: "MOD_" + Math.random().toString(36).substr(2, 9),
            title: proj.name + " (" + studio.name + ")",
            topic: Topics.topics.filter(function(t){ return t.name === proj.topic; })[0] || Topics.topics[0],
            genre: GameGenre.getAll().filter(function(g) { return g.name === proj.genre; })[0] || GameGenre.Action,
            secondGenre: null,
            platforms: selectedPlats,
            gameSize: proj.size,
            designPoints: designAvg + Math.floor(Math.random() * 200),
            technologyPoints: techAvg + Math.floor(Math.random() * 200),
            bugs: 0,
            score: score,
            costs: 100000 * (proj.size === "AAA" ? 80 : (proj.size === "Large" ? 20 : (proj.size === "Medium" ? 5 : 1))),
            state: GameState.released,
            releaseWeek: Math.floor(GameManager.company.currentWeek),
            modIsPublishingDeal: !!proj.isPublishedByPlayer,
            modIsSubsidiaryDeal: !!proj.isSubsidiaryDeal,
            modAI: true
        };

        var popMultiplier = 1;
        if (proj.size === "Medium") popMultiplier = 2;
        if (proj.size === "Large") popMultiplier = 5;
        if (proj.size === "AAA") popMultiplier = 10;
        game.modCurrentWeeklySales = Math.floor((score * score) * 40000 * popMultiplier);

        if (!store.data.activeAIGames) store.data.activeAIGames = [];
        store.data.activeAIGames.push(game);

        var historyRecord = {
            week: game.releaseWeek,
            studioName: studio.name,
            gameName: game.title,
            score: score,
            units: units,
            revenue: units * price,
            netProfit: (units * price)
        };

        store.data.releaseHistory.unshift(historyRecord);
        if (store.data.releaseHistory.length > 20) store.data.releaseHistory.pop();

        if (score >= 7) {
            if (!store.data.leaderboardGames) store.data.leaderboardGames = [];
            store.data.leaderboardGames.push(historyRecord);
            store.data.leaderboardGames.sort(function(a, b) {
                if (b.score !== a.score) return b.score - a.score;
                return b.revenue - a.revenue;
            });
            if (store.data.leaderboardGames.length > 10) store.data.leaderboardGames.pop();
        }

        
        var valImpact = 0;
        if (score >= 8) valImpact = studio.valuation * 0.1;
        else if (score === 7) valImpact = studio.valuation * 0.05;
        else if (score === 6) valImpact = studio.valuation * 0.02;
        else if (score <= 5 && score > 3) valImpact = -studio.valuation * 0.05;
        else if (score <= 3) valImpact = -studio.valuation * 0.1;
        
        studio.valuation += valImpact;
        if (studio.valuation < 1000000) studio.valuation = 1000000;

        var platsStr = selectedPlats.map(function(p){ return p.name; }).join(", ");
        var msgText = studio.name + " released " + game.title + " on " + platsStr + " (Score: " + score + "/10).";
        var headerText = "Competitor Release";
        
        if (proj.isPublishedByPlayer) {
            headerText = "Publishing Deal Release";
            if (score < 5) {
                var penalty = Math.floor((proj.publishedGameAdvance || 0) * 0.5);
                GameManager.company.adjustCash(-penalty, "Publishing Flop Penalty: " + game.title);
                msgText = "The publishing contract [" + game.title + "] flopped (Score: " + score + "/10). You were penalized " + UI.getShortNumberString(penalty) + " for the disaster.";
            } else {
                msgText = "The publishing contract [" + game.title + "] released on " + platsStr + " (Score: " + score + "/10)! Generating native weekly sales now.";
            }
        } else if (proj.isSubsidiaryDeal) {
            headerText = "Subsidiary Release";
            msgText = studio.name + " released " + game.title + " on " + platsStr + " (Score: " + score + "/10)! You will receive " + studio.sharesOwned + "% of the weekly native dividends.";
        }
        
        if (proj.isPublishedByPlayer || proj.isSubsidiaryDeal || score >= 9 || studio.sharesOwned > 0) {
            GameManager.company.notifications.push(new Notification({
                header: headerText,
                text: msgText,
                image: ""
            }));
        }
    }

    function processDLCs() {
        if (!store.data.dlcData) store.data.dlcData = {};
        var activeGames = GameManager.company.gameLog || [];
        var dlcKeys = Object.keys(store.data.dlcData);
        for (var i = 0; i < dlcKeys.length; i++) {
            var gameId = dlcKeys[i];
            var dlc = store.data.dlcData[gameId];
            
            if (dlc.pendingPlayerDev > 0) {
                dlc.pendingPlayerDev--;
                if (dlc.pendingPlayerDev <= 0) {
                    dlc.activeWeeksLeft = 20;
                    GameManager.company.notifications.push(new Notification({ header: "DLC Finished", text: "You finished developing the DLC for " + (dlc.gameTitle || "a game") + "! It is now generating revenue.", image: "" }));
                }
            } else if (dlc.activeWeeksLeft > 0) {
                var ogGame = null;
                for (var j=0; j<activeGames.length; j++) { if (activeGames[j].id === gameId) { ogGame = activeGames[j]; break; } }
                
                var revenue = dlc.weeklyRevenue;
                if (revenue < 5000) revenue = 5000;
                GameManager.company.adjustCash(revenue, "DLC Sales: " + (ogGame ? ogGame.title : "Game"));
                
                dlc.activeWeeksLeft--;
            }
        }
    }



    function showModMenu(activeTab) {
        activeTab = activeTab || "market";
        Sound.click();
        
        if ($('#modUI').length > 0) {
            routeModMenu(activeTab);
            return;
        }

        
        var container = $('<div id="modUI" class="windowBorder tallWindow" style="background-color: #ecf0f1; color: #2c3e50; padding: 0;"></div>');
        var header = $('<div id="modUI_header" style="display: flex; gap: 3px; border-bottom: 2px solid #bdc3c7; padding: 6px 8px 0 8px; background-color: #e0e6ed;"></div>');
        container.append(header);
        var contentArea = $('<div id="modUI_content" style="height: 600px; overflow-y: auto; overflow-x: hidden; padding: 14px; background-color: #ecf0f1; box-sizing: border-box;"></div>');
        container.append(contentArea);

        var closeWrapper = $('<div class="centeredButtonWrapper" style="padding: 8px; border-top: 2px solid #bdc3c7; text-align: center;"></div>');
        var closeBtn = $('<div class="okButton selectorButton orangeButton" style="width: 120px; display: inline-block;">Close</div>');
        closeBtn.click(function () { $.modal.close(); });
        closeWrapper.append(closeBtn);
        container.append(closeWrapper);

        container.modal({
            overlayClose: false,
            opacity: 80,
            overlayCss: { backgroundColor: "#000" },
            containerCss: { width: "960px", height: "720px" }
        });

        routeModMenu(activeTab);
    }

    function routeModMenu(activeTab) {
        var header = $('#modUI_header');
        var contentArea = $('#modUI_content');
        if (header.length === 0 || contentArea.length === 0) return;

        header.empty();
        contentArea.empty();

        var tabs = [
            { id: "market", label: "Market" },
            { id: "subsidiaries", label: "Studios" },
            { id: "publishing", label: "Publishing" },
            { id: "schedule", label: "Releases" },
            { id: "leaderboard", label: "Leaderboard" },
            { id: "dlc", label: "DLCs" }
        ];

        tabs.forEach(function(t) {
            var tabStyle = "flex: 1; text-align: center; padding: 8px 0; cursor: pointer; font-size: 11pt; font-weight: bold; border-top-left-radius: 5px; border-top-right-radius: 5px; border: 1px solid #bdc3c7; border-bottom: none; white-space: nowrap;";
            if (t.id === activeTab) {
                tabStyle += " background-color: #ecf0f1; color: #d35400; margin-bottom: -2px; border-bottom: 2px solid #ecf0f1;";
            } else {
                tabStyle += " background-color: #bdc3c7; color: #7f8c8d;";
            }
            var tabDiv = $('<div style="'+tabStyle+'">'+t.label+'</div>');
            tabDiv.click(function() { 
                Sound.click();
                routeModMenu(t.id); 
            });
            header.append(tabDiv);
        });

        if (activeTab === "market") {
            renderMarketTab(contentArea);
        } else if (activeTab === "subsidiaries") {
            renderSubsidiariesTab(contentArea);
        } else if (activeTab === "publishing") {
            renderPublishingTab(contentArea);
        } else if (activeTab === "schedule") {
            renderScheduleTab(contentArea);
        } else if (activeTab === "leaderboard") {
            renderLeaderboardTab(contentArea);
        } else if (activeTab === "dlc") {
            renderDLCTab(contentArea);
        }

        
        contentArea.removeClass('cs-animate-in');
        void contentArea[0].offsetWidth; 
        contentArea.addClass('cs-animate-in');

        
        contentArea.find('.studioCard, .dlcItem, .cs-stagger-item').each(function(i) {
            var el = $(this);
            el.css({ opacity: 0 });
            setTimeout(function() {
                el.addClass('cs-card-enter');
                // Ensure visibility fallback
                setTimeout(function() { el.css({ opacity: 1 }); }, 400);
            }, i * 40);
        });
    }

    function renderMarketTab(container) {
        var studios = store.data.studios.filter(function(s) { return s.sharesOwned < 50 && !s.isFounded; });
        
        var sortPref = store.data.modSortPref || "owned";
        function getE(s) { ensureStaffObj(s); return (s.staff[1]||0)+(s.staff[2]||0)+(s.staff[3]||0)+(s.staff[4]||0)+(s.staff[5]||0); }
        function getQ(s) { ensureStaffObj(s); return ((s.staff[1]||0)*0.2)+((s.staff[2]||0)*0.5)+((s.staff[3]||0)*1.0)+((s.staff[4]||0)*1.5)+((s.staff[5]||0)*2.5); }
        function getG(s) {
            var max = 0;
            if (store.data.releaseHistory) {
                for(var j=0; j<store.data.releaseHistory.length; j++) {
                    var h = store.data.releaseHistory[j];
                    if (h.studioName === s.name && h.score > max) max = h.score;
                }
            }
            return max;
        }

        studios.sort(function(a, b) {
            if (sortPref === "val") return b.valuation - a.valuation;
            if (sortPref === "emps") return getE(b) - getE(a);
            if (sortPref === "quality") return getQ(b) - getQ(a);
            if (sortPref === "games") return getG(b) - getG(a);
            return b.sharesOwned - a.sharesOwned;
        });

        var sortContainer = $('<div style="display: flex; gap: 8px; margin-bottom: 12px; align-items: center;"></div>');
        sortContainer.append('<div style="font-size: 11pt; color: #2c3e50; font-weight: bold;">Sort:</div>');
        var sortSelect = $('<select style="font-size: 11pt; flex: 1; padding: 4px; color: black; border: 1px solid #bdc3c7; border-radius: 4px; box-sizing: border-box;"></select>');
        sortSelect.append('<option value="owned">Ownership (Default)</option>');
        sortSelect.append('<option value="val">Valuation</option>');
        sortSelect.append('<option value="emps">Total Employees</option>');
        sortSelect.append('<option value="quality">Highest Quality Team</option>');
        sortSelect.append('<option value="games">Best Released Game Score</option>');
        sortSelect.val(sortPref);
        sortSelect.change(function() {
            store.data.modSortPref = $(this).val();
            routeModMenu("market");
        });
        sortContainer.append(sortSelect);
        container.append(sortContainer);
        
        for (var i = 0; i < studios.length; i++) {
            (function (studio) {
                var item = buildStudioCard(studio);
                container.append(item);
            })(studios[i]);
        }
    }

    function renderSubsidiariesTab(container) {
        var studios = store.data.studios.filter(function(s) { return s.sharesOwned >= 50 || s.isFounded; });
        
        var sortPref = store.data.modSortPref || "owned";
        function getE(s) { ensureStaffObj(s); return (s.staff[1]||0)+(s.staff[2]||0)+(s.staff[3]||0)+(s.staff[4]||0)+(s.staff[5]||0); }
        function getQ(s) { ensureStaffObj(s); return ((s.staff[1]||0)*0.2)+((s.staff[2]||0)*0.5)+((s.staff[3]||0)*1.0)+((s.staff[4]||0)*1.5)+((s.staff[5]||0)*2.5); }
        function getG(s) {
            var max = 0;
            if (store.data.releaseHistory) {
                for(var j=0; j<store.data.releaseHistory.length; j++) {
                    var h = store.data.releaseHistory[j];
                    if (h.studioName === s.name && h.score > max) max = h.score;
                }
            }
            return max;
        }

        studios.sort(function(a, b) {
            if (sortPref === "val") return b.valuation - a.valuation;
            if (sortPref === "emps") return getE(b) - getE(a);
            if (sortPref === "quality") return getQ(b) - getQ(a);
            if (sortPref === "games") return getG(b) - getG(a);
            return b.sharesOwned - a.sharesOwned;
        });

        var foundBtn = $('<div id="btnFoundStudio" class="selectorButton orangeButton" style="display: block; width: 220px; margin: 0 auto 12px auto; text-align: center; font-size: 11pt;">Found New Studio ($5M)</div>');
        foundBtn.click(foundNewStudio);
        container.append(foundBtn);

        var sortContainer = $('<div style="display: flex; gap: 8px; margin-bottom: 12px; align-items: center;"></div>');
        sortContainer.append('<div style="font-size: 11pt; color: #2c3e50; font-weight: bold;">Sort:</div>');
        var sortSelect = $('<select style="font-size: 11pt; flex: 1; padding: 4px; color: black; border: 1px solid #bdc3c7; border-radius: 4px; box-sizing: border-box;"></select>');
        sortSelect.append('<option value="owned">Ownership (Default)</option>');
        sortSelect.append('<option value="val">Valuation</option>');
        sortSelect.append('<option value="emps">Total Employees</option>');
        sortSelect.append('<option value="quality">Highest Quality Team</option>');
        sortSelect.append('<option value="games">Best Released Game Score</option>');
        sortSelect.val(sortPref);
        sortSelect.change(function() {
            store.data.modSortPref = $(this).val();
            routeModMenu("subsidiaries");
        });
        sortContainer.append(sortSelect);
        container.append(sortContainer);

        if (studios.length === 0) {
            container.append('<div style="font-size: 12pt; text-align: center; margin-top: 30px; color: #7f8c8d;">You do not own any controlling stakes in studios.</div>');
            return;
        }

        for (var i = 0; i < studios.length; i++) {
            (function (studio) {
                var item = buildStudioCard(studio);
                container.append(item);
            })(studios[i]);
        }
    }

    function renderPublishingTab(container) {
        var createBtn = $('<div class="selectorButton orangeButton" style="display: block; width: 220px; margin: 0 auto 12px auto; text-align: center; font-size: 11pt;">Post Publishing Deal</div>');
        createBtn.click(function() {
            renderPublishingForm(container);
        });
        container.append(createBtn);

        var offers = store.data.publishingOffers || [];
        if (offers.length === 0 && (!store.data.publishingProjects || store.data.publishingProjects.length === 0)) {
            container.append('<div style="font-size: 12pt; text-align: center; margin-top: 30px; color: #7f8c8d;">You have no active publishing deals on the market.</div>');
            return;
        }

        container.append('<div style="font-size: 11pt; margin-bottom: 12px; text-align: center; color: #7f8c8d;">Studios evaluate your offers weekly. Once accepted, you receive 30% of gross revenue!</div>');

        
        if (store.data.publishingProjects && store.data.publishingProjects.length > 0) {
            container.append('<h3 style="color: #d35400; text-align: center; margin-top: 16px; font-size: 12pt;">Ongoing Publishing Projects</h3>');
            store.data.publishingProjects.forEach(function(project) {
                var studio = null;
                for (var k = 0; k < store.data.studios.length; k++) {
                    if (store.data.studios[k].id === project.studioId) {
                        studio = store.data.studios[k];
                        break;
                    }
                }
                var studioName = studio ? studio.name : "Unknown Studio";
                var item = $('<div class="cs-stagger-item" style="border: 1px solid #bdc3c7; background-color: #f9f9f9; padding: 10px; margin-bottom: 8px; border-radius: 5px; display: flex; align-items: center; box-shadow: 0 1px 3px rgba(0,0,0,0.08);"></div>');
                var details = $('<div style="flex-grow: 1; min-width: 0;"></div>');
                details.append('<h3 style="margin: 0; font-size: 12pt; color: #2980b9; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Project: ' + project.size + ' ' + project.genre + ' by ' + studioName + '</h3>');
                details.append('<div style="font-size: 10pt; margin: 3px 0;">Topic: ' + project.topic + ' | Weeks Left: <strong style="color: #f39c12;">' + Math.ceil(project.weeksRemaining) + '</strong></div>');
                details.append('<div style="font-size: 10pt;">Status: <strong style="color:#27ae60;">In Development</strong></div>');
                item.append(details);
                container.append(item);
            });
        }

        
        if (offers.length > 0) {
            container.append('<h3 style="color: #d35400; text-align: center; margin-top: 16px; font-size: 12pt;">Current Publishing Offers</h3>');
            for (var i = 0; i < offers.length; i++) {
                (function (offer) {
                    var item = $('<div class="cs-stagger-item" style="border: 1px solid #bdc3c7; background-color: #f9f9f9; padding: 10px; margin-bottom: 8px; border-radius: 5px; display: flex; align-items: center; box-shadow: 0 1px 3px rgba(0,0,0,0.08);"></div>');
                    var details = $('<div style="flex-grow: 1; min-width: 0;"></div>');
                    details.append('<h3 style="margin: 0; font-size: 12pt; color: #d35400; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Contract: ' + offer.size + ' ' + offer.genre + '</h3>');
                    details.append('<div style="font-size: 10pt; margin: 3px 0;">Advance: <strong style="color: #27ae60;">$' + UI.getShortNumberString(offer.advance) + '</strong> | Topic: ' + offer.topic + '</div>');
                    
                    var statusText = offer.status || "Pending Evaluation";
                    var sCol = "#2980b9";
                    if (statusText === "Approved") sCol = "#27ae60";
                    if (statusText === "Rejected") sCol = "#c0392b";
                    details.append('<div style="font-size: 10pt;">Status: <strong style="color:' + sCol + ';">' + statusText + '</strong></div>');
                    
                    item.append(details);

                    var cancelBtn = $('<div class="selectorButton deleteButton" style="font-size: 10pt; padding: 6px 12px;">' + (offer.status === "Approved" ? "Clear" : "Cancel") + '</div>');
                    cancelBtn.click(function () {
                        var oID = offer.id;
                        var idx = -1;
                        for (var x=0; x<store.data.publishingOffers.length; x++) {
                            if (store.data.publishingOffers[x].id === oID) { idx = x; break; }
                        }
                        if (idx !== -1) {
                            if (offer.status === "Approved") {
                                store.data.publishingOffers.splice(idx, 1);
                                routeModMenu("publishing");
                            } else if (confirm("Remove this offer? Advance will be refunded if pending/rejected.")) {
                                GameManager.company.adjustCash(offer.advance, "Refunded Publishing Advance");
                                store.data.publishingOffers.splice(idx, 1);
                                routeModMenu("publishing");
                            }
                        }
                    });
                    item.append(cancelBtn);
                    container.append(item);
                })(offers[i]);
            }
        }
    }

    function renderPublishingForm(container) {
        container.css({ opacity: 0 });
        container.empty();
        container.append('<h2 style="color: #d35400; font-size: 13pt; margin: 0 0 10px 0;">Create Publishing Offer</h2>');

        var formContainer = $('<div style="padding: 10px; font-size: 11pt; line-height: 1.8;"></div>');
        
        formContainer.append('<div>Topic:</div>');
        var topicSearch = $('<input type="text" placeholder="Search topics..." style="font-size: 11pt; width: 100%; margin-bottom: 4px; background: white; border: 1px solid #bdc3c7; color: black; padding: 4px 6px; border-radius: 3px; box-sizing: border-box;">');
        formContainer.append(topicSearch);
        var topicSelect = $('<select id="pub_topic" style="font-size: 11pt; width: 100%; margin-bottom: 10px; color: black; border: 1px solid #bdc3c7; border-radius: 3px; padding: 3px; box-sizing: border-box;"></select>');
        Topics.topics.forEach(function(t) { topicSelect.append('<option value="' + t.name + '">' + t.name + '</option>'); });
        formContainer.append(topicSelect);

        var genreSearch = $('<input type="text" placeholder="Search genre..." style="font-size: 11pt; width: 100%; margin-bottom: 4px; background: white; border: 1px solid #bdc3c7; color: black; padding: 4px 6px; border-radius: 3px; box-sizing: border-box;">');
        formContainer.append('<div>Genre:</div>').append(genreSearch);
        var genreSelect = $('<select id="pub_genre" style="font-size: 11pt; width: 100%; margin-bottom: 4px; color: black; border: 1px solid #bdc3c7; border-radius: 3px; padding: 3px; box-sizing: border-box;"></select>');
        var genres = GameGenre.getAll();
        genres.forEach(function(g) { genreSelect.append('<option value="' + g.name + '">' + g.name + '</option>'); });
        formContainer.append(genreSelect);

        var matchContainer = $('<div style="font-size: 10pt; margin-bottom: 10px; text-align: right;">Match: <span id="pub_match" style="font-weight: bold;"></span></div>');
        formContainer.append(matchContainer);

        function updatePubMatch() {
            var selectedTopicName = $('#pub_topic').val();
            var selectedGenreName = $('#pub_genre').val();
            var t = Topics.topics.filter(function(x){ return x.name === selectedTopicName; })[0];
            var g = GameGenre.getAll().filter(function(x){ return x.name === selectedGenreName; })[0];
            if (t && g) {
                var genreIndexMap = {"Action":0, "Adventure":1, "RPG":2, "Simulation":3, "Strategy":4, "Casual":5};
                var idx = genreIndexMap[g.name];
                if (idx === undefined) idx = 0;
                var weight = t.genreWeightings[idx];
                var ind = $('#pub_match');
                if (weight >= 1.0) { ind.text("Great (+++)").css("color", "#27ae60"); }
                else if (weight >= 0.8) { ind.text("Good (++)").css("color", "#f39c12"); }
                else if (weight >= 0.7) { ind.text("Okay (+)").css("color", "#e67e22"); }
                else { ind.text("Bad (-)").css("color", "#c0392b"); }
            }
        }
        $('#pub_topic, #pub_genre').change(updatePubMatch);
        topicSearch.on('input', function() {
            var term = $(this).val().toLowerCase();
            $('#pub_topic').empty();
            Topics.topics.forEach(function(t) {
                if (t.name.toLowerCase().indexOf(term) !== -1) {
                    $('#pub_topic').append('<option value="' + t.name + '">' + t.name + '</option>');
                }
            });
            updatePubMatch();
        });

        genreSearch.on('input', function() {
            var term = $(this).val().toLowerCase();
            $('#pub_genre').empty();
            GameGenre.getAll().forEach(function(g) {
                if (g.name.toLowerCase().indexOf(term) !== -1) {
                    $('#pub_genre').append('<option value="' + g.name + '">' + g.name + '</option>');
                }
            });
            updatePubMatch();
        });

        updatePubMatch();

        var pSizeSelect = $('<select id="pub_size" style="font-size: 11pt; width: 100%; margin-bottom: 10px; color: black; border: 1px solid #bdc3c7; border-radius: 3px; padding: 3px; box-sizing: border-box;"></select>');
        pSizeSelect.append('<option value="Small" data-cost="500000">Small ($500K Advance)</option>');
        pSizeSelect.append('<option value="Medium" data-cost="2000000">Medium ($2M Advance)</option>');
        pSizeSelect.append('<option value="Large" data-cost="10000000">Large ($10M Advance)</option>');
        pSizeSelect.append('<option value="AAA" data-cost="50000000">AAA ($50M Advance)</option>');
        formContainer.append('<div>Game Size:</div>').append(pSizeSelect);

        var platSearch = $('<input type="text" placeholder="Search platforms..." style="font-size: 11pt; width: 100%; margin-bottom: 4px; background: white; border: 1px solid #bdc3c7; color: black; padding: 4px 6px; border-radius: 3px; box-sizing: border-box;">');
        formContainer.append('<div>Platforms (CTRL+Select):</div>').append(platSearch);
        var platformSelect = $('<select id="pub_platform" multiple style="font-size: 11pt; width: 100%; margin-bottom: 10px; color: black; height: 80px; border: 1px solid #bdc3c7; border-radius: 3px; box-sizing: border-box;"></select>');
        var myPlats = [];
        if (GameManager.company.availablePlatforms) myPlats = myPlats.concat(GameManager.company.availablePlatforms);
        if (GameManager.company.licencedPlatforms) myPlats = myPlats.concat(GameManager.company.licencedPlatforms);
        if (myPlats.length === 0) myPlats = Platforms.allPlatforms.slice(0, 3);
        myPlats.forEach(function(p) { platformSelect.append('<option value="' + p.name + '">' + p.name + '</option>'); });
        formContainer.append(platformSelect);

        platSearch.on('input', function() {
            var term = $(this).val().toLowerCase();
            $('#pub_platform').empty();
            myPlats.forEach(function(p) {
                if (p.name.toLowerCase().indexOf(term) !== -1) {
                    $('#pub_platform').append('<option value="' + p.name + '">' + p.name + '</option>');
                }
            });
        });

        container.append(formContainer);

        var actionContainer = $('<div class="centeredButtonWrapper" style="margin-top: 10px;"></div>');
        var confirmBtn = $('<div class="selectorButton orangeButton" style="display: inline-block; width: 160px; font-size: 11pt;">Post Offer</div>');
        confirmBtn.click(function () {
            var selectedSize = $('#pub_size').val();
            var advance = parseInt($('#pub_size option:selected').attr('data-cost'));
            var selectedPlats = $('#pub_platform').val() || [myPlats[0].name];

            if (GameManager.company.cash >= advance) {
                GameManager.company.adjustCash(-advance, "Posted Publishing Deal");
                
                store.data.publishingOffers.push({
                    id: GameManager.getGUID(), 
                    topic: $('#pub_topic').val(),
                    genre: $('#pub_genre').val(),
                    size: selectedSize,
                    platforms: selectedPlats,
                    advance: advance,
                    status: "Pending Evaluation"
                });

                routeModMenu("publishing");
            } else {
                alert("You need at least $" + UI.getShortNumberString(advance) + " to fund this advance!");
            }
        });
        
        var cancelBtn = $('<div class="selectorButton deleteButton" style="display: inline-block; width: 160px; font-size: 11pt;">Cancel</div>');
        cancelBtn.click(function() { routeModMenu("publishing"); });

        actionContainer.append(confirmBtn).append(cancelBtn);
        container.append(actionContainer);

        
        container.animate({ opacity: 1 }, 250);
    }

    function renderScheduleTab(container) {
        var hist = store.data.releaseHistory || [];
        if (hist.length === 0) {
            container.append('<div style="font-size: 12pt; text-align: center; margin-top: 30px; color: #7f8c8d;">No games have been released by competitors recently.</div>');
            return;
        }

        hist.forEach(function(r) {
            var item = $('<div class="cs-stagger-item" style="border: 1px solid #bdc3c7; background-color: #f9f9f9; padding: 10px; margin-bottom: 8px; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.08);"></div>');
            var header = $('<h3 style="margin: 0; font-size: 12pt; color: #d35400; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + r.gameName + ' <span style="font-size:10pt;color:#7f8c8d;">by ' + r.studioName + '</span></h3>');
            item.append(header);

            var wText = "Week " + r.week;
            item.append('<div style="font-size: 10pt; margin-top: 3px;">Released: ' + wText + ' | Score: <strong style="color:#27ae60;">' + r.score + '/10</strong></div>');
            item.append('<div style="font-size: 10pt; margin-top: 2px;">Sales: <strong style="color: #2980b9;">' + UI.getShortNumberString(r.units) + '</strong> | Gross: $' + UI.getShortNumberString(r.revenue) + ' | Net: $' + UI.getShortNumberString(r.netProfit) + '</div>');

            container.append(item);
        });
    }

    function renderDLCTab(container) {
        var allGames = GameManager.company.gameLog || [];
        var games = allGames; 
        var sortedGames = games.slice().sort(function(a,b) { return b.releaseWeek - a.releaseWeek; });

        if (sortedGames.length === 0) {
            container.append('<div style="font-size: 12pt; text-align: center; margin-top: 30px; color: #7f8c8d;">You have not released any games yet.</div>');
        } else {
            var searchBar = $('<input type="text" placeholder="Search released games..." style="font-size: 11pt; width: 100%; margin-bottom: 12px; background: white; border: 1px solid #bdc3c7; color: black; padding: 6px 8px; border-radius: 4px; box-sizing: border-box;">');
            container.append(searchBar);
            
            var listContainer = $('<div id="dlc_list_container"></div>');
            container.append(listContainer);

            function renderDLCList(term) {
                listContainer.empty();
                for (var i = 0; i < sortedGames.length; i++) {
                    (function (game) {
                        if (term && game.title.toLowerCase().indexOf(term) === -1) return;

                        var baseCosts = game.costs || 100000;
                        var dlcCost = Math.floor(baseCosts * 0.5);
                        if (dlcCost < 50000) dlcCost = 50000;

                        var item = $('<div class="dlcItem" style="border: 1px solid #bdc3c7; background-color: #f9f9f9; padding: 10px; margin-bottom: 8px; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.08);"></div>');
                        item.append('<h3 style="margin: 0 0 3px 0; font-size: 12pt; color: #8e44ad; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + game.title + '</h3>');
                        item.append('<div style="font-size: 10pt; color: #7f8c8d;">Original Cost: $' + UI.getShortNumberString(game.costs || 100000) + '</div>');

                        var dlc = store.data.dlcData[game.id];
                        var subDev = false;
                        for(var s=0; s<store.data.studios.length; s++){
                            if(store.data.studios[s].currentProject && store.data.studios[s].currentProject.isDLC && store.data.studios[s].currentProject.gameId === game.id) {
                                subDev = store.data.studios[s];
                            }
                        }

                        if (dlc) {
                            if (dlc.pendingPlayerDev > 0) {
                                item.append('<div style="font-size: 10pt; margin-top: 3px; color: #f39c12; font-weight: bold;">Developing Personally (' + Math.ceil(dlc.pendingPlayerDev) + 'w left)</div>');
                            } else if (dlc.activeWeeksLeft > 0) {
                                item.append('<div style="font-size: 10pt; margin-top: 3px; color: #27ae60; font-weight: bold;">DLC Revenue: +$' + UI.getShortNumberString(dlc.weeklyRevenue) + '/wk (' + dlc.activeWeeksLeft + 'w left)</div>');
                            } else {
                                item.append('<div style="font-size: 10pt; margin-top: 3px; color: #7f8c8d; font-style: italic;">DLC Completed (' + UI.getShortNumberString(dlc.weeklyRevenue * 20) + ' earned)</div>');
                            }
                        } else if (subDev) {
                            item.append('<div style="font-size: 10pt; margin-top: 3px; color: #2980b9; font-weight: bold;">In Dev by ' + subDev.name + ' (' + Math.ceil(subDev.currentProject.weeksRemaining) + 'w left)</div>');
                        } else {
                            var dlcControls = $('<div class="dlccontrols" style="margin-top: 6px; display: flex; gap: 6px;"></div>');
                            var btn = $('<div class="selectorButton orangeButton" style="flex: 1; font-size: 10pt;">Develop ($100K)</div>');
                            btn.click(function () {
                                if (GameManager.company.cash >= 100000) {
                                    Sound.click();
                                    GameManager.company.adjustCash(-100000, "DLC Development: " + game.title);
                                    var devWeeks = 10;
                                    var sz = game.gameSize;
                                    if (sz === "Medium") devWeeks = 15;
                                    else if (sz === "Large") devWeeks = 25;
                                    else if (sz === "AAA") devWeeks = 40;
                                    store.data.dlcData[game.id] = {
                                        pendingPlayerDev: devWeeks,
                                        gameTitle: game.title,
                                        weeklyRevenue: Math.floor(((game.totalSalesCash || 1500000)) * 0.05)
                                    };
                                    $.modal.close();
                                } else {
                                    alert("Not enough funds!");
                                }
                            });
                            dlcControls.append(btn);

                            for(var s=0; s<store.data.studios.length; s++){
                                if(store.data.studios[s].sharesOwned >= 50 && !store.data.studios[s].currentProject) {
                                    var subBtn = $('<div class="selectorButton whiteBoardButton" style="flex: 1; font-size: 10pt; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Assign: ' + store.data.studios[s].name + '</div>');
                                    (function(studio) {
                                        subBtn.click(function() {
                                            var devWeeks = 10;
                                            var sz = game.gameSize;
                                            if (sz === "Medium") devWeeks = 15;
                                            else if (sz === "Large") devWeeks = 25;
                                            else if (sz === "AAA") devWeeks = 40;

                                            studio.currentProject = {
                                                name: game.title + " DLC",
                                                isDLC: true,
                                                gameId: game.id,
                                                weeklyRevenue: Math.floor(((game.totalSalesCash || 1500000)) * 0.05),
                                                weeksRemaining: devWeeks
                                            };
                                            routeModMenu("dlc");
                                        });
                                    })(store.data.studios[s]);
                                    dlcControls.append(subBtn);
                                }
                            }
                            item.append(dlcControls);
                        }
                        listContainer.append(item);
                    })(sortedGames[i]);
                }
            }

            searchBar.on('input', function() {
                var term = $(this).val().toLowerCase();
                renderDLCList(term);
            });
            
            renderDLCList("");
        }
    }

    function buildStudioCard(studio) {
        ensureStaffObj(studio);
        var totalEmps = studio.staff[1] + studio.staff[2] + studio.staff[3] + studio.staff[4] + studio.staff[5];
        var totalMaint = 0;
        for (var t=1; t<=5; t++) totalMaint += (starTiers[t].maint * studio.staff[t]);

        var item = $('<div class="studioCard" style="border: 1px solid #d1d9e6; background: linear-gradient(135deg, #ffffff 0%, #f4f7fa 100%); padding: 12px; margin-bottom: 10px; border-radius: 8px; display: flex; align-items: flex-start; box-shadow: 0 2px 6px rgba(0,0,0,0.05); transition: all 0.2s ease;"></div>');
        
        var pieContainer = $('<div style="width: 60px; min-width: 60px; text-align: center; margin-right: 12px;"></div>');
        var canvasId = 'pie_' + studio.id;
        pieContainer.append('<canvas id="'+canvasId+'" width="50" height="50" data-shares="'+studio.sharesOwned+'" data-name="'+studio.name+'" class="pieChartCanvas"></canvas>');
        pieContainer.append('<div style="font-size: 10pt; margin-top: 5px; color: #34495e; font-weight: bold;">'+studio.sharesOwned+'%</div>');
        item.append(pieContainer);

        var detailsContainer = $('<div class="detailsContainer" style="flex-grow: 1; min-width: 0;"></div>');
        var headerRow = $('<div style="display: flex; justify-content: space-between; align-items: baseline; gap: 10px;"></div>');
        headerRow.append('<h3 style="margin: 0; font-size: 14pt; color: #2c3e50; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; flex: 1; font-weight: bold;">' + studio.name + '</h3>');
        headerRow.append('<div style="font-size: 10pt; color: #7f8c8d; white-space: nowrap; font-weight: 500;">Staff: ' + totalEmps + ' (@' + UI.getShortNumberString(totalMaint) + '/wk)</div>');
        detailsContainer.append(headerRow);
        
        var breakdownStr = '<span style="font-size: 9pt; color: #7f8c8d;">[' + studio.staff[1] + '✩1 | ' + studio.staff[2] + '✩2 | ' + studio.staff[3] + '✩3 | ' + studio.staff[4] + '✩4 | ' + studio.staff[5] + '✩5]</span>';
        detailsContainer.append('<div style="font-size: 11pt; margin: 3px 0;">Val: <strong style="color: #27ae60;">$' + UI.getShortNumberString(studio.valuation) + '</strong> ' + breakdownStr + '</div>');
        
        if (studio.currentProject) {
            var plabel = studio.currentProject.isPublishedByPlayer ? "<span style='color:#e67e22'>[Pub]</span> " : "";
            detailsContainer.append('<div style="font-size: 10pt; margin: 3px 0; color: #7f8c8d; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Dev: ' + plabel + studio.currentProject.name + ' (' + Math.ceil(studio.currentProject.weeksRemaining) + 'w left)</div>');
            
            if (studio.sharesOwned >= 50) {
                var cancelBtn = $('<div class="selectorButton deleteButton" style="display: inline-block; margin-top: 3px; font-size: 10pt; padding: 3px 8px;">Cancel Project</div>');
                cancelBtn.click(function () {
                    if (confirm("Are you sure you want to cancel " + studio.currentProject.name + "? All progress and investments will be permanently lost!")) {
                        if (studio.currentProject.isPublishedByPlayer && store.data.publishingProjects) {
                            for(var p=0; p<store.data.publishingProjects.length; p++) {
                                if (store.data.publishingProjects[p].id === studio.currentProject.id) {
                                    store.data.publishingProjects.splice(p, 1);
                                    break;
                                }
                            }
                        }
                        studio.currentProject = null;
                        GameManager.company.notifications.push(new Notification({ header: "Project Cancelled", text: studio.name + " has ceased development.", image: "" }));
                        routeModMenu("subsidiaries");
                    }
                });
                detailsContainer.append(cancelBtn);
            }
        } else {
            detailsContainer.append('<div style="font-size: 10pt; margin: 3px 0; color: #95a5a6;">Currently idle.</div>');
        }

        var btnContainer = $('<div style="margin-top: 8px; display: flex; flex-direction: column; gap: 5px;"></div>');
        var topBtns = $('<div style="display: flex; gap: 6px; align-items: center;"></div>');
        var middleBtns = null;
        var bottomBtns = $('<div style="display: flex; gap: 6px;"></div>');

        var tenPercentValue = Math.floor(studio.valuation * 0.1);
        var getRoute = function(s) { return (s >= 50) ? "subsidiaries" : "market"; };

        if (studio.sharesOwned > 0 && !studio.isFounded) {
            var sellBtn = $('<button class="selectorButton deleteButton" style="flex: 1; font-size: 10pt; padding: 4px 6px;">Sell 10%</button>');
            sellBtn.click(function () {
                GameManager.company.adjustCash(tenPercentValue, "Sold 10% of " + studio.name);
                studio.sharesOwned = Math.max(0, studio.sharesOwned - 10);
                if (studio.sharesOwned <= 0 && GameManager.company.gameLog) {
                    GameManager.company.gameLog.forEach(function(g) {
                        if (g.modStudioId === studio.id) delete g.modLastDividendCash;
                    });
                }
                routeModMenu(getRoute(studio.sharesOwned));
            });
            topBtns.append(sellBtn);
            topBtns.append($('<div style="flex: 1; text-align: center; color: #7f8c8d; font-size: 10pt;">Val: $' + UI.getShortNumberString(tenPercentValue) + '</div>'));
        }

        if (studio.sharesOwned < 100) {
            var buyBtn = $('<button class="selectorButton greenButton" style="flex: 1; font-size: 10pt; padding: 4px 6px;">Buy 10%</button>');
            buyBtn.click(function () {
                if (GameManager.company.cash >= tenPercentValue) {
                    GameManager.company.adjustCash(-tenPercentValue, "Bought 10% of " + studio.name);
                    studio.sharesOwned = Math.min(100, studio.sharesOwned + 10);
                    routeModMenu(getRoute(studio.sharesOwned));
                } else { alert("Not enough cash!"); }
            });
            topBtns.append(buyBtn);
        }

        if (studio.sharesOwned >= 50) {
            middleBtns = $('<div style="display: flex; gap: 6px; align-items: center;"></div>');
            var staffSelect = $('<select id="staff_tier_' + studio.id + '" style="font-size: 10pt; padding: 3px; color: black; flex: 2; border-radius: 3px; border: 1px solid #bdc3c7; box-sizing: border-box;"></select>');
            staffSelect.append('<option value="1">1✩ (H:$50K)</option><option value="2" selected>2✩ (H:$100K)</option><option value="3">3✩ (H:$250K)</option><option value="4">4✩ (H:$1M)</option><option value="5">5✩ (H:$5M)</option>');
            
            var hireBtn = $('<div class="selectorButton orangeButton" style="flex: 1; font-size: 10pt; padding: 4px; text-align: center;">Hire</div>');
            hireBtn.click(function() {
                var t = parseInt($('#staff_tier_' + studio.id).val());
                if (GameManager.company.cash >= starTiers[t].hire) {
                    GameManager.company.adjustCash(-starTiers[t].hire, "Hired " + starTiers[t].label + " Staff: " + studio.name);
                    studio.staff[t]++; routeModMenu("subsidiaries");
                } else { alert("Not enough cash!"); }
            });

            var fireBtn = $('<div class="selectorButton whiteBoardButton" style="flex: 1; font-size: 10pt; padding: 4px; text-align: center;">Fire</div>');
            fireBtn.click(function() {
                var t = parseInt($('#staff_tier_' + studio.id).val());
                if (studio.staff[t] > 0) {
                    if (studio.staff[1]+studio.staff[2]+studio.staff[3]+studio.staff[4]+studio.staff[5] <= 1) { alert("A studio must have at least 1 employee!"); return; }
                    if (GameManager.company.cash >= starTiers[t].fire) {
                        GameManager.company.adjustCash(-starTiers[t].fire, "Severance for " + starTiers[t].label + ": " + studio.name);
                        studio.staff[t]--; routeModMenu("subsidiaries");
                    } else { alert("Not enough cash for severance!"); }
                } else { alert("No " + starTiers[t].label + " staff to fire!"); }
            });
            middleBtns.append(staffSelect).append(hireBtn).append(fireBtn);

            var instructBtn = $('<button class="selectorButton orangeButton" style="flex: 1; font-size: 10pt; padding: 4px 6px;">Instruct</button>');
            instructBtn.click(function () {
                if (studio.currentProject) { alert(studio.name + " is busy!"); return; }
                instructStudio(studio);
            });
            bottomBtns.append(instructBtn);

            if (GameManager.company.currentGame && !studio.currentProject) {
                var coDevBtn = $('<button class="selectorButton whiteBoardButton" style="flex: 1; font-size: 10pt; padding: 4px 6px;">Co-Dev (Free)</button>');
                coDevBtn.click(function() {
                    var playerGame = GameManager.company.currentGame;
                    if (playerGame) { 
                        
                        var dPts = Math.floor(studio.valuation / 1000000) + 1;
                        var tPts = Math.floor(studio.valuation / 1000000) + 1;
                        playerGame.designPoints += dPts;
                        playerGame.technologyPoints += tPts;
                        
                        
                        
                        
                        studio.currentProject = { name: "Co-Dev Support", isCoDev: true, isPublishedByPlayer: false };
                        routeModMenu("subsidiaries");
                    } else { alert("You need an active game in development to co-develop!"); }
                });
                bottomBtns.append(coDevBtn);
            }

            if (studio.sharesOwned === 100 && !studio.isFounded) {
                var absorbBtn = $('<button class="selectorButton deleteButton" style="flex: 1; font-size: 10pt; padding: 4px 6px;">Absorb</button>');
                absorbBtn.click(function() {
                    if(confirm("Absorb " + studio.name + "? You will gain their fans and tech, but the studio will close permanently.")) {
                        var fansGained = Math.floor(studio.valuation / 500);
                        var rpGained = Math.floor(studio.valuation / 100000);
                        GameManager.company.fans += fansGained; GameManager.company.researchPoints += rpGained;
                        
                        
                        if (store.data.modGameIds) {
                            var keys = Object.keys(store.data.modGameIds);
                            for (var i = 0; i < keys.length; i++) {
                                if (store.data.modGameIds[keys[i]].studioId === studio.id) {
                                    delete store.data.modGameIds[keys[i]];
                                }
                            }
                        }

                        store.data.studios = store.data.studios.filter(function(s) { return s.id !== studio.id; });
                        GameManager.company.notifications.push(new Notification({ header: "Takeover!", text: "Absorbed " + studio.name + "!" }));
                        routeModMenu("subsidiaries");
                    }
                });
                bottomBtns.append(absorbBtn);
            }
        }

        if (topBtns.children().length > 0) btnContainer.append(topBtns);
        if (middleBtns) btnContainer.append(middleBtns);
        if (bottomBtns.children().length > 0) btnContainer.append(bottomBtns);

        if (btnContainer.children().length > 0) {
            detailsContainer.append(btnContainer);
        }

        item.append(detailsContainer);

        setTimeout(function() {
            var canvas = document.getElementById(canvasId);
            if(canvas) {
                var shares = parseInt(canvas.getAttribute('data-shares'));
                var sName = canvas.getAttribute('data-name') || "Co";
                var ctx = canvas.getContext('2d');
                var cx = 25, cy = 25, r = 25;
                ctx.fillStyle = "#bdc3c7";
                ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();

                if (shares > 0) {
                    ctx.fillStyle = "#d35400"; 
                    ctx.beginPath(); ctx.moveTo(cx, cy);
                    var endAngle = (-Math.PI / 2) + Math.PI * 2 * (shares / 100);
                    ctx.arc(cx, cy, r, -Math.PI / 2, endAngle);
                    ctx.fill();
                }

                ctx.fillStyle = "#34495e";
                ctx.beginPath(); ctx.arc(cx, cy, 15, 0, Math.PI * 2); ctx.fill();

                var words = sName.split(' ');
                var initials = "";
                if (words.length >= 2) initials = words[0][0] + words[1][0];
                else initials = words[0].substring(0, 2);
                
                ctx.fillStyle = "white";
                ctx.font = "bold 12px sans-serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(initials.toUpperCase(), cx, cy);
            }
        }, 50);

        return item;
    }

    function instructStudio(studio) {
        var contentArea = $('#modUI_content');
        if (contentArea.length === 0) return;
        contentArea.css({ opacity: 0 });
        contentArea.empty();
        
        contentArea.append('<h2 style="color: #d35400; font-size: 13pt; margin: 0 0 10px 0;">Instruct ' + studio.name + '</h2>');

        var formContainer = $('<div style="padding: 10px; font-size: 11pt; line-height: 1.8;"></div>');
        formContainer.append('<div>Funding: <strong style="color: #f39c12;">$1,000,000</strong></div>');
        
        formContainer.append('<div>Topic:</div>');
        var topicSearch = $('<input type="text" placeholder="Search topics..." style="font-size: 11pt; width: 100%; margin-bottom: 4px; background: white; border: 1px solid #bdc3c7; color: black; padding: 4px 6px; border-radius: 3px; box-sizing: border-box;">');
        formContainer.append(topicSearch);
        var topicSelect = $('<select id="inst_topic" style="font-size: 11pt; width: 100%; margin-bottom: 10px; color: black; border: 1px solid #bdc3c7; border-radius: 3px; padding: 3px; box-sizing: border-box;"></select>');
        Topics.topics.forEach(function(t) { topicSelect.append('<option value="' + t.name + '">' + t.name + '</option>'); });
        formContainer.append(topicSelect);

        var genreSearch = $('<input type="text" placeholder="Search genre..." style="font-size: 11pt; width: 100%; margin-bottom: 4px; background: white; border: 1px solid #bdc3c7; color: black; padding: 4px 6px; border-radius: 3px; box-sizing: border-box;">');
        formContainer.append('<div>Genre:</div>').append(genreSearch);
        var genreSelect = $('<select id="inst_genre" style="font-size: 11pt; width: 100%; margin-bottom: 4px; color: black; border: 1px solid #bdc3c7; border-radius: 3px; padding: 3px; box-sizing: border-box;"></select>');
        var genres = GameGenre.getAll();
        genres.forEach(function(g) { genreSelect.append('<option value="' + g.name + '">' + g.name + '</option>'); });
        formContainer.append(genreSelect);

        var matchContainer = $('<div style="font-size: 10pt; margin-bottom: 10px; text-align: right;">Match: <span id="inst_match" style="font-weight: bold;"></span></div>');
        formContainer.append(matchContainer);

        function updateInstMatch() {
            var selectedTopicName = $('#inst_topic').val();
            var selectedGenreName = $('#inst_genre').val();
            var t = Topics.topics.filter(function(x){ return x.name === selectedTopicName; })[0];
            var g = GameGenre.getAll().filter(function(x){ return x.name === selectedGenreName; })[0];
            if (t && g) {
                var genreIndexMap = {"Action":0, "Adventure":1, "RPG":2, "Simulation":3, "Strategy":4, "Casual":5};
                var idx = genreIndexMap[g.name];
                if (idx === undefined) idx = 0;
                var weight = t.genreWeightings[idx];
                var ind = $('#inst_match');
                if (weight >= 1.0) { ind.text("Great (+++)").css("color", "#27ae60"); }
                else if (weight >= 0.8) { ind.text("Good (++)").css("color", "#f39c12"); }
                else if (weight >= 0.7) { ind.text("Okay (+)").css("color", "#e67e22"); }
                else { ind.text("Bad (-)").css("color", "#c0392b"); }
            }
        }
        $('#inst_topic, #inst_genre').change(updateInstMatch);
        topicSearch.on('input', function() {
            var term = $(this).val().toLowerCase();
            $('#inst_topic').empty();
            Topics.topics.forEach(function(t) {
                if (t.name.toLowerCase().indexOf(term) !== -1) {
                    $('#inst_topic').append('<option value="' + t.name + '">' + t.name + '</option>');
                }
            });
            updateInstMatch();
        });

        genreSearch.on('input', function() {
            var term = $(this).val().toLowerCase();
            $('#inst_genre').empty();
            GameGenre.getAll().forEach(function(g) {
                if (g.name.toLowerCase().indexOf(term) !== -1) {
                    $('#inst_genre').append('<option value="' + g.name + '">' + g.name + '</option>');
                }
            });
            updateInstMatch();
        });

        updateInstMatch();

        var pSizeSelect = $('<select id="inst_size" style="font-size: 11pt; width: 100%; margin-bottom: 10px; color: black; border: 1px solid #bdc3c7; border-radius: 3px; padding: 3px; box-sizing: border-box;"></select>');
        pSizeSelect.append('<option value="Small">Small</option>');
        pSizeSelect.append('<option value="Medium">Medium</option>');
        pSizeSelect.append('<option value="Large">Large</option>');
        pSizeSelect.append('<option value="AAA">AAA</option>');
        formContainer.append('<div>Game Size:</div>').append(pSizeSelect);

        var platSearch = $('<input type="text" placeholder="Search platforms..." style="font-size: 11pt; width: 100%; margin-bottom: 4px; background: white; border: 1px solid #bdc3c7; color: black; padding: 4px 6px; border-radius: 3px; box-sizing: border-box;">');
        formContainer.append('<div>Platforms (CTRL+Select):</div>').append(platSearch);
        var platformSelect = $('<select id="inst_platform" multiple style="font-size: 11pt; width: 100%; margin-bottom: 10px; color: black; height: 80px; border: 1px solid #bdc3c7; border-radius: 3px; box-sizing: border-box;"></select>');
        var myPlats = [];
        if (GameManager.company.availablePlatforms) myPlats = myPlats.concat(GameManager.company.availablePlatforms);
        if (GameManager.company.licencedPlatforms) myPlats = myPlats.concat(GameManager.company.licencedPlatforms);
        if (myPlats.length === 0) myPlats = Platforms.allPlatforms.slice(0, 3);
        myPlats.forEach(function(p) { platformSelect.append('<option value="' + p.name + '">' + p.name + '</option>'); });
        formContainer.append(platformSelect);

        platSearch.on('input', function() {
            var term = $(this).val().toLowerCase();
            $('#inst_platform').empty();
            myPlats.forEach(function(p) {
                if (p.name.toLowerCase().indexOf(term) !== -1) {
                    $('#inst_platform').append('<option value="' + p.name + '">' + p.name + '</option>');
                }
            });
        });

        contentArea.append(formContainer);

        var actionContainer = $('<div class="centeredButtonWrapper" style="margin-top: 10px;"></div>');
        var confirmBtn = $('<div class="selectorButton orangeButton" style="display: inline-block; width: 160px; font-size: 11pt;">Begin Development</div>');
        confirmBtn.click(function () {
            if (GameManager.company.cash >= 1000000) {
                var selectedTopic = $('#inst_topic').val();
                var selectedGenre = $('#inst_genre').val();
                var selectedSize = $('#inst_size').val();
                var selectedPlats = $('#inst_platform').val() || [myPlats[0].name];

                GameManager.company.adjustCash(-1000000, "Subsidiary Funding: " + studio.name);
                
                studio.currentProject = {
                    name: generateGameName(selectedTopic, selectedGenre),
                    topic: selectedTopic,
                    genre: selectedGenre,
                    size: selectedSize,
                    platforms: selectedPlats,
                    isSubsidiaryDeal: true,
                    weeksRemaining: (selectedSize==="Small"?15:(selectedSize==="Medium"?30:(selectedSize==="Large"?50:80)))
                };

                var msg = studio.name + " has begun production on a " + selectedSize + " " + selectedTopic + " " + selectedGenre + " game for " + selectedPlats.join(", ") + ".";
                GameManager.company.notifications.push(new Notification({
                    header: "Subsidiary Tasked",
                    text: msg,
                    image: ""
                }));
                routeModMenu("subsidiaries");
            } else {
                alert("You need at least $1M to fund a subsidiary project!");
            }
        });
        
        var cancelBtn = $('<div class="selectorButton deleteButton" style="display: inline-block; width: 160px; font-size: 11pt;">Cancel</div>');
        cancelBtn.click(function() { routeModMenu("subsidiaries"); });

        actionContainer.append(confirmBtn).append(cancelBtn);
        contentArea.append(actionContainer);

        
        contentArea.animate({ opacity: 1 }, 250);
    }

    function foundNewStudio() {
        var cost = 5000000;
        if (GameManager.company.cash >= cost) {
            $.modal.close();
            var container = $('<div class="windowBorder tallWindow" style="background-color: #ecf0f1; padding: 14px; text-align: center;"></div>');
            container.append('<h2 style="color: #d35400; font-size: 13pt; margin: 0 0 10px 0;">Found New Studio</h2>');
            container.append('<div style="margin: 10px 0; font-size: 11pt; color: #34495e;">Enter a name for your new subsidiary:</div>');
            var input = $('<input type="text" style="font-size: 12pt; padding: 4px 6px; width: 80%; margin-bottom: 12px; color: black; border: 1px solid #bdc3c7; border-radius: 3px; box-sizing: border-box;">');
            container.append(input);
            
            var btnArea = $('<div style="display: flex; gap: 8px; justify-content: center;"></div>');
            var confirmBtn = $('<div class="selectorButton greenButton" style="width: 130px; font-size: 11pt;">Found ($5M)</div>');
            confirmBtn.click(function() {
                var name = input.val().trim();
                if (name) {
                    GameManager.company.adjustCash(-cost, "Founded Subsidiary: " + name);
                    store.data.studios.push({
                        id: "FS_" + Date.now(),
                        name: name,
                        valuation: cost,
                        sharesOwned: 100,
                        isFounded: true,
                        currentProject: null
                    });
                    $.modal.close();
                    setTimeout(function() {
                        if ($('#modUI').length === 0) showModMenu("subsidiaries");
                        else routeModMenu("subsidiaries");
                    }, 300);
                }
            });
            var cancelBtn = $('<div class="selectorButton deleteButton" style="width: 130px; font-size: 11pt;">Cancel</div>');
            cancelBtn.click(function() {
                $.modal.close();
                setTimeout(function() {
                    if ($('#modUI').length === 0) showModMenu("subsidiaries");
                    else routeModMenu("subsidiaries");
                }, 300);
            });
            btnArea.append(confirmBtn).append(cancelBtn);
            container.append(btnArea);

            container.modal({
                overlayClose: false,
                opacity: 80,
                overlayCss: { backgroundColor: "#000" },
                containerCss: { width: "420px", height: "auto" }
            });
            setTimeout(function() { input.focus(); }, 100);
        } else {
            alert("You need at least $5M to found a new studio!");
        }
    }

    function renderLeaderboardTab(container) {
        var hist = store.data.leaderboardGames || [];
        var studios = store.data.studios || [];
        
        container.append('<h3 style="color: #2c3e50; text-align: center; margin-top: 6px; font-size: 12pt;">Highest Valued Studios</h3>');
        
        var bestStudios = studios.slice().sort(function(a, b) {
            return b.valuation - a.valuation;
        }).slice(0, 5);
        
        bestStudios.forEach(function(s, idx) {
            var sItem = $('<div class="cs-stagger-item" style="border: 1px solid #bdc3c7; background-color: #f9f9f9; padding: 6px 10px; margin-bottom: 4px; border-radius: 4px; font-size: 11pt; box-shadow: 0 1px 2px rgba(0,0,0,0.06);"></div>');
            sItem.append('<strong>#' + (idx+1) + ': ' + s.name + '</strong> (Val: <span style="color:#d35400">$' + UI.getShortNumberString(s.valuation) + '</span>)');
            container.append(sItem);
        });

        container.append('<h3 style="color: #2c3e50; text-align: center; margin-top: 16px; font-size: 12pt;">AI Hall Of Fame</h3>');
        
        if (hist.length === 0) {
            container.append('<div style="text-align: center; font-size: 11pt; margin-top: 8px; color: #7f8c8d;">No masterclass games released yet.</div>');
        }

        hist.forEach(function(g, idx) {
            var gItem = $('<div class="cs-stagger-item" style="border: 1px solid #bdc3c7; background-color: #f9f9f9; padding: 6px 10px; margin-bottom: 4px; border-radius: 4px; font-size: 11pt; box-shadow: 0 1px 2px rgba(0,0,0,0.06);"></div>');
            gItem.append('<strong>#' + (idx+1) + ': ' + g.gameName + '</strong> by ' + g.studioName + ' (Score: <span style="color:#27ae60">' + g.score + '/10</span>, Gross: <span style="color:#2980b9">$' + UI.getShortNumberString(g.revenue) + '</span>)');
            container.append(gItem);
        });
    }

    
    var originalShowItemSelector = UI._showItemSelector;
    UI._showItemSelector = function (options) {
        originalShowItemSelector.apply(this, arguments);

        
        var isSequel = options.title && (options.title.indexOf("Sequel") !== -1 || options.title.indexOf("Game") !== -1);
        if (isSequel) {
            var modal = $('#screen-item-selector');
            if (modal.length > 0) {
                var searchBar = $('<input type="text" placeholder="Search games..." style="width: 80%; display: block; margin: 10px auto; padding: 10px; font-size: 14pt; border-radius: 5px; border: 1px solid #ccc; color: black; background: white;">');
                
                
                var header = modal.find('.window-header');
                if (header.length > 0) {
                    header.after(searchBar);
                } else {
                    modal.prepend(searchBar);
                }
                
                searchBar.on('input', function() {
                    var term = $(this).val().toLowerCase();
                    modal.find('.item-element').each(function() {
                        var text = $(this).text().toLowerCase();
                        if (text.indexOf(term) !== -1) {
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    });
                });
                
                
                setTimeout(function() { searchBar.focus(); }, 100);
            }
        }
    };

})();
