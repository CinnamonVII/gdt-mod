    function csProcessMediaStudios() {
        if (!store.data.movieStudios) return;
        var currentWk = Math.floor(GameManager.company.currentWeek);

        for (var i = 0; i < store.data.movieStudios.length; i++) {
            var ms = store.data.movieStudios[i];

            if (ms.currentProject) {
                ms.currentProject.weeksRemaining--;
                if (ms.currentProject.weeksRemaining <= 0) {
                    var proj = ms.currentProject;
                    ms.currentProject = null;
                    // Tick release info

                    if (proj.isPlayerFunded) {

                        var finalScore = Math.min(10, Math.floor(proj.score + (Math.random() * 2 - 0.5)));
                        finalScore = Math.max(1, finalScore);
                        var baseRev = Math.floor(proj.budget * (1.2 + (finalScore / 10)));

                        var newProj = {
                            id: "FP_" + Date.now() + "_" + i,
                            title: proj.title,
                            type: proj.type,
                            producedBy: "player",
                            status: "released",
                            score: finalScore,
                            budget: proj.budget,
                            estimatedRevenue: baseRev,
                            distributionStatus: "pending",
                            distributionDeadlineWeek: currentWk + 4
                        };

                        if (store.data.gridService && store.data.gridService.isActive && ms.sharesOwned >= 50) {
                            var grid = store.data.gridService;
                            if (!Array.isArray(grid.contentLibrary)) grid.contentLibrary = [];
                            var gridTitle = newProj.title || (ms.name + " Production");
                            grid.contentLibrary.push(csCreateGridEntry({
                                mediaProjectId: newProj.id,
                                title: gridTitle,
                                type: newProj.type || "movie",
                                score: finalScore,
                                isOriginal: true,
                                freshness: 1.0
                            }));
                            _n("Grid Original Release", ms.name + " has delivered " + gridTitle + " directly to your streaming platform!");
                        } else {
                            if (!store.data.mediaProjects) store.data.mediaProjects = [];
                            store.data.mediaProjects.push(newProj);
                            if (!store.data.pendingDistribution) store.data.pendingDistribution = [];
                            store.data.pendingDistribution.push({ mediaProjectId: newProj.id, decisionDeadlineWeek: newProj.distributionDeadlineWeek });

                            _n("Subsidiary Media Finished", ms.name + " has delivered " + newProj.title + ". It awaits distribution.");
                        }
                    } else {

                        var catDeal = (store.data.activeCatalogueDeals || []).filter(function (d) { return d.studioId === ms.id && currentWk < d.endWeek; })[0];
                        if (catDeal && store.data.gridService && store.data.gridService.isActive) {
                            var pseudoMovie = { title: proj.title, score: proj.score, studioName: ms.name };
                            // Catalogue Deal routing to Grid
                            csLicenseExternalToGrid(pseudoMovie, 0, 104);
                        } else {
                            if (!store.data.releaseHistory) store.data.releaseHistory = [];
                            var releaseTitle = proj.title || (ms.name + " " + proj.type);
                            var releaseScore = (typeof proj.score === "number" && !isNaN(proj.score)) ? proj.score : 5;
                            store.data.releaseHistory.push({
                                id: "FR_" + Date.now() + "_" + i,
                                title: releaseTitle,
                                platformIds: ["movie"],
                                score: releaseScore,
                                studioName: ms.name
                            });
                        }


                        if (proj.modLicenseId) {
                            var lic = store.data.activeAILicenses.filter(function (l) { return l.id === proj.modLicenseId; })[0];
                            if (lic) {
                                var estBoxOffice = Math.floor(proj.budget * 2.5 * (proj.score / 5));
                                var playerCut = Math.floor(estBoxOffice * lic.royaltyRate);
                                if (playerCut > 0) {
                                    GameManager.company.adjustCash(playerCut, "Licensing Royalties: " + proj.title);
                                    lic.totalRoyaltiesEarned += playerCut;
                                    _n("Royalty Payment", ms.name + " released " + proj.title + ". Your " + (lic.royaltyRate * 100).toFixed(0) + "% royalty: $" + UI.getShortNumberString(playerCut));
                                }
                                lic.filmsRemaining--;
                                if (lic.filmsRemaining <= 0) {
                                    _n("License Expired", ms.name + "'s license for your franchise has expired.");
                                }
                            }
                        }

                        ms.valuation += Math.floor(proj.budget * 0.1);
                    }
                }
            } else {
                if (ms.sharesOwned >= 50) {
                    if (ms.draftCooldown > 0) {
                        ms.draftCooldown--;
                    } else if (currentWk % 4 === 0 && Math.random() < 0.25) {
                        csPromptMediaDraft(ms);
                    }
                } else {

                    var licToUse = store.data.activeAILicenses.filter(function (l) { return l.studioId === ms.id && l.filmsRemaining > 0; })[0];
                    if (licToUse && Math.random() < 0.6) {
                        var lFran = getFranchiseById(licToUse.franchiseId);
                        if (lFran) {
                            var pBudget = Math.floor(ms.valuation * 0.1);
                            ms.currentProject = {
                                title: lFran.name + " " + ["Origins", "Evolution", "Legacy", "Reborn"][Math.floor(Math.random() * 4)],
                                type: ["movie", "tvSeries"][Math.floor(Math.random() * 2)],
                                weeksTotal: 28,
                                weeksRemaining: 28,
                                budget: pBudget,
                                score: Math.floor(Math.random() * 4) + 6,
                                isPlayerFunded: false,
                                modLicenseId: licToUse.id
                            };
                            continue;
                        }
                    }

                    if (Math.random() < 0.10) {
                        var indieBudget = ms.valuation * 0.05;
                        ms.currentProject = {
                            title: csGenerateMovieTitle(),
                            type: ["movie", "tvSeries", "animatedShow"][Math.floor(Math.random() * 3)],
                            weeksTotal: 24,
                            weeksRemaining: 24,
                            budget: indieBudget,
                            score: Math.floor(Math.random() * 5) + 5,
                            isPlayerFunded: false
                        };
                    }
                }
            }
        }
    }

