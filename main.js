(function () {
    var ready = function () {
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

        function initData() {
            if (!store.data.studios) {
                store.data.studios = generateInitialStudios();
            }
            if (!store.data.dlcData) {
                store.data.dlcData = {};
            }
            if (!store.data.lastWeekProcessed) {
                store.data.lastWeekProcessed = -1;
            }
        }

        function generateInitialStudios() {
            return [
                { id: "S1", name: "Electronic Farts", valuation: 10000000, sharesOwned: 0, currentProject: null },
                { id: "S2", name: "Microsofty", valuation: 50000000, sharesOwned: 0, currentProject: null },
                { id: "S3", name: "Ubisloth", valuation: 25000000, sharesOwned: 0, currentProject: null },
                { id: "S4", name: "Nintendoh", valuation: 100000000, sharesOwned: 0, currentProject: null }
            ];
        }

        // Global interval to check the game week and inject UI
        setInterval(function () {
            // Wait until GameManager and UI are loaded
            if (typeof GameManager === 'undefined' || typeof UI === 'undefined' || !GameManager.company) {
                return;
            }

            injectMarketButton();
            injectDLCActions();
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
            // Every week, chance for studios to change valuation or release games
            for (var i = 0; i < studios.length; i++) {
                var studio = studios[i];
                var rand = Math.random();

                // Pay maintenance if the player owns it 100% and it's a founded studio
                // E.g., subsidiary maintenance
                if (studio.sharesOwned === 100 && studio.isFounded) {
                    GameManager.company.adjustCash(-50000, "Subsidiary Maintenance: " + studio.name);
                }

                if (rand < 0.05 && !studio.isFounded) {
                    // Studio valuation fluctuates +/- 5%
                    var fluctuation = (Math.random() * 0.1) - 0.05;
                    studio.valuation += Math.floor(studio.valuation * fluctuation);
                    if (studio.valuation < 1000000) studio.valuation = 1000000; // Floor

                    if (Math.random() < 0.1) {
                         // Notification for game release by AI
                         var msg = studio.name + " released a new game!";
                         var n = new Notification({
                             header: "Competitor Release",
                             text: msg,
                             image: ""
                         });
                         GameManager.company.notifications.push(n);
                    }
                }
            }
        }

        function processDLCs() {
            // To be implemented: Apply DLC revenue boosts to current income or generate notifications with cash
            var dlcKeys = Object.keys(store.data.dlcData);
            for(var i = 0; i < dlcKeys.length; i++) {
                var gameId = dlcKeys[i];
                var dlc = store.data.dlcData[gameId];
                if (dlc && dlc.activeWeeksLeft > 0) {
                    var revenue = Math.floor(Math.random() * 50000) + 10000;
                    GameManager.company.adjustCash(revenue, "DLC Sales: " + dlc.name);
                    dlc.activeWeeksLeft--;
                }
            }
        }

        function injectMarketButton() {
            if ($('#btn-market-subsidiaries').length === 0) {
                var btn = $('<div id="btn-market-subsidiaries" class="selectorButton whiteBoardButton" style="display: block; margin-top: 10px;">Market & Subsidiaries</div>');
                $('#trendContainer').after(btn);
                btn.click(showMarketMenu);
            }
        }

        function injectDLCActions() {
            // To be implemented: Add buttons to active games in the market list or add a global "Develop DLC" menu item
            // The game context menu is generated natively. We might need to hook UI._showContextMenu
        }

        function showMarketMenu() {
            Sound.click();
            
            // Build simplemodal dialog body
            var container = $('<div id="marketUI" class="windowBorder tallWindow" style="background: #2a2a2a; color: white;"></div>');
            container.append('<div class="windowTitle">Stock Market & Subsidiaries</div>');
            
            var listContainer = $('<div style="height: 400px; overflow-y: auto; overflow-x: hidden; padding: 10px;"></div>');
            var studios = store.data.studios;
            
            for (var i = 0; i < studios.length; i++) {
                (function(studio) {
                    var item = $('<div style="border: 1px solid #555; padding: 10px; margin-bottom: 10px; border-radius: 5px;"></div>');
                    item.append('<h3>' + studio.name + '</h3>');
                    item.append('<p>Valuation: ' + UI.getShortNumberString(studio.valuation) + '</p>');
                    item.append('<p>Your Shares: ' + studio.sharesOwned + '%</p>');
                    
                    var tenPercentValue = Math.floor(studio.valuation * 0.1);
                    
                    if (studio.sharesOwned < 100 && !studio.isFounded) {
                        var buyBtn = $('<button class="selectorButton" style="padding: 5px 10px; margin-right: 5px;">Buy 10% (' + UI.getShortNumberString(tenPercentValue) + ')</button>');
                        buyBtn.click(function() {
                            if (GameManager.company.cash >= tenPercentValue) {
                                GameManager.company.adjustCash(-tenPercentValue, "Bought Stock: " + studio.name);
                                studio.sharesOwned += 10;
                                $.modal.close();
                                showMarketMenu(); // Refresh
                            } else {
                                alert("Not enough cash!");
                            }
                        });
                        item.append(buyBtn);
                    }
                    
                    if (studio.sharesOwned > 0 && !studio.isFounded) {
                        var sellBtn = $('<button class="selectorButton" style="padding: 5px 10px; margin-right: 5px;">Sell 10% (' + UI.getShortNumberString(tenPercentValue) + ')</button>');
                        sellBtn.click(function() {
                            GameManager.company.adjustCash(tenPercentValue, "Sold Stock: " + studio.name);
                            studio.sharesOwned -= 10;
                            $.modal.close();
                            showMarketMenu(); // Refresh
                        });
                        item.append(sellBtn);
                    }
                    
                    if (studio.sharesOwned >= 50) {
                        var directBtn = $('<button class="selectorButton" style="padding: 5px 10px; background-color: #f39c12; color: white;">Instruct Studio</button>');
                        directBtn.click(function() {
                            instructStudio(studio);
                        });
                        item.append(directBtn);
                    }
                    
                    listContainer.append(item);
                })(studios[i]);
            }
            
            container.append(listContainer);
            
            // Found New Studio & DLC Buttons
            var foundContainer = $('<div style="padding: 10px; border-top: 1px solid white; margin-top: 10px; text-align: center;"></div>');
            foundContainer.append('<button id="btnFoundStudio" class="selectorButton orangeButton" style="margin-right:10px;">Found New Studio ($5M)</button>');
            foundContainer.append('<button id="btnDevelopDLC" class="selectorButton orangeButton">Develop DLC</button>');
            
            var closeBtn = $('<div class="okButton selectorButton orangeButton" style="margin: 10px auto; width: 100px; text-align: center;">Close</div>');
            closeBtn.click(function() { $.modal.close(); });
            
            container.append(foundContainer);
            container.append(closeBtn);
            
            container.modal({
                overlayClose: true,
                opacity: 80,
                overlayCss: { backgroundColor: "#000" },
                containerCss: { width: "600px", height: "600px" },
                onShow: function(dialog) {
                    $('#btnFoundStudio').click(function() {
                         foundNewStudio();
                    });
                    $('#btnDevelopDLC').click(function() {
                         $.modal.close();
                         showDLCMenu();
                    });
                }
            });
        }

        function showDLCMenu() {
            Sound.click();
            var container = $('<div id="dlcUI" class="windowBorder tallWindow" style="background: #2a2a2a; color: white;"></div>');
            container.append('<div class="windowTitle">Develop DLC</div>');
            
            var games = GameManager.company.games || [];
            var listContainer = $('<div style="height: 400px; overflow-y: auto; overflow-x: hidden; padding: 10px;"></div>');
            
            if (games.length === 0) {
                listContainer.append('<p>You have not released any games yet.</p>');
            } else {
                for (var i = games.length - 1; i >= 0; i--) { // Reverse order
                    (function(game) {
                        var dlcCost = Math.floor(game.costs * 0.5); // 50% of original cost
                        var item = $('<div style="border: 1px solid #555; padding: 10px; margin-bottom: 10px; border-radius: 5px;"></div>');
                        item.append('<h3>' + game.title + '</h3>');
                        item.append('<p>Original Cost: ' + UI.getShortNumberString(game.costs) + '</p>');
                        
                        var dlc = store.data.dlcData[game.id];
                        if (dlc) {
                            item.append('<p style="color: green;">DLC Currently Active (' + dlc.activeWeeksLeft + ' weeks left)</p>');
                        } else {
                            var btn = $('<button class="selectorButton orangeButton">Develop DLC (' + UI.getShortNumberString(dlcCost) + ')</button>');
                            btn.click(function() {
                                if (GameManager.company.cash >= dlcCost) {
                                    GameManager.company.adjustCash(-dlcCost, "DLC Development: " + game.title);
                                    store.data.dlcData[game.id] = {
                                        name: game.title + " DLC",
                                        activeWeeksLeft: 20 // Re-monetize for 20 weeks
                                    };
                                    GameManager.company.notifications.push(new Notification({
                                         header: "DLC Released",
                                         text: "DLC for " + game.title + " was released and will generate revenue for 20 weeks!",
                                         image: ""
                                    }));
                                    $.modal.close();
                                    showMarketMenu();
                                } else {
                                    alert("Not enough cash!");
                                }
                            });
                            item.append(btn);
                        }
                        listContainer.append(item);
                    })(games[i]);
                }
            }
            
            container.append(listContainer);
            var closeBtn = $('<div class="okButton selectorButton orangeButton" style="margin: 10px auto; width: 100px; text-align: center;">Close</div>');
            closeBtn.click(function() { $.modal.close(); showMarketMenu(); });
            container.append(closeBtn);
            
            container.modal({
                overlayClose: true,
                opacity: 80,
                overlayCss: { backgroundColor: "#000" },
                containerCss: { width: "600px", height: "600px" }
            });
        }

        function instructStudio(studio) {
            $.modal.close();
            // Show a basic generic prompt or select topic/genre
            // For MVP, we simply show an alert that they will work on a AAA game and it costs us some cash
            if (GameManager.company.cash >= 1000000) {
                GameManager.company.adjustCash(-1000000, "Subsidised Project for " + studio.name);
                var projName = studio.name + " Project " + Math.floor(Math.random()*100);
                var msg = "You instructed " + studio.name + " to develop: " + projName;
                GameManager.company.notifications.push(new Notification({
                     header: "Subsidiary Tasked",
                     text: msg,
                     image: ""
                }));
                // In future: they will release it in 20 weeks and give all profits to us
            } else {
                alert("You need at least $1M to fund a subsidiary project!");
            }
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
                    showMarketMenu();
                }
            } else {
                alert("You need at least $5M to found a new studio!");
            }
        }
    };

    var error = function () {
        console.error("Failed to load Concurrent Studios Mod");
    };

    GDT.loadJs([], ready, error);
})();
