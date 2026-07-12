(function () {
    // Game Dev Tycoon Mod - DLC Wizard UI

    var DLCWizard = {
        currentPage: 1,
        maxPages: 7,
        currentData: {}
    };

    DLCWizard.show = function(baseGameId) {
        DLCWizard.currentPage = 1;
        DLCWizard.currentData = {
            baseGameId: baseGameId,
            title: "",
            subtitle: "",
            theme: "Story Expansion",
            type: "Story Expansion",
            scale: "Medium",
            allocation: {},
            price: 9.99,
            marketing: "None",
            releaseStrategy: "Immediate"
        };
        
        // Initialize allocation to 0
        DLCSystem.Allocations.forEach(function(a) { DLCWizard.currentData.allocation[a] = 0; });

        $('#dlc-wizard-modal').remove(); // Clean up any previous wizard modal instance to prevent ID conflicts

        var modal = $('<div id="dlc-wizard-modal" class="windowBorder" style="background:#eee; padding:20px; width:600px; max-height:80%; display:flex; flex-direction:column; border-radius:10px;"></div>');
        modal.append('<h3 style="margin-top:0; color:#d35400;">DLC Wizard</h3>');
        
        var content = $('<div id="dlc-wizard-content" style="height:400px; overflow-y:auto; padding:10px; background:#fff; border:1px solid #bdc3c7;"></div>');
        modal.append(content);

        var footer = $('<div style="display:flex; justify-content:space-between; margin-top:20px;"></div>');
        var btnPrev = $('<div id="dlc-btn-prev" class="selectorButton whiteBoardButton" style="width:120px; text-align:center;">Previous</div>').click(function() { DLCWizard.navigate(-1); }).hide();
        var btnNext = $('<div id="dlc-btn-next" class="selectorButton orangeButton" style="width:120px; text-align:center;">Next</div>').click(function() { DLCWizard.navigate(1); });
        var btnClose = $('<div class="selectorButton" style="width:120px; text-align:center;">Close</div>').click(function() { 
            $.modal.close(); 
            $('#dlc-wizard-modal').remove(); 
        });
        
        footer.append(btnPrev).append(btnClose).append(btnNext);
        modal.append(footer);
        
        modal.modal({
            overlayClose: false,
            opacity: 60,
            overlayCss: { backgroundColor: "#000" },
            containerCss: { backgroundColor: "transparent", border: "none" }
        });
        
        DLCWizard.renderPage();
    };

    DLCWizard.navigate = function(dir) {
        if (dir === 1 && DLCWizard.currentPage === 4) {
            var sum = 0;
            $('.dlc-alloc-input').each(function() { sum += parseInt($(this).val()) || 0; });
            if (sum !== 100) {
                var totalEl = $('#dlc-alloc-total');
                totalEl.css('font-size', '14pt').animate({fontSize: '12pt'}, 200);
                return;
            }
        }

        DLCWizard.saveCurrentPage();
        DLCWizard.currentPage += dir;
        
        if (DLCWizard.currentPage > DLCWizard.maxPages) {
            DLCWizard.finish();
            return;
        }
        
        if (DLCWizard.currentPage < 1) DLCWizard.currentPage = 1;
        
        DLCWizard.renderPage();
    };

    DLCWizard.saveCurrentPage = function() {
        var page = DLCWizard.currentPage;
        if (page === 1) {
            DLCWizard.currentData.title = $('#dlc-input-title').val() || "Expansion";
            DLCWizard.currentData.subtitle = $('#dlc-input-subtitle').val() || "";
            DLCWizard.currentData.theme = $('#dlc-select-theme').val();
        } else if (page === 2) {
            DLCWizard.currentData.type = $('#dlc-select-type').val();
        } else if (page === 3) {
            DLCWizard.currentData.scale = $('#dlc-select-scale').val();
            // Auto-update price when scale changes
            DLCWizard.currentData.price = DLCSystem.Scales[DLCWizard.currentData.scale].optimalPrice;
        } else if (page === 4) {
            DLCSystem.Allocations.forEach(function(a) {
                var val = parseInt($('#dlc-alloc-' + a.replace(/\s+/g, '-')).val()) || 0;
                DLCWizard.currentData.allocation[a] = val;
            });
        } else if (page === 5) {
            DLCWizard.currentData.price = parseFloat($('#dlc-input-price').val()) || 9.99;
        } else if (page === 6) {
            DLCWizard.currentData.marketing = $('#dlc-select-marketing').val();
        } else if (page === 7) {
            DLCWizard.currentData.releaseStrategy = $('#dlc-select-release').val();
        }
    };

    DLCWizard.renderPage = function() {
        var page = DLCWizard.currentPage;
        var content = $('#dlc-wizard-content');
        content.empty();
        
        $('#dlc-btn-prev').toggle(page > 1);
        var btnNext = $('#dlc-btn-next');
        btnNext.text(page === DLCWizard.maxPages ? "Start Development" : "Next");

        if (page === 1) {
            content.append('<h3>Page 1: Identity & Theme</h3>');
            content.append('<label>Title: <input id="dlc-input-title" type="text" value="'+DLCWizard.currentData.title+'"></label><br><br>');
            content.append('<label>Subtitle: <input id="dlc-input-subtitle" type="text" value="'+DLCWizard.currentData.subtitle+'"></label><br><br>');
            
            var themeSel = $('<select id="dlc-select-theme"></select>');
            DLCSystem.Themes.forEach(function(t) {
                themeSel.append('<option value="'+t+'">'+t+'</option>');
            });
            themeSel.val(DLCWizard.currentData.theme);
            content.append('<label>Theme: </label>').append(themeSel);
            
        } else if (page === 2) {
            content.append('<h3>Page 2: DLC Type</h3>');
            var typeSel = $('<select id="dlc-select-type"></select>');
            Object.keys(DLCSystem.Types).forEach(function(t) {
                typeSel.append('<option value="'+t+'">'+t+'</option>');
            });
            typeSel.val(DLCWizard.currentData.type);
            content.append('<label>Type: </label>').append(typeSel);
            content.append('<p style="margin-top:20px; color:#666;">Different types have unique review impacts, fan expectations, and baseline costs.</p>');
            
        } else if (page === 3) {
            content.append('<h3>Page 3: Content Scale</h3>');
            var scaleSel = $('<select id="dlc-select-scale"></select>');
            Object.keys(DLCSystem.Scales).forEach(function(s) {
                scaleSel.append('<option value="'+s+'">'+s+'</option>');
            });
            scaleSel.val(DLCWizard.currentData.scale);
            content.append('<label>Scale: </label>').append(scaleSel);
            content.append('<p style="margin-top:20px; color:#666;">Scale strictly dictates development time, cost, marketing effectiveness, and price expectations.</p>');
            
        } else if (page === 4) {
            content.append('<h3>Page 4: Content Allocation (100 Points)</h3>');
            content.append('<div style="margin-bottom:10px;">Total Points: <span id="dlc-alloc-total" style="font-weight:bold;">0</span> / 100</div>');
            
            var grid = $('<div style="display:grid; grid-template-columns: 1fr 1fr; gap: 10px;"></div>');
            DLCSystem.Allocations.forEach(function(a) {
                var safeId = a.replace(/\s+/g, '-');
                var val = DLCWizard.currentData.allocation[a];
                var row = $('<div><label style="display:inline-block; width:150px;">'+a+'</label> <input type="number" min="0" max="100" class="dlc-alloc-input" id="dlc-alloc-'+safeId+'" value="'+val+'" style="width:60px;"></div>');
                grid.append(row);
            });
            content.append(grid);
            
            content.on('input', '.dlc-alloc-input', function() {
                var sum = 0;
                $('.dlc-alloc-input').each(function() { sum += parseInt($(this).val()) || 0; });
                var totalEl = $('#dlc-alloc-total');
                totalEl.text(sum);
                totalEl.css('color', sum === 100 ? 'green' : (sum > 100 ? 'red' : 'black'));
                $('#dlc-btn-next').prop('disabled', sum !== 100);
            });
            // Trigger calculation
            $('.dlc-alloc-input').first().trigger('input');
            
        } else if (page === 5) {
            content.append('<h3>Page 5: Pricing System</h3>');
            content.append('<label>Price ($): <input id="dlc-input-price" type="number" step="0.01" value="'+DLCWizard.currentData.price+'"></label><br><br>');
            var opt = DLCSystem.Scales[DLCWizard.currentData.scale].optimalPrice;
            content.append('<p style="color:#666;">Recommended optimal price for <b>' + DLCWizard.currentData.scale + '</b> scale is <b>$' + opt + '</b>. Deviating from this impacts review scores and sales.</p>');
            
        } else if (page === 6) {
            content.append('<h3>Page 6: Marketing Campaign</h3>');
            var mktSel = $('<select id="dlc-select-marketing"></select>');
            ['None', 'Social Media', 'Magazine', 'TV', 'Worldwide Campaign', 'Convention', 'Influencer Campaign', 'Beta Access'].forEach(function(m) {
                mktSel.append('<option value="'+m+'">'+m+'</option>');
            });
            mktSel.val(DLCWizard.currentData.marketing);
            content.append('<label>Campaign: </label>').append(mktSel);
            
        } else if (page === 7) {
            content.append('<h3>Page 7: Release Strategy & Timing</h3>');
            var relSel = $('<select id="dlc-select-release"></select>');
            ['Immediate', 'Holiday', 'Anniversary', 'Franchise Event', 'Platform Launch', 'Publisher Showcase'].forEach(function(r) {
                relSel.append('<option value="'+r+'">'+r+'</option>');
            });
            relSel.val(DLCWizard.currentData.releaseStrategy);
            content.append('<label>Release Window: </label>').append(relSel);
            
            content.append('<hr style="margin-top:20px;">');
            content.append('<h4>Summary</h4>');
            content.append('<p><b>Title:</b> ' + DLCWizard.currentData.title + ' ' + DLCWizard.currentData.subtitle + '</p>');
            content.append('<p><b>Type:</b> ' + DLCWizard.currentData.scale + ' ' + DLCWizard.currentData.type + '</p>');
            var estCost = DLCSystem.calculateDevelopmentCost(DLCWizard.currentData.scale, DLCWizard.currentData.type, DLCWizard.currentData.allocation);
            content.append('<p><b>Estimated Base Cost:</b> $' + UI.getShortNumberString(estCost) + '</p>');
        }
    };

    DLCWizard.finish = function() {
        $.modal.close();
        $('#dlc-wizard-modal').remove();
        
        // Ensure new DLC schema exists properly before writing to it
        if (!store.data.dlcData) store.data.dlcData = { games: {}, dlcs: {} };
        if (!store.data.dlcData.dlcs) store.data.dlcData.dlcs = {};
        if (!store.data.dlcData.games) store.data.dlcData.games = {};
        
        var currentWeek = Math.floor(GameManager.company.currentWeek);
        var dlcId = "DLC_" + Date.now();
        var gameId = DLCWizard.currentData.baseGameId;
        
        var estCost = DLCSystem.calculateDevelopmentCost(DLCWizard.currentData.scale, DLCWizard.currentData.type, DLCWizard.currentData.allocation);
        
        // Start development
        var newDLC = {
            id: dlcId,
            baseGameId: gameId,
            title: DLCWizard.currentData.title,
            subtitle: DLCWizard.currentData.subtitle,
            theme: DLCWizard.currentData.theme,
            type: DLCWizard.currentData.type,
            scale: DLCWizard.currentData.scale,
            allocation: DLCWizard.currentData.allocation,
            price: DLCWizard.currentData.price,
            marketingStrategy: DLCWizard.currentData.marketing,
            releaseTiming: DLCWizard.currentData.releaseStrategy,
            
            devStats: { 
                cost: estCost, 
                marketingCost: 0, // Placeholder
                weeksInDev: 0, 
                bugs: 0,
                progress: 0,
                requiredProgress: DLCSystem.calculateRequiredProgress(DLCWizard.currentData.scale, DLCWizard.currentData.type)
            },
            marketStats: { 
                score: 0, 
                totalSales: 0, 
                totalRevenue: 0, 
                baseGameUnitsAtLaunch: 0 
            },
            status: "development",
            history: {
                salesOverTime: [],
                priceHistory: []
            }
        };
        
        store.data.dlcData.dlcs[dlcId] = newDLC;
        if (!store.data.dlcData.games[gameId]) {
            store.data.dlcData.games[gameId] = { activeSeasonPass: null, dlcList: [] };
        }
        store.data.dlcData.games[gameId].dlcList.push(dlcId);
        
        // Take upfront cash
        GameManager.company.adjustCash(-estCost, "DLC Development: " + newDLC.title);
        
        _n("DLC Production Started", "Development on " + newDLC.title + " has begun.");
    };

    window.DLCWizard = DLCWizard;
})();
