    (function injectModStyles() {
        if (document.getElementById('cs-mod-styles')) return;
        var css = document.createElement('style');
        css.id = 'cs-mod-styles';
        css.textContent =
            '.mod-franchise-icon{display:inline-block;color:#d35400;font-weight:bold;margin-right:5px;cursor:help;}' +
            '#modUI input,#modUI select,.simplemodal-data input,.simplemodal-data select{border:1px solid #bdc3c7 !important; border-radius:4px !important; color:black !important;}' +
            '#modUI input:focus,#modUI select:focus,.simplemodal-data input:focus,.simplemodal-data select:focus{border-color:#d35400 !important; outline:none !important; box-shadow:0 0 0 2px rgba(211,84,0,0.2) !important;}' +
            '.modal-content { border-radius: 8px !important; box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important; border:none !important; }' +
            '#modUI_container.simplemodal-container{display:flex !important;flex-direction:column !important;border:none !important;box-shadow:0 10px 25px rgba(0,0,0,0.3) !important;border-radius:8px !important;overflow:hidden !important;}' +
            '#modUI_container .simplemodal-data{flex:1 !important;display:flex !important;flex-direction:column !important;overflow:hidden !important;min-height:0 !important;background:#f8f9fa !important;}' +
            '#modUI_content{scroll-behavior:auto !important;}' +
            '.fran-tier-1{background:#95a5a6;}.fran-tier-2{background:#2980b9;}.fran-tier-3{background:#27ae60;}.fran-tier-4{background:#d35400;}.fran-tier-5{background:#f39c12;}' +
            '.fanbase-bar-track{background:#eee;border:none;height:10px;overflow:hidden;box-shadow:inset 0 1px 2px rgba(0,0,0,0.1);}.fanbase-bar-fill{height:100%;transition:width 0.4s ease;}' +
            '.entry-type-btn{display:inline-block;padding:8px 12px;margin:5px;background:#bdc3c7;color:#2c3e50;cursor:pointer;font-size:10pt;font-weight:bold;border:1px solid #aaa;}' +
            '.entry-type-btn:hover:not(.disabled){background:#d35400;color:white;}' +
            '.entry-type-btn.selected{background:#d35400;color:white;border:1px solid #000;}' +
            '.entry-type-btn.disabled{opacity:0.5;cursor:not-allowed;background:#eee;color:#999;}' +
            '.media-type-card{border:none;padding:10px 14px;margin-bottom:8px;cursor:pointer;background:#f8f9fa;box-shadow:0 1px 3px rgba(0,0,0,0.12);}' +
            '.media-type-card:hover{background:#fff;box-shadow:0 3px 6px rgba(0,0,0,0.15);}.media-type-card.selected{border-left:4px solid #d35400;background:#fff;}' +
            '.cs-progress-track{background:#e0e0e0;border:none;height:12px;overflow:hidden;margin-top:6px;box-shadow:inset 0 1px 3px rgba(0,0,0,0.1);}' +
            '.cs-progress-fill{height:100%;background:#d35400;transition:width .3s ease;}'
 +
            '#modUI .selectorButton { white-space: normal !important; height: auto !important; min-height: 28px !important; width: fit-content !important; min-width: 100px; box-sizing: border-box; line-height: 1.2; }';
        document.head.appendChild(css);
    })();

