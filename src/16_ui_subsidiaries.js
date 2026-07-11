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

