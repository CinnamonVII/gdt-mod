    function renderMediaTab(container) {
        var subTab = 'active';

        function refresh() {
            container.empty();
            
            // Sub-tab bar: Horizontal pill-row
            var h = _ae(container, '<div style="display:flex; margin-bottom:15px; border:1px solid #bdc3c7; background:#f4f4f4; border-radius:6px; overflow:hidden;"></div>');
            ['active', 'produce', 'archive', 'grid'].forEach(function (t) {
                var isActive = (subTab === t);
                var b = _ae(h, '<div style="flex:1; text-align:center; padding:10px 0; font-size:9pt; font-weight:bold; text-transform:uppercase; cursor:pointer; border-right:1px solid #bdc3c7; background:' + (isActive ? '#d35400' : 'transparent') + '; color:' + (isActive ? 'white' : '#555') + ';">' + t + '</div>');
                if (t === 'grid') b.css('border-right', 'none');
                b.click(function () { subTab = t; Sound.click(); refresh(); });
            });

            if (subTab === 'active') {
                var ac = (store.data.mediaProjects || []).filter(function (p) { return p.status === 'inProduction' || p.status === 'releasing' });
                var cur = Math.floor(GameManager.company.currentWeek);

                if (!ac.length) {
                    _ae(container, csRenderEmptyState('No active projects. Go to "PRODUCE" to greenlight a new production.'));
                    return;
                }

                ac.forEach(function (p) {
                    var tI = csGetMediaTypeInfo(p.type || "movie");
                    var card = _ae(container, '<div style="background:white; box-shadow:0 1px 4px rgba(0,0,0,0.15); padding:16px; margin-bottom:12px; display:flex; align-items:center; border-radius:6px;"></div>');
                    _ae(card, '<div style="width:36px; height:36px; background:' + tI.c + '; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; color:white; font-size:14pt; flex-shrink:0; box-shadow:0 1px 3px rgba(0,0,0,0.2);">' + tI.i + '</div>');

                    var mainInfo = _ae(card, '<div style="flex:1; min-width:0; display:flex; flex-direction:column; margin-left:12px;"></div>');
                    _ae(mainInfo, '<div style="font-size:11pt; font-weight:bold; color:#2c3e50; text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">' + p.title + '</div>');
                    _ae(mainInfo, '<div style="font-size:8pt; font-weight:bold; color:' + tI.c + '; text-transform:uppercase; letter-spacing:0.5px;">' + tI.l + '</div>');
                    if (p.franchiseId) {
                        var fr = getFranchiseById(p.franchiseId);
                        if (fr) _ae(mainInfo, '<div style="font-size:8pt; color:#7f8c8d; font-style:italic;">' + fr.name + ' Franchise</div>');
                    }

                    // PROGRESS BAR SECTION
                    var progressSection = _ae(card, '<div style="flex:1.2; display:flex; flex-direction:column;"></div>');
                    var pct = 0, label = "";
                    if (p.status === 'inProduction') {
                        pct = Math.round(((p.totalWeeks - p.weeksRemaining) / p.totalWeeks) * 100) || 5;
                        label = Math.ceil(p.weeksRemaining) + " WEEKS LEFT";
                    } else {
                        pct = Math.round((p.currentEpisode / p.totalEpisodes) * 100) || 10;
                        var unitName = (p.type === 'comicBook' ? 'ISSUE' : 'EPISODE');
                        label = unitName + " " + p.currentEpisode + " / " + p.totalEpisodes;
                    }

                    _ae(progressSection, '<div style="font-size:7pt; color:#444; margin-bottom:2px; font-weight:bold; text-transform:uppercase;">' + label + '</div>');
                    _ae(progressSection, csRenderMiniBar(pct, tI.c, '100%'));

                    // ACTIONS
                    var actionGroup = _ae(card, '<div style="display:flex; flex-direction:column; gap:4px; min-width:100px; margin-left:12px;"></div>');
                    if (p.status === 'releasing' && (p.currentEpisode || 0) < (p.totalEpisodes || 1)) {
                        var airLabel = (p.type === 'comicBook') ? "PUBLISH NEXT" : "RELEASE NEXT";
                        var airBtn = _ae(actionGroup, '<div class="selectorButton greenButton" style="padding:5px 0; font-weight:bold; font-size:9pt; text-align:center;">' + airLabel + '</div>');
                        airBtn.click(function () { 
                            p.nextReleaseWeek = cur - 1; 
                            csNotify(p.title + ": Forced next release.");
                            Sound.click(); 
                            refresh(); 
                        });
                    }

                    var cancelBtn = _ae(actionGroup, '<div class="selectorButton deleteButton" style="padding:5px 0; font-size:9pt; font-weight:bold; text-align:center;">CANCEL</div>');
                    cancelBtn.click(function () { 
                        if (confirm('Cancel project "' + p.title + '"?')) { 
                            p.status = 'cancelled'; 
                            Sound.click(); 
                            refresh(); 
                        } 
                    });
                });
            } else if (subTab === 'produce') {
                var f = _ae(container, '<div style="background:#eee; padding:20px; border: 2px solid #555;"></div>');
                _ae(f, csRenderSectionHeader('Greenlight New Production'));
                
                var grid = _ae(f, '<div style="display:flex; flex-wrap:wrap; gap:15px; margin-bottom:20px;"></div>');
                
                var typeCol = _ae(grid, '<div style="flex:1; min-width:200px;"></div>');
                _ae(typeCol, '<div style="font-weight:bold; font-size:8pt; text-transform:uppercase; margin-bottom:4px;">Media Type</div>');
                var tS = _ae(typeCol, '<select style="width:100% !important;"></select>'); 
                var ts = [{ id: 'movie', l: 'Film', m: 1e6 }, { id: 'tvSeries', l: 'TV Series', m: 5e5 }, { id: 'animatedShow', l: 'Anim. Show', m: 3e5 }, { id: 'soundtrack', l: 'Music/OST', m: 5e4 }, { id: 'merchandise', l: 'Merch', m: 2.5e5 }, { id: 'comicBook', l: 'Comic Book', m: 2.5e4 }];
                ts.forEach(function (t) { tS.append('<option value="' + t.id + '">' + t.l + ' (Min: $' + UI.getShortNumberString(t.m) + ')</option>') });
                
                var franCol = _ae(grid, '<div style="flex:1; min-width:200px;"></div>');
                _ae(franCol, '<div style="font-weight:bold; font-size:8pt; text-transform:uppercase; margin-bottom:4px;">Target Franchise</div>');
                var fS = _ae(franCol, '<select style="width:100% !important;"><option value="">Original IP</option></select>'); 
                getPlayerFranchises().forEach(function (x) { fS.append('<option value="' + x.id + '">' + x.name + '</option>') });
                
                var budCol = _ae(grid, '<div style="flex:1; min-width:200px;"></div>');
                _ae(budCol, '<div style="font-weight:bold; font-size:8pt; text-transform:uppercase; margin-bottom:4px;">Budget ($)</div>');
                var bI = _ae(budCol, '<input type="number" value="1000000" style="width:100% !important;">');

                var estBox = _ae(f, '<div style="font-size:10pt; color:#555; text-align:center; margin-bottom:15px; font-weight:bold;">Estimated Duration: <span id="cs_est_dur">~20 weeks</span></div>');
                var updateEst = function() {
                    var b = parseInt(bI.val()) || 0;
                    var w = Math.min(300, Math.floor(Math.pow(b / 1e5, 0.75)) + 8);
                    f.find('#cs_est_dur').text('~' + w + ' weeks');
                };
                bI.on('input', updateEst);
                updateEst();
                
                var gBtn = _ae(f, '<div class="selectorButton orangeButton" style="width:100%; text-align:center; padding:12px 0; font-weight:bold; font-size:11pt;">Greenlight Project</div>');
                gBtn.click(function () {
                    var b = parseInt(bI.val()), t = tS.val(), m = (ts.filter(function (x) { return x.id === t })[0] || {}).m || 0; 
                    if (GameManager.company.cash < b || b < m) return csNotify('Check funds/minimum budget.');
                    var w = Math.min(300, Math.floor(Math.pow(b / 1e5, 0.75)) + 8), fr = getFranchiseById(fS.val());
                    var p = { id: 'MEDIA_' + Date.now(), type: t, franchiseId: fS.val() || null, title: (fr ? fr.name : 'New') + ' ' + t.toUpperCase(), budget: b, weeksRemaining: w, totalWeeks: w, status: 'inProduction', totalEpisodes: 1, totalRevenue:0, weeklyRevenue:0, currentEpisode:0 };
                    store.data.mediaProjects.push(p); 
                    GameManager.company.adjustCash(-b, 'Media: ' + p.title); 
                    subTab = 'active'; Sound.click(); refresh();
                });
            } else if (subTab === 'archive') {
                _ae(container, csRenderSectionHeader('Production Archive')); 
                var rel = (store.data.mediaProjects || []).filter(function (p) { return p.status === 'released' || p.status === 'cancelled' });
                if (!rel.length) {
                    _ae(container, csRenderEmptyState('No past productions in the archives.'));
                    return;
                }
                
                var t = _ae(container, '<table style="width:100%; font-size:9pt; border-collapse:collapse; background:#fff; border:1px solid #bdc3c7; border-radius:6px; overflow:hidden;">' +
                    '<tr style="background:#34495e; color:white; text-transform:uppercase; letter-spacing:0.5px;"><th style="padding:10px; text-align:left;">Title</th><th>Type</th><th>Score</th><th>ROI</th><th>Status</th></tr></table>');
                rel.sort(function(a,b){ return (b.releaseWeek || 0) - (a.releaseWeek || 0); });
                rel.forEach(function (p, idx) {
                    var roi = p.budget > 0 ? Math.floor(((p.totalRevenue - p.budget) / p.budget) * 100) : 0;
                    var bg = (idx % 2 === 0) ? '#fff' : '#f4f4f4';
                    var r = _ae(t, '<tr style="background:' + bg + '; border-bottom:1px solid #bdc3c7;"></tr>');
                    _ae(r, '<td style="padding:10px; font-weight:bold; color:#2c3e50;">' + p.title + '</td>');
                    _ae(r, '<td style="text-align:center; text-transform:uppercase; font-size:8pt;">' + p.type + '</td>');
                    _ae(r, '<td style="text-align:center;">' + csRenderScoreBadge(p.score) + '</td>');
                    _ae(r, '<td style="text-align:center; color:' + (roi >= 0 ? '#27ae60' : '#e74c3c') + '; font-weight:bold;">' + (roi > 0 ? '+' : '') + roi + '%</td>');
                    _ae(r, '<td style="text-align:center; font-size:8pt; text-transform:uppercase; color:#7f8c8d;">' + p.status + '</td>');
                });
            } else if (subTab === 'grid') csRenderGridTab(container);
        }
        refresh();
    }

    function renderSettingsTab(container) {
        container.empty();
        _ae(container, csRenderSectionHeader('Concurrent Studios Settings'));

        // Feature Overload Toggle
        var ovRow = _ae(container, '<div style="display:flex; align-items:center; background:#fff; box-shadow: 0 1px 4px rgba(0,0,0,0.15); padding:15px; margin-bottom:15px; cursor:pointer; border-radius:6px;"></div>');
        var ovChk = _ae(ovRow, '<input type="checkbox" style="width:20px; height:20px; margin-right:15px; pointer-events:none;">');
        ovChk.prop('checked', !!store.data.disableOverloadMalus);
        
        var ovTxt = _ae(ovRow, '<div style="flex:1;"></div>');
        _ae(ovTxt, '<div style="font-weight:bold; color:#2c3e50;">Disable Engine Overload Penalty</div>');
        _ae(ovTxt, '<div style="font-size:9pt; color:#7f8c8d;">Removes the score penalty for excessive features and auto-cleans 80% of project bugs.</div>');
        
        ovRow.click(function () {
            Sound.click(); store.data.disableOverloadMalus = !store.data.disableOverloadMalus;
            ovChk.prop('checked', store.data.disableOverloadMalus);
        });

        // Baseline Recovery (Admin Tool)
        var hBox = _ae(container, '<div style="background:#fff; box-shadow:0 1px 4px rgba(0,0,0,0.15); padding:15px; border-radius:6px;"></div>');
        _ae(hBox, csRenderSectionHeader('Internal Baseline Calibration'));
        _ae(hBox, '<div style="font-size:9pt; color:#7f8c8d; margin-bottom:12px;">Manually calibrate Design/Tech baselines to fix score inflation/stagnation.</div>');
        
        var hGrid = _ae(hBox, '<div style="display:flex; gap:10px; margin-bottom:10px;"></div>');
        var dInp = _ae(hGrid, '<input type="number" value="500" style="flex:1; padding:8px; border:1px solid #bdc3c7; font-weight:bold; border-radius:4px;">');
        var tInp = _ae(hGrid, '<input type="number" value="500" style="flex:1; padding:8px; border:1px solid #bdc3c7; font-weight:bold; border-radius:4px;">');
        
        var hBtn = _ae(hBox, '<div class="selectorButton orangeButton" style="width:100%; padding:10px 0; text-align:center; font-weight:bold;">RECALIBRATE NOW</div>');
        hBtn.click(function () {
            var d = parseInt(dInp.val()), t = parseInt(tInp.val());
            if (isNaN(d) || isNaN(t)) return;
            Sound.click();
            GameManager.company.designBaseline = d; GameManager.company.technologyBaseline = t;
            csNotify('Baselines reset. Future projects will use D:'+d+' T:'+t+' as floor.');
        });
    }

