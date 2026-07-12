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
