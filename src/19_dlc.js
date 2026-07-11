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
