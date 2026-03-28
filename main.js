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
            '.mod-franchise-icon { display: inline-block; color: #d35400; font-weight: bold; margin-right: 5px; cursor: help; }',
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
            '#modUI_content::-webkit-scrollbar-thumb:hover { background: #95a5a6; }',

            
            '.fran-tier-1 { background: #95a5a6; color: white; }',
            '.fran-tier-2 { background: #2980b9; color: white; }',
            '.fran-tier-3 { background: #27ae60; color: white; }',
            '.fran-tier-4 { background: #d35400; color: white; }',
            '.fran-tier-5 { background: #f39c12; color: white; box-shadow: 0 2px 8px rgba(243,156,18,0.5); }',


            
            '.fanbase-bar-track { background: #ddd; border-radius: 6px; height: 8px; overflow: hidden; }',
            '.fanbase-bar-fill  { height: 100%; border-radius: 6px; transition: width 0.4s ease; }',

            
            '.entry-type-btn { display: inline-block; padding: 10px 15px; margin: 5px; background: #bdc3c7; color: #2c3e50; border-radius: 4px; cursor: pointer; font-size: 10pt; font-weight: bold; transition: background 0.2s, transform 0.1s; border: 1px solid rgba(0,0,0,0.1); }',
            '.entry-type-btn:hover:not(.disabled) { background: #d35400; color: white; transform: translateY(-2px); }',
            '.entry-type-btn.selected { background: #d35400; color: white; border: 1px solid #a04000; box-shadow: inset 0 2px 4px rgba(0,0,0,0.2); }',
            '.entry-type-btn.disabled { opacity: 0.5; cursor: not-allowed; background: #eee; color: #999; }',

            
            '.media-type-card { border: 2px solid #bdc3c7; border-radius: 8px; padding: 10px 14px; margin-bottom: 8px; cursor: pointer; transition: border-color 0.2s, transform 0.15s; }',
            '.media-type-card:hover { border-color: #d35400; transform: translateY(-1px); }',
            '.media-type-card.selected { border-color: #d35400; background: #fef9f7; }',

            
            '.cs-progress-track { background: #ecf0f1; border-radius: 4px; height: 10px; overflow: hidden; margin-top: 6px; }',
            '.cs-progress-fill  { height: 100%; background: #d35400; border-radius: 4px; transition: width 0.3s ease; }',

            
            '@keyframes goldPulse { 0%,100%{box-shadow:0 0 0 0 rgba(243,156,18,0.5);} 50%{box-shadow:0 0 10px 4px rgba(243,156,18,0.3);} }',
            '.fran-legendary { animation: goldPulse 2s infinite; }'
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

            
            if (store.data.disableOverloadMalus) {
                playerGame.featureOverload = 0;
                playerGame.featureOverloadScore = 0;
                playerGame.featureOverloadPoints = 0;
                if (playerGame.bugs > 50) {
                    playerGame.bugs = Math.floor(playerGame.bugs * 0.2); 
                }
            }

            
            var activeFranchiseEntry = findActiveFranchiseEntryForCurrentGame(playerGame);
            if (activeFranchiseEntry) {
                var fran = getFranchiseById(activeFranchiseEntry.franchiseId);
                if (fran) {
                    
                    var franchiseScoreBonus = 0;
                    if (fran.tier >= 2) franchiseScoreBonus += 0.5;
                    if (fran.tier >= 4) franchiseScoreBonus += 0.5;
                    if (fran.pendingSoundtrackBonus > 0) {
                        franchiseScoreBonus += 0.5;
                        fran.pendingSoundtrackBonus--;
                    }
                    playerGame.modFranchiseScoreBonus = franchiseScoreBonus;

                    
                    var pointBoost = Math.floor(franchiseScoreBonus * 50);
                    playerGame.designPoints += pointBoost;
                    playerGame.technologyPoints += pointBoost;

                    
                    if (activeFranchiseEntry.type === "bundle" && activeFranchiseEntry.bundleBaseScore) {
                        
                        playerGame.designPoints = activeFranchiseEntry.bundleBaseScore * 60 + pointBoost;
                        playerGame.technologyPoints = activeFranchiseEntry.bundleBaseScore * 60 + pointBoost;
                    }
                }
            }

            var scrubEntry = store.data.coDevScrubMap[playerGame.title];

            
            if (activeFranchiseEntry && activeFranchiseEntry.type === "expansion") {
                if (!store.data.dlcData) store.data.dlcData = {};
                if (!store.data.dlcData[playerGame.id]) store.data.dlcData[playerGame.id] = { count: 0, activeDLCs: [] };

                
                var weeklyRev = 10000;
                if (playerGame.sequelTo) {
                    var baseGame = GameManager.company.getGameById(playerGame.sequelTo);
                    if (baseGame && baseGame.totalSalesCash) {
                        weeklyRev = Math.max(10000, Math.floor(baseGame.totalSalesCash / 20));
                    }
                }
                
                store.data.dlcData[playerGame.id].count++;
                store.data.dlcData[playerGame.id].activeDLCs.push({
                    activeWeeksLeft: 20,
                    weeklyRevenue: weeklyRev
                });
            }

            originalFinishDevelopment.apply(this, arguments);

            
            if (activeFranchiseEntry) {
                var fran = getFranchiseById(activeFranchiseEntry.franchiseId);
                if (fran) {
                    onFranchiseEntryComplete(fran, playerGame, playerGame.score, 0);
                    
                    var exists = fran.installments.some(function(inst) { return inst.id === playerGame.id; });
                    if (!exists) {
                        fran.installments.push({
                            id: playerGame.id,
                            title: playerGame.title,
                            score: playerGame.score,
                            type: activeFranchiseEntry.type,
                            releaseWeek: GameManager.company.currentWeek
                        });
                    }
                }
            }
            store.data.activePlayerFranchiseProject = null;

            if (scrubEntry) {
                var c = GameManager.company;
                if (typeof c.prevDesignPoints !== 'undefined') c.prevDesignPoints = Math.max(0, c.prevDesignPoints - scrubEntry.design);
                if (typeof c.prevTechnologyPoints !== 'undefined') c.prevTechnologyPoints = Math.max(0, c.prevTechnologyPoints - scrubEntry.tech);
                if (typeof c.designBaseline !== 'undefined') c.designBaseline = Math.max(0, c.designBaseline - scrubEntry.design);
                if (typeof c.technologyBaseline !== 'undefined') c.technologyBaseline = Math.max(0, c.technologyBaseline - scrubEntry.tech);
                if (typeof c.lastDesignPoints !== 'undefined') c.lastDesignPoints = Math.max(0, c.lastDesignPoints - scrubEntry.design);
                if (typeof c.lastTechPoints !== 'undefined') c.lastTechPoints = Math.max(0, c.lastTechPoints - scrubEntry.tech);

                if (c.gameLog && c.gameLog.length > 0) {
                    var lastG = c.gameLog[c.gameLog.length - 1];
                    if (lastG.title === playerGame.title || lastG.name === playerGame.title) {
                        lastG.designPoints = Math.max(0, lastG.designPoints - scrubEntry.design);
                        lastG.technologyPoints = Math.max(0, lastG.technologyPoints - scrubEntry.tech);
                    }
                }

                delete store.data.coDevScrubMap[playerGame.title];

                if (scrubEntry.design > 0 || scrubEntry.tech > 0) {
                    GameManager.company.notifications.push(new Notification({
                        header: "Co-Dev Support Complete",
                        text: "Subsidiary teams injected " + scrubEntry.design + " Design and " + scrubEntry.tech + " Technology points during development of " + playerGame.title + "!",
                        image: ""
                    }));
                }
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
        if (typeof store.data.lastCrossoverWeek === 'undefined') store.data.lastCrossoverWeek = -100;
        if (!store.data.globalSequelHistory) store.data.globalSequelHistory = [];

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
        if (typeof store.data.lastSpawnWeek === 'undefined') {
            store.data.lastSpawnWeek = -1;
        }
        if (typeof store.data.disableOverloadMalus === 'undefined') {
            store.data.disableOverloadMalus = false;
        }
        if (!store.data.activeCampaigns) {
            store.data.activeCampaigns = [];
        }

        
        if (!store.data.franchises) store.data.franchises = [];
        if (!store.data.mediaProjects) store.data.mediaProjects = [];
        if (!store.data.movieStudios || store.data.movieStudios.length === 0) store.data.movieStudios = generateMovieStudios();
        if (!store.data.mediaMarketWeeksLeft) store.data.mediaMarketWeeksLeft = 0;
        if (!store.data.activePlayerFranchiseProject) store.data.activePlayerFranchiseProject = null;
        if (!store.data.aiAcquisitionOffers) store.data.aiAcquisitionOffers = [];
        
        
        
        


        if (typeof GameManager !== 'undefined' && GameManager.company && GameManager.company.gameLog) {
            GameManager.company.gameLog = GameManager.company.gameLog.filter(function (g) {
                return !g.modAI && !(store.data.modGameIds && store.data.modGameIds[g.id]);
            });
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
                if (typeof c.lastDesignPoints !== 'undefined') c.lastDesignPoints = lastG.designPoints;
                if (typeof c.lastTechPoints !== 'undefined') c.lastTechPoints = lastG.technologyPoints;


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

    function generateMovieStudios() {
        var movieStudioNames = [
            "Paramount Interactive", "Universal Pixels", "Warner Bros. Digital",
            "Sony Pictures Gaming", "Disney Interactive Reborn", "Lionsgate Games",
            "A24 Interactive", "Netflix Films & Games", "Apple TV+ Studios",
            "MGM Digital", "Legendary Games", "Blumhouse Interactive"
        ];
        var studios = [];
        for (var i = 0; i < movieStudioNames.length; i++) {
            studios.push({
                id: "MS_" + i,
                name: movieStudioNames[i],
                reputation: Math.floor(Math.random() * 5) + 1,
                dealPending: false,
                dealOffer: null,
                currentDeal: null,
                totalDealsCompleted: 0
            });
        }
        return studios;
    }

    

    function getFranchiseById(id) {
        if (!store.data.franchises) return null;
        for (var i = 0; i < store.data.franchises.length; i++) {
            if (store.data.franchises[i].id === id) return store.data.franchises[i];
        }
        return null;
    }

    function getPlayerFranchises() {
        var frans = store.data.franchises || [];
        return frans.filter(function (f) { return f.ownerId === "player"; });
    }

    function getAIFranchises() {
        var frans = store.data.franchises || [];
        return frans.filter(function (f) { return f.ownerId !== "player"; });
    }

    function getFranchiseForGame(gameId) {
        if (!store.data.franchises) return null;
        for (var i = 0; i < store.data.franchises.length; i++) {
            var f = store.data.franchises[i];
            for (var j = 0; j < f.installments.length; j++) {
                if (f.installments[j].gameId === gameId) return f;
            }
        }
        return null;
    }

    function getMovieStudioById(id) {
        if (!store.data.movieStudios) return null;
        for (var i = 0; i < store.data.movieStudios.length; i++) {
            if (store.data.movieStudios[i].id === id) return store.data.movieStudios[i];
        }
        return null;
    }

    function recalculateFranchiseTier(franchise) {
        var fb = franchise.fanbaseScore;
        if (fb >= 90) franchise.tier = 5;
        else if (fb >= 70) franchise.tier = 4;
        else if (fb >= 50) franchise.tier = 3;
        else if (fb >= 25) franchise.tier = 2;
        else franchise.tier = 1;
    }

    function calculateEntryFanbaseImpact(score) {
        if (score >= 9) return 15;
        if (score >= 7) return 8;
        if (score >= 5) return 2;
        if (score >= 3) return -10;
        return -20;
    }

    function getEntryTypeCost(type, size, franchise, bundleCount) {
        var multiplier = 1.0;
        if (type === "sequel") multiplier = 1.2;
        if (type === "remake") multiplier = 1.8;
        if (type === "remaster") multiplier = 0.5;
        if (type === "spinoff") multiplier = 1.0;
        if (type === "prequel") multiplier = 1.3;
        if (type === "bundle") multiplier = 0.6 * (bundleCount || 2); 

        var baseCosts = (size === "AAA" ? 50000000 : (size === "Large" ? 10000000 : (size === "Medium" ? 2000000 : 500000)));
        var cost = baseCosts * multiplier;

        if (franchise && franchise.isDead) cost *= 2; 

        return cost;
    }

    function getEntryTypeWeeks(type, size, bundleCount) {
        var baseWeeks = { "Small": 30, "Medium": 60, "Large": 100, "AAA": 160 };
        var weeks = baseWeeks[size] || 30;
        if (type === "remaster") return Math.floor(weeks * 0.5);
        if (type === "remake") return Math.floor(weeks * 1.25);
        if (type === "expansion") return 8;
        if (type === "bundle") return Math.floor(weeks * 0.4 * (bundleCount || 2)); 
        return weeks;
    }

    function canAddFranchiseEntry(franchise, type, isSubsidiary) {
        if (!franchise || !franchise.installments) return { ok: false, reason: "Error identifying franchise." };

        var currentWeek = GameManager.company.currentWeek;
        var weeksSinceLast = franchise.lastEntryWeek === -1 ? 999 : (currentWeek - franchise.lastEntryWeek);

        
        if (!isSubsidiary) {
            if (type === "sequel" && weeksSinceLast < 12) return { ok: false, reason: "Too soon for a sequel (needs 12 weeks cooldown)." };
            if (type === "remaster") {
                var origin = franchise.installments[0];
                if (!origin || (currentWeek - origin.releaseWeek < 60)) return { ok: false, reason: "Original game must be at least 60 weeks old for a remaster." };
            }
            if (type === "remake") {
                var origin = franchise.installments[0];
                if (franchise.tier < 2) return { ok: false, reason: "Requires Franchise Tier 2." };
                if (!origin || (currentWeek - origin.releaseWeek < 80)) return { ok: false, reason: "Original game must be at least 80 weeks old for a remake." };
            }
            if (type === "reboot") {
                if (franchise.tier < 2) return { ok: false, reason: "Requires Franchise Tier 2." };
                if (weeksSinceLast < 24 && franchise.fanbaseScore >= 20) return { ok: false, reason: "Reboots require a 24-week cooldown or very low fanbase (< 20)." };
            }
            if (type === "spinoff" && franchise.tier < 2) return { ok: false, reason: "Requires Franchise Tier 2." };
            if (type === "prequel" && franchise.tier < 3) return { ok: false, reason: "Requires Franchise Tier 3." };
            if (type === "expansion") {
                if (weeksSinceLast > 30) return { ok: false, reason: "Expansion must be released within 30 weeks of an entry." };
            }

            
            if ((type === "remaster" || type === "remake") && franchise.installments.length > 0 && franchise.installments[0].beingRemade) {
                return { ok: false, reason: "The original installment has already been remastered/remade." };
            }
        }

        
        var studiosArr = store.data.studios || [];
        var subsidiaryProj = studiosArr.filter(function (s) {
            return s.currentProject && s.currentProject.isFranchiseEntry && s.currentProject.franchiseId === franchise.id;
        })[0];

        var playerProj = store.data.activePlayerFranchiseProject && store.data.activePlayerFranchiseProject.franchiseId === franchise.id;

        
        if (playerProj && typeof GameManager !== 'undefined' && GameManager.company && !GameManager.company.currentGame) {
            store.data.activePlayerFranchiseProject = null;
            playerProj = false;
        }

        
        var isNewEntry = (type === "sequel" || type === "spinoff" || type === "prequel" || type === "expansion" || type === "reboot");
        if (isNewEntry && (playerProj || subsidiaryProj)) {
            return { ok: false, reason: "A franchise project is already in development. Only one 'new' entry (Sequel/Spinoff/Reboot/etc.) can be developed at a time." };
        }

        
        

        if (!isSubsidiary && playerProj) {
            return { ok: false, reason: "You are already developing a project for this franchise." };
        }

        return { ok: true };
    }

    function estimateFranchiseEntryScore(franchise, type, size) {
        var baseMin = 4 + (franchise.tier * 0.5);
        var baseMax = 6 + (franchise.tier * 0.8);
        var currentWeek = Math.floor(GameManager.company.currentWeek);

        
        if (type === "sequel" && franchise.fanbaseScore >= 50) { baseMin += 0.5; baseMax += 0.5; }

        
        var recentSequels = (store.data.globalSequelHistory || []).filter(function (h) {
            return h.genre === franchise.genre && (currentWeek - h.week < 20);
        });
        if (recentSequels.length > 3) {
            baseMin -= 0.5;
            baseMax -= 0.5;
        }

        if (type === "remake" && franchise.installments[0].score >= 7) { baseMin += 1; baseMax += 1; }
        if (type === "remake" && franchise.installments[0].score <= 4) { baseMin -= 1; baseMax -= 1; }
        if (type === "reboot") { baseMin -= 1.5; baseMax += 2; } 

        
        if (franchise.fanbaseScore <= 0) {
            baseMin -= 2;
            baseMax -= 2;
        }

        return { min: Math.max(1, baseMin), max: Math.min(10, baseMax) };
    }

    function estimateMediaRevenue(type, budget, franchise) {
        var baseMult = 0.5;
        if (franchise) baseMult += (franchise.tier * 0.2) + (franchise.fanbaseScore / 100);

        var min = budget * baseMult * 1.5;
        var max = budget * baseMult * 4.0;

        if (type === "movie") { min *= 4; max *= 8; }
        if (type === "tvSeries" || type === "animatedShow") { min *= 3; max *= 5; }
        if (type === "soundtrack") { min = budget * 0.2; max = budget * 1.5; }
        if (type === "merchandise") { min = budget * 2; max = budget * 5; }
        if (type === "comicBook") { min = budget * 1.5; max = budget * 3; }

        return { min: min, max: max };
    }

    function onFranchiseEntryComplete(franchise, entry, score, revenue) {
        if (!franchise.last3Scores) franchise.last3Scores = [];
        franchise.last3Scores.push(score);
        if (franchise.last3Scores.length > 3) franchise.last3Scores.shift();

        
        var qTier = Math.floor(score / 2); 
        if (qTier > 5) qTier = 5;

        
        var fanbaseGain = 0;
        if (franchise.tier === 1) fanbaseGain = 10 + Math.floor(Math.random() * 11);
        if (franchise.tier === 2) fanbaseGain = 8 + Math.floor(Math.random() * 8);
        if (franchise.tier === 3) fanbaseGain = 5 + Math.floor(Math.random() * 6);
        if (franchise.tier === 4) fanbaseGain = 3 + Math.floor(Math.random() * 5);
        if (franchise.tier === 5) fanbaseGain = 2 + Math.floor(Math.random() * 4);

        
        if (qTier <= 2) fanbaseGain = Math.floor(fanbaseGain * 0.5);
        if (qTier === 4) fanbaseGain = Math.floor(fanbaseGain * 1.5);
        if (qTier === 5) fanbaseGain = Math.floor(fanbaseGain * 2.5);

        franchise.fanbaseScore = Math.min(100, franchise.fanbaseScore + fanbaseGain);

        
        if (franchise.isDead && qTier >= 3) {
            franchise.isDead = false;
        }

        
        var recentAvg = (franchise.last3Scores.reduce(function (a, b) { return a + b; }, 0) / Math.max(1, franchise.last3Scores.length));
        var oldTier = franchise.tier;
        if (franchise.tier < 5) {
            var reqScore = 6 + (franchise.tier * 0.5);
            var reqFans = 20 * franchise.tier;
            if (recentAvg >= reqScore && franchise.fanbaseScore >= reqFans) {
                franchise.tier++;
                GameManager.company.notifications.push(new Notification({
                    header: "Franchise Level Up!",
                    text: franchise.name + " is now Tier " + franchise.tier + "!",
                    image: ""
                }));
            }
        }

        
        if (entry) {
            
            if (!store.data.globalSequelHistory) store.data.globalSequelHistory = [];
            store.data.globalSequelHistory.push({
                genre: franchise.genre,
                week: Math.floor(GameManager.company.currentWeek)
            });
            
            if (store.data.globalSequelHistory.length > 50) store.data.globalSequelHistory.shift();

            entry.score = score;
            entry.revenue = revenue;
            entry.releaseWeek = Math.floor(GameManager.company.currentWeek);
            franchise.installments.push(entry);
            franchise.totalRevenue += revenue;
            franchise.lastEntryWeek = entry.releaseWeek;

            
            if (entry.type === "remaster" || entry.type === "remake" || entry.type === "bundle") {
                if (entry.bundledIds && entry.bundledIds.length > 0) {
                    entry.bundledIds.forEach(function (bid) {
                        var inst = franchise.installments.filter(function (i) { return i.id === bid; })[0];
                        if (inst) inst.beingRemade = true;
                    });
                } else if (entry.type !== "bundle" && franchise.installments && franchise.installments.length > 0) {
                    franchise.installments[0].beingRemade = true;
                }
            }

            
            if (entry.type === "soundtrack") {
                franchise.pendingSoundtrackBonus = (franchise.pendingSoundtrackBonus || 0) + 2;
            }
        }

        
        if (franchise.ownerId === "player") {
            var bonus = franchise.fanbaseScore * 50000;
            GameManager.company.adjustCash(bonus, "Franchise Fanbase Bonus: " + franchise.name);
        }
    }

    function renderFanbaseBar(score) {
        var color = "#e74c3c";
        if (score >= 90) color = "#f39c12";
        else if (score >= 70) color = "#27ae60";
        else if (score >= 50) color = "#f1c40f";
        else if (score >= 25) color = "#e67e22";

        var container = $('<div class="fanbase-bar-track" style="margin-top: 5px;"></div>');
        var fill = $('<div class="fanbase-bar-fill" style="width: ' + score + '%; background-color: ' + color + ';"></div>');
        if (score >= 90) fill.addClass('fran-legendary');
        return container.append(fill);
    }

    function renderTierBadge(tier) {
        var names = ["", "Cult Classic", "Recognized", "Mainstream", "Blockbuster", "Legendary"];
        var stars = "";
        if (tier === 5) stars = " ★★★★★";
        return $('<span class="fran-tier-badge fran-tier-' + tier + '" style="padding: 2px 8px; border-radius: 10px; font-size: 9pt; font-weight: bold; margin-left: 8px;">' + names[tier] + stars + '</span>');
    }

    function findActiveFranchiseEntryForCurrentGame(game) {
        if (!game) return null;
        if (game.isFranchiseEntry) return { franchiseId: game.franchiseId, entryType: game.entryType };
        
        if (store.data.activePlayerFranchiseProject) return store.data.activePlayerFranchiseProject;
        return null;
    }

    function generateInitialStudios() {
        var baseNames = [
            "Electronic Farts", "Microslop", "Ubislopt", "Nintendih", "Sonny",
            "Take-Three", "Actiblizzion", "Square Index", "Crapcom", "Sega Megadrive",
            "BeThesduh", "Epic Fails", "Wavel", "Rockstarving", "CD Projekt Blue",
            "Bungie Jumping", "Naughty Doge", "Insomniac Nap", "Biowarehouse", "Telltall",
            "Konamii", "Bandaiscam", "FromSoftly", "Platinum Bronze", "Kojima Productions (Real)",
            "Respawn Dead", "Infinity Wardrobe", "Treyarchite", "Dicey", "Criterion Missing",
            "Maxiss", "Bullfrogger", "Lionheadache", "Rareware Tearware",
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

        
        store.data.weeklyLaunchRevenue = 0;
        store.data.weeklyLaunchSources = [];

        
        if (store.data.disableOverloadMalus && GameManager.company && GameManager.company.currentGame) {
            var pg = GameManager.company.currentGame;
            pg.featureOverload = 0;
            pg.featureOverloadScore = 0;
            pg.featureOverloadPoints = 0;
        }


        try {
            processCompetitors();
        } catch (e) { console.error("[Mod] processCompetitors error:", e); }
        try {
            processDLCs();
        } catch (e) { console.error("[Mod] processDLCs error:", e); }
        try {
            processAISales();
        } catch (e) { console.error("[Mod] processAISales error:", e); }
        try {
            processPublishingProjects();
        } catch (e) { console.error("[Mod] processPublishingProjects error:", e); }
        try {
            processCampaigns();
        } catch (e) { console.error("[Mod] processCampaigns error:", e); }

        
        try { processFranchisePassiveIncome(); } catch (e) { console.error("[Mod] processFranchisePassiveIncome error:", e); }
        try { processMediaProjects(); } catch (e) { console.error("[Mod] processMediaProjects error:", e); }

        
        if (currentWeek % 4 === 0) {
            try { processAIFranchises(); } catch (e) { console.error("[Mod] processAIFranchises error:", e); }
         
        if (currentWeek > 0 && currentWeek % 12 === 0) {
            if (store.data.lastSpawnWeek !== currentWeek) {
                store.data.lastSpawnWeek = currentWeek;
                if (Math.random() < 0.3) {
                    var initialStudios = generateInitialStudios();
                    var pool = initialStudios.filter(function (s) {
                        return !store.data.studios.some(function (existing) { return existing.name === s.name; });
                    });

                    if (pool.length > 0) {
                        var newStudio = pool[Math.floor(Math.random() * pool.length)];
                        var spawn = {
                            id: "S_SPAWN_" + Date.now(),
                            name: newStudio.name,
                            valuation: Math.floor(Math.random() * 5000000) + 1000000,
                            sharesOwned: 0,
                            currentProject: null,
                            isFounded: false
                        };
                        store.data.studios.push(spawn);
                        GameManager.company.notifications.push(new Notification({
                            header: "New Studio Founded",
                            text: "A new competitor, " + spawn.name + ", has entered the market!",
                            image: ""
                        }));
                    }
                }
            }
        }
        }


        for (var i = 0; i < GameManager.company.gameLog.length; i++) {
            var g = GameManager.company.gameLog[i];
            if (g.flags && g.flags.isExtensionPack && g.sequelTo && !g.modDlcRevived) {
                g.modDlcRevived = true;
                var baseGame = GameManager.company.getGameById(g.sequelTo);
                
                if (baseGame && !(baseGame.flags && baseGame.flags.mmo)) {
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

    function processFranchisePassiveIncome() {
        var currentWeek = Math.floor(GameManager.company.currentWeek);
        var playerFrans = getPlayerFranchises();
        var weeklyIncome = 0;
        var incomeSources = [];

        for (var i = 0; i < playerFrans.length; i++) {
            var f = playerFrans[i];

            
            var originId = f.originGameId;
            if (store.data.dlcData && store.data.dlcData[originId]) {
                var dlcObj = store.data.dlcData[originId];
                if (dlcObj.activeDLCs) {
                    for (var k = 0; k < dlcObj.activeDLCs.length; k++) {
                        var d = dlcObj.activeDLCs[k];
                        if (d.modMultiplierWeeks && d.modMultiplierWeeks > 0) {
                            d.modMultiplierWeeks--;
                            if (d.modMultiplierWeeks <= 0) d.modRevenueMultiplier = 1.0;
                        }
                    }
                }
            }

            if (f.fanbaseScore <= 0) f.isDead = true;

            
            if (f.tier > 0) {
                var baseIncome = f.tier * 10000;
                weeklyIncome += baseIncome;
                incomeSources.push(f.name + " Royalties: +$" + UI.getShortNumberString(baseIncome));
            }

            
            if (f.tier >= 4 && currentWeek % 4 === 0) {
                var factor = (f.fanbaseScore < 20) ? 0.5 : 1.0;
                var merch = Math.floor(f.fanbaseScore * f.tier * 12000 * factor);
                weeklyIncome += merch;
                incomeSources.push(f.name + " Merch: +$" + UI.getShortNumberString(merch));
            }

            
            if (f.tier === 5 && currentWeek % 12 === 0) {
                var legendBonus = Math.floor(f.totalRevenue * 0.01);
                weeklyIncome += legendBonus;
                incomeSources.push(f.name + " Legend Bonus: +$" + UI.getShortNumberString(legendBonus));
            }
        }

        
        if (store.data.mediaProjects) {
            for (var j = 0; j < store.data.mediaProjects.length; j++) {
                var p = store.data.mediaProjects[j];
                if (p.status === "released" && p.weeklyRevenue > 0) {
                    weeklyIncome += p.weeklyRevenue;
                    incomeSources.push(p.title + " Sales: +$" + UI.getShortNumberString(p.weeklyRevenue));
                    p.salesWeeksLeft--;
                    if (p.salesWeeksLeft <= 0) {
                        p.weeklyRevenue = 0;
                    }
                }
            }
        }

        
        if (store.data.weeklyLaunchRevenue && store.data.weeklyLaunchRevenue > 0) {
            weeklyIncome += store.data.weeklyLaunchRevenue;
            if (store.data.weeklyLaunchSources) {
                incomeSources = incomeSources.concat(store.data.weeklyLaunchSources);
            }
        }

        if (weeklyIncome > 0) {
            GameManager.company.adjustCash(weeklyIncome, true, "Franchise & Media Revenue (Combined)");
        }

        
        store.data.weeklyLaunchRevenue = 0;
        store.data.weeklyLaunchSources = [];
    }

    function processMediaProjects() {
        if (!store.data.mediaProjects) return;
        var currentWeek = Math.floor(GameManager.company.currentWeek);

        for (var i = 0; i < store.data.mediaProjects.length; i++) {
            var p = store.data.mediaProjects[i];
            if (p.status !== "inProduction") continue;

            p.weeksRemaining--;
            if (p.weeksRemaining <= 0) {
                
                p.status = "released";
                p.releaseWeek = currentWeek;

                var f = p.franchiseId ? getFranchiseById(p.franchiseId) : null;

                
                var baseScore = 3 + (f ? (f.tier * 1.2) + (f.fanbaseScore / 20) : 2);
                if (p.studioRepBonus) baseScore += p.studioRepBonus; 

                
                if (p.type === "animatedShow" && f && (f.genre === "Casual" || f.genre === "Simulation")) {
                    baseScore += 1;
                }

                var budgetBonus = Math.min(2, (Math.log(p.budget / 500000 + 1) / Math.LN10));
                var randomFactor = (Math.random() * 4) - 2;
                p.score = Math.max(1, Math.min(10, Math.floor(baseScore + budgetBonus + randomFactor)));

                
                var revRange = estimateMediaRevenue(p.type, p.budget, f);
                var revMult = (p.score / 6);
                var totalRev = Math.floor(((revRange.min + revRange.max) / 2) * revMult);

                
                if (p.studioShare) {
                    var sId = p.producedBy;
                    var studio = getMovieStudioById(sId);
                    if (studio) {
                        studio.currentDeal = null; 
                        studio.totalDealsCompleted++;
                        if (studio.reputation < 5) studio.reputation += 0.1; 
                        if (studio.totalDealsCompleted === 3) {
                            GameManager.company.notifications.push(new Notification({
                                header: "Preferred Partner",
                                text: studio.name + " has named you a Preferred Partner — revenue split improved to 50/50.",
                                image: ""
                            }));
                        }
                    }
                    totalRev = Math.floor(totalRev * (1.0 - p.studioShare));
                }

                p.totalRevenue = totalRev;

                
                var icons = { "movie": "🎬", "tvSeries": "📺", "animatedShow": "[Art]", "soundtrack": "🎵", "merchandise": "👕", "comicBook": "📚" };
                GameManager.company.notifications.push(new Notification({
                    header: "Project Released: " + p.title,
                    text: p.title + " has finished production and is now available! Score: " + p.score + "/10. Estimated Lifetime Revenue: $" + UI.getShortNumberString(totalRev),
                    image: ""
                }));

                if (p.type === "movie" || p.type === "tvSeries" || p.type === "animatedShow") {
                    var duration = 16;
                    if (p.type === "tvSeries" || p.type === "animatedShow") duration = (p.episodes || 12) * (p.seasons || 1) * 3;
                    p.salesWeeksLeft = duration;
                    p.weeklyRevenue = Math.max(1, Math.floor(totalRev / duration));
                } else if (p.type === "comicBook") {
                    p.salesWeeksLeft = (p.episodes || 6) * 2;
                    p.weeklyRevenue = Math.max(1, Math.floor(totalRev / p.salesWeeksLeft));
                } else if (p.type === "merchandise") {
                    p.salesWeeksLeft = 24;
                    p.weeklyRevenue = Math.max(1, Math.floor((p.budget * 0.08) / 4));
                } else {
                    
                    store.data.weeklyLaunchRevenue = (store.data.weeklyLaunchRevenue || 0) + totalRev;
                    if (!store.data.weeklyLaunchSources) store.data.weeklyLaunchSources = [];
                    store.data.weeklyLaunchSources.push(p.title + " Launch: +$" + UI.getShortNumberString(totalRev));
                }

                
                if (f) {
                    var impact = 0;
                    if (p.score >= 8) impact = 20;
                    else if (p.score >= 5) impact = 8;
                    else impact = -5;

                    f.fanbaseScore = Math.max(0, Math.min(100, f.fanbaseScore + impact));

                    if (p.type === "soundtrack") {
                        f.pendingSoundtrackBonus = (f.pendingSoundtrackBonus || 0) + 2;
                    }

                    if (p.type === "tvSeries" || p.type === "animatedShow") {
                        if (p.score <= 4) {
                            GameManager.company.notifications.push(new Notification({
                                header: "Show Cancelled!",
                                text: "The show '" + p.title + "' was cancelled mid-run due to poor ratings. Remaining revenue lost.",
                                image: ""
                            }));
                            p.weeklyRevenue = 0; 
                            f.fanbaseScore = Math.max(0, f.fanbaseScore - 10);
                        } else {
                            f.fanbaseScore = Math.min(100, f.fanbaseScore + (p.seasons || 1) * 5);
                            if (p.score >= 9 && p.type === "animatedShow") {
                                f.animatedIconBonus = true; 
                            }
                        }
                    }

                    if (p.type === "comicBook") {
                        f.fanbaseScore = Math.min(100, f.fanbaseScore + Math.floor((p.episodes || 6) / 3));
                        if ((p.episodes || 0) >= 12) {
                            f.pendingComicBonus = true; 
                        }
                    }

                    if (p.score >= 9 && p.type === "movie") {
                        GameManager.company.notifications.push(new Notification({
                            header: "Blockbuster!",
                            text: p.title + " is a cultural event! Box office records shattered. " + f.name + " fanbase surged.",
                            image: ""
                        }));
                    }
                }

                GameManager.company.notifications.push(new Notification({
                    header: "Media Production Complete",
                    text: "'" + p.title + "' (" + p.type + ") has been released! Quality Rating: " + p.score + "/10. Expected Revenue: $" + UI.getShortNumberString(totalRev),
                    image: ""
                }));
            }
        }
    }

    function processAIFranchises() {
        var currentWeek = Math.floor(GameManager.company.currentWeek);
        var allFrans = store.data.franchises || [];

        for (var i = 0; i < allFrans.length; i++) {
            var f = allFrans[i];

            
            if (f.ownerId === "player" && f.isListedByPlayer) {
                f.saleWeekRemaining--;
                if (f.saleWeekRemaining <= 0) {
                    var sArrSubs = store.data.studios || [];
                    var s = sArrSubs.filter(function (st) { return st.sharesOwned < 50; });
                    var buyer = s[Math.floor(Math.random() * s.length)];
                    if (buyer) {
                        GameManager.company.adjustCash(f.playerSalePrice, "Franchise Sale: " + f.name);
                        f.ownerId = buyer.id;
                        f.isListedByPlayer = false;
                        GameManager.company.notifications.push(new Notification({
                            header: "Franchise Sold!",
                            text: buyer.name + " has purchased your '" + f.name + "' franchise for $" + UI.getShortNumberString(f.playerSalePrice),
                            image: ""
                        }));
                    } else {
                        f.isListedByPlayer = false; 
                    }
                }
            }

            if (f.ownerId === "player") continue;

            
            f.fanbaseScore = Math.max(0, f.fanbaseScore - 0.5);
            recalculateFranchiseTier(f);

            
            if (f.tier >= 2 && !f.isForSale) {
                if (Math.random() < 0.10) { 
                    f.isForSale = true;
                    f.salePrice = Math.floor(f.totalRevenue * 0.8 + 2000000);
                }
            }
        }

        
        var aiFrans = getAIFranchises(); 
        var studios = store.data.studios;
        for (var j = 0; j < studios.length; j++) {
            var s = studios[j];
            if (s.sharesOwned < 50) { 
                var sFrans = aiFrans.filter(function (fr) { return fr.ownerId === s.id; });
                if (sFrans.length > 0 && Math.random() < 0.05) {
                    var targetF = sFrans[Math.floor(Math.random() * sFrans.length)];
                    if (targetF.tier >= 3) {
                        
                        targetF.fanbaseScore = Math.min(100, targetF.fanbaseScore + 5);
                    }
                }
            }
        }
    }

    function processAISales() {
        if (!store.data.activeAIGames) store.data.activeAIGames = [];
        var totalDividends = 0;
        for (var i = store.data.activeAIGames.length - 1; i >= 0; i--) {
            var g = store.data.activeAIGames[i];
            if (typeof g.modSalesWeeks === 'undefined') g.modSalesWeeks = 0;
            if (typeof g.modTotalSalesCash === 'undefined') g.modTotalSalesCash = 0;

            g.modSalesWeeks++;

            g.modCurrentWeeklySales = Math.floor(g.modCurrentWeeklySales * 0.85);
            var weeklyCash = g.modCurrentWeeklySales * getCampaignBoost(g.id);
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
                    if (cut > 0) totalDividends += cut;
                } else if (studio && studio.sharesOwned > 0) {
                    var div = weeklyCash * (studio.sharesOwned / 100);
                    if (div > 0) totalDividends += div;
                }

                
                if (studio && weeklyCash > 10000) {
                    studio.valuation += Math.floor(weeklyCash * 0.05);
                }
            }

            if (g.modSalesWeeks > 20 || g.modCurrentWeeklySales < 1000) {
                store.data.activeAIGames.splice(i, 1);
            }
        }
        if (totalDividends > 0) {
            GameManager.company.adjustCash(totalDividends, "Subsidiary Dividends");
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
            
            var valFactor = studio.valuation / 20000000;
            if (valFactor > 2) valFactor = 2; 

            var initialEmp = studio.isFounded ? 5 : Math.floor(Math.random() * (5 + Math.floor(valFactor * 10))) + 5;

            for (var i = 0; i < initialEmp; i++) {
                var r = Math.random();
                
                if (r < Math.max(0.05, 0.2 - (valFactor * 0.15))) studio.staff[1]++;
                else if (r < Math.max(0.1, 0.6 - (valFactor * 0.25))) studio.staff[2]++;
                else if (r < Math.max(0.2, 0.85 - (valFactor * 0.2))) studio.staff[3]++;
                else if (r < Math.min(0.99, 0.95 + (valFactor * 0.05))) studio.staff[4]++;
                else studio.staff[5]++;
            }
        }
    }

    function processCompetitors() {
        var currentWeek = Math.floor(GameManager.company.currentWeek);
        var studios = store.data.studios;
        var totalMaint = 0;

        for (var i = 0; i < studios.length; i++) {
            var studio = studios[i];

            ensureStaffObj(studio);

            
            if (studio.sharesOwned >= 50 && (currentWeek % 4 === 0)) {
                var maint = 0;
                for (var t = 1; t <= 5; t++) maint += (starTiers[t].maint * (studio.staff[t] || 0));
                totalMaint += (maint * 4);
            }

            if (studio.currentProject) {
                if (studio.currentProject.isPublishedByPlayer) continue;

                if (studio.currentProject.isCoDev) {
                    var playerGame = (GameManager.company ? GameManager.company.currentGame : null);
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

                
                studio.currentProject.weeksRemaining -= 1;


                if (studio.currentProject.weeksRemaining <= 0) {
                    finishAndReleaseGame(studio);
                }
            } else {
                
                if (studio.sharesOwned >= 50) {
                    var spec = studio.specialization || "Any";
                    var currentWk = GameManager.company.currentWeek;

                    if (spec === "DLC") {
                        
                        var games = (GameManager.company.gameLog || []).filter(function (g) {
                            var age = currentWk - g.releaseWeek;
                            var dlcInfo = store.data.dlcData[g.id] || { count: 0 };
                            return age < 480 && dlcInfo.count < 5;
                        });

                        if (games.length > 0) {
                            games.sort(function (a, b) { return (b.totalSalesCash || 0) - (a.totalSalesCash || 0); });
                            var target = games[0];
                            studio.currentProject = {
                                name: target.title + " DLC",
                                isDLC: true,
                                gameId: target.id,
                                weeklyRevenue: Math.floor((target.totalSalesCash || 1500000) * 0.05),
                                weeksRemaining: 18
                            };
                            
                            if (!store.data.dlcData[target.id]) store.data.dlcData[target.id] = { count: 0, activeDLCs: [] };
                            store.data.dlcData[target.id].count++;
                            continue;
                        }
                    } else if (spec === "CoDev" && GameManager.company && GameManager.company.currentGame) {
                        studio.currentProject = { name: "Co-Dev Support", isCoDev: true, isPublishedByPlayer: false };
                        continue;
                    } else if (spec === "Games" && (currentWeek % 4 === 0)) {
                        
                        if (!isShowingDraft) {
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
                }

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
                                    title: offer.title || null,
                                    topic: offer.topic,
                                    genre: offer.genre,
                                    genre2: offer.genre2 || null,
                                    size: offer.size,
                                    platforms: offer.platforms || [offer.platform],
                                    weeksRemaining: (offer.size === "Small" ? 15 : (offer.size === "Medium" ? 30 : (offer.size === "Large" ? 50 : 80))),
                                    isPublishedByPlayer: true,
                                    publishedGameAdvance: offer.advance,
                                    offerId: offer.id,
                                    
                                    isFranchiseEntry: !!offer.franchiseId,
                                    franchiseId: offer.franchiseId || null,
                                    entryType: offer.entryType || null
                                });
                                var gName = offer.title || (offer.size + " " + offer.genre);
                                GameManager.company.notifications.push(new Notification({
                                    header: "Publishing Deal Accepted",
                                    text: studio.name + " accepted your deal for '" + gName + "' ($" + UI.getShortNumberString(offer.advance) + " advance) and started development!",
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
                    for (var p = 0; p < store.data.publishingProjects.length; p++) {
                        if (store.data.publishingProjects[p].studioId === studio.id) hasActivePublishing = true;
                    }
                }
                if (!acceptedOffer && !hasActivePublishing && Math.random() < 0.05) {
                    startAIProject(studio);
                }
            }
        }

        if (totalMaint > 0) {
            GameManager.company.adjustCash(-totalMaint, "Subsidiary Upkeep (Monthly)");
        }
    }

    function generateBestDraft(studio) {
        try {
            var currentWk = GameManager.company.currentWeek;
            var activePlats = Platforms.allPlatforms.filter(function (p) {
                return (p.published && p.published <= currentWk) &&
                    (!p.retireDate || p.retireDate > currentWk);
            });
            activePlats.sort(function (a, b) { return b.marketShare - a.marketShare; });
            var topPlat = activePlats[0] ? activePlats[0].name : Platforms.allPlatforms[0].name;

            var t = Topics.topics[Math.floor(Math.random() * Topics.topics.length)];
            var bestG = GameGenre.getAll()[0];
            var bestW = -1;
            var genreIndexMap = { "Action": 0, "Adventure": 1, "RPG": 2, "Simulation": 3, "Strategy": 4, "Casual": 5 };
            var gList = GameGenre.getAll();
            for (var i = 0; i < gList.length; i++) {
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
                platforms: getSmartPlatforms(studio, t.name, bestG.name, size),
                cost: (size === "AAA" ? 1000000 : (size === "Large" ? 400000 : (size === "Medium" ? 100000 : 25000)))
            };
        } catch (e) {
            console.error("[Mod] generateBestDraft error, using fallback:", e);
            return { topic: "Zombies", genre: "Action", size: "Small", platforms: ["PC"], cost: 20000 };
        }
    }

    function getSmartPlatforms(studio, topicName, genreName, size) {
        var currentWk = GameManager.company.currentWeek;
        var activePlats = Platforms.allPlatforms.filter(function (p) {
            return (p.published && p.published <= currentWk) && (!p.retireDate || p.retireDate > currentWk);
        });

        if (activePlats.length === 0) return [Platforms.allPlatforms[0].name];

        
        activePlats.sort(function (a, b) {
            var scoreA = a.marketShare || 0;
            var scoreB = b.marketShare || 0;

            
            var genreIndexMap = { "Action": 0, "Adventure": 1, "RPG": 2, "Simulation": 3, "Strategy": 4, "Casual": 5 };
            var gIdx = genreIndexMap[genreName];

            if (gIdx !== undefined) {
                if (a.genreWeightings && a.genreWeightings[gIdx]) scoreA *= (a.genreWeightings[gIdx] + 0.5);
                if (b.genreWeightings && b.genreWeightings[gIdx]) scoreB *= (b.genreWeightings[gIdx] + 0.5);
            }

            return scoreB - scoreA;
        });

        var finalPlats = [activePlats[0].name];
        if ((size === "Large" || size === "AAA") && activePlats.length > 1) {
            finalPlats.push(activePlats[1].name);
        }
        return finalPlats;
    }

    function promptDraft(studio, draft) {
        if (isShowingDraft) return;
        try {
            isShowingDraft = true;
            Sound.click();

            var genreIndexMap = { "Action": 0, "Adventure": 1, "RPG": 2, "Simulation": 3, "Strategy": 4, "Casual": 5 };
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
                selectEl.hover(function () { $(this).css("border-color", color); }, function () { $(this).css("border-color", "#bdc3c7"); });
                row.append(selectEl);
                return row;
            }

            var topicSelect = $('<select id="draft_topic"></select>');
            Topics.topics.forEach(function (t) {
                var opt = $('<option value="' + t.name + '">' + t.name + '</option>');
                if (t.name === draft.topic) opt.attr("selected", true);
                topicSelect.append(opt);
            });
            body.append(makeRow("Topic", "#2980b9", topicSelect));

            var genreSelect = $('<select id="draft_genre"></select>');
            GameGenre.getAll().forEach(function (g) {
                var opt = $('<option value="' + g.name + '">' + g.name + '</option>');
                if (g.name === draft.genre) opt.attr("selected", true);
                genreSelect.append(opt);
            });
            body.append(makeRow("Genre", "#8e44ad", genreSelect));

            var sizeSelect = $('<select id="draft_size"></select>');
            ["Small", "Medium", "Large", "AAA"].forEach(function (s) {
                var opt = $('<option value="' + s + '">' + s + '</option>');
                if (s === draft.size) opt.attr("selected", true);
                sizeSelect.append(opt);
            });
            sizeSelect.change(function () {
                var val = $(this).val();
                var cost = (val === "AAA" ? 1000000 : (val === "Large" ? 400000 : (val === "Medium" ? 100000 : 25000)));
                $('#draft_cost_val').text('$' + UI.getShortNumberString(cost));
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
                var t = Topics.topics.filter(function (x) { return x.name === selTopic; })[0];
                var g = GameGenre.getAll().filter(function (x) { return x.name === selGenre; })[0];
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

            var costLine = $('<div style="text-align: center; margin-top: 15px; padding: 12px; background: #f4f6f7; border: 2px dashed #bdc3c7; border-radius: 8px; font-size: 13pt; color: #2c3e50;">Required Funding: <strong id="draft_cost_val" style="color: #c0392b; font-size: 15pt;">$' + UI.getShortNumberString(draft.cost) + '</strong></div>');
            body.append(costLine);
            container.append(body);

            var btnArea = $('<div style=\"display: flex; gap: 10px; padding: 15px 20px; background: #ecf0f1;\"></div>');
            var btnAccept = $('<div class=\"selectorButton greenButton\" style=\"flex: 1.5; text-align: center; padding: 12px 0; font-size: 13pt; font-weight: bold; cursor: pointer; border-radius: 6px; box-shadow: 0 3px 0 #1e8449;\">Accept \u0026 Fund</div>');
            btnAccept.click(function () {
                var selTopic = $('#draft_topic').val();
                var selGenre = $('#draft_genre').val();
                var selSize = $('#draft_size').val();
                
                var cost = (selSize === "AAA" ? 1000000 : (selSize === "Large" ? 400000 : (selSize === "Medium" ? 100000 : 25000)));
                var currentWk = Math.floor(GameManager.company.currentWeek);
                var activePlats = Platforms.allPlatforms.filter(function (p) { return (p.published && p.published <= currentWk) && (!p.retireDate || p.retireDate > currentWk); });
                activePlats.sort(function (a, b) { return b.marketShare - a.marketShare; });
                var finalPlats = [];
                if (activePlats.length > 0) { finalPlats.push(activePlats[0].name); if ((selSize === "Large" || selSize === "AAA") && activePlats.length > 1) finalPlats.push(activePlats[1].name); }
                else { finalPlats.push(Platforms.allPlatforms[0].name); }

                if (GameManager.company.cash >= cost) {
                    GameManager.company.adjustCash(-cost, "Subsidiary Funding: " + studio.name);
                    studio.currentProject = { name: generateGameName(selTopic, selGenre), topic: selTopic, genre: selGenre, size: selSize, platforms: finalPlats, isSubsidiaryDeal: true, weeksRemaining: (selSize === "Small" ? 24 : (selSize === "Medium" ? 36 : (selSize === "Large" ? 48 : 52))) };
                    isShowingDraft = false;
                    studio.draftCooldown = 4;
                    $.modal.close();
                } else { alert("You need $" + UI.getShortNumberString(cost) + " to fund this draft!"); }
            });

            var btnDecline = $('<div class=\"selectorButton deleteButton\" style=\"flex: 1; text-align: center; padding: 12px 0; font-size: 13pt; font-weight: bold; cursor: pointer; border-radius: 6px; box-shadow: 0 3px 0 #943126;\">Decline</div>');
            btnDecline.click(function () { isShowingDraft = false; studio.draftCooldown = 8; $.modal.close(); });

            btnArea.append(btnAccept).append(btnDecline);
            container.append(btnArea);

            container.modal({
                overlayClose: false,
                opacity: 80,
                overlayCss: { backgroundColor: "#000" },
                containerCss: { width: "550px", height: "auto", border: "none", background: "transparent" }
            });

            setTimeout(function () { $('#draft_topic, #draft_genre').change(updateDraftMatch); updateDraftMatch(); }, 100);
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
                    name: project.title || generateGameName(project.topic, project.genre),
                    title: project.title || null,
                    topic: project.topic,
                    genre: project.genre,
                    genre2: project.genre2 || null,
                    size: project.size,
                    platforms: project.platforms,
                    weeksRemaining: project.weeksRemaining,
                    isPublishedByPlayer: project.isPublishedByPlayer,
                    publishedGameAdvance: project.publishedGameAdvance,
                    
                    isFranchiseEntry: project.isFranchiseEntry,
                    franchiseId: project.franchiseId,
                    entryType: project.entryType
                };
            }


            ensureStaffObj(studio);
            var speedMultiplier = 1;
            for (var t = 1; t <= 5; t++) speedMultiplier += (starTiers[t].speed * (studio.staff[t] || 0));
            studio.currentProject.weeksRemaining -= speedMultiplier;
            project.weeksRemaining = studio.currentProject.weeksRemaining;

            if (studio.currentProject.weeksRemaining <= 0) {
                finishAndReleaseGame(studio);

                store.data.publishingProjects.splice(i, 1);

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
        var sizeOptions = [{ s: "Small", w: 24 }, { s: "Medium", w: 36 }, { s: "Large", w: 48 }, { s: "AAA", w: 52 }];

        var size = sizeOptions[0];
        if (studio.valuation > 50000000) size = sizeOptions[Math.floor(Math.random() * 4)];
        else if (studio.valuation > 10000000) size = sizeOptions[Math.floor(Math.random() * 3)];

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
        for (var t = 1; t <= 5; t++) teamQuality += (starTiers[t].score * (studio.staff[t] || 0));
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
            if (!store.data.dlcData[proj.gameId] || typeof store.data.dlcData[proj.gameId].count === 'undefined') {
                store.data.dlcData[proj.gameId] = { count: 0, activeDLCs: [] };
            }
            
            
            store.data.dlcData[proj.gameId].activeDLCs.push({
                activeWeeksLeft: 20,
                weeklyRevenue: proj.weeklyRevenue
            });

            GameManager.company.notifications.push(new Notification({
                header: "Subsidiary DLC Released",
                text: studio.name + " finished developing " + proj.name + " (#" + store.data.dlcData[proj.gameId].count + ")! It is now generating revenue.",
                image: ""
            }));
            return;
        }

        if (proj.isFranchiseEntry) {
            var f = getFranchiseById(proj.franchiseId);
            if (f) {
                var entry = {
                    id: "FE_" + Date.now(),
                    type: proj.entryType,
                    title: proj.title || (f.name + " " + proj.entryType),
                    gameId: "MOD_" + Math.random().toString(36).substr(2, 9),
                    producedBy: studio.id,
                    score: score,
                    revenue: units * price,
                    releaseWeek: GameManager.company.currentWeek,
                    size: proj.size
                };
                onFranchiseEntryComplete(f, entry, score, entry.revenue);
            }
        }

        
        if (studio.sharesOwned < 50 && !proj.isFranchiseEntry && score >= 7 && Math.random() < 0.40) {
            var gameTitle = proj.title || proj.name;
            var fransArrFin = store.data.franchises || [];
            var exists = fransArrFin.some(function (fr) { return fr.name.toLowerCase() === gameTitle.toLowerCase(); });
            if (!exists) {
                var fId = "FRAN_" + Date.now();
                var newF = {
                    id: fId,
                    name: gameTitle,
                    ownerId: studio.id,
                    originGameId: "MOD_" + Math.random().toString(36).substr(2, 9),
                    originGameTitle: gameTitle,
                    topic: proj.topic || "Unknown",
                    genre: proj.genre || "Unknown",
                    tier: 1,
                    totalRevenue: units * price,
                    installments: [{
                        id: "FE_" + Date.now(),
                        type: "original",
                        title: gameTitle,
                        gameId: "MOD_" + Math.random().toString(36).substr(2, 9),
                        producedBy: studio.id,
                        score: score,
                        revenue: units * price,
                        releaseWeek: GameManager.company.currentWeek,
                        size: proj.size || "Small"
                    }],
                    fanbaseScore: score * 7,
                    lastEntryWeek: GameManager.company.currentWeek,
                    isForSale: false,
                    salePrice: 0,
                    licenseOffers: [],
                    acquisitionHistory: [],
                    mediaProperties: []
                };
                store.data.franchises.push(newF);
            }
        }

        
        if (proj.entryType === "expansion") {
            if (!store.data.dlcData) store.data.dlcData = {};
            
            var gId = proj.gameId || (f ? f.originGameId : "Unknown");
            if (!store.data.dlcData[gId]) store.data.dlcData[gId] = { count: 0, activeDLCs: [] };
            store.data.dlcData[gId].count++;
            store.data.dlcData[gId].activeDLCs.push({
                activeWeeksLeft: 20,
                weeklyRevenue: Math.floor(units * price / 20)
            });
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
            var activePlats = Platforms.allPlatforms.filter(function (p) {
                return (p.published && p.published <= currentWk) &&
                    (!p.retireDate || p.retireDate > currentWk);
            });
            if (activePlats.length > 0) {
                
                for (var i = activePlats.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = activePlats[i];
                    activePlats[i] = activePlats[j];
                    activePlats[j] = temp;
                }
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
            title: proj.title || (proj.name + " (" + studio.name + ")"),
            topic: Topics.topics.filter(function (t) { return t.name === proj.topic; })[0] || Topics.topics[0],
            genre: GameGenre.getAll().filter(function (g) { return g.name === proj.genre; })[0] || GameGenre.Action,
            secondGenre: (proj.genre2) ? GameGenre.getAll().filter(function (g) { return g.name === proj.genre2; })[0] : null,
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
            store.data.leaderboardGames.sort(function (a, b) {
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

        var platsStr = selectedPlats.map(function (p) { return p.name; }).join(", ");
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
            var dlcInfo = store.data.dlcData[gameId];

            
            if (dlcInfo.activeWeeksLeft !== undefined) {
                store.data.dlcData[gameId] = {
                    count: 1, activeDLCs: [{
                        activeWeeksLeft: dlcInfo.activeWeeksLeft,
                        weeklyRevenue: dlcInfo.weeklyRevenue,
                        pendingPlayerDev: dlcInfo.pendingPlayerDev || 0
                    }]
                };
                dlcInfo = store.data.dlcData[gameId];
            }

            if (!dlcInfo.activeDLCs) continue;

            for (var j = dlcInfo.activeDLCs.length - 1; j >= 0; j--) {
                var dlc = dlcInfo.activeDLCs[j];

                if (dlc.pendingPlayerDev > 0) {
                    dlc.pendingPlayerDev--;
                    if (dlc.pendingPlayerDev <= 0) {
                        dlc.activeWeeksLeft = 20;
                        GameManager.company.notifications.push(new Notification({
                            header: "DLC Finished",
                            text: "Your DLC for " + (GameManager.company.getGameById(gameId) ? GameManager.company.getGameById(gameId).title : "your game") + " is finished and generating revenue!",
                            image: ""
                        }));
                    }
                } else if (dlc.activeWeeksLeft > 0) {
                    var mult = dlc.modRevenueMultiplier || 1.0;
                    var revenue = dlc.weeklyRevenue * mult;
                    revenue *= getCampaignBoost(gameId); 
                    if (revenue < 5000) revenue = 5000;

                    var ogGame = GameManager.company.getGameById(gameId);

                    GameManager.company.adjustCash(revenue, "DLC Sales: " + (ogGame ? ogGame.title : "Game"));
                    dlc.activeWeeksLeft--;
                } else {
                    dlcInfo.activeDLCs.splice(j, 1);
                }
            }
        }
    }
    function processCampaigns() {
        if (!store.data.activeCampaigns) store.data.activeCampaigns = [];

        
        processStandardMarketing();

        for (var i = store.data.activeCampaigns.length - 1; i >= 0; i--) {
            var c = store.data.activeCampaigns[i];
            c.weeksLeft--;

            if (c.weeksLeft <= 0) {
                GameManager.company.notifications.push(new Notification({
                    header: "Campaign Finished",
                    text: "Your marketing campaign for '" + c.targetName + "' has concluded.",
                    image: ""
                }));
                store.data.activeCampaigns.splice(i, 1);
            }
        }
    }

    function processStandardMarketing() {
        var games = GameManager.company.gameLog || [];
        var currentWk = GameManager.company.currentWeek;
        for (var i = 0; i < games.length; i++) {
            var g = games[i];
            
            if (g.state === GameState.released && !g.isExtensionPack && (currentWk - g.releaseWeek < 20)) {
                var boost = getCampaignBoost(g.id);
                if (boost > 1.0) {
                    var bonusBase = (g.score || 5) * 2000;
                    if (g.size === "Medium") bonusBase *= 5;
                    if (g.size === "Large") bonusBase *= 25;
                    if (g.size === "AAA") bonusBase *= 120;

                    var weeklyBonus = Math.floor(bonusBase * (boost - 1));
                    if (weeklyBonus > 0) {
                        GameManager.company.adjustCash(weeklyBonus, "Marketing Bonus: " + g.title);
                    }
                }
            }
        }
    }

    function getCampaignBoost(targetId) {
        var boost = 1.0;
        if (!store.data.activeCampaigns) return 1.0;
        for (var i = 0; i < store.data.activeCampaigns.length; i++) {
            if (store.data.activeCampaigns[i].targetId === targetId) {
                boost *= store.data.activeCampaigns[i].boostFactor;
            }
        }
        return boost;
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
            { id: "dlc", label: "DLCs" },
            { id: "franchises", label: "Franchises" },
            { id: "media", label: "Media" },
            { id: "marketing", label: "Marketing" },
            { id: "settings", label: "Settings" }
        ];

        tabs.forEach(function (t) {
            var tabStyle = "flex: 1; text-align: center; padding: 8px 0; cursor: pointer; font-size: 11pt; font-weight: bold; border-top-left-radius: 5px; border-top-right-radius: 5px; border: 1px solid #bdc3c7; border-bottom: none; white-space: nowrap;";
            if (t.id === activeTab) {
                tabStyle += " background-color: #ecf0f1; color: #d35400; margin-bottom: -2px; border-bottom: 2px solid #ecf0f1;";
            } else {
                tabStyle += " background-color: #bdc3c7; color: #7f8c8d;";
            }
            var tabDiv = $('<div style="' + tabStyle + '">' + t.label + '</div>');
            tabDiv.click(function () {
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
        } else if (activeTab === "franchises") {
            renderFranchisesTab(contentArea);
        } else if (activeTab === "media") {
            renderMediaTab(contentArea);
        } else if (activeTab === "marketing") {
            renderMarketingTab(contentArea);
        } else if (activeTab === "settings") {
            renderSettingsTab(contentArea);
        }


        contentArea.removeClass('cs-animate-in');
        void contentArea[0].offsetWidth;
        contentArea.addClass('cs-animate-in');


        contentArea.find('.studioCard, .dlcItem, .cs-stagger-item').each(function (i) {
            var el = $(this);
            el.css({ opacity: 0 });
            setTimeout(function () {
                el.addClass('cs-card-enter');
                
                setTimeout(function () { el.css({ opacity: 1 }); }, 400);
            }, i * 40);
        });

        
        setTimeout(function () {
            var logItems = $('.gameLogItem');
            logItems.each(function () {
                var title = $(this).find('h3').text().trim();
                var f = null;
                var frans = store.data.franchises || [];
                for (var fIdx = 0; fIdx < frans.length; fIdx++) {
                    var fr = frans[fIdx];
                    var installments = fr.installments || [];
                    var hasIt = false;
                    for (var itIdx = 0; itIdx < installments.length; itIdx++) {
                        if (installments[itIdx].title === title) { hasIt = true; break; }
                    }
                    if (hasIt) { f = fr; break; }
                }
                if (f && $(this).find('.mod-franchise-icon').length === 0) {
                    $(this).find('h3').prepend('<span class="mod-franchise-icon" title="Part of the ' + f.name + ' franchise">[F]</span> ');
                }
            });
        }, 100);
    }

    function startSubsidiaryFranchiseProject(studio, franchise, entryType, size, bundledIds, bundleBaseScore) {
        var bCount = (entryType === "bundle" && bundledIds) ? bundledIds.length : 1;
        var weeks = getEntryTypeWeeks(entryType, size, bCount);
        studio.currentProject = {
            name: (entryType === "bundle" ? "The " + franchise.name + " Collection" : franchise.name + " (" + entryType + ")"),
            isFranchiseEntry: true,
            franchiseId: franchise.id,
            entryType: entryType,
            size: size,
            weeksRemaining: weeks,
            totalWeeks: weeks,
            status: "developing",
            bundledIds: bundledIds,
            bundleBaseScore: bundleBaseScore
        };

        GameManager.company.notifications.push(new Notification({
            header: "Project Assigned",
            text: studio.name + " has started work on the new " + franchise.name + " installment.",
            image: ""
        }));
    }

    function showNewEntryModal(franchise, container, onBack) {
        container.empty();
        var modal = $('<div style="background: #fdf6e3; padding: 0; min-height: 400px;"></div>');
        var mHeader = $('<div style="background: #d35400; padding: 15px; color: white; font-size: 14pt; font-weight: bold; display: flex; justify-content: space-between; align-items: center;">' +
            '<span>New Entry: ' + franchise.name + '</span>' +
            '<div id="fran-modal-back" style="cursor: pointer; font-size: 10pt; background: rgba(0,0,0,0.2); padding: 5px 10px; border-radius: 4px;">&lt; BACK</div>' +
            '</div>');
        modal.append(mHeader);
        mHeader.find('#fran-modal-back').click(onBack);

        var mBody = $('<div style="padding: 20px; color: #2c3e50;"></div>');
        var type = "sequel";
        var size = "Small";

        var typeRow = $('<div style="margin-bottom: 20px;"></div>');
        typeRow.append('<div style="font-weight: bold; margin-bottom: 8px;">Select Entry Type:</div>');
        var types = ["sequel", "remaster", "remake", "reboot", "spinoff", "prequel", "expansion", "bundle"];
        var bundleSelection = [];
        var bundleList = $('<div style="display: none; margin-bottom: 20px; background: #eee; padding: 15px; border-radius: 8px; border: 1px solid #bdc3c7;"><b>Bundle Collection:</b><div id="bundle-options" style="margin-top: 10px; max-height: 150px; overflow-y: auto;"></div></div>');

        types.forEach(function (t) {
            var can = canAddFranchiseEntry(franchise, t);
            var tBtn = $('<div class="entry-type-btn" style="background: ' + (can.ok ? "#bdc3c7" : "#eee") + '; color: ' + (can.ok ? "#2c3e50" : "#999") + '">' + t.toUpperCase() + '</div>');
            if (!can.ok) tBtn.addClass('disabled').attr('title', can.reason);
            if (t === type) tBtn.addClass('selected').css('background', '#d35400').css('color', 'white');

            tBtn.click(function () {
                if (!can.ok) return;
                type = t;
                mBody.find('.entry-type-btn').removeClass('selected').css('background', '#bdc3c7').css('color', '#2c3e50');
                $(this).addClass('selected').css('background', '#d35400').css('color', 'white');

                if (type === "bundle") {
                    bundleList.show();
                    refreshBundleOptions();
                } else {
                    bundleList.hide();
                }
                updateEstimates();
            });
            typeRow.append(tBtn);
        });
        mBody.append(typeRow);
        mBody.append(bundleList);

        function refreshBundleOptions() {
            var options = bundleList.find('#bundle-options').empty();
            franchise.installments.slice().reverse().forEach(function (inst) {
                if (inst.type === "soundtrack" || inst.beingRemade) return;
                var item = $('<div style="margin-bottom: 5px; font-size: 9pt; display: flex; align-items: center; gap: 5px;"><input type="checkbox" value="' + inst.id + '"> ' + inst.title + ' (S:' + inst.score + ')</div>');
                var cb = item.find('input');
                cb.change(function () {
                    if ($(this).is(':checked')) bundleSelection.push(inst.id);
                    else bundleSelection = bundleSelection.filter(function (id) { return id !== inst.id; });
                    updateEstimates();
                });
                options.append(item);
            });
        }

        var sizeRow = $('<div style="margin-bottom: 20px;"></div>');
        sizeRow.append('<div style="font-weight: bold; margin-bottom: 8px;">Select Project Size:</div>');
        ["Small", "Medium", "Large", "AAA"].forEach(function (s) {
            var sBtn = $('<div class="entry-type-btn ' + (s === size ? "selected" : "") + '">' + s + '</div>');
            sBtn.css('background', s === size ? "#d35400" : "#bdc3c7").css('color', s === size ? "white" : "#2c3e50");
            sBtn.click(function () {
                size = s;
                sizeRow.find('.entry-type-btn').removeClass('selected').css('background', '#bdc3c7').css('color', '#2c3e50');
                $(this).addClass('selected').css('background', '#d35400').css('color', 'white');
                updateEstimates();
            });
            sizeRow.append(sBtn);
        });
        mBody.append(sizeRow);

        var estimates = $('<div style="background: #fdfdfd; padding: 15px; border-radius: 8px; border: 1px solid #bdc3c7; margin-bottom: 20px;"></div>');
        var costTxt = $('<div>Cost: <b>$0</b></div>');
        var scoreTxt = $('<div>Expected Score: <b>0-0</b></div>');
        estimates.append(costTxt).append(scoreTxt);
        mBody.append(estimates);

        function updateEstimates() {
            var bCount = (type === "bundle") ? bundleSelection.length : 1;
            var cost = getEntryTypeCost(type, size, franchise, bCount);
            costTxt.find('b').text('$' + UI.getShortNumberString(cost));

            if (type === "bundle" && bundleSelection.length > 0) {
                var tot = 0;
                bundleSelection.forEach(function (bid) {
                    var inst = franchise.installments.filter(function (i) { return i.id === bid; })[0];
                    tot += (inst ? inst.score : 5);
                });
                var avg = tot / bundleSelection.length;
                scoreTxt.find('b').text((avg - 1).toFixed(1) + " - " + (avg + 1).toFixed(1));
            } else {
                var scoreRange = estimateFranchiseEntryScore(franchise, type, size);
                scoreTxt.find('b').text(scoreRange.min.toFixed(1) + " - " + scoreRange.max.toFixed(1));
            }
        }
        updateEstimates();

        var confirmBox = $('<div style="display: flex; flex-direction: column; gap: 10px;"></div>');
        var internalBtn = $('<div class="selectorButton orangeButton" style="text-align: center; padding: 10px 0; font-size: 11pt; font-weight: bold;">Develop Internally</div>');
        internalBtn.click(function () {
            var bCount = (type === "bundle") ? bundleSelection.length : 1;
            if (type === "bundle" && bCount < 2) { alert("Select at least 2 games for a bundle!"); return; }
            var cost = getEntryTypeCost(type, size, franchise, bCount);
            if (GameManager.company.cash < cost) { alert("Not enough cash!"); return; }
            var entry = { franchiseId: franchise.id, entryType: type, size: size, bundledIds: (type === "bundle" ? bundleSelection : null) };
            if (type === "bundle") {
                var tot = 0;
                bundleSelection.forEach(function (bid) {
                    var inst = franchise.installments.filter(function (i) { return i.id === bid; })[0];
                    tot += (inst ? inst.score : 5);
                });
                entry.bundleBaseScore = tot / bundleSelection.length;
            }
            store.data.activePlayerFranchiseProject = entry;
            GameManager.company.adjustCash(-cost, "Franchise Project Cost: " + franchise.name);
            GameManager.company.notifications.push(new Notification({ header: "Franchise Project Prep", text: "Internal development starting for " + franchise.name + ". The next game you start will use these franchise settings!", image: "" }));
            onBack();
        });
        confirmBox.append(internalBtn);

        var studiosArr = store.data.studios || [];
        var subs = studiosArr.filter(function (s) { return s.sharesOwned >= 50 && !s.currentProject; });
        var subDiv = $('<div style="border: 1px solid #bdc3c7; padding: 10px; border-radius: 5px; background: rgba(255,255,255,0.5);"></div>');
        subDiv.append('<div style="font-size: 9pt; font-weight: bold; margin-bottom: 5px;">Develop in Subsidiary:</div>');
        if (subs.length === 0) {
            subDiv.append('<div style="font-size: 9pt; color: #7f8c8d;">No idle subsidiaries available.</div>');
        } else {
            var subSelect = $('<select style="width: 100%; padding: 5px; margin-bottom: 8px; color: black;"></select>');
            subs.forEach(function (s) { subSelect.append('<option value="' + s.id + '">' + s.name + '</option>'); });
            subDiv.append(subSelect);
            var subBtn = $('<div class="selectorButton greenButton" style="text-align: center; padding: 6px 0; font-size: 10pt;">Assign to Studio</div>');
            subBtn.click(function () {
                var bCount = (type === "bundle") ? bundleSelection.length : 1;
                if (type === "bundle" && bCount < 2) { alert("Select at least 2 games for a bundle!"); return; }
                var cost = getEntryTypeCost(type, size, franchise, bCount);
                if (GameManager.company.cash < cost) { alert("Not enough cash!"); return; }
                var studioId = subSelect.val();
                var studio = studiosArr.filter(function (s) { return s.id === studioId; })[0];
                if (!studio) return;
                GameManager.company.adjustCash(-cost, "Franchise Project Cost: " + franchise.name);
                var bIds = (type === "bundle" ? bundleSelection : null);
                var bScore = 0;
                if (type === "bundle") {
                    var tot = 0;
                    bundleSelection.forEach(function (bid) {
                        var inst = franchise.installments.filter(function (i) { return i.id === bid; })[0];
                        tot += (inst ? inst.score : 5);
                    });
                    bScore = tot / bundleSelection.length;
                }
                startSubsidiaryFranchiseProject(studio, franchise, type, size, bIds, bScore);
                onBack();
            });
            subDiv.append(subBtn);
        }
        confirmBox.append(subDiv);

        var pubBtn = $('<div class="selectorButton blueButton" style="text-align: center; padding: 10px 0; font-size: 11pt; font-weight: bold;">Create Publishing Offer</div>');
        pubBtn.click(function () {
            routeModMenu("publishing");
            renderPublishingForm($('#modUI_content'), { title: franchise.name + " " + type.toUpperCase(), topic: franchise.topic, genre: franchise.genre, size: size, franchiseId: franchise.id, entryType: type });
        });
        confirmBox.append(pubBtn);

        mBody.append(confirmBox);
        modal.append(mBody);
        container.append(modal);
    }

    function showLicenseModal(franchise, container, onBack) {
        container.empty();
        var modal = $('<div style="background: #fdf6e3; padding: 20px; min-height: 400px;"></div>');
        modal.append('<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">' +
            '<h3 style="color: #d35400; margin: 0;">License ' + franchise.name + '</h3>' +
            '<div id="lic-modal-back" style="cursor: pointer; font-size: 10pt; background: #bdc3c7; color: #2c3e50; padding: 5px 10px; border-radius: 4px; font-weight: bold;">&lt; BACK</div>' +
            '</div>');
        modal.find('#lic-modal-back').click(onBack);

        modal.append('<p style="font-size: 10pt; color: #2c3e50;">Choose a subsidiary to develop the next franchise entry.</p>');

        var studiosArrLic = store.data.studios || [];
        var subs = studiosArrLic.filter(function (s) { return s.sharesOwned >= 50; });
        if (subs.length === 0) {
            modal.append('<p style="color:#7f8c8d;">No subsidiaries available.</p>');
        } else {
            var select = $('<select style="width: 100%; padding: 10px; margin-bottom: 20px; color: black;"></select>');
            subs.forEach(function (s) {
                var label = s.name + (s.currentProject ? " (Busy)" : " (Idle)");
                select.append('<option value="' + s.id + '">' + label + '</option>');
            });
            modal.append(select);

            var type = "sequel";
            var bundleSelection = [];

            var bundleList = $('<div style="display: none; margin-bottom: 20px; background: #eee; padding: 15px; border-radius: 8px; border: 1px solid #bdc3c7;"><b>Bundle Collection:</b><div id="lic-bundle-options" style="margin-top: 10px; max-height: 150px; overflow-y: auto;"></div></div>');

            var typeSelect = $('<select style="width: 100%; padding: 10px; margin-bottom: 20px; color: black;"></select>');
            ["sequel", "remaster", "remake", "spinoff", "prequel", "bundle"].forEach(function (t) {
                var can = canAddFranchiseEntry(franchise, t, true);
                if (can.ok) typeSelect.append('<option value="' + t + '">' + t.toUpperCase() + '</option>');
            });
            modal.append(typeSelect);
            modal.append(bundleList);

            typeSelect.change(function () {
                type = $(this).val();
                if (type === "bundle") {
                    bundleList.show();
                    refreshLicBundleOptions();
                } else {
                    bundleList.hide();
                }
            });

            function refreshLicBundleOptions() {
                var options = bundleList.find('#lic-bundle-options').empty();
                franchise.installments.slice().reverse().forEach(function (inst) {
                    if (inst.type === "soundtrack" || inst.beingRemade) return;
                    var item = $('<div style="margin-bottom: 5px; font-size: 9pt; display: flex; align-items: center; gap: 5px; color: #2c3e50;"><input type="checkbox" value="' + inst.id + '"> ' + inst.title + ' (S:' + inst.score + ')</div>');
                    var cb = item.find('input');
                    cb.change(function () {
                        if ($(this).is(':checked')) bundleSelection.push(inst.id);
                        else bundleSelection = bundleSelection.filter(function (id) { return id !== inst.id; });
                    });
                    options.append(item);
                });
            }

            var sizeSelect = $('<select style="width: 100%; padding: 10px; margin-bottom: 20px; color: black;"></select>');
            ["Small", "Medium", "Large", "AAA"].forEach(function (s) { sizeSelect.append('<option value="' + s + '">' + s + '</option>'); });
            modal.append(sizeSelect);

            var btn = $('<div class="selectorButton greenButton" style="text-align:center; padding: 10px 0;">Assign to Studio</div>');
            btn.click(function () {
                var sId = select.val();
                var s = studiosArrLic.filter(function (st) { return st.id === sId; })[0];
                type = typeSelect.val();
                var size = sizeSelect.val();

                var bCount = (type === "bundle") ? bundleSelection.length : 1;
                if (type === "bundle" && bCount < 2) { alert("Select at least 2 games for a bundle!"); return; }

                if (s.currentProject && !confirm(s.name + " is currently busy with '" + (s.currentProject.title || s.currentProject.name) + "'. Assigning a new project will cancel the current one. Proceed?")) return;

                if (s.currentProject && s.currentProject.isPublishedByPlayer && store.data.publishingProjects) {
                    for (var p = 0; p < store.data.publishingProjects.length; p++) {
                        if (store.data.publishingProjects[p].id === s.currentProject.id) {
                            store.data.publishingProjects.splice(p, 1);
                            break;
                        }
                    }
                }

                var fee = (franchise.tier === 1) ? 10000 : (franchise.tier === 2) ? 25000 : (franchise.tier === 3) ? 50000 : (franchise.tier === 4) ? 100000 : 250000;
                if (GameManager.company.cash < fee) { alert("Not enough cash for license fee ($" + UI.getShortNumberString(fee) + ")!"); return; }
                GameManager.company.adjustCash(-fee, "Franchise License Fee: " + franchise.name);

                var bIds = (type === "bundle" ? bundleSelection : null);
                var bScore = 0;
                if (type === "bundle") {
                    var tot = 0;
                    bundleSelection.forEach(function (bid) {
                        var inst = franchise.installments.filter(function (i) { return i.id === bid; })[0];
                        tot += (inst ? inst.score : 5);
                    });
                    bScore = tot / bundleSelection.length;
                }

                startSubsidiaryFranchiseProject(s, franchise, type, size, bIds, bScore);
                onBack();
            });
            modal.append(btn);
        }
        container.append(modal);
    }

    function showPitchModal(studio, container, onBack) {
        container.empty();
        var modal = $('<div style="background: #fdf6e3; padding: 20px; min-height: 400px; color: #2c3e50;"></div>');
        modal.append('<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">' +
            '<h3 style="color: #d35400; margin: 0;">Pitch to ' + studio.name + '</h3>' +
            '<div id="pitch-modal-back" style="cursor: pointer; font-size: 10pt; background: #bdc3c7; color: #2c3e50; padding: 5px 10px; border-radius: 4px; font-weight: bold;">&lt; BACK</div>' +
            '</div>');
        modal.find('#pitch-modal-back').click(onBack);

        modal.append('<p style="font-size: 10pt;">Studio covers ' + (studio.totalDealsCompleted >= 3 ? "50" : "60") + '% of costs but keeps same % of revenue.</p>');

        var fans = getPlayerFranchises().filter(function (f) { return f.tier >= 3; });
        if (fans.length === 0) {
            modal.append('<div style="background: #eee; padding: 20px; border-radius: 8px; text-align: center; margin-top: 20px;">' +
                '<p style="color: #c0392b; font-weight: bold;">No eligible franchises found!</p>' +
                '<p style="font-size: 9pt;">You need at least one <b>Tier 3</b> franchise to pitch a major movie production.</p>' +
                '</div>');
        } else {
            var fSelect = $('<select style="width: 100%; padding: 10px; margin-bottom: 15px; color: black;"></select>');
            fans.forEach(function (f) { fSelect.append('<option value="' + f.id + '">' + f.name + ' (Tier ' + f.tier + ')</option>'); });
            modal.append(fSelect);

            var budgetInput = $('<input type="number" value="2000000" style="width: 100%; padding: 10px; margin-bottom: 20px; color: black; border: 1px solid #bdc3c7;">');
            modal.append('<div style="font-weight: bold; margin-bottom: 5px;">Budget (Total):</div>').append(budgetInput);

            var btn = $('<div class="selectorButton orangeButton" style="text-align:center; padding: 12px 0; font-weight: bold;">Send Pitch</div>');
            btn.click(function () {
                var fId = fSelect.val();
                if (!fId) { alert("Please select a franchise first!"); return; }
                var f = getFranchiseById(fId);
                if (!f) { alert("Error identifying franchise."); onBack(); return; }

                var budget = parseInt(budgetInput.val());
                var pShare = studio.totalDealsCompleted >= 3 ? 0.5 : 0.4;
                var playerCost = budget * pShare;

                if (GameManager.company && GameManager.company.cash < playerCost) { alert("Not enough cash!"); return; }

                var weeks = Math.floor(budget / 100000) + 8;
                var p = {
                    id: "MEDIA_" + Date.now(),
                    type: "movie",
                    franchiseId: fId,
                    title: f.name + " Blockbuster",
                    producedBy: studio.id,
                    budget: budget,
                    playerCost: playerCost,
                    weeksRemaining: weeks,
                    totalWeeks: weeks,
                    status: "inProduction",
                    score: 0,
                    totalRevenue: 0,
                    weeklyRevenue: 0,
                    salesWeeksLeft: 0,
                    studioRepBonus: studio.reputation * 0.3,
                    studioShare: 1.0 - pShare
                };
                studio.currentDeal = p;
                if (!store.data.mediaProjects) store.data.mediaProjects = [];
                store.data.mediaProjects.push(p);
                GameManager.company.adjustCash(-playerCost, "Studio Pitch Deal: " + studio.name);
                onBack();
            });
            modal.append(btn);
        }
        container.append(modal);
    }
    function showCrossoverModal(container, onBack) {
        var currentWeek = Math.floor(GameManager.company.currentWeek);
        if (currentWeek - store.data.lastCrossoverWeek < 20) {
            alert("Crossover events are on cooldown (20 weeks). Remaining: " + (20 - (currentWeek - store.data.lastCrossoverWeek)) + " weeks.");
            return;
        }

        container.empty();
        var modal = $('<div style="background: #fdf6e3; padding: 20px; min-height: 400px; color: #2c3e50;"></div>');
        modal.append('<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">' +
            '<h3 style="color: #d35400; margin: 0;">Legendary Crossover</h3>' +
            '<div id="cross-modal-back" style="cursor: pointer; font-size: 10pt; background: #bdc3c7; color: #2c3e50; padding: 5px 10px; border-radius: 4px; font-weight: bold;">&lt; BACK</div>' +
            '</div>');
        modal.find('#cross-modal-back').click(onBack);

        modal.append('<p style="font-size: 10pt;">Combine two Tier 5 franchises into a cultural phenomenon! Cost: $3,000,000.</p>');

        var tier5s = getPlayerFranchises().filter(function (f) { return f.tier === 5; });
        var sel1 = $('<select style="width: 45%; padding: 10px; color: black;"></select>');
        var sel2 = $('<select style="width: 45%; padding: 10px; margin-left: 5%; color: black;"></select>');
        tier5s.forEach(function (f, i) {
            sel1.append('<option value="' + f.id + '">' + f.name + '</option>');
            sel2.append('<option value="' + f.id + '" ' + (i === 1 ? "selected" : "") + '>' + f.name + '</option>');
        });
        modal.append(sel1).append(sel2);

        var btn = $('<div class="selectorButton orangeButton" style="text-align:center; padding: 12px 0; margin-top: 20px; font-weight: bold;">Launch Event</div>');
        btn.click(function () {
            var f1 = getFranchiseById(sel1.val());
            var f2 = getFranchiseById(sel2.val());
            if (f1.id === f2.id) { alert("Must select two different franchises!"); return; }
            if (GameManager.company.cash < 3000000) { alert("Not enough cash!"); return; }

            GameManager.company.adjustCash(-3000000, "Crossover Event: " + f1.name + " x " + f2.name);
            store.data.lastCrossoverWeek = currentWeek;

            var score = Math.min(10, Math.floor((f1.fanbaseScore + f2.fanbaseScore) / 20));
            var revenue = score * score * 5000000;
            GameManager.company.adjustCash(revenue, "Crossover Revenue");

            f1.fanbaseScore = Math.min(100, f1.fanbaseScore + 10);
            f2.fanbaseScore = Math.min(100, f2.fanbaseScore + 10);

            GameManager.company.notifications.push(new Notification({
                header: "Cultural Phenomenon!",
                text: "The crossover between " + f1.name + " and " + f2.name + " sent shockwaves through the industry!",
                image: ""
            }));

            onBack();
        });
        modal.append(btn);
        container.append(modal);
    }

    function showConfirmSellModal(franchise, container, onBack, onConfirm) {
        container.empty();
        var modal = $('<div style="background: #fdf6e3; padding: 30px; border-radius: 8px; text-align: center; color: #2c3e50;"></div>');
        modal.append('<h3 style="color: #d35400;">Sell Franchise?</h3>');
        modal.append('<p>Listing <b>' + franchise.name + '</b> for sale will take 8-16 weeks. During this time, you cannot start new entries.</p>');
        modal.append('<p style="font-size: 9pt; color: #7f8c8d;">Are you sure you want to proceed?</p>');

        var btnRow = $('<div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;"></div>');
        var yesBtn = $('<div class="selectorButton orangeButton" style="flex: 1; padding: 10px 0; font-weight: bold;">Yes, List it</div>');
        var noBtn = $('<div class="selectorButton" style="flex: 1; padding: 10px 0; background: #bdc3c7; color: #2c3e50;">Cancel</div>');

        yesBtn.click(onConfirm);
        noBtn.click(onBack);

        btnRow.append(yesBtn).append(noBtn);
        modal.append(btnRow);
        container.append(modal);
    }

    function renderFranchisesTab(container) {
        var subTab = "my"; 

        function refresh() {
            container.empty();

            
            var subHeader = $('<div style="display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 2px solid #bdc3c7; padding-bottom: 10px;"></div>');
            var tabs = [
                { id: "my", label: "My Franchises" },
                { id: "register", label: "Create / Register" },
                { id: "acquisitions", label: "Acquisitions" }
            ];

            tabs.forEach(function (t) {
                var btn = $('<div class="entry-type-btn ' + (subTab === t.id ? "selected" : "") + '" style="background: ' + (subTab === t.id ? "#d35400" : "#bdc3c7") + '; color: white; flex: 1; text-align: center; cursor: pointer;">' + t.label + '</div>');
                btn.click(function () { subTab = t.id; Sound.click(); refresh(); });
                subHeader.append(btn);
            });

            var tier5s = getPlayerFranchises().filter(function (f) { return f.tier === 5; });
            if (tier5s.length >= 2) {
                var crossBtn = $('<div class="entry-type-btn fran-tier-5" style="border: 2px solid gold; flex: 1; text-align: center; cursor: pointer;">★ CROSSOVER ★</div>');
                crossBtn.click(function () { showCrossoverModal(container, refresh); });
                subHeader.append(crossBtn);
            }

            container.append(subHeader);

            if (subTab === "my") {
                var fans = getPlayerFranchises();
                if (fans.length === 0) {
                    container.append('<div style="text-align: center; padding: 40px; color: #7f8c8d; font-style: italic;">You don\'t own any franchises yet. Go to "Create / Register" to start one!</div>');
                }
                fans.forEach(function (f) {
                    var card = $('<div class="cs-stagger-item" style="background: white; border-radius: 8px; border: 1px solid #bdc3c7; padding: 15px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);"></div>');

                    var header = $('<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;"></div>');
                    var nameInput = $('<input type="text" value="' + f.name + '" style="font-size: 14pt; font-weight: bold; border: none; background: transparent; color: #2c3e50; border-bottom: 1px dashed #bdc3c7; width: 60%;">');
                    nameInput.change(function () { f.name = $(this).val(); });
                    header.append(nameInput);
                    header.append(renderTierBadge(f.tier));
                    card.append(header);

                    var stats = $('<div style="display: flex; gap: 20px; font-size: 10pt; color: #7f8c8d; margin-bottom: 10px;"></div>');
                    stats.append('<div><b>Total Revenue:</b> $' + UI.getShortNumberString(f.totalRevenue) + '</div>');
                    stats.append('<div><b>Installments:</b> ' + f.installments.length + '</div>');
                    card.append(stats);

                    card.append('<div style="font-size: 9pt; font-weight: bold; color: #34495e; margin-bottom: 4px;">Fanbase Score: ' + Math.floor(f.fanbaseScore) + '/100</div>');
                    card.append(renderFanbaseBar(f.fanbaseScore));

                    var actions = $('<div style="display: flex; gap: 10px; margin-top: 15px;"></div>');
                    var newEntryBtn = $('<div class="selectorButton orangeButton" style="flex: 1; text-align: center; font-size: 10pt; padding: 6px 0;">+ New Entry</div>');
                    newEntryBtn.click(function () { showNewEntryModal(f, container, refresh); });

                    var licenseBtn = $('<div class="selectorButton greenButton" style="flex: 1; text-align: center; font-size: 10pt; padding: 6px 0;">License to Subsidiary</div>');
                    licenseBtn.click(function () { showLicenseModal(f, container, refresh); });

                    actions.append(newEntryBtn).append(licenseBtn);

                    if (f.fanbaseScore <= 0) {
                        var reviveBtn = $('<div class="selectorButton" style="flex: 1; text-align: center; font-size: 10pt; padding: 6px 0; background: #95a5a6; color: white;">Revive ($1M)</div>');
                        reviveBtn.click(function () {
                            if (GameManager.company.cash < 1000000) { alert("Not enough cash!"); return; }
                            GameManager.company.adjustCash(-1000000, "Franchise Revival: " + f.name);
                            f.fanbaseScore = 15;
                            f.isDead = false;
                            Sound.click();
                            refresh();
                        });
                        actions.append(reviveBtn);
                    }

                    var sellBtn = $('<div class="selectorButton deleteButton" style="flex: 1; text-align: center; font-size: 10pt; padding: 6px 0;">Sell</div>');
                    sellBtn.click(function () {
                        if (f.isListedByPlayer) return;
                        var price = Math.floor(f.totalRevenue * 0.6 + 1000000);
                        showConfirmSellModal(f, container, refresh, function () {
                            f.isListedByPlayer = true;
                            f.playerSalePrice = price;
                            f.saleWeekRemaining = 8 + Math.floor(Math.random() * 9);
                            Sound.click();
                            refresh();
                        });
                    });
                    if (f.isListedByPlayer) sellBtn.addClass('disabled').text("Listed (" + f.saleWeekRemaining + "w)");
                    actions.append(sellBtn);

                    card.append(actions);

                    
                    var historyBtn = $('<div style="text-align: center; font-size: 9pt; color: #3498db; cursor: pointer; margin-top: 10px; text-decoration: underline;">View History</div>');
                    var historyList = $('<div style="display: none; margin-top: 10px; border-top: 1px solid #eee; padding-top: 10px;"></div>');
                    f.installments.slice().reverse().forEach(function (inst) {
                        historyList.append('<div style="font-size: 9pt; display: flex; justify-content: space-between; margin-bottom: 4px;"><span>' + inst.title + ' (' + inst.type + ')</span><span>' + inst.score + '/10</span></div>');
                    });
                    historyBtn.click(function () { historyList.toggle(); });
                    card.append(historyBtn).append(historyList);

                    container.append(card);
                });
            } else if (subTab === "register") {
                container.append('<h3 style="color: #d35400; margin-top: 0;">Register New Franchise</h3>');
                container.append('<p style="font-size: 10pt; color: #7f8c8d;">Turn a successful standalone game into a full franchise. Standard registration cost: $500,000 per existing franchise.</p>');

                var games = GameManager.company.gameLog.filter(function (g) { return !getFranchiseForGame(g.id); });
                var cost = 500000 * (getPlayerFranchises().length + 1);

                if (games.length === 0) {
                    container.append('<div style="padding: 20px; text-align: center; color: #7f8c8d;">No eligible games found.</div>');
                } else {
                    var select = $('<select style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #bdc3c7; font-size: 11pt; margin-bottom: 15px; color: black;"></select>');
                    games.forEach(function (g) { select.append('<option value="' + g.id + '">' + g.title + ' (Score: ' + g.score + ')</option>'); });
                    container.append(select);

                    container.append('<div style="font-weight: bold; margin-bottom: 5px;">Franchise Name:</div>');
                    var nameInput = $('<input type="text" placeholder="Enter Name" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #bdc3c7; font-size: 11pt; margin-bottom: 15px; color: black;">');
                    container.append(nameInput);

                    var regBtn = $('<div class="selectorButton orangeButton" style="text-align: center; padding: 12px 0; font-size: 12pt; font-weight: bold;">Register for $' + UI.getShortNumberString(cost) + '</div>');
                    regBtn.click(function () {
                        var game = GameManager.company.getGameById(select.val());
                        if (!game) return;
                        var name = nameInput.val() || game.title;
                        var fransArr = store.data.franchises || [];
                        var exists = fransArr.some(function (fr) { return fr.name.toLowerCase() === name.toLowerCase(); });
                        if (exists) { alert("A franchise with this name already exists!"); return; }

                        if (GameManager.company.cash < cost) { alert("Not enough cash!"); return; }
                        var f = {
                            id: "FRAN_" + Date.now(),
                            name: name,
                            ownerId: "player",
                            originGameId: game.id,
                            originGameTitle: game.title,
                            topic: game.topic.name,
                            genre: game.genre.name,
                            tier: 1,
                            totalRevenue: game.totalSalesCash,
                            installments: [{
                                id: "FE_" + Date.now(),
                                type: "original",
                                title: game.title,
                                gameId: game.id,
                                producedBy: "player",
                                score: game.score,
                                revenue: game.totalSalesCash,
                                releaseWeek: game.releaseWeek,
                                size: "N/A"
                            }],
                            fanbaseScore: Math.min(100, game.score * 7),
                            lastEntryWeek: game.releaseWeek,
                            isForSale: false,
                            salePrice: 0,
                            licenseOffers: [],
                            acquisitionHistory: [],
                            mediaProperties: []
                        };
                        store.data.franchises.push(f);
                        GameManager.company.adjustCash(-cost, "Franchise Registration: " + f.name);
                        Sound.click();
                        subTab = "my";
                        refresh();
                    });
                    container.append(regBtn);
                }
            } else if (subTab === "acquisitions") {
                var forSale = getAIFranchises().filter(function (f) { return f.isForSale; });
                container.append('<h3 style="color: #d35400; margin-top: 0;">Available for Acquisition</h3>');
                if (forSale.length === 0) {
                    container.append('<div style="text-align: center; padding: 40px; color: #7f8c8d;">No franchises currently listed for sale by competitors.</div>');
                }
                forSale.forEach(function (f) {
                    var card = $('<div class="cs-stagger-item" style="background: white; border-radius: 8px; border: 1px solid #bdc3c7; padding: 15px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);"></div>');
                    card.append('<div style="display: flex; justify-content: space-between;"><b>' + f.name + '</b>' + renderTierBadge(f.tier).prop('outerHTML') + '</div>');
                    var sArrAcq = store.data.studios || [];
                    var owner = sArrAcq.filter(function (s) { return s.id === f.ownerId; })[0];
                    card.append('<div style="font-size: 9pt; color: #7f8c8d; margin-top: 5px;">Seller: ' + (owner ? owner.name : "Unknown") + '</div>');
                    card.append('<div style="font-size: 10pt; margin-top: 10px;">Price: <b>$' + UI.getShortNumberString(f.salePrice) + '</b></div>');

                    var buyBtn = $('<div class="selectorButton greenButton" style="width: 100%; text-align: center; margin-top: 12px; padding: 8px 0;">Acquire Franchise</div>');
                    buyBtn.click(function () {
                        if (GameManager.company.cash < f.salePrice) { alert("Not enough cash!"); return; }
                        GameManager.company.adjustCash(-f.salePrice, "Franchise Acquisition: " + f.name);
                        f.ownerId = "player";
                        f.isForSale = false;
                        Sound.click();
                        refresh();
                    });
                    card.append(buyBtn);
                    container.append(card);
                });

                
                var aiOffers = store.data.franchises.filter(function (f) { return f.ownerId !== "player" && f.isForSale; });
                if (aiOffers.length > 0) {
                    container.append('<h3 style="color: #d35400; margin-top: 0;">Active AI Sale Offers</h3>');
                    aiOffers.forEach(function (f) {
                        var salePrice = f.salePrice || (f.totalRevenue * 0.8 + 2000000);
                        var offerCard = $('<div class="cs-stagger-item" style="background: white; border-radius: 8px; border: 1px solid #bdc3c7; padding: 15px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;"></div>');
                        var owner = (store.data.studios || []).filter(function (s) { return s.id === f.ownerId; })[0];
                        var info = $('<div><b style="font-size: 13pt;">' + f.name + '</b><br><span style="font-size: 9pt; color: #7f8c8d;">Owner: ' + (owner ? owner.name : "AI") + ' | Tier: ' + f.tier + '</span></div>');
                        offerCard.append(info);

                        var buyBtn = $('<div class="selectorButton greenButton" style="padding: 10px 20px; font-weight: bold;">Buy ($' + UI.getShortNumberString(salePrice) + ')</div>');
                        buyBtn.click(function () {
                            if (GameManager.company.cash < salePrice) { alert("Not enough cash!"); return; }
                            GameManager.company.adjustCash(-salePrice, "Acquired Franchise: " + f.name);
                            f.ownerId = "player";
                            f.isForSale = false;
                            GameManager.company.notifications.push(new Notification({
                                header: "Acquisition Complete!",
                                text: "You are now the proud owner of the " + f.name + " franchise.",
                                image: ""
                            }));
                            refresh();
                        });
                        offerCard.append(buyBtn);
                        container.append(offerCard);
                    });
                }

                
                container.append('<h3 style="color: #d35400; ' + (aiOffers.length > 0 ? "margin-top: 30px;" : "margin-top:0;") + '">Propose Custom Offer</h3>');
                var unlisted = getAIFranchises().filter(function (f) { return !f.isForSale; });
                if (unlisted.length === 0) {
                    container.append('<div style="text-align: center; color: #7f8c8d; padding: 20px;">No other AI franchises available for offer.</div>');
                } else {
                    var offerDiv = $('<div style="background: white; border-radius: 8px; border: 1px solid #bdc3c7; padding: 15px;"></div>');
                    var fSelect = $('<select style="width: 100%; padding: 10px; margin-bottom: 15px; color: black; border: 1px solid #bdc3c7;"></select>');
                    unlisted.forEach(function (f) {
                        var sArrUnl = store.data.studios || [];
                        var owner = sArrUnl.filter(function (s) { return s.id === f.ownerId; })[0];
                        fSelect.append('<option value="' + f.id + '">' + f.name + ' (' + (owner ? owner.name : "AI") + ')</option>');
                    });
                    offerDiv.append('<div style="font-size: 9pt; font-weight: bold; margin-bottom: 5px;">Select Target:</div>').append(fSelect);

                    var priceInput = $('<input type="number" placeholder="Offer Amount ($)" style="width: 100%; padding: 10px; margin-bottom: 15px; color: black; border: 1px solid #bdc3c7;">');
                    offerDiv.append('<div style="font-size: 9pt; font-weight: bold; margin-bottom: 5px;">Your Offer (Weight based on revenue):</div>').append(priceInput);

                    var offerBtn = $('<div class="selectorButton orangeButton" style="width: 100%; text-align: center; padding: 12px 0; font-weight: bold;">Submit Proactive Offer</div>');
                    offerBtn.click(function () {
                        var f = getFranchiseById(fSelect.val());
                        var price = parseInt(priceInput.val());
                        if (isNaN(price) || price <= 0) { alert("Invalid price!"); return; }
                        if (GameManager.company.cash < price) { alert("Not enough cash!"); return; }

                        
                        var thresh = f.totalRevenue * 1.5 + 2000000;
                        if (price >= thresh && Math.random() < 0.40) {
                            GameManager.company.adjustCash(-price, "Acquisition: " + f.name);
                            f.ownerId = "player";
                            f.isForSale = false;
                            GameManager.company.notifications.push(new Notification({
                                header: "Offer Accepted!",
                                text: "The studio accepted your proactive offer for '" + f.name + "'.",
                                image: ""
                            }));
                            refresh();
                        } else {
                            alert("The studio has rejected your offer.");
                        }
                    });
                    offerDiv.append(offerBtn);
                    container.append(offerDiv);
                }
            }
        }


        refresh();
    }

    function renderMediaTab(container) {
        var subTab = "active"; 

        function refresh() {
            container.empty();

            var subHeader = $('<div style="display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 2px solid #bdc3c7; padding-bottom: 10px;"></div>');
            var tabs = [
                { id: "active", label: "Active Projects" },
                { id: "produce", label: "Produce New" },
                { id: "archive", label: "Archive" }
            ];

            tabs.forEach(function (t) {
                var btn = $('<div class="entry-type-btn ' + (subTab === t.id ? "selected" : "") + '" style="background: ' + (subTab === t.id ? "#d35400" : "#bdc3c7") + '; color: white; flex: 1; text-align: center;">' + t.label + '</div>');
                btn.click(function () { subTab = t.id; Sound.click(); refresh(); });
                subHeader.append(btn);
            });
            container.append(subHeader);

            if (subTab === "active") {
                var mediaArr = store.data.mediaProjects || [];
                var active = mediaArr.filter(function (p) { return p.status === "inProduction"; });
                if (active.length === 0) {
                    container.append('<div style="text-align: center; padding: 40px; color: #7f8c8d;">No media projects currently in production.</div>');
                }
                active.forEach(function (p) {
                    var card = $('<div class="cs-stagger-item" style="background: #ffffff; border-radius: 12px; border: 1px solid #dee2e6; padding: 18px; margin-bottom: 18px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); position: relative; overflow: hidden;"></div>');
                    var icons = { "movie": "🎬", "tvSeries": "📺", "animatedShow": "[Art]", "soundtrack": "🎵", "merchandise": "👕", "comicBook": "📚" };

                    var header = $('<div style="display: flex; justify-content: space-between; align-items: start;"></div>');
                    header.append('<div style="font-size: 15pt; color: #212529;"><b>' + (icons[p.type] || "🎬") + ' ' + p.title + '</b></div>');

                    var f = p.franchiseId ? getFranchiseById(p.franchiseId) : null;
                    if (f) header.append('<div style="background: rgba(211, 84, 0, 0.1); color: #d35400; padding: 4px 8px; border-radius: 4px; font-size: 9pt; font-weight: bold;">' + f.name.toUpperCase() + '</div>');
                    card.append(header);

                    var progress = ((p.totalWeeks - p.weeksRemaining) / p.totalWeeks) * 100;
                    card.append('<div style="margin-top: 15px; font-size: 10pt; color: #495057; display: flex; justify-content: space-between;"><span>Production Progress</span><span>' + Math.floor(progress) + '%</span></div>');
                    card.append('<div class="cs-progress-track" style="background: #e9ecef; height: 10px; border-radius: 5px; margin-top: 5px; overflow: hidden;"><div class="cs-progress-fill" style="width: ' + progress + '%; height: 100%; background: #f39c12; transition: width 0.5s ease;"></div></div>');

                    var stats = $('<div style="margin-top: 15px; display: flex; gap: 20px; font-size: 9pt; color: #6c757d;"></div>');
                    stats.append('<div>Budget: <b>$' + UI.getShortNumberString(p.budget) + '</b></div>');
                    stats.append('<div>Time Left: <b>' + p.weeksRemaining + ' weeks</b></div>');
                    card.append(stats);

                    var cancelBtn = $('<div style="position: absolute; bottom: 12px; right: 15px;"><span style="color: #adb5bd; cursor: pointer; font-size: 8pt; text-decoration: underline; transition: color 0.2s;">Cancel Project</span></div>');
                    cancelBtn.hover(function () { $(this).css('color', '#e74c3c'); }, function () { $(this).css('color', '#adb5bd'); });
                    cancelBtn.click(function () {
                        if (confirm("Cancel this production? You will only be refunded 30% of the budget.")) {
                            GameManager.company.adjustCash(p.budget * 0.3, "Media Cancellation Refund");
                            p.status = "cancelled";
                            Sound.click();
                            refresh();
                        }
                    });
                    card.append(cancelBtn);
                    container.append(card);
                });
            } else if (subTab === "produce") {
                container.append('<h3 style="color: #d35400; margin-top: 0;">New Media Production</h3>');

                var form = $('<div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #bdc3c7;"></div>');

                form.append('<div style="font-weight: bold; margin-bottom: 5px;">Type:</div>');
                var typeSelect = $('<select style="width: 100%; padding: 10px; margin-bottom: 15px;"></select>');
                var types = [
                    { id: "movie", label: "Feature Film ($1M+)", min: 1000000 },
                    { id: "tvSeries", label: "TV Series ($500K+)", min: 500000 },
                    { id: "animatedShow", label: "Animated Show ($300K+)", min: 300000 },
                    { id: "soundtrack", label: "Soundtrack ($50K+)", min: 50000 },
                    { id: "merchandise", label: "Merchandise Line ($250K+)", min: 250000 },
                    { id: "comicBook", label: "Comic Book Series ($25K+)", min: 25000 }
                ];
                types.forEach(function (t) { typeSelect.append('<option value="' + t.id + '">' + t.label + '</option>'); });
                form.append(typeSelect);

                form.append('<div style="font-weight: bold; margin-bottom: 5px;">Franchise:</div>');
                var fSelect = $('<select style="width: 100%; padding: 10px; margin-bottom: 15px;"></select>');
                fSelect.append('<option value="">Original IP (No Franchise)</option>');
                getPlayerFranchises().forEach(function (f) { fSelect.append('<option value="' + f.id + '">' + f.name + ' (Tier ' + f.tier + ')</option>'); });
                form.append(fSelect);

                form.append('<div style="font-weight: bold; margin-bottom: 5px;">Production Budget ($):</div>');
                var budgetInput = $('<input type="number" value="1000000" style="width: 100%; padding: 10px; margin-bottom: 15px; color: black; border: 1px solid #bdc3c7;">');
                form.append(budgetInput);

                var extraFields = $('<div style="margin-bottom: 15px;"></div>');
                form.append(extraFields);

                typeSelect.change(function () {
                    var val = $(this).val();
                    extraFields.empty();
                    if (val === "tvSeries" || val === "animatedShow") {
                        extraFields.append('<div style="font-weight: bold; margin-bottom: 5px;">Seasons (1-4):</div>');
                        extraFields.append('<input type="number" class="seasons-in" value="1" min="1" max="4" style="width: 100%; padding: 10px; margin-bottom: 10px; color: black; border: 1px solid #bdc3c7;">');
                        extraFields.append('<div style="font-weight: bold; margin-bottom: 5px;">Episodes per Season:</div>');
                        extraFields.append('<input type="number" class="episodes-in" value="12" style="width: 100%; padding: 10px; color: black; border: 1px solid #bdc3c7;">');
                    } else if (val === "comicBook") {
                        extraFields.append('<div style="font-weight: bold; margin-bottom: 5px;">Number of Issues (1-12):</div>');
                        extraFields.append('<input type="number" class="episodes-in" value="6" min="1" max="12" style="width: 100%; padding: 10px; color: black; border: 1px solid #bdc3c7;">');
                    }
                });
                var launchBtn = $('<div class="selectorButton orangeButton" style="width: 100%; text-align: center; padding: 12px 0; font-weight: bold;">Greenlight Project</div>');
                launchBtn.click(function () {
                    var budget = parseInt(budgetInput.val());
                    var type = typeSelect.val();
                    var fid = fSelect.val();
                    var f = fid ? getFranchiseById(fid) : null;

                    var minReqObj = types.filter(function (t) { return t.id === type; })[0];
                    var minReq = minReqObj ? minReqObj.min : 0;
                    if (budget < minReq) { alert("Insufficient budget for this type! Minimum: $" + UI.getShortNumberString(minReq)); return; }

                    
                    if (type === "soundtrack" && budget > 500000) {
                        alert("Soundtrack budget cannot exceed $500,000 as per technical specifications.");
                        return;
                    }

                    if (GameManager.company.cash < budget) { alert("Not enough cash!"); return; }

                    var weeks = Math.floor(budget / 100000) + 8;
                    if (type === "soundtrack") weeks = 6;

                    var p = {
                        id: "MEDIA_" + Date.now(),
                        type: type,
                        franchiseId: fid || null,
                        title: (f ? f.name : "New Project") + " " + type.toUpperCase(),
                        producedBy: "player",
                        budget: budget,
                        weeksRemaining: weeks,
                        totalWeeks: weeks,
                        status: "inProduction",
                        score: 0,
                        totalRevenue: 0,
                        weeklyRevenue: 0,
                        salesWeeksLeft: 0,
                        seasons: parseInt(form.find('.seasons-in').val()) || 1,
                        episodes: parseInt(form.find('.episodes-in').val()) || 0
                    };
                    store.data.mediaProjects.push(p);
                    GameManager.company.adjustCash(-budget, "Media Production: " + p.title);
                    Sound.click();
                    subTab = "active";
                    refresh();
                });
                form.append(launchBtn);
                container.append(form);

                
                container.append('<h3 style="color: #d35400; margin-top: 30px;">Major Studio Deals</h3>');
                var mStudios = store.data.movieStudios || [];
                mStudios.forEach(function (s) {
                    var sCard = $('<div style="background: #fdf6e3; padding: 12px; border-radius: 8px; border: 1px solid #bdc3c7; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;"></div>');
                    var repStars = "";
                    for (var rS = 0; rS < (s.reputation || 0); rS++) repStars += "★";
                    sCard.append('<div><b>' + s.name + '</b><br><span style="font-size: 8pt; color: #7f8c8d;">Reputation: ' + repStars + ' | Preferred: ' + (s.totalDealsCompleted >= 3 ? "Yes" : "No") + '</span></div>');
                    var pitchBtn = $('<div class="selectorButton ' + (s.currentDeal ? "disabled" : "") + '" style="padding: 5px 15px; font-size: 9pt;">' + (s.currentDeal ? "Deal Active" : "Pitch Movie") + '</div>');
                    pitchBtn.click(function () {
                        if (!s.currentDeal) showPitchModal(s, container, refresh);
                    });
                    sCard.append(pitchBtn);
                    container.append(sCard);
                });
            } else if (subTab === "archive") {
                container.append('<h3 style="color: #d35400; margin-top: 0;">Production Archive</h3>');
                var mediaArrArch = store.data.mediaProjects || [];
                var released = mediaArrArch.filter(function (p) { return p.status === "released" || p.status === "cancelled"; });
                if (released.length === 0) {
                    container.append('<div style="text-align: center; padding: 40px; color: #7f8c8d;">No historical media records found.</div>');
                } else {
                    var table = $('<table style="width: 100%; border-collapse: collapse; font-size: 9pt;"></table>');
                    table.append('<tr style="background: #ecf0f1; border-bottom: 2px solid #bdc3c7;"><th style="padding: 8px; text-align: left;">Title</th><th>Type</th><th>Score</th><th>Budget</th><th>Revenue</th><th>ROI%</th></tr>');
                    released.forEach(function (p) {
                        var row = $('<tr style="border-bottom: 1px solid #eee;"></tr>');
                        row.append('<td style="padding: 8px;">' + p.title + '</td>');
                        row.append('<td style="text-align: center;">' + p.type + '</td>');
                        row.append('<td style="text-align: center;">' + (p.score || "-") + '</td>');
                        row.append('<td style="text-align: right;">$' + UI.getShortNumberString(p.budget || 0) + '</td>');
                        row.append('<td style="text-align: right;">$' + UI.getShortNumberString(p.totalRevenue) + '</td>');
                        var roi = p.budget > 0 ? Math.floor(((p.totalRevenue - p.budget) / p.budget) * 100) : 0;
                        row.append('<td style="text-align: center; color: ' + (roi >= 0 ? "green" : "red") + ';">' + roi + '%</td>');
                        table.append(row);
                    });
                    container.append(table);
                }
            }
        }

        refresh();
    }

    function renderSettingsTab(container) {
        container.append('<h2 style="color: #d35400; font-size: 14pt; margin: 0 0 15px 0; border-bottom: 2px solid #bdc3c7; padding-bottom: 8px;">Mod Settings</h2>');

        
        var overloadDiv = $('<div class="cs-stagger-item" style="display: flex; align-items: center; margin-bottom: 20px; font-size: 12pt; background: #fff; padding: 15px; border-radius: 8px; border: 1px solid #bdc3c7; box-shadow: 0 2px 4px rgba(0,0,0,0.05); cursor: pointer;"></div>');
        var overloadCheck = $('<input type="checkbox" style="margin-right: 15px; width: 22px; height: 22px; pointer-events: none;">');
        overloadCheck.prop('checked', !!store.data.disableOverloadMalus);

        overloadDiv.click(function () {
            store.data.disableOverloadMalus = !store.data.disableOverloadMalus;
            overloadCheck.prop('checked', store.data.disableOverloadMalus);
            Sound.click();
        });

        var labelWrapper = $('<div style="flex: 1;"></div>');
        labelWrapper.append('<div style="font-weight: bold; cursor: pointer;">Disable Feature Overload Malus</div>');
        labelWrapper.append('<div style="font-size: 10pt; color: #7f8c8d; margin-top: 5px; display: block; border-top: 1px solid #eee; padding-top: 5px;">When enabled, this removes the penalty for having too many features in a game and proactively cleans up 80% of project bugs.</div>');

        overloadDiv.append(overloadCheck).append(labelWrapper);
        container.append(overloadDiv);

        
        var healerDiv = $('<div class="cs-stagger-item" style="background: #fff; padding: 15px; border-radius: 8px; border: 1px solid #bdc3c7; box-shadow: 0 2px 4px rgba(0,0,0,0.05);"></div>');
        healerDiv.append('<h3 style="margin: 0 0 10px 0; font-size: 12pt; color: #d35400;">Baseline Recovery</h3>');
        healerDiv.append('<p style="font-size: 10pt; color: #7f8c8d; margin-bottom: 12px;">Reset Design and Tech baselines based on your entire company history.</p>');

        var healGrid = $('<div style="display: flex; gap: 10px; margin-bottom: 15px;"></div>');
        var dInput = $('<input type="number" placeholder="Design" value="500" style="flex: 1; padding: 8px; border: 1px solid #bdc3c7; border-radius: 4px; color: black; box-sizing: border-box;">');
        var tInput = $('<input type="number" placeholder="Tech" value="500" style="flex: 1; padding: 8px; border: 1px solid #bdc3c7; border-radius: 4px; color: black; box-sizing: border-box;">');
        healGrid.append(dInput).append(tInput);
        healerDiv.append(healGrid);

        var healBtn = $('<div class="selectorButton orangeButton" style="width: 100%; text-align: center; font-size: 11pt; padding: 10px 0; border-radius: 5px; font-weight: bold;">Heal Baselines Now</div>');
        healBtn.click(function () {
            var d = parseInt(dInput.val());
            var t = parseInt(tInput.val());
            if (isNaN(d) || isNaN(t)) { alert("Please enter valid numbers!"); return; }

            Sound.click();
            var log = GameManager.company.gameLog;
            if (!log) return;

            for (var i = 0; i < log.length; i++) {
                log[i].designPoints = d;
                log[i].technologyPoints = t;
            }
            GameManager.company.designBaseline = d;
            GameManager.company.technologyBaseline = t;
            if (typeof GameManager.company.prevDesignPoints !== 'undefined') GameManager.company.prevDesignPoints = d;
            if (typeof GameManager.company.prevTechnologyPoints !== 'undefined') GameManager.company.prevTechnologyPoints = t;
            if (typeof GameManager.company.lastDesignPoints !== 'undefined') GameManager.company.lastDesignPoints = d;
            if (typeof GameManager.company.lastTechPoints !== 'undefined') GameManager.company.lastTechPoints = t;


            alert("Baselines successfully recovered! Entire history adjusted to D:" + d + " / T:" + t + ".");
        });
        healerDiv.append(healBtn);
        container.append(healerDiv);
    }

    function renderMarketTab(container) {
        var sArr = store.data.studios || [];
        var studios = sArr.filter(function (s) { return s.sharesOwned < 50 && !s.isFounded; });

        var sortPref = store.data.modSortPref || "owned";
        function getE(s) { ensureStaffObj(s); return (s.staff[1] || 0) + (s.staff[2] || 0) + (s.staff[3] || 0) + (s.staff[4] || 0) + (s.staff[5] || 0); }
        function getQ(s) { ensureStaffObj(s); return ((s.staff[1] || 0) * 0.2) + ((s.staff[2] || 0) * 0.5) + ((s.staff[3] || 0) * 1.0) + ((s.staff[4] || 0) * 1.5) + ((s.staff[5] || 0) * 2.5); }
        function getG(s) {
            var max = 0;
            if (store.data.releaseHistory) {
                for (var j = 0; j < store.data.releaseHistory.length; j++) {
                    var h = store.data.releaseHistory[j];
                    if (h.studioName === s.name && h.score > max) max = h.score;
                }
            }
            return max;
        }

        studios.sort(function (a, b) {
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
        sortSelect.change(function () {
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
        var sArr2 = store.data.studios || [];
        var studios = sArr2.filter(function (s) { return s.sharesOwned >= 50 || s.isFounded; });

        var sortPref = store.data.modSortPref || "owned";
        function getE(s) { ensureStaffObj(s); return (s.staff[1] || 0) + (s.staff[2] || 0) + (s.staff[3] || 0) + (s.staff[4] || 0) + (s.staff[5] || 0); }
        function getQ(s) { ensureStaffObj(s); return ((s.staff[1] || 0) * 0.2) + ((s.staff[2] || 0) * 0.5) + ((s.staff[3] || 0) * 1.0) + ((s.staff[4] || 0) * 1.5) + ((s.staff[5] || 0) * 2.5); }
        function getG(s) {
            var max = 0;
            if (store.data.releaseHistory) {
                for (var j = 0; j < store.data.releaseHistory.length; j++) {
                    var h = store.data.releaseHistory[j];
                    if (h.studioName === s.name && h.score > max) max = h.score;
                }
            }
            return max;
        }

        studios.sort(function (a, b) {
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
        sortSelect.change(function () {
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
        createBtn.click(function () {
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
            var pProjects = store.data.publishingProjects || [];
            pProjects.forEach(function (project) {
                var studio = null;
                for (var kIdx = 0; kIdx < store.data.studios.length; kIdx++) {
                    if (store.data.studios[kIdx].id === project.studioId) {
                        studio = store.data.studios[kIdx];
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
                        for (var x = 0; x < store.data.publishingOffers.length; x++) {
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

    function showSearchableList(title, items, onSelect) {
        var modal = $('<div class="windowBorder tallWindow" style="background-color: #ecf0f1; padding: 15px; display: flex; flex-direction: column; overflow: hidden;"></div>');
        modal.append('<h2 style="text-align: center; color: #2c3e50; margin: 0 0 10px 0; font-size: 15pt;">' + title + '</h2>');

        var searchInput = $('<input type="text" placeholder="Search..." style="width: 100%; padding: 10px; font-size: 12pt; margin-bottom: 10px; border: 1px solid #bdc3c7; border-radius: 4px; color: black; box-sizing: border-box;">');
        modal.append(searchInput);

        var listContainer = $('<div style="flex: 1; overflow-y: auto; background: white; border: 1px solid #bdc3c7; border-radius: 4px; padding: 5px;"></div>');
        modal.append(listContainer);

        function renderItems(filter) {
            listContainer.empty();
            var count = 0;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var name = (typeof item === 'string') ? item : (item.name || item.id);
                if (filter && name.toLowerCase().indexOf(filter.toLowerCase()) === -1) continue;

                (function (n) {
                    var row = $('<div class="selectorButton" style="padding: 8px 12px; margin-bottom: 4px; border-bottom: 1px solid #eee; cursor: pointer; font-size: 11pt; color: black; background: #f9f9f9; border-radius: 3px;">' + n + '</div>');
                    row.click(function () {
                        Sound.click();
                        onSelect(n);
                        $.modal.close();
                    });
                    listContainer.append(row);
                })(name);
                count++;
            }
            if (count === 0) listContainer.append('<div style="padding: 10px; color: #7f8c8d; font-style: italic;">No results found.</div>');
        }

        searchInput.on('input', function () { renderItems($(this).val()); });
        renderItems("");

        var closeBtn = $('<div class="selectorButton orangeButton" style="width: 100px; margin: 10px auto 0 auto; text-align: center;">Close</div>');
        closeBtn.click(function () { $.modal.close(); });
        modal.append(closeBtn);

        modal.modal({
            overlayClose: true,
            opacity: 80,
            overlayCss: { backgroundColor: "#000" },
            containerCss: { width: "400px", height: "500px" }
        });
        setTimeout(function () { searchInput.focus(); }, 100);
    }

    function renderPublishingForm(container, prefilled) {
        container.css({ opacity: 0 });
        container.empty();

        var formBox = $('<div style="background-color: #fdf6e3; border: 4px solid #f1c40f; border-radius: 12px; padding: 20px; position: relative; box-shadow: 0 8px 16px rgba(0,0,0,0.2); font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;"></div>');

        var titleContainer = $('<div style="text-align: center; margin-bottom: 20px;"></div>');
        titleContainer.append('<div style="font-size: 24pt; font-weight: bold; color: #2c3e50; margin-bottom: 5px;">Game Concept</div>');
        titleContainer.append('<div style="height: 2px; background: #2980b9; width: 80%; margin: 0 auto;"></div>');
        formBox.append(titleContainer);

        var row1 = $('<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;"></div>');
        var titleInput = $('<input type="text" id="pub_title" placeholder="Game #???" style="font-size: 16pt; width: 60%; background: white; border: 2px solid #d35400; color: #2c3e50; padding: 5px 10px; border-radius: 4px;">');
        if (prefilled && prefilled.title) titleInput.val(prefilled.title);
        row1.append(titleInput);
        row1.append('<div style="font-size: 14pt; color: #2c3e50;">Cost: <span id="pub_cost_disp" style="font-weight: bold;">$500K</span></div>');
        formBox.append(row1);

        var sizeShelf = $('<div style="display: flex; gap: 10px; margin-bottom: 20px; justify-content: center;"></div>');
        var sizes = [
            { id: "Small", label: "Small", cost: 500000, color: "#f39c12" },
            { id: "Medium", label: "Medium", cost: 2000000, color: "#3498db" },
            { id: "Large", label: "Large", cost: 10000000, color: "#2980b9" },
            { id: "AAA", label: "AAA", cost: 50000000, color: "#1abc9c" }
        ];
        var selectedSize = (prefilled && prefilled.size) ? prefilled.size : "Small";

        sizes.forEach(function (s) {
            var btn = $('<div class="selectorButton" style="flex: 1; text-align: center; padding: 10px 0; font-size: 12pt; font-weight: bold; background-color: #ecf0f1; border-radius: 6px; cursor: pointer; border-bottom: 3px solid #bdc3c7;">' + s.label + '</div>');
            if (s.id === selectedSize) btn.css({ "background-color": s.color, "color": "white", "border-bottom": "3px solid #d35400" });
            btn.click(function () {
                Sound.click();
                selectedSize = s.id;
                sizeShelf.find('.selectorButton').css({ "background-color": "#ecf0f1", "color": "#2c3e50", "border-bottom": "3px solid #bdc3c7" });
                btn.css({ "background-color": s.color, "color": "white", "border-bottom": "3px solid #d35400" });
                $('#pub_cost_disp').text('$' + UI.getShortNumberString(s.cost));
            });
            sizeShelf.append(btn);
        });
        formBox.append(sizeShelf);

        
        var selectedTopic = (prefilled && prefilled.topic) ? prefilled.topic : Topics.topics[0].name;
        var selectedGenre = (prefilled && prefilled.genre) ? prefilled.genre : GameGenre.getAll()[0].name;
        var selectedGenre2 = "";
        var selectedPlats = [];

        var topicBtn = $('<div class="selectorButton lightBlueButton" style="display: block; width: 80%; margin: 0 auto 10px auto; text-align: center; font-size: 13pt; padding: 10px 0; border-radius: 6px;">Pick Topic (' + selectedTopic + ')</div>');
        topicBtn.click(function () {
            showSearchableList("Select Topic", Topics.topics, function (name) {
                selectedTopic = name;
                topicBtn.text('Pick Topic (' + selectedTopic + ')');
            });
        });
        formBox.append(topicBtn);

        var genreRow = $('<div style="display: flex; gap: 10px; margin-bottom: 20px; justify-content: center;"></div>');
        var g1Btn = $('<div class="selectorButton lightBlueButton" style="flex: 1; text-align: center; font-size: 12pt; padding: 10px 0; border-radius: 6px;">Pick Genre (' + selectedGenre + ')</div>');
        var g2Btn = $('<div class="selectorButton lightBlueButton" style="flex: 1; text-align: center; font-size: 12pt; padding: 10px 0; border-radius: 6px;">Pick Genre (None)</div>');

        g1Btn.click(function () {
            showSearchableList("Select Main Genre", GameGenre.getAll(), function (name) {
                selectedGenre = name;
                g1Btn.text('Pick Genre (' + selectedGenre + ')');
            });
        });
        g2Btn.click(function () {
            var gList = [{ name: "None" }].concat(GameGenre.getAll());
            showSearchableList("Select Second Genre", gList, function (name) {
                if (name === "None") {
                    selectedGenre2 = "";
                    g2Btn.text('Pick Genre (None)');
                } else {
                    selectedGenre2 = name;
                    g2Btn.text('Pick Genre (' + selectedGenre2 + ')');
                }
            });
        });
        genreRow.append(g1Btn).append(g2Btn);
        formBox.append(genreRow);

        var platRow = $('<div style="display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; justify-content: center;"></div>');
        var currentWk = GameManager.company.currentWeek;
        var myPlats = Platforms.allPlatforms.filter(function (p) {
            return (p.published && p.published <= currentWk) && (!p.retireDate || p.retireDate > currentWk);
        });
        if (myPlats.length === 0) myPlats = [Platforms.allPlatforms[0]]; 

        function updatePlatShelf() {
            platRow.empty();
            myPlats.slice(0, 6).forEach(function (p) {
                var isSel = selectedPlats.indexOf(p.name) !== -1;
                var pBtn = $('<div class="selectorButton" style="padding: 6px 12px; font-size: 10pt; border-radius: 4px; cursor: pointer; border: 1px solid #bdc3c7;">' + p.name + '</div>');
                if (isSel) pBtn.css({ "background-color": "#3498db", "color": "white", "border-color": "#2980b9" });
                else pBtn.css({ "background-color": "#ecf0f1", "color": "#2c3e50" });

                pBtn.click(function () {
                    Sound.click();
                    var idx = selectedPlats.indexOf(p.name);
                    if (idx === -1) {
                        if (selectedPlats.length < 3) selectedPlats.push(p.name);
                    } else {
                        selectedPlats.splice(idx, 1);
                    }
                    updatePlatShelf();
                });
                platRow.append(pBtn);
            });
        }
        updatePlatShelf();
        formBox.append(platRow);

        var footer = $('<div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;"></div>');
        var cancelBtn = $('<div class="selectorButton deleteButton" style="width: 120px; text-align: center; font-size: 12pt; font-weight: bold; border-radius: 6px;">Cancel</div>');
        cancelBtn.click(function () { routeModMenu("publishing"); });

        var confirmBtn = $('<div class="selectorButton orangeButton" style="width: 160px; text-align: center; font-size: 12pt; font-weight: bold; border-radius: 6px;">Post Offer</div>');
        confirmBtn.click(function () {
            var advance = sizes.filter(function (x) { return x.id === selectedSize; })[0].cost;
            if (selectedPlats.length === 0) selectedPlats = [myPlats[0].name];

            if (GameManager.company.cash >= advance) {
                GameManager.company.adjustCash(-advance, "Posted Publishing Deal");
                store.data.publishingOffers.push({
                    id: GameManager.getGUID(),
                    title: $('#pub_title').val() || null,
                    topic: selectedTopic,
                    genre: selectedGenre,
                    genre2: selectedGenre2 || null,
                    size: selectedSize,
                    platforms: selectedPlats,
                    advance: advance,
                    status: "Pending Evaluation",
                    
                    franchiseId: (prefilled && prefilled.franchiseId) ? prefilled.franchiseId : null,
                    entryType: (prefilled && prefilled.entryType) ? prefilled.entryType : null
                });
                routeModMenu("publishing");
            } else { alert("You need at least $" + UI.getShortNumberString(advance) + " to fund this advance!"); }
        });

        footer.append(cancelBtn).append(confirmBtn);
        formBox.append(footer);

        container.append(formBox);
        container.animate({ opacity: 1 }, 250);
    }

    function renderScheduleTab(container) {
        var hist = store.data.releaseHistory || [];
        if (hist.length === 0) {
            container.append('<div style="font-size: 12pt; text-align: center; margin-top: 30px; color: #7f8c8d;">No games have been released by competitors recently.</div>');
            return;
        }

        hist.forEach(function (r) {
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
        var sortedGames = games.slice().sort(function (a, b) { return b.releaseWeek - a.releaseWeek; });

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

                        var currentWk = GameManager.company.currentWeek;
                        var age = currentWk - game.releaseWeek;
                        if (age >= 480) return; 


                        var item = $('<div class="dlcItem" style="border: 1px solid #bdc3c7; background-color: #f9f9f9; padding: 10px; margin-bottom: 8px; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.08);"></div>');
                        item.append('<h3 style="margin: 0 0 3px 0; font-size: 12pt; color: #8e44ad; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + game.title + '</h3>');
                        var rawDlcInfo = store.data.dlcData[game.id] || {};
                        var dlcCount = rawDlcInfo.count || 0;
                        var activeDLCs = rawDlcInfo.activeDLCs || [];
                        var currentWk = GameManager.company.currentWeek;
                        var age = currentWk - game.releaseWeek;

                        item.append('<div style="font-size: 10pt; color: #7f8c8d;">Released: Week ' + game.releaseWeek + ' (Age: ' + Math.floor(age / 48) + 'y) | DLCs: ' + dlcCount + '/5</div>');

                        if (activeDLCs.length > 0) {
                            var activeStatus = $('<div style="margin-top: 5px; border-left: 3px solid #8e44ad; padding-left: 8px;"></div>');
                            activeDLCs.forEach(function (d, idx) {
                                if (d.pendingPlayerDev > 0) {
                                    activeStatus.append('<div style="font-size: 9pt; color: #f39c12;">DLC #' + (idx + 1) + ': Dev In-Progress (' + Math.ceil(d.pendingPlayerDev) + 'w)</div>');
                                } else {
                                    activeStatus.append('<div style="font-size: 9pt; color: #27ae60;">DLC #' + (idx + 1) + ': Active (+$' + UI.getShortNumberString(d.weeklyRevenue) + '/wk, ' + d.activeWeeksLeft + 'w left)</div>');
                                }
                            });
                            item.append(activeStatus);
                        }

                        var subDev = false;
                        for (var s = 0; s < store.data.studios.length; s++) {
                            if (store.data.studios[s].currentProject && store.data.studios[s].currentProject.isDLC && store.data.studios[s].currentProject.gameId === game.id) {
                                subDev = store.data.studios[s];
                            }
                        }

                        if (subDev) {
                            item.append('<div style="font-size: 10pt; margin-top: 3px; color: #2980b9; font-weight: bold;">In Dev by ' + subDev.name + ' (' + Math.ceil(subDev.currentProject.weeksRemaining) + 'w left)</div>');
                        } else if (dlcCount < 5 && age < 480) {
                            var dlcControls = $('<div class="dlccontrols" style="margin-top: 6px; display: flex; gap: 6px;"></div>');
                            var cost = Math.floor((game.costs || 100000) * 0.1);
                            if (cost < 20000) cost = 20000;

                            var btn = $('<div class="selectorButton orangeButton" style="flex: 1; font-size: 10pt;">Develop ($' + UI.getShortNumberString(cost) + ')</div>');
                            btn.click(function () {
                                if (GameManager.company.cash >= cost) {
                                    Sound.click();
                                    GameManager.company.adjustCash(-cost, "DLC Development: " + game.title);

                                    if (!store.data.dlcData[game.id] || typeof store.data.dlcData[game.id].count === 'undefined') {
                                        store.data.dlcData[game.id] = { count: 0, activeDLCs: [] };
                                    }
                                    store.data.dlcData[game.id].activeDLCs.push({
                                        pendingPlayerDev: 10,
                                        gameTitle: game.title,
                                        weeklyRevenue: Math.floor((game.totalSalesCash || 1500000) * 0.05)
                                    });
                                    
                                    store.data.dlcData[game.id].count++;

                                    $.modal.close();
                                } else {
                                    alert("Not enough funds!");
                                }
                            });
                            dlcControls.append(btn);

                            for (var s = 0; s < store.data.studios.length; s++) {
                                if (store.data.studios[s].sharesOwned >= 50 && !store.data.studios[s].currentProject) {
                                    var subBtn = $('<div class="selectorButton whiteBoardButton" style="flex: 1; font-size: 10pt; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Assign: ' + store.data.studios[s].name + '</div>');
                                    (function (studio) {
                                        subBtn.click(function () {
                                            studio.currentProject = {
                                                name: game.title + " DLC",
                                                isDLC: true,
                                                gameId: game.id,
                                                weeklyRevenue: Math.floor((game.totalSalesCash || 1500000) * 0.05),
                                                weeksRemaining: 18
                                            };
                                            
                                            store.data.dlcData[game.id].count++;
                                            routeModMenu("dlc");
                                        });
                                    })(store.data.studios[s]);
                                    dlcControls.append(subBtn);
                                }
                            }
                            item.append(dlcControls);
                        } else if (age >= 480) {
                            item.append('<div style="font-size: 10pt; margin-top: 3px; color: #c0392b; font-style: italic;">Game too old for new DLCs (10yr limit reached).</div>');
                        } else {
                            item.append('<div style="font-size: 10pt; margin-top: 3px; color: #7f8c8d; font-style: italic;">Maximum DLCs (5/5) reached for this title.</div>');
                        }
                        listContainer.append(item);
                    })(sortedGames[i]);
                }
            }

            searchBar.on('input', function () {
                var term = $(this).val().toLowerCase();
                renderDLCList(term);
            });

            renderDLCList("");
        }
    }

    function renderMarketingTab(container) {
        container.append('<h2 style="color: #d35400; font-size: 14pt; margin: 0 0 15px 0; border-bottom: 2px solid #bdc3c7; padding-bottom: 8px;">Marketing Campaigns</h2>');

        
        var activeSection = $('<div class="cs-stagger-item" style="margin-bottom: 25px;"></div>');
        activeSection.append('<h3 style="font-size: 12pt; color: #2c3e50; margin-bottom: 10px;">Ongoing Campaigns</h3>');

        if (store.data.activeCampaigns.length === 0) {
            activeSection.append('<div style="font-size: 10pt; color: #7f8c8d; font-style: italic; background: #fff; padding: 10px; border-radius: 6px; border: 1px dashed #bdc3c7;">No active marketing campaigns.</div>');
        } else {
            var aCampaigns = store.data.activeCampaigns || [];
            aCampaigns.forEach(function (c) {
                var cCard = $('<div style="display: flex; justify-content: space-between; align-items: center; background: #fff; padding: 10px 15px; border-radius: 8px; border: 1px solid #bdc3c7; margin-bottom: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);"></div>');
                cCard.append('<div><strong style="color: #2980b9;">' + c.targetName + '</strong><br><span style="font-size: 9pt; color: #7f8c8d;">' + c.campaignName + '</span></div>');
                cCard.append('<div style="text-align: right;"><span style="color: #27ae60; font-weight: bold;">' + (Math.round((c.boostFactor - 1) * 100)) + '% Boost</span><br><span style="font-size: 9pt; color: #7f8c8d;">' + c.weeksLeft + ' weeks left</span></div>');
                activeSection.append(cCard);
            });
        }
        container.append(activeSection);

        
        var formBox = $('<div class="cs-stagger-item" style="background: #fdf6e3; border: 3px solid #f1c40f; border-radius: 12px; padding: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"></div>');
        formBox.append('<h3 style="margin: 0 0 12px 0; font-size: 12pt; color: #d35400; text-align: center;">Launch New Campaign</h3>');

        
        formBox.append('<div style="font-size: 11pt; color: #2c3e50; margin-bottom: 5px;">Target Project:</div>');
        var searchInput = $('<input type="text" placeholder="Search project..." style="width: 100%; font-size: 10pt; padding: 6px; margin-bottom: 8px; border: 1px solid #bdc3c7; border-radius: 4px; color: black; box-sizing: border-box;">');
        formBox.append(searchInput);

        var targetSelect = $('<select style="width: 100%; font-size: 11pt; padding: 5px; margin-bottom: 15px; border: 1px solid #bdc3c7; border-radius: 4px; color: black;"></select>');

        
        var targets = [];
        var aGames = store.data.activeAIGames || [];
        aGames.forEach(function (g) { targets.push({ id: g.id, name: g.title + " (Subsidiary)" }); });

        var games = GameManager.company.gameLog || [];
        games.forEach(function (g) {
            if (g.state === GameState.released) {
                var label = g.isExtensionPack ? " (DLC Pack)" : " (Player Game)";
                targets.push({ id: g.id, name: g.title + label });
            }
        });

        function renderOptions(term) {
            targetSelect.empty();
            var filtered = targets.filter(function (t) { return t.name.toLowerCase().indexOf(term) !== -1; });
            if (filtered.length === 0) {
                targetSelect.append('<option disabled selected>No matching projects</option>');
            } else {
                filtered.forEach(function (t) {
                    targetSelect.append('<option value="' + t.id + '" data-name="' + t.name + '">' + t.name + '</option>');
                });
            }
        }

        searchInput.on('input', function () { renderOptions($(this).val().toLowerCase()); });
        renderOptions("");
        formBox.append(targetSelect);

        
        formBox.append('<div style="font-size: 11pt; color: #2c3e50; margin-bottom: 8px;">Select Campaign Type:</div>');
        var campaigns = [
            { id: "social", name: "Social Media Blitz", cost: 50000, boost: 1.15, weeks: 4, color: "#3498db" },
            { id: "viral", name: "Viral Video Ads", cost: 250000, boost: 1.35, weeks: 6, color: "#9b59b6" },
            { id: "tv", name: "TV Star Feature", cost: 1000000, boost: 1.70, weeks: 8, color: "#e67e22" },
            { id: "global", name: "Global Hype Event", cost: 5000000, boost: 2.50, weeks: 12, color: "#e74c3c" }
        ];

        var selectedC = campaigns[0];
        var campShelf = $('<div style="display: flex; gap: 8px; margin-bottom: 20px;"></div>');
        campaigns.forEach(function (camp) {
            var btn = $('<div style="flex: 1; text-align: center; padding: 10px 5px; background: #fff; border: 2px solid #bdc3c7; border-radius: 8px; cursor: pointer;"></div>');
            btn.append('<div style="font-size: 10pt; font-weight: bold; color: ' + camp.color + '; margin-bottom: 3px;">' + camp.name + '</div>');
            btn.append('<div style="font-size: 9pt; color: #7f8c8d;">$' + UI.getShortNumberString(camp.cost) + '</div>');

            if (camp.id === selectedC.id) btn.css({ "border-color": camp.color, "background": "#f0f0f0" });

            btn.click(function () {
                Sound.click();
                selectedC = camp;
                campShelf.find('div').css({ "border-color": "#bdc3c7", "background": "#fff" });
                btn.css({ "border-color": camp.color, "background": "#f0f0f0" });
            });
            campShelf.append(btn);
        });
        formBox.append(campShelf);

        var launchBtn = $('<div class="selectorButton orangeButton" style="width: 200px; margin: 0 auto; display: block; text-align: center; padding: 10px 0; border-radius: 6px; font-weight: bold;">Launch Campaign</div>');
        launchBtn.click(function () {
            if (targets.length === 0) return;
            var targetId = targetSelect.val();
            var targetName = targetSelect.find('option:selected').attr('data-name');

            if (GameManager.company.cash >= selectedC.cost) {
                Sound.click();
                GameManager.company.adjustCash(-selectedC.cost, "Marketing: " + targetName);
                store.data.activeCampaigns.push({
                    targetId: targetId,
                    targetName: targetName,
                    campaignName: selectedC.name,
                    weeksLeft: selectedC.weeks,
                    boostFactor: selectedC.boost
                });
                routeModMenu("marketing");
            } else { alert("Insufficient funds for this campaign!"); }
        });
        formBox.append(launchBtn);

        container.append(formBox);
    }

    function buildStudioCard(studio) {
        ensureStaffObj(studio);
        var totalEmps = studio.staff[1] + studio.staff[2] + studio.staff[3] + studio.staff[4] + studio.staff[5];
        var totalMaint = 0;
        for (var t = 1; t <= 5; t++) totalMaint += (starTiers[t].maint * studio.staff[t]);

        var item = $('<div class="studioCard" style="border: 1px solid #d1d9e6; background: #ffffff; padding: 12px; margin-bottom: 10px; border-radius: 8px; display: flex; align-items: flex-start; box-shadow: 0 2px 6px rgba(0,0,0,0.05); transition: all 0.2s ease;"></div>');

        var pieContainer = $('<div style="width: 60px; min-width: 60px; text-align: center; margin-right: 12px;"></div>');
        var canvasId = 'pie_' + studio.id;
        pieContainer.append('<canvas id="' + canvasId + '" width="50" height="50" data-shares="' + studio.sharesOwned + '" data-name="' + studio.name + '" class="pieChartCanvas"></canvas>');
        pieContainer.append('<div style="font-size: 10pt; margin-top: 5px; color: #34495e; font-weight: bold;">' + studio.sharesOwned + '%</div>');
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
                            for (var p = 0; p < store.data.publishingProjects.length; p++) {
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
        var getRoute = function (s) { return (s >= 50) ? "subsidiaries" : "market"; };

        if (studio.sharesOwned > 0 && !studio.isFounded) {
            var sellBtn = $('<button class="selectorButton deleteButton" style="flex: 1; font-size: 10pt; padding: 4px 6px;">Sell 10%</button>');
            sellBtn.click(function () {
                GameManager.company.adjustCash(tenPercentValue, "Sold 10% of " + studio.name);
                studio.sharesOwned = Math.max(0, studio.sharesOwned - 10);
                if (studio.sharesOwned <= 0 && GameManager.company.gameLog) {
                    GameManager.company.gameLog.forEach(function (g) {
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
            staffSelect.append('<option value="1">1✩ (H:$2K)</option><option value="2" selected>2✩ (H:$5K)</option><option value="3">3✩ (H:$15K)</option><option value="4">4✩ (H:$50K)</option><option value="5">5✩ (H:$200K)</option>');

            var hireBtn = $('<div class="selectorButton orangeButton" style="flex: 1; font-size: 10pt; padding: 4px; text-align: center;">Hire</div>');
            hireBtn.click(function () {
                var t = parseInt($('#staff_tier_' + studio.id).val());
                if (GameManager.company.cash >= starTiers[t].hire) {
                    GameManager.company.adjustCash(-starTiers[t].hire, "Hired " + starTiers[t].label + " Staff: " + studio.name);
                    studio.staff[t]++; routeModMenu("subsidiaries");
                } else { alert("Not enough cash!"); }
            });

            var fireBtn = $('<div class="selectorButton whiteBoardButton" style="flex: 1; font-size: 10pt; padding: 4px; text-align: center;">Fire</div>');
            fireBtn.click(function () {
                var t = parseInt($('#staff_tier_' + studio.id).val());
                if (studio.staff[t] > 0) {
                    if (studio.staff[1] + studio.staff[2] + studio.staff[3] + studio.staff[4] + studio.staff[5] <= 1) { alert("A studio must have at least 1 employee!"); return; }
                    if (GameManager.company.cash >= starTiers[t].fire) {
                        GameManager.company.adjustCash(-starTiers[t].fire, "Severance for " + starTiers[t].label + ": " + studio.name);
                        studio.staff[t]--; routeModMenu("subsidiaries");
                    } else { alert("Not enough cash for severance!"); }
                } else { alert("No " + starTiers[t].label + " staff to fire!"); }
            });
            middleBtns.append(staffSelect).append(hireBtn).append(fireBtn);

            var specSelect = $('<select id="spec_' + studio.id + '" style="font-size: 10pt; padding: 3px; color: black; flex: 2; border-radius: 3px; border: 1px solid #bdc3c7; box-sizing: border-box; margin-left: 5px;"></select>');
            specSelect.append('<option value="Any">General (Any)</option>');
            specSelect.append('<option value="DLC">Always DLC</option>');
            specSelect.append('<option value="CoDev">Always Co-Dev</option>');
            specSelect.append('<option value="Games">Always Games</option>');
            specSelect.val(studio.specialization || "Any");
            specSelect.change(function () {
                studio.specialization = $(this).val();
            });
            middleBtns.append(specSelect);

            var instructBtn = $('<button class="selectorButton orangeButton" style="flex: 1.1; font-size: 10pt; padding: 4px 6px; white-space: nowrap;">Manage Dev</button>');
            instructBtn.click(function () {
                if (studio.currentProject) { alert(studio.name + " is busy!"); return; }
                instructStudio(studio);
            });
            bottomBtns.append(instructBtn);

            if (GameManager.company && GameManager.company.currentGame && !studio.currentProject) {
                var coDevBtn = $('<button class="selectorButton whiteBoardButton" style="flex: 1; font-size: 10pt; padding: 4px 6px;">Co-Dev (Free)</button>');
                coDevBtn.click(function () {
                    var playerGame = GameManager.company.currentGame;
                    if (playerGame) {

                        var dPts = Math.floor(studio.valuation / 1000000) + 1;
                        var tPts = Math.floor(studio.valuation / 1000000) + 1;
                        playerGame.designPoints += dPts;
                        playerGame.technologyPoints += tPts;

                        
                        if (!store.data.coDevScrubMap) store.data.coDevScrubMap = {};
                        if (!store.data.coDevScrubMap[playerGame.title]) store.data.coDevScrubMap[playerGame.title] = { design: 0, tech: 0 };
                        store.data.coDevScrubMap[playerGame.title].design += dPts;
                        store.data.coDevScrubMap[playerGame.title].tech += tPts;




                        studio.currentProject = { name: "Co-Dev Support", isCoDev: true, isPublishedByPlayer: false };
                        routeModMenu("subsidiaries");
                    } else { alert("You need an active game in development to co-develop!"); }
                });
                bottomBtns.append(coDevBtn);
            }

            if (studio.sharesOwned === 100 && !studio.isFounded) {
                var absorbBtn = $('<button class="selectorButton deleteButton" style="flex: 1; font-size: 10pt; padding: 4px 6px;">Absorb</button>');
                absorbBtn.click(function () {
                    if (confirm("Absorb " + studio.name + "? You will gain their fans and tech, but the studio will close permanently.")) {
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

                        
                        if (store.data.activeAIGames) {
                            store.data.activeAIGames = store.data.activeAIGames.filter(function (g) {
                                return g.modStudioId !== studio.id;
                            });
                        }

                        
                        var frArr = store.data.franchises || [];
                        for (var fIdx = 0; fIdx < frArr.length; fIdx++) {
                            if (frArr[fIdx].ownerId === studio.id) {
                                frArr[fIdx].ownerId = "player";
                            }
                        }

                        var sArr3 = store.data.studios || [];
                        store.data.studios = sArr3.filter(function (s) { return s.id !== studio.id; });
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

        setTimeout(function () {
            var canvas = document.getElementById(canvasId);
            if (canvas) {
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
        Topics.topics.forEach(function (t) { topicSelect.append('<option value="' + t.name + '">' + t.name + '</option>'); });
        formContainer.append(topicSelect);

        var genreSearch = $('<input type="text" placeholder="Search genre..." style="font-size: 11pt; width: 100%; margin-bottom: 4px; background: white; border: 1px solid #bdc3c7; color: black; padding: 4px 6px; border-radius: 3px; box-sizing: border-box;">');
        formContainer.append('<div>Genre:</div>').append(genreSearch);
        var genreSelect = $('<select id="inst_genre" style="font-size: 11pt; width: 100%; margin-bottom: 4px; color: black; border: 1px solid #bdc3c7; border-radius: 3px; padding: 3px; box-sizing: border-box;"></select>');
        var genres = GameGenre.getAll();
        genres.forEach(function (g) { genreSelect.append('<option value="' + g.name + '">' + g.name + '</option>'); });
        formContainer.append(genreSelect);

        var matchContainer = $('<div style="font-size: 10pt; margin-bottom: 10px; text-align: right;">Match: <span id="inst_match" style="font-weight: bold;"></span></div>');
        formContainer.append(matchContainer);

        function updateInstMatch() {
            var selectedTopicName = $('#inst_topic').val();
            var selectedGenreName = $('#inst_genre').val();
            var t = Topics.topics.filter(function (x) { return x.name === selectedTopicName; })[0];
            var g = GameGenre.getAll().filter(function (x) { return x.name === selectedGenreName; })[0];
            if (t && g) {
                var genreIndexMap = { "Action": 0, "Adventure": 1, "RPG": 2, "Simulation": 3, "Strategy": 4, "Casual": 5 };
                var idx = genreIndexMap[g.name];
                if (idx === undefined) idx = 0;
                
                var weight = (t.genreWeightings && t.genreWeightings[idx]) || 0;
                var ind = $('#inst_match');
                if (weight >= 1.0) { ind.text("Great (+++)").css("color", "#27ae60"); }
                else if (weight >= 0.8) { ind.text("Good (++)").css("color", "#f39c12"); }
                else if (weight >= 0.7) { ind.text("Okay (+)").css("color", "#e67e22"); }
                else { ind.text("Bad (-)").css("color", "#c0392b"); }
            }
        }
        $('#inst_topic, #inst_genre').change(updateInstMatch);
        topicSearch.on('input', function () {
            var term = $(this).val().toLowerCase();
            $('#inst_topic').empty();
            Topics.topics.forEach(function (t) {
                if (t.name.toLowerCase().indexOf(term) !== -1) {
                    $('#inst_topic').append('<option value="' + t.name + '">' + t.name + '</option>');
                }
            });
            updateInstMatch();
        });

        genreSearch.on('input', function () {
            var term = $(this).val().toLowerCase();
            $('#inst_genre').empty();
            GameGenre.getAll().forEach(function (g) {
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
        myPlats.forEach(function (p) { platformSelect.append('<option value="' + p.name + '">' + p.name + '</option>'); });
        formContainer.append(platformSelect);

        platSearch.on('input', function () {
            var term = $(this).val().toLowerCase();
            $('#inst_platform').empty();
            myPlats.forEach(function (p) {
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
                    weeksRemaining: (selectedSize === "Small" ? 15 : (selectedSize === "Medium" ? 30 : (selectedSize === "Large" ? 50 : 80)))
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
        cancelBtn.click(function () { routeModMenu("subsidiaries"); });

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
            confirmBtn.click(function () {
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
                    setTimeout(function () {
                        if ($('#modUI').length === 0) showModMenu("subsidiaries");
                        else routeModMenu("subsidiaries");
                    }, 300);
                }
            });
            var cancelBtn = $('<div class="selectorButton deleteButton" style="width: 130px; font-size: 11pt;">Cancel</div>');
            cancelBtn.click(function () {
                $.modal.close();
                setTimeout(function () {
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
            setTimeout(function () { input.focus(); }, 100);
        } else {
            alert("You need at least $5M to found a new studio!");
        }
    }

    function renderLeaderboardTab(container) {
        var hist = store.data.leaderboardGames || [];
        var studios = store.data.studios || [];

        container.append('<h3 style="color: #2c3e50; text-align: center; margin-top: 6px; font-size: 12pt;">Highest Valued Studios</h3>');

        var bestStudios = studios.slice().sort(function (a, b) {
            return b.valuation - a.valuation;
        }).slice(0, 5);

        bestStudios.forEach(function (s, idx) {
            var sItem = $('<div class="cs-stagger-item" style="border: 1px solid #bdc3c7; background-color: #f9f9f9; padding: 6px 10px; margin-bottom: 4px; border-radius: 4px; font-size: 11pt; box-shadow: 0 1px 2px rgba(0,0,0,0.06);"></div>');
            sItem.append('<strong>#' + (idx + 1) + ': ' + s.name + '</strong> (Val: <span style="color:#d35400">$' + UI.getShortNumberString(s.valuation) + '</span>)');
            container.append(sItem);
        });

        container.append('<h3 style="color: #2c3e50; text-align: center; margin-top: 16px; font-size: 12pt;">AI Hall Of Fame</h3>');

        if (hist.length === 0) {
            container.append('<div style="text-align: center; font-size: 11pt; margin-top: 8px; color: #7f8c8d;">No masterclass games released yet.</div>');
        }

        hist.forEach(function (g, idx) {
            var gItem = $('<div class="cs-stagger-item" style="border: 1px solid #bdc3c7; background-color: #f9f9f9; padding: 6px 10px; margin-bottom: 4px; border-radius: 4px; font-size: 11pt; box-shadow: 0 1px 2px rgba(0,0,0,0.06);"></div>');
            gItem.append('<strong>#' + (idx + 1) + ': ' + g.gameName + '</strong> by ' + g.studioName + ' (Score: <span style="color:#27ae60">' + g.score + '/10</span>, Gross: <span style="color:#2980b9">$' + UI.getShortNumberString(g.revenue) + '</span>)');
            container.append(gItem);
        });

    }


    var originalShowItemSelector = UI._showItemSelector;
    UI._showItemSelector = function (options) {
        var result = originalShowItemSelector.apply(this, arguments);

        
        if ($('#mod-sequel-search').length > 0) return result;

        var container = $('.simplemodal-data');
        var isSequel = options.title && options.title.indexOf("Sequel") !== -1;
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

                searchBar.on('input', function () {
                    var term = $(this).val().toLowerCase();
                    modal.find('.item-element').each(function () {
                        var text = $(this).text().toLowerCase();
                        if (text.indexOf(term) !== -1) {
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    });
                });


                setTimeout(function () { searchBar.focus(); }, 100);
            }
        }
    };

})();
