(function () {
    console.log("Concurrent Studios mod loaded.");

    // Data Store
    var store = GDT.getDataStore("concurrent_studios");
    var isShowingDraft = false;

    // Initialization hook
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
            e.items.push({
                label: "Post Publishing Deal...",
                action: function () {
                    Sound.click();
                    showModMenu("publishing");
                }
            });
            if (GameManager.company.gameLog && GameManager.company.gameLog.length > 0) {
                e.items.push({
                    label: "Develop DLC...",
                    action: function () {
                        Sound.click();
                        showModMenu("dlc");
                    }
                });
            }
        }
    });

    function initData() {
        if (!store.data.studios || store.data.studios.length < 50) {
            store.data.studios = generateInitialStudios();
        }
        if (!store.data.dlcData) {
            store.data.dlcData = {};
        }
        if (!store.data.lastWeekProcessed) {
            store.data.lastWeekProcessed = -1;
        }
        if (!store.data.releaseHistory) {
            store.data.releaseHistory = []; // Tracks released AI games for the schedule UI
        }
        if (!store.data.publishingOffers) {
            store.data.publishingOffers = [];
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
            // Valuation between 2M and 150M loosely based on popularity / random
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

    // Global interval to check the game week and inject UI
    setInterval(function () {
        // Wait until GameManager and UI are loaded
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

        // Perform weekly simulation for studios and active DLC
        try {
            processCompetitors();
        } catch(e) { console.error("[Mod] processCompetitors error:", e); }
        try {
            processDLCs();
        } catch(e) { console.error("[Mod] processDLCs error:", e); }
        try {
            processDividends();
        } catch(e) { console.error("[Mod] processDividends error:", e); }
        try {
            processPublishingProjects();
        } catch(e) { console.error("[Mod] processPublishingProjects error:", e); }

        // Sync Interceptor for Notifications (Stops the visual flicker spam)
        try {
            patchNotifications();
            patchSequelFilters();
        } catch(e) { console.error("[Mod] patching error:", e); }
        
        // Revive massive sales surges for Base Games when a native DLC finishes!
        for (var i = 0; i < GameManager.company.gameLog.length; i++) {
            var g = GameManager.company.gameLog[i];
            if (g.flags && g.flags.isExtensionPack && g.sequelTo && !g.modDlcRevived) {
                g.modDlcRevived = true;
                var baseGame = GameManager.company.getGameById(g.sequelTo);
                if (baseGame && !baseGame.flags.mmo) {
                    var dlcBonus = (g.score || 5) * 250000; // Surge scales with review score!
                    GameManager.company.adjustCash(dlcBonus, "Base Game Surge: " + baseGame.title);
                    GameManager.company.notifications.push(new Notification({
                        header: "Storefront Surge",
                        text: "The DLC launch for " + baseGame.title + " generated a massive surge of $" + UI.getShortNumberString(dlcBonus) + " in classic back-catalog sales!",
                        image: ""
                    }));
                }
            }
        }
        
        // Split Revenue Intercept: remove 70% of gross from Published Games so player only nets 30% contract cut!
        for (var i = 0; i < GameManager.company.gameLog.length; i++) {
            var g = GameManager.company.gameLog[i];
            if (g.state === GameState.released && g.modIsPublishingDeal) {
                var delta = g.totalSalesCash - (g.modLastSalesCash || 0);
                if (delta > 0) {
                    var takeBack = delta * 0.70;
                    GameManager.company.adjustCash(-takeBack, "Publisher 70% Cut: " + g.title);
                    g.modLastSalesCash = g.totalSalesCash;
                }
            }
        }
    }

    // Sync Interceptor for Notifications (Stops the visual flicker spam)
    function patchNotifications() {
        if (!GameManager.company || !GameManager.company.notifications) return;
        var originalPush = GameManager.company.notifications.push;
        if (originalPush.isModPatched) return;

        GameManager.company.notifications.push = function (n) {
            if (n && n.header === "Game off the market.".localize("heading")) {
                var isModGame = false;
                for (var j = 0; j < GameManager.company.gameLog.length; j++) {
                    var g = GameManager.company.gameLog[j];
                    if (g.modAI && n.text.indexOf(g.title) !== -1) {
                        isModGame = true; break;
                    }
                }
                if (isModGame) return 1; // Discard!
            }
            return originalPush.apply(this, arguments);
        };
        GameManager.company.notifications.push.isModPatched = true;
    }

    // Continuous patching check to ensure it stays active through loads
    setInterval(function () {
        if (typeof GameManager !== 'undefined' && GameManager.company) {
            patchNotifications();
            patchSequelFilters();
        }
    }, 1000);

    function processDividends() {
        if (!GameManager.company || !GameManager.company.gameLog) return;
        var currentWeek = Math.floor(GameManager.company.currentWeek);
        var studios = store.data.studios || [];
        
        studios.forEach(function(studio) {
            if ((studio.sharesOwned || 0) <= 0) return;
            
            var studioWeeklyRevenue = 0;
            GameManager.company.gameLog.forEach(function(g) {
                if (g.modStudioId === studio.id && g.releaseWeek < currentWeek && !g.soldOut) {
                    var weekIndex = currentWeek - Math.floor(g.releaseWeek);
                    if (g.salesCashLog && g.salesCashLog[weekIndex]) {
                        studioWeeklyRevenue += g.salesCashLog[weekIndex];
                    }
                }
            });

            if (studioWeeklyRevenue > 0) {
                var dividend = studioWeeklyRevenue * (studio.sharesOwned / 100);
                if (dividend > 0) {
                    GameManager.company.adjustCash(dividend, "Dividend: " + studio.name + " (" + studio.sharesOwned + "%)");
                }
            }
        });
    }

    function patchSequelFilters() {
        try {
            if (typeof Company === 'undefined' || !Company.prototype) return;
            
            if (Company.prototype.getPossibleGamesForSequel && !Company.prototype.getPossibleGamesForSequel.isModPatched) {
                var originalSequel = Company.prototype.getPossibleGamesForSequel;
                Company.prototype.getPossibleGamesForSequel = function() {
                    var list = originalSequel.apply(this, arguments);
                    return list.filter(function(g) { return !g.modAI; });
                };
                Company.prototype.getPossibleGamesForSequel.isModPatched = true;
            }

            if (Company.prototype.getPossibleGamesForPack && !Company.prototype.getPossibleGamesForPack.isModPatched) {
                var originalPack = Company.prototype.getPossibleGamesForPack;
                Company.prototype.getPossibleGamesForPack = function() {
                    var list = originalPack.apply(this, arguments);
                    return list.filter(function(g) { return !g.modAI; });
                };
                Company.prototype.getPossibleGamesForPack.isModPatched = true;
            }
        } catch(e) {
            // Silently fail — Company may not be fully loaded yet
        }
    }

    var starTiers = {
        1: { hire: 50000, fire: 25000, maint: 4000, speed: 0.02, score: 0.2, label: "1-Star" },
        2: { hire: 100000, fire: 50000, maint: 8000, speed: 0.05, score: 0.5, label: "2-Star" },
        3: { hire: 250000, fire: 125000, maint: 20000, speed: 0.10, score: 1.0, label: "3-Star" },
        4: { hire: 1000000, fire: 500000, maint: 50000, speed: 0.20, score: 1.5, label: "4-Star" },
        5: { hire: 5000000, fire: 2500000, maint: 150000, speed: 0.40, score: 2.5, label: "5-Star" }
    };

    function ensureStaffObj(studio) {
        if (!studio.staff) {
            studio.staff = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
            if (typeof studio.employees === "number") {
                studio.staff[2] = studio.employees; // Migrate old employees to 2-Star
                delete studio.employees;
            } else {
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
    }

    function processCompetitors() {
        var currentWeek = Math.floor(GameManager.company.currentWeek);
        var studios = store.data.studios;
        for (var i = 0; i < studios.length; i++) {
            var studio = studios[i];
            
            ensureStaffObj(studio);

            // Maintenance for founded studios
            if (studio.sharesOwned >= 50 && (currentWeek % 4 === 0) && studio.isFounded) {
                var maint = 0;
                for (var t=1; t<=5; t++) maint += (starTiers[t].maint * studio.staff[t]);
                maint *= 4; // Pay for 4 weeks
                if (maint > 0) {
                    GameManager.company.cash -= maint;
                    if (!GameManager.company.cashLog) GameManager.company.cashLog = [];
                    GameManager.company.cashLog.push({amount: -maint, label: "Upkeep: " + studio.name});
                }
            }

            if (studio.currentProject) {
                var speedMultiplier = 1;
                for (var t=1; t<=5; t++) speedMultiplier += (starTiers[t].speed * studio.staff[t]);

                studio.currentProject.weeksRemaining -= speedMultiplier;
                if (studio.currentProject.weeksRemaining <= 0) {
                    finishAndReleaseGame(studio);
                }
            } else {
                // If they don't have a current project
                if (studio.sharesOwned >= 50 && typeof studio.isFounded !== 'undefined') {
                    if (typeof studio.draftCooldown === 'undefined') studio.draftCooldown = Math.floor(Math.random() * 4) + 2;
                    if (studio.draftCooldown > 0) {
                        studio.draftCooldown--;
                    } else if (typeof isShowingDraft !== 'undefined' && !isShowingDraft) {
                        var draft = generateBestDraft(studio);
                        promptDraft(studio, draft);
                    }
                    continue; // Skip normal AI offer evaluation
                }

                // If independent, evaluate publishing offers first
                var acceptedOffer = false;
                if (!studio.isFounded && store.data.publishingOffers && store.data.publishingOffers.length > 0) {
                    for (var j = 0; j < store.data.publishingOffers.length; j++) {
                        var offer = store.data.publishingOffers[j];
                        var canHandle = false;
                        if (offer.size === "Small") canHandle = true;
                        if (offer.size === "Medium" && studio.valuation > 5000000) canHandle = true;
                        if (offer.size === "Large" && studio.valuation > 20000000) canHandle = true;
                        if (offer.size === "AAA" && studio.valuation > 50000000) canHandle = true;

                        // AI has a 10% chance per week to accept an offer they can handle
                        if (canHandle && Math.random() < 0.1) {
                            var chance = Math.random();
                            if (chance < 0.2) {
                                offer.status = "Rejected";
                                GameManager.company.adjustCash(offer.advance, "Offer Refunded (Rejected)");
                                GameManager.company.notifications.push(new Notification({
                                    header: "Publishing Deal Rejected",
                                    text: studio.name + " rejected your advance of $" + UI.getShortNumberString(offer.advance) + " for a " + offer.size + " " + offer.genre + " game. Advance refunded.",
                                    image: ""
                                }));
                            } else if (chance > 0.6) {
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
                                    originalOfferIndex: j // Keep track of the original offer
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
                
                // If didn't accept an offer, chance to start normal AI project
                if (!acceptedOffer && Math.random() < 0.05) {
                    startAIProject(studio);
                }
            }
        }
    }

    function generateBestDraft(studio) {
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
            var w = t.genreWeightings[idx] || 0;
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
            cost: 1000000
        };
    }

    function promptDraft(studio, draft) {
        if (isShowingDraft) return; 
        isShowingDraft = true;
        Sound.click();

        var container = $('<div class="windowBorder tallWindow" style="background-color: #ecf0f1; color: #2c3e50; padding: 20px; text-align: center;"></div>');
        
        container.append('<h2 style="color: #d35400;">Project Draft from ' + studio.name + '</h2>');
        container.append('<div style="font-size: 16pt; margin: 10px 0;">We are idling and calculated our optimal next project!</div>');
        
        var info = $('<div style="background: white; border: 1px solid #bdc3c7; border-radius: 8px; padding: 15px; margin: 20px; text-align: left; display: inline-block;"></div>');
        info.append('<div style="font-size: 14pt;">Topic: <strong style="color: #2980b9;">' + draft.topic + '</strong></div>');
        info.append('<div style="font-size: 14pt;">Genre: <strong style="color: #8e44ad;">' + draft.genre + '</strong></div>');
        info.append('<div style="font-size: 14pt;">Size: <strong style="color: #e67e22;">' + draft.size + '</strong></div>');
        info.append('<div style="font-size: 14pt;">Platform: <strong style="color: #27ae60;">' + draft.platforms.join(", ") + '</strong></div>');
        info.append('<div style="font-size: 14pt;">Funding Needed: <strong style="color: #c0392b;">$' + UI.getShortNumberString(draft.cost) + '</strong></div>');
        
        container.append(info);
        
        var btnArea = $('<div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;"></div>');
        
        var btnAccept = $('<div class="selectorButton greenButton" style="flex: 1;">Accept & Fund</div>');
        btnAccept.click(function() {
            if (GameManager.company.cash >= draft.cost) {
                GameManager.company.adjustCash(-draft.cost, "Subsidiary Funding: " + studio.name);
                studio.currentProject = {
                    name: generateGameName(draft.topic, draft.genre),
                    topic: draft.topic,
                    genre: draft.genre,
                    size: draft.size,
                    platforms: draft.platforms,
                    isSubsidiaryDeal: true,
                    weeksRemaining: (draft.size==="Small"?15:(draft.size==="Medium"?30:(draft.size==="Large"?50:80)))
                };
                var msg = studio.name + " has begun production per your accepted draft!";
                GameManager.company.notifications.push(new Notification({ header: "Draft Accepted", text: msg, image: "" }));
                isShowingDraft = false;
                studio.draftCooldown = 4;
                $.modal.close();
            } else {
                alert("You need $" + UI.getShortNumberString(draft.cost) + " to fund this draft!");
            }
        });

        var btnModify = $('<div class="selectorButton orangeButton" style="flex: 1;">Modify/Instruct</div>');
        btnModify.click(function() {
            isShowingDraft = false;
            studio.draftCooldown = 2;
            $.modal.close();
            if ($('#modUI').length === 0) showModMenu("subsidiaries");
            else routeModMenu("subsidiaries");
        });

        var btnDecline = $('<div class="selectorButton deleteButton" style="flex: 1;">Decline (Wait)</div>');
        btnDecline.click(function() {
            isShowingDraft = false;
            studio.draftCooldown = 8;
            $.modal.close();
        });
        
        btnArea.append(btnAccept).append(btnModify).append(btnDecline);
        container.append(btnArea);

        container.modal({
            overlayClose: false,
            opacity: 80,
            overlayCss: { backgroundColor: "#000" },
            containerCss: { width: "600px", height: "400px" }
        });
    }

    // New: Process ongoing publishing projects
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

            if (!studio) { // Studio might have been absorbed or removed
                store.data.publishingProjects.splice(i, 1);
                continue;
            }

            // If the studio is busy with something else, put this project on hold
            if (studio.currentProject && studio.currentProject.id !== project.id) {
                continue;
            }

            // Assign project to studio if not already assigned
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

            // Simulate progress (same as normal studio project)
            ensureStaffObj(studio);
            var speedMultiplier = 1;
            for (var t=1; t<=5; t++) speedMultiplier += (starTiers[t].speed * (studio.staff[t] || 0));
            studio.currentProject.weeksRemaining -= speedMultiplier;

                if (studio.currentProject.weeksRemaining <= 0) {
                finishAndReleaseGame(studio);
                // Remove the project from publishingProjects list
                store.data.publishingProjects.splice(i, 1);
                // Also remove the original offer from publishingOffers if it's still there
                if (project.originalOfferIndex !== undefined && store.data.publishingOffers[project.originalOfferIndex] && store.data.publishingOffers[project.originalOfferIndex].id === project.id) {
                    store.data.publishingOffers.splice(project.originalOfferIndex, 1);
                } else {
                    // Fallback: find and remove by ID if index is unreliable
                    var offerIndex = -1;
                    for (var m = 0; m < store.data.publishingOffers.length; m++) {
                        if (store.data.publishingOffers[m].id === project.id) {
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
    }

    function startAIProject(studio) {
        var t = Topics.topics[Math.floor(Math.random() * Topics.topics.length)].name;
        var genres = ["Action", "Adventure", "RPG", "Simulation", "Strategy", "Casual"];
        var g = genres[Math.floor(Math.random() * genres.length)];
        var sizeOptions = [{s:"Small", w:10}, {s:"Medium", w:20}, {s:"Large", w:35}, {s:"AAA", w:50}];
        
        var size = sizeOptions[0];
        if (studio.valuation > 50000000) size = sizeOptions[Math.floor(Math.random() * 4)];
        else if (studio.valuation > 10000000) size = sizeOptions[Math.floor(Math.random() * 2)];

        studio.currentProject = {
            name: generateGameName(t, g),
            topic: t,
            genre: g,
            size: size.s,
            weeksRemaining: size.w,
            isPublishedByPlayer: false
        };
    }

    function finishAndReleaseGame(studio) {
        var proj = studio.currentProject;
        studio.currentProject = null;
        studio.draftCooldown = 4; // Reset draft cooldown for owned studios

        ensureStaffObj(studio);
        var teamQuality = 0;
        for (var t=1; t<=5; t++) teamQuality += (starTiers[t].score * (studio.staff[t] || 0));
        var workerCount = (studio.staff[1] || 0) + (studio.staff[2] || 0) + (studio.staff[3] || 0) + (studio.staff[4] || 0) + (studio.staff[5] || 0);
        var avgQuality = workerCount > 0 ? (teamQuality / workerCount) : 0.5;
        
        var baseScore = 4 + (avgQuality * 2.5);
        if (proj.size === "AAA") baseScore += 1;
        
        var randomFactor = (Math.random() * 4) - 2; // -2 to +2
        var score = Math.floor(baseScore + randomFactor);
        
        if (score > 10) score = 10;
        if (score < 1) score = 1;

        var multiplier = score * score; 
        var units = Math.floor(Math.random() * 50000 * multiplier) + 5000;
        if (proj.size === "AAA") units *= 5;
        if (proj.size === "Large") units *= 3;
        
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
                selectedPlats.push(Platforms.allPlatforms[0]); // fallback
            }
        }

        var game = new Game(GameManager.company);
        game.id = (GameManager.getGUID ? GameManager.getGUID() : Math.random().toString(36));
        game.title = proj.name + " (" + studio.name + ")";
        game.topic = Topics.topics.filter(function(t){ return t.name === proj.topic; })[0] || Topics.topics[0];
        game.genre = GameGenre.getAll().filter(function(g) { return g.name === proj.genre; })[0] || GameGenre.Action;
        game.secondGenre = null;
        game.platforms = selectedPlats;
        
        game.gameSize = proj.size; 
        
        var designAvg = 500;
        var techAvg = 500;
        if (game.gameSize === "Medium") { designAvg = 1500; techAvg = 1500; }
        if (game.gameSize === "Large") { designAvg = 4000; techAvg = 4000; }
        if (game.gameSize === "AAA") { designAvg = 10000; techAvg = 10000; }

        game.designPoints = designAvg + Math.floor(Math.random() * 200);
        game.technologyPoints = techAvg + Math.floor(Math.random() * 200);
        game.bugs = 0;
        game.score = score;
        game.costs = 100000 * (proj.size === "AAA" ? 80 : (proj.size === "Large" ? 20 : (proj.size === "Medium" ? 5 : 1)));
        
        if (typeof Sales !== 'undefined' && Sales.setUpSales) {
            Sales.setUpSales(GameManager.company, game);
        }
        
        game.state = GameState.released;
        game.releaseWeek = Math.floor(GameManager.company.currentWeek);

        if (proj.isPublishedByPlayer) game.modIsPublishingDeal = true;
        if (proj.isSubsidiaryDeal) game.modIsSubsidiaryDeal = true;
        game.modAI = true;

        GameManager.company.gameLog.push(game);

        store.data.releaseHistory.unshift({
            week: game.releaseWeek,
            studioName: studio.name,
            gameName: game.title,
            score: score,
            units: game.unitsSold || 500000,
            revenue: game.totalSalesCash || 1500000,
            netProfit: (game.totalSalesCash || 1500000)
        });
        if (store.data.releaseHistory.length > 20) store.data.releaseHistory.pop();

        // Adjust valuation based on score
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
                var penalty = Math.floor(proj.publishedGameAdvance * 0.5);
                GameManager.company.adjustCash(-penalty, "Publishing Flop Penalty: " + game.title);
                msgText = "The publishing contract [" + game.title + "] flopped (Score: " + score + "/10). You were penalized " + UI.getShortNumberString(penalty) + " for the disaster.";
            } else {
                msgText = "The publishing contract [" + game.title + "] released on " + platsStr + " (Score: " + score + "/10)! Generating native weekly sales now.";
            }
        } else if (proj.isSubsidiaryDeal) {
            headerText = "Subsidiary Release";
        }
        
        GameManager.company.notifications.push(new Notification({
            header: headerText,
            text: msgText,
            image: ""
        }));
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

        // Build simplemodal dialog body with white native aesthetic
        var container = $('<div id="modUI" class="windowBorder tallWindow" style="background-color: #ecf0f1; color: #2c3e50; padding: 0;"></div>');
        var header = $('<div id="modUI_header" style="display: flex; gap: 5px; border-bottom: 2px solid #bdc3c7; padding: 10px 10px 0 10px; background-color: #e0e6ed; border-top-left-radius: 8px; border-top-right-radius: 8px;"></div>');
        container.append(header);
        var contentArea = $('<div id="modUI_content" style="height: 550px; overflow-y: auto; overflow-x: hidden; padding: 20px; background-color: #ecf0f1;"></div>');
        container.append(contentArea);

        var closeWrapper = $('<div class="centeredButtonWrapper" style="padding: 10px; border-top: 2px solid #bdc3c7; text-align: center;"></div>');
        var closeBtn = $('<div class="okButton selectorButton orangeButton" style="width: 150px; display: inline-block;">Close</div>');
        closeBtn.click(function () { $.modal.close(); });
        closeWrapper.append(closeBtn);
        container.append(closeWrapper);

        container.modal({
            overlayClose: false,
            opacity: 80,
            overlayCss: { backgroundColor: "#000" },
            containerCss: { width: "1000px", height: "700px" }
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
            { id: "market", label: "Stock Market" },
            { id: "subsidiaries", label: "My Studios" },
            { id: "publishing", label: "Publishing" },
            { id: "schedule", label: "Releases" },
            { id: "dlc", label: "DLCs" }
        ];

        tabs.forEach(function(t) {
            var tabStyle = "flex: 1; text-align: center; padding: 12px 0; cursor: pointer; font-size: 15pt; font-weight: bold; border-top-left-radius: 8px; border-top-right-radius: 8px; border: 1px solid #bdc3c7; border-bottom: none;";
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
        } else if (activeTab === "dlc") {
            renderDLCTab(contentArea);
        }
    }

    function renderMarketTab(container) {
        var studios = store.data.studios.filter(function(s) { return s.sharesOwned < 50 && !s.isFounded; });
        
        var sortPref = store.data.modSortPref || "owned";
        studios.sort(function(a, b) {
            if (sortPref === "val") return b.valuation - a.valuation;
            if (sortPref === "emps") {
                function getE(s) { ensureStaffObj(s); return s.staff[1]+s.staff[2]+s.staff[3]+s.staff[4]+s.staff[5]; }
                return getE(b) - getE(a);
            }
            if (sortPref === "quality") {
                function getQ(s) { ensureStaffObj(s); return (s.staff[1]*0.2)+(s.staff[2]*0.5)+(s.staff[3]*1.0)+(s.staff[4]*1.5)+(s.staff[5]*2.5); }
                return getQ(b) - getQ(a);
            }
            if (sortPref === "games") {
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
                return getG(b) - getG(a);
            }
            return b.sharesOwned - a.sharesOwned;
        });

        var sortContainer = $('<div style="display: flex; gap: 10px; margin-bottom: 20px; align-items: center;"></div>');
        sortContainer.append('<div style="font-size: 14pt; color: #2c3e50; font-weight: bold;">Sort List By:</div>');
        var sortSelect = $('<select style="font-size: 14pt; flex: 1; padding: 5px; color: black;"></select>');
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
        studios.sort(function(a, b) {
            if (sortPref === "val") return b.valuation - a.valuation;
            if (sortPref === "emps") {
                function getE(s) { ensureStaffObj(s); return s.staff[1]+s.staff[2]+s.staff[3]+s.staff[4]+s.staff[5]; }
                return getE(b) - getE(a);
            }
            if (sortPref === "quality") {
                function getQ(s) { ensureStaffObj(s); return (s.staff[1]*0.2)+(s.staff[2]*0.5)+(s.staff[3]*1.0)+(s.staff[4]*1.5)+(s.staff[5]*2.5); }
                return getQ(b) - getQ(a);
            }
            if (sortPref === "games") {
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
                return getG(b) - getG(a);
            }
            return b.sharesOwned - a.sharesOwned;
        });

        var foundBtn = $('<div id="btnFoundStudio" class="selectorButton orangeButton" style="display: block; width: 300px; margin: 0 auto 20px auto; text-align: center;">Found New Studio ($5M)</div>');
        foundBtn.click(foundNewStudio);
        container.append(foundBtn);

        var sortContainer = $('<div style="display: flex; gap: 10px; margin-bottom: 20px; align-items: center;"></div>');
        sortContainer.append('<div style="font-size: 14pt; color: #2c3e50; font-weight: bold;">Sort List By:</div>');
        var sortSelect = $('<select style="font-size: 14pt; flex: 1; padding: 5px; color: black;"></select>');
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
            container.append('<div style="font-size: 18pt; text-align: center; margin-top: 50px;">You do not own any controlling stakes in studios.</div>');
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
        var createBtn = $('<div class="selectorButton orangeButton" style="display: block; width: 300px; margin: 0 auto 20px auto; text-align: center;">Post Publishing Deal</div>');
        createBtn.click(function() {
            renderPublishingForm(container);
        });
        container.append(createBtn);

        var offers = store.data.publishingOffers || [];
        if (offers.length === 0 && (!store.data.publishingProjects || store.data.publishingProjects.length === 0)) {
            container.append('<div style="font-size: 18pt; text-align: center; margin-top: 50px;">You have no active publishing deals on the market.</div>');
            return;
        }

        container.append('<div style="font-size: 14pt; margin-bottom: 20px; text-align: center;">Independent studios will evaluate your offers weekly. Once accepted, they will begin development and you will receive 30% of gross revenue!</div>');

        // Display ongoing projects first
        if (store.data.publishingProjects && store.data.publishingProjects.length > 0) {
            container.append('<h3 style="color: #d35400; text-align: center; margin-top: 30px;">Ongoing Publishing Projects</h3>');
            store.data.publishingProjects.forEach(function(project, index) {
                var studio = null;
                for (var k = 0; k < store.data.studios.length; k++) {
                    if (store.data.studios[k].id === project.studioId) {
                        studio = store.data.studios[k];
                        break;
                    }
                }
                var studioName = studio ? studio.name : "Unknown Studio";
                var item = $('<div style="border: 2px solid #bdc3c7; background-color: #f9f9f9; padding: 15px; margin-bottom: 15px; border-radius: 8px; display: flex; align-items: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>');
                var details = $('<div style="flex-grow: 1;"></div>');
                details.append('<h3 style="margin: 0; font-size: 20pt; color: #2980b9;">Project: ' + project.size + ' ' + project.genre + ' by ' + studioName + '</h3>');
                details.append('<div style="font-size: 16pt; margin: 5px 0;">Topic: ' + project.topic + ' | Weeks Remaining: <strong style="color: #f39c12;">' + Math.ceil(project.weeksRemaining) + '</strong></div>');
                details.append('<div style="font-size: 14pt;">Status: <strong style="color:#27ae60;">In Development</strong></div>');
                item.append(details);
                container.append(item);
            });
        }

        // Display offers
        if (offers.length > 0) {
            container.append('<h3 style="color: #d35400; text-align: center; margin-top: 30px;">Current Publishing Offers</h3>');
            for (var i = 0; i < offers.length; i++) {
                (function (offer, index) {
                    var item = $('<div style="border: 2px solid #bdc3c7; background-color: #f9f9f9; padding: 15px; margin-bottom: 15px; border-radius: 8px; display: flex; align-items: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>');
                    var details = $('<div style="flex-grow: 1;"></div>');
                    details.append('<h3 style="margin: 0; font-size: 20pt; color: #d35400;">Contract: ' + offer.size + ' ' + offer.genre + '</h3>');
                    details.append('<div style="font-size: 16pt; margin: 5px 0;">Advance: <strong style="color: #27ae60;">$' + UI.getShortNumberString(offer.advance) + '</strong> | Topic: ' + offer.topic + '</div>');
                    
                    var statusText = offer.status || "Pending Evaluation";
                    var sCol = "#2980b9";
                    if (statusText === "Approved") sCol = "#27ae60";
                    if (statusText === "Rejected") sCol = "#c0392b";
                    details.append('<div style="font-size: 14pt;">Status: <strong style="color:' + sCol + ';">' + statusText + '</strong></div>');
                    
                    item.append(details);

                    var cancelBtn = $('<div class="selectorButton deleteButton" style="font-size: 14pt; padding: 10px 20px;">' + (offer.status === "Approved" ? "Clear" : "Cancel Offer") + '</div>');
                    cancelBtn.click(function () {
                        if (offer.status === "Approved") {
                            // If approved, just clear the visual entry, the project is already ongoing
                            store.data.publishingOffers.splice(index, 1);
                            routeModMenu("publishing");
                        } else if (confirm("Remove this offer? Advance will be refunded if pending/rejected.")) {
                            if (offer.status !== "Approved") GameManager.company.adjustCash(offer.advance, "Refunded Publishing Advance");
                            store.data.publishingOffers.splice(index, 1);
                            routeModMenu("publishing");
                        }
                    });
                    item.append(cancelBtn);
                    container.append(item);
                })(offers[i], i);
            }
        }
    }

    function renderPublishingForm(container) {
        container.empty();
        container.append('<h2 style="color: #d35400;">Create Publishing Offer</h2>');

        var formContainer = $('<div style="padding: 20px; font-size: 16pt; line-height: 2;"></div>');
        
        formContainer.append('<div>Topic:</div>');
        var topicSearch = $('<input type="text" placeholder="Search topics..." style="font-size: 14pt; width: 100%; margin-bottom: 5px; background: white; border: 1px solid #ccc; color: black; padding: 5px;">');
        formContainer.append(topicSearch);
        var topicSelect = $('<select id="pub_topic" style="font-size: 16pt; width: 100%; margin-bottom: 20px; color: black;"></select>');
        Topics.topics.forEach(function(t) { topicSelect.append('<option value="' + t.name + '">' + t.name + '</option>'); });
        formContainer.append(topicSelect);

        var genreSearch = $('<input type="text" placeholder="Search genre..." style="font-size: 14pt; width: 100%; margin-bottom: 5px; background: white; border: 1px solid #ccc; color: black; padding: 5px;">');
        formContainer.append('<div>Genre:</div>').append(genreSearch);
        var genreSelect = $('<select id="pub_genre" style="font-size: 16pt; width: 100%; margin-bottom: 5px; color: black;"></select>');
        var genres = GameGenre.getAll();
        genres.forEach(function(g) { genreSelect.append('<option value="' + g.name + '">' + g.name + '</option>'); });
        formContainer.append(genreSelect);

        var matchContainer = $('<div style="font-size: 14pt; margin-bottom: 20px; text-align: right;">Match Quality: <span id="pub_match" style="font-weight: bold;"></span></div>');
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

        var pSizeSelect = $('<select id="pub_size" style="font-size: 16pt; width: 100%; margin-bottom: 20px; color: black;"></select>');
        pSizeSelect.append('<option value="Small" data-cost="500000">Small ($500K Advance)</option>');
        pSizeSelect.append('<option value="Medium" data-cost="2000000">Medium ($2M Advance)</option>');
        pSizeSelect.append('<option value="Large" data-cost="10000000">Large ($10M Advance)</option>');
        pSizeSelect.append('<option value="AAA" data-cost="50000000">AAA ($50M Advance)</option>');
        formContainer.append('<div>Game Size:</div>').append(pSizeSelect);

        var platSearch = $('<input type="text" placeholder="Search platforms..." style="font-size: 14pt; width: 100%; margin-bottom: 5px; background: white; border: 1px solid #ccc; color: black; padding: 5px;">');
        formContainer.append('<div>Platforms (CTRL+Select):</div>').append(platSearch);
        var platformSelect = $('<select id="pub_platform" multiple style="font-size: 16pt; width: 100%; margin-bottom: 20px; color: black; height: 100px;"></select>');
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

        var actionContainer = $('<div class="centeredButtonWrapper" style="margin-top: 20px;"></div>');
        var confirmBtn = $('<div class="selectorButton orangeButton" style="display: inline-block; width: 200px;">Post Offer</div>');
        confirmBtn.click(function () {
            var selectedSize = $('#pub_size').val();
            var advance = parseInt($('#pub_size option:selected').attr('data-cost'));
            var selectedPlats = $('#pub_platform').val() || [myPlats[0].name];

            if (GameManager.company.cash >= advance) {
                GameManager.company.adjustCash(-advance, "Posted Publishing Deal");
                
                store.data.publishingOffers.push({
                    id: GameManager.getGUID(), // Add an ID for tracking
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
        
        var cancelBtn = $('<div class="selectorButton deleteButton" style="display: inline-block; width: 200px;">Cancel</div>');
        cancelBtn.click(function() { routeModMenu("publishing"); });

        actionContainer.append(confirmBtn).append(cancelBtn);
        container.append(actionContainer);
    }

    function renderScheduleTab(container) {
        var hist = store.data.releaseHistory || [];
        if (hist.length === 0) {
            container.append('<div style="font-size: 18pt; text-align: center; margin-top: 50px;">No games have been released by competitors recently.</div>');
            return;
        }

        hist.forEach(function(r) {
            var item = $('<div style="border: 2px solid #bdc3c7; background-color: #f9f9f9; padding: 15px; margin-bottom: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>');
            var header = $('<h3 style="margin: 0; font-size: 18pt; color: #d35400;">' + r.gameName + ' <span style="font-size:14pt;color:#7f8c8d;">by ' + r.studioName + '</span></h3>');
            item.append(header);

            var wText = "Week " + r.week;
            item.append('<div style="font-size: 14pt; margin-top: 5px;">Released: ' + wText + ' | Review Score: <strong style="color:#27ae60;">' + r.score + '/10</strong></div>');
            item.append('<div style="font-size: 14pt; margin-top: 5px;">Sales: <strong style="color: #2980b9;">' + UI.getShortNumberString(r.units) + '</strong> | Gross: $' + UI.getShortNumberString(r.revenue) + ' | Net Profit: $' + UI.getShortNumberString(r.netProfit) + '</div>');

            container.append(item);
        });
    }

    function renderDLCTab(container) {
        var allGames = GameManager.company.gameLog || [];
        var games = allGames.filter(function(g) {
            // Player's direct titles
            if (!g.modAI && !g.modIsSubsidiaryDeal && !g.modIsPublishingDeal) return true;
            // Subsidiary titles (if sharing ownership)
            if (g.modStudioId) {
                var studio = (store.data.studios || []).filter(function(s) { return s.id === g.modStudioId; })[0];
                if (studio && studio.sharesOwned > 0) return true;
            }
            // Publishing Deals
            if (g.modIsPublishingDeal) return true;
            return false;
        });
        var sortedGames = games.slice().sort(function(a,b) { return b.releaseWeek - a.releaseWeek; });

        if (sortedGames.length === 0) {
            container.append('<div style="font-size: 18pt; text-align: center; margin-top: 50px;">You have not released any games yet.</div>');
        } else {
            var searchBar = $('<input type="text" placeholder="Search released games..." style="font-size: 14pt; width: 100%; margin-bottom: 20px; background: white; border: 1px solid #ccc; color: black; padding: 10px; border-radius: 5px;">');
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

                        var item = $('<div class="dlcItem" style="border: 2px solid #bdc3c7; background-color: #f9f9f9; padding: 15px; margin-bottom: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>');
                        item.append('<h3 style="margin: 0 0 5px 0; font-size: 18pt; color: #8e44ad;">' + game.title + '</h3>');
                        item.append('<div style="font-size: 14pt; color: #7f8c8d;">Original Cost: $' + UI.getShortNumberString(game.costs || 100000) + '</div>');

                        var dlc = store.data.dlcData[game.id];
                        var subDev = false;
                        for(var s=0; s<store.data.studios.length; s++){
                            if(store.data.studios[s].currentProject && store.data.studios[s].currentProject.isDLC && store.data.studios[s].currentProject.gameId === game.id) {
                                subDev = store.data.studios[s];
                            }
                        }

                        if (dlc) {
                            if (dlc.pendingPlayerDev > 0) {
                                item.append('<div style="font-size: 14pt; margin-top: 5px; color: #f39c12; font-weight: bold;">Developing Personally (' + Math.ceil(dlc.pendingPlayerDev) + 'w left)</div>');
                            } else if (dlc.activeWeeksLeft > 0) {
                                item.append('<div style="font-size: 14pt; margin-top: 5px; color: #27ae60; font-weight: bold;">Active DLC Revenue: +$' + UI.getShortNumberString(dlc.weeklyRevenue) + '/wk (' + dlc.activeWeeksLeft + 'w left)</div>');
                            } else {
                                item.append('<div style="font-size: 14pt; margin-top: 5px; color: #7f8c8d; font-style: italic;">DLC Run Completed (' + UI.getShortNumberString(dlc.weeklyRevenue * 20) + ' earned)</div>');
                            }
                        } else if (subDev) {
                            item.append('<div style="font-size: 14pt; margin-top: 5px; color: #2980b9; font-weight: bold;">In Development by ' + subDev.name + ' (' + Math.ceil(subDev.currentProject.weeksRemaining) + 'w left)</div>');
                        } else {
                            var dlcControls = $('<div class="dlccontrols" style="margin-top: 10px; display: flex; gap: 10px;"></div>');
                            var btn = $('<div class="selectorButton orangeButton" style="flex: 1; font-size: 12pt;">Develop Personally</div>');
                            btn.click(function () {
                                Sound.click();
                                $('#modUI_container').remove();
                                GameManager.resume(true);
                                GameManager.flags.createPack = true;
                                GameManager.flags.selectGameActive = false; // Bypass the history list
                                GameManager.flags.selectedGameId = game.id;
                                GameManager.transitionToState(State.CreateGame);
                            });
                            dlcControls.append(btn);

                            for(var s=0; s<store.data.studios.length; s++){
                                if(store.data.studios[s].sharesOwned >= 50 && !store.data.studios[s].currentProject) {
                                    var subBtn = $('<div class="selectorButton whiteBoardButton" style="flex: 1; font-size: 12pt;">Assign: ' + store.data.studios[s].name + '</div>');
                                    (function(studio) {
                                        subBtn.click(function() {
                                            studio.currentProject = {
                                                name: game.title + " DLC",
                                                isDLC: true,
                                                gameId: game.id,
                                                weeklyRevenue: Math.floor(((game.totalSalesCash || 1500000)) * 0.05),
                                                weeksRemaining: 10
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

        var item = $('<div class="studioCard" style="border: 2px solid #bdc3c7; background-color: #f9f9f9; padding: 15px; margin-bottom: 15px; border-radius: 8px; display: flex; align-items: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>');
        
        var pieContainer = $('<div style="width: 80px; text-align: center; margin-right: 15px;"></div>');
        var canvasId = 'pie_' + studio.id;
        pieContainer.append('<canvas id="'+canvasId+'" width="60" height="60" data-shares="'+studio.sharesOwned+'" data-name="'+studio.name+'" class="pieChartCanvas"></canvas>');
        pieContainer.append('<div style="font-size: 14pt; margin-top: 5px; color: #2c3e50; font-weight: bold;">'+studio.sharesOwned+'%</div>');
        item.append(pieContainer);

        var detailsContainer = $('<div class="detailsContainer" style="flex-grow: 1;"></div>');
        detailsContainer.append('<div style="display: flex; justify-content: space-between;"><h3 style="margin: 0; font-size: 20pt; color: #d35400;">' + studio.name + '</h3><div style="font-size: 14pt; color: #34495e;">Total Staff: ' + totalEmps + '</div></div>');
        
        var breakdownStr = '<span style="font-size: 10pt; color: #7f8c8d;">[' + studio.staff[1] + '✩1 | ' + studio.staff[2] + '✩2 | ' + studio.staff[3] + '✩3 | ' + studio.staff[4] + '✩4 | ' + studio.staff[5] + '✩5]</span>';
        detailsContainer.append('<div style="font-size: 16pt; margin: 5px 0;">Valuation: <strong style="color: #27ae60;">$' + UI.getShortNumberString(studio.valuation) + '</strong> ' + breakdownStr + '</div>');
        
        if (studio.currentProject) {
            var plabel = studio.currentProject.isPublishedByPlayer ? "<span style='color:#e67e22'>[Publishing Contract]</span> " : "";
            detailsContainer.append('<div style="font-size: 14pt; margin: 5px 0; color: #7f8c8d;">Developing: ' + plabel + studio.currentProject.name + ' (' + Math.ceil(studio.currentProject.weeksRemaining) + ' weeks left)</div>');
            
            if (studio.sharesOwned >= 50) {
                var cancelBtn = $('<div class="selectorButton deleteButton" style="display: inline-block; margin-top: 5px; font-size: 12pt; padding: 5px 10px;">Cancel Project</div>');
                cancelBtn.click(function () {
                    if (confirm("Are you sure you want to cancel " + studio.currentProject.name + "? All progress and investments will be permanently lost!")) {
                        studio.currentProject = null;
                        GameManager.company.notifications.push(new Notification({ header: "Project Cancelled", text: studio.name + " has ceased development.", image: "" }));
                        routeModMenu("subsidiaries");
                    }
                });
                detailsContainer.append(cancelBtn);
            }
        } else {
            detailsContainer.append('<div style="font-size: 14pt; margin: 5px 0; color: #7f8c8d;">Currently idle.</div>');
        }

        var btnContainer = $('<div style="margin-top: 15px; display: flex; flex-direction: column; gap: 10px;"></div>');
        var topBtns = $('<div style="display: flex; gap: 10px; align-items: center;"></div>');
        var middleBtns = null;
        var bottomBtns = $('<div style="display: flex; gap: 10px;"></div>');

        var tenPercentValue = Math.floor(studio.valuation * 0.1);
        var getRoute = function(s) { return (s >= 50) ? "subsidiaries" : "market"; };

        if (studio.sharesOwned > 0 && !studio.isFounded) {
            var sellBtn = $('<button class="selectorButton deleteButton" style="flex: 1; font-size: 12pt;">Sell 10%</button>');
            sellBtn.click(function () {
                GameManager.company.adjustCash(tenPercentValue, "Sold 10% of " + studio.name);
                studio.sharesOwned -= 10;
                routeModMenu(getRoute(studio.sharesOwned));
            });
            topBtns.append(sellBtn);
            topBtns.append($('<div style="flex: 1; text-align: center; color: #7f8c8d; font-size: 14pt;">Val: $' + UI.getShortNumberString(tenPercentValue) + '</div>'));
        }

        if (studio.sharesOwned < 100) {
            var buyBtn = $('<button class="selectorButton greenButton" style="flex: 1; font-size: 12pt;">Buy 10%</button>');
            buyBtn.click(function () {
                if (GameManager.company.cash >= tenPercentValue) {
                    GameManager.company.adjustCash(-tenPercentValue, "Bought 10% of " + studio.name);
                    studio.sharesOwned += 10;
                    routeModMenu(getRoute(studio.sharesOwned));
                } else { alert("Not enough cash!"); }
            });
            topBtns.append(buyBtn);
        }

        if (studio.sharesOwned >= 50) {
            middleBtns = $('<div style="display: flex; gap: 10px; align-items: center;"></div>');
            var staffSelect = $('<select id="staff_tier_' + studio.id + '" style="font-size: 14pt; padding: 5px; color: black; flex: 2; height: 100%; border-radius: 5px; border: 1px solid #ccc;"></select>');
            staffSelect.append('<option value="1">1✩ (H:$50K)</option><option value="2" selected>2✩ (H:$100K)</option><option value="3">3✩ (H:$250K)</option><option value="4">4✩ (H:$1M)</option><option value="5">5✩ (H:$5M)</option>');
            
            var hireBtn = $('<div class="selectorButton orangeButton" style="flex: 1; font-size: 12pt; padding: 5px; text-align: center;">Hire</div>');
            hireBtn.click(function() {
                var t = parseInt($('#staff_tier_' + studio.id).val());
                if (GameManager.company.cash >= starTiers[t].hire) {
                    GameManager.company.adjustCash(-starTiers[t].hire, "Hired " + starTiers[t].label + " Staff: " + studio.name);
                    studio.staff[t]++; routeModMenu("subsidiaries");
                } else { alert("Not enough cash!"); }
            });

            var fireBtn = $('<div class="selectorButton whiteBoardButton" style="flex: 1; font-size: 12pt; padding: 5px; text-align: center;">Fire</div>');
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

            var instructBtn = $('<button class="selectorButton orangeButton" style="flex: 1; font-size: 12pt;">Instruct</button>');
            instructBtn.click(function () {
                if (studio.currentProject) { alert(studio.name + " is busy!"); return; }
                instructStudio(studio);
            });
            bottomBtns.append(instructBtn);

            if (GameManager.company.currentGame && !studio.currentProject) {
                var coDevBtn = $('<button class="selectorButton whiteBoardButton" style="flex: 1; font-size: 10pt;">Co-Dev (' + UI.getShortNumberString(tenPercentValue * 2) + ')</button>');
                coDevBtn.click(function() {
                    var cost = tenPercentValue * 2;
                    var playerGame = GameManager.company.currentGame;
                    if (playerGame) { 
                        // Free co-dev for owned/partnered studios
                        // Removed cash deduction logic
                        var dPts = Math.floor(studio.valuation / 200000);
                        var tPts = Math.floor(studio.valuation / 200000);
                        GameManager.company.currentGame.designPoints += dPts;
                        GameManager.company.currentGame.technologyPoints += tPts;
                        GameManager.company.notifications.push(new Notification({ header: "Co-Development", text: studio.name + " injected " + dPts + " Design and " + tPts + " Tech points!" }));
                        studio.currentProject = { name: "Co-Dev Support", weeksRemaining: 10, isPublishedByPlayer: false };
                        routeModMenu("subsidiaries");
                    } else { alert("You need an active game in development to co-develop!"); }
                });
                bottomBtns.append(coDevBtn);
            }

            if (studio.sharesOwned === 100 && !studio.isFounded) {
                var absorbBtn = $('<button class="selectorButton deleteButton" style="flex: 1; font-size: 10pt;">Absorb</button>');
                absorbBtn.click(function() {
                    if(confirm("Absorb " + studio.name + "? You will gain their fans and tech, but the studio will close permanently.")) {
                        var fansGained = Math.floor(studio.valuation / 500);
                        var rpGained = Math.floor(studio.valuation / 100000);
                        GameManager.company.fans += fansGained; GameManager.company.researchPoints += rpGained;
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
                ctx.fillStyle = "#bdc3c7";
                ctx.beginPath(); ctx.moveTo(30, 30); ctx.arc(30, 30, 30, 0, Math.PI * 2); ctx.fill();

                if (shares > 0) {
                    ctx.fillStyle = "#d35400"; 
                    ctx.beginPath(); ctx.moveTo(30, 30);
                    var endAngle = (-Math.PI / 2) + Math.PI * 2 * (shares / 100);
                    ctx.arc(30, 30, 30, -Math.PI / 2, endAngle);
                    ctx.fill();
                }

                // Draw inner circle for donut chart look
                ctx.fillStyle = "#34495e";
                ctx.beginPath(); ctx.arc(30, 30, 18, 0, Math.PI * 2); ctx.fill();

                var words = sName.split(' ');
                var initials = "";
                if (words.length >= 2) initials = words[0][0] + words[1][0];
                else initials = words[0].substring(0, 2);
                
                ctx.fillStyle = "white";
                ctx.font = "bold 16px sans-serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(initials.toUpperCase(), 30, 30);
            }
        }, 50);

        return item;
    }

    function instructStudio(studio) {
        var contentArea = $('#modUI_content');
        if (contentArea.length === 0) return;
        contentArea.empty();
        
        contentArea.append('<h2 style="color: #d35400;">Instruct ' + studio.name + '</h2>');

        var formContainer = $('<div style="padding: 20px; font-size: 16pt; line-height: 2;"></div>');
        formContainer.append('<div>Project funding requirement: <strong style="color: #f39c12;">$1,000,000</strong></div>');
        
        formContainer.append('<div>Topic:</div>');
        var topicSearch = $('<input type="text" placeholder="Search topics..." style="font-size: 14pt; width: 100%; margin-bottom: 5px; background: white; border: 1px solid #ccc; color: black; padding: 5px;">');
        formContainer.append(topicSearch);
        var topicSelect = $('<select id="inst_topic" style="font-size: 16pt; width: 100%; margin-bottom: 20px; color: black;"></select>');
        Topics.topics.forEach(function(t) { topicSelect.append('<option value="' + t.name + '">' + t.name + '</option>'); });
        formContainer.append(topicSelect);

        var genreSearch = $('<input type="text" placeholder="Search genre..." style="font-size: 14pt; width: 100%; margin-bottom: 5px; background: white; border: 1px solid #ccc; color: black; padding: 5px;">');
        formContainer.append('<div>Genre:</div>').append(genreSearch);
        var genreSelect = $('<select id="inst_genre" style="font-size: 16pt; width: 100%; margin-bottom: 5px; color: black;"></select>');
        var genres = GameGenre.getAll();
        genres.forEach(function(g) { genreSelect.append('<option value="' + g.name + '">' + g.name + '</option>'); });
        formContainer.append(genreSelect);

        var matchContainer = $('<div style="font-size: 14pt; margin-bottom: 20px; text-align: right;">Match Quality: <span id="inst_match" style="font-weight: bold;"></span></div>');
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

        var pSizeSelect = $('<select id="inst_size" style="font-size: 16pt; width: 100%; margin-bottom: 20px; color: black;"></select>');
        pSizeSelect.append('<option value="Small">Small</option>');
        pSizeSelect.append('<option value="Medium">Medium</option>');
        pSizeSelect.append('<option value="Large">Large</option>');
        pSizeSelect.append('<option value="AAA">AAA</option>');
        formContainer.append('<div>Game Size:</div>').append(pSizeSelect);

        var platSearch = $('<input type="text" placeholder="Search platforms..." style="font-size: 14pt; width: 100%; margin-bottom: 5px; background: white; border: 1px solid #ccc; color: black; padding: 5px;">');
        formContainer.append('<div>Platforms (CTRL+Select):</div>').append(platSearch);
        var platformSelect = $('<select id="inst_platform" multiple style="font-size: 16pt; width: 100%; margin-bottom: 20px; color: black; height: 100px;"></select>');
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

        var actionContainer = $('<div class="centeredButtonWrapper" style="margin-top: 20px;"></div>');
        var confirmBtn = $('<div class="selectorButton orangeButton" style="display: inline-block; width: 200px;">Begin Development</div>');
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

                var msg = studio.name + " has begun production on a " + selectedSize + " " + selectedTopic + " " + selectedGenre + " game for " + selectedPlats.join(", ") + " per your instructions. They will release it soon!";
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
        
        var cancelBtn = $('<div class="selectorButton deleteButton" style="display: inline-block; width: 200px;">Cancel</div>');
        cancelBtn.click(function() { routeModMenu("subsidiaries"); });

        actionContainer.append(confirmBtn).append(cancelBtn);
        contentArea.append(actionContainer);
    }

    function foundNewStudio() {
        var cost = 5000000;
        if (GameManager.company.cash >= cost) {
            var name = prompt("Enter a name for your new subsidiary:");
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
                routeModMenu("subsidiaries");
            }
        } else {
            alert("You need at least $5M to found a new studio!");
        }
    }
})();
