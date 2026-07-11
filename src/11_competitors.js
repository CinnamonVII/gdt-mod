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
                        _n("Auto Co-Dev", studio.name + " is prioritizing your project.");
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
                                _n("Publishing Deal Accepted", studio.name + " accepted your deal for '" + gName + "' ($" + UI.getShortNumberString(offer.advance) + " advance) and started development!");
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
            isShowingDraft = true; Sound.click();
            var genreIndexMap = { "Action": 0, "Adventure": 1, "RPG": 2, "Simulation": 3, "Strategy": 4, "Casual": 5 };

            var container = $('<div class="windowBorder tallWindow" style="background-color: #eee; border-radius: 0px; color: #2c3e50; padding: 0; display: flex; flex-direction: column; width: 100%; height: 100%; box-sizing: border-box; position: relative;"></div>');
            _ae(container, '<div style="position: absolute; right: 10px; top: 10px; width: 24px; height: 24px; line-height: 22px; text-align: center; border-radius: 50%; background: #e74c3c; color: white; font-weight: bold; cursor: pointer; font-size: 14pt; z-index: 1000; box-shadow: none;">×</div>')
                .click(function () { isShowingDraft = false; $.modal.close(); })
                .hover(function () { $(this).css('background', '#c0392b'); }, function () { $(this).css('background', '#e74c3c'); });

            var header = _ae(container, '<div style="flex: 0 0 auto; background-color: #e0e6ed; padding: 15px 20px; position: relative; border-bottom: 2px solid #bdc3c7;"></div>');
            _ae(header, '<div style="font-size: 16pt; font-weight: bold; color: #2c3e50; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-right: 40px;">' + studio.name + ' <span style="font-size: 11pt; color: #7f8c8d; font-weight: normal;">(Subsidiary Draft)</span></div>');

            var body = _ae(container, '<div style="flex: 1; overflow-y: auto; overflow-x: hidden; padding: 20px; background: #ffffff; min-height: 0;"></div>');

            function makeRow(labelText, color, selectEl) {
                var row = $('<div style="display: flex; align-items: center; margin-bottom: 12px;"></div>');
                _ae(row, '<div style="width: 85px; font-size: 11pt; font-weight: bold; color: #34495e; text-transform: uppercase; letter-spacing: 0.5px;">' + labelText + '</div>');
                selectEl.css({ "flex": "1", "min-width": "0", "font-size": "11pt", "padding": "6px 10px", "border-radius": "4px", "border": "1px solid #bdc3c7", "background": "#f9f9f9", "color": "#2c3e50", "outline": "none", "cursor": "pointer", "box-shadow": "inset 0 1px 2px rgba(0,0,0,0.05)", "transition": "border-color 0.2s" });
                selectEl.hover(function () { $(this).css("border-color", color); }, function () { $(this).css("border-color", "#bdc3c7"); });
                row.append(selectEl); return row;
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

            var matchBar = _ae(body, '<div style="display: flex; align-items: center; margin-top: 5px; margin-bottom: 10px;"></div>');
            _ae(matchBar, '<div style="width: 85px; font-size: 11pt; font-weight: bold; color: #7f8c8d; text-transform: uppercase;">Match</div>');
            var matchLabel = _ae(matchBar, '<span id="draft_match" style="font-size: 10.5pt; font-weight: bold; padding: 4px 12px; border-radius: 0px; box-shadow: none;"></span>');

            function updateDraftMatch() {
                var selTopic = $('#draft_topic').val(), selGenre = $('#draft_genre').val();
                var t = Topics.topics.filter(function (x) { return x.name === selTopic; })[0], g = GameGenre.getAll().filter(function (x) { return x.name === selGenre; })[0];
                if (t && g) {
                    var idx = genreIndexMap[g.name]; if (idx === undefined) idx = 0;
                    var w = (t.genreWeightings && t.genreWeightings[idx]) || 0, el = $('#draft_match');
                    if (w >= 1.0) { el.text("Premium Quality \u2605\u2605\u2605").css({ "color": "white", "background": "#27ae60" }); }
                    else if (w >= 0.8) { el.text("Standard Quality \u2605\u2605").css({ "color": "white", "background": "#f39c12" }); }
                    else if (w >= 0.7) { el.text("Fair Quality \u2605").css({ "color": "white", "background": "#e67e22" }); }
                    else { el.text("Low Synergy \u2717").css({ "color": "white", "background": "#c0392b" }); }
                }
            }

            _ae(body, '<div style="text-align: center; margin-top: 15px; padding: 12px; background: #f4f6f7; border: 2px dashed #bdc3c7; border-radius: 0px; font-size: 13pt; color: #2c3e50;">Required Funding: <strong id="draft_cost_val" style="color: #c0392b; font-size: 15pt;">$' + UI.getShortNumberString(draft.cost) + '</strong></div>');

            var btnArea = _ae(container, '<div style="flex: 0 0 auto; display: flex; gap: 10px; padding: 15px 20px; background: #eee; border-top: 2px solid #bdc3c7;"></div>');
            var btnAccept = $('<div class=\"selectorButton greenButton\" style=\"flex: 1.5; text-align: center; padding: 12px 0; font-size: 13pt; font-weight: bold; cursor: pointer; border-radius: 0px;\">Accept \u0026 Fund</div>');
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
                } else { csNotify("You need $" + UI.getShortNumberString(cost) + " to fund this draft!"); }
            });

            var btnDecline = $('<div class=\"selectorButton deleteButton\" style=\"flex: 1; text-align: center; padding: 12px 0; font-size: 13pt; font-weight: bold; cursor: pointer; border-radius: 0px;\">Decline</div>');
            btnDecline.click(function () { isShowingDraft = false; studio.draftCooldown = 8; $.modal.close(); });

            btnArea.append(btnAccept).append(btnDecline);
            container.append(btnArea);

            container.modal({
                containerId: 'modUI_container',
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
                studio.currentProject = { id: project.id, name: project.title || generateGameName(project.topic, project.genre), title: project.title || null, topic: project.topic, genre: project.genre, genre2: project.genre2 || null, size: project.size, platforms: project.platforms, weeksRemaining: project.weeksRemaining, isPublishedByPlayer: project.isPublishedByPlayer, publishedGameAdvance: project.publishedGameAdvance, isFranchiseEntry: project.isFranchiseEntry, franchiseId: project.franchiseId, entryType: project.entryType };
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


        var qFactor = Math.max(0, Math.min(1.0, (totalQuality - 3.0) / (37.5 - 3.0)));


        var rngWeight = 1.0 - (qFactor * 0.95);

        var talentScore = (qFactor * 9) + 1;
        var luckScore = (Math.random() * 9) + 1;

        var score = Math.floor((talentScore * (1 - rngWeight)) + (luckScore * rngWeight));

        if (proj.size === "AAA") score += 1;


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

            _n("Subsidiary DLC Released", studio.name + " finished developing " + proj.name + " (#" + store.data.dlcData[proj.gameId].count + ")! It is now generating revenue.");
            return;
        }

        var f = proj.isFranchiseEntry ? getFranchiseById(proj.franchiseId) : null;
        if (proj.isFranchiseEntry) {
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
            _n(headerText, msgText);
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
                        _n("DLC Finished", "Your DLC for " + (GameManager.company.getGameById(gameId) ? GameManager.company.getGameById(gameId).title : "your game") + " is finished and generating revenue!");
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
                _n("Campaign Finished", "Your marketing campaign for '" + c.targetName + "' has concluded.");
                store.data.activeCampaigns.splice(i, 1);
            }
        }
    }

    function processStandardMarketing() {
        var games = GameManager.company.gameLog || [];
        var currentWk = GameManager.company.currentWeek;
        for (var i = 0; i < games.length; i++) {
            var g = games[i];


            var totalSales = g.totalSalesCash || 0;
            var prevTotal = g.modLastTotalSales || totalSales;
            var weeklyRev = totalSales - prevTotal;
            g.modLastTotalSales = totalSales;


            if (!g.modRevenueHistory) g.modRevenueHistory = [];
            g.modRevenueHistory.push(weeklyRev);
            if (g.modRevenueHistory.length > 4) g.modRevenueHistory.shift();

            var maxAge = 20 + (g.modMarketExtension || 0);
            var age = currentWk - g.releaseWeek;


            if (g.state === GameState.released && !g.isExtensionPack && (maxAge - age === 4)) {
                var promptKey = "PROMPT_" + (g.modMarketExtension || 0);
                if (g.modLastPromptKey !== promptKey) {
                    g.modLastPromptKey = promptKey;

                    var lastMonthRev = 0;
                    g.modRevenueHistory.forEach(function (r) { lastMonthRev += r; });
                    if (lastMonthRev === 0) lastMonthRev = weeklyRev * 4;

                    var forecastRev = Math.floor(lastMonthRev * 0.85);
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

        var stats = $('<div style="background: #ddd; padding: 15px; border-radius: 0px; margin: 15px 0; border: 2px solid #555; display: flex; justify-content: space-around;"></div>');
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
                csNotify("Not enough funds!");
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
            if (store.data.activeCampaigns[i].targetId === targetId) {
                boost *= store.data.activeCampaigns[i].boostFactor;
            }
        }
        return boost;
    }

