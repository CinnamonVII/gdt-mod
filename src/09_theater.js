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

