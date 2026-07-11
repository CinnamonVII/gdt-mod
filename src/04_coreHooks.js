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

