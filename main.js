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
                // Attach data directly to the game object so it persists until release
                playerGame.modFranchiseId = activeFranchiseEntry.franchiseId;
                playerGame.modEntryType = activeFranchiseEntry.entryType || activeFranchiseEntry.type;

                // Save a persistent link using the Game ID
                if (!store.data.playerProjectMapping) store.data.playerProjectMapping = {};
                store.data.playerProjectMapping[playerGame.id] = {
                    franchiseId: activeFranchiseEntry.franchiseId,
                    entryType: playerGame.modEntryType,
                    remakeTargetId: activeFranchiseEntry.remakeTargetId
                };

                var fran = getFranchiseById(playerGame.modFranchiseId);
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


                    if (playerGame.modEntryType === "bundle" && activeFranchiseEntry.bundleBaseScore) {

                        playerGame.designPoints = activeFranchiseEntry.bundleBaseScore * 60 + pointBoost;
                        playerGame.technologyPoints = activeFranchiseEntry.bundleBaseScore * 60 + pointBoost;
                    }
                }
            }

            var scrubEntry = store.data.coDevScrubMap[playerGame.title];

            if (activeFranchiseEntry && playerGame.modEntryType === "expansion") {
                if (!store.data.dlcData) store.data.dlcData = {};
                if (!store.data.dlcData[playerGame.id]) store.data.dlcData[playerGame.id] = { count: 0, activeDLCs: [] };

                var weeklyRev = 5000;
                if (playerGame.sequelTo) {
                    var baseGame = GameManager.company.getGameById(playerGame.sequelTo);
                    if (baseGame && baseGame.totalSalesCash) {
                        weeklyRev = Math.max(5000, Math.floor(baseGame.totalSalesCash / 80));
                    }
                }

                store.data.dlcData[playerGame.id].count++;
                store.data.dlcData[playerGame.id].activeDLCs.push({
                    activeWeeksLeft: 20,
                    weeklyRevenue: weeklyRev
                });
            }

            originalFinishDevelopment.apply(this, arguments);

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

    var eventKeyReleased = (GDT.eventKeys && GDT.eventKeys.game) ? GDT.eventKeys.game.released : "gameReleased";
    GDT.on(eventKeyReleased, function (e) {
        var game = e.game;

        var mapping = store.data.playerProjectMapping ? store.data.playerProjectMapping[game.id] : null;
        var franchiseId = mapping ? mapping.franchiseId : (game.modFranchiseId || (store.data.activePlayerFranchiseProject ? store.data.activePlayerFranchiseProject.franchiseId : null));
        var entryType = mapping ? mapping.entryType : (game.modEntryType || (store.data.activePlayerFranchiseProject ? store.data.activePlayerFranchiseProject.entryType : null));

        if (franchiseId) {
            var fran = getFranchiseById(franchiseId);
            if (fran) {
                var historyEntry = {
                    id: "FE_" + Date.now() + "_" + Math.floor(Math.random() * 100000),
                    gameId: game.id,
                    title: game.title,
                    score: game.score,
                    type: entryType || "sequel",
                    releaseWeek: Math.floor(GameManager.company.currentWeek),
                    revenue: game.totalSalesCash || 0,
                    remakeTargetId: mapping ? mapping.remakeTargetId : (store.data.activePlayerFranchiseProject ? store.data.activePlayerFranchiseProject.remakeTargetId : null)
                };

                onFranchiseEntryComplete(fran, historyEntry, game.score, game.totalSalesCash || 0);
            }

            // Clean up only if we actually found a franchise link
            if (store.data.playerProjectMapping) delete store.data.playerProjectMapping[game.id];
            store.data.activePlayerFranchiseProject = null;
        }
    });

    function initData() {
        if (!store.data.studios || store.data.studios.length === 0) {
            store.data.studios = generateInitialStudios();
        }
        if (!store.data.playerProjectMapping) {
            store.data.playerProjectMapping = {};
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
        // Repair older media projects
        if (!store.data.mediaProjects) store.data.mediaProjects = [];
        store.data.mediaProjects.forEach(function (p) {
            if (typeof p.currentEpisode === 'undefined' || isNaN(p.currentEpisode)) p.currentEpisode = 0;
            if (typeof p.totalEpisodes === 'undefined' || isNaN(p.totalEpisodes) || p.totalEpisodes === 0) p.totalEpisodes = 1;

            // NaN guards for seasons/production
            if (typeof p.seasons === 'undefined' || isNaN(p.seasons)) p.seasons = 1;
            if (typeof p.seasonsProduced === 'undefined' || isNaN(p.seasonsProduced)) p.seasonsProduced = 0;
            if (typeof p.episodes === 'undefined' || isNaN(p.episodes)) p.episodes = 12;
            if (typeof p.weeksRemaining === 'undefined' || isNaN(p.weeksRemaining)) p.weeksRemaining = 0;
            if (typeof p.totalWeeks === 'undefined' || isNaN(p.totalWeeks)) {
                var budgetTmp = (typeof p.budget === 'undefined' || isNaN(p.budget)) ? 250000 : p.budget;
                var weeks = Math.min(300, Math.floor(Math.pow(budgetTmp / 100000, 0.75)) + 8);
                if (p.type === "soundtrack") weeks = 6;
                p.totalWeeks = weeks;
            }
            if (typeof p.weeksPerSeason === 'undefined' || isNaN(p.weeksPerSeason)) {
                var totalS = (typeof p.seasons === 'undefined' || isNaN(p.seasons)) ? 1 : p.seasons;
                p.weeksPerSeason = Math.floor(p.totalWeeks / totalS);
            }
            if (typeof p.budget === 'undefined' || isNaN(p.budget)) p.budget = 250000;

            if (typeof p.nextReleaseWeek === 'undefined' || isNaN(p.nextReleaseWeek)) p.nextReleaseWeek = 0;
            if (typeof p.decayRate === 'undefined' || isNaN(p.decayRate)) p.decayRate = 0.92;
            if (typeof p.weeklyRevenue === 'undefined' || isNaN(p.weeklyRevenue)) p.weeklyRevenue = 0;
            if (typeof p.totalRevenue === 'undefined' || isNaN(p.totalRevenue)) p.totalRevenue = 0;
            if (typeof p.score === 'undefined' || isNaN(p.score)) p.score = 5;
            if (typeof p.salesWeeksLeft === 'undefined' || isNaN(p.salesWeeksLeft)) p.salesWeeksLeft = 0;
            if (p.producedBy === "player" && (typeof p.studioRepBonus === 'undefined' || isNaN(p.studioRepBonus))) p.studioRepBonus = 0;
        });

        if (!store.data.movieStudios || store.data.movieStudios.length === 0) store.data.movieStudios = generateMovieStudios();
        if (!store.data.mediaMarketWeeksLeft) store.data.mediaMarketWeeksLeft = 0;
        if (!store.data.activePlayerFranchiseProject) store.data.activePlayerFranchiseProject = null;
        if (!store.data.aiAcquisitionOffers) store.data.aiAcquisitionOffers = [];

        // Repair older franchises
        if (store.data.franchises) {
            store.data.franchises.forEach(function (f) {
                if (typeof f.numId === 'undefined') {
                    store.data.lastFranchiseNumId = (store.data.lastFranchiseNumId || 0) + 1;
                    f.numId = store.data.lastFranchiseNumId;
                }
                if (typeof f.totalRevenue === 'undefined' || isNaN(f.totalRevenue)) f.totalRevenue = 0;
                if (typeof f.fanbaseScore === 'undefined' || isNaN(f.fanbaseScore)) f.fanbaseScore = 50;
                if (typeof f.tier === 'undefined' || isNaN(f.tier)) f.tier = 1;
                if (!f.last3Scores) f.last3Scores = [];
            });
        }







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
        if (type === "remaster" || type === "remake") return Math.floor(weeks * 0.25);
        if (type === "expansion") return 8;
        if (type === "bundle") return Math.floor(weeks * 0.15 * (bundleCount || 2));
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


            if ((type === "remaster" || type === "remake") && franchise.installments.length > 0) {
                var hasUnremade = franchise.installments.some(function(i) { return i.type !== "soundtrack" && i.type !== "bundle" && !i.beingRemade; });
                if (!hasUnremade) return { ok: false, reason: "All eligible installments have already been remastered/remade." };
            }
        }


        var studiosArr = store.data.studios || [];
        var subsidiaryProj = studiosArr.filter(function (s) {
            return s.currentProject && s.currentProject.isFranchiseEntry && s.currentProject.franchiseId === franchise.id;
        })[0];

        var playerProj = store.data.activePlayerFranchiseProject && store.data.activePlayerFranchiseProject.franchiseId === franchise.id;


        // Ghost Project Cleanup
        if (playerProj && typeof GameManager !== 'undefined' && GameManager.company && !GameManager.company.currentGame) {
            store.data.activePlayerFranchiseProject = null;
            playerProj = false;
        }

        // Subsidiary Ghost Cleanup
        studiosArr.forEach(function (s) {
            if (s.currentProject && s.currentProject.isFranchiseEntry && s.currentProject.franchiseId === franchise.id) {
                if (s.currentProject.weeksRemaining <= -5) { // Should have cleared long ago
                    s.currentProject = null;
                }
            }
        });

        // Re-check subsidiary project after potential cleanup
        subsidiaryProj = studiosArr.filter(function (s) {
            return s.currentProject && s.currentProject.isFranchiseEntry && s.currentProject.franchiseId === franchise.id;
        })[0];

        // Refined Constraint logic:
        // New entries: Sequel, Prequel, Spinoff, Reboot, Expansion
        var isNewEntry = (type === "sequel" || type === "spinoff" || type === "prequel" || type === "expansion" || type === "reboot");

        // Blocking logic:
        // 1. If type is a New Entry, it is blocked if ANY franchise project is active.
        // 2. If type is NOT a New Entry (Remaster, Bundle), it is only blocked by other non-new entries?
        // Actually, the user wants to start a Sequel while NOT developing anything.
        // My fix above (Ghost Cleanup) should handle it if it was a ghost project.
        // But I will also relax the check so Remasters/Bundles don't block anything else.

        if (isNewEntry && (playerProj || subsidiaryProj)) {
            var activeType = playerProj ? store.data.activePlayerFranchiseProject.type : subsidiaryProj.currentProject.type;
            var isNewActive = (activeType === "sequel" || activeType === "spinoff" || activeType === "prequel" || activeType === "expansion" || activeType === "reboot");

            if (isNewActive) {
                return { ok: false, reason: "A core franchise entry (" + activeType + ") is already in development." };
            }
        }




        if (!isSubsidiary && playerProj) {
            return { ok: false, reason: "You are already developing a project for this franchise." };
        }

        return { ok: true };
    }

    function estimateFranchiseEntryScore(franchise, type, size, remakeTargetId) {
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

        if (type === "remaster" || type === "remake") {
            var targetInst = null;
            if (remakeTargetId) {
                targetInst = franchise.installments.filter(function (i) { return i.id === remakeTargetId; })[0];
            }
            if (!targetInst) targetInst = franchise.installments[0];

            if (targetInst) {
                var originScore = targetInst.score;
                if (type === "remake") return { min: Math.max(1, originScore * 0.8), max: Math.min(10, originScore * 1.2) };
                else return { min: Math.max(1, originScore * 0.9), max: Math.min(10, originScore * 1.1) };
            }
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

        if (entry) {
            entry.type = entry.type || "sequel";
        }

        // Score Clamping for Remakes/Remasters (Player)
        if (entry && (entry.type === "remake" || entry.type === "remaster")) {
            if (franchise.installments && franchise.installments.length > 0) {
                var originScore = franchise.installments[0].score;
                var range = entry.type === "remake" ? 0.2 : 0.1;
                score = Math.max(originScore * (1 - range), Math.min(originScore * (1 + range), score));
            }
        }


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
                    if (entry.remakeTargetId) {
                        var target = franchise.installments.filter(function(i) { return i.id === entry.remakeTargetId; })[0];
                        if (target) target.beingRemade = true;
                    } else {
                        franchise.installments[0].beingRemade = true;
                    }
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
        if (tier === 5) stars = " [*****]";
        return $('<span class="fran-tier-badge fran-tier-' + tier + '" style="padding: 2px 8px; border-radius: 10px; font-size: 9pt; font-weight: bold; margin-left: 8px;">' + names[tier] + stars + '</span>');
    }

    function findActiveFranchiseEntryForCurrentGame(game) {
        if (!game) return null;
        if (game.isFranchiseEntry) return { franchiseId: game.franchiseId, entryType: game.entryType, remakeTargetId: game.remakeTargetId };

        if (store.data.activePlayerFranchiseProject) return store.data.activePlayerFranchiseProject;

        if (game.title) {
            var match = game.title.match(/(?:\s*)?\(id(\d+)\)$/i);
            if (match) {
                var numId = parseInt(match[1]);
                if (store.data.franchises) {
                    for (var i = 0; i < store.data.franchises.length; i++) {
                        if (store.data.franchises[i].numId === numId) {
                            return { franchiseId: store.data.franchises[i].id, entryType: "sequel" };
                        }
                    }
                }
            }
        }

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

        try {
            if (GameManager.company && GameManager.company.gameLog) {
                var log = GameManager.company.gameLog;
                if (store.data.franchises) {
                    store.data.franchises.forEach(function (f) {
                        if (!f.installments) return;
                        f.installments.forEach(function (inst) {
                            if (inst.developer !== "Player" || !inst.gameId) return;
                            var g = log.filter(function (game) { return game.id === inst.gameId; })[0];
                            if (g && typeof g.totalSalesCash !== 'undefined') {
                                inst.revenue = g.totalSalesCash;
                            }
                        });
                    });
                }
            }
        } catch (e) { console.error("[Mod] Update player franchise revenue error:", e); }


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
                if (!isNaN(merch) && merch > 0) {
                    weeklyIncome += merch;
                    incomeSources.push(f.name + " Merch: +$" + UI.getShortNumberString(merch));
                }
            }


            if (f.tier === 5 && currentWeek % 12 === 0) {
                var legendBonus = Math.floor((f.totalRevenue || 0) * 0.01);
                if (!isNaN(legendBonus) && legendBonus > 0) {
                    weeklyIncome += legendBonus;
                    incomeSources.push(f.name + " Legend Bonus: +$" + UI.getShortNumberString(legendBonus));
                }
            }
        }


        if (store.data.mediaProjects) {
            for (var j = 0; j < store.data.mediaProjects.length; j++) {
                var p = store.data.mediaProjects[j];
                if (p.status === "releasing") {
                    // Revenue builds up as episodes are released
                    var epRev = Math.floor((p.budget * 0.02) * (p.currentEpisode / p.totalEpisodes));
                    if (epRev > 0) {
                        weeklyIncome += epRev;
                        incomeSources.push(p.title + " (Ep " + p.currentEpisode + "): +$" + UI.getShortNumberString(epRev));
                    }
                } else if (p.status === "released" && p.weeklyRevenue > 0) {
                    weeklyIncome += p.weeklyRevenue;
                    incomeSources.push(p.title + " Sales: +$" + UI.getShortNumberString(p.weeklyRevenue));
                    p.salesWeeksLeft--;

                    // Decaying revenue
                    p.weeklyRevenue = Math.floor(p.weeklyRevenue * (p.decayRate || 0.92));

                    if (p.salesWeeksLeft <= 0 || p.weeklyRevenue < 50) {
                        p.weeklyRevenue = 0;
                        p.salesWeeksLeft = 0;
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

        if (weeklyIncome > 0 && isFinite(weeklyIncome)) {
            GameManager.company.adjustCash(weeklyIncome, "Media & Franchise Royalties");
        }


        store.data.weeklyLaunchRevenue = 0;
        store.data.weeklyLaunchSources = [];
    }

    function processMediaProjects() {
        if (!store.data.mediaProjects) return;
        var currentWeek = Math.floor(GameManager.company.currentWeek);

        for (var i = 0; i < store.data.mediaProjects.length; i++) {
            var p = store.data.mediaProjects[i];

            if (p.status === "inProduction") {
                p.weeksRemaining--;
                if (p.weeksRemaining <= 0) {
                    var isRolling = (p.type === "tvSeries" || p.type === "animatedShow" || p.type === "comicBook");
                    if (isRolling) {
                        if (p.type === "comicBook") {
                            p.status = "releasing";
                            p.currentEpisode = 0;
                            p.nextReleaseWeek = currentWeek;
                        } else {
                            p.seasonsProduced = (p.seasonsProduced || 0) + 1;
                            p.isReleasing = true;
                            if (p.currentEpisode === 0) p.nextReleaseWeek = currentWeek;

                            if (p.seasonsProduced < p.seasons) {
                                p.weeksRemaining = p.weeksPerSeason || 8;
                            } else {
                                p.status = "productionCompleted";
                            }
                        }
                    } else {
                        p.status = "released";
                        p.releaseWeek = currentWeek;
                    }
                }
            }

            if (p.isReleasing || p.status === "releasing") {
                if (currentWeek >= p.nextReleaseWeek) {
                    var episodesAvailable = (p.type === "comicBook") ? p.totalEpisodes : ((p.seasonsProduced || 1) * (p.episodes || 12));

                    if (p.currentEpisode < episodesAvailable) {
                        p.currentEpisode++;
                        var f = p.franchiseId ? getFranchiseById(p.franchiseId) : null;
                        if (f) {
                            f.fanbaseScore = Math.max(0, Math.min(100, f.fanbaseScore + (p.type === "comicBook" ? 1 : 2)));
                        }

                        GameManager.company.notifications.push(new Notification({
                            header: "New Release: " + p.title,
                            text: (p.type === "comicBook" ? "Issue #" : "Episode #") + p.currentEpisode + " has been released!",
                            image: ""
                        }));

                        if (p.currentEpisode >= p.totalEpisodes) {
                            p.status = "released";
                            p.isReleasing = false;
                            p.releaseWeek = currentWeek;
                            p.salesWeeksLeft = 24;
                        } else {
                            p.nextReleaseWeek = currentWeek + (p.type === "comicBook" ? 4 : 1);
                        }
                    }
                }
            }

            if (p.status === "released" && !p.score) {
                var f = p.franchiseId ? getFranchiseById(p.franchiseId) : null;
                var baseScore = 3 + (f ? (f.tier * 1.2) + (f.fanbaseScore / 20) : 2);
                baseScore += (p.studioRepBonus || 0);

                var budgetBonus = Math.min(2, (Math.log(p.budget / 500000 + 1) / Math.LN10));
                var randomFactor = (Math.random() * 4) - 2;
                p.score = Math.max(1, Math.min(10, Math.floor(baseScore + budgetBonus + randomFactor)));

                var revRange = estimateMediaRevenue(p.type, p.budget, f);
                var revMult = (p.score / 6);
                var totalRev = Math.floor(((revRange.min + revRange.max) / 2) * revMult);

                if (isNaN(totalRev)) totalRev = 0;

                if (p.studioShare) {
                    var sId = p.producedBy;
                    var studio = getMovieStudioById(sId);
                    if (studio) {
                        studio.currentDeal = null;
                        studio.totalDealsCompleted++;
                        if (studio.reputation < 5) studio.reputation += 0.1;
                    }
                    totalRev = Math.floor(totalRev * (1.0 - p.studioShare));
                }
                p.totalRevenue = totalRev;
                p.decayRate = p.type === "movie" ? 0.75 : 0.92;

                if (p.type === "movie") {
                    p.salesWeeksLeft = 16;
                    p.weeklyRevenue = Math.floor(totalRev * 0.20);
                } else if (p.type === "merchandise") {
                    p.salesWeeksLeft = 52;
                    p.weeklyRevenue = Math.floor(totalRev / 52);
                } else {
                    p.salesWeeksLeft = 24;
                    p.weeklyRevenue = Math.floor(totalRev * 0.08);
                }

                if (isNaN(p.weeklyRevenue)) p.weeklyRevenue = 0;

                GameManager.company.notifications.push(new Notification({
                    header: "Project Released: " + p.title,
                    text: p.title + " is now in its full release window! Score: " + (isNaN(p.score) ? "?" : p.score) + "/10. Lifetime Est: $" + (isNaN(totalRev) ? "0" : UI.getShortNumberString(totalRev)),
                    image: ""
                }));

                if (f) {
                    var pScore = isNaN(p.score) ? 5 : p.score;
                    var impact = pScore >= 8 ? 15 : (pScore >= 5 ? 5 : -10);
                    f.fanbaseScore = Math.max(0, Math.min(100, f.fanbaseScore + impact));
                }
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
                    var buyer = s.length > 0 ? s[Math.floor(Math.random() * s.length)] : null;
                    if (buyer) {
                        GameManager.company.adjustCash(f.playerSalePrice, "Franchise Sale: " + f.name);
                        f.ownerId = buyer.id;
                        f.isListedByPlayer = false;
                        if (!f.acquisitionHistory) f.acquisitionHistory = [];
                        f.acquisitionHistory.push({ week: currentWeek, newOwner: buyer.name, price: f.playerSalePrice });
                        GameManager.company.notifications.push(new Notification({
                            header: "Franchise Sold!",
                            text: buyer.name + " has purchased your '" + f.name + "' franchise for $" + UI.getShortNumberString(f.playerSalePrice),
                            image: ""
                        }));
                    } else {
                        f.isListedByPlayer = false;
                        GameManager.company.notifications.push(new Notification({
                            header: "Franchise Sale Failed",
                            text: "We couldn't find an eligible buyer for '" + f.name + "'. (No independent studios available)",
                            image: ""
                        }));
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

            if (studio.sharesOwned >= 50 && studio.specialization === "CoDev") {
                if (GameManager.company && GameManager.company.currentGame) {
                    if (!studio.currentProject || !studio.currentProject.isCoDev) {
                        studio.currentProject = { name: "Co-Dev Support", isCoDev: true, isPublishedByPlayer: false };
                        GameManager.company.notifications.push(new Notification({ header: "Auto Co-Dev", text: studio.name + " is prioritizing your active project.", image: "" }));
                    }
                }
            }


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
                                weeklyRevenue: Math.floor((target.totalSalesCash || 1500000) * 0.015),
                                weeksRemaining: 18
                            };

                            if (!store.data.dlcData[target.id]) store.data.dlcData[target.id] = { count: 0, activeDLCs: [] };
                            store.data.dlcData[target.id].count++;
                            continue;
                        }
                    } else if (spec === "CoDev" && GameManager.company && GameManager.company.currentGame) {
                        studio.currentProject = { name: "Co-Dev Support", isCoDev: true, isPublishedByPlayer: false };
                        continue;
                    } else if (spec === "CoDev") {
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
        function parseGameWeek(dateVal) {
            if (!dateVal) return 0;
            if (typeof dateVal === 'number') return dateVal;
            if (typeof General !== 'undefined' && General.getWeekFromDateString) return General.getWeekFromDateString(dateVal);
            var parts = dateVal.split('/');
            if (parts.length === 3) return (parseInt(parts[0]) - 1) * 48 + (parseInt(parts[1]) - 1) * 4 + parseInt(parts[2]);
            return 0;
        }

        var activePlats = Platforms.allPlatforms.filter(function (p) {
            var pubWk = parseGameWeek(p.published);
            var retWk = p.retireDate ? parseGameWeek(p.retireDate) : Infinity;
            return (pubWk <= currentWk) && (retWk > currentWk);
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
            var container = $('<div class="windowBorder tallWindow" style="background-color: #ecf0f1; border-radius: 14px; color: #2c3e50; padding: 0; display: flex; flex-direction: column; width: 100%; height: 100%; box-sizing: border-box; position: relative;"></div>');
            var xBtn = $('<div style="position: absolute; right: 10px; top: 10px; width: 24px; height: 24px; line-height: 22px; text-align: center; border-radius: 50%; background: #e74c3c; color: white; font-weight: bold; cursor: pointer; font-size: 14pt; z-index: 1000; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">×</div>');
            xBtn.click(function () { isShowingDraft = false; $.modal.close(); });
            xBtn.hover(function () { $(this).css('background', '#c0392b'); }, function () { $(this).css('background', '#e74c3c'); });
            container.append(xBtn);

            var header = $('<div style="flex: 0 0 auto; background-color: #e0e6ed; padding: 15px 20px; position: relative; border-bottom: 2px solid #bdc3c7;"></div>');
            header.append('<div style="font-size: 16pt; font-weight: bold; color: #2c3e50; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-right: 40px;">' + studio.name + ' <span style="font-size: 11pt; color: #7f8c8d; font-weight: normal;">(Subsidiary Draft)</span></div>');
            container.append(header);

            var body = $('<div style="flex: 1; overflow-y: auto; overflow-x: hidden; padding: 20px; background: #ffffff; min-height: 0;"></div>');

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

            var btnArea = $('<div style="flex: 0 0 auto; display: flex; gap: 10px; padding: 15px 20px; background: #ecf0f1; border-top: 2px solid #bdc3c7;"></div>');
            var btnAccept = $('<div class=\"selectorButton greenButton\" style=\"flex: 1.5; text-align: center; padding: 12px 0; font-size: 13pt; font-weight: bold; cursor: pointer; border-radius: 6px;\">Accept \u0026 Fund</div>');
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

            var btnDecline = $('<div class=\"selectorButton deleteButton\" style=\"flex: 1; text-align: center; padding: 12px 0; font-size: 13pt; font-weight: bold; cursor: pointer; border-radius: 6px;\">Decline</div>');
            btnDecline.click(function () { isShowingDraft = false; studio.draftCooldown = 8; $.modal.close(); });

            btnArea.append(btnAccept).append(btnDecline);
            container.append(btnArea);

            container.modal({
                overlayClose: false,
                opacity: 60,
                overlayCss: { backgroundColor: "#000" },
                containerCss: { width: "550px", height: "90%", maxHeight: "650px", backgroundColor: "transparent", border: "none" }
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
        var totalQuality = 0;
        for (var t = 1; t <= 5; t++) totalQuality += (starTiers[t].score * (studio.staff[t] || 0));

        // Scale quality factor: 15 members of 1-star (3.0 q) to 15 members of 5-star (37.5 q)
        var qFactor = Math.max(0, Math.min(1.0, (totalQuality - 3.0) / (37.5 - 3.0)));

        // RNG impact scales down as quality goes up (100% -> 5%)
        var rngWeight = 1.0 - (qFactor * 0.95);

        var talentScore = (qFactor * 9) + 1;
        var luckScore = (Math.random() * 9) + 1;

        var score = Math.floor((talentScore * (1 - rngWeight)) + (luckScore * rngWeight));

        if (proj.size === "AAA") score += 1;

        // Score Clamping for Remakes/Remasters
        if (proj && (proj.type === "remake" || proj.type === "remaster")) {
            var f = getFranchiseById(proj.franchiseId);
            if (f && f.installments && f.installments.length > 0) {
                var originScore = f.installments[0].score;
                var range = proj.type === "remake" ? 0.2 : 0.1;
                score = Math.max(originScore * (1 - range), Math.min(originScore * (1 + range), score));
            }
        }
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
                    id: "FE_" + Date.now() + "_" + Math.floor(Math.random() * 100000),
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
                store.data.lastFranchiseNumId = (store.data.lastFranchiseNumId || 0) + 1;
                var randSuffix = "_" + Math.floor(Math.random() * 100000);
                var fId = "FRAN_" + Date.now() + randSuffix;
                var newF = {
                    id: fId,
                    numId: store.data.lastFranchiseNumId,
                    name: gameTitle,
                    ownerId: studio.id,
                    originGameId: "MOD_" + Math.random().toString(36).substr(2, 9),
                    originGameTitle: gameTitle,
                    topic: proj.topic || "Unknown",
                    genre: proj.genre || "Unknown",
                    tier: 1,
                    totalRevenue: units * price,
                    installments: [{
                        id: "FE_" + Date.now() + randSuffix,
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
                weeklyRevenue: Math.floor(units * price / 80)
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

            // Track weekly revenue for forecasting
            var totalSales = g.totalSalesCash || 0;
            var prevTotal = g.modLastTotalSales || totalSales;
            var weeklyRev = totalSales - prevTotal;
            g.modLastTotalSales = totalSales;

            // Store rolling 4-week history for accurate "Last Month" reporting
            if (!g.modRevenueHistory) g.modRevenueHistory = [];
            g.modRevenueHistory.push(weeklyRev);
            if (g.modRevenueHistory.length > 4) g.modRevenueHistory.shift();

            var maxAge = 20 + (g.modMarketExtension || 0);
            var age = currentWk - g.releaseWeek;

            // Trigger proactive maintenance popup on the "last month" (4 weeks left)
            if (g.state === GameState.released && !g.isExtensionPack && (maxAge - age === 4)) {
                var promptKey = "PROMPT_" + (g.modMarketExtension || 0);
                if (g.modLastPromptKey !== promptKey) {
                    g.modLastPromptKey = promptKey;

                    var lastMonthRev = 0;
                    g.modRevenueHistory.forEach(function (r) { lastMonthRev += r; });
                    if (lastMonthRev === 0) lastMonthRev = weeklyRev * 4; // Fallback if history is short

                    var forecastRev = Math.floor(lastMonthRev * 0.85); // Estimated next month with decay
                    var mCost = Math.floor(totalSales * 0.05) + 20000;

                    showMaintainModal(g, lastMonthRev, forecastRev, mCost);
                }
            }

            if (g.state === GameState.released && !g.isExtensionPack && (age < maxAge)) {
                var boost = getCampaignBoost(g.id);
                if (boost > 1.0) {
                    var bonusBase = (g.score || 5) * 8000;
                    if (g.size === "Medium") bonusBase *= 3;
                    if (g.size === "Large") bonusBase *= 12;
                    if (g.size === "AAA") bonusBase *= 50;

                    var weeklyBonus = Math.floor(bonusBase * (boost - 1));
                    if (weeklyBonus > 0) {
                        GameManager.company.adjustCash(weeklyBonus, "Marketing Bonus: " + g.title);
                        var fanGain = Math.floor(weeklyBonus / 2000);
                        if (fanGain > 0) GameManager.company.fans += fanGain;
                    }
                }
            }
        }
    }

    function showMaintainModal(game, lastMonth, forecast, cost) {
        var modal = $('<div id="maintainModal" style="color: #2c3e50; text-align: center;"></div>');
        modal.append('<h2 style="color: #d35400; margin-bottom: 15px;">Market Extension: ' + game.title + '</h2>');
        modal.append('<p style="font-size: 11pt; line-height: 1.4;">' + game.title + ' is scheduled to be pulled from the market in <b>4 weeks</b>.</p>');

        var stats = $('<div style="background: #fdf6e3; padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #bdc3c7; display: flex; justify-content: space-around;"></div>');
        stats.append('<div><span style="font-size: 8pt; color: #7f8c8d; text-transform: uppercase;">Last Month</span><br><b style="color: #27ae60; font-size: 12pt;">$' + UI.getShortNumberString(lastMonth) + '</b></div>');
        stats.append('<div><span style="font-size: 8pt; color: #7f8c8d; text-transform: uppercase;">Forecasted</span><br><b style="color: #2980b9; font-size: 12pt;">~$' + UI.getShortNumberString(forecast) + '</b></div>');
        stats.append('<div><span style="font-size: 8pt; color: #7f8c8d; text-transform: uppercase;">Extension Fee</span><br><b style="color: #c0392b; font-size: 12pt;">$' + UI.getShortNumberString(cost) + '</b></div>');
        modal.append(stats);

        modal.append('<p style="font-size: 10pt; color: #7f8c8d; margin-bottom: 20px;">Would you like to keep it on the market for another 4 weeks?</p>');

        var buttons = $('<div style="display: flex; gap: 10px;"></div>');
        var keepBtn = $('<div class="selectorButton greenButton" style="flex: 1; padding: 12px; font-weight: bold;">Maintain (Pay Fee)</div>');
        keepBtn.click(function () {
            if (GameManager.company.cash >= cost) {
                Sound.click();
                GameManager.company.adjustCash(-cost, "Market Maintenance: " + game.title);
                game.modMarketExtension = (game.modMarketExtension || 0) + 4;
                $.modal.close();
            } else {
                alert("Not enough funds!");
            }
        });

        var expireBtn = $('<div class="selectorButton deleteButton" style="flex: 1; padding: 12px; font-weight: bold;">Let it Expire</div>');
        expireBtn.click(function () {
            Sound.click();
            $.modal.close();
        });

        buttons.append(keepBtn).append(expireBtn);
        modal.append(buttons);

        GDT.showDetailedCustomModal(modal);
    }

    function getCampaignBoost(targetId) {
        var boost = 1.0;
        if (!store.data.activeCampaigns) return 1.0;
        for (var i = 0; i < store.data.activeCampaigns.length; i++) {
            if (store.data.activeCampaigns[i].targetId == targetId) {
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


        var container = $('<div id="modUI" class="windowBorder tallWindow" style="background-color: #ecf0f1; border-radius: 14px; color: #2c3e50; padding: 0; display: flex; flex-direction: column; width: 100%; height: 100%; box-sizing: border-box; position: relative;"></div>');
        var header = $('<div id="modUI_header" style="flex: 0 0 auto; display: flex; flex-wrap: nowrap; gap: 2px; border-bottom: 2px solid #bdc3c7; padding: 6px 40px 0 8px; background-color: #e0e6ed; overflow: hidden; cursor: move; position: relative; border-top-left-radius: 14px; border-top-right-radius: 14px;"></div>');
        container.append(header);

        var xBtn = $('<div style="position: absolute; right: 10px; top: 8px; width: 24px; height: 24px; line-height: 22px; text-align: center; border-radius: 50%; background: #e74c3c; color: white; font-weight: bold; cursor: pointer; font-size: 14pt; z-index: 1000; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">×</div>');
        xBtn.click(function () { $.modal.close(); });
        xBtn.hover(function () { $(this).css('background', '#c0392b'); }, function () { $(this).css('background', '#e74c3c'); });
        container.append(xBtn);
        var contentArea = $('<div id="modUI_content" style="flex: 1; overflow-y: auto; overflow-x: hidden; padding: 14px; background-color: #ecf0f1; box-sizing: border-box; min-height: 0;"></div>');
        container.append(contentArea);

        var closeWrapper = $('<div class="centeredButtonWrapper" style="flex: 0 0 auto; padding: 8px; border-top: 2px solid #bdc3c7; text-align: center;"></div>');
        var closeBtn = $('<div class="okButton selectorButton orangeButton" style="width: 120px; display: inline-block;">Close</div>');
        closeBtn.click(function () { $.modal.close(); });
        closeWrapper.append(closeBtn);
        container.append(closeWrapper);

        container.modal({
            overlayClose: false,
            opacity: 60,
            overlayCss: { backgroundColor: "#000" },
            containerCss: {
                width: "900px",
                height: "600px",
                minWidth: "600px",
                minHeight: "400px",
                resize: "both",
                overflow: "hidden",
                backgroundColor: "transparent"
            },
            onShow: function (dialog) {
                if (typeof $.fn.draggable === 'function') {
                    dialog.container.draggable({ handle: "#modUI_header" });
                }
            }
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
            var tabStyle = "flex: 1; text-align: center; padding: 6px 2px; cursor: pointer; font-size: 10pt; font-weight: bold; border-top-left-radius: 5px; border-top-right-radius: 5px; border: 1px solid #bdc3c7; border-bottom: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0;";
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

    function generateFranchiseTitle(originalTitle, type) {
        var base = originalTitle;
        var cleanBase = base.replace(/ (?:[0-9]+|I+V?X?|Zero|HD|Remake|Remastered|Definitive Edition|Reloaded|Evolution|Origins|Zero|The Day Before|The Day After)$|: .*$/i, "").trim();

        var patterns = {
            sequel: [
                "{base} {n}", "{base} {roman}", "{base}: {sub}", "{base} {sub}", "{base} Reloaded", "{base} Evolution",
                "{base}: The Sequel", "{base} 2.0", "{base}: Next Gen", "{base} Unleashed", "{base}: The Legend Continues",
                "{base}: Resurrection", "{base}: Vengeance", "{base}: Retribution", "{base}: Aftermath", "{base}: The New Chapter",
                "{base}: Part {n}", "{base} II: {sub}", "{base} III: {sub}", "{base}: {sub} {n}", "{base} {n}: {sub}",
                "{base}: Beyond {sub}", "{base}: Rise of {sub}", "{base}: Fall of {sub}", "{base}: Shadow of {sub}",
                "{base}: Legacy of {sub}", "{base}: Heart of {sub}", "{base}: Soul of {sub}", "{base}: Wrath of {sub}",
                "{base}: Judgment of {sub}", "{base}: {sub} Protocol", "{base}: The {sub} Initiative", "{base}: {sub} Rising",
                "{base}: {sub} Falling", "{base}: {sub} Forever", "{base}: {sub} Reborn", "{base}: {sub} Unleashed",
                "{base}: {sub} Chronicles", "{base}: {sub} Legends", "{base}: {sub} Stories", "{base}: {sub} Tales",
                "{base}: Extreme", "{base}: Turbo", "{base}: Ultra", "{base}: Championship Edition", "{base}: Game of the Year",
                "{base}: Directors Cut", "{base}: Special Edition", "{base}: Definitive", "{base}: Anniversary",
                "{base}: The Day After", "{base}: 2 Years Later", "{base}: 10 Years Later", "{base}: The Epic Sequel",
                "{base}: Another Story", "{base}: One More Time", "{base}: Still {base}", "{base}: Return to {base}",
                "{base}: Escape from {base}", "{base}: Battle for {base}", "{base}: Siege of {base}", "{base}: War for {base}"
            ],
            prequel: [
                "{base} 0", "{base} 0.5", "{base}: Zero", "{base}: Origins", "{base}: The Beginning", "{base}: Before the Storm",
                "{base}: The Day Before", "{base}: First Contact", "{base}: Foundations", "{base}: Genesis", "{base}: Prologue",
                "{base}: Ancient Ties", "{base}: The First Year", "{base}: Year One", "{base}: Early Days", "{base}: Before {base}",
                "{base}: The Prehistory", "{base}: The Past", "{base}: Memories", "{base}: Legacy", "{base}: Roots",
                "{base}: {sub} Origins", "{base}: Birth of {sub}", "{base}: The First {sub}", "{base}: Before the {sub}",
                "{base}: {sub} Zero", "{base}: {sub} Prologue", "{base}: The {sub} Prequel", "{base}: {sub} Beginnings"
            ],
            remake: [
                "{base} Remake", "{base}: Reborn", "{base} Modernized", "{base}: Reforged", "{base}: Intergrade", "{base}: Remade",
                "{base}: The Remake", "{base} 2026", "{base} Reimagined", "{base}: Recut", "{base}: Restored", "{base}: Revamped",
                "{base}: Rebuilt", "{base}: Remastered \u0026 Remodelled", "{base}: The Re-release", "{base}: New \u0026 Tasty"
            ],
            remaster: [
                "{base} HD", "{base} Remastered", "{base}: Definitive Edition", "{base}: Enhanced Edition", "{base} 4K",
                "{base}: Special Edition", "{base}: Legendary Edition", "{base}: Gold Edition", "{base}: Ultimate", "{base} Plus",
                "{base}: 60FPS", "{base}: Ray Tracing", "{base}: Next-Gen Version", "{base}: Complete", "{base}: GOTY",
                "{base}: Master Version", "{base}: Final Cut", "{base}: The HD Update", "{base}: Ultimate Experience"
            ],
            reboot: [
                "{base} (Reboot)", "{base}: A New Era", "{base}: Starting Over", "{base}: Reawakening", "{base}: The Return",
                "{base}: Reborn Again", "{base}: Fresh Start", "{base}: The Reboot", "{base}: New Beginnings"
            ],
            spinoff: [
                "Tales of {base}", "{base} Chronicles", "{base} Gaiden", "{base}: Side Story", "{base} Adventure",
                "{base} Tactics", "{base} Quest", "{base}: Legacy", "{base}: Heroes", "{base}: Legends", "{base} Dash",
                "{base}: {sub} Quest", "{base}: {sub} Adventures", "{base}: {sub} Tactics", "{base}: {sub} Heroes",
                "{base} Go", "{base} Run", "{base} Puzzle", "{base} Card Game", "{base} Arena", "{base} Royale",
                "{base}: The {sub} Spinoff", "{base} Pinball", "{base} Kart", "{base} Sports"
            ],
            expansion: [
                "{base}: Expansion", "{base} DLC", "{base}: The Lost Chapters", "{base}: Awakening", "{base}: Overdrive",
                "{base}: Director's Cut", "{base}: New Content", "{base}: Extra Levels", "{base}: The Journey Continues",
                "{base}: Mission Pack", "{base}: Level Pack", "{base}: New Challenges", "{base}: Additional Content",
                "{base}: The {sub} Expansion", "{base}: {sub} Add-on", "{base}: {sub} DLC"
            ],
            bundle: [
                "{base} Collection", "{base}: The Anthology", "{base} Trilogy", "{base}: Complete Edition", "{base}: Ultimate Bundle",
                "{base} Classics", "{base}: Volume 1", "{base}: The Series", "{base}: All Games", "{base} Box Set",
                "{base}: {sub} Pack", "{base} Mega Bundle", "{base}: The {sub} Collection"
            ]
        };

        var subTitles = [
            "Judgment", "Fury", "Rising", "Falling", "Destiny", "Fate", "Honor", "Silence", "Darkness", "Light", "Harmony", "Chaos", "Eternal", "Infinite", "Beyond", "Into the Wild", "Underworld", "Empire", "Kingdom", "Shadows", "Ghosts", "Steel", "Blood", "Tears",
            "Storm", "Thunder", "Ice", "Fire", "Earth", "Air", "Space", "Void", "Infinity", "Eternity", "Death", "Life", "Rebirth", "War", "Peace", "Freedom", "Justice", "Revenge", "Mercy", "Power", "Glory", "Victory", "Defeat", "Sacrifice", "Betrayal", "Love", "Hate",
            "Winter", "Summer", "Autumn", "Spring", "Midnight", "Sunrise", "Sunset", "Daybreak", "Nightfall", "Shadow", "Vision", "Dream", "Nightmare", "Sanity", "Madness", "Reason", "Instinct", "Truth", "Lie", "Code", "Secret", "Enigma", "Mystery", "Oracle", "Prophecy",
            "Star", "Moon", "Sun", "Planet", "Galaxy", "Universe", "Cosmos", "Dimension", "Portal", "Gate", "Island", "Ocean", "River", "Mountain", "Forest", "Desert", "Cave", "City", "Village", "Tower", "Castle", "Fortress", "Bastion", "Citadel", "Sanctuary", "Asylum",
            "Hero", "Villain", "Monster", "God", "Demon", "Angel", "Spirit", "Ghost", "Soul", "Heart", "Mind", "Body", "Machine", "Animal", "Human", "Alien", "Cyborg", "Robot", "Dragon", "Knight", "Mage", "Thief", "King", "Queen", "Prince", "Princess", "Emperor",
            "Blade", "Shield", "Hammer", "Axe", "Spear", "Bow", "Magic", "Science", "Tech", "History", "Future", "Ancient", "Modern", "Legend", "Myth", "Fable", "Story", "Tale", "Epic", "Saga", "Chronicle", "Log", "File", "Data", "Memory", "Dream", "Echo", "Whisper",
            "Cold", "Hot", "Sharp", "Dull", "Hard", "Soft", "Dark", "Bright", "Loud", "Quiet", "Fast", "Slow", "High", "Low", "Near", "Far", "Lost", "Found", "Hidden", "Revealed", "Broken", "Fixed", "Dead", "Alive", "Old", "New", "First", "Last", "Pure", "Corrupt",
            "Alpha", "Beta", "Gamma", "Delta", "Omega", "Sigma", "Zeta", "Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Black", "White", "Grey", "Gold", "Silver", "Bronze", "Steel", "Neon", "Cyber", "Steam", "Clockwork", "Digital", "Analog"
        ];

        var list = patterns[type] || ["{base} {n}"];
        var pattern = list[Math.floor(Math.random() * list.length)];

        var numMatch = base.match(/ ([0-9]+)$/);
        var nextNum = numMatch ? parseInt(numMatch[1]) + 1 : 2;

        var romanMatch = base.match(/ (I+V?X?)$/);
        var nextRoman = "II";
        if (romanMatch) {
            var r = romanMatch[1];
            if (r === "I") nextRoman = "II";
            else if (r === "II") nextRoman = "III";
            else if (r === "III") nextRoman = "IV";
            else if (r === "IV") nextRoman = "V";
            else if (r === "V") nextRoman = "VI";
            else nextRoman = "X";
        }

        return pattern.replace(/{base}/g, cleanBase)
            .replace(/{n}/g, nextNum)
            .replace(/{roman}/g, nextRoman)
            .replace(/{sub}/g, subTitles[Math.floor(Math.random() * subTitles.length)]);
    }

    function getStudioTeamQuality(studio) {
        var quality = 0;
        if (!studio.staff) return 0;
        for (var t = 1; t <= 5; t++) {
            quality += (studio.staff[t] || 0) * (starTiers[t].score || 1);
        }
        return quality;
    }

    function startSubsidiaryFranchiseProject(studio, franchise, entryType, size, bundledIds, bundleBaseScore, remakeTargetId) {
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
            bundleBaseScore: bundleBaseScore,
            remakeTargetId: remakeTargetId
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

        var remakeSelection = null;
        var remakeList = $('<div style="display: none; margin-bottom: 20px; background: #eee; padding: 15px; border-radius: 8px; border: 1px solid #bdc3c7;"><b>Select Target Game:</b><div id="remake-options" style="margin-top: 10px; max-height: 150px; overflow-y: auto;"></div></div>');

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
                    remakeList.hide();
                    refreshBundleOptions();
                } else if (type === "remake" || type === "remaster") {
                    bundleList.hide();
                    remakeList.show();
                    refreshRemakeOptions();
                } else {
                    bundleList.hide();
                    remakeList.hide();
                }
                updateEstimates();
            });
            typeRow.append(tBtn);
        });
        mBody.append(typeRow);
        mBody.append(bundleList);
        mBody.append(remakeList);

        function refreshBundleOptions() {
            var options = bundleList.find('#bundle-options').empty();
            franchise.installments.slice().reverse().forEach(function (inst) {
                if (inst.type === "soundtrack" || inst.beingRemade) return;
                var isSel = bundleSelection.indexOf(inst.id) !== -1;
                var item = $('<div class="selectorButton" style="padding: 6px 12px; font-size: 10pt; margin-bottom: 5px; border-radius: 4px; border: 1px solid #bdc3c7; cursor: pointer; transition: all 0.2s;">' + inst.title + ' (S:' + inst.score + ')</div>');
                item.css("background-color", isSel ? "#3498db" : "#ecf0f1").css("color", isSel ? "white" : "#2c3e50");
                item.click(function () {
                    Sound.click();
                    if (bundleSelection.indexOf(inst.id) !== -1) bundleSelection = bundleSelection.filter(function (id) { return id !== inst.id; });
                    else bundleSelection.push(inst.id);
                    refreshBundleOptions();
                    updateEstimates();
                });
                options.append(item);
            });
        }

        function refreshRemakeOptions() {
            var options = remakeList.find('#remake-options').empty();
            var validGames = franchise.installments.slice().reverse().filter(function (i) { return i.type !== "soundtrack" && i.type !== "bundle"; });
            if (!remakeSelection && validGames.length > 0) remakeSelection = validGames[0].id;
            validGames.forEach(function (inst) {
                var isSel = (remakeSelection === inst.id);
                var item = $('<div class="selectorButton" style="padding: 6px 12px; font-size: 10pt; margin-bottom: 5px; border-radius: 4px; border: 1px solid #bdc3c7; cursor: pointer; transition: all 0.2s;">' + inst.title + ' (S:' + inst.score + ')</div>');
                item.css("background-color", isSel ? "#e67e22" : "#ecf0f1").css("color", isSel ? "white" : "#2c3e50");
                item.click(function () {
                    Sound.click();
                    remakeSelection = inst.id;
                    refreshRemakeOptions();
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
                var scoreRange = estimateFranchiseEntryScore(franchise, type, size, remakeSelection);
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
            var entry = { franchiseId: franchise.id, entryType: type, size: size, bundledIds: (type === "bundle" ? bundleSelection : null), remakeTargetId: ((type === "remake" || type === "remaster") ? remakeSelection : null) };
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

            // Close the mod UI
            $.modal.close();

            // Trigger native Game Dev Tycoon new game flow
            setTimeout(function () {
                if (typeof GameManager !== 'undefined' && typeof State !== 'undefined' && typeof State.CreateGame !== 'undefined') {
                    GameManager.flags.selectGameActive = false;
                    GameManager.flags.createPack = false;
                    GameManager.transitionToState(State.CreateGame);
                } else if (typeof UI !== 'undefined' && typeof UI.showGameDefinition !== 'undefined') {
                    UI.showGameDefinition(GameManager.company);
                } else {
                    GameManager.company.notifications.push(new Notification({
                        header: "Franchise Project Prep",
                        text: "Internal development starting for " + franchise.name + ". Click 'Develop New Game' from your desk to begin!",
                        image: ""
                    }));
                }

                setTimeout(function () {
                    var win = $('#gameDefinition');
                    if (!win.length) return;

                    if (win.find('.cs-franchise-reminder').length === 0) {
                        win.append('<div class="cs-franchise-reminder" style="color: #d35400; text-align: center; margin-top: 10px; font-weight: bold; font-size: 11pt;">After the game is released, it will be registered as a release from ' + franchise.name + '</div>');
                    }

                    if (typeof UI !== 'undefined' && typeof GameManager !== 'undefined' && GameManager.company && GameManager.company.currentGame) {
                        var cGame = GameManager.company.currentGame;

                        // Prefill Title
                        var lastInst = (franchise.installments && franchise.installments.length > 0) ? franchise.installments[franchise.installments.length - 1] : null;
                        var baseTitle = lastInst ? lastInst.title : franchise.name;
                        var newTitle = generateFranchiseTitle(baseTitle, type);

                        if (franchise.numId) {
                            newTitle += " (id" + franchise.numId + ")";
                        }

                        win.find('#gameTitle').val(newTitle);
                        cGame.title = newTitle;

                        var sizeMap = { "Small": "gameSizeSmall", "Medium": "gameSizeMedium", "Large": "gameSizeLarge", "AAA": "gameSizeAAA" };
                        var btnClass = sizeMap[size];
                        if (btnClass) {
                            win.find('.gameSizeButton').removeClass('selected');
                            win.find('.' + btnClass).addClass('selected');
                            cGame.gameSize = size;
                        }

                        var lastGame = null;
                        if (franchise.installments && franchise.installments.length > 0) {
                            lastGame = franchise.installments[franchise.installments.length - 1];
                        }

                        if (lastGame) {
                            var gdtGameLog = GameManager.company.gameLog || [];
                            var pastGameInfo = gdtGameLog.filter(function (g) { return g.title === lastGame.title; })[0];

                            var topicToSet = pastGameInfo ? pastGameInfo.topic : franchise.topic;
                            var genreToSet = pastGameInfo ? pastGameInfo.genre : franchise.genre;
                            var secondGenreToSet = pastGameInfo ? pastGameInfo.secondGenre : null;

                            if (topicToSet) {
                                var tpBtn = win.find('.pickTopicButton');
                                tpBtn.get(0).innerText = topicToSet.name || topicToSet;
                                tpBtn.removeClass('selectorButtonEmpty');
                                cGame.topic = topicToSet;
                            }
                            if (genreToSet) {
                                var gnBtn = win.find('#pickGenreButton');
                                gnBtn.get(0).innerText = genreToSet.name || genreToSet;
                                gnBtn.removeClass('selectorButtonEmpty');
                                cGame.genre = genreToSet;
                            }
                            if (secondGenreToSet) {
                                var sGnBtn = win.find('#pickSecondGenreButton');
                                sGnBtn.get(0).innerText = secondGenreToSet.name || secondGenreToSet;
                                sGnBtn.removeClass('selectorButtonEmpty');
                                cGame.secondGenre = secondGenreToSet;
                            }
                        }

                        if (UI._updateGameDefinitionCost) UI._updateGameDefinitionCost();
                        if (UI._updateGameDefinitionNextButtonEnabled) UI._updateGameDefinitionNextButtonEnabled();
                    }
                }, 400);
            }, 300);
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
                var rTarget = ((type === "remake" || type === "remaster") ? remakeSelection : null);
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
            var remakeSelection = null;

            var bundleList = $('<div style="display: none; margin-bottom: 20px; background: #eee; padding: 15px; border-radius: 8px; border: 1px solid #bdc3c7;"><b>Bundle Collection:</b><div id="lic-bundle-options" style="margin-top: 10px; max-height: 150px; overflow-y: auto;"></div></div>');
            var remakeList = $('<div style="display: none; margin-bottom: 20px; background: #eee; padding: 15px; border-radius: 8px; border: 1px solid #bdc3c7;"><b>Select Target Game:</b><div id="lic-remake-options" style="margin-top: 10px; max-height: 150px; overflow-y: auto;"></div></div>');

            var typeSelect = $('<select style="width: 100%; padding: 10px; margin-bottom: 20px; color: black;"></select>');
            ["sequel", "remaster", "remake", "spinoff", "prequel", "bundle"].forEach(function (t) {
                var can = canAddFranchiseEntry(franchise, t, true);
                if (can.ok) typeSelect.append('<option value="' + t + '">' + t.toUpperCase() + '</option>');
            });
            modal.append(typeSelect);
            modal.append(bundleList);
            modal.append(remakeList);

            typeSelect.change(function () {
                type = $(this).val();
                if (type === "bundle") {
                    bundleList.show();
                    remakeList.hide();
                    refreshLicBundleOptions();
                } else if (type === "remaster" || type === "remake") {
                    bundleList.hide();
                    remakeList.show();
                    refreshLicRemakeOptions();
                } else {
                    bundleList.hide();
                    remakeList.hide();
                }
            });

            function refreshLicBundleOptions() {
                var options = bundleList.find('#lic-bundle-options').empty();
                franchise.installments.slice().reverse().forEach(function (inst) {
                    if (inst.type === "soundtrack" || inst.beingRemade) return;
                    var isSel = bundleSelection.indexOf(inst.id) !== -1;
                    var item = $('<div class="selectorButton" style="padding: 6px 12px; font-size: 10pt; margin-bottom: 5px; border-radius: 4px; border: 1px solid #bdc3c7; cursor: pointer; transition: all 0.2s;">' + inst.title + ' (S:' + inst.score + ')</div>');
                    item.css("background-color", isSel ? "#3498db" : "#ecf0f1").css("color", isSel ? "white" : "#2c3e50");
                    item.click(function () {
                        Sound.click();
                        if (bundleSelection.indexOf(inst.id) !== -1) bundleSelection = bundleSelection.filter(function (id) { return id !== inst.id; });
                        else bundleSelection.push(inst.id);
                        refreshLicBundleOptions();
                    });
                    options.append(item);
                });
            }

            function refreshLicRemakeOptions() {
                var options = remakeList.find('#lic-remake-options').empty();
                var validGames = franchise.installments.slice().reverse().filter(function (i) { return i.type !== "soundtrack" && i.type !== "bundle"; });
                if (!remakeSelection && validGames.length > 0) remakeSelection = validGames[0].id;
                validGames.forEach(function (inst) {
                    var isSel = (remakeSelection === inst.id);
                    var item = $('<div class="selectorButton" style="padding: 6px 12px; font-size: 10pt; margin-bottom: 5px; border-radius: 4px; border: 1px solid #bdc3c7; cursor: pointer; transition: all 0.2s;">' + inst.title + ' (S:' + inst.score + ')</div>');
                    item.css("background-color", isSel ? "#e67e22" : "#ecf0f1").css("color", isSel ? "white" : "#2c3e50");
                    item.click(function () {
                        Sound.click();
                        remakeSelection = inst.id;
                        refreshLicRemakeOptions();
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

                var fee = (franchise.tier === 1) ? 5000 : (franchise.tier === 2) ? 12500 : (franchise.tier === 3) ? 25000 : (franchise.tier === 4) ? 50000 : 125000;
                if (GameManager.company.cash < fee) { alert("Not enough cash for license fee ($" + UI.getShortNumberString(fee) + ")!"); return; }
                GameManager.company.adjustCash(-fee, "Franchise License Fee: " + franchise.name);

                var bIds = (type === "bundle" ? bundleSelection : null);
                var rTarget = ((type === "remaster" || type === "remake") ? remakeSelection : null);
                var bScore = 0;
                if (type === "bundle") {
                    var tot = 0;
                    bundleSelection.forEach(function (bid) {
                        var inst = franchise.installments.filter(function (i) { return i.id === bid; })[0];
                        tot += (inst ? inst.score : 5);
                    });
                    bScore = tot / bundleSelection.length;
                }

                startSubsidiaryFranchiseProject(s, franchise, type, size, bIds, bScore, rTarget);
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

                var weeks = Math.min(300, Math.floor(Math.pow(budget / 100000, 0.75)) + 8);
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
                    currentEpisode: 0,
                    totalEpisodes: 1,
                    nextReleaseWeek: 0,
                    decayRate: 0.9,
                    studioRepBonus: studio.reputation * 0.3,
                    studioShare: 1.0 - pShare
                };
                studio.currentDeal = p;
                if (!store.data.mediaProjects) store.data.mediaProjects = [];
                store.data.mediaProjects.push(p);

                if (!f.mediaProperties) f.mediaProperties = [];
                f.mediaProperties.push({ title: p.title, type: "movie", budget: budget });

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
                var crossBtn = $('<div class="entry-type-btn fran-tier-5" style="border: 2px solid gold; flex: 1; text-align: center; cursor: pointer;">[ CROSSOVER ]</div>');
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
                        store.data.lastFranchiseNumId = (store.data.lastFranchiseNumId || 0) + 1;
                        var f = {
                            id: "FRAN_" + Date.now() + "_" + Math.floor(Math.random() * 100000),
                            numId: store.data.lastFranchiseNumId,
                            name: name,
                            ownerId: "player",
                            originGameId: game.id,
                            originGameTitle: game.title,
                            topic: game.topic.name,
                            genre: game.genre.name,
                            tier: 1,
                            totalRevenue: game.totalSalesCash,
                            installments: [{
                                id: "FE_" + Date.now() + "_" + Math.floor(Math.random() * 100000),
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
                        if (!f.acquisitionHistory) f.acquisitionHistory = [];
                        f.acquisitionHistory.push({ week: Math.floor(GameManager.company.currentWeek), newOwner: "player", price: f.salePrice });
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
                            if (!f.acquisitionHistory) f.acquisitionHistory = [];
                            f.acquisitionHistory.push({ week: Math.floor(GameManager.company.currentWeek), newOwner: "player", price: salePrice });
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
                var active = mediaArr.filter(function (p) { return p.status === "inProduction" || p.status === "releasing"; });
                if (active.length === 0) {
                    container.append('<div style="text-align: center; padding: 40px; color: #7f8c8d;">No media projects currently active or releasing.</div>');
                }
                active.forEach(function (p) {
                    var card = $('<div class="cs-stagger-item" style="background: #ffffff; border-radius: 12px; border: 1px solid #dee2e6; padding: 18px; margin-bottom: 18px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); position: relative; overflow: hidden;"></div>');
                    var icons = { "movie": "[Movie]", "tvSeries": "[TV Show]", "animatedShow": "[Animation]", "soundtrack": "[Music]", "merchandise": "[Merch]", "comicBook": "[Comic]" };

                    var header = $('<div style="display: flex; justify-content: space-between; align-items: start;"></div>');
                    header.append('<div style="font-size: 15pt; color: #212529;"><b>' + (icons[p.type] || "[Media]") + ' ' + p.title + '</b></div>');

                    var statusLabel = p.isReleasing ? "ON AIR" : (p.status === "inProduction" ? "IN PRODUCTION" : "PRODUCTION COMPLETED");
                    var statusColor = p.isReleasing ? "#27ae60" : "#d35400";
                    header.append('<div style="background: ' + statusColor + '1a; color: ' + statusColor + '; padding: 4px 8px; border-radius: 4px; font-size: 8pt; font-weight: bold;">' + statusLabel + '</div>');
                    card.append(header);

                    if (p.status === "inProduction") {
                        var sProd = p.seasonsProduced || 0;
                        var seasonLabel = p.seasons > 1 ? "Season " + (sProd + 1) + " Production" : "Production Progress";
                        var wPerS = p.weeksPerSeason || p.totalWeeks || 8;
                        var progress = ((wPerS - p.weeksRemaining) / wPerS) * 100;
                        if (isNaN(progress)) progress = 0;
                        card.append('<div style="margin-top: 15px; font-size: 10pt; color: #495057; display: flex; justify-content: space-between;"><span>' + seasonLabel + '</span><span>' + Math.floor(progress) + '%</span></div>');
                        card.append('<div class="cs-progress-track" style="background: #e9ecef; height: 10px; border-radius: 5px; margin-top: 5px; overflow: hidden;"><div class="cs-progress-fill" style="width: ' + progress + '%; height: 100%; background: #f39c12; transition: width 0.5s ease;"></div></div>');
                    }

                    if (p.isReleasing || p.status === "releasing") {
                        var totalEps = p.totalEpisodes || 1;
                        var epProgress = (p.currentEpisode / totalEps) * 100;
                        if (isNaN(epProgress)) epProgress = 0;
                        var label = "On Air: " + (p.type === "comicBook" ? "Issue " : "Episode ") + p.currentEpisode + " / " + totalEps;
                        card.append('<div style="margin-top: 15px; font-size: 10pt; color: #495057; display: flex; justify-content: space-between;"><span>' + label + '</span><span>' + Math.floor(epProgress) + '%</span></div>');
                        card.append('<div class="cs-progress-track" style="background: #e9ecef; height: 10px; border-radius: 5px; margin-top: 5px; overflow: hidden;"><div class="cs-progress-fill" style="width: ' + epProgress + '%; height: 100%; background: #27ae60; transition: width 0.5s ease;"></div></div>');
                    }

                    var stats = $('<div style="margin-top: 15px; display: flex; gap: 15px; font-size: 9pt; color: #6c757d;"></div>');
                    stats.append('<div style="flex: 0 0 auto;">Budget: <b>$' + UI.getShortNumberString(p.budget) + '</b></div>');
                    if (p.status === "inProduction") stats.append('<div style="flex: 0 0 auto;">Completion: <b>' + p.weeksRemaining + ' weeks</b></div>');
                    else stats.append('<div style="flex: 0 0 auto;">Next Release: <b>' + Math.max(0, p.nextReleaseWeek - Math.floor(GameManager.company.currentWeek)) + ' weeks</b></div>');
                    card.append(stats);

                    var cancelBtn = $('<div style="position: absolute; bottom: 12px; right: 15px;"><span style="color: #adb5bd; cursor: pointer; font-size: 8pt; text-decoration: underline; transition: color 0.2s;">Cancel ' + (p.status === "inProduction" ? "Project" : "Release") + '</span></div>');
                    cancelBtn.hover(function () { $(this).css('color', '#e74c3c'); }, function () { $(this).css('color', '#adb5bd'); });
                    cancelBtn.click(function () {
                        var msg = p.status === "inProduction" ? "Cancel this production? You will only be refunded 30% of the budget." : "Stop this release window? Future episodes/issues and revenue will be lost.";
                        if (confirm(msg)) {
                            if (p.status === "inProduction" && !isNaN(p.budget)) GameManager.company.adjustCash(p.budget * 0.3, "Media Cancellation Refund");
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

                    if (isNaN(budget) || budget <= 0) {
                        alert("Please enter a valid production budget.");
                        return;
                    }

                    if (!type) {
                        alert("Please select a project type.");
                        return;
                    }

                    var minReqObj = types.filter(function (t) { return t.id === type; })[0];
                    var minReq = minReqObj ? minReqObj.min : 0;
                    if (budget < minReq) { alert("Insufficient budget for this type! Minimum: $" + UI.getShortNumberString(minReq)); return; }

                    if (type === "soundtrack" && budget > 500000) {
                        alert("Soundtrack budget cannot exceed $500,000 as per technical specifications.");
                        return;
                    }

                    if (GameManager.company.cash < budget) { alert("Not enough cash!"); return; }

                    var weeks = Math.min(300, Math.floor(Math.pow(budget / 100000, 0.75)) + 8);
                    if (type === "soundtrack") weeks = 6;

                    var totalSeasons = (function () {
                        if (type === "movie" || type === "soundtrack" || type === "merchandise") return 1;
                        return parseInt(form.find('.seasons-in').val()) || 1;
                    })();
                    var epPerSeason = (function () {
                        if (type === "movie" || type === "soundtrack" || type === "merchandise") return 1;
                        return parseInt(form.find('.episodes-in').val()) || 1;
                    })();

                    var p = {
                        id: "MEDIA_" + Date.now(),
                        type: type,
                        franchiseId: fid || null,
                        title: (f ? f.name : "New Project") + " " + (type ? type.toUpperCase() : "MEDIA"),
                        producedBy: "player",
                        budget: budget,
                        weeksRemaining: Math.floor(weeks / totalSeasons),
                        weeksPerSeason: Math.floor(weeks / totalSeasons),
                        totalWeeks: weeks,
                        status: "inProduction",
                        score: 0,
                        totalRevenue: 0,
                        weeklyRevenue: 0,
                        salesWeeksLeft: 0,
                        currentEpisode: 0,
                        totalEpisodes: (type === "comicBook" ? epPerSeason : epPerSeason * totalSeasons),
                        nextReleaseWeek: 0,
                        decayRate: (type === "movie" ? 0.75 : 0.9),
                        seasons: totalSeasons,
                        episodes: epPerSeason,
                        seasonsProduced: 0,
                        isReleasing: false,
                        studioRepBonus: 0
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
                    for (var rS = 0; rS < (s.reputation || 0); rS++) repStars += "*";
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
        labelWrapper.append('<div style="font-size: 10pt; color: #7f8c8d; margin-top: 5px; display: block; border-top: 1px solid #eee; padding-top: 5px;">When enabled, this removes the penalty for having too many features in a game and proactively cleans up 80% of project bugs. (Experimental)</div>');

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

    function showSearchableList(title, items, onSelect, inlineContainer) {
        var modal = $('<div class="windowBorder tallWindow" style="background-color: #ecf0f1; border-radius: 14px; padding: 15px; display: flex; flex-direction: column; overflow: hidden; position: relative;' + (inlineContainer ? ' width: 100%; height: 100%; box-sizing: border-box;' : '') + '"></div>');
        
        var closeAction = function() {
            if (inlineContainer) {
                modal.remove();
                inlineContainer.children().show();
            } else {
                $.modal.close();
            }
        };

        var xBtn = $('<div style="position: absolute; right: 10px; top: 10px; width: 24px; height: 24px; line-height: 22px; text-align: center; border-radius: 50%; background: #e74c3c; color: white; font-weight: bold; cursor: pointer; font-size: 14pt; z-index: 1000; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">×</div>');
        xBtn.click(closeAction);
        xBtn.hover(function () { $(this).css('background', '#c0392b'); }, function () { $(this).css('background', '#e74c3c'); });
        modal.append(xBtn);
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
                        closeAction();
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
        closeBtn.click(closeAction);
        modal.append(closeBtn);

        if (inlineContainer) {
            inlineContainer.children().hide();
            inlineContainer.append(modal);
            setTimeout(function () { searchInput.focus(); }, 100);
        } else {
            modal.modal({
                overlayClose: true,
                opacity: 80,
                overlayCss: { backgroundColor: "#000" },
                containerCss: { width: "400px", height: "500px", backgroundColor: "transparent", border: "none" }
            });
            setTimeout(function () { searchInput.focus(); }, 100);
        }
    }

    function renderPublishingForm(container, prefilled) {
        container.css({ opacity: 0 });
        container.empty();

        var formBox = $('<div class="windowBorder" style="background-color: #ecf0f1; border: 1px solid #bdc3c7; padding: 20px; margin-bottom: 20px;"></div>');

        var titleContainer = $('<div style="text-align: center; margin-bottom: 20px;"></div>');
        titleContainer.append('<div style="font-size: 20pt; font-weight: bold; color: #2c3e50; margin-bottom: 5px;">Game Concept</div>');
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
            }, container);
        });
        formBox.append(topicBtn);

        var genreRow = $('<div style="display: flex; gap: 10px; margin-bottom: 20px; justify-content: center;"></div>');
        var g1Btn = $('<div class="selectorButton lightBlueButton" style="flex: 1; text-align: center; font-size: 12pt; padding: 10px 0; border-radius: 6px;">Pick Genre (' + selectedGenre + ')</div>');
        var g2Btn = $('<div class="selectorButton lightBlueButton" style="flex: 1; text-align: center; font-size: 12pt; padding: 10px 0; border-radius: 6px;">Pick Genre (None)</div>');

        g1Btn.click(function () {
            showSearchableList("Select Main Genre", GameGenre.getAll(), function (name) {
                selectedGenre = name;
                g1Btn.text('Pick Genre (' + selectedGenre + ')');
            }, container);
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
            }, container);
        });
        genreRow.append(g1Btn).append(g2Btn);
        formBox.append(genreRow);

        var currentWk = GameManager.company.currentWeek;
        function parseGameWeek(dateVal) {
            if (!dateVal) return 0;
            if (typeof dateVal === 'number') return dateVal;
            if (typeof General !== 'undefined' && General.getWeekFromDateString) return General.getWeekFromDateString(dateVal);
            var parts = dateVal.split('/');
            if (parts.length === 3) return (parseInt(parts[0]) - 1) * 48 + (parseInt(parts[1]) - 1) * 4 + parseInt(parts[2]);
            return 0;
        }

        var myPlats = Platforms.allPlatforms.filter(function (p) {
            var pubWk = parseGameWeek(p.published);
            var retWk = p.retireDate ? parseGameWeek(p.retireDate) : Infinity;
            return (pubWk <= currentWk) && (retWk > currentWk);
        });
        if (myPlats.length === 0) myPlats = [Platforms.allPlatforms[0]];

        var p1 = myPlats[0] ? myPlats[0].name : "PC";
        var p2 = "None";
        var p3 = "None";
        var platRow = $('<div style="display: flex; gap: 8px; margin-bottom: 20px; justify-content: center;"></div>');
        var pList = [{name: "None"}].concat(myPlats);

        function updatePlatShelf() {
            platRow.empty();
            var b1 = $('<div class="selectorButton lightBlueButton" style="flex: 1; text-align: center; font-size: 11pt; padding: 10px 0; border-radius: 6px;">Slot 1 (' + p1 + ')</div>');
            b1.click(function () { showSearchableList("Select Platform 1", pList, function (name) { p1 = name; updatePlatShelf(); }, container); });
            platRow.append(b1);

            var b2 = $('<div class="selectorButton lightBlueButton" style="flex: 1; text-align: center; font-size: 11pt; padding: 10px 0; border-radius: 6px;">Slot 2 (' + p2 + ')</div>');
            b2.click(function () { showSearchableList("Select Platform 2", pList, function (name) { p2 = name; updatePlatShelf(); }, container); });
            platRow.append(b2);

            var b3 = $('<div class="selectorButton lightBlueButton" style="flex: 1; text-align: center; font-size: 11pt; padding: 10px 0; border-radius: 6px;">Slot 3 (' + p3 + ')</div>');
            b3.click(function () { showSearchableList("Select Platform 3", pList, function (name) { p3 = name; updatePlatShelf(); }, container); });
            platRow.append(b3);
        }
        updatePlatShelf();
        formBox.append(platRow);

        var footer = $('<div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;"></div>');
        var cancelBtn = $('<div class="selectorButton deleteButton" style="width: 120px; text-align: center; font-size: 12pt; font-weight: bold; border-radius: 6px;">Cancel</div>');
        cancelBtn.click(function () { routeModMenu("publishing"); });

        var confirmBtn = $('<div class="selectorButton orangeButton" style="width: 160px; text-align: center; font-size: 12pt; font-weight: bold; border-radius: 6px;">Post Offer</div>');
        confirmBtn.click(function () {
            var advance = sizes.filter(function (x) { return x.id === selectedSize; })[0].cost;
            selectedPlats = [p1, p2, p3].filter(function(x) { return x !== "None"; });
            if (selectedPlats.length === 0) selectedPlats = [myPlats[0] ? myPlats[0].name : "PC"];

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
                            var dlcCost = Math.floor((game.costs || 100000) * 0.1);
                            if (dlcCost < 20000) dlcCost = 20000;

                            var dlcBtn = $('<div class="selectorButton orangeButton" style="flex: 1; font-size: 10pt;">Develop DLC ($' + UI.getShortNumberString(dlcCost) + ')</div>');
                            dlcBtn.click(function () {
                                if (GameManager.company.cash >= dlcCost) {
                                    Sound.click();
                                    GameManager.company.adjustCash(-dlcCost, "DLC Development: " + game.title);
                                    if (!store.data.dlcData[game.id]) store.data.dlcData[game.id] = { count: 0, activeDLCs: [] };
                                    store.data.dlcData[game.id].activeDLCs.push({
                                        pendingPlayerDev: 10,
                                        gameTitle: game.title,
                                        weeklyRevenue: Math.floor((game.totalSalesCash || 1500000) * 0.015)
                                    });
                                    store.data.dlcData[game.id].count++;
                                    $.modal.close();
                                } else {
                                    alert("Not enough funds!");
                                }
                            });
                            dlcControls.append(dlcBtn);

                            for (var s = 0; s < store.data.studios.length; s++) {
                                if (store.data.studios[s].sharesOwned >= 50 && !store.data.studios[s].currentProject) {
                                    var subBtn = $('<div class="selectorButton whiteBoardButton" style="flex: 1; font-size: 10pt; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Assign: ' + store.data.studios[s].name + '</div>');
                                    (function (studio) {
                                        subBtn.click(function () {
                                            studio.currentProject = {
                                                name: game.title + " DLC",
                                                isDLC: true,
                                                gameId: game.id,
                                                weeklyRevenue: Math.floor((game.totalSalesCash || 1500000) * 0.015),
                                                weeksRemaining: 18
                                            };
                                            if (!store.data.dlcData[game.id]) store.data.dlcData[game.id] = { count: 0, activeDLCs: [] };
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

        var warningArea = $('<div style="font-size: 9pt; color: #e74c3c; margin: -10px 0 15px 5px; min-height: 12px; font-weight: bold;"></div>');
        formBox.append(warningArea);

        function updateWarning() {
            var selectedId = targetSelect.val();
            var g = GameManager.company.gameLog.filter(function (game) { return game.id == selectedId; })[0];
            warningArea.text("");
            if (g && g.state === GameState.released && !g.isExtensionPack) {
                var age = GameManager.company.currentWeek - g.releaseWeek;
                if (age >= 20) {
                    warningArea.text("! Project too old for marketing (limit: 20 weeks).");
                } else if (age >= 17) {
                    warningArea.css('color', '#f39c12').text("! Project nearing marketing limit (" + Math.floor(20 - age) + " weeks left).");
                } else {
                    warningArea.css('color', '#e74c3c');
                }
            }
        }
        targetSelect.change(updateWarning);
        updateWarning();


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

        var breakdownStr = '<span style="font-size: 9pt; color: #7f8c8d;">[' + studio.staff[1] + '*1 | ' + studio.staff[2] + '*2 | ' + studio.staff[3] + '*3 | ' + studio.staff[4] + '*4 | ' + studio.staff[5] + '*5]</span>';
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
            staffSelect.append('<option value="1">1* (H:$2K)</option><option value="2" selected>2* (H:$5K)</option><option value="3">3* (H:$15K)</option><option value="4">4* (H:$50K)</option><option value="5">5* (H:$200K)</option>');

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

                        var quality = getStudioTeamQuality(studio);
                        var dPts = Math.floor(quality * 25) + 1;
                        var tPts = Math.floor(quality * 25) + 1;
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

        var p1 = myPlats[0] ? myPlats[0].name : "PC";
        var p2 = "None";
        var p3 = "None";
        var pList = [{name: "None"}].concat(myPlats);
        var platRow = $('<div style="display: flex; gap: 8px; margin-bottom: 20px; justify-content: center;"></div>');

        function updatePlatShelf() {
            platRow.empty();
            var b1 = $('<div class="selectorButton lightBlueButton" style="flex: 1; text-align: center; font-size: 11pt; padding: 6px 0; border-radius: 4px;">Slot 1 (' + p1 + ')</div>');
            b1.click(function () { showSearchableList("Select Platform 1", pList, function (n) { p1 = n; updatePlatShelf(); }, contentArea); });
            platRow.append(b1);

            var b2 = $('<div class="selectorButton lightBlueButton" style="flex: 1; text-align: center; font-size: 11pt; padding: 6px 0; border-radius: 4px;">Slot 2 (' + p2 + ')</div>');
            b2.click(function () { showSearchableList("Select Platform 2", pList, function (n) { p2 = n; updatePlatShelf(); }, contentArea); });
            platRow.append(b2);

            var b3 = $('<div class="selectorButton lightBlueButton" style="flex: 1; text-align: center; font-size: 11pt; padding: 6px 0; border-radius: 4px;">Slot 3 (' + p3 + ')</div>');
            b3.click(function () { showSearchableList("Select Platform 3", pList, function (n) { p3 = n; updatePlatShelf(); }, contentArea); });
            platRow.append(b3);
        }
        updatePlatShelf();
        formContainer.append('<div>Platforms (Max 3):</div>').append(platRow);

        contentArea.append(formContainer);

        var actionContainer = $('<div class="centeredButtonWrapper" style="margin-top: 10px;"></div>');
        var confirmBtn = $('<div class="selectorButton orangeButton" style="display: inline-block; width: 160px; font-size: 11pt;">Begin Development</div>');
        confirmBtn.click(function () {
            if (GameManager.company.cash >= 1000000) {
                var selectedTopic = $('#inst_topic').val();
                var selectedGenre = $('#inst_genre').val();
                var selectedSize = $('#inst_size').val();
                var selectedPlats = [p1, p2, p3].filter(function(x) { return x !== "None"; });
                if (selectedPlats.length === 0) selectedPlats = [p1];

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
            var container = $('<div class="windowBorder tallWindow" style="background-color: #ecf0f1; border-radius: 14px; padding: 14px; text-align: center; position: relative;"></div>');
            var xBtn = $('<div style="position: absolute; right: 10px; top: 10px; width: 24px; height: 24px; line-height: 22px; text-align: center; border-radius: 50%; background: #e74c3c; color: white; font-weight: bold; cursor: pointer; font-size: 14pt; z-index: 1000; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">×</div>');
            xBtn.click(function () { $.modal.close(); });
            xBtn.hover(function () { $(this).css('background', '#c0392b'); }, function () { $(this).css('background', '#e74c3c'); });
            container.append(xBtn);
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
                containerCss: { width: "420px", height: "auto", backgroundColor: "transparent", border: "none" }
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

    // Sidebar Integration for Market Management
    $(document).on('click', '#gameSalesContainer .gameSalesCard, #gameSalesContainer > div', function (e) {
        var name = $(this).find('.gameNameLabel').text();
        if (!name) return;

        var game = GameManager.company.gameLog.first(function (g) { return g.title === name && (g.state === GameState.released || g.isOnSale()); });
        if (!game) return;

        e.stopPropagation();
        showMarketDropdown(game, this);
    });

    function showMarketDropdown(game, el) {
        $('.cs-market-dropdown').remove();
        var dropdown = $('<div class="cs-market-dropdown" style="position: absolute; z-index: 20000; background: #2c3e50; color: white; border: 1px solid #34495e; border-radius: 6px; box-shadow: 0 4px 15px rgba(0,0,0,0.4); padding: 8px; width: 180px; font-family: Segoe UI, Tahoma, sans-serif;"></div>');

        dropdown.append('<div style="font-size: 10pt; font-weight: bold; border-bottom: 1px solid #555; margin-bottom: 8px; padding-bottom: 4px; color: #ecf0f1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + game.title + '</div>');

        // Withdraw
        var withdrawAction = $('<div style="padding: 6px; cursor: pointer; font-size: 9pt; border-radius: 4px; transition: background 0.2s; color: #e74c3c;">\u26D4 Withdraw from Market</div>');
        withdrawAction.hover(function () { $(this).css('background', '#3d1c1c'); }, function () { $(this).css('background', 'transparent'); });
        withdrawAction.click(function () {
            if (confirm("Withdraw " + game.title + " from the market?")) {
                Sound.click();
                game.releaseWeek = GameManager.company.currentWeek - 1000;
                dropdown.remove();
            }
        });
        dropdown.append(withdrawAction);

        // Maintain
        var mCost = Math.floor((game.totalSalesCash || 100000) * 0.05) + 20000;
        var maintainAction = $('<div style="padding: 6px; cursor: pointer; font-size: 9pt; border-radius: 4px; transition: background 0.2s; color: #2ecc71;">\u267B Maintain (+$' + UI.getShortNumberString(mCost) + ')</div>');
        maintainAction.hover(function () { $(this).css('background', '#1b3d2c'); }, function () { $(this).css('background', 'transparent'); });
        maintainAction.click(function () {
            if (GameManager.company.cash >= mCost) {
                Sound.click();
                GameManager.company.adjustCash(-mCost, "Market Maintenance: " + game.title);
                game.modMarketExtension = (game.modMarketExtension || 0) + 4;
                dropdown.remove();
            } else {
                alert("Insufficient funds!");
            }
        });
        dropdown.append(maintainAction);

        $('body').append(dropdown);
        var offset = $(el).offset();
        dropdown.css({ top: offset.top, left: offset.left - 190 });

        setTimeout(function () {
            $(document).one('click', function () { $('.cs-market-dropdown').remove(); });
        }, 10);
    }

})();
