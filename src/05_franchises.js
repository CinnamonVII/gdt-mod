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
                if (dlcObj.activeDLCs && dlcObj.activeDLCs.length > 0) {
                    for (var dIdx = dlcObj.activeDLCs.length - 1; dIdx >= 0; dIdx--) {
                        var dlc = dlcObj.activeDLCs[dIdx];
                        weeklyIncome += dlc.weeklyRevenue;
                        dlc.activeWeeksLeft--;
                        if (dlc.activeWeeksLeft <= 0) {
                            dlcObj.activeDLCs.splice(dIdx, 1);
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
                    var epRev = Math.floor((p.budget * 0.02) * (p.currentEpisode / p.totalEpisodes));
                    if (epRev > 0) {
                        weeklyIncome += epRev;
                        incomeSources.push(p.title + " (Ep " + p.currentEpisode + "): +$" + UI.getShortNumberString(epRev));
                    }
                } else if (p.status === "released" && p.weeklyRevenue > 0) {
                    weeklyIncome += p.weeklyRevenue;
                    incomeSources.push(p.title + " Sales: +$" + UI.getShortNumberString(p.weeklyRevenue));
                    p.salesWeeksLeft--;
                    p.weeklyRevenue = Math.floor(p.weeklyRevenue * (p.decayRate || 0.92));
                    if (p.salesWeeksLeft <= 0 || p.weeklyRevenue < 50) {
                        p.weeklyRevenue = 0;
                        p.salesWeeksLeft = 0;
                    }
                }
            }
        }

        if (store.data.gridService && store.data.gridService.isActive) {
            var grid = store.data.gridService;
            for (var gci = 0; gci < grid.contentLibrary.length; gci++) {
                var gcEntry = grid.contentLibrary[gci];
                if (gcEntry.franchiseId) {
                    var gcFran = getFranchiseById(gcEntry.franchiseId);
                    if (gcFran && gcFran.ownerId === "player") {
                        var gridFranBonus = Math.floor(grid.subscribers * 0.0001 * ((gcEntry.score || 5) / 10));
                        if (!isNaN(gridFranBonus) && gridFranBonus > 0) {
                            weeklyIncome += gridFranBonus;
                            incomeSources.push(gcEntry.title + " (Grid/Franchise): +$" + UI.getShortNumberString(gridFranBonus));
                        }
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

    function csUpdateAILicensingSystem() {
        if (!store.data.movieStudios || !store.data.franchises) return;
        var currentWeek = Math.floor(GameManager.company.currentWeek);

        if (currentWeek % 8 === 0 && Math.random() < 0.2) {
            var playerFrans = getPlayerFranchises().filter(function (f) { return (f.tier || 1) >= 2; });
            var unownedStudios = store.data.movieStudios.filter(function (ms) { return ms.sharesOwned < 50; });

            if (playerFrans.length > 0 && unownedStudios.length > 0) {
                var chosenFran = playerFrans[Math.floor(Math.random() * playerFrans.length)];
                var chosenStudio = unownedStudios[Math.floor(Math.random() * unownedStudios.length)];

                var existing = store.data.activeAILicenses.filter(function (l) { return l.franchiseId === chosenFran.id && l.studioId === chosenStudio.id; })[0];
                if (!existing) {
                    var upfront = Math.floor((chosenFran.tier * 1000000) * (0.8 + Math.random() * 0.4));
                    var royalty = Math.floor(5 + Math.random() * 10);
                    var films = Math.floor(Math.random() * 3) + 2;

                    var offer = {
                        id: "LO_" + Date.now(),
                        studioId: chosenStudio.id,
                        studioName: chosenStudio.name,
                        franchiseId: chosenFran.id,
                        franchiseName: chosenFran.name,
                        upfront: upfront,
                        royaltyRate: royalty / 100,
                        filmsCount: films,
                        expiresWeek: currentWeek + 8
                    };

                    store.data.aiLicensingOffers.push(offer);

                    var notifyText = chosenStudio.name + " wants to license your '" + chosenFran.name + "' franchise!";
                    _nb("Licensing Proposal", notifyText, "Review Proposal", function () {
                        store.data.activeLicensingOffer = offer; showModMenu("licensing_review", "media");
                    });

                }
            }
        }

        for (var i = store.data.aiLicensingOffers.length - 1; i >= 0; i--) {
            if (currentWeek > store.data.aiLicensingOffers[i].expiresWeek) {
                store.data.aiLicensingOffers.splice(i, 1);
            }
        }
    }

    function csShowAILicensingModal(offer) {
        var studio = getMovieStudioById(offer.studioId);
        var fran = getFranchiseById(offer.franchiseId);
        if (!studio || !fran) return;

        var modalContent = $('<div style="padding: 15px; display: flex; flex-direction: column; background:#eee;"></div>');
        _ae(modalContent, '<h2 style="margin-top: 0; color: #111; border-bottom: 2px solid #444; padding-bottom:5px;">LICENSING PROPOSAL</h2>');
        _ae(modalContent, '<div style="background: #ddd; padding: 12px; border: 2px solid #555; margin-bottom: 15px;"><p style="font-size: 10pt; color: #111; margin:0;"><b>' + offer.studioName + '</b> wants to license <b>' + offer.franchiseName + '</b>.</p></div>');

        var terms = _ae(modalContent, '<div style="background: #ccc; padding: 12px; border: 2px solid #555; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;"></div>');
        var _t = function(p, l, v, c) {
            var d = _ae(p, '<div></div>');
            _ae(d, '<label style="display: block; color: #444; font-size: 7pt; font-weight:bold; text-transform: uppercase;">' + l + '</label>');
            _ae(d, '<div style="font-size: 14pt; font-weight:bold; color:' + (c || '#111') + ';">' + v + '</div>');
        };

        _t(terms, 'Upfront', '$' + UI.getShortNumberString(offer.upfront), '#27ae60');
        _t(terms, 'Duration', offer.filmsCount + ' Films', '#3498db');
        _t(terms, 'Royalties', (offer.royaltyRate * 100).toFixed(0) + '%', '#9b59b6');
        _t(terms, 'Studio Rep', (studio.reputation || 1).toFixed(1) + '/5', '#e67e22');

        var actions = _ae(modalContent, '<div style="display: flex; gap: 10px; margin-top: 5px;"></div>');
        _ae(actions, '<div class="selectorButton greenButton" style="flex: 1; padding: 10px; font-weight: bold; text-align: center;">ACCEPT DEAL</div>').click(function () { csHandleAILicensingResponse(offer, true); $.modal.close(); });
        _ae(actions, '<div class="selectorButton redButton" style="flex: 1; padding: 10px; font-weight: bold; text-align: center;">DECLINE</div>').click(function () { csHandleAILicensingResponse(offer, false); $.modal.close(); });

        $.modal(modalContent, { 
            overlayClose: true, 
            opacity: 80, 
            overlayCss: { backgroundColor: "#000" }, 
            containerCss: { width: "500px", backgroundColor: "#eee", border: "4px solid #333", padding: "0" } 
        });
    }

    function csHandleAILicensingResponse(offer, accepted) {
        if (accepted) {
            GameManager.company.adjustCash(offer.upfront, "IP Licensing Upfront: " + offer.franchiseName);
            store.data.activeAILicenses.push({
                id: "AL_" + Date.now(),
                studioId: offer.studioId,
                franchiseId: offer.franchiseId,
                filmsRemaining: offer.filmsCount,
                royaltyRate: offer.royaltyRate,
                totalRoyaltiesEarned: 0
            });
            Sound.click();
        }

        var idx = -1;
        for (var i = 0; i < store.data.aiLicensingOffers.length; i++) {
            if (store.data.aiLicensingOffers[i].id === offer.id) {
                idx = i;
                break;
            }
        }
        if (idx > -1) store.data.aiLicensingOffers.splice(idx, 1);
    }

