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

            if ((p.isReleasing || p.status === "releasing") && p.distributionStatus !== "pending" && p.distributionStatus !== "expired") {
                if (currentWeek >= p.nextReleaseWeek) {
                    var episodesAvailable = (p.type === "comicBook") ? p.totalEpisodes : ((p.seasonsProduced || 1) * (p.episodes || 12));

                    if (p.currentEpisode < episodesAvailable) {
                        p.currentEpisode++;
                        var f = p.franchiseId ? getFranchiseById(p.franchiseId) : null;
                        if (f) {
                            f.fanbaseScore = Math.max(0, Math.min(100, f.fanbaseScore + (p.type === "comicBook" ? 1 : 2)));
                        }

                        _n("New Release: " + p.title, (p.type === "comicBook" ? "Issue #" : "Episode #") + p.currentEpisode + " has been released!");

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

                p.estimatedRevenue = totalRev;
                p.distributionStatus = "pending";
                p.distributionDeadlineWeek = Math.floor(GameManager.company.currentWeek) + 4;

                var alreadyPending = false;
                for (var pi = 0; pi < store.data.pendingDistribution.length; pi++) {
                    if (store.data.pendingDistribution[pi].mediaProjectId === p.id) {
                        alreadyPending = true;
                        break;
                    }
                }
                if (!alreadyPending) {
                    store.data.pendingDistribution.push({
                        mediaProjectId: p.id,
                        decisionDeadlineWeek: p.distributionDeadlineWeek,
                        notified: false
                    });
                }

                _n("Distribution Decision Required", p.title + " is ready for distribution! Choose a channel within 4 weeks or it expires. Open the Media > Distribution tab.");

                if (f) {
                    var pScore = isNaN(p.score) ? 5 : p.score;
                    var impact = pScore >= 8 ? 15 : (pScore >= 5 ? 5 : -10);
                    f.fanbaseScore = Math.max(0, Math.min(100, f.fanbaseScore + impact));
                }
            }
        }


        var currentWkDist = Math.floor(GameManager.company.currentWeek);
        for (var pdI = store.data.pendingDistribution.length - 1; pdI >= 0; pdI--) {
            var pdItem = store.data.pendingDistribution[pdI];
            if (currentWkDist >= pdItem.decisionDeadlineWeek) {
                var expiredProj = csGetMediaProjectById(pdItem.mediaProjectId);
                if (expiredProj && expiredProj.distributionStatus === "pending") {
                    expiredProj.distributionStatus = "expired";
                    expiredProj.totalRevenue = 0;
                    expiredProj.weeklyRevenue = 0;
                    expiredProj.salesWeeksLeft = 0;
                    _n("Distribution Window Expired", expiredProj.title + " missed its distribution window and has been shelved. No revenue will be generated.");
                }
                store.data.pendingDistribution.splice(pdI, 1);
            }
        }
    }

    function csPromptMediaDraft(ms) {
        if ($("#simplemodal-overlay").length > 0) return;

        var draft = {
            title: ms.name + " Production " + Math.floor(Math.random() * 1000),
            type: ["movie", "tvSeries", "animatedShow"][Math.floor(Math.random() * 3)],
            budget: ms.valuation * 0.05,
            scoreEst: Math.floor(Math.random() * 4) + 6
        };

        var content = $('<div style="padding: 10px;"></div>');
        content.append('<h2 style="color: #d35400; margin-top: 0;">Media Production Pitch</h2>');
        content.append('<p>Your subsidiary <b>' + ms.name + '</b> has proposed a new project:</p>');
        var info = $('<div class="cs-stagger-item" style="background: #fff; border: 2px solid #555; padding: 15px; border-radius: 0px; margin-bottom: 20px;"></div>');
        info.append('<div style="font-weight: bold; font-size: 14pt;">' + draft.title + '</div>');
        info.append('<div style="color: #7f8c8d; font-size: 11pt;">Format: ' + draft.type + '</div>');
        info.append('<div style="color: #e74c3c; font-weight: bold; margin-top: 5px;">Required Budget: $' + UI.getShortNumberString(draft.budget) + '</div>');
        content.append(info);

        var actions = $('<div style="display: flex; gap: 10px;"></div>');
        var acceptBtn = $('<div class="selectorButton orangeButton" style="flex: 1; text-align: center;">Fund Project</div>');
        acceptBtn.click(function () {
            if (GameManager.company.cash >= draft.budget) {
                GameManager.company.adjustCash(-draft.budget, "Media Pitch: " + draft.title);
                ms.currentProject = {
                    title: draft.title,
                    type: draft.type,
                    weeksTotal: 20,
                    weeksRemaining: 20,
                    budget: draft.budget,
                    score: draft.scoreEst,
                    isPlayerFunded: true
                };
                ms.draftCooldown = 0;
                Sound.click();
                $.modal.close();
            } else {
                csNotify("Not enough cash to fund this production.");
            }
        });

        var rejectBtn = $('<div class="selectorButton whiteBoardButton" style="flex: 1; text-align: center;">Decline</div>');
        rejectBtn.click(function () {
            ms.draftCooldown = 12;
            Sound.click();
            $.modal.close();
        });

        actions.append(rejectBtn);
        actions.append(acceptBtn);
        content.append(actions);

        $.modal(content, {
            overlayClose: false,
            opacity: 80,
            overlayCss: { backgroundColor: "#000" },
            containerCss: { width: "500px", height: "auto", backgroundColor: "#eee", border: "4px solid #333", padding: "15px" }
        });
    }

    function csAutoRouteMediaCatalog(ms) {
        if (!store.data.gridService || !store.data.gridService.isActive) return;
        if (!store.data.releaseHistory) return;
        var grid = store.data.gridService;
        if (!Array.isArray(grid.contentLibrary)) grid.contentLibrary = [];

        var transferred = 0;

        for (var i = store.data.releaseHistory.length - 1; i >= 0; i--) {
            var r = store.data.releaseHistory[i];
            if (r.studioName === ms.name && (r.platformIds && r.platformIds.indexOf("movie") !== -1)) {
                if (!r.title || typeof r.title !== "string") {
                    // Skipping entry with invalid title
                    continue;
                }
                grid.contentLibrary.push(csCreateGridEntry({
                    mediaProjectId: null,
                    title: r.title,
                    type: "movie",
                    score: r.score,
                    isOriginal: true,
                    freshness: 0.5
                }));
                store.data.releaseHistory.splice(i, 1);
                transferred++;
            }
        }

        if (transferred > 0) {
            // Transferred titles to Grid library
            _n("Catalog Acquired", transferred + " titles from " + ms.name + " have been permanently transferred to your Grid library as originals!");
        }
    }

