    function renderDLCTab(container) {
        var allGames = GameManager.company.gameLog || [];
        var games = allGames;
        var sortedGames = games.slice().sort(function (a, b) { return b.releaseWeek - a.releaseWeek; });

        if (sortedGames.length === 0) {
            container.append('<div style="font-size: 12pt; text-align: center; margin-top: 30px; color: #7f8c8d;">You have not released any games yet.</div>');
        } else {
            var searchBar = $('<input type="text" placeholder="Search released games..." style="font-size: 11pt; width: 100%; margin-bottom: 12px; background: white; border: 2px solid #555; color: black; padding: 6px 8px; border-radius: 0px; box-sizing: border-box;">');
            container.append(searchBar);

            var listContainer = $('<div id="dlc_list_container"></div>');
            container.append(listContainer);

            function renderDLCList(term) {
                listContainer.empty();
                
                var dlcStudioMap = {};
                if (store.data.studios) {
                    for (var s = 0; s < store.data.studios.length; s++) {
                        var st = store.data.studios[s];
                        if (st.currentProject && st.currentProject.isDLC && st.currentProject.gameId) {
                            dlcStudioMap[st.currentProject.gameId] = st;
                        }
                    }
                }

                for (var i = 0; i < sortedGames.length; i++) {
                    (function (game) {
                        if (term && game.title.toLowerCase().indexOf(term) === -1) return;

                        var dlcCurrentWk = GameManager.company.currentWeek;
                        var dlcAge = dlcCurrentWk - game.releaseWeek;
                        if (dlcAge >= 480) return;


                        var item = $('<div class="dlcItem" style="border: 2px solid #555; background-color: #f9f9f9; padding: 10px; margin-bottom: 8px; border-radius: 0px; box-shadow: none;"></div>');
                        item.append('<h3 style="margin: 0 0 3px 0; font-size: 12pt; color: #8e44ad; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + game.title + '</h3>');
                        var rawDlcInfo = store.data.dlcData[game.id] || {};
                        var dlcCount = rawDlcInfo.count || 0;
                        var activeDLCs = rawDlcInfo.activeDLCs || [];
                        var currentWk = dlcCurrentWk;
                        var age = dlcAge;

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

                        var subDev = dlcStudioMap[game.id] || false;

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
                                    csNotify("Not enough funds!");
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
        container.empty();
        _ae(container, csRenderSectionHeader('Franchise Marketing Campaigns'));

        var franchises = store.data.franchises || [];
        if (franchises.length === 0) return _ae(container, csRenderEmptyState('No active franchises to market. Create one by releasing a high-scoring project.'));

        if (franchises.length > 5) {
            var $search = csRenderSearchBar("Search " + franchises.length + " franchises...", function(val) {
                container.find('.cs-marketing-card').each(function() {
                    var name = $(this).find('.cs-fran-name').text();
                    $(this).toggle(name.toLowerCase().indexOf(val) > -1);
                });
            });
            container.append($search);
        }

        var grid = _ae(container, '<div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;"></div>');
        if (typeof Game === 'undefined' || !Game.isModern) grid.css('display', 'block');

        franchises.forEach(function (f) {
            var card = _ae(grid, '<div class="cs-marketing-card" style="background:#fff; box-shadow:0 1px 4px rgba(0,0,0,0.15); padding:16px; display:flex; flex-direction:column; gap:8px; border-radius:6px;"></div>');
            
            // Header
            var head = _ae(card, '<div style="display:flex; justify-content:space-between; align-items:baseline;"></div>');
            _ae(head, '<div class="cs-fran-name" style="font-weight:bold; font-size:11pt; color:#2c3e50;">' + f.name + '</div>');
            _ae(head, '<div style="font-size:8pt; color:#7f8c8d;">Tier ' + (f.tier || 1) + '</div>');
            
            _ae(card, '<div style="font-size:9pt; color:#555;">Fanbase: <b style="color:#2980b9;">' + Math.floor(f.fanbaseScore || 0) + '/100</b></div>');
            
            // Progress Bar
            _ae(card, csRenderMiniBar(f.fanbaseScore || 0, '#8e44ad', '100%'));
            
            // Action
            var mBtn = _ae(card, '<div class="selectorButton whiteBoardButton" style="margin-top:auto; padding:6px 0; font-size:9pt; font-weight:bold; text-align:center;">LAUNCH CAMPAIGN</div>');
            mBtn.click(function () {
                var cost = (f.tier || 1) * 250000;
                if (GameManager.company.cash < cost) return csNotify('Insufficient funds ($' + UI.getShortNumberString(cost) + ')');
                Sound.click(); GameManager.company.adjustCash(-cost, 'Marketing: ' + f.name);
                f.fanbaseScore = Math.min(100, (f.fanbaseScore || 0) + Math.floor(5 + Math.random() * 10 * (f.tier || 1)));
                _n('Marketing Success', f.name + ' gained fans! Fanbase: ' + Math.floor(f.fanbaseScore) + '/100');
                renderMarketingTab(container);
            });
        });
    }

    function _buildPieCard(entity, canvasId) {
        var item = $('<div class="studioCard" style="border:1px solid #d1d9e6;background:#ffffff;padding:12px;margin-bottom:10px;border-radius:8px;display:flex;align-items:flex-start;box-shadow:0 2px 6px rgba(0,0,0,.05);transition:all 0.2s ease;"></div>');
        var pie = $('<div style="width:60px;min-width:60px;text-align:center;margin-right:12px;"></div>')
            .append('<canvas id="' + canvasId + '" width="50" height="50" data-shares="' + entity.sharesOwned + '" data-name="' + entity.name + '" class="pieChartCanvas"></canvas>')
            .append('<div style="font-size:10pt;margin-top:5px;color:#34495e;font-weight:bold;">' + entity.sharesOwned + '%</div>');
        item.append(pie);
        item.append('<div class="pie-details-container" style="flex-grow: 1; min-width: 0;"></div>');
        setTimeout(function () {
            var canvas = document.getElementById(canvasId); if (!canvas) return;
            var shares = parseInt(canvas.getAttribute('data-shares'));
            var sName = canvas.getAttribute('data-name') || "Co";
            var ctx = canvas.getContext('2d'), cx = 25, cy = 25, r = 25;
            ctx.fillStyle = "#bdc3c7"; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
            if (shares > 0) { ctx.fillStyle = "#d35400"; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, -Math.PI / 2, (-Math.PI / 2) + Math.PI * 2 * (shares / 100)); ctx.fill(); }
            ctx.fillStyle = "#34495e"; ctx.beginPath(); ctx.arc(cx, cy, 15, 0, Math.PI * 2); ctx.fill();
            var words = sName.split(' '), initials = words.length >= 2 ? (words[0][0] + words[1][0]) : words[0].substring(0, 2);
            ctx.fillStyle = "white"; ctx.font = "bold 12px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
            ctx.fillText(initials.toUpperCase(), cx, cy);
        }, 50);
        return item;
    }

    function buildStudioCard(studio) {
        ensureStaffObj(studio);
        var totalEmps = studio.staff[1] + studio.staff[2] + studio.staff[3] + studio.staff[4] + studio.staff[5];
        var totalMaint = 0;
        for (var t = 1; t <= 5; t++) totalMaint += (starTiers[t].maint * studio.staff[t]);

        var item = _buildPieCard(studio, 'pie_' + studio.id);

        var detailsContainer = item.find('.pie-details-container');
        var headerRow = $('<div style="display: flex; justify-content: space-between; align-items: baseline; gap: 10px;"></div>')
            .append('<h3 style="margin: 0; font-size: 14pt; color: #2c3e50; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; flex: 1; font-weight: bold;">' + studio.name + '</h3>')
            .append('<div style="font-size: 10pt; color: #7f8c8d; white-space: nowrap; font-weight: 500;">Staff: ' + totalEmps + ' (@' + UI.getShortNumberString(totalMaint) + '/wk)</div>');
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
                        _n("Project Cancelled", studio.name + " has ceased development.");
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
                } else { csNotify("Not enough cash!"); }
            });
            topBtns.append(buyBtn);
        }

        if (studio.sharesOwned >= 50) {
            middleBtns = $('<div style="display: flex; gap: 6px; align-items: center;"></div>');
            var staffSelect = $('<select id="staff_tier_' + studio.id + '" style="font-size: 10pt; padding: 3px; color: black; flex: 2; border-radius: 0px; border: 2px solid #555; box-sizing: border-box;"></select>');
            staffSelect.append('<option value="1">1* (H:$2K)</option><option value="2" selected>2* (H:$5K)</option><option value="3">3* (H:$15K)</option><option value="4">4* (H:$50K)</option><option value="5">5* (H:$200K)</option>');

            var hireBtn = $('<div class="selectorButton orangeButton" style="flex: 1; font-size: 10pt; padding: 4px; text-align: center;">Hire</div>');
            hireBtn.click(function () {
                var t = parseInt($('#staff_tier_' + studio.id).val());
                if (GameManager.company.cash >= starTiers[t].hire) {
                    GameManager.company.adjustCash(-starTiers[t].hire, "Hired " + starTiers[t].label + " Staff: " + studio.name);
                    studio.staff[t]++; routeModMenu("subsidiaries");
                } else { csNotify("Not enough cash!"); }
            });

            var fireBtn = $('<div class="selectorButton whiteBoardButton" style="flex: 1; font-size: 10pt; padding: 4px; text-align: center;">Fire</div>');
            fireBtn.click(function () {
                var t = parseInt($('#staff_tier_' + studio.id).val());
                if (studio.staff[t] > 0) {
                    if (studio.staff[1] + studio.staff[2] + studio.staff[3] + studio.staff[4] + studio.staff[5] <= 1) { csNotify("A studio must have at least 1 employee!"); return; }
                    if (GameManager.company.cash >= starTiers[t].fire) {
                        GameManager.company.adjustCash(-starTiers[t].fire, "Severance for " + starTiers[t].label + ": " + studio.name);
                        studio.staff[t]--; routeModMenu("subsidiaries");
                    } else { csNotify("Not enough cash for severance!"); }
                } else { csNotify("No " + starTiers[t].label + " staff to fire!"); }
            });
            middleBtns.append(staffSelect).append(hireBtn).append(fireBtn);

            var specSelect = $('<select id="spec_' + studio.id + '" style="font-size: 10pt; padding: 3px; color: black; flex: 2; border-radius: 0px; border: 2px solid #555; box-sizing: border-box; margin-left: 5px;"></select>');
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
                if (studio.currentProject) { csNotify(studio.name + " is busy!"); return; }
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
                    } else { csNotify("You need an active game in development to co-develop!"); }
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

                        if (store.data.streamingPlatforms) {
                            for (var spIdx = 0; spIdx < store.data.streamingPlatforms.length; spIdx++) {
                                var platform = store.data.streamingPlatforms[spIdx];
                                if (platform.activeDeals) {
                                    platform.activeDeals = platform.activeDeals.filter(function (d) {
                                        return d.studioId !== studio.id;
                                    });
                                }
                            }
                        }

                        var frArr = store.data.franchises || [];
                        for (var fIdx = 0; fIdx < frArr.length; fIdx++) {
                            if (frArr[fIdx].ownerId === studio.id) {
                                frArr[fIdx].ownerId = "player";
                            }
                        }

                        var sArr3 = store.data.studios || [];
                        store.data.studios = sArr3.filter(function (s) { return s.id !== studio.id; });
                        _n("Takeover!", "Absorbed " + studio.name + "!");
                        routeModMenu("subsidiaries");
                    }
                });
                bottomBtns.append(absorbBtn);
            }
        }

        if (topBtns.children().length > 0) btnContainer.append(topBtns);
        if (middleBtns) btnContainer.append(middleBtns);
        if (bottomBtns.children().length > 0) btnContainer.append(bottomBtns);

        if (btnContainer.children().length > 0) detailsContainer.append(btnContainer);
        item.append(detailsContainer);
        return item;
    }


    function instructStudio(studio) {
        var contentArea = $('#modUI_content');
        if (contentArea.length === 0) return;
        contentArea.css({ opacity: 0 });
        contentArea.empty();

        var currentWkInst = Math.floor(GameManager.company.currentWeek);
        var myPlats = Platforms.allPlatforms.filter(function (p) {
            var pubWk = (typeof p.published === 'number') ? p.published : 0;
            var retWk = p.retireDate ? (typeof p.retireDate === 'number' ? p.retireDate : Infinity) : Infinity;
            return (pubWk <= currentWkInst) && (retWk > currentWkInst);
        });
        if (myPlats.length === 0) myPlats = [Platforms.allPlatforms[0]];
        var pList = [{ name: "None" }].concat(myPlats);

        contentArea.append('<h2 style="color: #d35400; font-size: 13pt; margin: 0 0 10px 0;">Instruct ' + studio.name + '</h2>');

        var formContainer = $('<div style="padding: 10px; font-size: 11pt; line-height: 1.8;"></div>');
        formContainer.append('<div>Funding: <strong style="color: #f39c12;">$1,000,000</strong></div>');

        formContainer.append('<div>Topic:</div>');
        var topicSearch = $('<input type="text" placeholder="Search topics..." style="font-size: 11pt; width: 100%; margin-bottom: 4px; background: white; border: 2px solid #555; color: black; padding: 4px 6px; border-radius: 0px; box-sizing: border-box;">');
        formContainer.append(topicSearch);
        var topicSelect = $('<select id="inst_topic" style="font-size: 11pt; width: 100%; margin-bottom: 10px; color: black; border: 2px solid #555; border-radius: 0px; padding: 3px; box-sizing: border-box;"></select>');
        Topics.topics.forEach(function (t) { topicSelect.append('<option value="' + t.name + '">' + t.name + '</option>'); });
        formContainer.append(topicSelect);

        var genreSearch = $('<input type="text" placeholder="Search genre..." style="font-size: 11pt; width: 100%; margin-bottom: 4px; background: white; border: 2px solid #555; color: black; padding: 4px 6px; border-radius: 0px; box-sizing: border-box;">');
        formContainer.append('<div>Genre:</div>').append(genreSearch);
        var genreSelect = $('<select id="inst_genre" style="font-size: 11pt; width: 100%; margin-bottom: 4px; color: black; border: 2px solid #555; border-radius: 0px; padding: 3px; box-sizing: border-box;"></select>');
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

        var pSizeSelect = $('<select id="inst_size" style="font-size: 11pt; width: 100%; margin-bottom: 10px; color: black; border: 2px solid #555; border-radius: 0px; padding: 3px; box-sizing: border-box;"></select>');
        pSizeSelect.append('<option value="Small">Small</option>');
        pSizeSelect.append('<option value="Medium">Medium</option>');
        pSizeSelect.append('<option value="Large">Large</option>');
        pSizeSelect.append('<option value="AAA">AAA</option>');
        formContainer.append('<div>Game Size:</div>').append(pSizeSelect);

        var p1 = myPlats[0] ? myPlats[0].name : "PC";
        var p2 = "None";
        var p3 = "None";
        var platRow = $('<div style="display: flex; gap: 8px; margin-bottom: 20px; justify-content: center;"></div>');

        function updatePlatShelf() {
            platRow.empty();
            var b1 = $('<div class="selectorButton lightBlueButton" style="flex: 1; text-align: center; font-size: 11pt; padding: 6px 0; border-radius: 0px;">Slot 1 (' + p1 + ')</div>');
            b1.click(function () { showSearchableList("Select Platform 1", pList, function (n) { p1 = n; updatePlatShelf(); }, contentArea); });
            platRow.append(b1);

            var b2 = $('<div class="selectorButton lightBlueButton" style="flex: 1; text-align: center; font-size: 11pt; padding: 6px 0; border-radius: 0px;">Slot 2 (' + p2 + ')</div>');
            b2.click(function () { showSearchableList("Select Platform 2", pList, function (n) { p2 = n; updatePlatShelf(); }, contentArea); });
            platRow.append(b2);

            var b3 = $('<div class="selectorButton lightBlueButton" style="flex: 1; text-align: center; font-size: 11pt; padding: 6px 0; border-radius: 0px;">Slot 3 (' + p3 + ')</div>');
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
                var selectedPlats = [p1, p2, p3].filter(function (x) { return x !== "None"; });
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
                _n("Subsidiary Tasked", msg);
                routeModMenu("subsidiaries");
            } else {
                csNotify("You need at least $1M to fund a subsidiary project!");
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
            var input = $('<input type="text" style="font-size: 12pt; padding: 4px 6px; width: 80%; margin-bottom: 12px; color: black; border: 2px solid #555; border-radius: 0px; box-sizing: border-box;">');
            function goSubs() { setTimeout(function () { if ($('#modUI').length === 0) showModMenu("subsidiaries"); else routeModMenu("subsidiaries"); }, 300); }
            var confirmBtn = $('<div class="selectorButton greenButton" style="width: 130px; font-size: 11pt;">Found ($5M)</div>');
            confirmBtn.click(function () {
                var name = input.val().trim();
                if (name) {
                    GameManager.company.adjustCash(-cost, "Founded Subsidiary: " + name);
                    store.data.studios.push({ id: "FS_" + Date.now(), name: name, valuation: cost, sharesOwned: 100, isFounded: true, currentProject: null });
                    $.modal.close(); goSubs();
                }
            });
            var cancelBtn = $('<div class="selectorButton deleteButton" style="width: 130px; font-size: 11pt;">Cancel</div>');
            cancelBtn.click(function () { $.modal.close(); goSubs(); });
            var xBtn = $('<div style="position: absolute; right: 10px; top: 10px; width: 24px; height: 24px; line-height: 22px; text-align: center; border-radius: 50%; background: #e74c3c; color: white; font-weight: bold; cursor: pointer; font-size: 14pt; z-index: 1000; box-shadow: none;">×</div>');
            xBtn.click(function () { $.modal.close(); }).hover(function () { $(this).css('background', '#c0392b'); }, function () { $(this).css('background', '#e74c3c'); });
            var container = $('<div class="windowBorder tallWindow" style="background-color: #eee; border-radius: 0px; padding: 14px; text-align: center; position: relative;"></div>')
                .append(xBtn)
                .append('<h2 style="color: #d35400; font-size: 13pt; margin: 0 0 10px 0;">Found New Studio</h2>')
                .append('<div style="margin: 10px 0; font-size: 11pt; color: #34495e;">Enter a name for your new subsidiary:</div>')
                .append(input)
                .append($('<div style="display: flex; gap: 8px; justify-content: center;"></div>').append(confirmBtn).append(cancelBtn));
            container.modal({ containerId: 'modUI_container', overlayClose: false, opacity: 80, overlayCss: { backgroundColor: "#000" }, containerCss: { width: "420px", height: "auto", backgroundColor: "transparent", border: "none" } });
            setTimeout(function () { input.focus(); }, 100);
        } else {
            csNotify("You need at least $5M to found a new studio!");
        }
    }

    function renderLeaderboardTab(c) {
        _ae(c, '<h3 style="text-align:center;">Top Studios</h3>'); (store.data.studios || []).slice().sort(function (a, b) { return b.valuation - a.valuation }).slice(0, 5).forEach(function (s, i) { _ae(c, '<div style="border:1px solid #bdc3c7;padding:6px 10px;margin:4px 0;">#' + (i + 1) + ': ' + s.name + ' ($' + UI.getShortNumberString(s.valuation) + ')</div>') });
        _ae(c, '<h3 style="text-align:center;margin-top:10px;">AI Hall Of Fame</h3>'); (store.data.leaderboardGames || []).forEach(function (g, i) { _ae(c, '<div style="border:1px solid #bdc3c7;padding:6px 10px;margin:4px 0;">#' + (i + 1) + ': ' + g.gameName + ' (' + g.score + '/10)</div>') });
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
                var searchBar = $('<input type="text" placeholder="Search games..." style="width: 80%; display: block; margin: 10px auto; padding: 10px; font-size: 14pt; border-radius: 0px; border: 1px solid #ccc; color: black; background: white;">');


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
        var dropdown = $('<div class="cs-market-dropdown" style="position: absolute; z-index: 20000; background: #2c3e50; color: white; border: 1px solid #34495e; border-radius: 0px; box-shadow: none; padding: 8px; width: 180px; font-family: Segoe UI, Tahoma, sans-serif;"></div>');

        dropdown.append('<div style="font-size: 10pt; font-weight: bold; border-bottom: 1px solid #555; margin-bottom: 8px; padding-bottom: 4px; color: #eee; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + game.title + '</div>');


        var withdrawAction = $('<div style="padding: 6px; cursor: pointer; font-size: 9pt; border-radius: 0px; transition: background 0.2s; color: #e74c3c;">\u26D4 Withdraw from Market</div>');
        withdrawAction.hover(function () { $(this).css('background', '#3d1c1c'); }, function () { $(this).css('background', 'transparent'); });
        withdrawAction.click(function () {
            if (confirm("Withdraw " + game.title + " from the market?")) {
                Sound.click();
                game.releaseWeek = GameManager.company.currentWeek - 1000;
                dropdown.remove();
            }
        });
        dropdown.append(withdrawAction);


        var mCost = Math.floor((game.totalSalesCash || 100000) * 0.05) + 20000;
        var maintainAction = $('<div style="padding: 6px; cursor: pointer; font-size: 9pt; border-radius: 0px; transition: background 0.2s; color: #2ecc71;">\u267B Maintain (+$' + UI.getShortNumberString(mCost) + ')</div>');
        maintainAction.hover(function () { $(this).css('background', '#1b3d2c'); }, function () { $(this).css('background', 'transparent'); });
        maintainAction.click(function () {
            if (GameManager.company.cash >= mCost) {
                Sound.click();
                GameManager.company.adjustCash(-mCost, "Market Maintenance: " + game.title);
                game.modMarketExtension = (game.modMarketExtension || 0) + 4;
                dropdown.remove();
            } else {
                csNotify("Insufficient funds!");
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

