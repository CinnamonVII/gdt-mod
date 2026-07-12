    function renderFranchisesTab(container) {
        var subTab = "my";

        function refresh() {
            container.empty();


            var subHeader = makeTabBar([
                { id: "my", label: "My Franchises" },
                { id: "register", label: "Create / Register" },
                { id: "acquisitions", label: "Acquisitions" },
                { id: "proposals", label: "Proposals" }
            ], subTab, function (id) { subTab = id; refresh(); });

            var tier5s = getPlayerFranchises().filter(function (f) { return f.tier === 5; });
            if (tier5s.length >= 2) {
                var crossBtn = $('<div class="entry-type-btn fran-tier-5" style="border: 2px solid gold; flex: 1; text-align: center; cursor: pointer;">[ CROSSOVER ]</div>');
                crossBtn.click(function () { showCrossoverModal(container, refresh); });
                subHeader.append(crossBtn);
            }

            container.append(subHeader);

            if (subTab === "my") {
                var fans = getPlayerFranchises();
                if (fans.length === 0) _ae(container, '<div style="text-align: center; padding: 40px; color: #7f8c8d; font-style: italic;">You don\'t own any franchises yet. Go to "Create / Register" to start one!</div>');
                
                if (fans.length > 5) {
                    var $search = csRenderSearchBar("Search my " + fans.length + " franchises...", function(val) {
                        container.find('.cs-franchise-card').each(function() {
                            var name = $(this).find('.cs-fran-name').val() || "";
                            $(this).toggle(name.toLowerCase().indexOf(val) > -1);
                        });
                    });
                    container.append($search);
                }

                fans.forEach(function (f) {
                    var card = _ae(container, '<div class="cs-stagger-item cs-franchise-card" style="background:white; border-radius:8px; border:1px solid #bdc3c7; padding:15px; margin-bottom:15px; box-shadow:0 2px 4px rgba(0,0,0,0.05);"></div>');
                    var header = _ae(card, '<div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;"></div>');
                    _ae(header, '<input type="text" class="cs-fran-name" value="' + f.name + '" style="font-size:14pt; font-weight:bold; border:none; background:transparent; color:#2c3e50; border-bottom:1px dashed #bdc3c7; width:60%;">').change(function () { f.name = $(this).val(); });
                    header.append(renderTierBadge(f.tier));
                    _ae(card, '<div style="display:flex; gap:20px; font-size:10pt; color:#7f8c8d; margin-bottom:10px;"><div><b>Total Revenue:</b> $' + UI.getShortNumberString(f.totalRevenue) + '</div><div><b>Installments:</b> ' + f.installments.length + '</div></div>');
                    card.append('<div style="font-size:9pt; font-weight:bold; color:#34495e; margin-bottom:4px;">Fanbase Score: ' + Math.floor(f.fanbaseScore) + '/100</div>').append(renderFanbaseBar(f.fanbaseScore));
                    var actions = _ae(card, '<div style="display:flex; gap:10px; margin-top:15px;"></div>');
                    _ae(actions, '<div class="selectorButton orangeButton" style="flex:1; text-align:center; font-size:10pt; padding:6px 0;">+ New Entry</div>').click(function () { showNewEntryModal(f, container, refresh); });
                    _ae(actions, '<div class="selectorButton greenButton" style="flex:1; text-align:center; font-size:10pt; padding:6px 0;">License to Subsidiary</div>').click(function () { showLicenseModal(f, container, refresh); });
                    if (f.fanbaseScore <= 0) {
                        _ae(actions, '<div class="selectorButton" style="flex:1; text-align:center; font-size:10pt; padding:6px 0; background:#95a5a6; color:white;">Revive ($1M)</div>').click(function () {
                            if (GameManager.company.cash < 1e6) { csNotify("Not enough cash!"); return; }
                            GameManager.company.adjustCash(-1e6, "Franchise Revival: " + f.name);
                            f.fanbaseScore = 15; f.isDead = false; Sound.click(); refresh();
                        });
                    }
                    var sellPrice = Math.floor(f.totalRevenue * 0.6 + 1e6);
                    var sellBtn = _ae(actions, '<div class="selectorButton deleteButton" style="flex:1; text-align:center; font-size:10pt; padding:6px 0;">' + (f.isListedByPlayer ? "Listed (" + f.saleWeekRemaining + "w)" : "Sell") + '</div>');
                    if (f.isListedByPlayer) sellBtn.addClass('disabled');
                    sellBtn.click(function () {
                        if (f.isListedByPlayer) return;
                        showConfirmSellModal(f, refresh, function () {
                            f.isListedByPlayer = true; f.playerSalePrice = sellPrice; f.saleWeekRemaining = 8 + Math.floor(Math.random() * 9);
                            Sound.click();
                        });
                    });
                    var histBtn = _ae(card, '<div style="text-align:center; font-size:9pt; color:#3498db; cursor:pointer; margin-top:10px; text-decoration:underline;">View History</div>');
                    var histList = _ae(card, '<div style="display:none; margin-top:10px; border-top:1px solid #eee; padding-top:10px;"></div>');
                    f.installments.slice().reverse().forEach(function (inst) {
                        _ae(histList, '<div style="font-size:9pt; display:flex; justify-content:space-between; margin-bottom:4px;"><span>' + inst.title + ' (' + inst.type + ')</span><span>' + inst.score + '/10</span></div>');
                    });
                    histBtn.click(function () { histList.toggle(); });
                });
            } else if (subTab === "register") {
                container.append('<h3 style="color: #d35400; margin-top: 0;">Register New Franchise</h3>');
                container.append('<p style="font-size: 10pt; color: #7f8c8d;">Turn a successful standalone game into a full franchise. Standard registration cost: $500,000 per existing franchise.</p>');

                var games = GameManager.company.gameLog.filter(function (g) { return !getFranchiseForGame(g.id); });
                var cost = 500000 * (getPlayerFranchises().length + 1);

                if (games.length === 0) {
                    container.append('<div style="padding: 20px; text-align: center; color: #7f8c8d;">No eligible games found.</div>');
                } else {
                    var select = $('<select style="width: 100%; padding: 10px; border-radius: 0px; border: 2px solid #555; font-size: 11pt; margin-bottom: 15px; color: black;"></select>');
                    games.forEach(function (g) { select.append('<option value="' + g.id + '">' + g.title + ' (Score: ' + g.score + ')</option>'); });
                    container.append(select);
                    makeSelectSearchable(select);

                    container.append('<div style="font-weight: bold; margin-bottom: 5px;">Franchise Name:</div>');
                    var nameInput = $('<input type="text" placeholder="Enter Name" style="width: 100%; padding: 10px; border-radius: 0px; border: 2px solid #555; font-size: 11pt; margin-bottom: 15px; color: black;">');
                    container.append(nameInput);

                    var regBtn = $('<div class="selectorButton orangeButton" style="text-align: center; padding: 12px 0; font-size: 12pt; font-weight: bold;">Register for $' + UI.getShortNumberString(cost) + '</div>');
                    regBtn.click(function () {
                        var game = GameManager.company.getGameById(select.val());
                        if (!game) return;
                        var name = nameInput.val() || game.title;
                        var fransArr = store.data.franchises || [];
                        var exists = fransArr.some(function (fr) { return fr.name.toLowerCase() === name.toLowerCase(); });
                        if (exists) { csNotify("A franchise with this name already exists!"); return; }

                        if (GameManager.company.cash < cost) { csNotify("Not enough cash!"); return; }
                        store.data.lastFranchiseNumId = (store.data.lastFranchiseNumId || 0) + 1;
                        var f = {
                            id: "FRAN_" + Date.now() + "_" + Math.floor(Math.random() * 100000),
                            numId: store.data.lastFranchiseNumId,
                            name: name,
                            ownerId: "player",
                            originGameId: game.id,
                            originGameTitle: game.title,
                            topic: game.topic.name,
                            genre: game.genre.name,
                            tier: 1,
                            totalRevenue: game.totalSalesCash,
                            installments: [{
                                id: "FE_" + Date.now() + "_" + Math.floor(Math.random() * 100000),
                                type: "original",
                                title: game.title,
                                gameId: game.id,
                                producedBy: "player",
                                score: game.score,
                                revenue: game.totalSalesCash,
                                releaseWeek: game.releaseWeek,
                                size: "N/A"
                            }],
                            fanbaseScore: Math.min(100, game.score * 7),
                            lastEntryWeek: game.releaseWeek,
                            isForSale: false,
                            salePrice: 0,
                            licenseOffers: [],
                            acquisitionHistory: [],
                            mediaProperties: []
                        };
                        store.data.franchises.push(f);
                        GameManager.company.adjustCash(-cost, "Franchise Registration: " + f.name);
                        Sound.click();
                        subTab = "my";
                        refresh();
                    });
                    container.append(regBtn);
                }
            } else if (subTab === "acquisitions") {
                var forSale = getAIFranchises().filter(function (f) { return f.isForSale; });
                container.append('<h3 style="color: #d35400; margin-top: 0;">Available for Acquisition</h3>');
                if (forSale.length === 0) {
                    container.append('<div style="text-align: center; padding: 40px; color: #7f8c8d;">No franchises currently listed for sale by competitors.</div>');
                }
                forSale.forEach(function (f) {
                    var card = $('<div class="cs-stagger-item" style="background: white; border-radius: 0px; border: 2px solid #555; padding: 15px; margin-bottom: 15px; box-shadow: none;"></div>');
                    card.append('<div style="display: flex; justify-content: space-between;"><b>' + f.name + '</b>' + renderTierBadge(f.tier).prop('outerHTML') + '</div>');
                    var sArrAcq = store.data.studios || [];
                    var owner = sArrAcq.filter(function (s) { return s.id === f.ownerId; })[0];
                    card.append('<div style="font-size: 9pt; color: #7f8c8d; margin-top: 5px;">Seller: ' + (owner ? owner.name : "Unknown") + '</div>');
                    card.append('<div style="font-size: 10pt; margin-top: 10px;">Price: <b>$' + UI.getShortNumberString(f.salePrice) + '</b></div>');

                    var buyBtn = $('<div class="selectorButton greenButton" style="width: 100%; text-align: center; margin-top: 12px; padding: 8px 0;">Acquire Franchise</div>');
                    buyBtn.click(function () {
                        if (GameManager.company.cash < f.salePrice) { csNotify("Not enough cash!"); return; }
                        GameManager.company.adjustCash(-f.salePrice, "Franchise Acquisition: " + f.name);
                        f.ownerId = "player";
                        f.isForSale = false;
                        if (!f.acquisitionHistory) f.acquisitionHistory = [];
                        f.acquisitionHistory.push({ week: Math.floor(GameManager.company.currentWeek), newOwner: "player", price: f.salePrice });
                        Sound.click();
                        refresh();
                    });
                    card.append(buyBtn);
                    container.append(card);
                });


                var aiOffers = store.data.franchises.filter(function (f) { return f.ownerId !== "player" && f.isForSale; });
                if (aiOffers.length > 0) {
                    container.append('<h3 style="color: #d35400; margin-top: 0;">Active AI Sale Offers</h3>');
                    aiOffers.forEach(function (f) {
                        var salePrice = f.salePrice || (f.totalRevenue * 0.8 + 2000000);
                        var offerCard = $('<div class="cs-stagger-item" style="background: white; border-radius: 0px; border: 2px solid #555; padding: 15px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;"></div>');
                        var owner = (store.data.studios || []).filter(function (s) { return s.id === f.ownerId; })[0];
                        var info = $('<div><b style="font-size: 13pt;">' + f.name + '</b><br><span style="font-size: 9pt; color: #7f8c8d;">Owner: ' + (owner ? owner.name : "AI") + ' | Tier: ' + f.tier + '</span></div>');
                        offerCard.append(info);

                        var buyBtn = $('<div class="selectorButton greenButton" style="padding: 10px 20px; font-weight: bold;">Buy ($' + UI.getShortNumberString(salePrice) + ')</div>');
                        buyBtn.click(function () {
                            if (GameManager.company.cash < salePrice) { csNotify("Not enough cash!"); return; }
                            GameManager.company.adjustCash(-salePrice, "Acquired Franchise: " + f.name);
                            f.ownerId = "player";
                            f.isForSale = false;
                            if (!f.acquisitionHistory) f.acquisitionHistory = [];
                            f.acquisitionHistory.push({ week: Math.floor(GameManager.company.currentWeek), newOwner: "player", price: salePrice });
                            _n("Acquisition Complete!", "You are now the proud owner of the " + f.name + " franchise.");
                            refresh();
                        });
                        offerCard.append(buyBtn);
                        container.append(offerCard);
                    });
                }


                container.append('<h3 style="color: #d35400; ' + (aiOffers.length > 0 ? "margin-top: 30px;" : "margin-top:0;") + '">Propose Custom Offer</h3>');
                var unlisted = getAIFranchises().filter(function (f) { return !f.isForSale; });
                if (unlisted.length === 0) {
                    container.append('<div style="text-align: center; color: #7f8c8d; padding: 20px;">No other AI franchises available for offer.</div>');
                } else {
                    var offerDiv = $('<div style="background: white; border-radius: 0px; border: 2px solid #555; padding: 15px;"></div>');
                    var fSelect = $('<select style="width: 100%; padding: 10px; margin-bottom: 15px; color: black; border: 2px solid #555;"></select>');
                    unlisted.forEach(function (f) {
                        var sArrUnl = store.data.studios || [];
                        var owner = sArrUnl.filter(function (s) { return s.id === f.ownerId; })[0];
                        fSelect.append('<option value="' + f.id + '">' + f.name + ' (' + (owner ? owner.name : "AI") + ')</option>');
                    });
                    offerDiv.append('<div style="font-size: 9pt; font-weight: bold; margin-bottom: 5px;">Select Target:</div>').append(fSelect);

                    var priceInput = $('<input type="number" placeholder="Offer Amount ($)" style="width: 100%; padding: 10px; margin-bottom: 15px; color: black; border: 2px solid #555;">');
                    offerDiv.append('<div style="font-size: 9pt; font-weight: bold; margin-bottom: 5px;">Your Offer (Weight based on revenue):</div>').append(priceInput);

                    var offerBtn = $('<div class="selectorButton orangeButton" style="width: 100%; text-align: center; padding: 12px 0; font-weight: bold;">Submit Proactive Offer</div>');
                    offerBtn.click(function () {
                        var f = getFranchiseById(fSelect.val());
                        var price = parseInt(priceInput.val());
                        if (isNaN(price) || price <= 0) { csNotify("Invalid price!"); return; }
                        if (GameManager.company.cash < price) { csNotify("Not enough cash!"); return; }


                        var thresh = f.totalRevenue * 1.5 + 2000000;
                        if (price >= thresh && Math.random() < 0.40) {
                            GameManager.company.adjustCash(-price, "Acquisition: " + f.name);
                            f.ownerId = "player";
                            f.isForSale = false;
                            _n("Offer Accepted!", "The studio accepted your proactive offer for '" + f.name + "'.");
                            refresh();
                        } else {
                            csNotify("The studio has rejected your offer.");
                        }
                    });
                    offerDiv.append(offerBtn);
                    container.append(offerDiv);
                }
            } else if (subTab === "proposals") {
                container.append('<h3 style="color: #d35400; margin-top: 0;">Licensing Proposals</h3>');
                container.append('<p style="font-size: 10pt; color: #7f8c8d; margin-bottom: 20px;">Unowned studios may periodically approach you to license your franchises. These offers expire if not reviewed.</p>');

                var offers = store.data.aiLicensingOffers || [];
                if (offers.length === 0) {
                    container.append('<div style="text-align: center; padding: 40px; color: #7f8c8d; font-style: italic;">No active licensing proposals. Keep building Tier 2+ franchises to attract studio interest!</div>');
                } else {
                    offers.forEach(function (o) {
                        var card = $('<div style="background: white; border-radius: 0px; border: 2px solid #555; padding: 15px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; box-shadow: none;"></div>');
                        var info = $('<div></div>');
                        info.append('<div style="font-weight: bold; font-size: 11pt; color: #d35400;">' + o.franchiseName + '</div>');
                        info.append('<div style="font-size: 9pt; color: #2c3e50;">From: <b>' + o.studioName + '</b></div>');
                        info.append('<div style="font-size: 9pt; color: #7f8c8d; margin-top: 4px;">Upfront: <b>$' + UI.getShortNumberString(o.upfront) + '</b> | Royalty: <b>' + (o.royaltyRate * 100).toFixed(0) + '%</b></div>');
                        card.append(info);

                        var revBtn = $('<div class="selectorButton orangeButton" style="padding: 8px 15px; font-weight: bold;">Review Offer</div>');
                        revBtn.click(function () {
                            csShowAILicensingModal(o);
                        });
                        card.append(revBtn);
                        container.append(card);
                    });
                }
            }
        }


        refresh();
    }

