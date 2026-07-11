(function () {
    var polyfillFind = function(predicate) {
        if (this == null) throw new TypeError('"this" is null or not defined');
        var o = Object(this), len = o.length >>> 0;
        if (typeof predicate !== 'function') throw new TypeError('predicate must be a function');
        var thisArg = arguments[1], k = 0;
        while (k < len) {
            var kValue = o[k];
            if (predicate.call(thisArg, kValue, k, o)) return kValue;
            k++;
        }
        return undefined;
    };
    var polyfillFindIndex = function(predicate) {
        if (this == null) throw new TypeError('"this" is null or not defined');
        var o = Object(this), len = o.length >>> 0;
        if (typeof predicate !== 'function') throw new TypeError('predicate must be a function');
        var thisArg = arguments[1], k = 0;
        while (k < len) {
            var kValue = o[k];
            if (predicate.call(thisArg, kValue, k, o)) return k;
            k++;
        }
        return -1;
    };
    var polyfillIncludes = function(searchElement, fromIndex) {
        if (this == null) throw new TypeError('"this" is null or not defined');
        var o = Object(this), len = o.length >>> 0;
        if (len === 0) return false;
        var n = fromIndex | 0, k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        while (k < len) {
            if (o[k] === searchElement || (typeof o[k] === 'number' && typeof searchElement === 'number' && isNaN(o[k]) && isNaN(searchElement))) return true;
            k++;
        }
        return false;
    };

    function safeDefine(proto, name, fn) {
        if (!proto) return;
        try {
            var desc = Object.getOwnPropertyDescriptor(proto, name);
            if (!desc || desc.enumerable || !desc.value) {
                Object.defineProperty(proto, name, { value: fn, configurable: true, writable: true, enumerable: false });
            }
        } catch(e) {}
    }

    function applyPolyfills(proto) {
        safeDefine(proto, 'find', polyfillFind);
        safeDefine(proto, 'findIndex', polyfillFindIndex);
        safeDefine(proto, 'includes', polyfillIncludes);
    }

    if (typeof window !== 'undefined' && window.Array) applyPolyfills(window.Array.prototype);
    if (typeof global !== 'undefined' && global.Array) applyPolyfills(global.Array.prototype);
    if (typeof Array !== 'undefined') applyPolyfills(Array.prototype);
    
    if (typeof GDT !== 'undefined' && GDT.on && GDT.eventKeys) {
        GDT.on(GDT.eventKeys.ui.contextMenuShowing, function(e) {
            if (e && e.items && e.items.constructor) applyPolyfills(e.items.constructor.prototype);
        });
    }

