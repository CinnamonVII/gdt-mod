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

