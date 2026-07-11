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
        if (!platform || !mediaProject) return;
        var currentWeek = Math.floor(GameManager.company.currentWeek);

        if (platform.acceptsType.indexOf(mediaProject.type) === -1) { csNotify("This platform does not accept this content type!"); return; }
        if (mediaProject.distributionStatus !== "pending") return;
        if (currentWeek - (platform.bookingCooldownWeek || -100) < 16) { csNotify("Must wait 16 weeks between deals with this platform."); return; }

        if (isExclusive) {
            var currentExclusiveCount = platform.activeDeals.filter(function (d) { return d.isExclusive; }).length;
            if (currentExclusiveCount >= platform.exclusivitySlots) { csNotify("This platform has no exclusive slots left."); return; }
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
    }

    function csConfirmTheaterRelease(mediaProject, theaterChain) {
        if (!theaterChain || !mediaProject) return;
        if (mediaProject.type !== "movie") { csNotify("Theatrical releases are only available for feature films."); return; }
        if (mediaProject.distributionStatus !== "pending") return;
        if (theaterChain.activeRelease !== null) { csNotify("This theater chain is already running another release!"); return; }
        if (GameManager.company.cash < theaterChain.bookingFee) { csNotify("Not enough cash for booking fee."); return; }

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
    }

    function csAddToGrid(mediaProject) {
        if (!store.data.gridService || !store.data.gridService.isActive) return;
        if (!mediaProject || mediaProject.distributionStatus !== "pending") return;
        var validTypes = ["movie", "tvSeries", "animatedShow", "comicBook", "soundtrack"];
        if (validTypes.indexOf(mediaProject.type) === -1) { csNotify("Grid does not support this content type."); return; }

        var grid = store.data.gridService;
        if (!Array.isArray(grid.contentLibrary)) grid.contentLibrary = [];

        for (var i = 0; i < grid.contentLibrary.length; i++) {
            if (grid.contentLibrary[i].mediaProjectId === mediaProject.id) {
                csNotify("Already in Grid Library."); return;
            }
        }

        var gridLevel = grid.contentLibrary.length;
        var baseCost = 500000;
        var upgradeCost = Math.floor(baseCost * Math.pow(1.65, gridLevel));
        
        if (GameManager.company.cash < upgradeCost) {
            csNotify("Insufficient funds to expand The Grid. Need $" + UI.getShortNumberString(upgradeCost));
            return;
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

