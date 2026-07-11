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

