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

