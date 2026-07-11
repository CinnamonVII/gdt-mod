    function csRenderDistributionTab(container) {
        container.empty();
        _ae(container, csRenderSectionHeader('Media Distribution'));

        var currentWeek = Math.floor(GameManager.company.currentWeek);

        // Awaiting Decision Section
        var distPending = store.data.pendingDistribution || [];
        _ae(container, '<div style="font-size:8pt; font-weight:bold; color:#444; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:10px;">Pending Decisions</div>');
        
        if (distPending.length === 0) {
            _ae(container, csRenderEmptyState('No projects currently awaiting distribution.'));
        } else {
            distPending.forEach(function (pd) {
                var mediaProj = csGetMediaProjectById(pd.mediaProjectId);
                if (!mediaProj) return;

                var weeksLeft = Math.max(0, pd.decisionDeadlineWeek - currentWeek);
                var urgencyColor = weeksLeft <= 1 ? "#e74c3c" : (weeksLeft <= 2 ? "#e67e22" : "#27ae60");

                var card = _ae(container, '<div style="background:#fff; box-shadow:0 1px 4px rgba(0,0,0,0.15); border-left:4px solid ' + urgencyColor + '; padding:16px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; border-radius:6px;"></div>');

                var info = _ae(card, '<div></div>');
                _ae(info, '<div style="font-weight:bold; font-size:11pt; color:#2c3e50;">' + mediaProj.title + ' <span style="font-size:8pt; color:#7f8c8d; text-transform:uppercase;">[' + mediaProj.type + ']</span></div>');
                _ae(info, '<div style="font-size:9pt; margin-top:4px;">Score: ' + csRenderScoreBadge(mediaProj.score) + ' | Est. Revenue: <span style="color:#27ae60; font-weight:bold;">$' + UI.getShortNumberString(mediaProj.estimatedRevenue) + '</span></div>');
                _ae(info, '<div style="font-size:11pt; margin-top:6px; font-weight:bold; color:' + urgencyColor + ';">' + weeksLeft + ' WKS LEFT</div>');

                var actionBtn = _ae(card, '<div class="selectorButton orangeButton" style="padding:12px 20px; font-weight:bold; font-size:11pt;">REVIEW OFFERS</div>');
                actionBtn.click(function () {
                    Sound.click();
                    store.data.activeDistributionChoice = mediaProj;
                    routeModMenu("distribution_offers", "media");
                });
            });
        }

        // Active Streaming Section
        _ae(container, '<div style="margin-top:25px; font-size:8pt; font-weight:bold; color:#444; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:10px;">Active Streaming Contracts</div>');
        var activeStreamDeals = [];
        if (store.data.streamingPlatforms) {
            store.data.streamingPlatforms.forEach(function (platform) {
                if (platform.activeDeals) {
                    platform.activeDeals.forEach(function (deal) {
                        if (!deal.isGridLicense) activeStreamDeals.push({ platform: platform, deal: deal });
                    });
                }
            });
        }

        if (activeStreamDeals.length === 0) {
            _ae(container, csRenderEmptyState('No active streaming contracts.'));
        } else {
            var sTable = _ae(container, '<table style="width:100%; border-collapse:collapse; font-size:9pt; background:#fff; border:1px solid #bdc3c7; margin-bottom:20px; border-radius:6px; overflow:hidden;">' +
                '<tr style="background:#34495e; color:white; text-transform:uppercase; letter-spacing:0.5px;"><th style="padding:10px; text-align:left;">Project</th><th>Platform</th><th>Weekly Rev</th><th>Progress</th><th>Action</th></tr></table>');

            activeStreamDeals.forEach(function (item, idx) {
                var d = item.deal, p = item.platform, bg = (idx % 2 === 0) ? '#fff' : '#f4f4f4';
                var r = _ae(sTable, '<tr style="background:' + bg + '; border-bottom:1px solid #bdc3c7;"></tr>');
                _ae(r, '<td style="padding:8px; font-weight:bold; color:#2c3e50;">' + d.title + '</td>');
                _ae(r, '<td style="padding:8px;"><span style="display:inline-block; width:8px; height:8px; background:' + (p.logoColor || '#555') + '; margin-right:6px;"></span>' + p.name + '</td>');
                _ae(r, '<td style="text-align:center; color:#27ae60; font-weight:bold;">+$' + UI.getShortNumberString(d.weeklyRevenue) + '</td>');
                
                var progTd = _ae(r, '<td style="text-align:center;"></td>');
                var pct = Math.round((d.weeksActive / d.weeksTotal) * 100);
                _ae(progTd, '<div style="font-size:8pt; margin-bottom:2px;">' + d.weeksActive + '/' + d.weeksTotal + ' w</div>');
                _ae(progTd, csRenderMiniBar(pct, '#2980b9', 60));

                var actTd = _ae(r, '<td style="text-align:center; padding:4px;"></td>');
                var breakBtn = _ae(actTd, '<div class="selectorButton deleteButton" style="padding:4px 8px; font-size:8pt; font-weight:bold;">⚠ BREAK</div>');
                breakBtn.click(function () {
                    Sound.click();
                    var penalty = Math.floor((d.weeklyRevenue * (d.weeksTotal - d.weeksActive)) * 1.5) || 500000;
                    if (confirm("Break contract? Penalty: $" + UI.getShortNumberString(penalty))) {
                        if (GameManager.company.cash < penalty) return csNotify("Cannot afford penalty.");
                        GameManager.company.adjustCash(-penalty, "Breach: " + p.name);
                        p.activeDeals = p.activeDeals.filter(function (x) { return x.mediaProjectId !== d.mediaProjectId; });
                        var proj = csGetMediaProjectById(d.mediaProjectId);
                        if (proj) {
                            proj.distributionStatus = "pending";
                            _da(store.data, 'pendingDistribution');
                            store.data.pendingDistribution.push({ mediaProjectId: proj.id, decisionDeadlineWeek: currentWeek + 4 });
                        }
                        csRenderDistributionTab(container);
                    }
                });
            });
        }

        // Active Theater Section
        _ae(container, '<div style="margin-top:25px; font-size:8pt; font-weight:bold; color:#444; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:10px;">Theatrical Runs</div>');
        var activeTheater = (store.data.theaterReleases || []).filter(function (r) { return r.status === "active"; });

        if (activeTheater.length === 0) {
            _ae(container, csRenderEmptyState('No active theater releases.'));
        } else {
            var tTable = _ae(container, '<table style="width:100%; border-collapse:collapse; font-size:9pt; background:#fff; border:2px solid #555;">' +
                '<tr style="background:#555; color:white; text-transform:uppercase; letter-spacing:0.5px;"><th style="padding:8px; text-align:left;">Movie</th><th>Chain</th><th>Box Office</th><th>Player Share</th><th>Week</th><th>Cancel</th></tr></table>');

            activeTheater.forEach(function (tr, idx) {
                var chain = csGetTheaterChainById(tr.theaterChainId), chainName = chain ? chain.name : "Unknown", bg = (idx % 2 === 0) ? '#fff' : '#f4f4f4';
                var r = _ae(tTable, '<tr style="background:' + bg + '; border-bottom:1px solid #bdc3c7;"></tr>');
                _ae(r, '<td style="padding:8px; font-weight:bold; color:#2c3e50;">' + tr.title + '</td>');
                _ae(r, '<td>' + chainName + '</td>');
                _ae(r, '<td style="text-align:right; padding-right:10px;">$' + UI.getShortNumberString(tr.accumulatedRevenue || 0) + '</td>');
                _ae(r, '<td style="text-align:right; font-weight:bold; color:#27ae60; padding-right:10px;">$' + UI.getShortNumberString(tr.playerShare) + '</td>');
                _ae(r, '<td style="text-align:center;">' + tr.weeksActive + '/' + tr.maxWeeks + '</td>');

                var actTd = _ae(r, '<td style="text-align:center;"></td>');
                var cancelBtn = _ae(actTd, '<div class="selectorButton deleteButton" style="padding:4px 8px; font-size:8pt; font-weight:bold;">CANCEL</div>');
                cancelBtn.click(function () {
                    Sound.click();
                    var penalty = 2000000;
                    if (confirm("Cancel theater run? Fee: $2M")) {
                        if (GameManager.company.cash < penalty) return csNotify("Needs $2M!");
                        GameManager.company.adjustCash(-penalty, "Theater Cancellation: " + chainName);
                        tr.status = "abandoned";
                        var proj = csGetMediaProjectById(tr.mediaProjectId);
                        if (proj) {
                            proj.distributionStatus = "pending";
                            _da(store.data, 'pendingDistribution');
                            store.data.pendingDistribution.push({ mediaProjectId: proj.id, decisionDeadlineWeek: currentWeek + 4 });
                        }
                        csRenderDistributionTab(container);
                    }
                });
            });
        }
    }

    function csRenderDistributionOffers(container) {
        var project = store.data.activeDistributionChoice;
        if (!project) { routeModMenu("media", "media"); return; }

        container.empty();
        var h = _ae(container, '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;"></div>');
        _ae(h, '<div style="font-size:16pt; font-weight:bold; color:#2c3e50;">' + project.title + '</div>');
        _ae(h, '<div class="selectorButton" style="padding:5px 15px;">BACK</div>').click(function(){ routeModMenu("media", "media"); });

        _ae(container, '<div style="background:#fff; border:2px solid #555; padding:10px; margin-bottom:20px; display:flex; gap:20px; align-items:center;">' +
            '<div>Score: ' + csRenderScoreBadge(project.score) + '</div>' +
            '<div style="font-size:10pt;">Estimated Value: <b style="color:#27ae60;">$' + UI.getShortNumberString(project.estimatedRevenue) + '</b></div></div>');

        // Section 1: Your Grid
        if (store.data.gridService && store.data.gridService.isActive) {
            _ae(container, csRenderSectionHeader('Internal Distribution'));
            var gridScoreEst = project.score || 5;
            var estBoost = Math.floor(gridScoreEst * 500 * (gridScoreEst >= 8 ? 3 : (gridScoreEst >= 6 ? 1.5 : 1)));
            var gCard = _ae(container, '<div style="background:#fffbf0; border:2px solid #f39c12; padding:12px; margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;"></div>');
            var gL = _ae(gCard, '<div><div style="font-weight:bold; font-size:12pt; color:#d35400;">Grid Exclusive</div>' +
                '<div style="font-size:9pt; color:#555; margin-top:2px;">Est. +' + UI.getShortNumberString(estBoost) + ' subscribers | Content Power: ' + (project.score*10) + '</div></div>');
            var gBtn = _ae(gCard, '<div class="selectorButton orangeButton" style="padding:10px 20px; font-weight:bold;">ADD TO GRID</div>');
            gBtn.click(function() { csAddToGrid(project); routeModMenu("media", "media"); });
        }

        // Section 2: Theatrical
        if (project.type === "movie" && store.data.theaterChains) {
            _ae(container, csRenderSectionHeader('Theatrical Distribution'));
            var chains = store.data.theaterChains.slice().sort(function(a,b){ return b.prestige - a.prestige; });
            chains.forEach(function(chain) {
                var minReq = Math.ceil(chain.prestige * 1.5), isOk = project.score >= minReq;
                var cCard = _ae(container, '<div style="background:#fff; border:2px solid #bdc3c7; padding:12px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;' + (isOk?'':'opacity:0.6') + '"></div>');
                
                var cL = _ae(cCard, '<div style="flex:1;"></div>');
                var stars = ""; for(var i=0; i<5; i++) stars += (i < chain.prestige ? '★' : '☆');
                _ae(cL, '<div style="font-weight:bold; font-size:11pt;">' + chain.name + ' <span style="color:#f39c12; font-size:10pt;">' + stars + '</span></div>');
                _ae(cL, '<div style="font-size:9pt; color:#7f8c8d;">Fee: ' + (chain.distributionFeeRate*100).toFixed(0) + '% | Screens: ' + (chain.prestige*100) + '</div>');

                var cM = _ae(cCard, '<div style="flex:1; text-align:center;"></div>');
                if (isOk) {
                    var est = csEstimateTheaterRevenue(project, chain);
                    _ae(cM, '<div style="color:#27ae60; font-weight:bold; font-size:10pt;">$' + UI.getShortNumberString(est.playerShare.min) + ' - $' + UI.getShortNumberString(est.playerShare.max) + '</div>');
                } else _ae(cM, '<div style="color:#e74c3c; font-weight:bold; font-size:9pt; text-transform:uppercase;">Score too low</div>');

                var cR = _ae(cCard, '<div style="width:100px; text-align:right;"></div>');
                if (isOk) {
                    var bBtn = _ae(cR, '<div class="selectorButton whiteBoardButton" style="padding:6px 12px; font-size:10pt;">BOOK</div>');
                    bBtn.click(function(){ csConfirmTheaterRelease(project, chain); routeModMenu("media", "media"); });
                }
            });
        }

        // Section 3: Streaming
        if (store.data.streamingPlatforms) {
            _ae(container, csRenderSectionHeader('Streaming Contracts'));
            var platforms = store.data.streamingPlatforms.slice().sort(function(a,b){ return b.subscriberBase - a.subscriberBase; });
            platforms.forEach(function(plat) {
                if (plat.acceptsType && plat.acceptsType.indexOf(project.type) === -1) return;
                var est = csEstimateStreamingRevenue(project, plat);
                var pCard = _ae(container, '<div style="background:#fff; border:2px solid #bdc3c7; border-left:4px solid ' + (plat.logoColor || '#555') + '; padding:12px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;"></div>');
                
                var pL = _ae(pCard, '<div style="flex:1;"></div>');
                _ae(pL, '<div style="font-weight:bold; font-size:11pt;">' + plat.name + (plat.subscriberBase > 1e8 ? ' <span style="background:#ff9f43; color:white; font-size:7pt; padding:1px 4px; vertical-align:middle;">POPULAR</span>' : '') + '</div>');
                _ae(pL, '<div style="font-size:9pt; color:#7f8c8d;">Users: ' + UI.getShortNumberString(plat.subscriberBase) + ' | Length: ' + est.weeks + 'w</div>');

                var pM = _ae(pCard, '<div style="flex:1; text-align:center;"></div>');
                _ae(pM, '<div style="color:#27ae60; font-weight:bold; font-size:10pt;">Est. Max: $' + UI.getShortNumberString(est.totalRevenue) + '</div>');
                _ae(pM, '<div style="font-size:8pt; color:#555;">($' + UI.getShortNumberString(Math.floor(est.totalRevenue/est.weeks)) + ' /wk)</div>');

                var pR = _ae(pCard, '<div style="width:100px; text-align:right;"></div>');
                var sBtn = _ae(pR, '<div class="selectorButton whiteBoardButton" style="padding:6px 12px; font-size:10pt;">SIGN DEAL</div>');
                sBtn.click(function(){ csConfirmStreamingDeal(project, plat); routeModMenu("media", "media"); });
            });
        }
    }

    function csShowDistributionChoiceModal(project, onRefresh) {
        var modalContent = $('<div style="padding: 10px; display: flex; flex-direction: column; height: 100%;"></div>');
        modalContent.append('<h2 style="margin-top: 0; color: #d35400;">Distribution Offers: ' + project.title + '</h2>');
        modalContent.append('<p style="font-size: 11pt; color: #34495e;">Project Score: <b>' + project.score + '/10</b> | Base Value: <b>$' + UI.getShortNumberString(project.estimatedRevenue) + '</b></p>');

        var offersContainer = $('<div style="flex: 1; overflow-y: auto; padding-right: 10px;"></div>');


        if (store.data.gridService && store.data.gridService.isActive) {
            var gridScoreEst2 = (typeof project.score === "number" && !isNaN(project.score)) ? project.score : 5;
            var estBoost2 = Math.floor(gridScoreEst2 * 500 * (gridScoreEst2 >= 8 ? 3 : (gridScoreEst2 >= 6 ? 1.5 : 1)));
            var gridObj = $('<div class="cs-stagger-item" style="background: #fff; box-shadow:0 2px 6px rgba(0,0,0,0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; border-left:4px solid #f39c12;"></div>');
            var gInfo = $('<div></div>');
            gInfo.append('<h3 style="margin: 0; color: #d35400;">Your Grid Service</h3>');
            gInfo.append('<div style="font-size: 10pt; margin-top: 5px;">Add directly to your Grid platform as exclusive content.</div>');
            gInfo.append('<div style="font-size: 10pt; color: #27ae60; font-weight: bold; margin-top: 5px;">Est. +' + UI.getShortNumberString(estBoost2) + ' subscribers</div>');
            gridObj.append(gInfo);

            var gridBtn = $('<div class="selectorButton orangeButton" style="padding: 10px 20px;">Publish to Grid</div>');
            gridBtn.click(function () {
                csAddToGrid(project);
                $.modal.close();
                if (onRefresh) onRefresh();
            });
            gridObj.append(gridBtn);
            offersContainer.append(gridObj);
        }


        if (project.type === "movie" && store.data.theaterChains) {
            offersContainer.append('<h3 style="margin-bottom: 10px; border-bottom: 1px solid #bdc3c7;">Theatrical Releases</h3>');
            store.data.theaterChains.forEach(function (chain) {
                var projected = csEstimateTheaterRevenue(project, chain);
                var minReqScore = Math.ceil(chain.prestige * 1.5);
                var isAcceptable = project.score >= minReqScore;

                var tObj = $('<div style="background: #fff; box-shadow:0 1px 4px rgba(0,0,0,0.15); padding: 12px; border-radius: 6px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; ' + (!isAcceptable ? 'opacity: 0.6;' : '') + '"></div>');

                var tInfo = $('<div></div>');
                tInfo.append('<div style="font-weight: bold; font-size: 11pt;">' + chain.name + ' <span style="font-size: 9pt; color: #7f8c8d;">(Prestige: ' + chain.prestige + ')</span></div>');
                tInfo.append('<div style="font-size: 10pt; margin-top: 3px;">Distribution Fee: ' + (chain.distributionFeeRate * 100).toFixed(0) + '% | Min Score: ' + minReqScore.toFixed(1) + '</div>');

                if (isAcceptable) {
                    tInfo.append('<div style="font-size: 10pt; color: #27ae60; font-weight: bold; margin-top: 5px;">Est. Your Share: $' + UI.getShortNumberString(projected.playerShare.min) + ' - $' + UI.getShortNumberString(projected.playerShare.max) + '</div>');
                } else {
                    tInfo.append('<div style="font-size: 10pt; color: #e74c3c; font-weight: bold; margin-top: 5px;">Project score too low for this chain.</div>');
                }
                tObj.append(tInfo);

                if (isAcceptable) {
                    var tBtn = $('<div class="selectorButton whiteBoardButton" style="padding: 8px 15px;">Sign Deal</div>');
                    tBtn.click(function () {
                        csConfirmTheaterRelease(project, chain);
                        $.modal.close();
                        if (onRefresh) onRefresh();
                    });
                    tObj.append(tBtn);
                } else {
                    tObj.append('<div style="padding: 8px 15px; color: #7f8c8d; font-weight: bold;">Rejected</div>');
                }

                offersContainer.append(tObj);
            });
        }


        if (store.data.streamingPlatforms) {
            offersContainer.append('<div style="margin-top: 25px; margin-bottom: 12px;">' + csRenderSectionHeader('Streaming Exclusive Deals') + '</div>');
            store.data.streamingPlatforms.forEach(function (platform) {
                if (platform.acceptsType && platform.acceptsType.indexOf(project.type) === -1) return;
                var projected = csEstimateStreamingRevenue(project, platform);

                var sObj = $('<div style="background: #fff; box-shadow:0 1px 4px rgba(0,0,0,0.15); padding: 16px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; border-radius:6px;"></div>');

                var sInfo = $('<div></div>');
                sInfo.append('<div style="font-weight: bold; font-size: 11pt;">' + platform.name + ' <span style="font-size: 9pt; color: #7f8c8d;">(Users: ' + UI.getShortNumberString(platform.subscriberBase) + ')</span></div>');

                sInfo.append('<div style="font-size: 10pt; margin-top: 3px;">Contract: ' + projected.weeks + ' weeks</div>');

                sInfo.append('<div style="font-size: 10pt; color: #27ae60; font-weight: bold; margin-top: 5px;">Total Est. Payout: $' + UI.getShortNumberString(projected.totalRevenue) + '</div>');
                sObj.append(sInfo);

                var sBtn = $('<div class="selectorButton whiteBoardButton" style="padding: 8px 15px;">Sign Deal</div>');
                sBtn.click(function () {
                    csConfirmStreamingDeal(project, platform);
                    $.modal.close();
                    if (onRefresh) onRefresh();
                });
                sObj.append(sBtn);

                offersContainer.append(sObj);
            });
        }

        modalContent.append(offersContainer);

        $.modal(modalContent, {
            overlayClose: true,
            opacity: 80,
            overlayCss: { backgroundColor: "#000" },
            containerCss: {
                width: "700px",
                height: "600px",
                backgroundColor: "#eee",
                border: "4px solid #333",
                padding: "15px"
            }
        });
    }

    function csRenderGridTab(container) {
        container.empty();
        var g = store.data.gridService;
        if (!g || !g.isActive) {
            _ae(container, csRenderSectionHeader('The Grid'));
            _ae(container, csRenderEmptyState('The Grid streaming service is not yet active. Visit the "DASHBOARD" to launch your platform and start competing.'));
            return;
        }

        // Action Bar
        var bar = _ae(container, '<div style="display:flex; gap:10px; margin-bottom:20px; background:#ddd; padding:10px; border:2px solid #bdc3c7;"></div>');
        var dashBtn = _ae(bar, '<div class="selectorButton orangeButton" style="flex:1; text-align:center; padding:10px 0; font-weight:bold;">PLATFORM DASHBOARD</div>');
        dashBtn.click(function () { Sound.click(); routeModMenu("grid_dashboard", "media"); });
        
        var mktBtn = _ae(bar, '<div class="selectorButton" style="flex:1; text-align:center; padding:10px 0; font-weight:bold;">CONTENT MARKET</div>');
        mktBtn.click(function () { Sound.click(); routeModMenu("film_market", "media"); });

        // Internal Content
        _ae(container, csRenderSectionHeader('Internal Original Content'));
        var internal = (store.data.mediaProjects || []).filter(function (p) { return p.distributionStatus === 'grid'; });
        if (internal.length === 0) {
            _ae(container, csRenderEmptyState('No original projects are currently hosted on The Grid.'));
        } else {
            var iTable = _ae(container, '<table style="width:100%; border-collapse:collapse; font-size:9pt; background:#fff; border:2px solid #555; margin-bottom:20px;">' +
                '<tr style="background:#555; color:white; text-transform:uppercase; letter-spacing:0.5px;"><th style="padding:8px; text-align:left;">Title</th><th>Type</th><th>Score</th><th>Weekly Rev</th><th>Popularity</th></tr></table>');
            internal.forEach(function (p, idx) {
                var bg = (idx % 2 === 0) ? '#fff' : '#f4f4f4';
                var r = _ae(iTable, '<tr style="background:' + bg + '; border-bottom:1px solid #bdc3c7;"></tr>');
                _ae(r, '<td style="padding:8px; font-weight:bold; color:#2c3e50;">' + p.title + '</td>');
                _ae(r, '<td style="text-align:center; font-size:8pt; text-transform:uppercase;">' + p.type + '</td>');
                _ae(r, '<td style="text-align:center;">' + csRenderScoreBadge(p.score) + '</td>');
                _ae(r, '<td style="text-align:center; color:#27ae60; font-weight:bold;">+$' + UI.getShortNumberString(p.weeklyRevenue || 0) + '</td>');
                _ae(r, '<td style="text-align:center;">' + csRenderMiniBar((p.score || 5) * 10, '#f39c12', 60) + '</td>');
            });
        }

        // Licensed Content (non-original entries in contentLibrary)
        _ae(container, csRenderSectionHeader('Licensed External Catalog'));
        var licensed = (g.contentLibrary || []).filter(function (c) { return c.isOriginal === false; });
        if (licensed.length === 0) {
            _ae(container, csRenderEmptyState('No licensed movies in your catalog. Browse the Content Market to expand your library.'));
        } else {
            var lTable = _ae(container, '<table style="width:100%; border-collapse:collapse; font-size:9pt; background:#fff; border:2px solid #555;">' +
                '<tr style="background:#555; color:white; text-transform:uppercase; letter-spacing:0.5px;"><th style="padding:8px; text-align:left;">Title</th><th>Score</th><th>Weekly Cost</th><th>Expires</th></tr></table>');
            licensed.forEach(function (c, idx) {
                var bg = (idx % 2 === 0) ? '#fff' : '#f4f4f4';
                var r = _ae(lTable, '<tr style="background:' + bg + '; border-bottom:1px solid #bdc3c7;"></tr>');
                _ae(r, '<td style="padding:8px; font-weight:bold; color:#2c3e50;">' + c.title + '</td>');
                _ae(r, '<td style="text-align:center;">' + csRenderScoreBadge(c.score) + '</td>');
                _ae(r, '<td style="text-align:center; color:#e74c3c; font-weight:bold;">-$' + UI.getShortNumberString(c.licenseCostWeekly || 0) + '</td>');
                _ae(r, '<td style="text-align:center;">' + (c.licenseWeeksRemaining || 0) + 'w</td>');
            });
        }
    }

    function csRenderGridDashboard(contentArea) {
        contentArea.empty();
        var g = store.data.gridService;
        if (!g || !g.isActive) {
            _ae(contentArea, csRenderSectionHeader('Launch "The Grid" Platform'));
            var lBox = _ae(contentArea, '<div style="background:#fff; padding:40px; box-shadow:0 1px 6px rgba(0,0,0,0.15); border-top:4px solid #f1c40f; text-align:center; border-radius:8px;"></div>');
            _ae(lBox, '<div style="font-size:12pt; color:#2c3e50; margin-bottom:20px;">Launch your own global streaming service to directly monetize your media productions and licensed content.</div>');
            _ae(lBox, '<div style="font-size:10pt; color:#7f8c8d; margin-bottom:25px;">Initial Setup Investment: <b>$25,000,000</b></div>');
            var launchBtn = _ae(lBox, '<div class="selectorButton orangeButton" style="margin:0 auto; padding:15px 30px; font-weight:bold; font-size:12pt; width:fit-content;">GO LIVE NOW</div>');
            launchBtn.click(function () {
                if (GameManager.company.cash < 25e6) return csNotify('Insufficient funds ($25M required).');
                Sound.click();
                GameManager.company.adjustCash(-25e6, 'Grid Launch');
                // Merge launch properties into the existing default object rather than replacing it,
                // so all fields set by csCreateDefaultGrid and csRepairGrid are preserved.
                var existing = store.data.gridService || csCreateDefaultGrid();
                existing.isActive = true;
                existing.launchWeek = Math.floor(GameManager.company.currentWeek);
                if (!existing.subscribers || existing.subscribers < 100000) existing.subscribers = 100000;
                if (!existing.pricePerMonth) existing.pricePerMonth = 9.99;
                if (!existing.monthlyMarketing) existing.monthlyMarketing = 50000;
                if (!Array.isArray(existing.contentLibrary)) existing.contentLibrary = [];
                store.data.gridService = existing;
                csRenderGridDashboard(contentArea);
            });
            return;
        }

        // Action Bar (Marketing & Price)
        var ctrlRow = _ae(contentArea, '<div style="display:flex; gap:15px; margin-bottom:20px; align-items:flex-end;"></div>');
        
        var priceCol = _ae(ctrlRow, '<div style="flex:1;"></div>');
        _ae(priceCol, '<div style="font-weight:bold; font-size:8pt; text-transform:uppercase; margin-bottom:4px; color:#555;">Subscription Price</div>');
        var pS = _ae(priceCol, '<select style="width:100% !important; font-size:11pt; padding:6px; font-weight:bold;"></select>');
        [4.99, 7.99, 9.99, 12.99, 14.99, 19.99].forEach(function (v) { pS.append('<option value="' + v + '" ' + (g.pricePerMonth === v ? 'selected' : '') + '>$' + v.toFixed(2) + ' / mo</option>'); });
        pS.change(function () { g.pricePerMonth = parseFloat($(this).val()); Sound.click(); csRenderGridDashboard(contentArea); });

        var markCol = _ae(ctrlRow, '<div style="flex:1;"></div>');
        _ae(markCol, '<div style="font-weight:bold; font-size:8pt; text-transform:uppercase; margin-bottom:4px; color:#555;">Monthly Marketing</div>');
        var mS = _ae(markCol, '<select style="width:100% !important; font-size:11pt; padding:6px; font-weight:bold;"></select>');
        [0, 50000, 250000, 1000000, 5000000].forEach(function (v) { mS.append('<option value="' + v + '" ' + (g.monthlyMarketing === v ? 'selected' : '') + '>$' + UI.getShortNumberString(v) + ' / mo</option>'); });
        mS.change(function () { g.monthlyMarketing = parseInt($(this).val()); g.marketingBudgetWeekly = Math.floor(g.monthlyMarketing / 4); Sound.click(); csRenderGridDashboard(contentArea); });

        // Metric Tiles (GDT Stats Style)
        var statsRow = _ae(contentArea, '<div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:20px;"></div>');
        
        function addTile(label, value, color) {
            var tile = _ae(statsRow, '<div style="flex:1; min-width:130px; background:#fff; box-shadow:0 1px 3px rgba(0,0,0,0.12); padding:12px; text-align:center; border-radius:6px;"></div>');
            _ae(tile, '<div style="font-size:7pt; font-weight:bold; color:#7f8c8d; text-transform:uppercase; letter-spacing:0.5px;">' + label + '</div>');
            _ae(tile, '<div style="font-size:12pt; font-weight:bold; color:' + (color || '#2c3e50') + '; margin-top:4px;">' + value + '</div>');
        }

        var subs = g.subscribers || 0;
        var rev = (subs * (g.pricePerMonth || 9.99)) / 4;
        var exp = (g.marketingBudgetWeekly || 0) + ( (g.licensedContent || []).length * 25000 );

        addTile('Subscribers', UI.getShortNumberString(subs), '#2980b9');
        addTile('Est. Revenue', '+$' + UI.getShortNumberString(rev), '#27ae60');
        addTile('Est. Expenses', '-$' + UI.getShortNumberString(exp), '#e74c3c');
        addTile('Net Profit', '$' + UI.getShortNumberString(rev - exp), (rev >= exp ? '#27ae60' : '#e74c3c'));

        // Leaderboard (Simple Table)
        _ae(contentArea, csRenderSectionHeader('Market Share Leaderboard'));
        var lbTable = _ae(contentArea, '<table style="width:100%; border-collapse:collapse; font-size:9pt; background:#fff; border:1px solid #bdc3c7; border-radius:6px; overflow:hidden;">' +
            '<tr style="background:#34495e; color:white; text-transform:uppercase;"><th style="padding:10px; text-align:left;">Service</th><th>Subscribers</th><th>Market Share</th></tr></table>');
        
        var competitors = [
            { name: "The Grid", subs: subs, color: '#d35400' },
            { name: "MyFlix", subs: 50000000, color: '#e74c3c' },
            { name: "Zon Prime", subs: 42000000, color: '#3498db' },
            { name: "HuluWho", subs: 28000000, color: '#27ae60' }
        ].sort(function(a,b){ return b.subs - a.subs; });
        
        var totalSubs = competitors.reduce(function(a,c){ return a + c.subs; }, 0);
        competitors.forEach(function(c, idx) {
            var bg = (idx % 2 === 0) ? '#fff' : '#f4f4f4';
            var share = totalSubs > 0 ? ((c.subs / totalSubs) * 100).toFixed(1) : "0.0";
            var r = _ae(lbTable, '<tr style="background:' + bg + '; border-bottom:1px solid #bdc3c7;"></tr>');
            _ae(r, '<td style="padding:8px; font-weight:bold;"><span style="display:inline-block; width:10px; height:10px; background:'+c.color+'; margin-right:8px;"></span>' + c.name + (c.name === "The Grid" ? ' (YOU)' : '') + '</td>');
            _ae(r, '<td style="text-align:center;">' + UI.getShortNumberString(c.subs || 0) + '</td>');
            _ae(r, '<td style="text-align:center;">' + share + '%</td>');
        });
    }

    function buildMediaStudioCard(ms) {
        var item = _buildPieCard(ms, 'pie_media_' + ms.id);
        var detailsContainer = item.find('.pie-details-container');
        
        var headerRow = $('<div style="display: flex; justify-content: space-between; align-items: baseline; gap: 10px;"></div>')
            .append('<h3 style="margin: 0; font-size: 14pt; color: #2c3e50; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; flex: 1; font-weight: bold;">' + ms.name + '</h3>');
        detailsContainer.append(headerRow);
        detailsContainer.append('<div style="font-size: 11pt; margin: 3px 0;">Val: <strong style="color: #27ae60;">$' + UI.getShortNumberString(ms.valuation) + '</strong> | Owned: <b>' + (ms.sharesOwned || 0) + '%</b></div>');
        
        if (ms.currentProject) {
            detailsContainer.append('<div style="font-size:8pt; color:#7f8c8d; margin-top:2px;">Currently: <i>' + ms.currentProject.title + '</i> (' + Math.ceil(ms.currentProject.weeksRemaining) + 'w)</div>');
        }

        var actions = _ae(detailsContainer, '<div style="display:flex; gap:4px; margin-top:10px;"></div>');
        var tradeRow = actions; 
        var cost = Math.floor(ms.valuation * 0.11), yield = Math.floor(ms.valuation * 0.09);
        
        var buyBtn = _ae(tradeRow, '<div class="selectorButton greenButton" style="flex:1; padding:4px 0; font-size:8pt; text-align:center;">BUY 10%<br>-$'+UI.getShortNumberString(cost)+'</div>');
        buyBtn.click(function(){ 
            if (GameManager.company.cash < cost) return csNotify('Need $'+UI.getShortNumberString(cost));
            Sound.click(); GameManager.company.adjustCash(-cost, 'Share Buy: ' + ms.name);
            ms.sharesOwned = (ms.sharesOwned || 0) + 10; routeModMenu("film_subs", "media");
        });

        var sellBtn = _ae(tradeRow, '<div class="selectorButton deleteButton" style="flex:1; padding:4px 0; font-size:8pt; text-align:center;">SELL 10%<br>+$'+UI.getShortNumberString(yield)+'</div>');
        sellBtn.click(function(){
            if ((ms.sharesOwned || 0) < 10) return;
            Sound.click(); GameManager.company.adjustCash(yield, 'Share Sell: ' + ms.name);
            ms.sharesOwned -= 10; routeModMenu("film_subs", "media");
        });

        var isLicensed = (store.data.activeCatalogueDeals || []).some(function (d) { return d.studioId === ms.id && GameManager.company.currentWeek < d.endWeek; });
        var hasInbound = (store.data.pendingInboundDeal && store.data.pendingInboundDeal.studioId === ms.id);
        
        var nBtn = _ae(detailsContainer, '<div class="selectorButton ' + (hasInbound ? 'orangeButton' : 'whiteBoardButton') + '" style="margin-top:6px; padding:6px 0; font-size:9pt; font-weight:bold; text-align:center; width:100%; box-sizing:border-box;">' + (isLicensed ? 'CATALOGUE ACTIVE' : (hasInbound ? 'REVIEW OFFER' : 'NEGOTIATE')) + '</div>');
        nBtn.click(function(){
            if (isLicensed) return;
            Sound.click(); store.data.activeCatalogueNegotiation = ms.id; routeModMenu("catalogue_negotiation", "media"); 
        });

        return item;
    }

    function csRenderFilmSubsTab(c) {
        c.empty(); 
        var ms = store.data.movieStudios || []; 
        _ae(c, csRenderSectionHeader('Film Subsidiaries'));
        if (!ms.length) return _ae(c, csRenderEmptyState('No movie studios discovered yet. Focus on media production to attract industry talent.'));
        
        var grid = _ae(c, '<div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;"></div>');
        if (typeof Game === 'undefined' || !Game.isModern) grid.css('display', 'block'); // Fallback for old layouts

        ms.forEach(function (m) { 
            var wrapper = _ae(grid, '<div></div>');
            wrapper.append(buildMediaStudioCard(m));
        });
    }

    function csRenderLicensingReview(c) {
        var off = (store.data.aiLicensingOffers || []).concat(store.data.activeLicensingOffer ? [store.data.activeLicensingOffer] : []);
        _ae(c, '<h2 style="color:#d35400;">License Offers</h2><div class="selectorButton" style="margin-bottom:15px;">&lt; Back</div>').click(function () { routeModMenu("franchises", "media") });
        if (!off.length) return _ae(c, '<p>No offers.</p>');
        off.forEach(function (o) {
            var r = _ae(c, '<div style="background:white;padding:15px;margin-bottom:10px;border:1px solid #ccc;"></div>');
            _ae(r, '<b>' + o.studioName + '</b>: ' + o.franchiseName + ' (' + o.entryType + ')<br>Fee: $' + UI.getShortNumberString(o.licenseFee));
            _ae(r, '<div class="selectorButton greenButton">Accept</div>').click(function () { csHandleAILicensingResponse(o, true); routeModMenu("film_subs", "media"); });
        });
    }

    function csRenderCatalogueNegotiation(container) {
        var msId = store.data.activeCatalogueNegotiation, ms = store.data.movieStudios.filter(function(x){return x.id===msId;})[0];
        if (!ms) { routeModMenu("film_subs", "media"); return; }

        container.empty();
        var h = _ae(container, '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;"></div>');
        _ae(h, '<div style="font-size:14pt; font-weight:bold; color:#2c3e50;">' + ms.name + ' Catalogue</div>');
        _ae(h, '<div class="selectorButton" style="padding:5px 15px;">&lt; BACK</div>').click(function(){ routeModMenu("film_subs", "media"); });

        var main = _ae(container, '<div style="display:flex; gap:20px;"></div>');
        
        // Left Column: Studio Info
        var left = _ae(main, '<div style="flex:1; background:#fff; box-shadow:0 1px 4px rgba(0,0,0,0.15); padding:15px; border-radius:6px;"></div>');
        _ae(left, csRenderSectionHeader('Studio Reputation'));
        var stars = ""; for(var i=0; i<5; i++) stars += (i < (ms.reputation || 1) ? '★' : '☆');
        _ae(left, '<div style="font-size:24pt; color:#f39c12; text-align:center; margin:10px 0;">' + stars + '</div>');
        _ae(left, '<div style="font-size:10pt; color:#555; text-align:center;">Valuation: <b>$' + UI.getShortNumberString(ms.valuation) + '</b></div>');
        
        var grid = store.data.gridService;
        var subPower = Math.min(1.0, (grid.subscribers || 0) / 10000000);
        _ae(left, csRenderSectionHeader('Your Grid Reach'));
        _ae(left, '<div style="text-align:center; margin-top:10px;">' + csRenderMiniBar(subPower*100, '#2980b9', 150) + '</div>');
        _ae(left, '<div style="font-size:8pt; color:#7f8c8d; text-align:center; margin-top:4px;">' + UI.getShortNumberString(grid.subscribers) + ' Subscribers</div>');

        // Right Column: Negotiation
        var right = _ae(main, '<div style="flex:1.5;"></div>');
        var currentWeek = Math.floor(GameManager.company.currentWeek);
        var hasInbound = (store.data.pendingInboundDeal && store.data.pendingInboundDeal.studioId === ms.id && currentWeek <= store.data.pendingInboundDeal.expires);

        if (hasInbound) {
            var inBox = _ae(right, '<div style="background:#fffbf0; border:2px solid #f1c40f; padding:20px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);"></div>');
            _ae(inBox, '<div style="font-weight:bold; color:#d35400; font-size:12pt; margin-bottom:10px;">Inbound Offer Received</div>');
            _ae(inBox, '<div style="font-size:11pt; color:#2c3e50; line-height:1.4;">They are offering their entire library for a 104-week exclusive license on The Grid.</div>');
            var price = store.data.pendingInboundDeal.price;
            _ae(inBox, '<div style="font-size:18pt; font-weight:bold; color:#27ae60; text-align:center; margin:20px 0;">Flat Fee: $' + UI.getShortNumberString(price) + '</div>');
            
            var aBtn = _ae(inBox, '<div class="selectorButton greenButton" style="width:100%; padding:12px 0; text-align:center; font-weight:bold; font-size:12pt;">ACCEPT TERMS</div>');
            aBtn.click(function(){
                if (GameManager.company.cash < price) return csNotify('Insufficient funds.');
                Sound.click(); GameManager.company.adjustCash(-price, 'Catalogue Deal: ' + ms.name);
                store.data.activeCatalogueDeals = store.data.activeCatalogueDeals || [];
                var catMaintFee = Math.floor(ms.valuation * 0.005);
                store.data.activeCatalogueDeals.push({ studioId: ms.id, studioName: ms.name, endWeek: currentWeek + 104, weeklyMaintenance: catMaintFee });
                store.data.activeCatalogueNegotiation = null; store.data.pendingInboundDeal = null;
                csAutoRouteMediaCatalog(ms); routeModMenu("film_subs", "media"); 
            });
        } else {
            var outBox = _ae(right, '<div style="background:#f8f9fa; box-shadow:0 1px 4px rgba(0,0,0,0.15); padding:20px; border-radius:8px;"></div>');
            _ae(outBox, csRenderSectionHeader('Propose Catalogue Bid'));
            
            var baseBenefit = ms.valuation * 0.12, repM = 1.0 + ((ms.reputation||1)*0.15), reachM = 1.0 - (subPower*0.4);
            var minBid = Math.floor(baseBenefit * repM * reachM), maxBid = Math.floor(minBid * 1.6);
            
            _ae(outBox, '<div style="font-size:10pt; color:#2c3e50; margin-bottom:15px; line-height:1.4;">Secure their vault for 104 weeks. Based on market conditions, they expect a bid between:</div>');
            _ae(outBox, '<div style="text-align:center; font-size:12pt; font-weight:bold; color:#34495e; margin-bottom:15px;">$' + UI.getShortNumberString(minBid) + ' - $' + UI.getShortNumberString(maxBid) + '</div>');
            
            var bidInp = _ae(outBox, '<input type="number" value="' + minBid + '" style="width:100% !important; font-size:16pt; padding:10px; border:1px solid #bdc3c7; margin-bottom:15px; border-radius:4px;">');
            var chanceDisp = _ae(outBox, '<div style="font-weight:bold; text-align:center; margin-bottom:15px; font-size:11pt;">Acceptance Chance: <span style="color:#2980b9;">50%</span></div>');
            
            var updateChance = function(){
                var val = parseInt(bidInp.val()) || 0, ratio = val/minBid, c = 0;
                if (ratio <= 0.6) c = 0; else if (ratio >= 1.6) c = 100; else c = Math.floor((ratio - 0.6) * 100);
                chanceDisp.find('span').text(c + '%').css('color', c > 70 ? '#27ae60' : (c > 30 ? '#f39c12' : '#e74c3c'));
            };
            bidInp.on('input', updateChance); updateChance();

            var bBtn = _ae(outBox, '<div class="selectorButton orangeButton" style="width:100%; padding:14px 0; text-align:center; font-weight:bold; font-size:12pt;">SUBMIT OFFER</div>');
            bBtn.click(function(){
                var val = parseInt(bidInp.val()) || 0;
                if (GameManager.company.cash < val) return csNotify('Insufficient cash for this bid.');
                Sound.click(); var ratio = val/minBid, c = (ratio <= 0.6) ? 0 : (ratio >= 1.6 ? 1 : ratio - 0.6);
                if (Math.random() <= c) {
                    GameManager.company.adjustCash(-val, 'Catalogue Bid: ' + ms.name);
                    store.data.activeCatalogueDeals = store.data.activeCatalogueDeals || [];
                    var catMaintFee = Math.floor(ms.valuation * 0.005);
                    store.data.activeCatalogueDeals.push({ studioId: ms.id, studioName: ms.name, endWeek: currentWeek + 104, weeklyMaintenance: catMaintFee });
                    _n('Deal Secured!', ms.name + ' movies are now on Grid.');
                    csAutoRouteMediaCatalog(ms); routeModMenu("film_subs", "media"); 
                } else {
                    csNotify('Offer Rejected! Studio is offended.'); 
                    ms.negotiationCooldown = currentWeek + 4; routeModMenu("film_subs", "media");
                }
            });
        }
    }

    function csGenerateMovieTitle() {
        var p = ['Operation', 'Dark', 'Secret', 'Project', 'Last', 'New', 'Shadow', 'Iron'], m = ['Eagle', 'Star', 'Moon', 'Shadow', 'Knight', 'Rise', 'Fall'], s = ['Omega', 'Zero', 'Alpha', 'One', 'Rebirth'];
        return p[~~(Math.random() * p.length)] + ' ' + m[~~(Math.random() * m.length)] + ' ' + (Math.random() > .5 ? s[~~(Math.random() * s.length)] : '');
    }

    function csSeedFilmMarket() {
        var studios = ["Global Cine", "Indie Pixels", "Mega-Media", "FilmStar", "Visionary Films", "Art House", "Blockbuster Inc", "CineMax"];
        var seeds = [];
        for (var i = 0; i < 25; i++) {
            seeds.push({
                id: "SEED_" + Math.floor(Math.random() * 1000000),
                title: csGenerateMovieTitle(),
                platformIds: ["movie"],
                score: Math.floor(Math.random() * 5) + 5, // 5 to 10
                studioName: studios[Math.floor(Math.random() * studios.length)]
            });
        }
        return seeds;
    }

    function csRenderFilmMarketTab(container) {
        container.empty();
        _ae(container, csRenderSectionHeader('Global Film Marketplace'));

        if (!store.data.gridService || !store.data.gridService.isActive) {
            _ae(container, csRenderEmptyState('You must launch "The Grid" platform before acquiring distribution licenses.'));
            return;
        }

        var films = (store.data.releaseHistory || []).filter(function (r) { return r.platformIds && r.platformIds.indexOf("movie") !== -1; });
        if (films.length === 0) return _ae(container, csRenderEmptyState('No past releases available for license. Check back as other studios release projects.'));

        var grid = _ae(container, '<div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;"></div>');
        
        films.forEach(function (f) {
            var card = _ae(grid, '<div style="background:#fff; border:2px solid #bdc3c7; border-left: 4px solid #555; padding:12px; display:flex; justify-content:space-between; align-items:center;"></div>');
            var info = _ae(card, '<div></div>');
            
            // Studio color dot
            var hash = 0; for(var i=0; i<f.studioName.length; i++) hash = f.studioName.charCodeAt(i) + ((hash << 5) - hash);
            var dotColor = 'hsl(' + (Math.abs(hash) % 360) + ', 70%, 50%)';
            
            _ae(info, '<div style="font-weight:bold; font-size:11pt; color:#2c3e50;">' + f.title + '</div>');
            _ae(info, '<div style="font-size:9pt; color:#7f8c8d; display:flex; align-items:center; gap:6px; margin-top:4px;"><span style="width:8px; height:8px; border-radius:50%; background:'+dotColor+';"></span>' + f.studioName + ' | ' + csRenderScoreBadge(f.score) + '</div>');
            
            var cost = 1000000 + (f.score * 500000);
            var mBtn = _ae(card, '<div class="selectorButton greenButton" style="padding:10px 16px; font-weight:bold;">LICENSE<br><span style="font-size:8pt; font-weight:normal;">$'+UI.getShortNumberString(cost)+'</span></div>');
            mBtn.click(function () {
                if (GameManager.company.cash < cost) return csNotify('Insufficient funds.');
                Sound.click(); GameManager.company.adjustCash(-cost, 'License: ' + f.title);
                csLicenseExternalToGrid(f, 10000 + (f.score * 5000), 52);
                
                var idx = store.data.releaseHistory.indexOf(f);
                if (idx > -1) store.data.releaseHistory.splice(idx, 1);
                csRenderFilmMarketTab(container);
            });
        });
    }

