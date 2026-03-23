(function () {
    console.log("Concurrent Studios mod loaded.");

    // Data Store
    var store = GDT.getDataStore("concurrent_studios");

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
        var currentWeek = GameManager.company.currentWeek;
        if (store.data.lastWeekProcessed === currentWeek) {
            return;
        }
        store.data.lastWeekProcessed = currentWeek;

        // Perform weekly simulation for studios and active DLC
        processCompetitors();
        processDLCs();
    }

    function processCompetitors() {
        var studios = store.data.studios;
        for (var i = 0; i < studios.length; i++) {
            var studio = studios[i];
            
            // Maintenance for founded subsidiaries
            if (studio.sharesOwned === 100 && studio.isFounded) {
                GameManager.company.adjustCash(-50000, "Sub. Maintenance: " + studio.name);
            }

            if (studio.currentProject) {
                studio.currentProject.weeksRemaining--;
                if (studio.currentProject.weeksRemaining <= 0) {
                    finishAndReleaseGame(studio);
                }
            } else {
                // If they don't have a current project, evaluate publishing offers first
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
                            studio.currentProject = {
                                name: generateGameName(offer.topic, offer.genre),
                                topic: offer.topic,
                                genre: offer.genre,
                                size: offer.size,
                                weeksRemaining: (offer.size==="Small"?10:(offer.size==="Medium"?20:(offer.size==="Large"?35:50))),
                                isPublishedByPlayer: true,
                                publishedGameAdvance: offer.advance
                            };
                            store.data.publishingOffers.splice(j, 1);
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
                
                // If didn't accept an offer, chance to start normal AI project
                if (!acceptedOffer && Math.random() < 0.05) {
                    startAIProject(studio);
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

        var baseScore = Math.random() * 5 + 3; // 3 to 8
        if (studio.valuation > 50000000) baseScore += 2;
        if (studio.valuation > 100000000) baseScore += 1;
        
        var score = Math.floor(baseScore + (Math.random() * 2 - 1));
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

        var revenue = units * price;
        var cost = 0;
        if (proj.size === "Small") cost = 80000;
        if (proj.size === "Medium") cost = 300000;
        if (proj.size === "Large") cost = 1500000;
        if (proj.size === "AAA") cost = 8000000;

        var netProfit = revenue - cost;

        studio.valuation += Math.floor(netProfit * 0.5); 
        if (studio.valuation < 1000000) studio.valuation = 1000000; 
        
        if (studio.sharesOwned > 0 && netProfit > 0) {
            var dividend = Math.floor(netProfit * (studio.sharesOwned / 100));
            GameManager.company.adjustCash(dividend, "Dividends: " + studio.name + " (" + proj.name + ")");
        }

        if (proj.isPublishedByPlayer && netProfit > 0) {
            var pubCut = Math.floor(revenue * 0.3); // 30% publishing cut
            GameManager.company.adjustCash(pubCut, "Publishing Royalties: " + proj.name);
            studio.valuation -= pubCut;
        }

        store.data.releaseHistory.unshift({
            week: GameManager.company.currentWeek,
            studioName: studio.name,
            gameName: proj.name,
            score: score,
            units: units,
            revenue: revenue,
            netProfit: netProfit
        });
        
        if (store.data.releaseHistory.length > 50) {
            store.data.releaseHistory.pop();
        }

        if (score >= 9 || proj.isPublishedByPlayer) {
            var msgText = studio.name + " released a smash hit: " + proj.name + " (Score: " + score + "/10). It sold " + UI.getShortNumberString(units) + " units!";
            if (proj.isPublishedByPlayer) msgText = "The game you published for " + studio.name + ", " + proj.name + ", was released! Score: " + score + "/10.";
            GameManager.company.notifications.push(new Notification({
                header: "Major Release",
                text: msgText,
                image: ""
            }));
        }
    }

    function processDLCs() {
        var activeGames = GameManager.company.games || [];
        var dlcKeys = Object.keys(store.data.dlcData);
        for (var i = 0; i < dlcKeys.length; i++) {
            var gameId = dlcKeys[i];
            var dlc = store.data.dlcData[gameId];
            if (dlc && dlc.activeWeeksLeft > 0) {
                var ogGame = null;
                for (var j=0; j<activeGames.length; j++) { if (activeGames[j].id === gameId) { ogGame = activeGames[j]; break; } }
                
                var baseScaling = (ogGame && ogGame.revenue) ? (ogGame.revenue * 0.05) : ((ogGame && ogGame.costs) ? ogGame.costs * 0.1 : 10000);
                var successMod = (ogGame && ogGame.score) ? (ogGame.score / 5) : 1; 
                var revenue = Math.floor(baseScaling * successMod * (Math.random() * 0.5 + 0.75));
                if (revenue < 5000) revenue = 5000;

                GameManager.company.adjustCash(revenue, "DLC Sales: " + dlc.name);
                dlc.activeWeeksLeft--;
            }
        }
    }



    function showModMenu(activeTab) {
        activeTab = activeTab || "market";
        Sound.click();
        
        // Build simplemodal dialog body with white native aesthetic
        var container = $('<div id="modUI" class="windowBorder tallWindow" style="background-color: #ecf0f1; color: #2c3e50; padding: 0;"></div>');
        
        var header = $('<div style="display: flex; gap: 5px; border-bottom: 2px solid #bdc3c7; padding: 10px 10px 0 10px; background-color: #e0e6ed; border-top-left-radius: 8px; border-top-right-radius: 8px;"></div>');
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
                $.modal.close(); 
                showModMenu(t.id); 
            });
            header.append(tabDiv);
        });
        container.append(header);

        var contentArea = $('<div style="height: 550px; overflow-y: auto; overflow-x: hidden; padding: 20px; background-color: #ecf0f1;"></div>');

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

        container.append(contentArea);

        var closeWrapper = $('<div class="centeredButtonWrapper" style="padding: 10px; border-top: 2px solid #555; text-align: center;"></div>');
        var closeBtn = $('<div class="okButton selectorButton orangeButton" style="width: 150px; display: inline-block;">Close</div>');
        closeBtn.click(function () { $.modal.close(); });
        closeWrapper.append(closeBtn);
        container.append(closeWrapper);

        container.modal({
            overlayClose: true,
            opacity: 80,
            overlayCss: { backgroundColor: "#000" },
            containerCss: { width: "1000px", height: "700px" }
        });
    }

    function renderMarketTab(container) {
        var studios = store.data.studios.filter(function(s) { return s.sharesOwned < 50 && !s.isFounded; });
        
        for (var i = 0; i < studios.length; i++) {
            (function (studio) {
                var item = buildStudioCard(studio);
                var tenPercentValue = Math.floor(studio.valuation * 0.1);
                var btnContainer = $('<div style="margin-top: 10px;"></div>');

                if (studio.sharesOwned < 100) {
                    var buyBtn = $('<button class="selectorButton whiteBoardButton" style="padding: 5px 15px; font-size: 14pt; display: inline-block;">Buy 10% (' + UI.getShortNumberString(tenPercentValue) + ')</button>');
                    buyBtn.click(function () {
                        if (GameManager.company.cash >= tenPercentValue) {
                            GameManager.company.adjustCash(-tenPercentValue, "Bought Stock: " + studio.name);
                            studio.sharesOwned += 10;
                            $.modal.close(); showModMenu("market");
                        } else { alert("Not enough cash!"); }
                    });
                    btnContainer.append(buyBtn);
                }

                if (studio.sharesOwned > 0) {
                    var sellBtn = $('<button class="selectorButton deleteButton" style="padding: 5px 15px; font-size: 14pt; display: inline-block;">Sell 10% (' + UI.getShortNumberString(tenPercentValue) + ')</button>');
                    sellBtn.click(function () {
                        GameManager.company.adjustCash(tenPercentValue, "Sold Stock: " + studio.name);
                        studio.sharesOwned -= 10;
                        $.modal.close(); showModMenu("market");
                    });
                    btnContainer.append(sellBtn);
                }
                
                item.find('.detailsContainer').append(btnContainer);
                container.append(item);
            })(studios[i]);
        }
    }

    function renderSubsidiariesTab(container) {
        var studios = store.data.studios.filter(function(s) { return s.sharesOwned >= 50 || s.isFounded; });
        
        var foundBtn = $('<div id="btnFoundStudio" class="selectorButton orangeButton" style="display: block; width: 300px; margin: 0 auto 20px auto; text-align: center;">Found New Studio ($5M)</div>');
        foundBtn.click(foundNewStudio);
        container.append(foundBtn);

        if (studios.length === 0) {
            container.append('<div style="font-size: 18pt; text-align: center; margin-top: 50px;">You do not own any controlling stakes in studios.</div>');
            return;
        }

        for (var i = 0; i < studios.length; i++) {
            (function (studio) {
                var item = buildStudioCard(studio);
                var btnContainer = $('<div style="margin-top: 10px;"></div>');
                var tenPercentValue = Math.floor(studio.valuation * 0.1);

                if (studio.sharesOwned > 0 && !studio.isFounded) {
                    var sellBtn = $('<button class="selectorButton deleteButton" style="padding: 5px 15px; font-size: 14pt; display: inline-block; margin-right: 10px;">Sell 10% (' + UI.getShortNumberString(tenPercentValue) + ')</button>');
                    sellBtn.click(function () {
                        GameManager.company.adjustCash(tenPercentValue, "Sold Stock: " + studio.name);
                        studio.sharesOwned -= 10;
                        $.modal.close(); showModMenu("subsidiaries");
                    });
                    btnContainer.append(sellBtn);
                }

                var directBtn = $('<button class="selectorButton orangeButton" style="padding: 5px 15px; font-size: 14pt; display: inline-block; margin-right: 10px;">Instruct</button>');
                directBtn.click(function () {
                    if (studio.currentProject) { alert(studio.name + " is already busy!"); return; }
                    instructStudio(studio);
                });
                btnContainer.append(directBtn);

                if (GameManager.company.currentGame && !studio.currentProject) {
                    var coDevBtn = $('<button class="selectorButton whiteBoardButton" style="padding: 5px 15px; font-size: 14pt; display: inline-block; margin-right: 10px;">Co-Develop (' + UI.getShortNumberString(tenPercentValue * 2) + ')</button>');
                    coDevBtn.click(function() {
                        var cost = tenPercentValue * 2;
                        if (GameManager.company.cash >= cost) {
                            GameManager.company.adjustCash(-cost, "Co-Dev with: " + studio.name);
                            
                            var dPts = Math.floor(studio.valuation / 200000);
                            var tPts = Math.floor(studio.valuation / 200000);
                            GameManager.company.currentGame.designPoints += dPts;
                            GameManager.company.currentGame.techPoints += tPts;
                            
                            GameManager.company.notifications.push(new Notification({
                                header: "Co-Development",
                                text: studio.name + " injected " + dPts + " Design and " + tPts + " Tech points into your current project!"
                            }));
                            
                            studio.currentProject = { name: "Co-Dev Support", weeksRemaining: 10, isPublishedByPlayer: false };
                            $.modal.close(); showModMenu("subsidiaries");
                        } else { alert("Not enough cash!"); }
                    });
                    btnContainer.append(coDevBtn);
                }

                if (studio.sharesOwned === 100 && !studio.isFounded) {
                    var absorbBtn = $('<button class="selectorButton deleteButton" style="padding: 5px 15px; font-size: 14pt; display: inline-block; margin-right: 10px;">Absorb Company</button>');
                    absorbBtn.click(function() {
                        if(confirm("Hostile Takeover: Absorb " + studio.name + "? You will gain their fans and tech, but the studio will close permanently.")) {
                            var fansGained = Math.floor(studio.valuation / 500);
                            var rpGained = Math.floor(studio.valuation / 100000);
                            GameManager.company.fans += fansGained;
                            GameManager.company.researchPoints += rpGained;
                            
                            store.data.studios = store.data.studios.filter(function(s) { return s.id !== studio.id; });
                            
                            GameManager.company.notifications.push(new Notification({
                                header: "Hostile Takeover!",
                                text: "You have fully absorbed " + studio.name + " into your company! Gained " + UI.getShortNumberString(fansGained) + " fans and " + rpGained + " RP.",
                                image: ""
                            }));
                            $.modal.close(); showModMenu("subsidiaries");
                        }
                    });
                    btnContainer.append(absorbBtn);
                }

                item.find('.detailsContainer').append(btnContainer);
                container.append(item);
            })(studios[i]);
        }
    }

    function renderPublishingTab(container) {
        var createBtn = $('<div class="selectorButton orangeButton" style="display: block; width: 300px; margin: 0 auto 20px auto; text-align: center;">Post Publishing Deal</div>');
        createBtn.click(createNewOfferModal);
        container.append(createBtn);

        var offers = store.data.publishingOffers || [];
        if (offers.length === 0) {
            container.append('<div style="font-size: 18pt; text-align: center; margin-top: 50px;">You have no active publishing deals on the market.</div>');
            return;
        }

        container.append('<div style="font-size: 14pt; margin-bottom: 20px; text-align: center;">Independent studios will evaluate your offers weekly. Once accepted, they will begin development and you will receive 30% of gross revenue!</div>');

        for (var i = 0; i < offers.length; i++) {
            (function (offer, index) {
                var item = $('<div style="border: 2px solid #bdc3c7; background-color: #f9f9f9; padding: 15px; margin-bottom: 15px; border-radius: 8px; display: flex; align-items: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>');
                var details = $('<div style="flex-grow: 1;"></div>');
                details.append('<h3 style="margin: 0; font-size: 20pt; color: #d35400;">Contract: ' + offer.size + ' ' + offer.genre + ' (' + offer.platform + ')</h3>');
                details.append('<div style="font-size: 16pt; margin: 5px 0;">Advance Offered: <strong style="color: #27ae60;">$' + UI.getShortNumberString(offer.advance) + '</strong> | Topic: ' + offer.topic + '</div>');
                item.append(details);

                var cancelBtn = $('<div class="selectorButton deleteButton" style="font-size: 14pt; padding: 10px 20px;">Cancel Offer</div>');
                cancelBtn.click(function () {
                    if (confirm("Cancel this offer and refund your advance?")) {
                        GameManager.company.adjustCash(offer.advance, "Refunded Publishing Advance");
                        store.data.publishingOffers.splice(index, 1);
                        $.modal.close(); showModMenu("publishing");
                    }
                });
                item.append(cancelBtn);
                container.append(item);
            })(offers[i], i);
        }
    }

    function createNewOfferModal() {
        $.modal.close();
        var container = $('<div class="windowBorder tallWindow" style="background-color: #ecf0f1; color: #2c3e50;"></div>');
        container.append('<div class="windowTitle" style="color: #d35400;">Create Publishing Offer</div>');

        var formContainer = $('<div style="padding: 20px; font-size: 16pt; line-height: 2;"></div>');
        
        var topicSelect = $('<select id="pub_topic" style="font-size: 16pt; width: 100%; margin-bottom: 20px; color: black;"></select>');
        Topics.topics.forEach(function(t) { topicSelect.append('<option value="' + t.name + '">' + t.name + '</option>'); });
        formContainer.append('<div>Topic:</div>').append(topicSelect);

        var genreSelect = $('<select id="pub_genre" style="font-size: 16pt; width: 100%; margin-bottom: 20px; color: black;"></select>');
        var genres = ["Action", "Adventure", "RPG", "Simulation", "Strategy", "Casual"];
        genres.forEach(function(g) { genreSelect.append('<option value="' + g + '">' + g + '</option>'); });
        formContainer.append('<div>Genre:</div>').append(genreSelect);

        var pSizeSelect = $('<select id="pub_size" style="font-size: 16pt; width: 100%; margin-bottom: 20px; color: black;"></select>');
        pSizeSelect.append('<option value="Small" data-cost="500000">Small ($500K Advance)</option>');
        pSizeSelect.append('<option value="Medium" data-cost="2000000">Medium ($2M Advance)</option>');
        pSizeSelect.append('<option value="Large" data-cost="10000000">Large ($10M Advance)</option>');
        pSizeSelect.append('<option value="AAA" data-cost="50000000">AAA ($50M Advance)</option>');
        formContainer.append('<div>Game Size:</div>').append(pSizeSelect);

        var platformSelect = $('<select id="pub_platform" style="font-size: 16pt; width: 100%; margin-bottom: 20px; color: black;"></select>');
        Platforms.allPlatforms.forEach(function(p) { platformSelect.append('<option value="' + p.name + '">' + p.name + '</option>'); });
        formContainer.append('<div>Platform:</div>').append(platformSelect);

        container.append(formContainer);

        var actionContainer = $('<div class="centeredButtonWrapper" style="margin-top: 20px;"></div>');
        var confirmBtn = $('<div class="selectorButton orangeButton" style="display: inline-block; width: 200px;">Post Offer</div>');
        confirmBtn.click(function () {
            var selectedSize = $('#pub_size').val();
            var advance = parseInt($('#pub_size option:selected').attr('data-cost'));

            if (GameManager.company.cash >= advance) {
                GameManager.company.adjustCash(-advance, "Posted Publishing Deal");
                
                store.data.publishingOffers.push({
                    topic: $('#pub_topic').val(),
                    genre: $('#pub_genre').val(),
                    size: selectedSize,
                    platform: $('#pub_platform').val(),
                    advance: advance
                });

                $.modal.close();
                showModMenu("publishing");
            } else {
                alert("You need at least $" + UI.getShortNumberString(advance) + " to fund this advance!");
            }
        });
        
        var cancelBtn = $('<div class="selectorButton deleteButton" style="display: inline-block; width: 200px;">Cancel</div>');
        cancelBtn.click(function() { $.modal.close(); showModMenu("publishing"); });

        actionContainer.append(confirmBtn).append(cancelBtn);
        container.append(actionContainer);

        container.modal({ overlayClose: true, opacity: 80, overlayCss: { backgroundColor: "#000" }, containerCss: { width: "700px", height: "650px" } });
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
        var games = GameManager.company.games || [];
        if (games.length === 0) {
            container.append('<div style="font-size: 18pt; text-align: center; margin-top: 50px;">You have not released any games yet.</div>');
        } else {
            for (var i = games.length - 1; i >= 0; i--) {
                (function (game) {
                    var dlcCost = Math.floor(game.costs * 0.5);
                    if (dlcCost < 50000) dlcCost = 50000;

                    var item = $('<div style="border: 2px solid #bdc3c7; background-color: #f9f9f9; padding: 15px; margin-bottom: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>');
                    item.append('<h3 style="margin: 0; font-size: 18pt; color: #d35400;">' + game.title + '</h3>');
                    item.append('<div style="font-size: 14pt; color: #7f8c8d;">Original Cost: $' + UI.getShortNumberString(game.costs) + '</div>');

                    var dlc = store.data.dlcData[game.id];
                    if (dlc) {
                        item.append('<div style="font-size: 16pt; margin-top: 10px; color: #27ae60; font-weight: bold;">[Active] ' + dlc.activeWeeksLeft + ' weeks of revenue remaining</div>');
                    } else {
                        var btn = $('<div class="selectorButton orangeButton" style="display: inline-block; margin-top: 10px; font-size: 14pt;">Develop DLC (' + UI.getShortNumberString(dlcCost) + ')</div>');
                        btn.click(function () {
                            if (GameManager.company.cash >= dlcCost) {
                                GameManager.company.adjustCash(-dlcCost, "DLC Dev: " + game.title);
                                store.data.dlcData[game.id] = {
                                    name: game.title + " DLC",
                                    activeWeeksLeft: 20
                                };
                                GameManager.company.notifications.push(new Notification({
                                    header: "DLC Released",
                                    text: "Your DLC for " + game.title + " has launched successfully!",
                                    image: ""
                                }));
                                $.modal.close(); showModMenu("dlc");
                            } else { alert("Not enough cash!"); }
                        });
                        item.append(btn);
                    }
                    container.append(item);
                })(games[i]);
            }
        }
    }

    function buildStudioCard(studio) {
        var item = $('<div class="studioCard" style="border: 2px solid #bdc3c7; background-color: #f9f9f9; padding: 15px; margin-bottom: 15px; border-radius: 8px; display: flex; align-items: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>');
        
        var pieContainer = $('<div style="width: 80px; text-align: center; margin-right: 15px;"></div>');
        var canvasId = 'pie_' + studio.id;
        pieContainer.append('<canvas id="'+canvasId+'" width="60" height="60" data-shares="'+studio.sharesOwned+'" class="pieChartCanvas"></canvas>');
        pieContainer.append('<div style="font-size: 14pt; margin-top: 5px; color: #2c3e50; font-weight: bold;">'+studio.sharesOwned+'%</div>');
        item.append(pieContainer);

        var detailsContainer = $('<div class="detailsContainer" style="flex-grow: 1;"></div>');
        detailsContainer.append('<h3 style="margin: 0; font-size: 20pt; color: #d35400;">' + studio.name + '</h3>');
        detailsContainer.append('<div style="font-size: 16pt; margin: 5px 0;">Valuation: <strong style="color: #27ae60;">$' + UI.getShortNumberString(studio.valuation) + '</strong></div>');
        if (studio.currentProject) {
            var plabel = studio.currentProject.isPublishedByPlayer ? "<span style='color:#e67e22'>[Publishing Contract]</span> " : "";
            detailsContainer.append('<div style="font-size: 14pt; margin: 5px 0; color: #7f8c8d;">Developing: ' + plabel + studio.currentProject.name + ' (' + studio.currentProject.weeksRemaining + ' weeks left)</div>');
        } else {
            detailsContainer.append('<div style="font-size: 14pt; margin: 5px 0; color: #7f8c8d;">Currently seeking deals/ideas.</div>');
        }

        item.append(detailsContainer);

        setTimeout(function() {
            var canvas = document.getElementById(canvasId);
            if(canvas) {
                var shares = parseInt(canvas.getAttribute('data-shares'));
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
            }
        }, 50);

        return item;
    }

    function instructStudio(studio) {
        $.modal.close();
        
        var container = $('<div class="windowBorder tallWindow" style="background-color: #ecf0f1; color: #2c3e50;"></div>');
        container.append('<div class="windowTitle" style="color: #d35400;">Instruct ' + studio.name + '</div>');

        var formContainer = $('<div style="padding: 20px; font-size: 16pt; line-height: 2;"></div>');
        formContainer.append('<div>Project funding requirement: <strong style="color: #f39c12;">$1,000,000</strong></div>');
        
        var topicSelect = $('<select id="inst_topic" style="font-size: 16pt; width: 100%; margin-bottom: 20px; color: black;"></select>');
        Topics.topics.forEach(function(t) { topicSelect.append('<option value="' + t.name + '">' + t.name + '</option>'); });
        formContainer.append('<div>Topic:</div>').append(topicSelect);

        var genreSelect = $('<select id="inst_genre" style="font-size: 16pt; width: 100%; margin-bottom: 20px; color: black;"></select>');
        var genres = ["Action", "Adventure", "RPG", "Simulation", "Strategy", "Casual"];
        genres.forEach(function(g) { genreSelect.append('<option value="' + g + '">' + g + '</option>'); });
        formContainer.append('<div>Genre:</div>').append(genreSelect);

        var pSizeSelect = $('<select id="inst_size" style="font-size: 16pt; width: 100%; margin-bottom: 20px; color: black;"></select>');
        pSizeSelect.append('<option value="Small">Small</option>');
        pSizeSelect.append('<option value="Medium">Medium</option>');
        pSizeSelect.append('<option value="Large">Large</option>');
        pSizeSelect.append('<option value="AAA">AAA</option>');
        formContainer.append('<div>Game Size:</div>').append(pSizeSelect);

        var platformSelect = $('<select id="inst_platform" style="font-size: 16pt; width: 100%; margin-bottom: 20px; color: black;"></select>');
        Platforms.allPlatforms.forEach(function(p) { platformSelect.append('<option value="' + p.name + '">' + p.name + '</option>'); });
        formContainer.append('<div>Platform:</div>').append(platformSelect);

        container.append(formContainer);

        var actionContainer = $('<div class="centeredButtonWrapper" style="margin-top: 20px;"></div>');
        var confirmBtn = $('<div class="selectorButton orangeButton" style="display: inline-block; width: 200px;">Begin Development</div>');
        confirmBtn.click(function () {
            if (GameManager.company.cash >= 1000000) {
                var selectedTopic = $('#inst_topic').val();
                var selectedGenre = $('#inst_genre').val();
                var selectedSize = $('#inst_size').val();
                var selectedPlatform = $('#inst_platform').val();

                GameManager.company.adjustCash(-1000000, "Subsidiary Funding: " + studio.name);
                
                studio.currentProject = {
                    name: generateGameName(selectedTopic, selectedGenre),
                    topic: selectedTopic,
                    genre: selectedGenre,
                    size: selectedSize,
                    weeksRemaining: (selectedSize==="Small"?10:(selectedSize==="Medium"?20:(selectedSize==="Large"?35:50))),
                    isPublishedByPlayer: true // We count instructed subsideries as player published (full profits/dividends offset)
                };

                var msg = studio.name + " has begun production on a " + selectedSize + " " + selectedTopic + " " + selectedGenre + " game for " + selectedPlatform + " per your instructions. They will release it soon!";
                GameManager.company.notifications.push(new Notification({
                    header: "Subsidiary Tasked",
                    text: msg,
                    image: ""
                }));
                $.modal.close();
                showModMenu("subsidiaries");
            } else {
                alert("You need at least $1M to fund a subsidiary project!");
            }
        });
        
        var cancelBtn = $('<div class="selectorButton deleteButton" style="display: inline-block; width: 200px;">Cancel</div>');
        cancelBtn.click(function() { $.modal.close(); showModMenu("subsidiaries"); });

        actionContainer.append(confirmBtn).append(cancelBtn);
        container.append(actionContainer);

        container.modal({
            overlayClose: true,
            opacity: 80,
            overlayCss: { backgroundColor: "#000" },
            containerCss: { width: "700px", height: "650px" }
        });
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
                $.modal.close();
                showModMenu("subsidiaries");
            }
        } else {
            alert("You need at least $5M to found a new studio!");
        }
    }
})();
