    // ========== 00_polyfills.js ==========
(function () {
    var polyfillFind = function(predicate) {
        if (this == null) throw new TypeError('"this" is null or not defined');
        var o = Object(this), len = o.length >>> 0;
        if (typeof predicate !== 'function') throw new TypeError('predicate must be a function');
        var thisArg = arguments[1], k = 0;
        while (k < len) {
            var kValue = o[k];
            if (predicate.call(thisArg, kValue, k, o)) return kValue;
            k++;
        }
        return undefined;
    };
    var polyfillFindIndex = function(predicate) {
        if (this == null) throw new TypeError('"this" is null or not defined');
        var o = Object(this), len = o.length >>> 0;
        if (typeof predicate !== 'function') throw new TypeError('predicate must be a function');
        var thisArg = arguments[1], k = 0;
        while (k < len) {
            var kValue = o[k];
            if (predicate.call(thisArg, kValue, k, o)) return k;
            k++;
        }
        return -1;
    };
    var polyfillIncludes = function(searchElement, fromIndex) {
        if (this == null) throw new TypeError('"this" is null or not defined');
        var o = Object(this), len = o.length >>> 0;
        if (len === 0) return false;
        var n = fromIndex | 0, k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        while (k < len) {
            if (o[k] === searchElement || (typeof o[k] === 'number' && typeof searchElement === 'number' && isNaN(o[k]) && isNaN(searchElement))) return true;
            k++;
        }
        return false;
    };

    function safeDefine(proto, name, fn) {
        if (!proto) return;
        try {
            var desc = Object.getOwnPropertyDescriptor(proto, name);
            if (!desc || desc.enumerable || !desc.value) {
                Object.defineProperty(proto, name, { value: fn, configurable: true, writable: true, enumerable: false });
            }
        } catch(e) {}
    }

    function applyPolyfills(proto) {
        safeDefine(proto, 'find', polyfillFind);
        safeDefine(proto, 'findIndex', polyfillFindIndex);
        safeDefine(proto, 'includes', polyfillIncludes);
    }

    if (typeof window !== 'undefined' && window.Array) applyPolyfills(window.Array.prototype);
    if (typeof global !== 'undefined' && global.Array) applyPolyfills(global.Array.prototype);
    if (typeof Array !== 'undefined') applyPolyfills(Array.prototype);
    
    if (typeof GDT !== 'undefined' && GDT.on && GDT.eventKeys) {
        GDT.on(GDT.eventKeys.ui.contextMenuShowing, function(e) {
            if (e && e.items && e.items.constructor) applyPolyfills(e.items.constructor.prototype);
        });
    }



    // ========== 01_styles.js ==========
    (function injectModStyles() {
        if (document.getElementById('cs-mod-styles')) return;
        var css = document.createElement('style');
        css.id = 'cs-mod-styles';
        css.textContent =
            '.mod-franchise-icon{display:inline-block;color:#d35400;font-weight:bold;margin-right:5px;cursor:help;}' +
            '#modUI input,#modUI select,.simplemodal-data input,.simplemodal-data select{border:1px solid #bdc3c7 !important; border-radius:4px !important; color:black !important;}' +
            '#modUI input:focus,#modUI select:focus,.simplemodal-data input:focus,.simplemodal-data select:focus{border-color:#d35400 !important; outline:none !important; box-shadow:0 0 0 2px rgba(211,84,0,0.2) !important;}' +
            '.modal-content { border-radius: 8px !important; box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important; border:none !important; }' +
            '#modUI_container.simplemodal-container{display:flex !important;flex-direction:column !important;border:none !important;box-shadow:0 10px 25px rgba(0,0,0,0.3) !important;border-radius:8px !important;overflow:hidden !important;}' +
            '#modUI_container .simplemodal-data{flex:1 !important;display:flex !important;flex-direction:column !important;overflow:hidden !important;min-height:0 !important;background:#f8f9fa !important;}' +
            '#modUI_content{scroll-behavior:auto !important;}' +
            '.fran-tier-1{background:#95a5a6;}.fran-tier-2{background:#2980b9;}.fran-tier-3{background:#27ae60;}.fran-tier-4{background:#d35400;}.fran-tier-5{background:#f39c12;}' +
            '.fanbase-bar-track{background:#eee;border:none;height:10px;overflow:hidden;box-shadow:inset 0 1px 2px rgba(0,0,0,0.1);}.fanbase-bar-fill{height:100%;transition:width 0.4s ease;}' +
            '.entry-type-btn{display:inline-block;padding:8px 12px;margin:5px;background:#bdc3c7;color:#2c3e50;cursor:pointer;font-size:10pt;font-weight:bold;border:1px solid #aaa;}' +
            '.entry-type-btn:hover:not(.disabled){background:#d35400;color:white;}' +
            '.entry-type-btn.selected{background:#d35400;color:white;border:1px solid #000;}' +
            '.entry-type-btn.disabled{opacity:0.5;cursor:not-allowed;background:#eee;color:#999;}' +
            '.media-type-card{border:none;padding:10px 14px;margin-bottom:8px;cursor:pointer;background:#f8f9fa;box-shadow:0 1px 3px rgba(0,0,0,0.12);}' +
            '.media-type-card:hover{background:#fff;box-shadow:0 3px 6px rgba(0,0,0,0.15);}.media-type-card.selected{border-left:4px solid #d35400;background:#fff;}' +
            '.cs-progress-track{background:#e0e0e0;border:none;height:12px;overflow:hidden;margin-top:6px;box-shadow:inset 0 1px 3px rgba(0,0,0,0.1);}' +
            '.cs-progress-fill{height:100%;background:#d35400;transition:width .3s ease;}' +
            '.cs-card{background:#fff; box-shadow:0 1px 4px rgba(0,0,0,0.15); padding:16px; margin-bottom:12px; border-radius:6px;}' +
            '.cs-card-flex{display:flex; justify-content:space-between; align-items:center;}' +
            '.cs-card-header{display:flex; justify-content:space-between; align-items:baseline;}' +
            '.cs-text-title{font-weight:bold; font-size:11pt; color:#2c3e50;}' +
            '.cs-text-muted{color:#7f8c8d; font-size:9pt;}' +
            '.cs-text-bold{font-weight:bold;}' +
            '.cs-text-green{color:#27ae60;}' +
            '.cs-text-orange{color:#e67e22;}' +
            '.cs-text-red{color:#e74c3c;}' +
            '.cs-text-center{text-align:center;}' +
            '.cs-text-right{text-align:right;}' +
            '.cs-table{width:100%; border-collapse:collapse; font-size:9pt; background:#fff; border:1px solid #bdc3c7; margin-bottom:20px; border-radius:6px; overflow:hidden;}' +
            '.cs-table th{background:#34495e; color:white; text-transform:uppercase; letter-spacing:0.5px; padding:10px; text-align:left;}' +
            '.cs-table td{padding:8px;}' +
            '.cs-table tr{border-bottom:1px solid #bdc3c7;}' +
            '#modUI .selectorButton { white-space: normal !important; height: auto !important; min-height: 28px !important; width: fit-content !important; min-width: 100px; box-sizing: border-box; line-height: 1.2; }';
        document.head.appendChild(css);
    })();



    // ========== 02_helpers.js ==========
    function makeSelectSearchable($select) {
        if ($select.find('option').length <= 10) return;
        var placeholder = "Search " + ($select.find('option').length) + " items...";
        var $search = $('<input type="text" class="cs-select-search" placeholder="' + placeholder + '" style="width:100% !important; box-sizing:border-box; margin-bottom:5px !important; font-size:10pt !important; padding:5px !important; border:2px solid #555 !important;">');
        $search.insertBefore($select);
        $search.on('input', function () {
            var val = $(this).val().toLowerCase();
            var firstMatch = null;
            $select.find('option').each(function () {
                var text = $(this).text().toLowerCase();
                var show = text.indexOf(val) > -1;
                $(this).prop('disabled', !show).toggle(show);
                if (show && firstMatch === null) firstMatch = $(this).val();
            });
            if (firstMatch !== null) {
                $select.val(firstMatch);
                $select.trigger('change');
            }
        });
    }



    var store = GDT.getDataStore("concurrent_studios");
    var isShowingDraft = false;



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
                    showModMenu("market", "studios");
                }
            });
            e.items.push({
                label: "Media Options...",
                action: function () {
                    Sound.click();
                    showModMenu("film_subs", "media");
                }
            });
        }
    });

    var eventKeyReleased = (GDT.eventKeys && GDT.eventKeys.game) ? GDT.eventKeys.game.released : "gameReleased";
    GDT.on(eventKeyReleased, function (e) {
        var game = e.game;

        var mapping = store.data.playerProjectMapping ? store.data.playerProjectMapping[game.id] : null;

        var franchiseId = game.modFranchiseId || (mapping ? mapping.franchiseId : (store.data.activePlayerFranchiseProject ? store.data.activePlayerFranchiseProject.franchiseId : null));
        var entryType = game.modEntryType || (mapping ? mapping.entryType : (store.data.activePlayerFranchiseProject ? store.data.activePlayerFranchiseProject.entryType : null));
        var remakeTargetId = game.modRemakeTargetId || (mapping ? mapping.remakeTargetId : (store.data.activePlayerFranchiseProject ? store.data.activePlayerFranchiseProject.remakeTargetId : null));
        var bundledIds = game.modBundledIds || (mapping ? mapping.bundledIds : (store.data.activePlayerFranchiseProject ? store.data.activePlayerFranchiseProject.bundledIds : null));

        if (franchiseId) {
            var fran = getFranchiseById(franchiseId);
            if (fran) {
                var historyEntry = {
                    id: "FE_" + Date.now() + "_" + Math.floor(Math.random() * 100000),
                    gameId: game.id,
                    title: game.title,
                    score: game.score,
                    type: entryType || "sequel",
                    releaseWeek: Math.floor(GameManager.company.currentWeek),
                    revenue: game.totalSalesCash || 0,
                    remakeTargetId: remakeTargetId,
                    bundledIds: bundledIds
                };

                onFranchiseEntryComplete(fran, historyEntry, game.score, game.totalSalesCash || 0);
            }

            if (store.data.playerProjectMapping) delete store.data.playerProjectMapping[game.id];
            store.data.activePlayerFranchiseProject = null;
        }
    });

    function _d(o, k, v) { if (typeof o[k] === 'undefined') o[k] = v; }
    function _dn(o, k, v) { if (typeof o[k] === 'undefined' || isNaN(o[k]) || !isFinite(o[k])) o[k] = v; }
    function _da(o, k) { if (!Array.isArray(o[k])) o[k] = []; }
    function _ae(p, h) { return $(h).appendTo(p); }
    function _sm(t, h, b) {
        var id = 'cs_m_' + Date.now(), o = _ae($('body'), '<div id="' + id + '" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:9000;display:flex;justify-content:center;align-items:center;"></div>'), m = _ae(o, '<div class="windowBorder" style="background:#eee;border-radius:10px;padding:20px;width:450px;max-height:80%;display:flex;flex-direction:column;"></div>');
        _ae(m, '<h3 style="margin-top:0;color:#d35400;">' + t + '</h3>'); if (h) _ae(m, '<div style="font-size:10pt;color:#7f8c8d;margin-bottom:10px;">' + h + '</div>');
        var c = _ae(m, '<div style="flex:1;overflow-y:auto;border:1px solid #bdc3c7;background:#fff;margin-bottom:15px;border-radius:4px;"></div>');
        b(c, function () { o.remove() }); _ae(m, '<div class="selectorButton" style="text-align:center;padding:10px 0;">Close</div>').click(function () { o.remove() });
    }
    function _n(h, t) { GameManager.company.notifications.push(new Notification({ header: h, text: t, image: "" })); }
    function _nb(h, t, b, f) { GameManager.company.notifications.push(new Notification({ header: h, text: t, image: "", buttonText: b, onClick: f })); }


    // UI Helpers for GDT-Native aesthetic
    function csRenderScoreBadge(score) {
        var color = score >= 7 ? '#27ae60' : (score >= 5 ? '#e67e22' : '#e74c3c');
        return '<span style="background:' + color + '; color:white; padding:2px 6px; font-size:9pt; font-weight:bold; border-radius:0px;">' + (score || 0) + '/10</span>';
    }

    function csRenderMiniBar(pct, color, widthPx) {
        pct = Math.max(0, Math.min(100, pct || 0));
        color = color || '#d35400';
        widthPx = widthPx || 80;
        return '<div style="display:inline-block; width:' + widthPx + 'px; height:8px; background:#e0e0e0; vertical-align:middle; border-radius:4px; box-shadow:inset 0 1px 2px rgba(0,0,0,0.1); overflow:hidden;">' +
               '<div style="width:' + pct + '%; height:100%; background:' + color + ';"></div></div>';
    }

    function csRenderEmptyState(message) {
        return '<div style="color:#7f8c8d; font-style:italic; padding:25px; text-align:center; background:#f8f9fa; border:1px dashed #bdc3c7; border-radius:6px;">' + message + '</div>';
    }

    function csRenderSectionHeader(label) {
        return '<div style="background:#34495e; color:white; padding:8px 12px; font-weight:bold; text-transform:uppercase; letter-spacing:1px; font-size:9pt; margin-bottom:12px; border-radius:4px;">' + label + '</div>';
    }
    
    function csRenderSearchBar(placeholder, onInput) {
        var $input = $('<input type="text" class="cs-search-input" placeholder="' + placeholder + '" style="width:100% !important; box-sizing:border-box; margin-bottom:15px !important; font-size:10pt !important; padding:10px !important; border:1px solid #bdc3c7 !important; border-radius:6px !important; background:white !important; color:black !important;">');
        $input.on('input', function() { onInput($(this).val().toLowerCase()); });
        return $input;
    }

    function csRenderButton(label, type, styleExt) {
        var btnClass = "selectorButton";
        if (type === "primary" || type === "orange") btnClass += " orangeButton";
        else if (type === "danger" || type === "delete") btnClass += " deleteButton";
        else if (type === "secondary" || type === "white") btnClass += " whiteBoardButton";
        return '<div class="' + btnClass + '" style="' + (styleExt || '') + '">' + label + '</div>';
    }

    function csRenderCardFlex(leftHtml, rightHtml, extraStyles) {
        return '<div class="cs-card cs-card-flex" style="' + (extraStyles || '') + '">' +
               '<div style="flex:1;">' + leftHtml + '</div>' +
               '<div>' + rightHtml + '</div>' +
               '</div>';
    }


    // ========== 03_dataInit.js ==========
    function initData() {
        if (typeof GameManager !== 'undefined' && GameManager.company && GameManager.company.gameLog) {
            var gp = GameManager.company.gameLog.constructor.prototype;
            var polyfills = {
                'find': function(predicate) {
                    if (this == null) throw new TypeError('"this" is null or not defined');
                    var o = Object(this), len = o.length >>> 0;
                    if (typeof predicate !== 'function') throw new TypeError('predicate must be a function');
                    var thisArg = arguments[1], k = 0;
                    while (k < len) { var kValue = o[k]; if (predicate.call(thisArg, kValue, k, o)) return kValue; k++; }
                    return undefined;
                },
                'findIndex': function(predicate) {
                    if (this == null) throw new TypeError('"this" is null or not defined');
                    var o = Object(this), len = o.length >>> 0;
                    if (typeof predicate !== 'function') throw new TypeError('predicate must be a function');
                    var thisArg = arguments[1], k = 0;
                    while (k < len) { var kValue = o[k]; if (predicate.call(thisArg, kValue, k, o)) return k; k++; }
                    return -1;
                },
                'includes': function(searchElement, fromIndex) {
                    if (this == null) throw new TypeError('"this" is null or not defined');
                    var o = Object(this), len = o.length >>> 0;
                    if (len === 0) return false;
                    var n = fromIndex | 0, k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
                    while (k < len) { if (o[k] === searchElement || (typeof o[k] === 'number' && typeof searchElement === 'number' && isNaN(o[k]) && isNaN(searchElement))) return true; k++; }
                    return false;
                }
            };
            for (var fn in polyfills) {
                if (!gp[fn]) Object.defineProperty(gp, fn, { value: polyfills[fn], configurable: true, writable: true, enumerable: false });
                if (typeof global !== 'undefined' && global.Array && !global.Array.prototype[fn]) Object.defineProperty(global.Array.prototype, fn, { value: polyfills[fn], configurable: true, writable: true, enumerable: false });
            }
        }

        if (!store.data) store.data = {};
        _d(store.data, 'studios', []);
        _d(store.data, 'franchises', []);
        _d(store.data, 'dlcData', {});
        _d(store.data, 'activeAILicenses', []);
        _d(store.data, 'movieStudios', []);
        _d(store.data, 'activeCatalogueDeals', []);
        _d(store.data, 'mediaProjects', []);
        _d(store.data, 'theaterReleases', []);
        _d(store.data, 'streamingContracts', []);
        _d(store.data, 'activeCatalogueNegotiation', null);
        _d(store.data, 'lastCrossoverWeek', -100);

        [
            ['studios', generateInitialStudios()], ['playerProjectMapping', {}], ['dlcData', {}],
            ['globalSequelHistory', []], ['releaseHistory', []], ['publishingOffers', []],
            ['activeAIGames', []], ['coDevScrubMap', {}], ['activeCampaigns', []],
            ['franchises', []], ['mediaProjects', []], ['movieStudios', generateMovieStudios()],
            ['aiAcquisitionOffers', []], ['activeAILicenses', []], ['aiLicensingOffers', []],
            ['activeCatalogueDeals', []], ['theaterReleases', []], ['pendingDistribution', []]
        ].forEach(function (x) { _d(store.data, x[0], x[1]); });

        _d(store.data, 'lastCrossoverWeek', -100);
        _d(store.data, 'lastSpawnWeek', -1);
        _d(store.data, 'disableOverloadMalus', false);
        _dn(store.data, 'mediaMarketWeeksLeft', 0);
        _d(store.data, 'activePlayerFranchiseProject', null);
        _d(store.data, 'activeDistributionChoice', null);
        _d(store.data, 'activeLicensingOffer', null);
        _d(store.data, 'activeCatalogueNegotiation', null);

        store.data.mediaProjects.forEach(function (p) {
            _dn(p, 'currentEpisode', 0); _dn(p, 'totalEpisodes', 1); _dn(p, 'seasons', 1);
            _dn(p, 'seasonsProduced', 0); _dn(p, 'episodes', 12); _dn(p, 'weeksRemaining', 0);
            _dn(p, 'budget', 2.5e5); _dn(p, 'nextReleaseWeek', 0); _dn(p, 'decayRate', 0.92);
            _dn(p, 'weeklyRevenue', 0); _dn(p, 'totalRevenue', 0); _dn(p, 'score', 5);
            _d(p, 'distributionStatus', 'pending');
        });

        store.data.movieStudios.forEach(function (s) {
            _dn(s, 'valuation', Math.floor(Math.random() * 8e7 + 1e7));
            _dn(s, 'sharesOwned', 0); _d(s, 'isFounded', true);
            _d(s, 'staff', { design: 15, tech: 15, speed: 15 });
            _d(s, 'currentProject', null);
        });

        store.data.franchises.forEach(function (f) {
            if (typeof f.numId === 'undefined') f.numId = store.data.lastFranchiseNumId = (store.data.lastFranchiseNumId || 0) + 1;
            _dn(f, 'totalRevenue', 0); _dn(f, 'fanbaseScore', 50); _dn(f, 'tier', 1); _da(f, 'last3Scores');
        });

        if (!store.data.streamingPlatforms) store.data.streamingPlatforms = csGenerateStreamingPlatforms();
        store.data.streamingPlatforms.forEach(function (s) {
            _dn(s, 'prestige', 1); _dn(s, 'subscriberBase', 1e6); _dn(s, 'revenueShareRate', 0.35);
            _da(s, 'activeDeals'); _dn(s, 'playerRelationship', 50);
            _d(s, 'acceptsType', ["movie", "tvSeries", "animatedShow", "comicBook"]);
        });

        if (!store.data.theaterChains) store.data.theaterChains = csGenerateTheaterChains();
        store.data.theaterChains.forEach(function (t) {
            _dn(t, 'screens', 500); _dn(t, 'prestige', 1); _d(t, 'activeRelease', null);
            _dn(t, 'playerRelationship', 50); _dn(t, 'distributionFeeRate', 0.55);
        });

        if (!store.data.releaseHistory.length) store.data.releaseHistory = csSeedFilmMarket();
        store.data.theaterReleases.forEach(function (r) {
            _dn(r, 'weeksActive', 0); _dn(r, 'totalBoxOffice', 0); _d(r, 'status', "active");
        });

        if (!store.data.gridService) store.data.gridService = csCreateDefaultGrid();
        csRepairGrid(store.data.gridService);
        csRepairDLCData(store.data);

        store.data.pendingDistribution.forEach(function (p) {
            _d(p, 'mediaProjectId', null); _dn(p, 'decisionDeadlineWeek', 0); _d(p, 'notified', false);
        });

        if (typeof GameManager !== 'undefined' && GameManager.company && GameManager.company.gameLog) {
            var c = GameManager.company, log = c.gameLog, rep = 0,
                mR = (c.staff ? c.staff.length : 0) * 300 + (c.techLevel || 1) * 20 + 1000;

            log.forEach(function (g) {
                var s = store.data.coDevScrubMap[g.title] || store.data.coDevScrubMap[g.name];
                if (g.modCoDevDesignAdded || g.modCoDevTechAdded || s) {
                    g.designPoints = Math.max(0, g.designPoints - ((g.modCoDevDesignAdded || 0) + (s ? s.design : 0)));
                    g.technologyPoints = Math.max(0, g.technologyPoints - ((g.modCoDevTechAdded || 0) + (s ? s.tech : 0)));
                    delete g.modCoDevDesignAdded;
                    delete g.modCoDevTechAdded;
                    rep++;
                } else {
                    if (g.designPoints > mR * 2.5) {
                        g.designPoints = Math.min(g.designPoints, mR);
                        rep++;
                    }
                    if (g.technologyPoints > mR * 2.5) {
                        g.technologyPoints = Math.min(g.technologyPoints, mR);
                        rep++;
                    }
                }
            });

            if (log.length > 0) {
                var lg = log[log.length - 1];
                c.prevDesignPoints = c.designBaseline = c.lastDesignPoints = lg.designPoints;
                c.prevTechnologyPoints = c.technologyBaseline = c.lastTechPoints = lg.technologyPoints;
            }
        }
    }

    function csShowAlert(m) {
        var id = 'cs_a_' + Date.now(), o = _ae($('body'), '<div id="' + id + '" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:99999;display:flex;justify-content:center;align-items:center;"></div>'), d = _ae(o, '<div class="windowBorder" style="background:#eee;padding:25px;width:400px;text-align:center;border:4px solid #d35400;"></div>');
        _ae(d, '<h2 style="color:#d35400;margin:0 0 15px;border-bottom:2px solid #e67e22;">Concurrent Studios</h2><div style="margin:20px 0;">' + m + '</div>'); _ae(d, '<div class="selectorButton orangeButton" style="width:120px;display:inline-block;">OK</div>').click(function () { o.remove() });
    }
    function csNotify(m) { csShowAlert(m); }



    function csCreateDefaultGrid() {
        return {
            isActive: false, isResearched: false, launchCost: 25000000, name: "Grid", subscribers: 0,
            subscriberGrowthRate: 0.02, pricePerMonth: 14.99, contentLibrary: [], totalRevenue: 0, marketingBudgetWeekly: 0,
            churnRate: 0.01, prestige: 1, originalContentBonus: 0, weeklyRevenue: 0, launchWeek: -1, pendingUpkeep: 0,
            weeklyUpkeep: 0, pendingRevenue: 0, pendingMarketing: 0, pendingLicenses: 0, lastWeekSubscribers: 0, revenueHistory: []
        };
    }

    function csRepairGrid(grid) {
        if (!grid) return;
        var def = csCreateDefaultGrid();
        for (var k in def) { if (!Array.isArray(def[k])) _d(grid, k, def[k]); }
        _da(grid, 'contentLibrary'); _da(grid, 'revenueHistory');

        grid.contentLibrary.forEach(function (e, ci) {
            _d(e, 'id', "GC_MIG_" + Date.now() + "_" + ci); _d(e, 'mediaProjectId', null);
            if (typeof e.title !== "string" || !e.title) e.title = "Unknown Media"; _d(e, 'type', "movie");
            _dn(e, 'addedWeek', 0); _dn(e, 'score', 5); _dn(e, 'viewsThisWeek', 0); _dn(e, 'totalViews', 0);
            _dn(e, 'subscriberContribution', 0); _d(e, 'isOriginal', true); _dn(e, 'licenseCostWeekly', 0);
            _dn(e, 'licenseWeeksRemaining', 0); _d(e, 'franchiseId', null);
            if (typeof e.freshness !== "number" || isNaN(e.freshness) || e.freshness <= 0) e.freshness = 0.5;
        });
    }

    function csRepairDLCData(data) {
        if (!data) return;
        
        if (!data.dlcData) {
            data.dlcData = { games: {}, dlcs: {} };
            return;
        }

        if (Array.isArray(data.dlcData) || !data.dlcData.games || !data.dlcData.dlcs) {
            var oldData = data.dlcData;
            data.dlcData = { games: {}, dlcs: {} };
            
            if (Array.isArray(oldData)) {
                oldData.forEach(function(oldDLC, idx) {
                    var dlcId = oldDLC.id || ("DLC_LEGACY_" + Date.now() + "_" + idx);
                    var gameId = oldDLC.gameId || oldDLC.baseGameId || "UNKNOWN_GAME";
                    
                    data.dlcData.dlcs[dlcId] = {
                        id: dlcId,
                        baseGameId: gameId,
                        title: oldDLC.title || ("Expansion " + (idx+1)),
                        theme: "Legacy Expansion",
                        type: "Expansion Pack",
                        scale: "Medium",
                        allocation: { story: 25, gameplay: 25, graphics: 25, audio: 25 },
                        price: 9.99,
                        marketingStrategy: "None",
                        releaseTiming: "Immediate",
                        devStats: { cost: 500000, marketingCost: 0, weeksInDev: 12, bugs: 0 },
                        marketStats: { 
                            score: 7.0, 
                            totalSales: oldDLC.sales || 0, 
                            totalRevenue: oldDLC.revenue || 0, 
                            baseGameUnitsAtLaunch: 100000 
                        },
                        status: "released",
                        releaseWeek: oldDLC.releaseWeek || 0,
                        history: {
                            salesOverTime: [],
                            priceHistory: []
                        }
                    };
                    
                    if (!data.dlcData.games[gameId]) {
                        data.dlcData.games[gameId] = { activeSeasonPass: null, dlcList: [] };
                    }
                    data.dlcData.games[gameId].dlcList.push(dlcId);
                });
            }
        }
    }

    function csCreateGridEntry(opts) {
        var currentWeek = 0;
        try { currentWeek = Math.floor(GameManager.company.currentWeek); } catch (e) { }
        return {
            id: "GC_" + Date.now() + "_" + Math.floor(Math.random() * 100000),
            mediaProjectId: opts.mediaProjectId || null,
            title: opts.title || "Unknown Media",
            type: opts.type || "movie",
            addedWeek: opts.addedWeek || currentWeek,
            score: (typeof opts.score === "number" && !isNaN(opts.score)) ? Math.max(1, Math.min(10, opts.score)) : 5,
            viewsThisWeek: 0,
            totalViews: 0,
            subscriberContribution: 0,
            isOriginal: (typeof opts.isOriginal === "boolean") ? opts.isOriginal : true,
            licenseCostWeekly: (typeof opts.licenseCostWeekly === "number" && !isNaN(opts.licenseCostWeekly)) ? opts.licenseCostWeekly : 0,
            licenseWeeksRemaining: (typeof opts.licenseWeeksRemaining === "number" && !isNaN(opts.licenseWeeksRemaining)) ? opts.licenseWeeksRemaining : 0,
            franchiseId: opts.franchiseId || null,
            freshness: (typeof opts.freshness === "number" && !isNaN(opts.freshness)) ? opts.freshness : 1.0
        };
    }


    function generateGameName(topic, genre) {
        var pre = ["Super", "Mega", "Ultra", "The", "Call of", "World of", "Age of", "Return to", "Escape from", "Chronicles of", "Legend of", "Project", "Secret of", "Rise of", "Fall of", "Dark", "Light", "Shadow", "Blood", "Iron"],
            mid = ["Duty", "Craft", "Star", "Wars", "Knight", "Dragon", "City", "Quest", "Fantasy", "Space", "Zombies", "Ninja", "Pirate", "Cyber", "Steam", "Magic", "Blade", "Gun", "Soul", "Heart"],
            post = ["II", "III", "IV", "V", "X", "Alpha", "Omega", "Origins", "Awakening", "Rebirth", "Online", "Plus", "Ultra", "HD", "Remastered", "Zero", "Infinite", "Evolved", "Unleashed", "Reckoning"];
        var r = Math.random();
        if (r < .3) return pre[~~(Math.random() * pre.length)] + " " + mid[~~(Math.random() * mid.length)];
        if (r < .6) return mid[~~(Math.random() * mid.length)] + " " + post[~~(Math.random() * post.length)];
        if (r < .9) return pre[~~(Math.random() * pre.length)] + " " + mid[~~(Math.random() * mid.length)] + " " + post[~~(Math.random() * post.length)];
        return topic + " " + genre + " " + post[~~(Math.random() * post.length)];
    }

    function generateMovieStudios() {
        var movieStudioNames = [
            "Paramount Interactive", "Universal Pixels", "Warner Bros. Digital",
            "Sony Pictures Gaming", "Disney Interactive Reborn", "Lionsgate Games",
            "A24 Interactive", "Netflix Films & Games", "Apple TV+ Studios",
            "MGM Digital", "Legendary Games", "Blumhouse Interactive"
        ];
        var studios = [];
        for (var i = 0; i < movieStudioNames.length; i++) {
            studios.push({
                id: "MS_" + i,
                name: movieStudioNames[i],
                reputation: Math.floor(Math.random() * 5) + 1,
                valuation: Math.floor((Math.random() * 80000000) + 10000000),
                sharesOwned: 0,
                isFounded: true,
                staff: { design: 15, tech: 15, speed: 15 },
                currentProject: null,
                draftCooldown: 0,
                dealPending: false,
                dealOffer: null,
                currentDeal: null,
                totalDealsCompleted: 0
            });
        }
        return studios;
    }

    function csGenerateStreamingPlatforms() {
        return [
            { id: "SP_0", name: "StreamMax", prestige: 5, subscriberBase: 200000000, revenueShareRate: 0.45, acceptsType: ["movie", "tvSeries", "animatedShow", "comicBook"], logoColor: "#e50914", advanceMultiplier: 2.0, exclusivitySlots: 3, monthlyFee: 200000, activeDeals: [], totalDealsCompleted: 0, playerRelationship: 50, bookingCooldownWeek: -100 },
            { id: "SP_1", name: "Watchly", prestige: 4, subscriberBase: 100000000, revenueShareRate: 0.41, acceptsType: ["movie", "tvSeries", "animatedShow"], logoColor: "#0071eb", advanceMultiplier: 1.5, exclusivitySlots: 2, monthlyFee: 100000, activeDeals: [], totalDealsCompleted: 0, playerRelationship: 50, bookingCooldownWeek: -100 },
            { id: "SP_2", name: "PrimeVault", prestige: 4, subscriberBase: 120000000, revenueShareRate: 0.38, acceptsType: ["movie", "tvSeries", "animatedShow", "comicBook"], logoColor: "#00a8e0", advanceMultiplier: 1.5, exclusivitySlots: 2, monthlyFee: 100000, activeDeals: [], totalDealsCompleted: 0, playerRelationship: 50, bookingCooldownWeek: -100 },
            { id: "SP_3", name: "ApexStream", prestige: 3, subscriberBase: 65000000, revenueShareRate: 0.33, acceptsType: ["movie", "tvSeries"], logoColor: "#6441a4", advanceMultiplier: 1.0, exclusivitySlots: 1, monthlyFee: 50000, activeDeals: [], totalDealsCompleted: 0, playerRelationship: 50, bookingCooldownWeek: -100 },
            { id: "SP_4", name: "AnimePlus", prestige: 3, subscriberBase: 40000000, revenueShareRate: 0.35, acceptsType: ["animatedShow", "comicBook"], logoColor: "#e91e8c", advanceMultiplier: 1.0, exclusivitySlots: 1, monthlyFee: 50000, activeDeals: [], totalDealsCompleted: 0, playerRelationship: 50, bookingCooldownWeek: -100 },
            { id: "SP_5", name: "DocuWorld", prestige: 2, subscriberBase: 15000000, revenueShareRate: 0.31, acceptsType: ["movie", "comicBook"], logoColor: "#26a69a", advanceMultiplier: 0.6, exclusivitySlots: 1, monthlyFee: 0, activeDeals: [], totalDealsCompleted: 0, playerRelationship: 50, bookingCooldownWeek: -100 },
            { id: "SP_6", name: "IndieFlix", prestige: 2, subscriberBase: 8000000, revenueShareRate: 0.28, acceptsType: ["movie", "tvSeries"], logoColor: "#ff7043", advanceMultiplier: 0.6, exclusivitySlots: 1, monthlyFee: 0, activeDeals: [], totalDealsCompleted: 0, playerRelationship: 50, bookingCooldownWeek: -100 },
            { id: "SP_7", name: "PixelPlay", prestige: 3, subscriberBase: 50000000, revenueShareRate: 0.32, acceptsType: ["animatedShow", "tvSeries"], logoColor: "#7cb342", advanceMultiplier: 1.0, exclusivitySlots: 1, monthlyFee: 50000, activeDeals: [], totalDealsCompleted: 0, playerRelationship: 50, bookingCooldownWeek: -100 },
            { id: "SP_8", name: "CinemaNet", prestige: 4, subscriberBase: 85000000, revenueShareRate: 0.39, acceptsType: ["movie"], logoColor: "#f57c00", advanceMultiplier: 1.5, exclusivitySlots: 2, monthlyFee: 100000, activeDeals: [], totalDealsCompleted: 0, playerRelationship: 50, bookingCooldownWeek: -100 },
            { id: "SP_9", name: "GlobalStream", prestige: 5, subscriberBase: 175000000, revenueShareRate: 0.43, acceptsType: ["movie", "tvSeries", "animatedShow", "comicBook"], logoColor: "#1565c0", advanceMultiplier: 2.0, exclusivitySlots: 3, monthlyFee: 200000, activeDeals: [], totalDealsCompleted: 0, playerRelationship: 50, bookingCooldownWeek: -100 }
        ].map(function (sp) {
            sp.catalog = [
                { title: sp.name + " Original Docs", type: "movie", score: 6, licenseWeeks: 24, licenseCostWeekly: Math.floor(sp.prestige * 10000 * 1.6) },
                { title: "Classic " + sp.name + " Hits", type: "tvSeries", score: 8, licenseWeeks: 52, licenseCostWeekly: Math.floor(sp.prestige * 10000 * 1.8) },
                { title: sp.name + " Exclusives V1", type: "movie", score: 7, licenseWeeks: 24, licenseCostWeekly: Math.floor(sp.prestige * 10000 * 1.7) },
                { title: sp.name + " Animated Specials", type: "animatedShow", score: 9, licenseWeeks: 48, licenseCostWeekly: Math.floor(sp.prestige * 10000 * 1.9) },
                { title: "Indie Hits on " + sp.name, type: "movie", score: 5, licenseWeeks: 12, licenseCostWeekly: Math.floor(sp.prestige * 10000 * 1.5) }
            ];
            return sp;
        });
    }

    function csGenerateTheaterChains() {
        return [
            { id: "TC_0", name: "Cineplex Global", screens: 4200, prestige: 5, distributionFeeRate: 0.52, bookingFee: 800000, activeRelease: null, playerRelationship: 50, logoColor: "#c0392b" },
            { id: "TC_1", name: "ScreenNation", screens: 2800, prestige: 4, distributionFeeRate: 0.50, bookingFee: 400000, activeRelease: null, playerRelationship: 50, logoColor: "#2980b9" },
            { id: "TC_2", name: "SilverScreen Co", screens: 1600, prestige: 3, distributionFeeRate: 0.48, bookingFee: 200000, activeRelease: null, playerRelationship: 50, logoColor: "#7f8c8d" },
            { id: "TC_3", name: "Grand Marquee", screens: 900, prestige: 2, distributionFeeRate: 0.45, bookingFee: 75000, activeRelease: null, playerRelationship: 50, logoColor: "#8e44ad" },
            { id: "TC_4", name: "Indie Arthouse", screens: 300, prestige: 1, distributionFeeRate: 0.38, bookingFee: 20000, activeRelease: null, playerRelationship: 50, logoColor: "#16a085" }
        ];
    }

    function getFranchiseById(id) {
        if (!store.data.franchises) return null;
        for (var i = 0; i < store.data.franchises.length; i++) {
            if (store.data.franchises[i].id === id) return store.data.franchises[i];
        }
        return null;
    }

    function getFrans(filter) { var arr = store.data.franchises || []; return filter ? arr.filter(filter) : arr; }
    function getPlayerFranchises() { return getFrans(function (f) { return f.ownerId === "player"; }); }
    function getAIFranchises() { return getFrans(function (f) { return f.ownerId !== "player"; }); }

    function getFranchiseForGame(gameId) {
        if (!store.data.franchises) return null;
        for (var i = 0; i < store.data.franchises.length; i++) {
            var f = store.data.franchises[i];
            for (var j = 0; j < f.installments.length; j++) {
                if (f.installments[j].gameId === gameId) return f;
            }
        }
        return null;
    }

    function getMovieStudioById(id) {
        if (!store.data.movieStudios) return null;
        for (var i = 0; i < store.data.movieStudios.length; i++) {
            if (store.data.movieStudios[i].id === id) return store.data.movieStudios[i];
        }
        return null;
    }

    function csGetStreamingPlatformById(id) {
        if (!store.data.streamingPlatforms) return null;
        for (var i = 0; i < store.data.streamingPlatforms.length; i++) {
            if (store.data.streamingPlatforms[i].id === id) return store.data.streamingPlatforms[i];
        }
        return null;
    }

    function csGetTheaterChainById(id) {
        if (!store.data.theaterChains) return null;
        for (var i = 0; i < store.data.theaterChains.length; i++) {
            if (store.data.theaterChains[i].id === id) return store.data.theaterChains[i];
        }
        return null;
    }

    function csGetMediaProjectById(id) {
        if (!store.data.mediaProjects) return null;
        for (var i = 0; i < store.data.mediaProjects.length; i++) {
            if (store.data.mediaProjects[i].id === id) return store.data.mediaProjects[i];
        }
        return null;
    }

    function csFormatDistributionStatus(status) {
        switch (status) {
            case "pending": return { label: "Awaiting Distribution", color: "#f39c12" };
            case "streaming": return { label: "On Stream", color: "#3498db" };
            case "streamingComplete": return { label: "Stream Complete", color: "#27ae60" };
            case "theater": return { label: "In Theaters", color: "#e74c3c" };
            case "theaterComplete": return { label: "Theater Run Complete", color: "#27ae60" };
            case "grid": return { label: "On Grid", color: "#9b59b6" };
            case "expired": return { label: "Window Expired", color: "#95a5a6" };
            default: return { label: status, color: "#bdc3c7" };
        }
    }

    function csGetMediaTypeInfo(t) {
        var m = {
            movie: { l: 'Film', c: '#e74c3c', i: 'F' },
            tvSeries: { l: 'TV Series', c: '#3498db', i: 'T' },
            animatedShow: { l: 'Anim. Show', c: '#9b59b6', i: 'A' },
            soundtrack: { l: 'Music/OST', c: '#f1c40f', i: '\u266B' },
            merchandise: { l: 'Merch', c: '#e67e22', i: '\u2605' },
            comicBook: { l: 'Comic Book', c: '#2ecc71', i: 'C' }
        };
        return m[t] || { l: t, c: '#7f8c8d', i: '?' };
    }

    function csEstimateStreamingRevenue(mediaProject, platform) {
        var baseViewership = platform.subscriberBase * (0.01 + ((mediaProject.score || 5) / 100));
        if (platform.subscriberBase <= 0) baseViewership = 1000000;

        var viewportMultiplier = 1.0;
        if (mediaProject.franchiseId) {
            var fran = getFranchiseById(mediaProject.franchiseId);
            if (fran) viewportMultiplier += (fran.fanbaseScore / 200);
        }

        var revenuePerViewer = 0.0015;
        var grossWeeklyRevenue = baseViewership * viewportMultiplier * revenuePerViewer;
        var weeklyRevenue = Math.floor(grossWeeklyRevenue * platform.revenueShareRate);
        weeklyRevenue = Math.max(5000, Math.min(50000000, weeklyRevenue));

        var weeksTotal = (mediaProject.type === "movie" ? 26 : ((mediaProject.type === "tvSeries" || mediaProject.type === "animatedShow") ? 52 : 26));

        return {
            weeklyRevenue: weeklyRevenue,
            totalRevenue: weeklyRevenue * weeksTotal,
            weeks: weeksTotal
        };
    }

    function csEstimateTheaterRevenue(mediaProject, theaterChain) {
        var baseAudience = theaterChain.screens * 800;
        var scoreMultiplier = Math.pow((mediaProject.score || 5) / 5, 2);
        var budgetBonus = Math.min(3.0, Math.log((mediaProject.budget || 250000) / 1000000 + 1) / Math.LN10);
        if (isNaN(budgetBonus) || budgetBonus <= 0) budgetBonus = 1.0;

        var franchiseBonus = 1.0;
        if (mediaProject.franchiseId) {
            var fran = getFranchiseById(mediaProject.franchiseId);
            if (fran) franchiseBonus = 1.0 + (fran.tier * 0.2);
        }

        var ticketPrice = 14.50;
        var peakWeeklyRevenue = Math.floor(baseAudience * scoreMultiplier * budgetBonus * franchiseBonus * ticketPrice);
        if (isNaN(peakWeeklyRevenue)) peakWeeklyRevenue = 100000;
        peakWeeklyRevenue = Math.max(50000, Math.min(500000000, peakWeeklyRevenue));

        var estimatedTotal = 0;
        var curGross = peakWeeklyRevenue;
        for (var w = 1; w <= 8; w++) {
            if (w > 1) {
                var decay = 0.55;
                if (w === 2) decay = 0.60;
                else if (w >= 3 && w <= 5) decay = 0.65;
                else if (w >= 6) decay = 0.70;
                curGross = Math.floor(curGross * decay);
            }
            if (curGross < 100000) break;
            estimatedTotal += curGross;
        }

        var playerShare = Math.floor(estimatedTotal * (1.0 - theaterChain.distributionFeeRate));
        return {
            peakWeeklyRevenue: peakWeeklyRevenue,
            estimatedTotal: { min: Math.floor(estimatedTotal * 0.8), max: Math.floor(estimatedTotal * 1.2) },
            playerShare: { min: Math.floor(playerShare * 0.8), max: Math.floor(playerShare * 1.2) }
        };
    }

    function csConfirmStreamingDeal(mediaProject, platform, isExclusive) {
        if (!platform || !mediaProject) return false;
        var currentWeek = Math.floor(GameManager.company.currentWeek);

        if (platform.acceptsType.indexOf(mediaProject.type) === -1) { csNotify("This platform does not accept this content type!"); return false; }
        if (mediaProject.distributionStatus !== "pending") return false;
        if (currentWeek - (platform.bookingCooldownWeek || -100) < 16) { csNotify("Must wait 16 weeks between deals with this platform."); return false; }

        if (isExclusive) {
            var currentExclusiveCount = platform.activeDeals.filter(function (d) { return d.isExclusive; }).length;
            if (currentExclusiveCount >= platform.exclusivitySlots) { csNotify("This platform has no exclusive slots left."); return false; }
        }

        var advanceMultiplier = platform.advanceMultiplier || 1.0;
        var advance = Math.floor((mediaProject.budget || 250000) * advanceMultiplier * ((mediaProject.score || 5) / 5));
        advance = Math.max(50000, advance);

        var est = csEstimateStreamingRevenue(mediaProject, platform);
        var weeklyRevenue = est.weeklyRevenue;
        if (isExclusive) weeklyRevenue = Math.floor(weeklyRevenue * 1.25);

        var deal = {
            id: "SD_" + Date.now() + "_" + Math.floor(Math.random() * 10000),
            mediaProjectId: mediaProject.id,
            title: mediaProject.title,
            studioId: mediaProject.studioId || null,
            weeklyRevenue: weeklyRevenue,
            weeksActive: 0,
            weeksTotal: est.weeks,
            isExclusive: !!isExclusive,
            score: (mediaProject.score || 5)
        };

        platform.activeDeals.push(deal);
        GameManager.company.adjustCash(advance, "Streaming Advance: " + mediaProject.title + " on " + platform.name);

        mediaProject.distributionStatus = "streaming";
        mediaProject.distributionPlatformId = platform.id;
        platform.bookingCooldownWeek = currentWeek;
        platform.playerRelationship = Math.min(100, platform.playerRelationship + 3);

        if (mediaProject.franchiseId) {
            var fran = getFranchiseById(mediaProject.franchiseId);
            if (fran) {
                fran.fanbaseScore = Math.min(100, fran.fanbaseScore + 3);
            }
        }

        for (var i = store.data.pendingDistribution.length - 1; i >= 0; i--) {
            if (store.data.pendingDistribution[i].mediaProjectId === mediaProject.id) {
                store.data.pendingDistribution.splice(i, 1);
            }
        }

        _n("Streaming Deal Signed!", mediaProject.title + " will stream on " + platform.name + ". Advance: $" + UI.getShortNumberString(advance) + ". Weekly revenue starts next week.");
        return true;
    }

    function csConfirmTheaterRelease(mediaProject, theaterChain) {
        if (!theaterChain || !mediaProject) return false;
        if (mediaProject.type !== "movie") { csNotify("Theatrical releases are only available for feature films."); return false; }
        if (mediaProject.distributionStatus !== "pending") return false;
        if (theaterChain.activeRelease !== null) { csNotify("This theater chain is already running another release!"); return false; }
        if (GameManager.company.cash < theaterChain.bookingFee) { csNotify("Not enough cash for booking fee."); return false; }

        GameManager.company.adjustCash(-theaterChain.bookingFee, "Theater Booking: " + theaterChain.name);

        var est = csEstimateTheaterRevenue(mediaProject, theaterChain);
        var release = {
            id: "TR_" + Date.now() + "_" + Math.floor(Math.random() * 10000),
            mediaProjectId: mediaProject.id,
            theaterChainId: theaterChain.id,
            title: mediaProject.title,
            startWeek: Math.floor(GameManager.company.currentWeek),
            weeksActive: 0,
            maxWeeks: 8,
            peakWeeklyRevenue: est.peakWeeklyRevenue,
            totalBoxOffice: 0,
            playerShare: 0,
            status: "active",
            score: (mediaProject.score || 5),
            franchiseBonus: 1.0
        };

        if (mediaProject.franchiseId) {
            var fran = getFranchiseById(mediaProject.franchiseId);
            if (fran) release.franchiseBonus = (1.0 + fran.tier * 0.2);
        }

        store.data.theaterReleases.push(release);
        theaterChain.activeRelease = release.id;
        mediaProject.distributionStatus = "theater";

        for (var i = store.data.pendingDistribution.length - 1; i >= 0; i--) {
            if (store.data.pendingDistribution[i].mediaProjectId === mediaProject.id) {
                store.data.pendingDistribution.splice(i, 1);
            }
        }

        _n("Opening Weekend!", mediaProject.title + " opens in " + theaterChain.screens + " screens at " + theaterChain.name + "! Projected opening gross: $" + UI.getShortNumberString(est.peakWeeklyRevenue));
        return true;
    }

    function csAddToGrid(mediaProject) {
        if (!store.data.gridService || !store.data.gridService.isActive) return false;
        if (!mediaProject || mediaProject.distributionStatus !== "pending") return false;
        var validTypes = ["movie", "tvSeries", "animatedShow", "comicBook", "soundtrack"];
        if (validTypes.indexOf(mediaProject.type) === -1) { csNotify("Grid does not support this content type."); return false; }

        var grid = store.data.gridService;
        if (!Array.isArray(grid.contentLibrary)) grid.contentLibrary = [];

        for (var i = 0; i < grid.contentLibrary.length; i++) {
            if (grid.contentLibrary[i].mediaProjectId === mediaProject.id) {
                csNotify("Already in Grid Library."); return false;
            }
        }

        var gridLevel = grid.contentLibrary.length;
        var baseCost = 500000;
        var upgradeCost = Math.floor(baseCost * Math.pow(1.65, gridLevel));
        
        if (GameManager.company.cash < upgradeCost) {
            csNotify("Insufficient funds to expand The Grid. Need $" + UI.getShortNumberString(upgradeCost));
            return false;
        }
        
        GameManager.company.adjustCash(-upgradeCost, "Grid Expansion Cost: " + mediaProject.title);

        var entry = csCreateGridEntry({
            mediaProjectId: mediaProject.id,
            title: mediaProject.title,
            type: mediaProject.type,
            score: mediaProject.score,
            isOriginal: true,
            franchiseId: mediaProject.franchiseId || null,
            freshness: 1.0
        });

        grid.contentLibrary.push(entry);
        mediaProject.distributionStatus = "grid";


        if (!store.data.pendingDistribution) store.data.pendingDistribution = [];
        for (var j = store.data.pendingDistribution.length - 1; j >= 0; j--) {
            if (store.data.pendingDistribution[j].mediaProjectId === mediaProject.id) {
                store.data.pendingDistribution.splice(j, 1);
            }
        }


        var safeScore = entry.score;
        var franchiseBonus = 1.0;
        if (entry.franchiseId) {
            var fran = getFranchiseById(entry.franchiseId);
            if (fran) franchiseBonus = 1.0 + ((fran.tier || 1) * 0.25);
        }
        var qualityMult = (safeScore >= 8) ? 3 : (safeScore >= 6 ? 1.5 : 1);
        var instantSubBoost = Math.floor(safeScore * 500 * qualityMult * franchiseBonus);
        if (isNaN(instantSubBoost) || instantSubBoost < 0) instantSubBoost = 500;
        grid.subscribers = (grid.subscribers || 0) + instantSubBoost;

        _n("Added to Grid", entry.title + " added to Grid's library! +" + UI.getShortNumberString(instantSubBoost) + " instant subscribers.");
        return true;
    }

    function csLicenseExternalToGrid(movieEntry, weeklyCost, weeks) {
        if (!store.data.gridService || !store.data.gridService.isActive) return;
        if (!movieEntry) return;
        var grid = store.data.gridService;
        if (!Array.isArray(grid.contentLibrary)) grid.contentLibrary = [];

        var entry = csCreateGridEntry({
            mediaProjectId: null,
            title: movieEntry.title || "Unknown Film",
            type: movieEntry.type || "movie",
            score: movieEntry.score,
            isOriginal: false,
            licenseCostWeekly: weeklyCost || 0,
            licenseWeeksRemaining: weeks || 52,
            freshness: 0.8
        });

        grid.contentLibrary.push(entry);
        if (entry.licenseCostWeekly > 0) {
            GameManager.company.adjustCash(-entry.licenseCostWeekly, "Grid License (Wk 1): " + entry.title);
        }

        _n("Content Licensed for Grid", "Licensed " + entry.title + " from " + (movieEntry.studioName || "AI Studio") + " for " + entry.licenseWeeksRemaining + " weeks.");
    }


    function recalculateFranchiseTier(franchise) {
        var fb = franchise.fanbaseScore;
        if (fb >= 90) franchise.tier = 5;
        else if (fb >= 70) franchise.tier = 4;
        else if (fb >= 50) franchise.tier = 3;
        else if (fb >= 25) franchise.tier = 2;
        else franchise.tier = 1;
    }

    function calculateEntryFanbaseImpact(score) {
        if (score >= 9) return 15;
        if (score >= 7) return 8;
        if (score >= 5) return 2;
        if (score >= 3) return -10;
        return -20;
    }

    function getEntryTypeCost(type, size, franchise, bundleCount) {
        var multiplier = 1.0;
        if (type === "sequel") multiplier = 1.2;
        if (type === "remake") multiplier = 1.8;
        if (type === "remaster") multiplier = 0.5;
        if (type === "spinoff") multiplier = 1.0;
        if (type === "prequel") multiplier = 1.3;
        if (type === "bundle") multiplier = 0.6 * (bundleCount || 2);

        var baseCosts = (size === "AAA" ? 50000000 : (size === "Large" ? 10000000 : (size === "Medium" ? 2000000 : 500000)));
        var cost = baseCosts * multiplier;

        if (franchise && franchise.isDead) cost *= 2;

        return cost;
    }

    function getEntryTypeWeeks(type, size, bundleCount) {
        var baseWeeks = { "Small": 30, "Medium": 60, "Large": 100, "AAA": 160 };
        var weeks = baseWeeks[size] || 30;
        if (type === "remaster" || type === "remake") return Math.floor(weeks * 0.25);
        if (type === "expansion") return 8;
        if (type === "bundle") return Math.floor(weeks * 0.15 * (bundleCount || 2));
        return weeks;
    }

    function canAddFranchiseEntry(franchise, type, isSubsidiary) {
        if (!franchise || !franchise.installments) return { ok: false, reason: "Error identifying franchise." };

        var currentWeek = GameManager.company.currentWeek;
        var weeksSinceLast = franchise.lastEntryWeek === -1 ? 999 : (currentWeek - franchise.lastEntryWeek);


        if (!isSubsidiary) {
            if (type === "sequel" && weeksSinceLast < 12) return { ok: false, reason: "Too soon for a sequel (needs 12 weeks cooldown)." };
            if (type === "remaster") {
                var originRemaster = franchise.installments[0];
                if (!originRemaster || (currentWeek - originRemaster.releaseWeek < 60)) return { ok: false, reason: "Original game must be at least 60 weeks old for a remaster." };
            }
            if (type === "remake") {
                var originRemake = franchise.installments[0];
                if (franchise.tier < 2) return { ok: false, reason: "Requires Franchise Tier 2." };
                if (!originRemake || (currentWeek - originRemake.releaseWeek < 80)) return { ok: false, reason: "Original game must be at least 80 weeks old for a remake." };
            }
            if (type === "reboot") {
                if (franchise.tier < 2) return { ok: false, reason: "Requires Franchise Tier 2." };
                if (weeksSinceLast < 24 && franchise.fanbaseScore >= 20) return { ok: false, reason: "Reboots require a 24-week cooldown or very low fanbase (< 20)." };
            }
            if (type === "spinoff" && franchise.tier < 2) return { ok: false, reason: "Requires Franchise Tier 2." };
            if (type === "prequel" && franchise.tier < 3) return { ok: false, reason: "Requires Franchise Tier 3." };
            if (type === "expansion") {
                if (weeksSinceLast > 30) return { ok: false, reason: "Expansion must be released within 30 weeks of an entry." };
            }


            if ((type === "remaster" || type === "remake") && franchise.installments.length > 0) {
                var hasUnremade = franchise.installments.some(function (i) { return i.type !== "soundtrack" && i.type !== "bundle" && !i.beingRemade; });
                if (!hasUnremade) return { ok: false, reason: "All eligible installments have already been remastered/remade." };
            }
        }


        var studiosArr = store.data.studios || [];
        var subsidiaryProj = studiosArr.filter(function (s) {
            return s.currentProject && s.currentProject.isFranchiseEntry && s.currentProject.franchiseId === franchise.id;
        })[0];

        var playerProj = store.data.activePlayerFranchiseProject && store.data.activePlayerFranchiseProject.franchiseId === franchise.id;



        if (playerProj && typeof GameManager !== 'undefined' && GameManager.company && !GameManager.company.currentGame) {
            store.data.activePlayerFranchiseProject = null;
            playerProj = false;
        }


        studiosArr.forEach(function (s) {
            if (s.currentProject && s.currentProject.isFranchiseEntry && s.currentProject.franchiseId === franchise.id) {
                if (s.currentProject.weeksRemaining <= -5) {
                    s.currentProject = null;
                }
            }
        });


        subsidiaryProj = studiosArr.filter(function (s) {
            return s.currentProject && s.currentProject.isFranchiseEntry && s.currentProject.franchiseId === franchise.id;
        })[0];



        var isNewEntry = (type === "sequel" || type === "spinoff" || type === "prequel" || type === "expansion" || type === "reboot");








        if (isNewEntry && (playerProj || subsidiaryProj)) {
            var activeType = playerProj ? store.data.activePlayerFranchiseProject.type : subsidiaryProj.currentProject.type;
            var isNewActive = (activeType === "sequel" || activeType === "spinoff" || activeType === "prequel" || activeType === "expansion" || activeType === "reboot");

            if (isNewActive) {
                return { ok: false, reason: "A core franchise entry (" + activeType + ") is already in development." };
            }
        }




        if (!isSubsidiary && playerProj) {
            return { ok: false, reason: "You are already developing a project for this franchise." };
        }

        return { ok: true };
    }

    function estimateFranchiseEntryScore(franchise, type, size, remakeTargetId) {
        var baseMin = 4 + (franchise.tier * 0.5);
        var baseMax = 6 + (franchise.tier * 0.8);
        var currentWeek = Math.floor(GameManager.company.currentWeek);


        if (type === "sequel" && franchise.fanbaseScore >= 50) { baseMin += 0.5; baseMax += 0.5; }


        var recentSequels = (store.data.globalSequelHistory || []).filter(function (h) {
            return h.genre === franchise.genre && (currentWeek - h.week < 20);
        });
        if (recentSequels.length > 3) {
            baseMin -= 0.5;
            baseMax -= 0.5;
        }

        if (type === "remaster" || type === "remake") {
            var targetInst = null;
            if (remakeTargetId) {
                targetInst = franchise.installments.filter(function (i) { return i.id === remakeTargetId; })[0];
            }
            if (!targetInst) targetInst = franchise.installments[0];

            if (targetInst) {
                var originScore = targetInst.score;
                if (type === "remake") return { min: Math.max(1, originScore * 0.8), max: Math.min(10, originScore * 1.2) };
                else return { min: Math.max(1, originScore * 0.9), max: Math.min(10, originScore * 1.1) };
            }
        }

        return { min: Math.max(1, baseMin), max: Math.min(10, baseMax) };
    }

    function estimateMediaRevenue(type, budget, franchise) {
        var baseMult = 0.5;
        if (franchise) baseMult += (franchise.tier * 0.2) + (franchise.fanbaseScore / 100);

        var min = budget * baseMult * 1.5;
        var max = budget * baseMult * 4.0;

        if (type === "movie") { min *= 4; max *= 8; }
        if (type === "tvSeries" || type === "animatedShow") { min *= 3; max *= 5; }
        if (type === "soundtrack") { min = budget * 0.2; max = budget * 1.5; }
        if (type === "merchandise") { min = budget * 2; max = budget * 5; }
        if (type === "comicBook") { min = budget * 1.5; max = budget * 3; }

        return { min: min, max: max };
    }

    function onFranchiseEntryComplete(franchise, entry, score, revenue) {
        if (!franchise.last3Scores) franchise.last3Scores = [];
        franchise.last3Scores.push(score);
        if (franchise.last3Scores.length > 3) franchise.last3Scores.shift();

        if (entry) {
            entry.type = entry.type || "sequel";
        }


        if (entry && (entry.type === "remake" || entry.type === "remaster")) {
            if (franchise.installments && franchise.installments.length > 0) {
                var originScore = franchise.installments[0].score;
                var range = entry.type === "remake" ? 0.2 : 0.1;
                score = Math.max(originScore * (1 - range), Math.min(originScore * (1 + range), score));
            }
        }


        var qTier = Math.floor(score / 2);
        if (qTier > 5) qTier = 5;


        var fanbaseGain = 0;
        if (franchise.tier === 1) fanbaseGain = 10 + Math.floor(Math.random() * 11);
        if (franchise.tier === 2) fanbaseGain = 8 + Math.floor(Math.random() * 8);
        if (franchise.tier === 3) fanbaseGain = 5 + Math.floor(Math.random() * 6);
        if (franchise.tier === 4) fanbaseGain = 3 + Math.floor(Math.random() * 5);
        if (franchise.tier === 5) fanbaseGain = 2 + Math.floor(Math.random() * 4);


        if (qTier <= 2) fanbaseGain = Math.floor(fanbaseGain * 0.5);
        if (qTier === 4) fanbaseGain = Math.floor(fanbaseGain * 1.5);
        if (qTier === 5) fanbaseGain = Math.floor(fanbaseGain * 2.5);

        franchise.fanbaseScore = Math.min(100, franchise.fanbaseScore + fanbaseGain);


        if (franchise.isDead && qTier >= 3) {
            franchise.isDead = false;
        }


        var recentAvg = (franchise.last3Scores.reduce(function (a, b) { return a + b; }, 0) / Math.max(1, franchise.last3Scores.length));
        var oldTier = franchise.tier;
        if (franchise.tier < 5) {
            var reqScore = 6 + (franchise.tier * 0.5);
            var reqFans = 20 * franchise.tier;
            if (recentAvg >= reqScore && franchise.fanbaseScore >= reqFans) {
                franchise.tier++;
                _n("Franchise Level Up!", franchise.name + " is now Tier " + franchise.tier + "!");
            }
        }


        if (entry) {

            if (!store.data.globalSequelHistory) store.data.globalSequelHistory = [];
            store.data.globalSequelHistory.push({
                genre: franchise.genre,
                week: Math.floor(GameManager.company.currentWeek)
            });

            if (store.data.globalSequelHistory.length > 50) store.data.globalSequelHistory.shift();

            entry.score = score;
            entry.revenue = revenue;
            entry.releaseWeek = Math.floor(GameManager.company.currentWeek);
            franchise.installments.push(entry);
            franchise.totalRevenue += revenue;
            franchise.lastEntryWeek = entry.releaseWeek;


            if (entry.type === "remaster" || entry.type === "remake" || entry.type === "bundle") {
                if (entry.bundledIds && entry.bundledIds.length > 0) {
                    entry.bundledIds.forEach(function (bid) {
                        var inst = franchise.installments.filter(function (i) { return i.id === bid; })[0];
                        if (inst) inst.beingRemade = true;
                    });
                } else if (entry.type !== "bundle" && franchise.installments && franchise.installments.length > 0) {
                    if (entry.remakeTargetId) {
                        var target = franchise.installments.filter(function (i) { return i.id === entry.remakeTargetId; })[0];
                        if (target) target.beingRemade = true;
                    } else {
                        franchise.installments[0].beingRemade = true;
                    }
                }
            }


            if (entry.type === "soundtrack") {
                franchise.pendingSoundtrackBonus = (franchise.pendingSoundtrackBonus || 0) + 2;
            }
        }


        if (franchise.ownerId === "player") {
            var bonus = franchise.fanbaseScore * 50000;
            GameManager.company.adjustCash(bonus, "Franchise Fanbase Bonus: " + franchise.name);
        }
    }

    function renderFanbaseBar(score) {
        var color = "#e74c3c";
        if (score >= 90) color = "#f39c12";
        else if (score >= 70) color = "#27ae60";
        else if (score >= 50) color = "#f1c40f";
        else if (score >= 25) color = "#e67e22";

        var container = $('<div class="fanbase-bar-track" style="margin-top: 5px;"></div>');
        var fill = $('<div class="fanbase-bar-fill" style="width: ' + score + '%; background-color: ' + color + ';"></div>');
        if (score >= 90) fill.addClass('fran-legendary');
        return container.append(fill);
    }

    function renderTierBadge(tier) {
        var names = ["", "Cult Classic", "Recognized", "Mainstream", "Blockbuster", "Legendary"];
        var stars = "";
        if (tier === 5) stars = " [*****]";
        return $('<span class="fran-tier-badge fran-tier-' + tier + '" style="padding: 2px 8px; border-radius: 0px; font-size: 9pt; font-weight: bold; margin-left: 8px;">' + names[tier] + stars + '</span>');
    }

    function findActiveFranchiseEntryForCurrentGame(game) {
        if (!game) return null;
        if (game.isFranchiseEntry) return { franchiseId: game.franchiseId, entryType: game.entryType, remakeTargetId: game.remakeTargetId };

        if (store.data.activePlayerFranchiseProject) return store.data.activePlayerFranchiseProject;

        if (game.title) {
            var match = game.title.match(/(?:\s*)?\(id(\d+)\)$/i);
            if (match) {
                var numId = parseInt(match[1]);
                if (store.data.franchises) {
                    for (var i = 0; i < store.data.franchises.length; i++) {
                        if (store.data.franchises[i].numId === numId) {
                            return { franchiseId: store.data.franchises[i].id, entryType: "sequel" };
                        }
                    }
                }
            }
        }

        return null;
    }

    function generateInitialStudios() {
        var baseNames = [
            "Electronic Farts", "Microslop", "Ubislopt", "Nintendih", "Sonny",
            "Take-Three", "Actiblizzion", "Square Index", "Crapcom", "Sega Megadrive",
            "BeThesduh", "Epic Fails", "Wavel", "Rockstarving", "CD Projekt Blue",
            "Bungie Jumping", "Naughty Doge", "Insomniac Nap", "Biowarehouse", "Telltall",
            "Konamii", "Bandaiscam", "FromSoftly", "Platinum Bronze", "Kojima Productions (Real)",
            "Respawn Dead", "Infinity Wardrobe", "Treyarchite", "Dicey", "Criterion Missing",
            "Maxiss", "Bullfrogger", "Lionheadache", "Rareware Tearware",
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



    // ========== 04_coreHooks.js ==========
    setInterval(function () {
        if (typeof GameManager === 'undefined' || typeof UI === 'undefined' || !GameManager.company) {
            return;
        }

        if (GameManager.company.gameLog && !GameManager.company.gameLog.find && typeof applyPolyfills === 'function') {
            try { applyPolyfills(GameManager.company.gameLog.constructor.prototype); } catch(e) {}
        }

        tickEconomy();
    }, 1000);

    function tickEconomy() {
        var w = Math.floor(GameManager.company.currentWeek); if (store.data.lastWeekProcessed === w) return; store.data.lastWeekProcessed = w;
        if (!store.data.modGridMigrationV3 && store.data.gridService && store.data.gridService.isActive) {
            store.data.modGridMigrationV3 = true; var gr = store.data.gridService; _da(gr, 'contentLibrary');
            (store.data.mediaProjects || []).forEach(function (p) { if (p.distributionStatus !== 'pending' && !gr.contentLibrary.some(function (e) { return e.mediaProjectId === p.id })) gr.contentLibrary.push(csCreateGridEntry({ mediaProjectId: p.id, title: p.title, type: p.type, score: p.score, isOriginal: true, addedWeek: w, freshness: 0.5 })) });
        }
        if (store.data.gridService && store.data.gridService.isActive && w % 4 === 0) {
            var gr = store.data.gridService;
            var av = (store.data.movieStudios || []).filter(function (s) { return !(store.data.activeCatalogueDeals || []).some(function (d) { return d.studioId === s.id && w < d.endWeek }) });
            if (av.length && Math.random() < Math.min(0.4, 0.05 + gr.subscribers / 5e7)) { 
                var s = av[~~(Math.random() * av.length)];
                var pr = ~~(s.valuation * 0.1 * (0.8 + Math.random() * 0.4)); 
                store.data.pendingInboundDeal = { studioId: s.id, price: pr, expires: w + 8 }; 
                if (typeof csShowInboundDealModal === 'function') {
                    csShowInboundDealModal(s, pr);
                } else {
                    _n('Inbound Deal', s.name + ' offer: $' + UI.getShortNumberString(pr));
                }
            }
        }
        var pg = (GameManager.company || {}).currentGame; if (pg && store.data.disableOverloadMalus) pg.featureOverload = pg.featureOverloadScore = pg.featureOverloadPoints = 0;
        if (pg && !pg.modProcessedCreation) {
            pg.modProcessedCreation = true; var m = store.data.activePlayerFranchiseProject, fId = null;
            if (m) { fId = m.franchiseId; pg.modEntryType = m.entryType; pg.modRemakeTargetId = m.remakeTargetId; pg.modBundleBaseScore = m.bundleBaseScore; pg.modBundledIds = m.bundledIds; store.data.activePlayerFranchiseProject = null; }
            else { var mid = (pg.title || '').match(/\(id(\d+)\)$/i); if (mid) { var frFound = (store.data.franchises || []).filter(function (f) { return f.numId === parseInt(mid[1]) })[0]; if (frFound) fId = frFound.id; } }
            if (fId) {
                pg.modFranchiseId = fId; _d(store.data, 'playerProjectMapping', {}); store.data.playerProjectMapping[pg.id] = { franchiseId: fId, entryType: pg.modEntryType, remakeTargetId: pg.modRemakeTargetId, bundledIds: pg.modBundledIds };
                var fr = getFranchiseById(fId); if (fr) {
                    var bo = (fr.tier >= 2 ? 0.5 : 0) + (fr.tier >= 4 ? 0.5 : 0) + (fr.pendingSoundtrackBonus > 0 ? 0.5 : 0); if (fr.pendingSoundtrackBonus > 0) fr.pendingSoundtrackBonus--;
                    pg.modFranchiseScoreBonus = bo; var pt = ~~(bo * 50) + (pg.modEntryType === 'bundle' && pg.modBundleBaseScore ? ~~(pg.modBundleBaseScore * 60) : 0); pg.designPoints += pt; pg.technologyPoints += pt;
                }
            }
            if (pg.modEntryType === 'expansion') { _d(store.data, 'dlcData', {}); _d(store.data.dlcData, pg.id, { count: 0, activeDLCs: [] }); var rev = 5000; if (pg.sequelTo) { var b = GameManager.company.getGameById(pg.sequelTo); if (b && b.totalSalesCash) rev = Math.max(5000, ~~(b.totalSalesCash / 80)) } store.data.dlcData[pg.id].count++; store.data.dlcData[pg.id].activeDLCs.push({ activeWeeksLeft: 20, weeklyRevenue: rev }); }
            if (pg.title) pg.title = pg.title.replace(/\s*\(id\d+\)$/i, '');
        }
        [processCompetitors, csProcessMediaStudios, processDLCs, processAISales, processAIFranchises, processPublishingProjects, processCampaigns, processFranchisePassiveIncome, processMediaProjects, csProcessStreamingContracts, csProcessTheaterReleases, csProcessGridService, csUpdateAILicensingSystem].forEach(function (fn) { try { fn(); } catch (e) { console.error("[CS] Error in " + (fn.name || "anonymous") + ":", e); } });
        var mapping = store.data.playerProjectMapping || {};
        Object.keys(mapping).forEach(function (id) {
            var pm = mapping[id]; if (pm.processed) return; var g = GameManager.company.gameLog.filter(function (x) { return x.id === id && x.score > 0 })[0];
            if (g) {
                pm.processed = true; var f = getFranchiseById(pm.franchiseId); if (f) onFranchiseEntryComplete(f, { id: 'FE_' + Date.now(), gameId: g.id, title: g.title, score: g.score, type: pm.entryType, releaseWeek: w, revenue: g.totalSalesCash || 0, remakeTargetId: pm.remakeTargetId }, g.score, g.totalSalesCash || 0);
                delete mapping[id]; store.data.activePlayerFranchiseProject = null;
            }
        });
        if (w % 12 === 0 && Math.random() < 0.3) {
            var pool = generateInitialStudios().filter(function (s) { return !store.data.studios.some(function (e) { return e.name === s.name }) });
            if (pool.length) { var ns = pool[~~(Math.random() * pool.length)], sp = { id: 'S_' + Date.now(), name: ns.name, valuation: ~~(Math.random() * 5e6 + 1e6), sharesOwned: 0, currentProject: null, isFounded: false }; store.data.studios.push(sp); _n('New Studio', sp.name + ' entered the market!'); }
        }
        (GameManager.company.gameLog || []).forEach(function (g) {
            if (g.flags && g.flags.isExtensionPack && g.sequelTo && !g.modDlcRevived) { g.modDlcRevived = true; var b = GameManager.company.getGameById(g.sequelTo); if (b && !(b.flags && b.flags.mmo)) { var bo = ~~((g.score || 5) * 2.5e5); GameManager.company.adjustCash(bo, 'DLC Surge'); _n('Storefront Surge', b.title + ' generated $' + UI.getShortNumberString(bo)); } }
            if (g.state === GameState.released && g.modIsPublishingDeal) { _d(g, 'modLastSalesCash', g.totalSalesCash); var de = g.totalSalesCash - g.modLastSalesCash; if (de > 0) { GameManager.company.adjustCash(-de * 0.7, 'Publisher Cut'); g.modLastSalesCash = g.totalSalesCash; } }
            var sc = store.data.coDevScrubMap[g.title]; if (sc) { g.designPoints = Math.max(0, g.designPoints - (sc.design || 0)); g.technologyPoints = Math.max(0, g.technologyPoints - (sc.tech || 0)); delete store.data.coDevScrubMap[g.title]; }
        });
    }



    // ========== 05_franchises.js ==========
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
                        csShowAILicensingModal(offer);
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
        _ae(actions, '<div class="selectorButton greenButton" style="flex: 1; padding: 10px; font-weight: bold; text-align: center;">ACCEPT DEAL</div>').click(function () { csHandleAILicensingResponse('accept', offer); });
        _ae(actions, '<button id="declineOffer" data-action="decline" class="selectorButton redButton" style="flex: 1; padding: 10px; font-weight: bold; text-align: center; border: none; font-family: inherit; font-size: inherit; cursor: pointer;">Refuse</button>').click(function () { csHandleAILicensingResponse('decline', offer); });

        $.modal(modalContent, { 
            overlayClose: true, 
            opacity: 80, 
            overlayCss: { backgroundColor: "#000" }, 
            containerCss: { width: "500px", backgroundColor: "#eee", border: "4px solid #333", padding: "0" } 
        });
    }

    function csHandleAILicensingResponse(response, offerData) {
        if (!offerData) return;

        if (response === 'decline' || response === false) {
            if (typeof UI !== 'undefined' && UI.closeModal) UI.closeModal();
            else if (typeof $ !== 'undefined' && $.modal) $.modal.close();
            if (typeof GameManager !== 'undefined' && GameManager.resume) GameManager.resume(true);
            return;
        }

        if (response === 'accept' || response === true) {
            GameManager.company.adjustCash(offerData.upfront, "IP Licensing Upfront: " + offerData.franchiseName);
            store.data.activeAILicenses.push({
                id: "AL_" + Date.now(),
                studioId: offerData.studioId,
                franchiseId: offerData.franchiseId,
                filmsRemaining: offerData.filmsCount,
                royaltyRate: offerData.royaltyRate,
                totalRoyaltiesEarned: 0
            });
            Sound.click();
        }

        var idx = -1;
        for (var i = 0; i < store.data.aiLicensingOffers.length; i++) {
            if (store.data.aiLicensingOffers[i].id === offerData.id) {
                idx = i;
                break;
            }
        }
        if (idx > -1) store.data.aiLicensingOffers.splice(idx, 1);

        if (typeof UI !== 'undefined' && UI.closeModal) UI.closeModal();
        else if (typeof $ !== 'undefined' && $.modal) $.modal.close();
        if (typeof GameManager !== 'undefined' && GameManager.resume) GameManager.resume(true);
    }



    // ========== 06_media.js ==========
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



    // ========== 07_studios.js ==========
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



    // ========== 08_streaming.js ==========
    function csProcessStreamingContracts() {
        var currentWeek = Math.floor(GameManager.company.currentWeek);
        if (!store.data.streamingPlatforms) return;

        for (var i = 0; i < store.data.streamingPlatforms.length; i++) {
            var platform = store.data.streamingPlatforms[i];

            for (var j = platform.activeDeals.length - 1; j >= 0; j--) {
                var deal = platform.activeDeals[j];
                deal.weeksActive++;

                var weeklyRev = deal.weeklyRevenue || 0;
                GameManager.company.adjustCash(weeklyRev, "Streaming: " + deal.title + " on " + platform.name);

                var mediaProj = csGetMediaProjectById(deal.mediaProjectId);
                if (mediaProj) {
                    mediaProj.totalRevenue = (mediaProj.totalRevenue || 0) + weeklyRev;
                }

                if (deal.weeksActive >= deal.weeksTotal) {
                    if (mediaProj) mediaProj.distributionStatus = "streamingComplete";

                    if (deal.studioId && mediaProj && mediaProj.studioShare) {
                        var studio = getMovieStudioById(deal.studioId);
                        if (studio) {
                            studio.currentDeal = null;
                            studio.totalDealsCompleted++;
                            if (studio.reputation < 5) studio.reputation += 0.1;
                        }
                    }

                    platform.totalDealsCompleted++;
                    platform.playerRelationship = Math.min(100, platform.playerRelationship + 5);
                    _n("Streaming Contract Complete", deal.title + " completed its run on " + platform.name);
                    platform.activeDeals.splice(j, 1);
                }
            }

            if (currentWeek % 4 === 0 && platform.monthlyFee > 0 && platform.activeDeals.length > 0) {
                GameManager.company.adjustCash(-platform.monthlyFee, "Platform Fee: " + platform.name);
            }
        }
    }



    // ========== 09_theater.js ==========
    function csProcessTheaterReleases() {
        var currentWeek = Math.floor(GameManager.company.currentWeek);
        if (!store.data.theaterReleases) return;

        for (var i = store.data.theaterReleases.length - 1; i >= 0; i--) {
            var release = store.data.theaterReleases[i];
            if (release.status !== "active") continue;

            release.weeksActive++;

            var decayFactor = 1.0;
            if (release.weeksActive === 1) decayFactor = 0.55;
            else if (release.weeksActive === 2) decayFactor = 0.60;
            else if (release.weeksActive >= 3 && release.weeksActive <= 5) decayFactor = 0.65;
            else if (release.weeksActive >= 6) decayFactor = 0.70;

            var weeklyGross = 0;
            if (release.weeksActive === 1) {
                weeklyGross = release.peakWeeklyRevenue;
            } else {
                weeklyGross = Math.floor((release.lastWeeklyGross || release.peakWeeklyRevenue) * decayFactor);
            }

            var theaterChain = csGetTheaterChainById(release.theaterChainId);
            var distFee = theaterChain ? theaterChain.distributionFeeRate : 0.5;
            var playerCut = Math.floor(weeklyGross * (1.0 - distFee));

            release.totalBoxOffice += weeklyGross;
            release.playerShare += playerCut;
            release.lastWeeklyGross = weeklyGross;

            GameManager.company.adjustCash(playerCut, "Box Office: " + release.title);

            var mediaProj = csGetMediaProjectById(release.mediaProjectId);
            if (mediaProj) {
                mediaProj.totalRevenue = (mediaProj.totalRevenue || 0) + playerCut;

                if (mediaProj.franchiseId && release.weeksActive % 2 === 0) {
                    var fran = getFranchiseById(mediaProj.franchiseId);
                    if (fran) {
                        fran.fanbaseScore = Math.min(100, fran.fanbaseScore + 2);
                    }
                }
            }

            if (release.weeksActive >= release.maxWeeks || weeklyGross < 100000) {
                release.status = "completed";
                if (theaterChain) theaterChain.activeRelease = null;
                if (mediaProj) mediaProj.distributionStatus = "theaterComplete";

                _n("Theater Run Complete: " + release.title, "Total Box Office: $" + UI.getShortNumberString(release.totalBoxOffice) + " | Your Share: $" + UI.getShortNumberString(release.playerShare));

                if (mediaProj && mediaProj.type === "movie" && mediaProj.franchiseId) {
                    var maxBudget = mediaProj.budget || 5000000;
                    if (release.totalBoxOffice >= maxBudget * 1.5) {
                        var f = getFranchiseById(mediaProj.franchiseId);
                        if (f) {
                            var boxScore = Math.min(10, Math.floor((release.totalBoxOffice / maxBudget) * 3));
                            var synEntry = { type: "movie", id: "FM_" + Date.now(), title: mediaProj.title };
                            onFranchiseEntryComplete(f, synEntry, Math.max(mediaProj.score, boxScore), release.playerShare);
                        }
                    }
                }
            }
        }
    }



    // ========== 10_grid.js ==========
    function csProcessGridService() {
        if (!store.data.gridService || !store.data.gridService.isActive) return;
        var grid = store.data.gridService;
        var currentWeek = Math.floor(GameManager.company.currentWeek);
        if (!Array.isArray(grid.contentLibrary)) grid.contentLibrary = [];
        if (!Array.isArray(grid.revenueHistory)) grid.revenueHistory = [];


        var contentScore = 0;
        for (var i = 0; i < grid.contentLibrary.length; i++) {
            var entry = grid.contentLibrary[i];

            if (typeof entry.score !== "number" || isNaN(entry.score)) entry.score = 5;
            if (typeof entry.addedWeek !== "number" || isNaN(entry.addedWeek)) entry.addedWeek = currentWeek;
            if (typeof entry.totalViews !== "number" || isNaN(entry.totalViews)) entry.totalViews = 0;
            if (typeof entry.freshness !== "number" || isNaN(entry.freshness) || entry.freshness <= 0) entry.freshness = 0.5;


            entry.freshness = Math.max(0.2, entry.freshness * 0.995);


            var eScore = entry.score * entry.freshness * (entry.isOriginal ? 1.5 : 1.0);
            contentScore += eScore;


            entry.viewsThisWeek = Math.floor((grid.subscribers || 0) * 0.03 * (entry.score / 10) * entry.freshness);
            if (isNaN(entry.viewsThisWeek)) entry.viewsThisWeek = 0;
            entry.totalViews += entry.viewsThisWeek;
        }
        contentScore = Math.max(0, isNaN(contentScore) ? 0 : contentScore);


        var marketingBoost = 1.0 + ((grid.marketingBudgetWeekly || 0) / 1000000) * 0.5;
        if (isNaN(marketingBoost) || !isFinite(marketingBoost)) marketingBoost = 1.0;
        grid.pendingMarketing = (grid.pendingMarketing || 0) + (grid.marketingBudgetWeekly || 0);


        var contentGrowthBonus = Math.min(0.05, contentScore / 10000);
        var newSubs = Math.floor((grid.subscribers || 0) * ((grid.subscriberGrowthRate || 0.02) + contentGrowthBonus) * marketingBoost);
        if (isNaN(newSubs)) newSubs = 100;
        newSubs = Math.max(100, newSubs);


        var baseChurn = grid.churnRate || 0.01;
        var churnMultiplier = 1.0;
        if (grid.contentLibrary.length === 0) {
            churnMultiplier = 999;
            newSubs = 0;
        } else if (grid.contentLibrary.length < 3) {
            churnMultiplier = 2.0;
        } else if (grid.contentLibrary.length < 5) {
            churnMultiplier = 1.5;
        }
        var servers = grid.rentedServers || 1;
        var capacity = servers * 1000000;
        
        if ((grid.subscribers || 0) > capacity) {
            grid.overloadTicks = (grid.overloadTicks || 0) + 1;
            churnMultiplier += 5.0; 
        } else {
            grid.overloadTicks = 0;
        }

        if (grid.overloadTicks > 4) {
            _n("Grid Crashed!", "Your servers overloaded for too long! The Grid went offline and users unsubscribed en masse. PR Disaster!");
            grid.subscribers = Math.floor(grid.subscribers * 0.10);
            grid.overloadTicks = 0;
        }

        var churnedSubs = Math.floor((grid.subscribers || 0) * baseChurn * churnMultiplier);
        if (isNaN(churnedSubs)) churnedSubs = 0;


        grid.lastWeekSubscribers = grid.subscribers || 0;
        grid.subscribers = Math.max(0, (grid.subscribers || 0) + newSubs - churnedSubs);
        if (isNaN(grid.subscribers) || !isFinite(grid.subscribers)) grid.subscribers = 0;


        var weeklySubRevenue = Math.floor((grid.subscribers || 0) * ((grid.pricePerMonth || 9.99) / 4));
        if (isNaN(weeklySubRevenue)) weeklySubRevenue = 0;
        grid.weeklyRevenue = weeklySubRevenue;
        if (weeklySubRevenue > 0) {
            grid.pendingRevenue = (grid.pendingRevenue || 0) + weeklySubRevenue;
            grid.totalRevenue = (grid.totalRevenue || 0) + weeklySubRevenue;
            if (isNaN(grid.totalRevenue)) grid.totalRevenue = weeklySubRevenue;
        }

        var costPerServer = Math.max(50000, 150000 - (servers * 500));
        var serverRent = servers * costPerServer;

        grid.weeklyUpkeep = serverRent + 5000;
        if (isNaN(grid.weeklyUpkeep)) grid.weeklyUpkeep = baseUpkeep;
        grid.pendingUpkeep = (grid.pendingUpkeep || 0) + grid.weeklyUpkeep;


        for (var li = grid.contentLibrary.length - 1; li >= 0; li--) {
            var libEntry = grid.contentLibrary[li];
            if (!libEntry.isOriginal && libEntry.licenseCostWeekly > 0) {
                if (libEntry.licenseWeeksRemaining > 0) {
                    grid.pendingLicenses = (grid.pendingLicenses || 0) + libEntry.licenseCostWeekly;
                    libEntry.licenseWeeksRemaining--;
                } else {
                    grid.contentLibrary.splice(li, 1);
                    _n("Grid License Expired", libEntry.title + " has been removed from Grid as its license expired.");
                }
            }
        }


        if (currentWeek % 4 === 0) {
            if (grid.pendingRevenue > 0) {
                GameManager.company.adjustCash(grid.pendingRevenue, "Grid Subscriptions (Monthly)");
                grid.pendingRevenue = 0;
            }
            if (grid.pendingMarketing > 0) {
                GameManager.company.adjustCash(-grid.pendingMarketing, "Grid Marketing (Monthly)");
                grid.pendingMarketing = 0;
            }
            if (grid.pendingUpkeep > 0) {
                GameManager.company.adjustCash(-grid.pendingUpkeep, "Grid Infrastructure Upkeep (Monthly)");
                grid.pendingUpkeep = 0;
            }

            var totalCatMaint = 0;
            if (!store.data.activeCatalogueDeals) store.data.activeCatalogueDeals = [];
            for (var cdi = store.data.activeCatalogueDeals.length - 1; cdi >= 0; cdi--) {
                var cd = store.data.activeCatalogueDeals[cdi];
                if (currentWeek >= cd.endWeek) {
                    store.data.activeCatalogueDeals.splice(cdi, 1);
                } else {
                    totalCatMaint += (cd.weeklyMaintenance * 4);
                }
            }
            if (totalCatMaint > 0) {
                GameManager.company.adjustCash(-totalCatMaint, "Studio Catalogue Maintenance (Monthly)");
            }

            if (grid.pendingLicenses > 0) {
                GameManager.company.adjustCash(-grid.pendingLicenses, "Grid Licenses (Monthly)");
                grid.pendingLicenses = 0;
            }
            if (reportRev > 0 || reportCosts > 0) {
                var net = reportRev - reportCosts;
                var color = net >= 0 ? "#2ecc71" : "#e74c3c";
                var sign = net >= 0 ? "+" : "-";
                var text = sign + "$" + UI.getShortNumberString(Math.abs(net));
                
                var moneyIcon = $('.money').first(); 
                var startX = moneyIcon.length ? moneyIcon.offset().left : $(window).width() - 200;
                var startY = moneyIcon.length ? moneyIcon.offset().top + 50 : 100;
                
                var floating = $('<div style="position:absolute; left:'+startX+'px; top:'+startY+'px; color:'+color+'; font-weight:bold; font-size:18pt; text-shadow:1px 1px 2px black; z-index:9999; pointer-events:none;">'+text+'</div>');
                $('body').append(floating);
                floating.animate({top: startY - 50, opacity: 0}, 3000, function() { floating.remove(); });
            }
        }


        var milestoneMap = [
            { threshold: 10000, prestige: 1 },
            { threshold: 100000, prestige: 2 },
            { threshold: 1000000, prestige: 3 },
            { threshold: 10000000, prestige: 4 },
            { threshold: 50000000, prestige: 5 },
            { threshold: 100000000, prestige: 5 }
        ];
        for (var mi = 0; mi < milestoneMap.length; mi++) {
            var ms = milestoneMap[mi];
            if (!grid["milestone_" + ms.threshold] && grid.subscribers >= ms.threshold) {
                grid["milestone_" + ms.threshold] = true;
                var oldPrestige = grid.prestige;
                grid.prestige = Math.max(grid.prestige, ms.prestige);
                if (grid.prestige > oldPrestige) {
                    _n("Grid Milestone!", "Grid has reached " + UI.getShortNumberString(ms.threshold) + " subscribers! Prestige increased to " + grid.prestige + ".");
                } else {
                    _n("Grid Milestone!", "Grid has reached " + UI.getShortNumberString(ms.threshold) + " subscribers!");
                }
            }
        }


        grid.revenueHistory.push({
            week: currentWeek,
            revenue: weeklySubRevenue,
            subscribers: grid.subscribers,
            churn: churnedSubs,
            growth: newSubs
        });
        if (grid.revenueHistory.length > 12) grid.revenueHistory.shift();
    }

    function processAIFranchises() {
        var currentWeek = Math.floor(GameManager.company.currentWeek);
        var allFrans = store.data.franchises || [];

        for (var i = 0; i < allFrans.length; i++) {
            var f = allFrans[i];


            if (f.ownerId === "player" && f.isListedByPlayer) {
                f.saleWeekRemaining--;
                if (f.saleWeekRemaining <= 0) {
                    var sArrSubs = store.data.studios || [];
                    var s = sArrSubs.filter(function (st) { return st.sharesOwned < 50; });
                    var buyer = s.length > 0 ? s[Math.floor(Math.random() * s.length)] : null;
                    if (buyer) {
                        GameManager.company.adjustCash(f.playerSalePrice, "Franchise Sale: " + f.name);
                        f.ownerId = buyer.id;
                        f.isListedByPlayer = false;
                        if (!f.acquisitionHistory) f.acquisitionHistory = [];
                        f.acquisitionHistory.push({ week: currentWeek, newOwner: buyer.name, price: f.playerSalePrice });
                        _n("Franchise Sold!", buyer.name + " has purchased your '" + f.name + "' franchise for $" + UI.getShortNumberString(f.playerSalePrice));
                    } else {
                        f.isListedByPlayer = false;
                        _n("Franchise Sale Failed", "We couldn't find an eligible buyer for '" + f.name + "'. (No independent studios available)");
                    }
                }
            }

            if (f.ownerId === "player") continue;


            f.fanbaseScore = Math.max(0, f.fanbaseScore - 0.5);
            recalculateFranchiseTier(f);


            if (f.tier >= 2 && !f.isForSale) {
                if (Math.random() < 0.10) {
                    f.isForSale = true;
                    f.salePrice = Math.floor(f.totalRevenue * 0.8 + 2000000);
                }
            }
        }


        var aiFrans = getAIFranchises();
        var studios = store.data.studios;
        for (var j = 0; j < studios.length; j++) {
            var s = studios[j];
            if (s.sharesOwned < 50) {
                var sFrans = aiFrans.filter(function (fr) { return fr.ownerId === s.id; });
                if (sFrans.length > 0 && Math.random() < 0.05) {
                    var targetF = sFrans[Math.floor(Math.random() * sFrans.length)];
                    if (targetF.tier >= 3) {

                        targetF.fanbaseScore = Math.min(100, targetF.fanbaseScore + 5);
                    }
                }
            }
        }
    }

    function processAISales() {
        if (!store.data.activeAIGames) store.data.activeAIGames = [];
        var totalDividends = 0;
        for (var i = store.data.activeAIGames.length - 1; i >= 0; i--) {
            var g = store.data.activeAIGames[i];
            if (typeof g.modSalesWeeks === 'undefined') g.modSalesWeeks = 0;
            if (typeof g.modTotalSalesCash === 'undefined') g.modTotalSalesCash = 0;

            g.modSalesWeeks++;

            g.modCurrentWeeklySales = Math.floor(g.modCurrentWeeklySales * 0.85);
            var weeklyCash = g.modCurrentWeeklySales * getCampaignBoost(g.id);
            g.modTotalSalesCash += weeklyCash;

            if (weeklyCash > 0) {
                var studio = null;
                for (var s = 0; s < store.data.studios.length; s++) {
                    if (store.data.studios[s].id === g.modStudioId) {
                        studio = store.data.studios[s];
                        break;
                    }
                }

                if (g.modIsPublishingDeal) {
                    var cut = weeklyCash * 0.70;
                    if (cut > 0) totalDividends += cut;
                } else if (studio && studio.sharesOwned > 0) {
                    var div = weeklyCash * (studio.sharesOwned / 100);
                    if (div > 0) totalDividends += div;
                }


                if (studio && weeklyCash > 10000) {
                    studio.valuation += Math.floor(weeklyCash * 0.05);
                }
            }

            if (g.modSalesWeeks > 20 || g.modCurrentWeeklySales < 1000) {
                store.data.activeAIGames.splice(i, 1);
            }
        }
        if (totalDividends > 0) {
            GameManager.company.adjustCash(totalDividends, "Subsidiary Dividends");
        }
    }

    var starTiers = {
        1: { hire: 2000, fire: 1000, maint: 200, speed: 0.02, score: 0.2, label: "1-Star" },
        2: { hire: 5000, fire: 2500, maint: 500, speed: 0.05, score: 0.5, label: "2-Star" },
        3: { hire: 15000, fire: 7500, maint: 1500, speed: 0.10, score: 1.0, label: "3-Star" },
        4: { hire: 50000, fire: 25000, maint: 5000, speed: 0.20, score: 1.5, label: "4-Star" },
        5: { hire: 200000, fire: 100000, maint: 15000, speed: 0.40, score: 2.5, label: "5-Star" }
    };

    function ensureStaffObj(studio) {
        if (!studio.staff || typeof studio.staff !== 'object') studio.staff = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        for (var t = 1; t <= 5; t++) if (typeof studio.staff[t] !== 'number') studio.staff[t] = 0;
        if (typeof studio.employees === "number") { studio.staff[2] = (studio.staff[2] || 0) + studio.employees; delete studio.employees; }
        var total = studio.staff[1] + studio.staff[2] + studio.staff[3] + studio.staff[4] + studio.staff[5];
        if (total === 0) {
            var vf = Math.min(2, studio.valuation / 20000000);
            var n = studio.isFounded ? 5 : Math.floor(Math.random() * (5 + Math.floor(vf * 10))) + 5;
            for (var i = 0; i < n; i++) {
                var r = Math.random();
                if (r < Math.max(.05, .2 - vf * .15)) studio.staff[1]++;
                else if (r < Math.max(.1, .6 - vf * .25)) studio.staff[2]++;
                else if (r < Math.max(.2, .85 - vf * .2)) studio.staff[3]++;
                else if (r < Math.min(.99, .95 + vf * .05)) studio.staff[4]++;
                else studio.staff[5]++;
            }
        }
    }



    // ========== 11_competitors.js ==========
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
                            var dlcInfo = (store.data.dlcData && store.data.dlcData.games) ? store.data.dlcData.games[g.id] : null;
                            var count = dlcInfo ? dlcInfo.dlcList.length : 0;
                            return age < 480 && count < 5;
                        });

                        if (games.length > 0) {
                            games.sort(function (a, b) { return (b.totalSalesCash || 0) - (a.totalSalesCash || 0); });
                            var target = games[0];
                            
                            var estRev = Math.floor((target.totalSalesCash || 1500000) * 0.015);
                            var dlcId = "DLC_SUB_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
                            
                            var newDLC = {
                                id: dlcId,
                                baseGameId: target.id,
                                title: target.title,
                                subtitle: "Expansion",
                                theme: "Historical",
                                type: "Expansion Pack",
                                scale: "Medium",
                                allocation: { story: 20, gameplay: 30, graphics: 20, audio: 30 },
                                price: 9.99,
                                marketingStrategy: "None",
                                releaseTiming: "Immediate",
                                devStats: { cost: 500000, marketingCost: 0, weeksInDev: 0, bugs: 0, progress: 0, requiredProgress: 3000 },
                                marketStats: { score: 0, totalSales: 0, totalRevenue: 0, baseGameUnitsAtLaunch: target.unitsSold || 500000 },
                                status: "subsidiary_development",
                                history: { salesOverTime: [], priceHistory: [] }
                            };
                            
                            if (store.data.dlcData && store.data.dlcData.dlcs) {
                                store.data.dlcData.dlcs[dlcId] = newDLC;
                                if (!store.data.dlcData.games[target.id]) store.data.dlcData.games[target.id] = { activeSeasonPass: null, dlcList: [] };
                                store.data.dlcData.games[target.id].dlcList.push(dlcId);
                            }
                            
                            studio.currentProject = {
                                name: target.title + " DLC",
                                isDLC: true,
                                gameId: target.id,
                                dlcId: dlcId,
                                weeksRemaining: 18
                            };
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
            var parts = dateVal.split('/');
            if (parts.length === 3) {
                var y = parseInt(parts[0], 10) || 1;
                var m = parseInt(parts[1], 10) || 1;
                var w = parseInt(parts[2], 10) || 1;
                return (y - 1) * 48 + (m - 1) * 4 + w;
            }
            return 0;
        }
        var activePlats = Platforms.allPlatforms.filter(function (p) {
            var pubWk = parseGameWeek(p.published);
            var retWk = p.retiring ? parseGameWeek(p.retiring) : 999999;
            var isReleased = pubWk <= currentWk;
            var isNotRetired = retWk > currentWk;
            var isCustom = (p.isCustom === true && p.owner === GameManager.company.id);
            return (isReleased && isNotRetired) || isCustom;
        });

        if (activePlats.length === 0) return [Platforms.allPlatforms[0].name];


        activePlats.sort(function (a, b) {
            var scoreA = a.marketShare || 0;
            var scoreB = b.marketShare || 0;

            if (a.isCustom === true && a.owner === GameManager.company.id) scoreA += 100000;
            if (b.isCustom === true && b.owner === GameManager.company.id) scoreB += 100000;

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
            if (proj.dlcId && store.data.dlcData && store.data.dlcData.dlcs[proj.dlcId]) {
                var dlc = store.data.dlcData.dlcs[proj.dlcId];
                dlc.devStats.progress = dlc.devStats.requiredProgress;
                DLCSystem.releaseDLC(dlc);
                _n("Subsidiary DLC Released", studio.name + " finished developing " + dlc.title + "! Review Score: " + dlc.marketStats.score.toFixed(1) + "/10");
            } else {
                if (!store.data.dlcData[proj.gameId]) store.data.dlcData[proj.gameId] = { count: 0, activeDLCs: [] };
                store.data.dlcData[proj.gameId].activeDLCs.push({ activeWeeksLeft: 20, weeklyRevenue: proj.weeklyRevenue });
                _n("Subsidiary DLC Released", studio.name + " finished developing " + proj.name + "! It is now generating revenue.");
            }
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

        // Run the new DLC pipeline logic
        if (typeof DLCSystem !== 'undefined' && DLCSystem.processWeekly) {
            DLCSystem.processWeekly();
        }

        if (store.data.activeMajorExpansion) {
            var exp = store.data.activeMajorExpansion;
            if (exp.weeksRemaining > 0) {
                exp.weeksRemaining--;
                if (exp.weeksRemaining <= 0) {
                    var surge = Math.floor((exp.totalSalesCash || 1500000) * 1.5);
                    if (surge < 5000000) surge = 5000000;
                    GameManager.company.adjustCash(surge, "Expansion Sales: " + exp.gameTitle);
                    _n("Expansion Released!", "Your Major Expansion for " + exp.gameTitle + " has been released to critical acclaim! It generated $" + UI.getShortNumberString(surge) + " in sales!");
                    store.data.activeMajorExpansion = null;
                }
            }
        }

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



    // ========== 12_ui_base.js ==========
    function showModMenu(activeTab, menuType) {
        menuType = menuType || "studios";
        if (menuType === "studios") activeTab = activeTab || "market";
        else activeTab = activeTab || "film_subs";

        Sound.click();

        if ($('#modUI').length > 0) {
            $('#modUI').data('menuType', menuType);
            routeModMenu(activeTab, menuType);
            return;
        }

        var container = $('<div id="modUI" class="windowBorder tallWindow" style="background-color: #eee; border-radius: 0px; color: #2c3e50; padding: 0; display: flex; flex-direction: column; width: 100%; height: 100%; box-sizing: border-box; position: relative; overflow: hidden;"></div>');
        container.data('menuType', menuType);
        var header = $('<div id="modUI_header" style="flex: 0 0 auto; display: flex; flex-wrap: nowrap; gap: 2px; border-bottom: 2px solid #bdc3c7; padding: 12px 40px 0 12px; background-color: #e0e6ed; overflow: hidden; cursor: move; position: relative; border-top-left-radius: 14px; border-top-right-radius: 14px;"></div>');
        container.append(header);

        var xBtn = $('<div style="position: absolute; right: 12px; top: 12px; width: 26px; height: 26px; line-height: 24px; text-align: center; border-radius: 50%; background: #e74c3c; color: white; font-weight: bold; cursor: pointer; font-size: 16pt; z-index: 1000; box-shadow: none;">×</div>');
        xBtn.click(function () { $.modal.close(); });
        xBtn.hover(function () { $(this).css('background', '#c0392b'); }, function () { $(this).css('background', '#e74c3c'); });
        container.append(xBtn);

        var contentArea = $('<div id="modUI_content" style="flex: 1; overflow-y: auto; overflow-x: hidden; padding: 14px; background-color: #eee; box-sizing: border-box; min-height: 0;"></div>');
        container.append(contentArea);

        var closeWrapper = $('<div class="centeredButtonWrapper" style="flex: 0 0 auto; padding: 8px; border-top: 2px solid #bdc3c7; text-align: center;"></div>');
        var closeBtn = $('<div class="okButton selectorButton orangeButton" style="width: 120px; display: inline-block;">Close</div>');
        closeBtn.click(function () { $.modal.close(); });
        closeWrapper.append(closeBtn);
        container.append(closeWrapper);

        container.modal({
            containerId: 'modUI_container',
            overlayClose: false,
            opacity: 60,
            overlayCss: { backgroundColor: "#000" },
            containerCss: {
                width: "900px",
                height: "600px",
                minWidth: "600px",
                minHeight: "400px",
                resize: "both",
                overflow: "hidden",
                backgroundColor: "transparent"
            },
            onShow: function (dialog) {
                if (typeof $.fn.draggable === 'function') {
                    dialog.container.draggable({ handle: "#modUI_header" });
                }
            }
        });

        routeModMenu(activeTab, menuType);
    }

    function routeModMenu(activeTab, menuType) {
        menuType = menuType || $('#modUI').data('menuType') || "studios";
        var header = $('#modUI_header'), contentArea = $('#modUI_content');
        if (header.length === 0 || contentArea.length === 0) return;

        header.empty(); contentArea.empty();

        var TABS = {
            market: { label: "Market", type: "studios", render: renderMarketTab },
            subsidiaries: { label: "Studios", type: "studios", render: renderSubsidiariesTab },
            film_subs: { label: "Film Studios", type: "media", render: csRenderFilmSubsTab },
            film_market: { label: "Film Market", type: "media", render: csRenderFilmMarketTab },
            distribution: { label: "Distribution", type: "media", render: csRenderDistributionTab },
            licensing_review: { label: "Review Offer", type: "media", render: csRenderLicensingReview, hidden: true },
            catalogue_negotiation: { label: "Negotiation", type: "media", render: csRenderCatalogueNegotiation, hidden: true },
            media: { label: "Media", type: "media", render: renderMediaTab },
            publishing: { label: "Publishing", type: "studios", render: renderPublishingTab },
            schedule: { label: "Releases", type: "studios", render: renderScheduleTab },
            leaderboard: { label: "Leaderboard", type: "studios", render: renderLeaderboardTab },
            dlc: { label: "DLCs", type: "studios", render: renderDLCTab },
            franchises: { label: "Franchises", type: "any", render: renderFranchisesTab },
            marketing: { label: "Marketing", type: "studios", render: renderMarketingTab },
            settings: { label: "Settings", type: "studios", render: renderSettingsTab },
            grid_dashboard: { label: "Grid", type: "media", render: csRenderGridDashboard, condition: function () { return store.data.gridService && store.data.gridService.isActive; } },
            distribution_offers: { label: "Offers", type: "media", render: csRenderDistributionOffers, hidden: true }
        };

        Object.keys(TABS).forEach(function (id) {
            var t = TABS[id];
            if (t.hidden || (t.type !== menuType && t.type !== "any")) return;
            if (t.condition && !t.condition()) return;

            var tabStyle = "flex: 1; text-align: center; padding: 6px 2px; cursor: pointer; font-size: 10pt; font-weight: bold; border-top-left-radius: 5px; border-top-right-radius: 5px; border: 2px solid #555; border-bottom: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0;";
            if (id === activeTab) tabStyle += " background-color: #eee; color: #d35400; margin-bottom: -2px; border-bottom: 2px solid #eee;";
            else tabStyle += " background-color: #bdc3c7; color: #7f8c8d;";

            _ae(header, '<div style="' + tabStyle + '">' + t.label + '</div>').click(function () {
                Sound.click(); routeModMenu(id, menuType);
            });
        });

        if (TABS[activeTab]) {
            try { TABS[activeTab].render(contentArea); }
            catch (err) { console.error("[CS] Error rendering tab '" + activeTab + "':", err); }
        }

        setTimeout(function () {
            try {
                csDrawPieCharts();
                contentArea.removeClass('cs-animate-in').addClass('cs-animate-in');
            } catch (e) { }
        }, 10);

        setTimeout(function () {
            $('.gameLogItem').each(function () {
                var title = $(this).find('h3').text().trim(), f = null, frans = store.data.franchises || [];
                for (var i = 0; i < frans.length; i++) {
                    if (frans[i].installments.some(function (inst) { return inst.title === title; })) { f = frans[i]; break; }
                }
                if (f && $(this).find('.mod-franchise-icon').length === 0) {
                    $(this).find('h3').prepend('<span class="mod-franchise-icon" title="Part of the ' + f.name + ' franchise">[F]</span> ');
                }
            });
        }, 100);
    }

    function generateFranchiseTitle(originalTitle, type) {
        var base = originalTitle;
        var cleanBase = base.replace(/ (?:[0-9]+|I+V?X?|Zero|HD|Remake|Remastered|Definitive Edition|Reloaded|Evolution|Origins|Zero|The Day Before|The Day After)$|: .*$/i, "").trim();

        var patterns = {
            sequel: [
                "{base} {n}", "{base} {roman}", "{base}: {sub}", "{base} {sub}", "{base} Reloaded", "{base} Evolution",
                "{base}: The Sequel", "{base} 2.0", "{base}: Next Gen", "{base} Unleashed", "{base}: The Legend Continues",
                "{base}: Resurrection", "{base}: Vengeance", "{base}: Retribution", "{base}: Aftermath", "{base}: The New Chapter",
                "{base}: Part {n}", "{base} II: {sub}", "{base} III: {sub}", "{base}: {sub} {n}", "{base} {n}: {sub}",
                "{base}: Beyond {sub}", "{base}: Rise of {sub}", "{base}: Fall of {sub}", "{base}: Shadow of {sub}",
                "{base}: Legacy of {sub}", "{base}: Heart of {sub}", "{base}: Soul of {sub}", "{base}: Wrath of {sub}",
                "{base}: Judgment of {sub}", "{base}: {sub} Protocol", "{base}: The {sub} Initiative", "{base}: {sub} Rising",
                "{base}: {sub} Falling", "{base}: {sub} Forever", "{base}: {sub} Reborn", "{base}: {sub} Unleashed",
                "{base}: {sub} Chronicles", "{base}: {sub} Legends", "{base}: {sub} Stories", "{base}: {sub} Tales",
                "{base}: Extreme", "{base}: Turbo", "{base}: Ultra", "{base}: Championship Edition", "{base}: Game of the Year",
                "{base}: Directors Cut", "{base}: Special Edition", "{base}: Definitive", "{base}: Anniversary",
                "{base}: The Day After", "{base}: 2 Years Later", "{base}: 10 Years Later", "{base}: The Epic Sequel",
                "{base}: Another Story", "{base}: One More Time", "{base}: Still {base}", "{base}: Return to {base}",
                "{base}: Escape from {base}", "{base}: Battle for {base}", "{base}: Siege of {base}", "{base}: War for {base}"
            ],
            prequel: [
                "{base} 0", "{base} 0.5", "{base}: Zero", "{base}: Origins", "{base}: The Beginning", "{base}: Before the Storm",
                "{base}: The Day Before", "{base}: First Contact", "{base}: Foundations", "{base}: Genesis", "{base}: Prologue",
                "{base}: Ancient Ties", "{base}: The First Year", "{base}: Year One", "{base}: Early Days", "{base}: Before {base}",
                "{base}: The Prehistory", "{base}: The Past", "{base}: Memories", "{base}: Legacy", "{base}: Roots",
                "{base}: {sub} Origins", "{base}: Birth of {sub}", "{base}: The First {sub}", "{base}: Before the {sub}",
                "{base}: {sub} Zero", "{base}: {sub} Prologue", "{base}: The {sub} Prequel", "{base}: {sub} Beginnings"
            ],
            remake: [
                "{base} Remake", "{base}: Reborn", "{base} Modernized", "{base}: Reforged", "{base}: Intergrade", "{base}: Remade",
                "{base}: The Remake", "{base} 2026", "{base} Reimagined", "{base}: Recut", "{base}: Restored", "{base}: Revamped",
                "{base}: Rebuilt", "{base}: Remastered \u0026 Remodelled", "{base}: The Re-release", "{base}: New \u0026 Tasty"
            ],
            remaster: [
                "{base} HD", "{base} Remastered", "{base}: Definitive Edition", "{base}: Enhanced Edition", "{base} 4K",
                "{base}: Special Edition", "{base}: Legendary Edition", "{base}: Gold Edition", "{base}: Ultimate", "{base} Plus",
                "{base}: 60FPS", "{base}: Ray Tracing", "{base}: Next-Gen Version", "{base}: Complete", "{base}: GOTY",
                "{base}: Master Version", "{base}: Final Cut", "{base}: The HD Update", "{base}: Ultimate Experience"
            ],
            reboot: [
                "{base} (Reboot)", "{base}: A New Era", "{base}: Starting Over", "{base}: Reawakening", "{base}: The Return",
                "{base}: Reborn Again", "{base}: Fresh Start", "{base}: The Reboot", "{base}: New Beginnings"
            ],
            spinoff: [
                "Tales of {base}", "{base} Chronicles", "{base} Gaiden", "{base}: Side Story", "{base} Adventure",
                "{base} Tactics", "{base} Quest", "{base}: Legacy", "{base}: Heroes", "{base}: Legends", "{base} Dash",
                "{base}: {sub} Quest", "{base}: {sub} Adventures", "{base}: {sub} Tactics", "{base}: {sub} Heroes",
                "{base} Go", "{base} Run", "{base} Puzzle", "{base} Card Game", "{base} Arena", "{base} Royale",
                "{base}: The {sub} Spinoff", "{base} Pinball", "{base} Kart", "{base} Sports"
            ],
            expansion: [
                "{base}: Expansion", "{base} DLC", "{base}: The Lost Chapters", "{base}: Awakening", "{base}: Overdrive",
                "{base}: Director's Cut", "{base}: New Content", "{base}: Extra Levels", "{base}: The Journey Continues",
                "{base}: Mission Pack", "{base}: Level Pack", "{base}: New Challenges", "{base}: Additional Content",
                "{base}: The {sub} Expansion", "{base}: {sub} Add-on", "{base}: {sub} DLC"
            ],
            bundle: [
                "{base} Collection", "{base}: The Anthology", "{base} Trilogy", "{base}: Complete Edition", "{base}: Ultimate Bundle",
                "{base} Classics", "{base}: Volume 1", "{base}: The Series", "{base}: All Games", "{base} Box Set",
                "{base}: {sub} Pack", "{base} Mega Bundle", "{base}: The {sub} Collection"
            ]
        };

        var subTitles = [
            "Judgment", "Fury", "Rising", "Falling", "Destiny", "Fate", "Honor", "Silence", "Darkness", "Light", "Harmony", "Chaos", "Eternal", "Infinite", "Beyond", "Into the Wild", "Underworld", "Empire", "Kingdom", "Shadows", "Ghosts", "Steel", "Blood", "Tears",
            "Storm", "Thunder", "Ice", "Fire", "Earth", "Air", "Space", "Void", "Infinity", "Eternity", "Death", "Life", "Rebirth", "War", "Peace", "Freedom", "Justice", "Revenge", "Mercy", "Power", "Glory", "Victory", "Defeat", "Sacrifice", "Betrayal", "Love", "Hate",
            "Winter", "Summer", "Autumn", "Spring", "Midnight", "Sunrise", "Sunset", "Daybreak", "Nightfall", "Shadow", "Vision", "Dream", "Nightmare", "Sanity", "Madness", "Reason", "Instinct", "Truth", "Lie", "Code", "Secret", "Enigma", "Mystery", "Oracle", "Prophecy",
            "Star", "Moon", "Sun", "Planet", "Galaxy", "Universe", "Cosmos", "Dimension", "Portal", "Gate", "Island", "Ocean", "River", "Mountain", "Forest", "Desert", "Cave", "City", "Village", "Tower", "Castle", "Fortress", "Bastion", "Citadel", "Sanctuary", "Asylum",
            "Hero", "Villain", "Monster", "God", "Demon", "Angel", "Spirit", "Ghost", "Soul", "Heart", "Mind", "Body", "Machine", "Animal", "Human", "Alien", "Cyborg", "Robot", "Dragon", "Knight", "Mage", "Thief", "King", "Queen", "Prince", "Princess", "Emperor",
            "Blade", "Shield", "Hammer", "Axe", "Spear", "Bow", "Magic", "Science", "Tech", "History", "Future", "Ancient", "Modern", "Legend", "Myth", "Fable", "Story", "Tale", "Epic", "Saga", "Chronicle", "Log", "File", "Data", "Memory", "Dream", "Echo", "Whisper",
            "Cold", "Hot", "Sharp", "Dull", "Hard", "Soft", "Dark", "Bright", "Loud", "Quiet", "Fast", "Slow", "High", "Low", "Near", "Far", "Lost", "Found", "Hidden", "Revealed", "Broken", "Fixed", "Dead", "Alive", "Old", "New", "First", "Last", "Pure", "Corrupt",
            "Alpha", "Beta", "Gamma", "Delta", "Omega", "Sigma", "Zeta", "Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Black", "White", "Grey", "Gold", "Silver", "Bronze", "Steel", "Neon", "Cyber", "Steam", "Clockwork", "Digital", "Analog"
        ];

        var list = patterns[type] || ["{base} {n}"];
        var pattern = list[Math.floor(Math.random() * list.length)];

        var numMatch = base.match(/ ([0-9]+)$/);
        var nextNum = numMatch ? parseInt(numMatch[1]) + 1 : 2;

        var romanMatch = base.match(/ (I+V?X?)$/);
        var nextRoman = "II";
        if (romanMatch) {
            var r = romanMatch[1];
            if (r === "I") nextRoman = "II";
            else if (r === "II") nextRoman = "III";
            else if (r === "III") nextRoman = "IV";
            else if (r === "IV") nextRoman = "V";
            else if (r === "V") nextRoman = "VI";
            else nextRoman = "X";
        }

        return pattern.replace(/{base}/g, cleanBase)
            .replace(/{n}/g, nextNum)
            .replace(/{roman}/g, nextRoman)
            .replace(/{sub}/g, subTitles[Math.floor(Math.random() * subTitles.length)]);
    }

    function getStudioTeamQuality(studio) {
        var quality = 0;
        if (!studio.staff) return 0;
        for (var t = 1; t <= 5; t++) {
            quality += (studio.staff[t] || 0) * (starTiers[t].score || 1);
        }
        return quality;
    }

    function startSubsidiaryFranchiseProject(studio, franchise, entryType, size, bundledIds, bundleBaseScore, remakeTargetId) {
        var bCount = (entryType === "bundle" && bundledIds) ? bundledIds.length : 1;
        var weeks = getEntryTypeWeeks(entryType, size, bCount);
        studio.currentProject = {
            name: (entryType === "bundle" ? "The " + franchise.name + " Collection" : franchise.name + " (" + entryType + ")"),
            isFranchiseEntry: true,
            franchiseId: franchise.id,
            entryType: entryType,
            size: size,
            weeksRemaining: weeks,
            totalWeeks: weeks,
            status: "developing",
            bundledIds: bundledIds,
            bundleBaseScore: bundleBaseScore,
            remakeTargetId: remakeTargetId
        };

        _n("Project Assigned", studio.name + " has started work on the new " + franchise.name + " installment.");
    }

    function showNewEntryModal(f, c, b) {
        c.empty(); var ty = 'sequel', sz = 'Small', bs = [], rem = null, m = _ae(c, '<div style="background:#ddd; padding:0; min-height:400px;"></div>'),
            h = _ae(m, '<div style="background:#d35400; padding:15px; color:white; font-size:14pt; font-weight:bold; display:flex; justify-content:space-between;"><span>New: ' + f.name + '</span><div class="selectorButton" style="font-size:10pt;">BACK</div></div>');
        h.find('.selectorButton').click(b); var bod = _ae(m, '<div style="padding:20px;"></div>'), r1 = _ae(bod, '<div><b>Type:</b><br></div>'), r2 = _ae(bod, '<div style="margin:15px 0;"><b>Size:</b><br></div>'),
            es = _ae(bod, '<div style="background:#eee; padding:10px; border-radius:5px; margin-bottom:15px;">Cost: $<b>0</b> | Score: <b>0-0</b></div>');
        var upE = function () {
            var n = (ty === 'bundle' ? bs.length : 1), cs = getEntryTypeCost(ty, sz, f, n); es.find('b:first').text('$' + UI.getShortNumberString(cs));
            var r = (ty === 'bundle' && bs.length > 0) ? (bs.reduce(function (a, v) { var i = f.installments.filter(function (x) { return x.id === v })[0]; return a + (i ? i.score : 5) }, 0) / bs.length) : estimateFranchiseEntryScore(f, ty, sz, rem).min;
            es.find('b:last').text((r - 1).toFixed(1) + ' - ' + (r + 1).toFixed(1));
        };
        ['sequel', 'remaster', 'remake', 'reboot', 'spinoff', 'prequel', 'expansion', 'bundle'].forEach(function (t) {
            var ok = canAddFranchiseEntry(f, t).ok, x = _ae(r1, '<div class="entry-type-btn" style="background:' + (ok ? '#bdc3c7' : '#eee') + '; color:' + (ok ? '#2c3e50' : '#999') + ';">' + t + '</div>');
            x.click(function () { if (ok) { ty = t; bod.find('.entry-type-btn').css('background', '#bdc3c7'); x.css('background', '#d35400'); upE() } });
        });
        ['Small', 'Medium', 'Large', 'AAA'].forEach(function (s) {
            var x = _ae(r2, '<div class="entry-type-btn" style="background:#bdc3c7;">' + s + '</div>');
            x.click(function () { sz = s; bod.find('.entry-type').css('background', '#bdc3c7'); x.css('background', '#d35400'); upE() });
        });
        _ae(bod, '<div class="selectorButton orangeButton" style="text-align:center; padding:10px 0;">Develop Internally</div>').click(function () {
            var cs = getEntryTypeCost(ty, sz, f, (ty === 'bundle' ? bs.length : 1)); if (GameManager.company.cash < cs) return csNotify('No cash!');
            store.data.activePlayerFranchiseProject = { franchiseId: f.id, entryType: ty, size: sz, bundledIds: bs, remakeTargetId: rem };
            GameManager.company.adjustCash(-cs, 'Franchise: ' + f.name); $.modal.close();
            setTimeout(function () {
                UI.showGameDefinition(GameManager.company); setTimeout(function () {
                    var w = $('#gameDefinition'); if (!w.length) return; w.find('#gameTitle').val(generateFranchiseTitle(f.name, ty));
                    var cG = GameManager.company.currentGame; if (cG) { cG.title = w.find('#gameTitle').val(); cG.gameSize = sz; cG.topic = f.topic; cG.genre = f.genre; }
                    if (UI._updateGameDefinitionCost) UI._updateGameDefinitionCost();
                }, 400);
            }, 300);
        });
        var su = _ae(bod, '<div style="border:1px solid #bdc3c7; padding:10px; margin-top:15px; border-radius:5px;"><b>Subsidiary:</b></div>'),
            ava = (store.data.studios || []).filter(function (s) { return s.sharesOwned >= 50 && !s.currentProject });
        if (!ava.length) _ae(su, '<div style="font-size:8pt; color:#7f8c8d;">No units idle.</div>');
        else {
            var sl = _ae(su, '<select style="width:100% !important; margin-bottom:5px;"></select>'); 
            ava.forEach(function (s) { sl.append('<option value="' + s.id + '">' + s.name + '</option>') });
            makeSelectSearchable(sl);
            _ae(su, '<div class="selectorButton greenButton" style="text-align:center; padding:5px 0; margin-top:5px;">Assign</div>').click(function () {
                startSubsidiaryFranchiseProject(ava.filter(function (x) { return x.id === sl.val() })[0], f, ty, sz, bs, 0); b();
            });
        }
        _ae(bod, '<div class="selectorButton blueButton" style="width:100%; text-align:center; padding:10px 0; margin-top:10px;">Publishing Offer</div>').click(function () { routeModMenu('publishing') });
        upE();
    }

    function showLicenseModal(f, c, b) {
        c.empty(); var ty = 'sequel', sz = 'Small', bs = [], rem = null, m = _ae(c, '<div style="background:#ddd; padding:20px; min-height:400px;"></div>');
        var h = _ae(m, '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;"><h3 style="color:#d35400; margin:0;">License ' + f.name + '</h3><div class="selectorButton" style="font-size:10pt;">BACK</div></div>');
        h.find('.selectorButton').click(b); _ae(m, '<p style="font-size:10pt;">Assign a subsidiary to develop.</p>');
        var subs = (store.data.studios || []).filter(function (s) { return s.sharesOwned >= 50 }); if (!subs.length) return _ae(m, '<p>No units.</p>');
        var sSl = _ae(m, '<select style="width:100%; padding:10px; margin-bottom:10px;"></select>'); 
        subs.forEach(function (s) { sSl.append('<option value="' + s.id + '">' + s.name + (s.currentProject ? ' (Busy)' : ' (Idle)') + '</option>') });
        makeSelectSearchable(sSl);
        var tSl = _ae(m, '<select style="width:100%; padding:10px; margin-bottom:10px;"></select>');
        ['sequel', 'remaster', 'remake', 'spinoff', 'prequel', 'bundle'].forEach(function (t) { if (canAddFranchiseEntry(f, t, true).ok) tSl.append('<option value="' + t + '">' + t.toUpperCase() + '</option>') });
        makeSelectSearchable(tSl);
        var zSl = _ae(m, '<select style="width:100%; padding:10px; margin-bottom:20px;"></select>');
        ['Small', 'Medium', 'Large', 'AAA'].forEach(function (s) { zSl.append('<option value="' + s + '">' + s + '</option>') });
        _ae(m, '<div class="selectorButton greenButton" style="text-align:center; padding:10px 0;">Assign to Studio</div>').click(function () {
            var s = subs.filter(function (x) { return x.id === sSl.val() })[0], ty = tSl.val(), sz = zSl.val(), fee = [5000, 12500, 25000, 50000, 125000][f.tier - 1] || 125000;
            if (GameManager.company.cash < fee) return csNotify('No cash!'); if (s.currentProject && !confirm('Studio busy. Reset?')) return;
            GameManager.company.adjustCash(-fee, 'License Fee: ' + f.name); startSubsidiaryFranchiseProject(s, f, ty, sz, bs, 0, rem); b();
        });
    }

    function showPitchModal(studio, container, onBack) {
        var fans = getPlayerFranchises().filter(function (f) { return f.tier >= 3 });
        if (fans.length === 0) return csNotify("No Tier 3 franchises found!");
        _sm('Pitch: ' + studio.name, 'Studio covers ' + (studio.totalDealsCompleted >= 3 ? "50" : "60") + '% of costs.', function (body, close) {
            var fSl = _ae(body, '<select style="width:100%; padding:10px; margin-bottom:15px;"></select>');
            fans.forEach(function (f) { fSl.append('<option value="' + f.id + '">' + f.name + ' (Tier ' + f.tier + ')</option>') });
            _ae(body, '<div style="font-weight:bold; margin-bottom:5px;">Budget ($):</div>');
            var bIn = _ae(body, '<input type="number" value="2000000" style="width:100%; padding:10px; margin-bottom:15px; border:1px solid #bdc3c7;">');
            _ae(body, '<div class="selectorButton orangeButton" style="text-align:center; padding:12px 0;">Send Pitch</div>').click(function () {
                var f = getFranchiseById(fSl.val()), b = parseInt(bIn.val()), shr = studio.totalDealsCompleted >= 3 ? 0.5 : 0.4, cost = b * shr;
                if (GameManager.company.cash < cost) return csNotify("Not enough cash!");
                var w = Math.min(300, Math.floor(Math.pow(b / 1e5, 0.75)) + 8), p = { id: "MEDIA_" + Date.now(), type: "movie", franchiseId: f.id, title: f.name + " Blockbuster", producedBy: studio.id, budget: b, playerCost: cost, weeksRemaining: w, totalWeeks: w, status: "inProduction", score: 0, totalRevenue: 0, weeklyRevenue: 0, currentEpisode: 0, totalEpisodes: 1, decayRate: 0.9, studioRepBonus: studio.reputation * 0.3, studioShare: 1.0 - shr };
                studio.currentDeal = p; _da(store.data, 'mediaProjects'); store.data.mediaProjects.push(p); _da(f, 'mediaProperties');
                GameManager.company.adjustCash(-cost, "Co-Production: " + p.title); Sound.click(); close(); onBack();
            });
        });
    }

    function showCrossoverModal(container, onBack) {
        var w = Math.floor(GameManager.company.currentWeek);
        if (w - store.data.lastCrossoverWeek < 20) return csNotify("Cooldown: " + (20 - (w - store.data.lastCrossoverWeek)) + "w.");
        _sm('Legendary Crossover', 'Combine two Tier 5s for $3M!', function (body, close) {
            var f5s = getPlayerFranchises().filter(function (f) { return f.tier === 5 }), s1 = _ae(body, '<select style="width:45%; padding:10px;"></select>'), s2 = _ae(body, '<select style="width:45%; padding:10px; margin-left:5%;"></select>');
            f5s.forEach(function (f, i) { s1.append('<option value="' + f.id + '">' + f.name + '</option>'); s2.append('<option value="' + f.id + '" ' + (i === 1 ? "selected" : "") + '>' + f.name + '</option>') });
            _ae(body, '<div class="selectorButton orangeButton" style="text-align:center; padding:12px 0; margin-top:20px;">Launch Event</div>').click(function () {
                var f1 = getFranchiseById(s1.val()), f2 = getFranchiseById(s2.val());
                if (f1.id === f2.id) return csNotify("Select 2 different franchises.");
                if (GameManager.company.cash < 3e6) return csNotify("Needs $3M!");
                GameManager.company.adjustCash(-3e6, "Crossover: " + f1.name + " x " + f2.name); store.data.lastCrossoverWeek = w;
                var s = Math.min(10, Math.floor((f1.fanbaseScore + f2.fanbaseScore) / 20)), r = s * s * 5e6;
                GameManager.company.adjustCash(r, "Crossover Revenue"); f1.fanbaseScore = Math.min(100, f1.fanbaseScore + 10); f2.fanbaseScore = Math.min(100, f2.fanbaseScore + 10);
                _n("Phenomenon!", f1.name + " & " + f2.name + " merging sent shockwaves!"); close(); onBack();
            });
        });
    }


    function showConfirmSellModal(f, onBack, onConfirm) {
        _sm('Sell Franchise?', 'Listing ' + f.name + ' will take 8-16 weeks. Sure?', function (body, close) {
            _ae(body, '<div style="padding:20px; text-align:center;"><div class="selectorButton orangeButton" style="margin-bottom:10px; padding:10px 0;">Yes, List it</div></div>').click(function () { onConfirm(); close(); onBack(); });
        });
    }

    function makeTabBar(tabs, currentId, onClick) {
        var bar = $('<div style="display:flex;gap:10px;margin-bottom:20px;border-bottom:2px solid #bdc3c7;padding-bottom:10px;"></div>');
        tabs.forEach(function (t) {
            var active = (t.id === currentId);
            var btn = $('<div class="entry-type-btn ' + (active ? 'selected ' : '') + '" style="background:' + (active ? '#d35400' : '#bdc3c7') + ';color:white;flex:1;text-align:center;">' + t.label + '</div>');
            btn.click(function () { Sound.click(); onClick(t.id); });
            bar.append(btn);
        });
        return bar;
    }



    // ========== 13_ui_franchises.js ==========
    function renderFranchisesTab(container) {
        var subTab = "my";

        function refresh() {
            container.empty();


            var subHeader = makeTabBar([
                { id: "my", label: "My Franchises" },
                { id: "register", label: "Create / Register" },
                { id: "acquisitions", label: "Acquisitions" },
                { id: "proposals", label: "Proposals" }
            ], subTab, function (id) { subTab = id; refresh(); });

            var tier5s = getPlayerFranchises().filter(function (f) { return f.tier === 5; });
            if (tier5s.length >= 2) {
                var crossBtn = $('<div class="entry-type-btn fran-tier-5" style="border: 2px solid gold; flex: 1; text-align: center; cursor: pointer;">[ CROSSOVER ]</div>');
                crossBtn.click(function () { showCrossoverModal(container, refresh); });
                subHeader.append(crossBtn);
            }

            container.append(subHeader);

            if (subTab === "my") {
                var fans = getPlayerFranchises();
                if (fans.length === 0) _ae(container, '<div style="text-align: center; padding: 40px; color: #7f8c8d; font-style: italic;">You don\'t own any franchises yet. Go to "Create / Register" to start one!</div>');
                
                if (fans.length > 5) {
                    var $search = csRenderSearchBar("Search my " + fans.length + " franchises...", function(val) {
                        container.find('.cs-franchise-card').each(function() {
                            var name = $(this).find('.cs-fran-name').val() || "";
                            $(this).toggle(name.toLowerCase().indexOf(val) > -1);
                        });
                    });
                    container.append($search);
                }

                fans.forEach(function (f) {
                    var card = _ae(container, '<div class="cs-stagger-item cs-franchise-card" style="background:white; border-radius:8px; border:1px solid #bdc3c7; padding:15px; margin-bottom:15px; box-shadow:0 2px 4px rgba(0,0,0,0.05);"></div>');
                    var header = _ae(card, '<div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;"></div>');
                    _ae(header, '<input type="text" class="cs-fran-name" value="' + f.name + '" style="font-size:14pt; font-weight:bold; border:none; background:transparent; color:#2c3e50; border-bottom:1px dashed #bdc3c7; width:60%;">').change(function () { f.name = $(this).val(); });
                    header.append(renderTierBadge(f.tier));
                    _ae(card, '<div style="display:flex; gap:20px; font-size:10pt; color:#7f8c8d; margin-bottom:10px;"><div><b>Total Revenue:</b> $' + UI.getShortNumberString(f.totalRevenue) + '</div><div><b>Installments:</b> ' + f.installments.length + '</div></div>');
                    card.append('<div style="font-size:9pt; font-weight:bold; color:#34495e; margin-bottom:4px;">Fanbase Score: ' + Math.floor(f.fanbaseScore) + '/100</div>').append(renderFanbaseBar(f.fanbaseScore));
                    var actions = _ae(card, '<div style="display:flex; gap:10px; margin-top:15px;"></div>');
                    _ae(actions, '<div class="selectorButton orangeButton" style="flex:1; text-align:center; font-size:10pt; padding:6px 0;">+ New Entry</div>').click(function () { showNewEntryModal(f, container, refresh); });
                    _ae(actions, '<div class="selectorButton greenButton" style="flex:1; text-align:center; font-size:10pt; padding:6px 0;">License to Subsidiary</div>').click(function () { showLicenseModal(f, container, refresh); });
                    if (f.fanbaseScore <= 0) {
                        _ae(actions, '<div class="selectorButton" style="flex:1; text-align:center; font-size:10pt; padding:6px 0; background:#95a5a6; color:white;">Revive ($1M)</div>').click(function () {
                            if (GameManager.company.cash < 1e6) { csNotify("Not enough cash!"); return; }
                            GameManager.company.adjustCash(-1e6, "Franchise Revival: " + f.name);
                            f.fanbaseScore = 15; f.isDead = false; Sound.click(); refresh();
                        });
                    }
                    var sellPrice = Math.floor(f.totalRevenue * 0.6 + 1e6);
                    var sellBtn = _ae(actions, '<div class="selectorButton deleteButton" style="flex:1; text-align:center; font-size:10pt; padding:6px 0;">' + (f.isListedByPlayer ? "Listed (" + f.saleWeekRemaining + "w)" : "Sell") + '</div>');
                    if (f.isListedByPlayer) sellBtn.addClass('disabled');
                    sellBtn.click(function () {
                        if (f.isListedByPlayer) return;
                        showConfirmSellModal(f, refresh, function () {
                            f.isListedByPlayer = true; f.playerSalePrice = sellPrice; f.saleWeekRemaining = 8 + Math.floor(Math.random() * 9);
                            Sound.click();
                        });
                    });
                    var histBtn = _ae(card, '<div style="text-align:center; font-size:9pt; color:#3498db; cursor:pointer; margin-top:10px; text-decoration:underline;">View History</div>');
                    var histList = _ae(card, '<div style="display:none; margin-top:10px; border-top:1px solid #eee; padding-top:10px;"></div>');
                    f.installments.slice().reverse().forEach(function (inst) {
                        _ae(histList, '<div style="font-size:9pt; display:flex; justify-content:space-between; margin-bottom:4px;"><span>' + inst.title + ' (' + inst.type + ')</span><span>' + inst.score + '/10</span></div>');
                    });
                    histBtn.click(function () { histList.toggle(); });
                });
            } else if (subTab === "register") {
                container.append('<h3 style="color: #d35400; margin-top: 0;">Register New Franchise</h3>');
                container.append('<p style="font-size: 10pt; color: #7f8c8d;">Turn a successful standalone game into a full franchise. Standard registration cost: $500,000 per existing franchise.</p>');

                var games = GameManager.company.gameLog.filter(function (g) { return !getFranchiseForGame(g.id); });
                var cost = 500000 * (getPlayerFranchises().length + 1);

                if (games.length === 0) {
                    container.append('<div style="padding: 20px; text-align: center; color: #7f8c8d;">No eligible games found.</div>');
                } else {
                    var select = $('<select style="width: 100%; padding: 10px; border-radius: 0px; border: 2px solid #555; font-size: 11pt; margin-bottom: 15px; color: black;"></select>');
                    games.forEach(function (g) { select.append('<option value="' + g.id + '">' + g.title + ' (Score: ' + g.score + ')</option>'); });
                    container.append(select);
                    makeSelectSearchable(select);

                    container.append('<div style="font-weight: bold; margin-bottom: 5px;">Franchise Name:</div>');
                    var nameInput = $('<input type="text" placeholder="Enter Name" style="width: 100%; padding: 10px; border-radius: 0px; border: 2px solid #555; font-size: 11pt; margin-bottom: 15px; color: black;">');
                    container.append(nameInput);

                    var regBtn = $('<div class="selectorButton orangeButton" style="text-align: center; padding: 12px 0; font-size: 12pt; font-weight: bold;">Register for $' + UI.getShortNumberString(cost) + '</div>');
                    regBtn.click(function () {
                        var game = GameManager.company.getGameById(select.val());
                        if (!game) return;
                        var name = nameInput.val() || game.title;
                        var fransArr = store.data.franchises || [];
                        var exists = fransArr.some(function (fr) { return fr.name.toLowerCase() === name.toLowerCase(); });
                        if (exists) { csNotify("A franchise with this name already exists!"); return; }

                        if (GameManager.company.cash < cost) { csNotify("Not enough cash!"); return; }
                        store.data.lastFranchiseNumId = (store.data.lastFranchiseNumId || 0) + 1;
                        var f = {
                            id: "FRAN_" + Date.now() + "_" + Math.floor(Math.random() * 100000),
                            numId: store.data.lastFranchiseNumId,
                            name: name,
                            ownerId: "player",
                            originGameId: game.id,
                            originGameTitle: game.title,
                            topic: game.topic.name,
                            genre: game.genre.name,
                            tier: 1,
                            totalRevenue: game.totalSalesCash,
                            installments: [{
                                id: "FE_" + Date.now() + "_" + Math.floor(Math.random() * 100000),
                                type: "original",
                                title: game.title,
                                gameId: game.id,
                                producedBy: "player",
                                score: game.score,
                                revenue: game.totalSalesCash,
                                releaseWeek: game.releaseWeek,
                                size: "N/A"
                            }],
                            fanbaseScore: Math.min(100, game.score * 7),
                            lastEntryWeek: game.releaseWeek,
                            isForSale: false,
                            salePrice: 0,
                            licenseOffers: [],
                            acquisitionHistory: [],
                            mediaProperties: []
                        };
                        store.data.franchises.push(f);
                        GameManager.company.adjustCash(-cost, "Franchise Registration: " + f.name);
                        Sound.click();
                        subTab = "my";
                        refresh();
                    });
                    container.append(regBtn);
                }
            } else if (subTab === "acquisitions") {
                var forSale = getAIFranchises().filter(function (f) { return f.isForSale; });
                container.append('<h3 style="color: #d35400; margin-top: 0;">Available for Acquisition</h3>');
                if (forSale.length === 0) {
                    container.append('<div style="text-align: center; padding: 40px; color: #7f8c8d;">No franchises currently listed for sale by competitors.</div>');
                }
                forSale.forEach(function (f) {
                    var card = $('<div class="cs-stagger-item" style="background: white; border-radius: 0px; border: 2px solid #555; padding: 15px; margin-bottom: 15px; box-shadow: none;"></div>');
                    card.append('<div style="display: flex; justify-content: space-between;"><b>' + f.name + '</b>' + renderTierBadge(f.tier).prop('outerHTML') + '</div>');
                    var sArrAcq = store.data.studios || [];
                    var owner = sArrAcq.filter(function (s) { return s.id === f.ownerId; })[0];
                    card.append('<div style="font-size: 9pt; color: #7f8c8d; margin-top: 5px;">Seller: ' + (owner ? owner.name : "Unknown") + '</div>');
                    card.append('<div style="font-size: 10pt; margin-top: 10px;">Price: <b>$' + UI.getShortNumberString(f.salePrice) + '</b></div>');

                    var buyBtn = $('<div class="selectorButton greenButton" style="width: 100%; text-align: center; margin-top: 12px; padding: 8px 0;">Acquire Franchise</div>');
                    buyBtn.click(function () {
                        if (GameManager.company.cash < f.salePrice) { csNotify("Not enough cash!"); return; }
                        GameManager.company.adjustCash(-f.salePrice, "Franchise Acquisition: " + f.name);
                        f.ownerId = "player";
                        f.isForSale = false;
                        if (!f.acquisitionHistory) f.acquisitionHistory = [];
                        f.acquisitionHistory.push({ week: Math.floor(GameManager.company.currentWeek), newOwner: "player", price: f.salePrice });
                        Sound.click();
                        refresh();
                    });
                    card.append(buyBtn);
                    container.append(card);
                });


                var aiOffers = store.data.franchises.filter(function (f) { return f.ownerId !== "player" && f.isForSale; });
                if (aiOffers.length > 0) {
                    container.append('<h3 style="color: #d35400; margin-top: 0;">Active AI Sale Offers</h3>');
                    aiOffers.forEach(function (f) {
                        var salePrice = f.salePrice || (f.totalRevenue * 0.8 + 2000000);
                        var offerCard = $('<div class="cs-stagger-item" style="background: white; border-radius: 0px; border: 2px solid #555; padding: 15px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;"></div>');
                        var owner = (store.data.studios || []).filter(function (s) { return s.id === f.ownerId; })[0];
                        var info = $('<div><b style="font-size: 13pt;">' + f.name + '</b><br><span style="font-size: 9pt; color: #7f8c8d;">Owner: ' + (owner ? owner.name : "AI") + ' | Tier: ' + f.tier + '</span></div>');
                        offerCard.append(info);

                        var buyBtn = $('<div class="selectorButton greenButton" style="padding: 10px 20px; font-weight: bold;">Buy ($' + UI.getShortNumberString(salePrice) + ')</div>');
                        buyBtn.click(function () {
                            if (GameManager.company.cash < salePrice) { csNotify("Not enough cash!"); return; }
                            GameManager.company.adjustCash(-salePrice, "Acquired Franchise: " + f.name);
                            f.ownerId = "player";
                            f.isForSale = false;
                            if (!f.acquisitionHistory) f.acquisitionHistory = [];
                            f.acquisitionHistory.push({ week: Math.floor(GameManager.company.currentWeek), newOwner: "player", price: salePrice });
                            _n("Acquisition Complete!", "You are now the proud owner of the " + f.name + " franchise.");
                            refresh();
                        });
                        offerCard.append(buyBtn);
                        container.append(offerCard);
                    });
                }


                container.append('<h3 style="color: #d35400; ' + (aiOffers.length > 0 ? "margin-top: 30px;" : "margin-top:0;") + '">Propose Custom Offer</h3>');
                var unlisted = getAIFranchises().filter(function (f) { return !f.isForSale; });
                if (unlisted.length === 0) {
                    container.append('<div style="text-align: center; color: #7f8c8d; padding: 20px;">No other AI franchises available for offer.</div>');
                } else {
                    var offerDiv = $('<div style="background: white; border-radius: 0px; border: 2px solid #555; padding: 15px;"></div>');
                    var fSelect = $('<select style="width: 100%; padding: 10px; margin-bottom: 15px; color: black; border: 2px solid #555;"></select>');
                    unlisted.forEach(function (f) {
                        var sArrUnl = store.data.studios || [];
                        var owner = sArrUnl.filter(function (s) { return s.id === f.ownerId; })[0];
                        fSelect.append('<option value="' + f.id + '">' + f.name + ' (' + (owner ? owner.name : "AI") + ')</option>');
                    });
                    offerDiv.append('<div style="font-size: 9pt; font-weight: bold; margin-bottom: 5px;">Select Target:</div>').append(fSelect);

                    var priceInput = $('<input type="number" placeholder="Offer Amount ($)" style="width: 100%; padding: 10px; margin-bottom: 15px; color: black; border: 2px solid #555;">');
                    offerDiv.append('<div style="font-size: 9pt; font-weight: bold; margin-bottom: 5px;">Your Offer (Weight based on revenue):</div>').append(priceInput);

                    var offerBtn = $('<div class="selectorButton orangeButton" style="width: 100%; text-align: center; padding: 12px 0; font-weight: bold;">Submit Proactive Offer</div>');
                    offerBtn.click(function () {
                        var f = getFranchiseById(fSelect.val());
                        var price = parseInt(priceInput.val());
                        if (isNaN(price) || price <= 0) { csNotify("Invalid price!"); return; }
                        if (GameManager.company.cash < price) { csNotify("Not enough cash!"); return; }


                        var thresh = f.totalRevenue * 1.5 + 2000000;
                        if (price >= thresh && Math.random() < 0.40) {
                            GameManager.company.adjustCash(-price, "Acquisition: " + f.name);
                            f.ownerId = "player";
                            f.isForSale = false;
                            _n("Offer Accepted!", "The studio accepted your proactive offer for '" + f.name + "'.");
                            refresh();
                        } else {
                            csNotify("The studio has rejected your offer.");
                        }
                    });
                    offerDiv.append(offerBtn);
                    container.append(offerDiv);
                }
            } else if (subTab === "proposals") {
                container.append('<h3 style="color: #d35400; margin-top: 0;">Licensing Proposals</h3>');
                container.append('<p style="font-size: 10pt; color: #7f8c8d; margin-bottom: 20px;">Unowned studios may periodically approach you to license your franchises. These offers expire if not reviewed.</p>');

                var offers = store.data.aiLicensingOffers || [];
                if (offers.length === 0) {
                    container.append('<div style="text-align: center; padding: 40px; color: #7f8c8d; font-style: italic;">No active licensing proposals. Keep building Tier 2+ franchises to attract studio interest!</div>');
                } else {
                    offers.forEach(function (o) {
                        var card = $('<div style="background: white; border-radius: 0px; border: 2px solid #555; padding: 15px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; box-shadow: none;"></div>');
                        var info = $('<div></div>');
                        info.append('<div style="font-weight: bold; font-size: 11pt; color: #d35400;">' + o.franchiseName + '</div>');
                        info.append('<div style="font-size: 9pt; color: #2c3e50;">From: <b>' + o.studioName + '</b></div>');
                        info.append('<div style="font-size: 9pt; color: #7f8c8d; margin-top: 4px;">Upfront: <b>$' + UI.getShortNumberString(o.upfront) + '</b> | Royalty: <b>' + (o.royaltyRate * 100).toFixed(0) + '%</b></div>');
                        card.append(info);

                        var revBtn = $('<div class="selectorButton orangeButton" style="padding: 8px 15px; font-weight: bold;">Review Offer</div>');
                        revBtn.click(function () {
                            csShowAILicensingModal(o);
                        });
                        card.append(revBtn);
                        container.append(card);
                    });
                }
            }
        }


        refresh();
    }



    // ========== 14_ui_media.js ==========
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



    // ========== 15_ui_market.js ==========
    function renderMarketTab(container) {
        var sArr = store.data.studios || [];
        var studios = sArr.filter(function (s) { return s.sharesOwned < 50 && !s.isFounded; });

        var sortPref = store.data.modSortPref || "owned";
        function getE(s) { ensureStaffObj(s); return (s.staff[1] || 0) + (s.staff[2] || 0) + (s.staff[3] || 0) + (s.staff[4] || 0) + (s.staff[5] || 0); }
        function getQ(s) { ensureStaffObj(s); return ((s.staff[1] || 0) * 0.2) + ((s.staff[2] || 0) * 0.5) + ((s.staff[3] || 0) * 1.0) + ((s.staff[4] || 0) * 1.5) + ((s.staff[5] || 0) * 2.5); }
        function getG(s) {
            var max = 0;
            if (store.data.releaseHistory) {
                for (var j = 0; j < store.data.releaseHistory.length; j++) {
                    var h = store.data.releaseHistory[j];
                    if (h.studioName === s.name && h.score > max) max = h.score;
                }
            }
            return max;
        }

        studios.sort(function (a, b) {
            if (sortPref === "val") return b.valuation - a.valuation;
            if (sortPref === "emps") return getE(b) - getE(a);
            if (sortPref === "quality") return getQ(b) - getQ(a);
            if (sortPref === "games") return getG(b) - getG(a);
            return b.sharesOwned - a.sharesOwned;
        });

        var sortContainer = $('<div style="display: flex; gap: 8px; margin-bottom: 12px; align-items: center;"></div>');
        sortContainer.append('<div style="font-size: 11pt; color: #2c3e50; font-weight: bold;">Sort:</div>');
        var sortSelect = $('<select style="font-size: 11pt; flex: 1; padding: 4px; color: black; border: 2px solid #555; border-radius: 0px; box-sizing: border-box;"></select>');
        sortSelect.append('<option value="owned">Ownership (Default)</option>');
        sortSelect.append('<option value="val">Valuation</option>');
        sortSelect.append('<option value="emps">Total Employees</option>');
        sortSelect.append('<option value="quality">Highest Quality Team</option>');
        sortSelect.append('<option value="games">Best Released Game Score</option>');
        sortSelect.val(sortPref);
        sortSelect.change(function () {
            store.data.modSortPref = $(this).val();
            routeModMenu("market");
        });
        sortContainer.append(sortSelect);
        makeSelectSearchable(sortSelect);
        container.append(sortContainer);

        for (var i = 0; i < studios.length; i++) {
            (function (studio) {
                var item = buildStudioCard(studio);
                container.append(item);
            })(studios[i]);
        }
    }

    function csDrawPieCharts() {
        $('.pieChartCanvas').each(function () {
            var c = this;
            var ctx = c.getContext("2d");
            var shares = parseInt($(this).attr('data-shares'), 10) || 0;
            var centerX = 25;
            var centerY = 25;
            var outerR = 22;
            var innerR = 14;

            var sName = $(this).attr('data-name') || "?";
            var initials = sName.split(' ').map(function (w) { return w[0]; }).join('').substring(0, 2).toUpperCase();

            ctx.clearRect(0, 0, 50, 50);

            ctx.beginPath();
            ctx.arc(centerX, centerY, outerR, 0, 2 * Math.PI, false);
            ctx.fillStyle = "#dfe6e9";
            ctx.fill();

            if (shares > 0) {
                var startAngle = -0.5 * Math.PI;
                var endAngle = startAngle + (shares / 100) * 2 * Math.PI;
                ctx.beginPath();
                ctx.arc(centerX, centerY, outerR, startAngle, endAngle, false);
                ctx.arc(centerX, centerY, innerR, endAngle, startAngle, true);
                ctx.closePath();
                ctx.fillStyle = shares >= 50 ? "#e74c3c" : "#e67e22";
                ctx.fill();
            }

            ctx.beginPath();
            ctx.arc(centerX, centerY, innerR, 0, 2 * Math.PI, false);
            ctx.fillStyle = "#ffffff";
            ctx.fill();

            ctx.fillStyle = "#2c3e50";
            ctx.font = "bold 11px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(initials, centerX, centerY);
        });
    }



    // ========== 16_ui_subsidiaries.js ==========
    function renderSubsidiariesTab(container) {
        var sArr2 = store.data.studios || [];
        var studios = sArr2.filter(function (s) { return s.sharesOwned >= 50 || s.isFounded; });

        var sortPref = store.data.modSortPref || "owned";
        function getE(s) { ensureStaffObj(s); return (s.staff[1] || 0) + (s.staff[2] || 0) + (s.staff[3] || 0) + (s.staff[4] || 0) + (s.staff[5] || 0); }
        function getQ(s) { ensureStaffObj(s); return ((s.staff[1] || 0) * 0.2) + ((s.staff[2] || 0) * 0.5) + ((s.staff[3] || 0) * 1.0) + ((s.staff[4] || 0) * 1.5) + ((s.staff[5] || 0) * 2.5); }
        function getG(s) {
            var max = 0;
            if (store.data.releaseHistory) {
                for (var j = 0; j < store.data.releaseHistory.length; j++) {
                    var h = store.data.releaseHistory[j];
                    if (h.studioName === s.name && h.score > max) max = h.score;
                }
            }
            return max;
        }

        studios.sort(function (a, b) {
            if (sortPref === "val") return b.valuation - a.valuation;
            if (sortPref === "emps") return getE(b) - getE(a);
            if (sortPref === "quality") return getQ(b) - getQ(a);
            if (sortPref === "games") return getG(b) - getG(a);
            return b.sharesOwned - a.sharesOwned;
        });

        var foundBtn = $('<div id="btnFoundStudio" class="selectorButton orangeButton" style="display: block; width: 220px; margin: 0 auto 12px auto; text-align: center; font-size: 11pt;">Found New Studio ($5M)</div>');
        foundBtn.click(foundNewStudio);
        container.append(foundBtn);

        var sortContainer = $('<div style="display: flex; gap: 8px; margin-bottom: 12px; align-items: center;"></div>');
        sortContainer.append('<div style="font-size: 11pt; color: #2c3e50; font-weight: bold;">Sort:</div>');
        var sortSelect = $('<select style="font-size: 11pt; flex: 1; padding: 4px; color: black; border: 2px solid #555; border-radius: 0px; box-sizing: border-box;"></select>');
        sortSelect.append('<option value="owned">Ownership (Default)</option>');
        sortSelect.append('<option value="val">Valuation</option>');
        sortSelect.append('<option value="emps">Total Employees</option>');
        sortSelect.append('<option value="quality">Highest Quality Team</option>');
        sortSelect.append('<option value="games">Best Released Game Score</option>');
        sortSelect.val(sortPref);
        sortSelect.change(function () {
            store.data.modSortPref = $(this).val();
            routeModMenu("subsidiaries");
        });
        sortContainer.append(sortSelect);
        makeSelectSearchable(sortSelect);
        container.append(sortContainer);

        if (studios.length === 0) {
            container.append('<div style="font-size: 12pt; text-align: center; margin-top: 30px; color: #7f8c8d;">You do not own any controlling stakes in studios.</div>');
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
        var createBtn = $('<div class="selectorButton orangeButton" style="display: block; width: 220px; margin: 0 auto 12px auto; text-align: center; font-size: 11pt;">Post Publishing Deal</div>');
        createBtn.click(function () {
            renderPublishingForm(container);
        });
        container.append(createBtn);

        var offers = store.data.publishingOffers || [];
        if (offers.length === 0 && (!store.data.publishingProjects || store.data.publishingProjects.length === 0)) {
            container.append('<div style="font-size: 12pt; text-align: center; margin-top: 30px; color: #7f8c8d;">You have no active publishing deals on the market.</div>');
            return;
        }

        container.append('<div style="font-size: 11pt; margin-bottom: 12px; text-align: center; color: #7f8c8d;">Studios evaluate your offers weekly. Once accepted, you receive 30% of gross revenue!</div>');


        if (store.data.publishingProjects && store.data.publishingProjects.length > 0) {
            container.append('<h3 style="color: #d35400; text-align: center; margin-top: 16px; font-size: 12pt;">Ongoing Publishing Projects</h3>');
            var pProjects = store.data.publishingProjects || [];
            pProjects.forEach(function (project) {
                var studio = null;
                for (var kIdx = 0; kIdx < store.data.studios.length; kIdx++) {
                    if (store.data.studios[kIdx].id === project.studioId) {
                        studio = store.data.studios[kIdx];
                        break;
                    }
                }
                var studioName = studio ? studio.name : "Unknown Studio";
                var item = $('<div class="cs-stagger-item" style="background-color: #fff; padding: 12px; margin-bottom: 12px; border-radius: 6px; display: flex; align-items: center; box-shadow: 0 1px 4px rgba(0,0,0,0.15);"></div>');
                var details = $('<div style="flex-grow: 1; min-width: 0;"></div>');
                details.append('<h3 style="margin: 0; font-size: 12pt; color: #2980b9; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Project: ' + project.size + ' ' + project.genre + ' by ' + studioName + '</h3>');
                details.append('<div style="font-size: 10pt; margin: 3px 0;">Topic: ' + project.topic + ' | Weeks Left: <strong style="color: #f39c12;">' + Math.ceil(project.weeksRemaining) + '</strong></div>');
                details.append('<div style="font-size: 10pt;">Status: <strong style="color:#27ae60;">In Development</strong></div>');
                item.append(details);
                container.append(item);
            });
        }


        if (offers.length > 0) {
            container.append('<h3 style="color: #d35400; text-align: center; margin-top: 16px; font-size: 12pt;">Current Publishing Offers</h3>');
            for (var i = 0; i < offers.length; i++) {
                (function (offer) {
                    var item = $('<div class="cs-stagger-item" style="background-color: #fff; padding: 12px; margin-bottom: 12px; border-radius: 6px; display: flex; align-items: center; box-shadow: 0 1px 4px rgba(0,0,0,0.15);"></div>');
                    var details = $('<div style="flex-grow: 1; min-width: 0;"></div>');
                    details.append('<h3 style="margin: 0; font-size: 12pt; color: #d35400; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Contract: ' + offer.size + ' ' + offer.genre + '</h3>');
                    details.append('<div style="font-size: 10pt; margin: 3px 0;">Advance: <strong style="color: #27ae60;">$' + UI.getShortNumberString(offer.advance) + '</strong> | Topic: ' + offer.topic + '</div>');

                    var statusText = offer.status || "Pending Evaluation";
                    var sCol = "#2980b9";
                    if (statusText === "Approved") sCol = "#27ae60";
                    if (statusText === "Rejected") sCol = "#c0392b";
                    details.append('<div style="font-size: 10pt;">Status: <strong style="color:' + sCol + ';">' + statusText + '</strong></div>');

                    item.append(details);

                    var cancelBtn = $('<div class="selectorButton deleteButton" style="font-size: 10pt; padding: 6px 12px;">' + (offer.status === "Approved" ? "Clear" : "Cancel") + '</div>');
                    cancelBtn.click(function () {
                        var oID = offer.id;
                        var idx = -1;
                        for (var x = 0; x < store.data.publishingOffers.length; x++) {
                            if (store.data.publishingOffers[x].id === oID) { idx = x; break; }
                        }
                        if (idx !== -1) {
                            if (offer.status === "Approved") {
                                store.data.publishingOffers.splice(idx, 1);
                                routeModMenu("publishing");
                            } else if (confirm("Remove this offer? Advance will be refunded if pending/rejected.")) {
                                GameManager.company.adjustCash(offer.advance, "Refunded Publishing Advance");
                                store.data.publishingOffers.splice(idx, 1);
                                routeModMenu("publishing");
                            }
                        }
                    });
                    item.append(cancelBtn);
                    container.append(item);
                })(offers[i]);
            }
        }
    }

    function showSearchableList(title, items, onSelect, inlineContainer) {
        var modal = $('<div class="windowBorder tallWindow" style="background-color: #eee; border-radius: 0px; padding: 15px; display: flex; flex-direction: column; overflow: hidden; position: relative;' + (inlineContainer ? ' width: 100%; height: 100%; box-sizing: border-box;' : '') + '"></div>');

        var closeAction = function () {
            if (inlineContainer) {
                modal.remove();
                inlineContainer.children().show();
            } else {
                $.modal.close();
            }
        };

        var xBtn = $('<div style="position: absolute; right: 10px; top: 10px; width: 24px; height: 24px; line-height: 22px; text-align: center; border-radius: 50%; background: #e74c3c; color: white; font-weight: bold; cursor: pointer; font-size: 14pt; z-index: 1000; box-shadow: none;">×</div>');
        xBtn.click(closeAction);
        xBtn.hover(function () { $(this).css('background', '#c0392b'); }, function () { $(this).css('background', '#e74c3c'); });
        modal.append(xBtn);
        modal.append('<h2 style="text-align: center; color: #2c3e50; margin: 0 0 10px 0; font-size: 15pt;">' + title + '</h2>');

        var searchInput = $('<input type="text" placeholder="Search..." style="width: 100%; padding: 10px; font-size: 12pt; margin-bottom: 10px; border: 2px solid #555; border-radius: 0px; color: black; box-sizing: border-box;">');
        modal.append(searchInput);

        var listContainer = $('<div style="flex: 1; overflow-y: auto; background: white; border: 2px solid #555; border-radius: 0px; padding: 5px;"></div>');
        modal.append(listContainer);

        function renderItems(filter) {
            listContainer.empty();
            var count = 0;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var name = (typeof item === 'string') ? item : (item.name || item.id);
                if (filter && name.toLowerCase().indexOf(filter.toLowerCase()) === -1) continue;

                (function (n) {
                    var row = $('<div class="selectorButton" style="padding: 8px 12px; margin-bottom: 4px; border-bottom: 1px solid #eee; cursor: pointer; font-size: 11pt; color: black; background: #f9f9f9; border-radius: 0px;">' + n + '</div>');
                    row.click(function () {
                        Sound.click();
                        onSelect(n);
                        closeAction();
                    });
                    listContainer.append(row);
                })(name);
                count++;
            }
            if (count === 0) listContainer.append('<div style="padding: 10px; color: #7f8c8d; font-style: italic;">No results found.</div>');
        }

        searchInput.on('input', function () { renderItems($(this).val()); });
        renderItems("");

        var closeBtn = $('<div class="selectorButton orangeButton" style="width: 100px; margin: 10px auto 0 auto; text-align: center;">Close</div>');
        closeBtn.click(closeAction);
        modal.append(closeBtn);

        if (inlineContainer) {
            inlineContainer.children().hide();
            inlineContainer.append(modal);
            setTimeout(function () { searchInput.focus(); }, 100);
        } else {
            modal.modal({
                overlayClose: true,
                opacity: 80,
                overlayCss: { backgroundColor: "#000" },
                containerCss: { width: "400px", height: "500px", backgroundColor: "transparent", border: "none" }
            });
            setTimeout(function () { searchInput.focus(); }, 100);
        }
    }

    function renderPublishingForm(container, prefilled) {
        container.css({ opacity: 0 });
        container.empty();

        var formBox = $('<div class="windowBorder" style="background-color: #eee; border: 2px solid #555; padding: 20px; margin-bottom: 20px;"></div>');

        var titleContainer = $('<div style="text-align: center; margin-bottom: 20px;"></div>');
        titleContainer.append('<div style="font-size: 20pt; font-weight: bold; color: #2c3e50; margin-bottom: 5px;">Game Concept</div>');
        formBox.append(titleContainer);

        var row1 = $('<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;"></div>');
        var titleInput = $('<input type="text" id="pub_title" placeholder="Game #???" style="font-size: 16pt; width: 60%; background: white; border: 2px solid #d35400; color: #2c3e50; padding: 5px 10px; border-radius: 0px;">');
        if (prefilled && prefilled.title) titleInput.val(prefilled.title);
        row1.append(titleInput);
        row1.append('<div style="font-size: 14pt; color: #2c3e50;">Cost: <span id="pub_cost_disp" style="font-weight: bold;">$500K</span></div>');
        formBox.append(row1);

        var sizeShelf = $('<div style="display: flex; gap: 10px; margin-bottom: 20px; justify-content: center;"></div>');
        var sizes = [
            { id: "Small", label: "Small", cost: 500000, color: "#f39c12" },
            { id: "Medium", label: "Medium", cost: 2000000, color: "#3498db" },
            { id: "Large", label: "Large", cost: 10000000, color: "#2980b9" },
            { id: "AAA", label: "AAA", cost: 50000000, color: "#1abc9c" }
        ];
        var selectedSize = (prefilled && prefilled.size) ? prefilled.size : "Small";

        sizes.forEach(function (s) {
            var btn = $('<div class="selectorButton" style="flex: 1; text-align: center; padding: 10px 0; font-size: 12pt; font-weight: bold; background-color: #eee; border-radius: 0px; cursor: pointer; border-bottom: 3px solid #bdc3c7;">' + s.label + '</div>');
            if (s.id === selectedSize) btn.css({ "background-color": s.color, "color": "white", "border-bottom": "3px solid #d35400" });
            btn.click(function () {
                Sound.click();
                selectedSize = s.id;
                sizeShelf.find('.selectorButton').css({ "background-color": "#eee", "color": "#2c3e50", "border-bottom": "3px solid #bdc3c7" });
                btn.css({ "background-color": s.color, "color": "white", "border-bottom": "3px solid #d35400" });
                $('#pub_cost_disp').text('$' + UI.getShortNumberString(s.cost));
            });
            sizeShelf.append(btn);
        });
        formBox.append(sizeShelf);


        var selectedTopic = (prefilled && prefilled.topic) ? prefilled.topic : Topics.topics[0].name;
        var selectedGenre = (prefilled && prefilled.genre) ? prefilled.genre : GameGenre.getAll()[0].name;
        var selectedGenre2 = "";
        var selectedPlats = [];

        var topicBtn = $('<div class="selectorButton lightBlueButton" style="display: block; width: 80%; margin: 0 auto 10px auto; text-align: center; font-size: 13pt; padding: 10px 0; border-radius: 0px;">Pick Topic (' + selectedTopic + ')</div>');
        topicBtn.click(function () {
            showSearchableList("Select Topic", Topics.topics, function (name) {
                selectedTopic = name;
                topicBtn.text('Pick Topic (' + selectedTopic + ')');
            }, container);
        });
        formBox.append(topicBtn);

        var genreRow = $('<div style="display: flex; gap: 10px; margin-bottom: 20px; justify-content: center;"></div>');
        var g1Btn = $('<div class="selectorButton lightBlueButton" style="flex: 1; text-align: center; font-size: 12pt; padding: 10px 0; border-radius: 0px;">Pick Genre (' + selectedGenre + ')</div>');
        var g2Btn = $('<div class="selectorButton lightBlueButton" style="flex: 1; text-align: center; font-size: 12pt; padding: 10px 0; border-radius: 0px;">Pick Genre (None)</div>');

        g1Btn.click(function () {
            showSearchableList("Select Main Genre", GameGenre.getAll(), function (name) {
                selectedGenre = name;
                g1Btn.text('Pick Genre (' + selectedGenre + ')');
            }, container);
        });
        g2Btn.click(function () {
            var gList = [{ name: "None" }].concat(GameGenre.getAll());
            showSearchableList("Select Second Genre", gList, function (name) {
                if (name === "None") {
                    selectedGenre2 = "";
                    g2Btn.text('Pick Genre (None)');
                } else {
                    selectedGenre2 = name;
                    g2Btn.text('Pick Genre (' + selectedGenre2 + ')');
                }
            }, container);
        });
        genreRow.append(g1Btn).append(g2Btn);
        formBox.append(genreRow);

        var currentWk = GameManager.company.currentWeek;
        function parseGameWeek(dateVal) {
            if (!dateVal) return 0;
            if (typeof dateVal === 'number') return dateVal;
            var parts = dateVal.split('/');
            if (parts.length === 3) {
                var y = parseInt(parts[0], 10) || 1;
                var m = parseInt(parts[1], 10) || 1;
                var w = parseInt(parts[2], 10) || 1;
                return (y - 1) * 48 + (m - 1) * 4 + w;
            }
            return 0;
        }
        var myPlats = Platforms.allPlatforms.filter(function (p) {
            var pubWk = parseGameWeek(p.published);
            var retWk = p.retiring ? parseGameWeek(p.retiring) : 999999;
            var isReleased = pubWk <= currentWk;
            var isNotRetired = retWk > currentWk;
            var isCustom = (p.isCustom === true && p.owner === GameManager.company.id);
            return (isReleased && isNotRetired) || isCustom;
        });
        if (myPlats.length === 0) myPlats = [Platforms.allPlatforms[0]];

        var p1 = myPlats[0] ? myPlats[0].name : "PC";
        var p2 = "None";
        var p3 = "None";
        var platRow = $('<div style="display: flex; gap: 8px; margin-bottom: 20px; justify-content: center;"></div>');
        var pList = [{ name: "None" }].concat(myPlats);

        function updatePlatShelf() {
            platRow.empty();
            var b1 = $('<div class="selectorButton lightBlueButton" style="flex: 1; text-align: center; font-size: 11pt; padding: 10px 0; border-radius: 0px;">Slot 1 (' + p1 + ')</div>');
            b1.click(function () { showSearchableList("Select Platform 1", pList, function (name) { p1 = name; updatePlatShelf(); }, container); });
            platRow.append(b1);

            var b2 = $('<div class="selectorButton lightBlueButton" style="flex: 1; text-align: center; font-size: 11pt; padding: 10px 0; border-radius: 0px;">Slot 2 (' + p2 + ')</div>');
            b2.click(function () { showSearchableList("Select Platform 2", pList, function (name) { p2 = name; updatePlatShelf(); }, container); });
            platRow.append(b2);

            var b3 = $('<div class="selectorButton lightBlueButton" style="flex: 1; text-align: center; font-size: 11pt; padding: 10px 0; border-radius: 0px;">Slot 3 (' + p3 + ')</div>');
            b3.click(function () { showSearchableList("Select Platform 3", pList, function (name) { p3 = name; updatePlatShelf(); }, container); });
            platRow.append(b3);
        }
        updatePlatShelf();
        formBox.append(platRow);

        var footer = $('<div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;"></div>');
        var cancelBtn = $('<div class="selectorButton deleteButton" style="width: 120px; text-align: center; font-size: 12pt; font-weight: bold; border-radius: 0px;">Cancel</div>');
        cancelBtn.click(function () { routeModMenu("publishing"); });

        var confirmBtn = $('<div class="selectorButton orangeButton" style="width: 160px; text-align: center; font-size: 12pt; font-weight: bold; border-radius: 0px;">Post Offer</div>');
        confirmBtn.click(function () {
            var advance = sizes.filter(function (x) { return x.id === selectedSize; })[0].cost;
            selectedPlats = [p1, p2, p3].filter(function (x) { return x !== "None"; });
            if (selectedPlats.length === 0) selectedPlats = [myPlats[0] ? myPlats[0].name : "PC"];

            if (GameManager.company.cash >= advance) {
                GameManager.company.adjustCash(-advance, "Posted Publishing Deal");
                store.data.publishingOffers.push({
                    id: GameManager.getGUID(),
                    title: $('#pub_title').val() || null,
                    topic: selectedTopic,
                    genre: selectedGenre,
                    genre2: selectedGenre2 || null,
                    size: selectedSize,
                    platforms: selectedPlats,
                    advance: advance,
                    status: "Pending Evaluation",

                    franchiseId: (prefilled && prefilled.franchiseId) ? prefilled.franchiseId : null,
                    entryType: (prefilled && prefilled.entryType) ? prefilled.entryType : null
                });
                routeModMenu("publishing");
            } else { csNotify("You need at least $" + UI.getShortNumberString(advance) + " to fund this advance!"); }
        });

        footer.append(cancelBtn).append(confirmBtn);
        formBox.append(footer);

        container.append(formBox);
        container.animate({ opacity: 1 }, 250);
    }

    function renderScheduleTab(container) {
        var hist = store.data.releaseHistory || [];
        if (hist.length === 0) {
            container.append('<div style="font-size: 12pt; text-align: center; margin-top: 30px; color: #7f8c8d;">No games have been released by competitors recently.</div>');
            return;
        }

        hist.forEach(function (r) {
            var item = $('<div class="cs-stagger-item" style="border: 2px solid #555; background-color: #f9f9f9; padding: 10px; margin-bottom: 8px; border-radius: 0px; box-shadow: none;"></div>');
            var header = $('<h3 style="margin: 0; font-size: 12pt; color: #d35400; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + (r.gameName || r.title || 'Unknown') + ' <span style="font-size:10pt;color:#7f8c8d;">by ' + r.studioName + '</span></h3>');
            item.append(header);

            var wText = "Week " + r.week;
            item.append('<div style="font-size: 10pt; margin-top: 3px;">Released: ' + wText + ' | Score: <strong style="color:#27ae60;">' + r.score + '/10</strong></div>');
            item.append('<div style="font-size: 10pt; margin-top: 2px;">Sales: <strong style="color: #2980b9;">' + UI.getShortNumberString(r.units) + '</strong> | Gross: $' + UI.getShortNumberString(r.revenue) + ' | Net: $' + UI.getShortNumberString(r.netProfit) + '</div>');

            container.append(item);
        });
    }



    // ========== 17_ui_projects.js ==========
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

                            var dlcBtn = $('<div class="selectorButton orangeButton" style="flex: 1; font-size: 10pt;">EXPANSION OPTIONS...</div>');
                            dlcBtn.click(function () {
                                Sound.click();
                                $.modal.close(); // Must close the active Released Games modal before opening another one
                                setTimeout(function() {
                                    if (typeof window.DLCWizard !== "undefined") {
                                        window.DLCWizard.show(game.id);
                                    } else {
                                        csShowExpansionOptionsModal(game, dlcCost, dlcCount, age);
                                    }
                                }, 150);
                            });
                            dlcControls.append(dlcBtn);

                            for (var s = 0; s < store.data.studios.length; s++) {
                                if (store.data.studios[s].sharesOwned >= 50 && !store.data.studios[s].currentProject) {
                                    var subBtn = $('<div class="selectorButton whiteBoardButton" style="flex: 1; font-size: 10pt; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Assign: ' + store.data.studios[s].name + '</div>');
                                    (function (studio) {
                                        subBtn.click(function () {
                                            var dlcId = "DLC_SUB_" + Date.now();
                                            var newDLC = {
                                                id: dlcId,
                                                baseGameId: game.id,
                                                title: game.title,
                                                subtitle: "Expansion",
                                                theme: "Expansion",
                                                type: "Expansion Pack",
                                                scale: "Medium",
                                                allocation: { story: 20, gameplay: 30, graphics: 20, audio: 30 },
                                                price: 9.99,
                                                marketingStrategy: "None",
                                                releaseTiming: "Immediate",
                                                devStats: { cost: 500000, marketingCost: 0, weeksInDev: 0, bugs: 0, progress: 0, requiredProgress: 3000 },
                                                marketStats: { score: 0, totalSales: 0, totalRevenue: 0, baseGameUnitsAtLaunch: game.unitsSold || 500000 },
                                                status: "subsidiary_development",
                                                history: { salesOverTime: [], priceHistory: [] }
                                            };
                                            if (store.data.dlcData && store.data.dlcData.dlcs) {
                                                store.data.dlcData.dlcs[dlcId] = newDLC;
                                                if (!store.data.dlcData.games[game.id]) store.data.dlcData.games[game.id] = { activeSeasonPass: null, dlcList: [] };
                                                store.data.dlcData.games[game.id].dlcList.push(dlcId);
                                            }
                                            studio.currentProject = {
                                                name: game.title + " DLC",
                                                isDLC: true,
                                                gameId: game.id,
                                                dlcId: dlcId,
                                                weeksRemaining: 18
                                            };
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
            var card = _ae(grid, '<div class="cs-marketing-card" class="cs-card" style="display:flex; flex-direction:column; gap:8px;"></div>');
            
            // Header
            var head = _ae(card, '<div style="display:flex; justify-content:space-between; align-items:baseline;"></div>');
            _ae(head, '<div class="cs-fran-name" class="cs-text-title">' + f.name + '</div>');
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
        function parseGameWeek(dateVal) {
            if (!dateVal) return 0;
            if (typeof dateVal === 'number') return dateVal;
            var parts = dateVal.split('/');
            if (parts.length === 3) {
                var y = parseInt(parts[0], 10) || 1;
                var m = parseInt(parts[1], 10) || 1;
                var w = parseInt(parts[2], 10) || 1;
                return (y - 1) * 48 + (m - 1) * 4 + w;
            }
            return 0;
        }
        var myPlats = Platforms.allPlatforms.filter(function (p) {
            var pubWk = parseGameWeek(p.published);
            var retWk = p.retiring ? parseGameWeek(p.retiring) : (p.retireDate ? parseGameWeek(p.retireDate) : 999999);
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

    function csShowExpansionOptionsModal(game, dlcCost, dlcCount, age) {
        var modalContent = $('<div style="padding: 15px; display: flex; flex-direction: column; background:#eee;"></div>');
        _ae(modalContent, '<h2 style="margin-top: 0; color: #111; border-bottom: 2px solid #444; padding-bottom:5px;">Expansion Options: ' + game.title + '</h2>');
        
        var optionsContainer = _ae(modalContent, '<div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;"></div>');

        var opt1 = _ae(optionsContainer, '<div class="selectorButton whiteBoardButton" style="text-align: left; padding: 10px;"></div>');
        if (dlcCount >= 5) opt1.css('opacity', 0.5);
        else {
            opt1.click(function() {
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
                    _n("DLC Development Started", "Your team has started developing a standard DLC for " + game.title + ". It will take about 10 weeks to complete.");
                    $.modal.close();
                    if (typeof routeModMenu === 'function') routeModMenu("dlc");
                } else csNotify("Not enough funds!");
            });
        }
        _ae(opt1, '<div style="font-weight: bold; font-size: 11pt; color: #2980b9;">Standard DLC (-$' + UI.getShortNumberString(dlcCost) + ')</div>');
        _ae(opt1, '<div style="font-size: 9pt; color: #555;">Quickly develop a small content drop. (Max 5 per game, currently: ' + dlcCount + '/5)</div>');

        var expCost = Math.floor((game.costs || 100000) * 1.5);
        if (expCost < 2000000) expCost = 2000000;
        var hasActiveExp = store.data.activeMajorExpansion && store.data.activeMajorExpansion.weeksRemaining > 0;
        var opt2 = _ae(optionsContainer, '<div class="selectorButton whiteBoardButton" style="text-align: left; padding: 10px;"></div>');
        if (hasActiveExp) opt2.css('opacity', 0.5);
        else {
            opt2.click(function() {
                if (GameManager.company.cash >= expCost) {
                    Sound.click();
                    GameManager.company.adjustCash(-expCost, "Major Expansion: " + game.title);
                    store.data.activeMajorExpansion = {
                        gameId: game.id,
                        gameTitle: game.title,
                        weeksRemaining: 12,
                        totalSalesCash: game.totalSalesCash || 1500000
                    };
                    _n("Major Expansion Started", "A massive expansion for " + game.title + " is now in development! It will lock up core team resources for 12 weeks.");
                    $.modal.close();
                    if (typeof routeModMenu === 'function') routeModMenu("dlc");
                } else csNotify("Not enough funds!");
            });
        }
        _ae(opt2, '<div style="font-weight: bold; font-size: 11pt; color: #8e44ad;">Major Expansion Pack (-$' + UI.getShortNumberString(expCost) + ')</div>');
        _ae(opt2, '<div style="font-size: 9pt; color: #555;">Develop a massive expansion. Locks up staff for 12 weeks, provides a massive sales surge.' + (hasActiveExp ? ' (Busy)' : '') + '</div>');

        var remCost = Math.floor((game.costs || 100000) * 2.5);
        if (remCost < 5000000) remCost = 5000000;
        var isRemaster = game.title.indexOf("Remastered") !== -1;
        var opt3 = _ae(optionsContainer, '<div class="selectorButton whiteBoardButton" style="text-align: left; padding: 10px;"></div>');
        if (age < 48 * 5 || isRemaster) opt3.css('opacity', 0.5); 
        else {
            opt3.click(function() {
                if (GameManager.company.cash >= remCost) {
                    Sound.click();
                    GameManager.company.adjustCash(-remCost, "Remaster: " + game.title);
                    
                    var clonedGame = JSON.parse(JSON.stringify(game));
                    clonedGame.id = "remaster_" + Date.now();
                    clonedGame.title = game.title + " Remastered";
                    clonedGame.releaseWeek = Math.floor(GameManager.company.currentWeek);
                    clonedGame.totalSalesCash = 0;
                    clonedGame.unitsSold = 0;
                    clonedGame.costs = remCost;
                    clonedGame.score = Math.min(10, (game.score || 5) + 1.0); 
                    GameManager.company.gameLog.push(clonedGame);

                    _n("Remaster Released!", clonedGame.title + " has been rebuilt for modern audiences and is back on the charts!");
                    $.modal.close();
                    if (typeof routeModMenu === 'function') routeModMenu("dlc");
                } else csNotify("Not enough funds!");
            });
        }
        _ae(opt3, '<div style="font-weight: bold; font-size: 11pt; color: #d35400;">Remaster / Director\'s Cut (-$' + UI.getShortNumberString(remCost) + ')</div>');
        _ae(opt3, '<div style="font-size: 9pt; color: #555;">Re-release this game for modern audiences at full price. Requires game to be >5 years old.</div>');

        var portCost = Math.floor((game.costs || 100000) * 0.5);
        if (portCost < 500000) portCost = 500000;
        var opt4 = _ae(optionsContainer, '<div class="selectorButton whiteBoardButton" style="text-align: left; padding: 10px;"></div>');
        opt4.click(function() {
            if (GameManager.company.cash >= portCost) {
                Sound.click();
                GameManager.company.adjustCash(-portCost, "Platform Port: " + game.title);
                
                var salesSurge = Math.floor((game.totalSalesCash || 1500000) * 0.25);
                GameManager.company.adjustCash(salesSurge, "Port Sales: " + game.title);
                _n("Platform Port Complete", game.title + " was ported to new platforms and earned $" + UI.getShortNumberString(salesSurge) + "!");
                $.modal.close();
                if (typeof routeModMenu === 'function') routeModMenu("dlc");
            } else csNotify("Not enough funds!");
        });
        _ae(opt4, '<div style="font-weight: bold; font-size: 11pt; color: #27ae60;">Platform Port (-$' + UI.getShortNumberString(portCost) + ')</div>');
        _ae(opt4, '<div style="font-size: 9pt; color: #555;">Port the game to modern consoles for a quick, guaranteed 25% lifetime sales surge.</div>');

        _ae(modalContent, '<div class="selectorButton" style="margin-top: 15px; text-align: center; font-weight: bold; padding: 10px;">CANCEL</div>').click(function() { $.modal.close(); });

        $.modal(modalContent, { 
            overlayClose: true, 
            opacity: 80, 
            overlayCss: { backgroundColor: "#000" }, 
            containerCss: { width: "500px", backgroundColor: "#eee", border: "4px solid #333", padding: "0" } 
        });
    }


    // ========== 18_ui_distribution.js ==========
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

                var card = _ae(container, '<div class="cs-card cs-card-flex" style="border-left:4px solid ' + urgencyColor + ';"></div>');

                var info = _ae(card, '<div></div>');
                _ae(info, '<div class="cs-text-title">' + mediaProj.title + ' <span style="font-size:8pt; color:#7f8c8d; text-transform:uppercase;">[' + mediaProj.type + ']</span></div>');
                _ae(info, '<div style="font-size:9pt; margin-top:4px;">Score: ' + csRenderScoreBadge(mediaProj.score) + ' | Est. Revenue: <span class="cs-text-green cs-text-bold">$' + UI.getShortNumberString(mediaProj.estimatedRevenue) + '</span></div>');
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
            var sTable = _ae(container, '<table class="cs-table">' +
                '<tr ><th>Project</th><th>Platform</th><th>Weekly Rev</th><th>Progress</th><th>Action</th></tr></table>');

            activeStreamDeals.forEach(function (item, idx) {
                var d = item.deal, p = item.platform, bg = (idx % 2 === 0) ? '#fff' : '#f4f4f4';
                var r = _ae(sTable, '<tr style="background:' + bg + ';"></tr>');
                _ae(r, '<td class="cs-text-title">' + d.title + '</td>');
                _ae(r, '<td><span style="display:inline-block; width:8px; height:8px; background:' + (p.logoColor || '#555') + '; margin-right:6px;"></span>' + p.name + '</td>');
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
            var tTable = _ae(container, '<table class="cs-table" style="border:2px solid #555;">' +
                '<tr style="background:#555; color:white; text-transform:uppercase; letter-spacing:0.5px;"><th style="padding:8px; text-align:left;">Movie</th><th>Chain</th><th>Box Office</th><th>Player Share</th><th>Week</th><th>Cancel</th></tr></table>');

            activeTheater.forEach(function (tr, idx) {
                var chain = csGetTheaterChainById(tr.theaterChainId), chainName = chain ? chain.name : "Unknown", bg = (idx % 2 === 0) ? '#fff' : '#f4f4f4';
                var r = _ae(tTable, '<tr style="background:' + bg + ';"></tr>');
                _ae(r, '<td class="cs-text-title">' + tr.title + '</td>');
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
            
            var gridLevel = store.data.gridService.contentLibrary ? store.data.gridService.contentLibrary.length : 0;
            var upgradeCost = Math.floor(500000 * Math.pow(1.65, gridLevel));

            var gCard = _ae(container, '<div style="background:#fffbf0; border:2px solid #f39c12; padding:12px; margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;"></div>');
            var gL = _ae(gCard, '<div><div style="font-weight:bold; font-size:12pt; color:#d35400;">Grid Exclusive</div>' +
                '<div style="font-size:9pt; color:#555; margin-top:2px;">Est. +' + UI.getShortNumberString(estBoost) + ' subscribers | Content Power: ' + (project.score*10) + '</div>' +
                '<div style="font-size:9pt; color:#c0392b; font-weight:bold; margin-top:2px;">Server Upgrade Cost: -$' + UI.getShortNumberString(upgradeCost) + '</div></div>');
            var gBtn = _ae(gCard, '<div class="selectorButton orangeButton" style="padding:10px 20px; font-weight:bold;">ADD</div>');
            gBtn.click(function() { csAddToGrid(project); routeModMenu("media", "media"); });
        }

        // Section 2: Theatrical
        if (project.type === "movie" && store.data.theaterChains) {
            _ae(container, csRenderSectionHeader('Theatrical Distribution'));
            var chains = store.data.theaterChains.slice().sort(function(a,b){ return b.prestige - a.prestige; });
            chains.forEach(function(chain) {
                var minReq = Math.ceil(chain.prestige * 1.5), isOk = project.score >= minReq;
                var cCard = _ae(container, '<div class="cs-card cs-card-flex" style="padding:12px; margin-bottom:8px;' + (isOk?'':'opacity:0.6') + '"></div>');
                
                var cL = _ae(cCard, '<div style="flex:1;"></div>');
                var stars = ""; for(var i=0; i<5; i++) stars += (i < chain.prestige ? '★' : '☆');
                _ae(cL, '<div style="font-weight:bold; font-size:11pt;">' + chain.name + ' <span style="color:#f39c12; font-size:10pt;">' + stars + '</span></div>');
                _ae(cL, '<div class="cs-text-muted">Fee: ' + (chain.distributionFeeRate*100).toFixed(0) + '% | Screens: ' + (chain.prestige*100) + '</div>');

                var cM = _ae(cCard, '<div style="flex:1; text-align:center;"></div>');
                if (isOk) {
                    var est = csEstimateTheaterRevenue(project, chain);
                    _ae(cM, '<div style="color:#27ae60; font-weight:bold; font-size:10pt;">$' + UI.getShortNumberString(est.playerShare.min) + ' - $' + UI.getShortNumberString(est.playerShare.max) + '</div>');
                } else _ae(cM, '<div class="cs-text-red cs-text-bold" style="font-size:9pt; text-transform:uppercase;">Score too low</div>');

                var cR = _ae(cCard, '<div style="width:100px; text-align:right;"></div>');
                if (isOk) {
                    var bBtn = _ae(cR, '<div class="selectorButton whiteBoardButton" style="padding:6px 12px; font-size:10pt;">BOOK</div>');
                    bBtn.click(function(){ 
                        if (csConfirmTheaterRelease(project, chain) !== false) {
                            routeModMenu("media", "media"); 
                        }
                    });
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
                var pCard = _ae(container, '<div class="cs-card cs-card-flex" style="padding:12px; margin-bottom:8px; border-left:4px solid ' + (plat.logoColor || '#555') + ';"></div>');
                
                var pL = _ae(pCard, '<div style="flex:1;"></div>');
                _ae(pL, '<div style="font-weight:bold; font-size:11pt;">' + plat.name + (plat.subscriberBase > 1e8 ? ' <span style="background:#ff9f43; color:white; font-size:7pt; padding:1px 4px; vertical-align:middle;">POPULAR</span>' : '') + '</div>');
                _ae(pL, '<div class="cs-text-muted">Users: ' + UI.getShortNumberString(plat.subscriberBase) + ' | Length: ' + est.weeks + 'w</div>');

                var pM = _ae(pCard, '<div style="flex:1; text-align:center;"></div>');
                _ae(pM, '<div style="color:#27ae60; font-weight:bold; font-size:10pt;">Est. Max: $' + UI.getShortNumberString(est.totalRevenue) + '</div>');
                _ae(pM, '<div style="font-size:8pt; color:#555;">($' + UI.getShortNumberString(Math.floor(est.totalRevenue/est.weeks)) + ' /wk)</div>');

                var pR = _ae(pCard, '<div style="width:100px; text-align:right;"></div>');
                var sBtn = _ae(pR, '<div class="selectorButton whiteBoardButton" style="padding:6px 12px; font-size:10pt;">SIGN DEAL</div>');
                sBtn.click(function(){ 
                    if (csConfirmStreamingDeal(project, plat) !== false) {
                        routeModMenu("media", "media"); 
                    }
                });
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
                var success = csAddToGrid(project);
                if (success !== false) {
                    $.modal.close();
                    if (onRefresh) onRefresh();
                }
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
                        var success = csConfirmTheaterRelease(project, chain);
                        if (success !== false) {
                            $.modal.close();
                            if (onRefresh) onRefresh();
                        }
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
                    var success = csConfirmStreamingDeal(project, platform);
                    if (success !== false) {
                        $.modal.close();
                        if (onRefresh) onRefresh();
                    }
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
                var r = _ae(iTable, '<tr style="background:' + bg + ';"></tr>');
                _ae(r, '<td class="cs-text-title">' + p.title + '</td>');
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
            var lTable = _ae(container, '<table class="cs-table" style="border:2px solid #555;">' +
                '<tr style="background:#555; color:white; text-transform:uppercase; letter-spacing:0.5px;"><th style="padding:8px; text-align:left;">Title</th><th>Score</th><th>Weekly Cost</th><th>Expires</th></tr></table>');
            licensed.forEach(function (c, idx) {
                var bg = (idx % 2 === 0) ? '#fff' : '#f4f4f4';
                var r = _ae(lTable, '<tr style="background:' + bg + ';"></tr>');
                _ae(r, '<td class="cs-text-title">' + c.title + '</td>');
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

        // Infrastructure
        var infraRow = _ae(contentArea, '<div style="display:flex; justify-content:space-between; align-items:center; background:#f4f4f4; padding:15px; border:2px solid #555; margin-bottom:20px; border-radius:6px;"></div>');
        var servers = g.rentedServers || 1;
        var capacity = servers * 1000000;
        var usagePct = Math.min(100, Math.floor(((g.subscribers || 0) / capacity) * 100));
        
        function getServerUpkeepCost(numServers) {
            var costPer = Math.max(50000, 150000 - (numServers * 500));
            return numServers * costPer;
        }

        var infraInfo = _ae(infraRow, '<div style="flex:2; padding-right:15px;"></div>');
        _ae(infraInfo, '<div class="cs-text-title">Server Infrastructure (Tier ' + servers + ')</div>');
        _ae(infraInfo, '<div style="font-size:9pt; color:#555; margin:4px 0;">Capacity: ' + UI.getShortNumberString(g.subscribers || 0) + ' / ' + UI.getShortNumberString(capacity) + ' (' + usagePct + '%)</div>');
        _ae(infraInfo, csRenderMiniBar(usagePct, (usagePct > 95 ? '#e74c3c' : (usagePct > 75 ? '#f39c12' : '#27ae60')), 200));
        
        if ((g.overloadTicks || 0) > 0) {
            _ae(infraInfo, '<div style="color:#e74c3c; font-weight:bold; font-size:9pt; margin-top:5px;">⚠️ OVERLOAD WARNING: Servers crashing!</div>');
        }

        var btnCol = _ae(infraRow, '<div style="display:flex; gap:6px;"></div>');
        
        var cost1 = getServerUpkeepCost(servers + 1) - getServerUpkeepCost(servers);
        var btn1 = _ae(btnCol, '<div class="selectorButton lightBlueButton" style="padding:8px 12px; font-weight:bold; font-size:8.5pt; text-align:center; min-width:75px; border-radius:0;">+1 SERVER<br><span style="font-size:7pt; font-weight:normal;">+$'+UI.getShortNumberString(cost1)+'/wk</span></div>');
        btn1.click(function() {
            Sound.click();
            g.rentedServers = (g.rentedServers || 1) + 1;
            csRenderGridDashboard(contentArea);
        });

        var cost5 = getServerUpkeepCost(servers + 5) - getServerUpkeepCost(servers);
        var btn5 = _ae(btnCol, '<div class="selectorButton lightBlueButton" style="padding:8px 12px; font-weight:bold; font-size:8.5pt; text-align:center; min-width:75px; border-radius:0;">+5 SERVERS<br><span style="font-size:7pt; font-weight:normal;">+$'+UI.getShortNumberString(cost5)+'/wk</span></div>');
        btn5.click(function() {
            Sound.click();
            g.rentedServers = (g.rentedServers || 1) + 5;
            csRenderGridDashboard(contentArea);
        });

        var cost10 = getServerUpkeepCost(servers + 10) - getServerUpkeepCost(servers);
        var btn10 = _ae(btnCol, '<div class="selectorButton lightBlueButton" style="padding:8px 12px; font-weight:bold; font-size:8.5pt; text-align:center; min-width:75px; border-radius:0;">+10 SERVERS<br><span style="font-size:7pt; font-weight:normal;">+$'+UI.getShortNumberString(cost10)+'/wk</span></div>');
        btn10.click(function() {
            Sound.click();
            g.rentedServers = (g.rentedServers || 1) + 10;
            csRenderGridDashboard(contentArea);
        });

        // Leaderboard (Simple Table)
        _ae(contentArea, csRenderSectionHeader('Market Share Leaderboard'));
        var lbTable = _ae(contentArea, '<table style="width:100%; border-collapse:collapse; font-size:9pt; background:#fff; border:1px solid #bdc3c7; border-radius:6px; overflow:hidden;">' +
            '<tr style="background:#34495e; color:white; text-transform:uppercase;"><th>Service</th><th>Subscribers</th><th>Market Share</th></tr></table>');
        
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
            var r = _ae(lbTable, '<tr style="background:' + bg + ';"></tr>');
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
            
            _ae(info, '<div class="cs-text-title">' + f.title + '</div>');
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

    window.csShowInboundDealModal = function(studio, price) {
        GameManager.pause(true);
        var modalContent = $('<div style="padding: 15px; display: flex; flex-direction: column; background:#eee;"></div>');
        _ae(modalContent, '<h2 style="margin-top: 0; color: #111; border-bottom: 2px solid #444; padding-bottom:5px;">Inbound Deal</h2>');
        _ae(modalContent, '<div style="font-size: 14pt; margin: 15px 0;">' + studio.name + ' has reached out with an exclusive licensing offer for their catalogue.</div>');
        _ae(modalContent, '<div style="font-size: 18pt; color: #27ae60; font-weight: bold; text-align: center; margin-bottom: 20px;">Flat Fee: $' + UI.getShortNumberString(price) + '</div>');
        
        var actions = _ae(modalContent, '<div style="display: flex; gap: 10px; margin-top: 10px;"></div>');
        var aBtn = _ae(actions, '<div class="selectorButton greenButton" style="flex: 1; padding: 15px; text-align: center; font-weight: bold;">ACCEPT</div>');
        aBtn.click(function() {
            if (GameManager.company.cash < price) return csNotify('Insufficient funds.');
            Sound.click(); GameManager.company.adjustCash(-price, 'Catalogue Deal: ' + studio.name);
            store.data.activeCatalogueDeals = store.data.activeCatalogueDeals || [];
            var catMaintFee = Math.floor(studio.valuation * 0.005);
            store.data.activeCatalogueDeals.push({ studioId: studio.id, studioName: studio.name, endWeek: Math.floor(GameManager.company.currentWeek) + 104, weeklyMaintenance: catMaintFee });
            store.data.activeCatalogueNegotiation = null; store.data.pendingInboundDeal = null;
            $.modal.close();
            GameManager.resume(true);
            csAutoRouteMediaCatalog(studio); 
        });

        var rBtn = _ae(actions, '<div class="selectorButton orangeButton" style="flex: 1; padding: 15px; text-align: center; font-weight: bold;">REFUSE</div>');
        rBtn.click(function() {
            Sound.click();
            store.data.pendingInboundDeal = null;
            $.modal.close();
            GameManager.resume(true);
        });

        $.modal(modalContent, {
            overlayClose: false,
            opacity: 80,
            overlayCss: { backgroundColor: "#000" },
            containerCss: { width: "500px", backgroundColor: "#eee", border: "4px solid #333", padding: "0" }
        });
    };


    // ========== 19_dlc.js ==========
(function () {
    // Game Dev Tycoon Mod - DLC System Core Logic

    window.DLCSystem = {};

    DLCSystem.Scales = {
        "Tiny": { costBase: 500000, timeBase: 6, optimalPrice: 2.99, maxBugs: 2, marketBase: 0.1 },
        "Small": { costBase: 1000000, timeBase: 12, optimalPrice: 4.99, maxBugs: 5, marketBase: 0.2 },
        "Medium": { costBase: 2500000, timeBase: 20, optimalPrice: 9.99, maxBugs: 10, marketBase: 0.4 },
        "Large": { costBase: 5000000, timeBase: 35, optimalPrice: 19.99, maxBugs: 20, marketBase: 0.7 },
        "Massive": { costBase: 10000000, timeBase: 50, optimalPrice: 29.99, maxBugs: 35, marketBase: 1.0 },
        "Standalone": { costBase: 25000000, timeBase: 80, optimalPrice: 39.99, maxBugs: 50, marketBase: 1.5 }
    };

    DLCSystem.Types = {
        "Story Expansion": { costMult: 1.5, reviewMult: 1.2, attachCap: 0.4, minScale: "Medium" },
        "Character Pack": { costMult: 0.8, reviewMult: 1.0, attachCap: 0.25, minScale: "Tiny" },
        "Expansion Pack": { costMult: 1.2, reviewMult: 1.1, attachCap: 0.35, minScale: "Medium" },
        "Map Pack": { costMult: 0.7, reviewMult: 0.9, attachCap: 0.2, minScale: "Small" },
        "Weapon Pack": { costMult: 0.4, reviewMult: 0.8, attachCap: 0.15, minScale: "Tiny" },
        "Cosmetic Pack": { costMult: 0.3, reviewMult: 0.7, attachCap: 0.1, minScale: "Tiny" },
        "Gameplay Expansion": { costMult: 1.3, reviewMult: 1.1, attachCap: 0.3, minScale: "Medium" },
        "Season Pass": { costMult: 0, reviewMult: 1.0, attachCap: 0.5, minScale: "Medium" } // Special case
    };

    DLCSystem.Themes = [
        "Dark Story", "Final Chapter", "Winter Expansion", "Origins", "Epilogue", 
        "Retro", "Sci-Fi", "Fantasy", "Historical", "Experimental"
    ];

    DLCSystem.Allocations = [
        "Story", "Gameplay", "Characters", "World", "Graphics", "Audio", "Replayability", 
        "Technical Improvements", "Online Features", "Quality of Life", "Balance", "AI Improvements", "Side Quests", "Voice Acting"
    ];

    DLCSystem.calculateDevelopmentCost = function(scale, type, allocationPoints) {
        var scaleData = DLCSystem.Scales[scale];
        var typeData = DLCSystem.Types[type];
        if (!scaleData || !typeData) return 500000;
        
        var sum = 0;
        for (var k in allocationPoints) { sum += allocationPoints[k]; }
        var allocationMult = sum / 100.0;

        return Math.floor(scaleData.costBase * typeData.costMult * allocationMult);
    };

    DLCSystem.calculateRequiredProgress = function(scale, type) {
        var scaleData = DLCSystem.Scales[scale];
        var typeData = DLCSystem.Types[type];
        if (!scaleData || !typeData) return 1000;

        return Math.floor(scaleData.timeBase * typeData.costMult * 150); // 150 work units per week roughly
    };

    DLCSystem.calculateReviewScore = function(dlc, baseGameScore, studioStats) {
        var scaleData = DLCSystem.Scales[dlc.scale];
        var expectedBugs = scaleData.maxBugs;
        
        // 1. Base Score calculation (1 to 10)
        var intrinsicQuality = 5 + (Math.random() * 3); // Placeholder for actual skill-based quality
        
        // 2. Base Game Synergy (30%)
        var synergy = baseGameScore * 0.3;

        // 3. Price Fairness (20%)
        var optPrice = scaleData.optimalPrice;
        var priceRatio = optPrice / dlc.price; // if > 1, good. if < 1, bad.
        var priceFairness = Math.min(1.5, Math.max(0.5, priceRatio)) * 10 * 0.2; // Max 3 points, min 1 point

        var finalScore = (intrinsicQuality * 0.5) + synergy + priceFairness;

        // 4. Bug Penalties
        if (dlc.devStats.bugs > expectedBugs) {
            finalScore -= ((dlc.devStats.bugs - expectedBugs) * 0.1);
        }

        return Math.min(10, Math.max(1, finalScore));
    };

    DLCSystem.calculateWeeklySales = function(dlc, previousWeekSales) {
        var decayRate = 0.65;
        if (dlc.marketStats.score > 8) decayRate += 0.10;
        if (dlc.marketStats.score < 5) decayRate -= 0.10;

        var scaleData = DLCSystem.Scales[dlc.scale];
        if (dlc.price > scaleData.optimalPrice * 1.2) decayRate -= 0.15;

        return Math.floor(previousWeekSales * decayRate);
    };

    DLCSystem.processWeekly = function() {
        if (!store.data.dlcData || !store.data.dlcData.dlcs) return;
        
        var dlcs = store.data.dlcData.dlcs;
        for (var dlcId in dlcs) {
            var dlc = dlcs[dlcId];
            
            if (dlc.status === "development") {
                // Development progress
                var staffCount = GameManager.company.staff ? GameManager.company.staff.length : 1;
                var progressPerWeek = staffCount * 15; // placeholder
                
                dlc.devStats.weeksInDev++;
                dlc.devStats.progress += progressPerWeek;
                
                // Add bugs randomly based on scale
                var scaleData = DLCSystem.Scales[dlc.scale];
                if (Math.random() < 0.3) {
                    dlc.devStats.bugs += Math.floor(Math.random() * (scaleData.maxBugs / 5) + 1);
                }

                // Finish condition
                if (dlc.devStats.progress >= dlc.devStats.requiredProgress) {
                    DLCSystem.releaseDLC(dlc);
                }
            } else if (dlc.status === "released") {
                // Sales logic
                var currentWeek = Math.floor(GameManager.company.currentWeek);
                var weeksSinceRelease = currentWeek - dlc.releaseWeek;
                
                var prevSales = dlc.history.salesOverTime.length > 0 ? dlc.history.salesOverTime[dlc.history.salesOverTime.length - 1] : 0;
                
                if (weeksSinceRelease === 1) {
                    // Launch week sales
                    var baseGame = GameManager.company.getGameById(dlc.baseGameId);
                    var attachRate = DLCSystem.Types[dlc.type] ? DLCSystem.Types[dlc.type].attachCap : 0.2;
                    if (dlc.marketStats.score < 5) attachRate *= 0.5;
                    var baseSales = baseGame ? (baseGame.totalSalesUnits || baseGame.unitsSold || 500000) : 500000;
                    
                    prevSales = Math.floor(baseSales * attachRate);
                }
                
                var weeklySales = DLCSystem.calculateWeeklySales(dlc, prevSales);
                if (weeklySales < 10) weeklySales = 0; // stop generating noise
                
                var weeklyRevenue = weeklySales * dlc.price;
                
                dlc.history.salesOverTime.push(weeklySales);
                dlc.marketStats.totalSales += weeklySales;
                dlc.marketStats.totalRevenue += weeklyRevenue;
                
                if (weeklyRevenue > 0) {
                    GameManager.company.adjustCash(weeklyRevenue, "DLC Sales: " + dlc.title);
                }
                
                // Compact history to prevent memory leak (keep last 52 weeks max)
                if (dlc.history.salesOverTime.length > 52) {
                    dlc.history.salesOverTime.shift();
                }
            }
        }
    };

    DLCSystem.releaseDLC = function(dlc) {
        dlc.status = "released";
        dlc.releaseWeek = Math.floor(GameManager.company.currentWeek);
        
        var baseGame = GameManager.company.getGameById(dlc.baseGameId);
        var baseGameScore = baseGame ? baseGame.score : 7;
        
        dlc.marketStats.score = DLCSystem.calculateReviewScore(dlc, baseGameScore, null);
        
        _n("DLC Released!", "Your DLC '" + dlc.title + "' has been released to the public! Review Score: " + dlc.marketStats.score.toFixed(1) + "/10");
        
        // Improve franchise fanbase if good
        if (dlc.marketStats.score > 8 && baseGame && baseGame.modFranchiseId) {
            var fran = getFranchiseById(baseGame.modFranchiseId);
            if (fran) fran.fanbaseScore = Math.min(100, fran.fanbaseScore + 5);
        }
    };

})();


    // ========== 20_ui_dlc.js ==========
(function () {
    // Game Dev Tycoon Mod - DLC Wizard UI

    var DLCWizard = {
        currentPage: 1,
        maxPages: 7,
        currentData: {}
    };

    DLCWizard.show = function(baseGameId) {
        DLCWizard.currentPage = 1;
        DLCWizard.currentData = {
            baseGameId: baseGameId,
            title: "",
            subtitle: "",
            theme: "Story Expansion",
            type: "Story Expansion",
            scale: "Medium",
            allocation: {},
            price: 9.99,
            marketing: "None",
            releaseStrategy: "Immediate"
        };
        
        // Initialize allocation to 0
        DLCSystem.Allocations.forEach(function(a) { DLCWizard.currentData.allocation[a] = 0; });

        $('#dlc-wizard-modal').remove(); // Clean up any previous wizard modal instance to prevent ID conflicts

        var modal = $('<div id="dlc-wizard-modal" class="windowBorder" style="background:#eee; padding:20px; width:600px; max-height:80%; display:flex; flex-direction:column; border-radius:10px;"></div>');
        modal.append('<h3 style="margin-top:0; color:#d35400;">DLC Wizard</h3>');
        
        var content = $('<div id="dlc-wizard-content" style="height:400px; overflow-y:auto; padding:10px; background:#fff; border:1px solid #bdc3c7;"></div>');
        modal.append(content);

        var footer = $('<div style="display:flex; justify-content:space-between; margin-top:20px;"></div>');
        var btnPrev = $('<div id="dlc-btn-prev" class="selectorButton whiteBoardButton" style="width:120px; text-align:center;">Previous</div>').click(function() { DLCWizard.navigate(-1); }).hide();
        var btnNext = $('<div id="dlc-btn-next" class="selectorButton orangeButton" style="width:120px; text-align:center;">Next</div>').click(function() { DLCWizard.navigate(1); });
        var btnClose = $('<div class="selectorButton" style="width:120px; text-align:center;">Close</div>').click(function() { 
            $.modal.close(); 
            $('#dlc-wizard-modal').remove(); 
        });
        
        footer.append(btnPrev).append(btnClose).append(btnNext);
        modal.append(footer);
        
        modal.modal({
            overlayClose: false,
            opacity: 60,
            overlayCss: { backgroundColor: "#000" },
            containerCss: { backgroundColor: "transparent", border: "none" }
        });
        
        DLCWizard.renderPage();
    };

    DLCWizard.navigate = function(dir) {
        if (dir === 1 && DLCWizard.currentPage === 4) {
            var sum = 0;
            $('.dlc-alloc-input').each(function() { sum += parseInt($(this).val()) || 0; });
            if (sum !== 100) {
                var totalEl = $('#dlc-alloc-total');
                totalEl.css('font-size', '14pt').animate({fontSize: '12pt'}, 200);
                return;
            }
        }

        DLCWizard.saveCurrentPage();
        DLCWizard.currentPage += dir;
        
        if (DLCWizard.currentPage > DLCWizard.maxPages) {
            DLCWizard.finish();
            return;
        }
        
        if (DLCWizard.currentPage < 1) DLCWizard.currentPage = 1;
        
        DLCWizard.renderPage();
    };

    DLCWizard.saveCurrentPage = function() {
        var page = DLCWizard.currentPage;
        if (page === 1) {
            DLCWizard.currentData.title = $('#dlc-input-title').val() || "Expansion";
            DLCWizard.currentData.subtitle = $('#dlc-input-subtitle').val() || "";
            DLCWizard.currentData.theme = $('#dlc-select-theme').val();
        } else if (page === 2) {
            DLCWizard.currentData.type = $('#dlc-select-type').val();
        } else if (page === 3) {
            DLCWizard.currentData.scale = $('#dlc-select-scale').val();
            // Auto-update price when scale changes
            DLCWizard.currentData.price = DLCSystem.Scales[DLCWizard.currentData.scale].optimalPrice;
        } else if (page === 4) {
            DLCSystem.Allocations.forEach(function(a) {
                var val = parseInt($('#dlc-alloc-' + a.replace(/\s+/g, '-')).val()) || 0;
                DLCWizard.currentData.allocation[a] = val;
            });
        } else if (page === 5) {
            DLCWizard.currentData.price = parseFloat($('#dlc-input-price').val()) || 9.99;
        } else if (page === 6) {
            DLCWizard.currentData.marketing = $('#dlc-select-marketing').val();
        } else if (page === 7) {
            DLCWizard.currentData.releaseStrategy = $('#dlc-select-release').val();
        }
    };

    DLCWizard.renderPage = function() {
        var page = DLCWizard.currentPage;
        var content = $('#dlc-wizard-content');
        content.empty();
        
        $('#dlc-btn-prev').toggle(page > 1);
        var btnNext = $('#dlc-btn-next');
        btnNext.text(page === DLCWizard.maxPages ? "Start Development" : "Next");

        if (page === 1) {
            content.append('<h3>Page 1: Identity & Theme</h3>');
            content.append('<label>Title: <input id="dlc-input-title" type="text" value="'+DLCWizard.currentData.title+'"></label><br><br>');
            content.append('<label>Subtitle: <input id="dlc-input-subtitle" type="text" value="'+DLCWizard.currentData.subtitle+'"></label><br><br>');
            
            var themeSel = $('<select id="dlc-select-theme"></select>');
            DLCSystem.Themes.forEach(function(t) {
                themeSel.append('<option value="'+t+'">'+t+'</option>');
            });
            themeSel.val(DLCWizard.currentData.theme);
            content.append('<label>Theme: </label>').append(themeSel);
            
        } else if (page === 2) {
            content.append('<h3>Page 2: DLC Type</h3>');
            var typeSel = $('<select id="dlc-select-type"></select>');
            Object.keys(DLCSystem.Types).forEach(function(t) {
                typeSel.append('<option value="'+t+'">'+t+'</option>');
            });
            typeSel.val(DLCWizard.currentData.type);
            content.append('<label>Type: </label>').append(typeSel);
            content.append('<p style="margin-top:20px; color:#666;">Different types have unique review impacts, fan expectations, and baseline costs.</p>');
            
        } else if (page === 3) {
            content.append('<h3>Page 3: Content Scale</h3>');
            var scaleSel = $('<select id="dlc-select-scale"></select>');
            Object.keys(DLCSystem.Scales).forEach(function(s) {
                scaleSel.append('<option value="'+s+'">'+s+'</option>');
            });
            scaleSel.val(DLCWizard.currentData.scale);
            content.append('<label>Scale: </label>').append(scaleSel);
            content.append('<p style="margin-top:20px; color:#666;">Scale strictly dictates development time, cost, marketing effectiveness, and price expectations.</p>');
            
        } else if (page === 4) {
            content.append('<h3>Page 4: Content Allocation (100 Points)</h3>');
            content.append('<div style="margin-bottom:10px;">Total Points: <span id="dlc-alloc-total" style="font-weight:bold;">0</span> / 100</div>');
            
            var grid = $('<div style="display:grid; grid-template-columns: 1fr 1fr; gap: 10px;"></div>');
            DLCSystem.Allocations.forEach(function(a) {
                var safeId = a.replace(/\s+/g, '-');
                var val = DLCWizard.currentData.allocation[a];
                var row = $('<div><label style="display:inline-block; width:150px;">'+a+'</label> <input type="number" min="0" max="100" class="dlc-alloc-input" id="dlc-alloc-'+safeId+'" value="'+val+'" style="width:60px;"></div>');
                grid.append(row);
            });
            content.append(grid);
            
            content.on('input', '.dlc-alloc-input', function() {
                var sum = 0;
                $('.dlc-alloc-input').each(function() { sum += parseInt($(this).val()) || 0; });
                var totalEl = $('#dlc-alloc-total');
                totalEl.text(sum);
                totalEl.css('color', sum === 100 ? 'green' : (sum > 100 ? 'red' : 'black'));
                $('#dlc-btn-next').prop('disabled', sum !== 100);
            });
            // Trigger calculation
            $('.dlc-alloc-input').first().trigger('input');
            
        } else if (page === 5) {
            content.append('<h3>Page 5: Pricing System</h3>');
            content.append('<label>Price ($): <input id="dlc-input-price" type="number" step="0.01" value="'+DLCWizard.currentData.price+'"></label><br><br>');
            var opt = DLCSystem.Scales[DLCWizard.currentData.scale].optimalPrice;
            content.append('<p style="color:#666;">Recommended optimal price for <b>' + DLCWizard.currentData.scale + '</b> scale is <b>$' + opt + '</b>. Deviating from this impacts review scores and sales.</p>');
            
        } else if (page === 6) {
            content.append('<h3>Page 6: Marketing Campaign</h3>');
            var mktSel = $('<select id="dlc-select-marketing"></select>');
            ['None', 'Social Media', 'Magazine', 'TV', 'Worldwide Campaign', 'Convention', 'Influencer Campaign', 'Beta Access'].forEach(function(m) {
                mktSel.append('<option value="'+m+'">'+m+'</option>');
            });
            mktSel.val(DLCWizard.currentData.marketing);
            content.append('<label>Campaign: </label>').append(mktSel);
            
        } else if (page === 7) {
            content.append('<h3>Page 7: Release Strategy & Timing</h3>');
            var relSel = $('<select id="dlc-select-release"></select>');
            ['Immediate', 'Holiday', 'Anniversary', 'Franchise Event', 'Platform Launch', 'Publisher Showcase'].forEach(function(r) {
                relSel.append('<option value="'+r+'">'+r+'</option>');
            });
            relSel.val(DLCWizard.currentData.releaseStrategy);
            content.append('<label>Release Window: </label>').append(relSel);
            
            content.append('<hr style="margin-top:20px;">');
            content.append('<h4>Summary</h4>');
            content.append('<p><b>Title:</b> ' + DLCWizard.currentData.title + ' ' + DLCWizard.currentData.subtitle + '</p>');
            content.append('<p><b>Type:</b> ' + DLCWizard.currentData.scale + ' ' + DLCWizard.currentData.type + '</p>');
            var estCost = DLCSystem.calculateDevelopmentCost(DLCWizard.currentData.scale, DLCWizard.currentData.type, DLCWizard.currentData.allocation);
            content.append('<p><b>Estimated Base Cost:</b> $' + UI.getShortNumberString(estCost) + '</p>');
        }
    };

    DLCWizard.finish = function() {
        $.modal.close();
        $('#dlc-wizard-modal').remove();
        
        // Ensure new DLC schema exists properly before writing to it
        if (!store.data.dlcData) store.data.dlcData = { games: {}, dlcs: {} };
        if (!store.data.dlcData.dlcs) store.data.dlcData.dlcs = {};
        if (!store.data.dlcData.games) store.data.dlcData.games = {};
        
        var currentWeek = Math.floor(GameManager.company.currentWeek);
        var dlcId = "DLC_" + Date.now();
        var gameId = DLCWizard.currentData.baseGameId;
        
        var estCost = DLCSystem.calculateDevelopmentCost(DLCWizard.currentData.scale, DLCWizard.currentData.type, DLCWizard.currentData.allocation);
        
        // Start development
        var newDLC = {
            id: dlcId,
            baseGameId: gameId,
            title: DLCWizard.currentData.title,
            subtitle: DLCWizard.currentData.subtitle,
            theme: DLCWizard.currentData.theme,
            type: DLCWizard.currentData.type,
            scale: DLCWizard.currentData.scale,
            allocation: DLCWizard.currentData.allocation,
            price: DLCWizard.currentData.price,
            marketingStrategy: DLCWizard.currentData.marketing,
            releaseTiming: DLCWizard.currentData.releaseStrategy,
            
            devStats: { 
                cost: estCost, 
                marketingCost: 0, // Placeholder
                weeksInDev: 0, 
                bugs: 0,
                progress: 0,
                requiredProgress: DLCSystem.calculateRequiredProgress(DLCWizard.currentData.scale, DLCWizard.currentData.type)
            },
            marketStats: { 
                score: 0, 
                totalSales: 0, 
                totalRevenue: 0, 
                baseGameUnitsAtLaunch: 0 
            },
            status: "development",
            history: {
                salesOverTime: [],
                priceHistory: []
            }
        };
        
        store.data.dlcData.dlcs[dlcId] = newDLC;
        if (!store.data.dlcData.games[gameId]) {
            store.data.dlcData.games[gameId] = { activeSeasonPass: null, dlcList: [] };
        }
        store.data.dlcData.games[gameId].dlcList.push(dlcId);
        
        // Take upfront cash
        GameManager.company.adjustCash(-estCost, "DLC Development: " + newDLC.title);
        
        _n("DLC Production Started", "Development on " + newDLC.title + " has begun.");
    };

    window.DLCWizard = DLCWizard;
})();


})();
