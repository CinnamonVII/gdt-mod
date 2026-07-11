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

