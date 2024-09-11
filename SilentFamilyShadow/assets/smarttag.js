;
(function() {
    var dfltPluginCfg = {};
    var dfltGlobalCfg = {
        "site": 607324,
        "log": "logc136",
        "logSSL": "logs1136",
        "domain": "xiti.com",
        "collectDomain": "logc136.xiti.com",
        "collectDomainSSL": "logs1136.xiti.com",
        "userIdOrigin": "server",
        "pixelPath": "/hit.xiti",
        "disableCookie": false,
        "disableStorage": false,
        "cookieSecure": true,
        "cookieDomain": "",
        "preview": false,
        "plgs": ["Campaigns", "Clicks", "ClientSideUserId", "ContextVariables", "Page", "RichMedia", "OnSiteAds"],
        "lazyLoadingPath": "",
        "documentLevel": "document",
        "redirect": false,
        "activateCallbacks": true,
        "medium": "",
        "ignoreEmptyChapterValue": true,
        "base64Storage": false,
        "sendHitWhenOptOut": true,
        "forceHttp": false,
        "requestMethod": "GET",
        "maxHitSize": 2000
    };
    (function(a) {
        a.ATInternet = a.ATInternet || {};
        a.ATInternet.Tracker = a.ATInternet.Tracker || {};
        a.ATInternet.Tracker.Plugins = a.ATInternet.Tracker.Plugins || {}
    })(window);
    var Utils = function() {
        function a(g) {
            var m = typeof g;
            if ("object" !== m || null === g) return "string" === m && (g = '"' + g + '"'), String(g);
            var e, b, d = [],
                c = g.constructor === Array;
            for (e in g) g.hasOwnProperty(e) && (b = g[e], m = typeof b, "function" !== m && "undefined" !== m && ("string" === m ? b = '"' + b.replace(/[^\\]"/g, '\\"') + '"' : "object" === m && null !== b && (b = a(b)), d.push((c ? "" : '"' + e + '":') + String(b))));
            return (c ? "[" : "{") + String(d) + (c ? "]" : "}")
        }

        function h(a) {
            return null === a ? "" : (a + "").replace(b, "")
        }

        function l(a) {
            var m, e = null;
            return (a = h(a + "")) &&
                !h(a.replace(c, function(a, g, b, d) {
                    m && g && (e = 0);
                    if (0 === e) return a;
                    m = b || g;
                    e += !d - !b;
                    return ""
                })) ? Function("return " + a)() : null
        }
        var k = this,
            c = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g,
            b = RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g");
        k.isLocalStorageAvailable = function() {
            try {
                var a = localStorage;
                a.setItem("__storage_test__", "__storage_test__");
                a.removeItem("__storage_test__");
                return !0
            } catch (b) {
                return !1
            }
        };
        k.isBeaconMethodAvailable = function() {
            return window.navigator && "function" === typeof window.navigator.sendBeacon
        };
        k.Base64 = {
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function(a) {
                var b = "",
                    e, d, c, f, p, h, t = 0;
                for (a = k.Base64._utf8_encode(a); t < a.length;) e = a.charCodeAt(t++), d = a.charCodeAt(t++), c = a.charCodeAt(t++), f = e >> 2, e = (e & 3) << 4 | d >> 4, p = (d & 15) << 2 | c >> 6, h = c & 63, isNaN(d) ? p = h = 64 : isNaN(c) && (h = 64), b = b + this._keyStr.charAt(f) + this._keyStr.charAt(e) + this._keyStr.charAt(p) + this._keyStr.charAt(h);
                return b
            },
            decode: function(a) {
                var b = "",
                    e, d, c, f, p, h = 0;
                for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); h < a.length;) e = this._keyStr.indexOf(a.charAt(h++)), d = this._keyStr.indexOf(a.charAt(h++)), f = this._keyStr.indexOf(a.charAt(h++)), p = this._keyStr.indexOf(a.charAt(h++)), e = e << 2 | d >> 4, d = (d & 15) << 4 | f >> 2, c = (f & 3) << 6 | p, b += String.fromCharCode(e), 64 != f && (b += String.fromCharCode(d)), 64 != p && (b += String.fromCharCode(c));
                return b = k.Base64._utf8_decode(b)
            },
            _utf8_encode: function(a) {
                a = a.replace(/\r\n/g, "\n");
                for (var b = "", e = 0; e <
                    a.length; e++) {
                    var d = a.charCodeAt(e);
                    128 > d ? b += String.fromCharCode(d) : (127 < d && 2048 > d ? b += String.fromCharCode(d >> 6 | 192) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128)), b += String.fromCharCode(d & 63 | 128))
                }
                return b
            },
            _utf8_decode: function(a) {
                for (var b = "", e = 0, d, c, f; e < a.length;) d = a.charCodeAt(e), 128 > d ? (b += String.fromCharCode(d), e++) : 191 < d && 224 > d ? (c = a.charCodeAt(e + 1), b += String.fromCharCode((d & 31) << 6 | c & 63), e += 2) : (c = a.charCodeAt(e + 1), f = a.charCodeAt(e + 2), b += String.fromCharCode((d & 15) << 12 |
                    (c & 63) << 6 | f & 63), e += 3);
                return b
            }
        };
        k.loadScript = function(a, b) {
            var e;
            b = b || function() {};
            e = document.createElement("script");
            e.type = "text/javascript";
            e.src = a.url;
            e.async = !1;
            e.defer = !1;
            e.onload = e.onreadystatechange = function(a) {
                a = a || window.event;
                if ("load" === a.type || /loaded|complete/.test(e.readyState) && (!document.documentMode || 9 > document.documentMode)) e.onload = e.onreadystatechange = e.onerror = null, b(null, a)
            };
            e.onerror = function(a) {
                e.onload = e.onreadystatechange = e.onerror = null;
                b({
                    msg: "script not loaded",
                    event: a
                })
            };
            var d = document.head || document.getElementsByTagName("head")[0];
            d.insertBefore(e, d.lastChild)
        };
        k.cloneSimpleObject = function(a, b) {
            if ("object" !== typeof a || null === a || a instanceof Date) return a;
            var e = new a.constructor,
                d;
            for (d in a) a.hasOwnProperty(d) && (void 0 === d || b && void 0 === a[d] || (e[d] = k.cloneSimpleObject(a[d])));
            return e
        };
        k.jsonSerialize = function(b) {
            try {
                return "undefined" !== typeof JSON && JSON.stringify ? JSON.stringify(b) : a(b)
            } catch (d) {
                return null
            }
        };
        k.jsonParse = function(a) {
            try {
                return "undefined" !== typeof JSON &&
                    JSON.parse ? JSON.parse(a + "") : l(a)
            } catch (b) {
                return null
            }
        };
        k.arrayIndexOf = function(a, b) {
            if (Array.prototype.indexOf) {
                var e = -1;
                "undefined" !== typeof a.indexOf(b) && (e = a.indexOf(b));
                return e
            }
            return function(a) {
                if (null == this) throw new TypeError;
                var b = Object(this),
                    g = b.length >>> 0;
                if (0 === g) return -1;
                var e = 0;
                1 < arguments.length && (e = Number(arguments[1]), e != e ? e = 0 : 0 != e && Infinity != e && -Infinity != e && (e = (0 < e || -1) * Math.floor(Math.abs(e))));
                if (e >= g) return -1;
                for (e = 0 <= e ? e : Math.max(g - Math.abs(e), 0); e < g; e++)
                    if (e in b && b[e] ===
                        a) return e;
                return -1
            }.apply(a, [b])
        };
        k.objectIsEmpty = function(a) {
            for (var b in a)
                if (a.hasOwnProperty(b)) return !1;
            return !0
        };
        k.uuid = function() {
            return {
                v4: function() {
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
                        var b = 16 * Math.random() | 0;
                        return ("x" === a ? b : b & 3 | 8).toString(16)
                    })
                },
                num: function(a) {
                    var b = new Date,
                        e = function(a) {
                            a -= 100 * Math.floor(a / 100);
                            return 10 > a ? "0" + a : String(a)
                        };
                    return e(b.getHours()) + "" + e(b.getMinutes()) + "" + e(b.getSeconds()) + "" + function(a) {
                        return Math.floor((9 * Math.random() +
                            1) * Math.pow(10, a - 1))
                    }(a - 6)
                }
            }
        };
        k.getObjectKeys = function(a) {
            var b = [],
                e;
            for (e in a) a.hasOwnProperty(e) && b.push(e);
            return b
        };
        k.completeFstLevelObj = function(a, b, e) {
            if (a) {
                if (b)
                    for (var d in b) !b.hasOwnProperty(d) || a[d] && !e || (a[d] = b[d])
            } else a = b;
            return a
        };
        k.isPreview = function() {
            return window.navigator && "preview" === window.navigator.loadPurpose
        };
        k.isPrerender = function(a) {
            var b, e = !1,
                d = ["webkit", "ms"];
            if ("prerender" === document.visibilityState) b = "visibilitychange";
            else
                for (var c = 0; c < d.length; c++) "prerender" ===
                    document[d[c] + "VisibilityState"] && (b = d[c] + "visibilitychange");
            if ("undefined" !== typeof b) {
                var f = function(e) {
                    a(e);
                    k.removeEvtListener(document, b, f)
                };
                k.addEvtListener(document, b, f);
                e = !0
            }
            return e
        };
        var d = k.addEvtListener = function(a, b, e) {
                a.addEventListener ? a.addEventListener(b, e, !1) : a.attachEvent && a.attachEvent("on" + b, e)
            },
            f = k.removeEvtListener = function(a, b, e) {
                a.removeEventListener ? a.removeEventListener(b, e, !1) : a.detachEvent && a.detachEvent("on" + b, e)
            };
        k.hashcode = function(a) {
            var b = 0;
            if (0 === a.length) return b;
            for (var e = 0; e < a.length; e++) var d = a.charCodeAt(e),
                b = (b << 5) - b + d,
                b = b | 0;
            return b
        };
        k.setLocation = function(a) {
            var b = a.location;
            a = window[a.target] || window;
            b && (a.location.href = b)
        };
        k.dispatchCallbackEvent = function(a) {
            var b;
            if ("function" === typeof window.Event) b = new Event("ATCallbackEvent");
            else try {
                b = document.createEvent("Event"), b.initEvent && b.initEvent("ATCallbackEvent", !0, !0)
            } catch (e) {}
            b && "function" === typeof document.dispatchEvent && (b.name = a, document.dispatchEvent(b))
        };
        k.addCallbackEvent = function(a) {
            d(document,
                "ATCallbackEvent", a)
        };
        k.removeCallbackEvent = function(a) {
            k.removeEvent("ATCallbackEvent", a)
        };
        (function() {
            function a(b, e) {
                e = e || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                };
                var d;
                try {
                    d = document.createEvent("CustomEvent"), d.initCustomEvent(b, e.bubbles, e.cancelable, e.detail)
                } catch (c) {}
                return d
            }
            "function" === typeof window.CustomEvent ? window.ATCustomEvent = window.CustomEvent : ("function" === typeof window.Event && (a.prototype = window.Event.prototype), window.ATCustomEvent = a)
        })();
        k.addEvent = function(a, b, e, c) {
            k[a] = new ATCustomEvent(a, {
                detail: {
                    name: b,
                    id: e
                }
            });
            d(document, a, c)
        };
        k.removeEvent = function(a, b) {
            f(document, a, b)
        };
        k.dispatchEvent = function(a, b) {
            k[a] = k[a] || new ATCustomEvent(a, {
                detail: {
                    name: b,
                    id: -1
                }
            });
            try {
                document.dispatchEvent(k[a])
            } catch (e) {}
        };
        k.addOptOutEvent = function(a, b) {
            k.addEvent("ATOptOutEvent", "clientsideuserid", a, b)
        };
        k.removeOptOutEvent = function(a) {
            k.removeEvent("ATOptOutEvent", a)
        };
        k.dispatchOptOutEvent = function(a) {
            k.optedOut = a;
            k.dispatchEvent("ATOptOutEvent", "clientsideuserid")
        };
        k.userOptedOut = function() {
            k.dispatchOptOutEvent(!0)
        };
        k.userOptedIn = function() {
            k.dispatchOptOutEvent(!1)
        };
        k.isOptedOut = function() {
            if (null === k.optedOut) {
                var a;
                a: {
                    a = null;k.isLocalStorageAvailable() && (a = localStorage.getItem("atoptedout"));
                    if (null === a) {
                        var b = /(?:^| )atoptedout=([^;]+)/.exec(document.cookie);
                        null !== b && (a = b[1])
                    }
                    if (null !== a) try {
                        a = decodeURIComponent(a)
                    } catch (e) {}
                    if (a && (a = k.jsonParse(a) || k.jsonParse(k.Base64.decode(a)), null !== a)) {
                        a = !!a.val;
                        break a
                    }
                    a = !1
                }
                k.optedOut = a
            }
            return !!k.optedOut
        };
        k.optedOut = null;
        k.consentReceived = function(a) {
            k.consent = !!a
        };
        k.consent = !0;
        k.isTabOpeningAction = function(a) {
            var b = !1;
            a && (a.ctrlKey || a.shiftKey || a.metaKey || a.button && 1 === a.button) && (b = !0);
            return b
        }
    };
    ATInternet.Utils = new Utils;
    var BuildManager = function(a) {
            var h = this,
                l = 0,
                k = 0,
                c = ["dz"],
                b = "",
                d = function(a, b, e, d, c, f, g) {
                    a = "&" + a + "=";
                    return {
                        param: a,
                        paramSize: a.length,
                        str: b,
                        strSize: b.length,
                        truncate: e,
                        multihit: d,
                        separator: c || "",
                        encode: f,
                        last: g
                    }
                },
                f = function(a, b) {
                    var e = "",
                        d = 0,
                        c = 0,
                        f = 0,
                        d = -1,
                        g = null,
                        m = null,
                        n;
                    for (n in a) a.hasOwnProperty(n) && (g = a[n]) && (d = b - c, g.last && null !== m ? m[n] = g : g.strSize + g.paramSize <= d ? (e += g.param + g.str, c += g.paramSize + g.strSize) : (m = m || {}, m[n] = g, g.truncate && (f = d - g.paramSize, g.separator && (d = g.str.substring(0, d), d = g.encode ?
                        d.lastIndexOf(encodeURIComponent(g.separator)) : d.lastIndexOf(g.separator), 0 < d && (f = d)), e += g.param + g.str.substring(0, f), c += g.paramSize + g.str.substring(0, f).length, m[n].str = g.str.substring(f, g.strSize), m[n].strSize = m[n].str.length)));
                    return [e, m]
                },
                g = function(b, e, g) {
                    var m = "",
                        n = function(b) {
                            if (b === {}) return [];
                            var e = [],
                                g;
                            g = {};
                            var n = !1,
                                h = void 0,
                                p, l, r, w, q, t, u, y, C = "",
                                x;
                            for (x in b)
                                if (b.hasOwnProperty(x))
                                    if (t = q = w = r = !1, p = b[x]._value, l = b[x]._options || {}, "boolean" === typeof l.encode && (r = l.encode), "function" === typeof p &&
                                        (p = p()), p = p instanceof Array ? p.join(l.separator || ",") : "object" === typeof p ? ATInternet.Utils.jsonSerialize(p) : "undefined" === typeof p ? "undefined" : p.toString(), r && (p = encodeURIComponent(p)), -1 < ATInternet.Utils.arrayIndexOf(c, x) ? w = !0 : "boolean" === typeof l.truncate && (w = l.truncate), "boolean" === typeof l.multihit && (q = l.multihit), "boolean" === typeof l.last && (t = l.last), p = d(x, p, w, q, l.separator, r, t), q) k -= p.paramSize + p.strSize, C += p.param + p.str;
                                    else if (t) p.paramSize + p.strSize > k && (p.str = p.str.substring(0, k - p.paramSize),
                                p.strSize = p.str.length), u = x, y = p;
                            else if (g[x] = p, g[x].paramSize + g[x].strSize > k && !g[x].truncate) {
                                a.emit("Tracker:Hit:Build:Error", {
                                    lvl: "ERROR",
                                    msg: 'Too long parameter: "' + g[x].param + '"',
                                    details: {
                                        value: g[x].str
                                    }
                                });
                                n = !0;
                                h = x;
                                break
                            }
                            u && (g[u] = y);
                            g = [g, n, h, C];
                            b = g[0];
                            n = g[1];
                            m = g[3];
                            n && (g = g[2], b = b[g], b.str = b.str.substring(0, k - b.paramSize), b.strSize = b.str.length, n = {}, n.mherr = d("mherr", "1", !1, !1, "", !1, !1), n[g] = b, b = n);
                            b = f(b, k);
                            if (null === b[1]) e = b[0];
                            else
                                for (e.push(b[0]); null !== b[1];) b = f(b[1], k), e.push(b[0]);
                            return e
                        },
                        h = "";
                    a.buffer.presentInFilters(e, "hitType") || (e = a.buffer.addInFilters(e, "hitType", ["page"]));
                    e = a.buffer.addInFilters(e, "hitType", ["all"]);
                    var l;
                    if ("object" === typeof b && null !== b) {
                        e = a.buffer.addInFilters(e, "permanent", !0);
                        e = a.buffer.get(e, !0);
                        var w;
                        for (l in b) b.hasOwnProperty(l) && (w = {}, b[l] && "object" === typeof b[l] && b[l].hasOwnProperty("_value") ? (h = b[l]._value, b[l].hasOwnProperty("_options") && (w = b[l]._options)) : h = b[l], e[l] = {
                            _value: h,
                            _options: w
                        });
                        h = n(e)
                    } else
                        for (l in e = a.buffer.get(e, !0), h = n(e), e) e.hasOwnProperty(l) &&
                            (e[l]._options && e[l]._options.permanent || a.buffer.del(l));
                    g && g(h, m)
                };
            h.getCollectDomain = function() {
                var b = "",
                    b = a.getConfig("logSSL") || a.getConfig("log"),
                    e = a.getConfig("domain");
                return b = b && e ? b + "." + e : a.getConfig("collectDomainSSL") || a.getConfig("collectDomain")
            };
            var m = function(b) {
                    var e = "",
                        d = a.getConfig("baseURL");
                    if (d) e = d;
                    else {
                        var d = h.getCollectDomain(),
                            c = a.getConfig("pixelPath"),
                            c = c || "/";
                        "/" !== c.charAt(0) && (c = "/" + c);
                        d && (e = (a.getConfig("forceHttp") ? "http://" : "https://") + d + c)
                    }
                    d = a.getConfig("site");
                    e &&
                        d ? b && b(null, e + "?s=" + d) : b && b({
                            message: "Config error"
                        })
                },
                e = function(a, b, e) {
                    m(function(d, c) {
                        d ? e && e(d) : (k = l - (c.length + 27), g(a, b, function(a, b) {
                            var d = [],
                                g = ATInternet.Utils.uuid().num(13);
                            if (a instanceof Array)
                                for (var f = 1; f <= a.length; f++) d.push(c + b + "&mh=" + f + "-" + a.length + "-" + g + a[f - 1]);
                            else d.push(c + b + a);
                            e && e(null, d)
                        }))
                    })
                },
                n = function(b, e, d, c, g) {
                    return function() {
                        return function(f) {
                            a.emit(b, {
                                lvl: g,
                                details: {
                                    hit: e,
                                    method: d,
                                    event: f
                                }
                            });
                            c && c()
                        }
                    }()
                };
            h.send = function(b, d, c, g) {
                e(b, d, function(b, e) {
                    if (b) a.emit("Tracker:Hit:Build:Error", {
                        lvl: "ERROR",
                        msg: b.message,
                        details: {}
                    }), c && c();
                    else
                        for (var d = 0; d < e.length; d++) h.sendUrl(e[d], c, g)
                })
            };
            l = Math.max(a.getConfig("maxHitSize") || 0, 2E3);
            k = Math.max(a.getConfig("maxHitSize") || 0, 2E3);
            b = a.getConfig("requestMethod") || "GET";
            "POST" !== b || ATInternet.Utils.isBeaconMethodAvailable() || (b = "GET");
            h.sendUrl = function(e, d, c) {
                c = c || b;
                ATInternet.Utils.isOptedOut() && !a.getConfig("sendHitWhenOptOut") ? n("Tracker:Hit:Sent:NoTrack", e, c, d, "INFO")() : "POST" === c ? window.navigator.sendBeacon(e, null) ? n("Tracker:Hit:Sent:Ok",
                    e, "POST", d, "INFO")() : n("Tracker:Hit:Sent:Error", e, "POST", d, "ERROR")() : (c = new Image, c.onload = n("Tracker:Hit:Sent:Ok", e, "GET", d, "INFO"), c.onerror = n("Tracker:Hit:Sent:Error", e, "GET", d, "ERROR"), c.src = e)
            }
        },
        TriggersManager = function() {
            function a(a, b, d) {
                for (var f = [], g = 0; g < a.length; g++) a[g].callback(b, d), a[g].singleUse || f.push(a[g]);
                return f
            }

            function h(a, b, d, f) {
                var g = a.shift();
                if ("*" === g) return b["*"] = b["*"] || [], b["*"].push({
                    callback: d,
                    singleUse: f
                }), b["*"].length - 1;
                if (0 === a.length) return h([g, "*"], b, d, f);
                b["*"] = b["*"] || [];
                b[g] = b[g] || {};
                return h(a, b[g], d, f)
            }

            function l(c, b, d, f) {
                var g = b.shift();
                "*" !== g && (0 === b.length ? l(c, [g, "*"], d, f) : d[g] && (d[g]["*"] = a(d[g]["*"], c, f), l(c, b, d[g], f)))
            }
            var k = {};
            this.on = function(a, b, d) {
                d = d || !1;
                return h(a.split(":"), k, b, d)
            };
            this.emit = function(c, b) {
                k["*"] && (k["*"] = a(k["*"], c, b));
                l(c, c.split(":"), k, b)
            }
        },
        PluginsManager = function(a) {
            var h = {},
                l = {},
                k = 0,
                c = {},
                b = 0,
                d = function(a) {
                    var b = !1;
                    h[a] && (b = !0);
                    return b
                },
                f = this.unload = function(b) {
                    d(b) ? (h[b] = void 0, a.emit("Tracker:Plugin:Unload:" +
                        b + ":Ok", {
                            lvl: "INFO"
                        })) : a.emit("Tracker:Plugin:Unload:" + b + ":Error", {
                        lvl: "ERROR",
                        msg: "not a known plugin"
                    });
                    return a
                },
                g = this.load = function(b, e) {
                    "function" === typeof e ? "undefined" === typeof a.getConfig.plgAllowed || 0 === a.getConfig.plgAllowed.length || -1 < a.getConfig.plgAllowed.indexOf(b) ? (h[b] = new e(a), l[b] && d(b) && (l[b] = !1, k--, d(b + "_ll") && f(b + "_ll"), 0 === k && a.emit("Tracker:Plugin:Lazyload:File:Complete", {
                            lvl: "INFO",
                            msg: "LazyLoading triggers are finished"
                        })), a.emit("Tracker:Plugin:Load:" + b + ":Ok", {
                            lvl: "INFO"
                        })) :
                        a.emit("Tracker:Plugin:Load:" + b + ":Error", {
                            lvl: "ERROR",
                            msg: "Plugin not allowed",
                            details: {}
                        }) : a.emit("Tracker:Plugin:Load:" + b + ":Error", {
                            lvl: "ERROR",
                            msg: "not a function",
                            details: {
                                obj: e
                            }
                        });
                    return a
                },
                m = this.isLazyloading = function(a) {
                    return a ? !0 === l[a] : 0 !== k
                },
                e = function(a) {
                    return !d(a) && !m(a) && d(a + "_ll")
                },
                n = function(b) {
                    l[b] = !0;
                    k++;
                    ATInternet.Utils.loadScript({
                        url: a.getConfig("lazyLoadingPath") + b + ".js"
                    })
                },
                q = function(a) {
                    return e(a) ? (n(a), !0) : !1
                },
                r = function(a) {
                    c[a] ? c[a]++ : c[a] = 1;
                    b++
                },
                p = function(a, b, e, c) {
                    var g =
                        null;
                    b = b.split(".");
                    d(a) && h[a][b[0]] && (g = 1 < b.length && h[a][b[0]][b[1]] ? h[a][b[0]][b[1]].apply(h[a], e) : h[a][b[0]].apply(h[a], e));
                    c && c(g)
                },
                s = function(e, d, g, f) {
                    r(e);
                    a.onTrigger("Tracker:Plugin:Load:" + e + ":Ok", function() {
                        p(e, d, g, function(d) {
                            c[e]--;
                            b--;
                            0 === b && a.emit("Tracker:Plugin:Lazyload:Exec:Complete", {
                                lvl: "INFO",
                                msg: "All exec waiting for lazyloading are done"
                            });
                            f && f(d)
                        })
                    }, !0)
                },
                t = function(a) {
                    for (var b = {
                            mcount: 0,
                            plugins: {}
                        }, e = 0; e < a.length; e++) h.hasOwnProperty(a[e]) || (b.mcount++, b.plugins[a[e]] = !0);
                    return b
                };
            this.isExecWaitingLazyloading = function() {
                return 0 !== b
            };
            a.exec = this.exec = function(a, b, d, c) {
                e(a) ? (s(a, b, d, c), n(a)) : m(a) ? s(a, b, d, c) : p(a, b, d, c)
            };
            this.waitForDependencies = function(b, e) {
                var d = t(b);
                if (0 === d.mcount) a.emit("Tracker:Plugin:Dependencies:Loaded", {
                    lvl: "INFO",
                    details: {
                        dependencies: b
                    }
                }), e();
                else
                    for (var c in d.plugins) d.plugins.hasOwnProperty(c) && (a.emit("Tracker:Plugin:Dependencies:Error", {
                        lvl: "WARNING",
                        msg: "Missing plugin " + c
                    }), a.onTrigger("Tracker:Plugin:Load:" + c, function(a, b) {
                        var c = a.split(":"),
                            g = c[3];
                        "Ok" === c[4] && (d.plugins[g] = !1, d.mcount--, 0 === d.mcount && e())
                    }, !0), q(c))
            };
            this.init = function() {
                for (var a in ATInternet.Tracker.pluginProtos) ATInternet.Tracker.pluginProtos.hasOwnProperty(a) && g(a, ATInternet.Tracker.pluginProtos[a])
            }
        },
        CallbacksManager = function(a) {
            var h = this,
                l = {},
                k = function(a) {
                    if (a.name) {
                        var b = !0;
                        "undefined" !== typeof configuration && (configuration.include instanceof Array && -1 === ATInternet.Utils.arrayIndexOf(configuration.include, a.name) && (b = !1), configuration.exclude instanceof Array &&
                            -1 !== ATInternet.Utils.arrayIndexOf(configuration.exclude, a.name) && (b = !1));
                        if (ATInternet.Callbacks && ATInternet.Callbacks.hasOwnProperty(a.name)) {
                            var d = {};
                            d[a.name] = {
                                "function": ATInternet.Callbacks[a.name]
                            };
                            b && h.load(a.name, d[a.name]["function"]);
                            ATInternet.Tracker.callbackProtos[a.name] || (ATInternet.Tracker.callbackProtos[a.name] = d[a.name])
                        }
                    }
                };
            h.load = function(c, b) {
                "function" === typeof b ? (new b(a), a.emit("Tracker:Callback:Load:" + c + ":Ok", {
                    lvl: "INFO",
                    details: {
                        obj: b
                    }
                })) : a.emit("Tracker:Callback:Load:" +
                    c + ":Error", {
                        lvl: "ERROR",
                        msg: "not a function",
                        details: {
                            obj: b
                        }
                    });
                return a
            };
            h.init = function() {
                if (a.getConfig("activateCallbacks")) {
                    var c = a.getConfig("callbacks");
                    if ("undefined" !== typeof c && c.include instanceof Array)
                        for (var b = 0; b < c.include.length; b++) ATInternet.Callbacks && ATInternet.Callbacks.hasOwnProperty(c.include[b]) && (l[c.include[b]] = {
                            "function": ATInternet.Callbacks[c.include[b]]
                        }, ATInternet.Tracker.callbackProtos[c.include[b]] || (ATInternet.Tracker.callbackProtos[c.include[b]] = l[c.include[b]]));
                    else
                        for (b in ATInternet.Callbacks) ATInternet.Callbacks.hasOwnProperty(b) && (l[b] = {
                            "function": ATInternet.Callbacks[b]
                        }, ATInternet.Tracker.callbackProtos[b] || (ATInternet.Tracker.callbackProtos[b] = l[b]));
                    if ("undefined" !== typeof c && c.exclude instanceof Array)
                        for (b = 0; b < c.exclude.length; b++) l[c.exclude[b]] && (l[c.exclude[b]] = void 0);
                    for (var d in l) l.hasOwnProperty(d) && l[d] && h.load(d, l[d]["function"]);
                    ATInternet.Utils.addCallbackEvent(k)
                }
            };
            h.removeCallbackEvent = function() {
                ATInternet.Utils.removeCallbackEvent(k)
            }
        },
        BufferManager = function(a) {
            var h = this,
                l = {};
            h.set = function(a, d, c) {
                c = c || {};
                c.hitType = c.hitType || ["page"];
                l[a] = {
                    _value: d,
                    _options: c
                }
            };
            var k = function(a, d, c) {
                    return (a = ATInternet.Utils.cloneSimpleObject(a[d])) && !c ? a._value : a
                },
                c = function d(a, c) {
                    if (!(a && c instanceof Array && a instanceof Array)) return [];
                    if (0 === a.length) return c;
                    var m = a[0],
                        e, n = [],
                        k = ATInternet.Utils.cloneSimpleObject(a);
                    k.shift();
                    for (var h = 0; h < c.length; h++)
                        if ("object" !== typeof m[1]) l[c[h]] && l[c[h]]._options[m[0]] === m[1] && n.push(c[h]);
                        else {
                            e = m[1].length;
                            for (var p = 0; p < e; p++)
                                if (l[c[h]] && l[c[h]]._options[m[0]] instanceof Array && 0 <= ATInternet.Utils.arrayIndexOf(l[c[h]]._options[m[0]], m[1][p])) {
                                    n.push(c[h]);
                                    break
                                }
                        }
                    return d(k, n)
                };
            h.get = function(a, f) {
                var g = {};
                if ("string" === typeof a) g = k(l, a, f);
                else
                    for (var m = c(a, ATInternet.Utils.getObjectKeys(l)), e = 0; e < m.length; e++) g[m[e]] = k(l, m[e], f);
                return g
            };
            h.presentInFilters = function(a, c) {
                return a && 0 !== a.length ? a[0][0] === c ? !0 : h.presentInFilters(a.slice(1), c) : !1
            };
            h.addInFilters = function(a, c, g, m) {
                if (!a || 0 === a.length) return m ? [] : [
                    [c, g]
                ];
                var e = a[0][0],
                    n = a[0][1];
                e === c && (n instanceof Array && -1 === ATInternet.Utils.arrayIndexOf(n, g[0]) && n.push(g[0]), m = !0);
                return [
                    [e, n]
                ].concat(h.addInFilters(a.slice(1), c, g, m))
            };
            h.del = function(a) {
                l[a] = void 0
            };
            h.clear = function() {
                l = {}
            }
        },
        Tag = function(a, h, l) {
            h = h || {};
            var k = this;
            k.version = "5.20.0";
            var c = window.ATInternet.Utils.cloneSimpleObject(h);
            k.triggers = new TriggersManager(k);
            k.emit = k.triggers.emit;
            k.onTrigger = k.triggers.on;
            var b = window.ATInternet.Utils.cloneSimpleObject(dfltGlobalCfg) || {},
                d;
            for (d in a) a.hasOwnProperty(d) &&
                (b[d] = a[d]);
            k.getConfig = function(a) {
                return b[a]
            };
            k.setConfig = function(a, d, c) {
                void 0 !== b[a] && c || (k.emit("Tracker:Config:Set:" + a, {
                    lvl: "INFO",
                    details: {
                        bef: b[a],
                        aft: d
                    }
                }), b[a] = d)
            };
            k.configPlugin = function(a, d, c) {
                b[a] = b[a] || {};
                for (var e in d) d.hasOwnProperty(e) && void 0 === b[a][e] && (b[a][e] = d[e]);
                c && (c(b[a]), k.onTrigger("Tracker:Config:Set:" + a, function(a, b) {
                    c(b.details.aft)
                }));
                return b[a]
            };
            k.getContext = function(a) {
                return c[a]
            };
            k.setContext = function(a, b) {
                k.emit("Tracker:Context:Set:" + a, {
                    lvl: "INFO",
                    details: {
                        bef: c[a],
                        aft: b
                    }
                });
                c[a] = b
            };
            k.delContext = function(a, b) {
                k.emit("Tracker:Context:Deleted:" + a + ":" + b, {
                    lvl: "INFO",
                    details: {
                        key1: a,
                        key2: b
                    }
                });
                if (a) c.hasOwnProperty(a) && (b ? c[a] && c[a].hasOwnProperty(b) && (c[a][b] = void 0) : c[a] = void 0);
                else if (b)
                    for (var d in c) c.hasOwnProperty(d) && c[d] && c[d].hasOwnProperty(b) && (c[d][b] = void 0)
            };
            k.plugins = new PluginsManager(k);
            k.buffer = new BufferManager(k);
            k.setParam = k.buffer.set;
            k.getParams = function(a) {
                return k.buffer.get(a, !1)
            };
            k.getParam = k.buffer.get;
            k.delParam = k.buffer.del;
            k.builder =
                new BuildManager(k);
            k.sendHit = k.builder.send;
            k.sendUrl = k.builder.sendUrl;
            k.callbacks = new CallbacksManager(k);
            k.setParam("ts", function() {
                return (new Date).getTime()
            }, {
                permanent: !0,
                hitType: ["all"]
            });
            (k.getConfig("disableCookie") || k.getConfig("disableStorage")) && k.setParam("idclient", "Consent-NO", {
                permanent: !0,
                hitType: ["all"]
            });
            k.getConfig("medium") && k.setParam("medium", k.getConfig("medium"), {
                permanent: !0,
                hitType: ["all"]
            });
            k.plugins.init();
            k.callbacks.init();
            ATInternet.Tracker.instances.push(k);
            k.emit("Tracker:Ready", {
                lvl: "INFO",
                msg: "Tracker initialized",
                details: {
                    tracker: k,
                    args: {
                        config: a,
                        context: h,
                        callback: l
                    }
                }
            });
            l && l(k)
        };
    ATInternet.Tracker.Tag = Tag;
    ATInternet.Tracker.instances = [];
    ATInternet.Tracker.pluginProtos = {};
    ATInternet.Tracker.addPlugin = function(a, h) {
        h = h || ATInternet.Tracker.Plugins[a];
        if (!ATInternet.Tracker.pluginProtos[a]) {
            ATInternet.Tracker.pluginProtos[a] = h;
            for (var l = 0; l < ATInternet.Tracker.instances.length; l++) ATInternet.Tracker.instances[l].plugins.load(a, h)
        }
    };
    ATInternet.Tracker.delPlugin = function(a) {
        if (ATInternet.Tracker.pluginProtos[a]) {
            ATInternet.Tracker.pluginProtos[a] = void 0;
            for (var h = 0; h < ATInternet.Tracker.instances.length; h++) ATInternet.Tracker.instances[h].plugins.unload(a)
        }
    };
    ATInternet.Tracker.callbackProtos = {};
}).call(window);
(function() {
    var dfltPluginCfg = {
        "lifetime": 30,
        "lastPersistence": true,
        "listEventsForExec": [],
        "domainAttribution": true
    };
    var dfltGlobalCfg = {
        "visitLifetime": 30,
        "redirectionLifetime": 30
    };
    window.ATInternet.Tracker.Plugins.Campaigns = function(a) {
        a.setConfig("visitLifetime", dfltGlobalCfg.visitLifetime, !0);
        a.setConfig("redirectionLifetime", dfltGlobalCfg.redirectionLifetime, !0);
        var h = {},
            l, k;
        a.configPlugin("Campaigns", dfltPluginCfg || {}, function(a) {
            h = a
        });
        var c, b, d, f, g, m, e, n, q, r, p, s, t, u = function() {
                var b = function(a) {
                        var b = "";
                        a && (b = isNaN(a) && -1 === a.search(/\[(.*?)\]/g) ? "[" + a + "]" : a);
                        return b
                    },
                    e = function(a) {
                        for (;
                            "-" === a.charAt(a.length - 1);) a = a.substring(0, a.length - 1);
                        return a
                    };
                this.SponsoredLinks =
                    function() {
                        var d = {
                                google: "goo",
                                yahoo: "ysm",
                                miva: "miv",
                                orange: "wan",
                                msn: "msn",
                                mirago: "mir",
                                sklik: "skl",
                                adfox: "adf",
                                etarget: "etg",
                                yandex: "yan",
                                ebay: "eba",
                                searchalliance: "sal",
                                bing: "bin",
                                naver: "nav",
                                baidu: "bdu",
                                qwant: "qwt",
                                waze: "waz",
                                amazon: "amz"
                            },
                            c = {
                                search: "s",
                                content: "c"
                            };
                        this.at_medium = "sl";
                        this.at_term = this.at_network = this.at_variant = this.at_creation = this.at_platform = this.at_campaign = "";
                        this.format = function() {
                            var a = "sec",
                                g = b(this.at_campaign),
                                f = d[this.at_platform] || "",
                                n = b(this.at_creation),
                                m = b(this.at_variant),
                                h = c[this.at_network] || "",
                                k = b(this.at_term);
                            return e(a + ("-" + g + "-" + f + "-" + n + "-" + m + "-" + h + "-" + k))
                        };
                        this.setProperties = function(b) {
                            this.at_campaign = a.utils.getQueryStringValue("at_campaign", b) || "";
                            this.at_platform = a.utils.getQueryStringValue("at_platform", b) || "";
                            this.at_creation = a.utils.getQueryStringValue("at_creation", b) || "";
                            this.at_variant = a.utils.getQueryStringValue("at_variant", b) || "";
                            this.at_network = a.utils.getQueryStringValue("at_network", b) || "";
                            this.at_term = a.utils.getQueryStringValue("at_term",
                                b) || ""
                        }
                    };
                this.Email = function() {
                    var d = {
                        acquisition: "erec",
                        retention: "epr",
                        promotion: "es"
                    };
                    this.at_medium = "email";
                    this.at_send_time = this.at_recipient_list = this.at_recipient_id = this.at_link = this.at_send_date = this.at_creation = this.at_campaign = this.at_emailtype = "";
                    this.format = function() {
                        var a = d[this.at_emailtype] || d.promotion,
                            c = b(this.at_campaign),
                            g = b(this.at_creation),
                            f = this.at_send_date,
                            n = b(this.at_link),
                            a = a + ("-" + c + "-" + g + "-" + f + "-" + n + "-" + (this.at_recipient_id + (this.at_recipient_list ? "@" + this.at_recipient_list :
                                "")) + "-" + this.at_send_time);
                        return e(a)
                    };
                    this.setProperties = function(b) {
                        this.at_emailtype = a.utils.getQueryStringValue("at_emailtype", b) || "";
                        this.at_campaign = a.utils.getQueryStringValue("at_campaign", b) || "";
                        this.at_creation = a.utils.getQueryStringValue("at_creation", b) || "";
                        this.at_send_date = a.utils.getQueryStringValue("at_send_date", b) || "";
                        this.at_link = a.utils.getQueryStringValue("at_link", b) || "";
                        this.at_recipient_id = a.utils.getQueryStringValue("at_recipient_id", b) || "";
                        this.at_recipient_list = a.utils.getQueryStringValue("at_recipient_list",
                            b) || "";
                        this.at_send_time = a.utils.getQueryStringValue("at_send_time", b) || ""
                    }
                };
                this.Affiliate = function() {
                    this.at_medium = "affiliate";
                    this.at_variant = this.at_creation = this.at_format = this.at_identifier = this.at_type = this.at_campaign = "";
                    this.format = function() {
                        var a = "al",
                            d = b(this.at_campaign),
                            c = b(this.at_type),
                            g = b(this.at_identifier),
                            f = b(this.at_format),
                            n = b(this.at_creation),
                            m = b(this.at_variant);
                        return e(a + ("-" + d + "-" + c + "-" + g + "-" + f + "-" + n + "-" + m))
                    };
                    this.setProperties = function(b) {
                        this.at_campaign = a.utils.getQueryStringValue("at_campaign",
                            b) || "";
                        this.at_type = a.utils.getQueryStringValue("at_type", b) || "";
                        this.at_identifier = a.utils.getQueryStringValue("at_identifier", b) || "";
                        this.at_format = a.utils.getQueryStringValue("at_format", b) || "";
                        this.at_creation = a.utils.getQueryStringValue("at_creation", b) || "";
                        this.at_variant = a.utils.getQueryStringValue("at_variant", b) || ""
                    }
                };
                this.Display = function() {
                    this.at_medium = "display";
                    this.at_detail_placement = this.at_general_placement = this.at_channel = this.at_format = this.at_variant = this.at_creation = this.at_campaign =
                        "";
                    this.format = function() {
                        var a = "ad",
                            d = b(this.at_campaign),
                            c = b(this.at_creation),
                            g = b(this.at_variant),
                            f = b(this.at_format),
                            n = b(this.at_channel),
                            m = b(this.at_general_placement),
                            h = b(this.at_detail_placement);
                        return e(a + ("-" + d + "-" + c + "-" + g + "-" + f + "-" + n + "-" + m + "-" + h))
                    };
                    this.setProperties = function(b) {
                        this.at_campaign = a.utils.getQueryStringValue("at_campaign", b) || "";
                        this.at_creation = a.utils.getQueryStringValue("at_creation", b) || "";
                        this.at_variant = a.utils.getQueryStringValue("at_variant", b) || "";
                        this.at_format =
                            a.utils.getQueryStringValue("at_format", b) || "";
                        this.at_channel = a.utils.getQueryStringValue("at_channel", b) || "";
                        this.at_general_placement = a.utils.getQueryStringValue("at_general_placement", b) || "";
                        this.at_detail_placement = a.utils.getQueryStringValue("at_detail_placement", b) || ""
                    }
                };
                this.Custom = function() {
                    this.at_custom4 = this.at_custom3 = this.at_custom2 = this.at_custom1 = this.at_campaign = this.at_medium = "";
                    this.format = function() {
                        var a = "";
                        /\d+$/.test(this.at_medium) && (a = /\d+$/.exec(this.at_medium)[0]);
                        var a =
                            "cs" + a,
                            d = b(this.at_campaign),
                            c = b(this.at_custom1),
                            g = b(this.at_custom2),
                            f = b(this.at_custom3),
                            n = b(this.at_custom4);
                        return e(a + ("-" + d + "-" + c + "-" + g + "-" + f + "-" + n))
                    };
                    this.setProperties = function(b) {
                        this.at_medium = a.utils.getQueryStringValue("at_medium", b) || "";
                        this.at_campaign = a.utils.getQueryStringValue("at_campaign", b) || "";
                        this.at_custom1 = a.utils.getQueryStringValue("at_custom1", b) || "";
                        this.at_custom2 = a.utils.getQueryStringValue("at_custom2", b) || "";
                        this.at_custom3 = a.utils.getQueryStringValue("at_custom3",
                            b) || "";
                        this.at_custom4 = a.utils.getQueryStringValue("at_custom4", b) || ""
                    }
                };
                this.medium = {
                    sl: this.SponsoredLinks,
                    email: this.Email,
                    affiliate: this.Affiliate,
                    display: this.Display
                }
            },
            y = function(b, e) {
                var d = a.storage[k](b);
                if (null !== d) return "object" === typeof d && !(d instanceof Array);
                a.storage[l](b, {}, e);
                return !0
            },
            w = function(b, e) {
                var d = a.getContext("campaigns") || {};
                d[b] = e;
                a.setContext("campaigns", d)
            };
        (function() {
            a.plugins.waitForDependencies(["Storage", "Utils"], function() {
                l = "set" + (h.domainAttribution ? "" : "Private");
                k = "get" + (h.domainAttribution ? "" : "Private");
                c = a.storage[k](["atredir", "gopc"]);
                b = a.storage[k](["atredir", "gopc_err"]);
                d = a.storage[k](["atredir", "camp"]);
                a.storage.del(["atredir", "gopc"]);
                a.storage.del(["atredir", "gopc_err"]);
                a.storage.del(["atredir", "camp"]);
                f = a.storage[k](["atsession", "histo_camp"]);
                g = a.storage[k](["atreman", "camp"]);
                m = a.storage[k](["atreman", "date"]);
                var v = a.utils.getLocation(),
                    z = a.utils.getQueryStringValue("at_medium", v);
                if (z) {
                    var B = new u,
                        z = "function" === typeof B.medium[z] ? new B.medium[z] :
                        new B.Custom;
                    z.setProperties(v);
                    e = z.format()
                } else e = a.utils.getQueryStringValue("xtor", v);
                n = a.utils.getQueryStringValue("xtdt", v);
                q = a.utils.getQueryStringValue("xts", v);
                r = a.getContext("forcedCampaign");
                p = !!a.getConfig("redirect");
                s = !!(e && n && q);
                t = !1;
                s && (v = (new Date).getTime() / 6E4, t = !p && q !== a.getConfig("site") || 0 > v - n || v - n >= a.getConfig("visitLifetime"));
                v = r || d || e;
                p && v && y("atredir", {
                    path: "/",
                    end: a.getConfig("redirectionLifetime")
                }) && (a.storage[l](["atredir", "camp"], v), z = v = !1, r || (d ? (v = c, z = b) : (v = s, z = t)),
                    a.storage[l](["atredir", "gopc"], v), a.storage[l](["atredir", "gopc_err"], z));
                !p && g && (w("xtor", g), v = (new Date).getTime() / 36E5, v = Math.floor(v - m), w("roinbh", 0 <= v ? v : 0));
                p || (v = null, v = d ? c ? r || v : r || d : s ? r : r || e || v, f && f instanceof Array && -1 < f.indexOf(v) && (v = null), v && w("xto", v));
                if (!p && !r) {
                    var A;
                    d ? b && (A = d) : t && (A = e);
                    A && w("pgt", A)
                }
                if (!p && (A = d ? r || d : r || e || null) && !(!r && !d && s && t || !r && d && c && b)) {
                    if ((!f || f instanceof Array && 0 > f.indexOf(A)) && y("atsession", {
                            path: "/",
                            session: 60 * a.getConfig("visitLifetime")
                        })) a.storage[l](["atsession",
                        "histo_camp"
                    ], f && f.push(A) ? f : [A]);
                    g && !h.lastPersistence || !y("atreman", {
                        path: "/",
                        session: 86400 * h.lifetime
                    }) || (a.storage[l](["atreman", "camp"], A), a.storage[l](["atreman", "date"], (new Date).getTime() / 36E5))
                }
                a.emit("Campaigns:process:done", {
                    lvl: "INFO"
                })
            })
        })()
    };
    window.ATInternet.Tracker.addPlugin("Campaigns");
}).call(window);
(function() {
    var dfltPluginCfg = {};
    var dfltGlobalCfg = {
        "storageMode": "cookie"
    };
    ATInternet.Tracker.Plugins.Cookies = ATInternet.Tracker.Plugins.Storage = function(a) {
        var h = this,
            l = {},
            k = !1,
            c = null;
        a.configPlugin("Storage", dfltPluginCfg || {}, function(a) {
            l = a;
            "localStorage" === l.storageMode && (k = ATInternet.Utils.isLocalStorageAvailable())
        });
        var b = {},
            d = function(b) {
                return a.getConfig("base64Storage") ? ATInternet.Utils.Base64.encode(b) : encodeURIComponent(b)
            },
            f = function(b) {
                return a.getConfig("base64Storage") ? ATInternet.Utils.Base64.decode(b) : decodeURIComponent(b)
            },
            g = function() {
                this.getData = function(a) {
                    var b =
                        null;
                    (a = RegExp("(?:^| )" + a + "=([^;]+)").exec(document.cookie) || null) && (b = f(a[1]));
                    return b
                };
                this.setData = function(b) {
                    var c = !1;
                    if (b.name && "string" === typeof b.name) {
                        var e = b.options || {},
                            f = e.end || {},
                            g = e.domain || a.getConfig("cookieDomain"),
                            h = e.secure || a.getConfig("cookieSecure"),
                            k = ATInternet.Utils.jsonSerialize(b),
                            k = b.name + "=" + d(k),
                            k = k + (e.path && "string" === typeof e.path ? ";path=" + e.path : ""),
                            k = k + (g && "string" === typeof g ? ";domain=" + g : "") + (h && "boolean" === typeof h ? ";secure" : "");
                        "function" === typeof f.toUTCString ?
                            k += ";expires=" + f.toUTCString() : "number" === typeof f && (k += ";max-age=" + f.toString());
                        document.cookie = k;
                        this.getData(b.name) && (c = !0)
                    }
                    return c
                }
            };
        c = k ? new function() {
                var a = function(a) {
                        var b = +new Date,
                            d = !1,
                            c;
                        a.options && ("undefined" !== typeof a.options.expires ? c = a.options.expires : (a = a.options.end || {}, "function" === typeof a.getTime ? c = a.getTime() : "number" === typeof a && (c = b + 1E3 * a)));
                        "number" === typeof c && b >= c && (d = !0);
                        return {
                            itemToDelete: d,
                            timestamp: c
                        }
                    },
                    b = function(a) {
                        var b = !1;
                        try {
                            localStorage.removeItem(a), b = !0
                        } catch (c) {}
                        return b
                    };
                this.getData = function(c) {
                    var d = null,
                        e = localStorage.getItem(c);
                    if (e) {
                        var e = f(e),
                            g = ATInternet.Utils.jsonParse(e);
                        g && "object" === typeof g ? a(g).itemToDelete && b(c) || (delete g.options.expires, d = ATInternet.Utils.jsonSerialize(g)) : d = e
                    }
                    return d
                };
                this.setData = function(c) {
                    var e = !1;
                    if (c.name && "string" === typeof c.name) {
                        var f = a(c);
                        "number" === typeof f.timestamp && (c.options.expires = f.timestamp);
                        var g = ATInternet.Utils.jsonSerialize(c);
                        if (f.itemToDelete) e = b(c.name);
                        else try {
                            localStorage.setItem(c.name, d(g)), e = !0
                        } catch (h) {}
                    }
                    return e
                }
            } :
            new g;
        var m = function(b, d) {
                var e = !1;
                !ATInternet.Utils.consent && !d || a.getConfig("disableCookie") || a.getConfig("disableStorage") || !b || "object" !== typeof b || (e = c.setData(b));
                return e
            },
            e = function(a, b, c) {
                a = {
                    name: a,
                    val: b
                };
                c && c.session && "number" === typeof c.session && (c.end = c.session);
                a.options = c || {};
                return a
            },
            n = function(b) {
                var d = null,
                    e = null;
                a.getConfig("disableCookie") || a.getConfig("disableStorage") || !b || "string" !== typeof b || (e = c.getData(b));
                (b = e) && (d = ATInternet.Utils.jsonParse(b));
                return d
            },
            q = function(a, b) {
                var c =
                    ATInternet.Utils.cloneSimpleObject(a);
                return m(c, b) ? ATInternet.Utils.jsonParse(ATInternet.Utils.jsonSerialize(a)) : null
            },
            r = function(a, c, d) {
                if (!d && b[a]) d = b[a];
                else if (d = n(a)) d.options = d.options || {}, d.options.session && "number" === typeof d.options.session && (d.options.end = d.options.session, q(d, !1)), b[a] = d;
                return d ? c ? (a = null, !d || "object" !== typeof d.val || d.val instanceof Array || void 0 === d.val[c] || (a = d.val[c]), a) : d.val : null
            },
            p = function(a, d, c, f, g) {
                if (d) {
                    if (g = n(a)) !g || "object" !== typeof g.val || g.val instanceof
                    Array ? g = null : "undefined" === typeof c ? delete g.val[d] : g.val[d] = c, g && (g = q(g, f))
                } else g = g || {}, g = e(a, c, g), g = q(g, f);
                return g ? (b[a] = g, g.val) : null
            },
            s = function(a, d) {
                if (d) p(a, d, void 0, !1, null);
                else {
                    b[a] = void 0;
                    var c = e(a, "", {
                        end: new Date("Thu, 01 Jan 1970 00:00:00 UTC"),
                        path: "/"
                    });
                    m(c, !1)
                }
            };
        a.storage = {};
        a.storage.get = h.get = function(a, b) {
            b = !!b;
            return a instanceof Array ? r(a[0], a[1], b) : r(a, "", b)
        };
        a.storage.getPrivate = h.getPrivate = function(b, d) {
            b instanceof Array ? b[0] += a.getConfig("site") : b += a.getConfig("site");
            return h.get(b, d)
        };
        a.storage.set = h.set = function(a, b, d, c) {
            return a instanceof Array ? p(a[0], a[1], b, c, null) : p(a, null, b, c, d)
        };
        a.storage.setPrivate = h.setPrivate = function(b, d, c) {
            b instanceof Array ? b[0] += a.getConfig("site") : b += a.getConfig("site");
            return h.set(b, d, c)
        };
        a.storage.del = h.del = function(a) {
            a instanceof Array ? s(a[0], a[1]) : s(a, "")
        };
        a.storage.delPrivate = h.delPrivate = function(b) {
            b instanceof Array ? b[0] += a.getConfig("site") : b += a.getConfig("site");
            h.del(b)
        };
        a.storage.cacheInvalidation = h.cacheInvalidation =
            function() {
                b = {}
            }
    };
    ATInternet.Tracker.addPlugin("Storage");
    ATInternet.Tracker.addPlugin("Cookies");
}).call(window);
(function() {
    var dfltPluginCfg = {};
    var dfltGlobalCfg = {};
    window.ATInternet.Tracker.Plugins.Utils = function(a) {
        var h = this,
            l = {};
        a.utils = {};
        a.utils.getQueryStringValue = h.getQueryStringValue = function(a, c) {
            var f = ATInternet.Utils.hashcode(c).toString();
            if (!l[f]) {
                l[f] = {};
                for (var g = RegExp("[&#?]{1}([^&=#?]*)=([^&#]*)?", "g"), h = g.exec(c); null !== h;) l[f][h[1]] = h[2], h = g.exec(c)
            }
            return l[f].hasOwnProperty(a) ? l[f][a] : null
        };
        a.utils.manageChapters = h.manageChapters = function(b, c, f) {
            var g = "";
            if (b)
                for (var h = a.getConfig("ignoreEmptyChapterValue"), e = "", k = 1; k < parseInt(f, 10) + 1; k++) e =
                    b[c + k] || "", g = h ? g + (e ? e + "::" : "") : g + (b.hasOwnProperty(c + k) ? e + "::" : "");
            return g
        };
        a.utils.getDocumentLevel = h.getDocumentLevel = function() {
            var b = a.getConfig("documentLevel");
            if (b) {
                if (0 > b.indexOf(".")) return window[b] || document;
                b = b.split(".");
                return window[b[0]][b[1]] || document
            }
            return document
        };
        a.utils.getLocation = h.getLocation = function() {
            return h.getDocumentLevel().location.href
        };
        a.utils.getHostName = h.getHostName = function() {
            return h.getDocumentLevel().location.hostname
        };
        a.dispatchIndex = {};
        a.dispatchStack = [];
        a.dispatchEventFor = {};
        var k = 0;
        a.dispatchSubscribe = function(b) {
            return a.dispatchIndex[b] ? !1 : (a.dispatchStack.push(b), a.dispatchIndex[b] = !0)
        };
        a.dispatchSubscribed = function(b) {
            return !0 === a.dispatchIndex[b]
        };
        a.addSpecificDispatchEventFor = function(b) {
            return a.dispatchEventFor[b] ? !1 : (a.dispatchEventFor[b] = !0, k++, !0)
        };
        a.processSpecificDispatchEventFor = function(b) {
            a.dispatchEventFor[b] && (a.dispatchEventFor[b] = !1, k--, 0 === k && (a.dispatchEventFor = {}, a.emit("Tracker:Plugin:SpecificEvent:Exec:Complete", {
                lvl: "INFO"
            })))
        };
        a.dispatch = function(b) {
            var c = function() {
                    for (var c = "", d = null; 0 < a.dispatchStack.length;) c = a.dispatchStack.pop(), 0 === a.dispatchStack.length && (d = b), a[c].onDispatch(d);
                    a.dispatchIndex = {};
                    a.delContext(void 0, "customObject")
                },
                f = function() {
                    if (a.plugins.isExecWaitingLazyloading()) a.onTrigger("Tracker:Plugin:Lazyload:Exec:Complete", function() {
                        c()
                    }, !0);
                    else c()
                };
            if (0 === k) f();
            else a.onTrigger("Tracker:Plugin:SpecificEvent:Exec:Complete", function() {
                f()
            }, !0)
        };
        a.dispatchRedirect = function(b) {
            var c = !0,
                f = null;
            b && (f =
                null, b.hasOwnProperty("event") && (f = b.event || window.event), !ATInternet.Utils.isTabOpeningAction(f) && b.elem && (b.elem.timeoutonly = !0, a.plugins.exec("TechClicks", "manageClick", [b.elem, f], function(a) {
                    c = a
                })), f = b.callback);
            a.dispatch(f);
            return c
        };
        var c = a.manageSend = function(b) {
            if (!ATInternet.Utils.isPreview() || a.getConfig("preview")) ATInternet.Utils.isPrerender(function(a) {
                b(a)
            }) || b()
        };
        a.processTagObject = function(b, c, f) {
            if ((b = a.getParam(b, !0)) && b._options.permanent) {
                for (var g = !1, h = b._options.hitType || [],
                        e = 0; e < h.length; e++)
                    if (-1 !== ATInternet.Utils.arrayIndexOf(c.concat("all"), h[e])) {
                        g = !0;
                        break
                    }
                g && (f = ATInternet.Utils.completeFstLevelObj(b._value || {}, f, !0))
            }
            return f
        };
        a.processContextObjectAndSendHit = function(b, d, f, g) {
            var h = {
                    hitType: d.hitType,
                    encode: d.encode,
                    separator: d.separator,
                    truncate: d.truncate
                },
                e = a.getParam(b, !0);
            if (e) {
                for (var k = !1, l = e._options.hitType || [], r = 0; r < l.length; r++)
                    if (-1 !== ATInternet.Utils.arrayIndexOf(d.hitType.concat("all"), l[r])) {
                        k = !0;
                        break
                    }
                k ? (k = ATInternet.Utils.cloneSimpleObject(e),
                    k._value = ATInternet.Utils.completeFstLevelObj(k._value || {}, f, !0), a.setParam(b, k._value, h), c(function() {
                        a.sendHit(null, [
                            ["hitType", d.hitType]
                        ], g, d.requestMethod)
                    }), e._options.permanent && a.setParam(b, e._value, e._options)) : (a.setParam(b, f, h), c(function() {
                    a.sendHit(null, [
                        ["hitType", d.hitType]
                    ], g, d.requestMethod)
                }), a.setParam(b, e._value, e._options))
            } else a.setParam(b, f, h), c(function() {
                a.sendHit(null, [
                    ["hitType", d.hitType]
                ], g, d.requestMethod)
            })
        }
    };
    window.ATInternet.Tracker.addPlugin("Utils");
}).call(window);
(function() {
    var dfltPluginCfg = {
        "clicksAutoManagementEnabled": true,
        "clicksAutoManagementTimeout": 500
    };
    var dfltGlobalCfg = {};
    window.ATInternet.Tracker.Plugins.TechClicks = function(a) {
        var h = this,
            l, k;
        a.configPlugin("TechClicks", dfltPluginCfg || {}, function(a) {
            l = a.clicksAutoManagementEnabled;
            k = a.clicksAutoManagementTimeout
        });
        h.deactivateAutoManagement = function() {
            l = !1
        };
        var c = function(a) {
                switch (a.target) {
                    case "_top":
                        window.top.location.href = a.url;
                        break;
                    case "_parent":
                        window.parent.location.href = a.url;
                        break;
                    default:
                        window.location.href = a.url
                }
            },
            b = function(a) {
                var b = a.timeout;
                a.mailto ? h.timeout = setTimeout(function() {
                    window.location.href =
                        a.mailto
                }, b) : a.form ? h.timeout = setTimeout(function() {
                    a.form.submit()
                }, b) : a.url && (h.timeout = setTimeout(function() {
                    c({
                        url: a.url,
                        target: a.target
                    })
                }, b))
            },
            d = function(d) {
                for (var f, g = "_self", l = d.timeoutonly; d;) {
                    if (d.href && 0 === d.href.indexOf("http")) {
                        f = d.href.split('"').join('\\"');
                        g = d.target ? d.target : g;
                        break
                    }
                    d = d.parentNode
                }
                if (f) {
                    if (!l) a.onTrigger("Tracker:Hit:Sent:Ok", function() {
                        h.timeout && clearTimeout(h.timeout);
                        c({
                            url: f,
                            target: g
                        })
                    });
                    b({
                        url: f,
                        target: g,
                        timeout: k
                    })
                }
            },
            f = function(d) {
                var c = d;
                for (d = c.timeoutonly; c &&
                    "FORM" !== c.nodeName;) c = c.parentNode;
                if (c) {
                    if (!d) a.onTrigger("Tracker:Hit:Sent:Ok", function() {
                        h.timeout && clearTimeout(h.timeout);
                        c.submit()
                    });
                    b({
                        form: c,
                        timeout: k
                    })
                }
            },
            g = function(d) {
                var c = d;
                for (d = c.timeoutonly; c && !(c.href && 0 <= c.href.indexOf("mailto:"));) c = c.parentNode;
                if (c) {
                    if (!d) a.onTrigger("Tracker:Hit:Sent:Ok", function() {
                        h.timeout && clearTimeout(h.timeout);
                        window.location.href = c.href
                    });
                    b({
                        mailto: c.href,
                        timeout: k
                    })
                }
            },
            m = function(a) {
                for (var b = a; b;) {
                    if (b.href) {
                        if (0 <= b.href.indexOf("mailto:")) return "mailto";
                        if (0 === b.href.indexOf("http")) return "redirection"
                    } else if ("FORM" === b.nodeName) {
                        var d = a;
                        a = !1;
                        d && (b = d.tagName || "", b = b.toLowerCase(), "form" === b ? a = !0 : (d = d.getAttribute("type") || "", d = d.toLowerCase(), "button" === b ? "reset" !== d && "button" !== d && (a = !0) : "input" === b && "submit" === d && (a = !0)));
                        if (a) return "form";
                        break
                    }
                    b = b.parentNode
                }
                return ""
            };
        a.techClicks = {};
        a.techClicks.manageClick = h.manageClick = function(a, b) {
            var c = !0;
            if (l && a) {
                var h;
                a: {
                    for (h = a; h;) {
                        if ("function" === typeof h.getAttribute && ("_blank" === h.getAttribute("target") ||
                                "no" === h.getAttribute("data-atclickmanagement"))) {
                            h = !0;
                            break a
                        }
                        h = h.parentNode
                    }
                    h = a;
                    for (var k = window.location.href, s; h;) {
                        if ((s = h.href) && 0 <= s.indexOf("#") && k.substring(0, 0 <= k.indexOf("#") ? k.indexOf("#") : k.length) === s.substring(0, s.indexOf("#"))) {
                            h = !0;
                            break a
                        }
                        h = h.parentNode
                    }
                    h = !1
                }
                k = m(a);
                if (!h && k) {
                    switch (k) {
                        case "mailto":
                            g(a);
                            c = !1;
                            break;
                        case "form":
                            f(a);
                            c = !1;
                            break;
                        case "redirection":
                            d(a), c = !1
                    }
                    b && (h = b.defaultPrevented, "function" === typeof b.isDefaultPrevented && (h = b.isDefaultPrevented()), h || b.preventDefault &&
                        b.preventDefault())
                }
            }
            return c
        }
    };
    window.ATInternet.Tracker.addPlugin("TechClicks");
}).call(window);
(function() {
    var dfltPluginCfg = {
        "requestMethod": "POST"
    };
    var dfltGlobalCfg = {};
    ATInternet.Tracker.Plugins.Clicks = function(a) {
        var h = "",
            l = {};
        a.configPlugin("Clicks", dfltPluginCfg || {}, function(a) {
            l = a
        });
        var k = function(a) {
                var b = "";
                switch (a) {
                    case "exit":
                        b = "S";
                        break;
                    case "download":
                        b = "T";
                        break;
                    case "action":
                        b = "A";
                        break;
                    case "navigation":
                        b = "N"
                }
                return b
            },
            c = function(b) {
                return a.utils.manageChapters(b, "chapter", 3) + (b.name ? b.name : "")
            },
            b = function(b) {
                var f = {
                        p: c(b),
                        s2: b.level2 || "",
                        click: k(b.type) || ""
                    },
                    g = ["click"],
                    m = a.getContext("page") || {};
                f.pclick = c(m);
                f.s2click = m.level2 || "";
                if (m = b.customObject) m =
                    a.processTagObject("stc", g, m), f.stc = {
                        _value: ATInternet.Utils.jsonSerialize(m),
                        _options: {
                            hitType: g,
                            encode: !0,
                            separator: ",",
                            truncate: !0
                        }
                    };
                a.sendHit(f, [
                    ["hitType", g]
                ], b.callback, h)
            },
            h = l.requestMethod;
        "POST" !== h || ATInternet.Utils.isBeaconMethodAvailable() || (h = "GET");
        a.click = {};
        a.clickListener = this.clickListener = {};
        a.click.send = this.send = function(d) {
            var c = !0,
                g = null;
            d && d.hasOwnProperty("event") && (g = d.event || window.event);
            !ATInternet.Utils.isTabOpeningAction(g) && d.elem && (c = a.techClicks.manageClick(d.elem,
                g));
            b(d);
            return c
        };
        a.clickListener.send = this.clickListener.send = function(d) {
            if (d.elem) {
                var c = "click";
                a.plugins.exec("TechClicks", "isFormSubmit", [d.elem], function(a) {
                    c = a ? "submit" : "click"
                });
                ATInternet.Utils.addEvtListener(d.elem, c, function(c) {
                    ATInternet.Utils.isTabOpeningAction(c) || a.techClicks.manageClick(d.elem, c);
                    b(d)
                })
            }
        };
        a.click.set = this.set = function(b) {
            a.dispatchSubscribe("click");
            a.setContext("click", {
                name: c(b),
                level2: b.level2 || "",
                customObject: b.customObject
            });
            a.setParam("click", k(b.type) || "", {
                hitType: ["click"]
            })
        };
        a.click.onDispatch = this.onDispatch = function(b) {
            var f = ["click"],
                g = a.getContext("click") || {},
                m = a.getContext("page") || {};
            a.setParam("pclick", c(m), {
                hitType: f
            });
            a.setParam("s2click", m.level2 || "", {
                hitType: f
            });
            a.setParam("p", g.name, {
                hitType: f
            });
            a.setParam("s2", g.level2, {
                hitType: f
            });
            (g = g.customObject) ? a.processContextObjectAndSendHit("stc", {
                hitType: f,
                encode: !0,
                separator: ",",
                truncate: !0,
                requestMethod: h
            }, g, b): a.manageSend(function() {
                a.sendHit(null, [
                    ["hitType", f]
                ], b, h)
            });
            a.setContext("click",
                void 0)
        }
    };
    ATInternet.Tracker.addPlugin("Clicks");
}).call(window);
(function() {
    var dfltPluginCfg = {
        "clientSideMode": "always",
        "userIdCookieDuration": 397,
        "userIdExpirationMode": "fixed",
        "optOut": "OPT-OUT",
        "userIdStorageName": "atuserid",
        "optOutStorageName": "atoptedout",
        "itpCompliant": false,
        "baseDomain": "ordesa.arte.tv"
    };
    var dfltGlobalCfg = {};
    window.ATInternet.Tracker.Plugins.ClientSideUserId = function(a) {
        var h = {},
            l = !1,
            k = void 0,
            c = null,
            b = !1,
            d = !1,
            f = !1,
            g = null,
            m = "",
            e = !1,
            n = !1,
            q = -1;
        a.configPlugin("ClientSideUserId", dfltPluginCfg || {}, function(a) {
            h = a
        });
        var r = function() {
                var b = h.baseDomain;
                if (!b) {
                    var e = a.getConfig("cookieDomain");
                    e && (b = e, "." === b.charAt(0) && (b = b.substring(1, b.length)))
                }
                var e = a.builder.getCollectDomain(),
                    d = a.utils.getHostName();
                return !!(b && e && d && -1 !== e.indexOf(b) && -1 !== d.indexOf(b))
            },
            p = function() {
                if ("relative" === h.userIdExpirationMode ||
                    "fixed" === h.userIdExpirationMode && null === c || e) {
                    var b = new Date;
                    b.setTime(b.getTime() + 864E5 * h.userIdCookieDuration);
                    a.storage.set(m, g, {
                        end: b,
                        path: "/"
                    }, n);
                    b = a.storage.get(m, !0);
                    ATInternet.Utils.consent && !e && g !== b && a.setParam("idclient", g + "-NO", {
                        multihit: !0,
                        permanent: !0,
                        hitType: ["all"]
                    })
                }
            },
            s = function() {
                a.setParam("idclient", g, {
                    multihit: !0,
                    permanent: !0,
                    hitType: ["all"]
                });
                p()
            },
            t = function() {
                k = a.getContext("userIdentifier");
                c = a.storage.get("atuserid");
                var p = !1;
                if ("required" === h.clientSideMode) {
                    var t = "";
                    window.navigator &&
                        (t = window.navigator.userAgent);
                    if (/Safari/.test(t) && !/Chrome/.test(t) || /iPhone|iPod|iPad/.test(t)) p = !0
                } else "always" === h.clientSideMode && (p = !0);
                b = p;
                p = !1;
                t = ATInternet.Utils.optedOut;
                !1 === t && (a.storage.del("atoptedout"), a.getParam("idclient") === h.optOut && a.delParam("idclient"));
                var q = a.storage.get("atoptedout", !0);
                if (!0 === t || q === h.optOut) p = !0;
                p && (ATInternet.Utils.optedOut = !0);
                d = p;
                f = "undefined" !== typeof k;
                p = !1;
                if (!a.getConfig("forceHttp") && h.itpCompliant && !f && !d) switch (h.clientSideMode) {
                    case "never":
                        p =
                            r();
                        break;
                    case "always":
                    case "required":
                        b && null !== c || (p = r())
                }
                l = p;
                !l && (b || d || f) ? (a.setConfig("userIdOrigin", "client"), m = h.userIdStorageName, n = e = !1, d ? (g = h.optOut, m = h.optOutStorageName, n = e = !0) : a.getConfig("disableCookie") || a.getConfig("disableStorage") ? (g = a.getParam("idclient"), e = !0) : f ? (g = k, e = !0) : g = null !== c ? c : ATInternet.Utils.uuid().v4(), s()) : a.setConfig("userIdOrigin", "server")
            },
            u = function(a) {
                a && (a = a.detail) && "clientsideuserid" === a.name && a.id === q && t()
            };
        (function() {
            a.plugins.waitForDependencies(["Storage",
                "Utils"
            ], function() {
                var a = ATInternet.Utils.uuid();
                q = parseInt(a.num(8));
                ATInternet.Utils.removeOptOutEvent(u);
                ATInternet.Utils.addOptOutEvent(q, u);
                t()
            })
        })();
        a.clientSideUserId = {};
        a.clientSideUserId.set = function(a) {
            d || (g = a, e = !0, m = h.userIdStorageName, n = !1, s())
        };
        a.clientSideUserId.store = function() {
            n = e = !0;
            p()
        };
        a.clientSideUserId.get = function() {
            return g
        }
    };
    window.ATInternet.Tracker.addPlugin("ClientSideUserId");
}).call(window);
(function() {
    var dfltPluginCfg = {
        "domainAttribution": true
    };
    var dfltGlobalCfg = {
        "redirectionLifetime": 30
    };
    window.ATInternet.Tracker.Plugins.ContextVariables = function(a) {
        var h = "",
            l = null,
            k, c = "",
            b = "",
            d = {};
        a.configPlugin("ContextVariables", dfltPluginCfg || {}, function(a) {
            d = a
        });
        a.setConfig("redirectionLifetime", dfltGlobalCfg.redirectionLifetime, !0);
        var f = function(b, d) {
                var c = null;
                a.plugins.exec("Storage", b, d, function(a) {
                    c = a
                });
                return c
            },
            g = function() {
                a.setParam("hl", function() {
                    var a = new Date;
                    return a.getHours() + "x" + a.getMinutes() + "x" + a.getSeconds()
                }, {
                    permanent: !0,
                    hitType: ["all"]
                })
            },
            m = function(a) {
                (a = k ? k : "acc_dir" ===
                    h ? "" : null !== h ? h : "acc_dir" === l ? "" : l ? l : a ? a.referrer : "") && (a = a.replace(/[<>]/g, "").substring(0, 1600).replace(/&/g, "$"));
                return a
            };
        a.plugins.waitForDependencies(["Storage", "Utils"], function() {
            c = "set" + (d.domainAttribution ? "" : "Private");
            b = "get" + (d.domainAttribution ? "" : "Private");
            var e = a.utils.getLocation();
            h = a.utils.getQueryStringValue("xtref", e);
            void 0 === h && (h = "");
            k = a.getContext("forcedReferer");
            if (a.getConfig("redirect")) {
                var e = a.utils.getDocumentLevel(),
                    e = k ? k : null !== h ? h : e ? e.referrer : "acc_dir",
                    n;
                if (n =
                    e) {
                    n = {
                        path: "/",
                        end: a.getConfig("redirectionLifetime")
                    };
                    var q = f(b, ["atredir"]);
                    null !== q ? n = "object" === typeof q && !(q instanceof Array) : (f(c, ["atredir", {}, n]), n = !0)
                }
                n && f(c, [
                    ["atredir", "ref"], e
                ])
            } else {
                l = f(b, [
                    ["atredir", "ref"]
                ]);
                f("del", [
                    ["atredir", "ref"]
                ]);
                a.setParam("vtag", a.version, {
                    permanent: !0,
                    hitType: ["all"]
                });
                a.setParam("ptag", "js", {
                    permanent: !0,
                    hitType: ["all"]
                });
                e = "";
                try {
                    e += window.screen.width + "x" + window.screen.height + "x" + window.screen.pixelDepth + "x" + window.screen.colorDepth
                } catch (r) {}
                a.setParam("r",
                    e, {
                        permanent: !0,
                        hitType: ["all"]
                    });
                e = "";
                window.innerWidth ? e += window.innerWidth + "x" + window.innerHeight : document.body && document.body.offsetWidth && (e += document.body.offsetWidth + "x" + document.body.offsetHeight);
                a.setParam("re", e, {
                    permanent: !0,
                    hitType: ["all"]
                });
                g();
                window.navigator && a.setParam("lng", window.navigator.language || window.navigator.userLanguage, {
                    permanent: !0,
                    hitType: ["all"]
                });
                e = ATInternet.Utils.uuid().num(13);
                a.setParam("idp", e, {
                    permanent: !0,
                    hitType: ["page", "clickzone"]
                });
                window.navigator && a.setParam("jv",
                    window.navigator.javaEnabled() ? "1" : "0", {
                        hitType: ["page"]
                    });
                e = a.utils.getDocumentLevel();
                a.setParam("ref", m(e), {
                    permanent: !0,
                    last: !0,
                    hitType: ["page", "ecommerce", "avinsights"]
                })
            }
            a.emit("ContextVariables:Ready", {
                lvl: "INFO"
            })
        })
    };
    window.ATInternet.Tracker.addPlugin("ContextVariables");
}).call(window);
(function() {
    var dfltPluginCfg = {};
    var dfltGlobalCfg = {};
    ATInternet.Tracker.Plugins.Page = function(a) {
        var h = ["pageId", "chapterLabel", "update"],
            l = ["pid", "pchap", "pidt"],
            k = ["page", "site"],
            c = ["f", "x"],
            b = function(b) {
                return a.utils.manageChapters(b, "chapter", 3) + (b.name ? b.name : "")
            },
            d = function(a, b, d) {
                b ? a = b : a || "undefined" === typeof d || (a = d);
                return a
            },
            f = function(a, b, e) {
                b.hasOwnProperty(e) && (a[e] = d(a[e], b[e]))
            },
            g = function(b, d, e) {
                if (d)
                    for (var f = 0; f < k.length; f++)
                        if (d.hasOwnProperty(k[f]) && d[k[f]])
                            for (var g in d[k[f]]) d[k[f]].hasOwnProperty(g) && (e ? b[c[f] + g] = d[k[f]][g] :
                                a.setParam(c[f] + g, d[k[f]][g]))
            },
            m = function(b, d, e) {
                if (d) {
                    var c = a.utils.manageChapters(d, "chapter", 3);
                    c && (d.chapterLabel = c.replace(/::$/gi, ""));
                    for (c = 0; c < l.length; c++) d.hasOwnProperty(h[c]) && (e ? b[l[c]] = d[h[c]] : a.setParam(l[c], d[h[c]]))
                }
            },
            e = function(b, d, e) {
                if (d && d.keywords instanceof Array) {
                    var c = d.keywords.length;
                    if (0 < c) {
                        for (var f = "", g = 0; g < c; g++) f += "[" + d.keywords[g] + "]" + (g < c - 1 ? "|" : "");
                        e ? b.tag = f : a.setParam("tag", f)
                    }
                }
            },
            n = function(b, d, e) {
                if (d) {
                    var c, f = function(a) {
                        return a ? a : "0"
                    };
                    c = "" + (f(d.category1) + "-");
                    c += f(d.category2) + "-";
                    c += f(d.category3);
                    e ? b.ptype = c : a.setParam("ptype", c)
                }
            },
            q = function(b, d, e) {
                if (d)
                    for (var c in d) d.hasOwnProperty(c) && "undefined" !== typeof d[c] && (e ? b[c] = d[c] : a.setParam(c, d[c]))
            };
        a.customVars = this.customVars = {};
        a.customVars.set = this.customVars.set = function(b) {
            var d = a.getContext("page") || {},
                e = d.customVars;
            if (e) {
                if (b)
                    for (var c in b) b.hasOwnProperty(c) && (e[c] = ATInternet.Utils.completeFstLevelObj(e[c], b[c], !0))
            } else e = b;
            d.customVars = e;
            a.setContext("page", d)
        };
        a.dynamicLabel = this.dynamicLabel = {};
        a.dynamicLabel.set = this.dynamicLabel.set = function(b) {
            var d = a.getContext("page") || {};
            d.dynamicLabel = ATInternet.Utils.completeFstLevelObj(d.dynamicLabel, b, !0);
            a.setContext("page", d)
        };
        a.tags = this.tags = {};
        a.tags.set = this.tags.set = function(b) {
            var d = a.getContext("page") || {};
            d.tags = ATInternet.Utils.completeFstLevelObj(d.tags, b, !0);
            a.setContext("page", d)
        };
        a.customTreeStructure = this.customTreeStructure = {};
        a.customTreeStructure.set = this.customTreeStructure.set = function(b) {
            var d = a.getContext("page") || {};
            d.customTreeStructure = ATInternet.Utils.completeFstLevelObj(d.customTreeStructure, b, !0);
            a.setContext("page", d)
        };
        a.page = {};
        a.page.reset = this.reset = function() {
            a.setContext("page", void 0)
        };
        a.page.set = this.set = function(b) {
            a.dispatchSubscribe("page");
            var e = a.getContext("page") || {};
            e.name = d(e.name, b.name, "");
            e.level2 = d(e.level2, b.level2, "");
            f(e, b, "chapter1");
            f(e, b, "chapter2");
            f(e, b, "chapter3");
            e.customObject = ATInternet.Utils.completeFstLevelObj(e.customObject, b.customObject, !0);
            a.setContext("page", e)
        };
        a.page.send =
            this.send = function(c) {
                var h = !0,
                    k = {
                        p: b(c),
                        s2: c.level2 || ""
                    },
                    l = c.customObject;
                if (l) {
                    var u = ["page"],
                        l = a.processTagObject("stc", u, l);
                    k.stc = {
                        _value: ATInternet.Utils.jsonSerialize(l),
                        _options: {
                            hitType: u,
                            encode: !0,
                            separator: ",",
                            truncate: !0
                        }
                    }
                }
                l = a.getContext("page") || {};
                l.vrn && (k.vrn = l.vrn, l.vrn = void 0, a.setContext("page", l));
                u = a.getContext("InternalSearch") || {};
                "undefined" !== typeof u.keyword && (k.mc = ATInternet.Utils.cloneSimpleObject(u.keyword), "undefined" !== typeof u.resultPageNumber && (k.np = ATInternet.Utils.cloneSimpleObject(u.resultPageNumber)),
                    a.setContext("InternalSearch", void 0));
                ATInternet.Utils.isPreview() && a.getConfig("preview") && (k.pvw = 1);
                g(k, c.customVars, !0);
                m(k, c.dynamicLabel, !0);
                e(k, c.tags, !0);
                n(k, c.customTreeStructure, !0);
                u = a.getContext("campaigns") || {};
                q(k, u, !0);
                a.setContext("campaigns", void 0);
                u = null;
                c && c.hasOwnProperty("event") && (u = c.event || window.event);
                !ATInternet.Utils.isTabOpeningAction(u) && c.elem && (h = a.techClicks.manageClick(c.elem, u));
                a.manageSend(function() {
                    a.sendHit(k, null, c.callback, null)
                });
                l.name = d(l.name, c.name,
                    "");
                l.level2 = d(l.level2, c.level2, "");
                f(l, c, "chapter1");
                f(l, c, "chapter2");
                f(l, c, "chapter3");
                a.setContext("page", l);
                return h
            };
        a.page.onDispatch = this.onDispatch = function(d) {
            var c = a.getContext("page") || {},
                f = a.getContext("InternalSearch") || {};
            a.setParam("p", b(c));
            a.setParam("s2", c.level2 || "");
            c.vrn && (a.setParam("vrn", c.vrn), c.vrn = void 0, a.setContext("page", c));
            "undefined" !== typeof f.keyword && (a.setParam("mc", ATInternet.Utils.cloneSimpleObject(f.keyword)), "undefined" !== typeof f.resultPageNumber && a.setParam("np",
                ATInternet.Utils.cloneSimpleObject(f.resultPageNumber)), a.setContext("InternalSearch", void 0));
            ATInternet.Utils.isPreview() && a.getConfig("preview") && a.setParam("pvw", 1);
            g(null, c.customVars, !1);
            m(null, c.dynamicLabel, !1);
            e(null, c.tags, !1);
            n(null, c.customTreeStructure, !1);
            f = a.getContext("campaigns") || {};
            q(null, f, !1);
            a.setContext("campaigns", void 0);
            var h = ["page"];
            (c = c.customObject) ? a.processContextObjectAndSendHit("stc", {
                hitType: h,
                encode: !0,
                separator: ",",
                truncate: !0
            }, c, d): a.manageSend(function() {
                a.sendHit(null, [
                    ["hitType", h]
                ], d, null)
            })
        }
    };
    ATInternet.Tracker.addPlugin("Page");
}).call(window);
(function() {
    var dfltPluginCfg = {};
    var dfltGlobalCfg = {};
    window.ATInternet.Tracker.Plugins.RichMedia = function(a) {
        var h = function(a, b) {
                var d = parseInt(a, 10);
                return d ? Math.max(d, b) : 0
            },
            l = new function() {
                this.media = function() {
                    this.type = void 0;
                    this.plyr = 0;
                    this.clnk = this.s2 = void 0;
                    this.p = "";
                    this.m9 = this.m6 = this.m5 = this.m1 = this.rfsh = this.buf = this.a = void 0
                };
                this.mediaAll = {};
                this.setMediaValue = function(a, b, d, c) {
                    "undefined" !== typeof c && (this.mediaAll[a] = this.mediaAll[a] || {}, this.mediaAll[a][b] = this.mediaAll[a][b] || new this.media, this.mediaAll[a][b][d] = c)
                };
                this.getMediaValue =
                    function(a, b, d) {
                        if (this.mediaAll[a] && this.mediaAll[a][b]) return this.mediaAll[a][b][d]
                    };
                this.removePlayer = function(a) {
                    this.mediaAll[a] = {}
                };
                this.removeAll = function() {
                    this.mediaAll = {}
                }
            },
            k = new function() {
                this.timeout = {};
                this.setTimeout = function(b, d, c) {
                    this.timeout[b] = this.timeout[b] || {};
                    this.timeout[b][d] && window.clearTimeout(this.timeout[b][d]);
                    this.timeout[b][d] = window.setTimeout(function() {
                        a.richMedia.send({
                            action: "refresh",
                            playerId: b,
                            mediaLabel: d
                        })
                    }, 1E3 * c)
                };
                this.setTimeoutObject = function(b, d, c) {
                    this.timeout[b] =
                        this.timeout[b] || {};
                    if ("undefined" === typeof this.timeout[b][d]) {
                        var f = [],
                            g;
                        for (g in c) c.hasOwnProperty(g) && f.push({
                            delay: h(g, 0),
                            refresh: h(c[g], 5)
                        });
                        f.sort(function(a, b) {
                            return a.delay < b.delay ? -1 : a.delay > b.delay ? 1 : 0
                        });
                        this.timeout[b][d] = {
                            refreshTab: f,
                            backupRefreshTab: ATInternet.Utils.cloneSimpleObject(f),
                            delayConfiguration: {}
                        }
                    }
                    c = this.timeout[b][d];
                    if (0 < c.refreshTab.length && (f = c.refreshTab[0].delay, g = c.refreshTab[0].refresh, "number" === typeof f && "number" === typeof g && 0 < g)) {
                        c.delayConfiguration[f] = c.delayConfiguration[f] || {};
                        var k = void 0;
                        "undefined" !== typeof c.refreshTab[1] && (k = c.refreshTab[1].delay);
                        var s = 0;
                        "undefined" === typeof k ? s = 1 : "number" === typeof c.delayConfiguration[f].number ? s = "refresh" === l.getMediaValue(b, d, "a") ? Math.max(c.delayConfiguration[f].number - 1, 0) : c.delayConfiguration[f].number : "number" === typeof k && (s = Math.floor(60 * (k - f) / g) - 1);
                        c.delayConfiguration[f].number = s;
                        c.delayConfiguration[f].timeout && window.clearTimeout(c.delayConfiguration[f].timeout);
                        0 < s ? c.delayConfiguration[f].timeout = window.setTimeout(function() {
                            a.richMedia.send({
                                action: "refresh",
                                playerId: b,
                                mediaLabel: d
                            })
                        }, 1E3 * g) : (c.delayConfiguration[f].number = void 0, c.delayConfiguration[f].timeout = void 0, c.refreshTab.splice(0, 1), window.setTimeout(function() {
                            a.richMedia.send({
                                action: "refresh",
                                playerId: b,
                                mediaLabel: d
                            })
                        }, 1E3 * g));
                        this.timeout[b][d] = c
                    }
                };
                this.clearTimeout = function(a, b, d) {
                    this.timeout[a] = this.timeout[a] || {};
                    var c = this.timeout[a][b];
                    if ("object" === typeof c) {
                        if ("object" === typeof c.delayConfiguration) {
                            var f, g;
                            for (g in c.delayConfiguration) c.delayConfiguration.hasOwnProperty(g) && (f =
                                c.delayConfiguration[g].number, "undefined" !== typeof f && 0 < f && (c.delayConfiguration[g].timeout && window.clearTimeout(c.delayConfiguration[g].timeout), c.delayConfiguration[g].timeout = void 0));
                            d && (c.refreshTab = ATInternet.Utils.cloneSimpleObject(c.backupRefreshTab));
                            this.timeout[a][b] = c
                        }
                    } else c && window.clearTimeout(c)
                };
                this.removePlayer = function(b) {
                    for (var d in this.timeout[b])
                        if (this.timeout[b].hasOwnProperty(d)) {
                            this.clearTimeout(b, d, !1);
                            var c = l.getMediaValue(b, d, "a");
                            "undefined" !== typeof this.timeout[b][d] &&
                                "stop" !== c && a.richMedia.send({
                                    action: "stop",
                                    playerId: b,
                                    mediaLabel: d
                                })
                        }
                    this.timeout[b] = {}
                };
                this.removeAll = function() {
                    for (var a in this.timeout) this.timeout.hasOwnProperty(a) && this.removePlayer(a);
                    this.timeout = {}
                }
            },
            c = function(b, d, c) {
                return a.utils.manageChapters(b, d, 3) + (b[c] ? b[c] : "")
            },
            b = function(a, b, d, c) {
                var f = a[b];
                "boolean" === typeof a[b] && (f = a[b] ? c : d);
                return f
            },
            d = function(a) {
                var b = 0;
                /^(\-|\+)?([0-9]+)$/.test(a) && (b = Number(a));
                return b
            },
            f = function(a, b, d, c, f) {
                b = l.getMediaValue(b, d, c);
                "undefined" !== typeof b &&
                    (a[c] = f ? encodeURIComponent(b) : b)
            },
            g = function(a, b, d) {
                "undefined" !== typeof d && (a[b] = d)
            };
        a.richMedia = {};
        a.richMedia.add = function(a) {
            a = a || {};
            var e = d(a.playerId),
                f = c(a, "mediaTheme", "mediaLabel"),
                g = b(a, "isEmbedded", "int", "ext");
            l.setMediaValue(e, f, "plyr", e);
            l.setMediaValue(e, f, "type", a.mediaType);
            l.setMediaValue(e, f, "s2", a.mediaLevel2);
            l.setMediaValue(e, f, "p", f);
            l.setMediaValue(e, f, "clnk", a.linkedContent || a.previousMedia);
            l.setMediaValue(e, f, "a", a.action);
            l.setMediaValue(e, f, "rfsh", a.refreshDuration);
            l.setMediaValue(e,
                f, "m1", a.duration);
            l.setMediaValue(e, f, "m5", g);
            l.setMediaValue(e, f, "m6", a.broadcastMode);
            l.setMediaValue(e, f, "m9", a.webdomain)
        };
        a.richMedia.send = function(m) {
            m = m || {};
            var e = d(m.playerId),
                n = c(m, "mediaTheme", "mediaLabel"),
                q = m.action;
            l.setMediaValue(e, n, "a", q);
            var r = {
                plyr: e,
                p: n
            };
            f(r, e, n, "a", !1);
            f(r, e, n, "type", !1);
            f(r, e, n, "s2", !1);
            f(r, e, n, "m1", !1);
            f(r, e, n, "m5", !1);
            f(r, e, n, "m6", !1);
            if ("play" === q || "info" === q) {
                m = b(m, "isBuffering", "0", "1");
                var p = a.getContext("page") || {},
                    s = c(p, "chapter", "name") || void 0,
                    p = p.level2 ||
                    void 0;
                g(r, "buf", m);
                g(r, "prich", s);
                g(r, "s2rich", p);
                f(r, e, n, "clnk", !1);
                f(r, e, n, "m9", !0)
            }
            a.sendHit(r, [
                ["hitType", ["richmedia"]]
            ], null, null);
            "pause" === q ? k.clearTimeout(e, n, !1) : "stop" === q && k.clearTimeout(e, n, !0);
            if ("play" === q || "refresh" === q) q = l.getMediaValue(e, n, "rfsh"), "object" === typeof q && null !== q ? k.setTimeoutObject(e, n, q) : (q = h(q, 5), 0 !== q && k.setTimeout(e, n, q))
        };
        a.richMedia.remove = function(a) {
            k.removePlayer(a);
            l.removePlayer(a)
        };
        a.richMedia.removeAll = function() {
            k.removeAll();
            l.removeAll()
        }
    };
    window.ATInternet.Tracker.addPlugin("RichMedia");
}).call(window);
(function() {
    var dfltPluginCfg = {};
    var dfltGlobalCfg = {};
    window.ATInternet.Tracker.Plugins.OnSiteAds = function(a) {
        var h = "",
            l = function(b) {
                return a.utils.manageChapters(b, "chapter", 3) + (b.name ? b.name : "")
            },
            k = function(a, b) {
                return a[b] ? a[b] : ""
            },
            c = function(a, b) {
                var d = k(a, b);
                if (d) {
                    var c = k(a, "prefix");
                    if (d.campaignId) {
                        var c = c || "PUB",
                            f = k(d, "campaignId"),
                            g = k(d, "creation"),
                            h = k(d, "variant"),
                            l = k(d, "format"),
                            u = k(d, "generalPlacement"),
                            y = k(d, "detailedPlacement"),
                            w = k(d, "advertiserId"),
                            d = k(d, "url");
                        return c + "-" + f + "-" + g + "-" + h + "-" + l + "-" + u + "-" + y + "-" + w + "-" + d
                    }
                    if (d.adId) return c =
                        c || "INT", f = k(d, "adId"), g = k(d, "format"), d = k(d, "productId"), c + "-" + f + "-" + g + "||" + d
                }
                return ""
            },
            b = function(b) {
                var e = ["onSiteAdsImpression"],
                    d = {};
                d.ati = {
                    _value: c(b, "impression"),
                    _options: {
                        hitType: e,
                        truncate: !0
                    }
                };
                d.type = "AT";
                ATInternet.Utils.isPreview() && a.getConfig("preview") && (d.pvw = 1);
                var f = b.customObject;
                f && (f = a.processTagObject("stc", e, f), d.stc = {
                    _value: ATInternet.Utils.jsonSerialize(f),
                    _options: {
                        hitType: e,
                        encode: !0,
                        separator: ",",
                        truncate: !0
                    }
                });
                a.manageSend(function() {
                    a.sendHit(d, [
                            ["hitType", e]
                        ], b.callback,
                        null)
                })
            },
            d = function(b, e) {
                var d = a.buffer.get("ati", !0) || {};
                d._value = "string" === typeof d._value ? [d._value] : d._value || [];
                d._options = d._options || {
                    truncate: !0,
                    hitType: [e, "page"]
                };
                d._value.push(b);
                a.buffer.set("ati", d._value, d._options)
            },
            f = function(b, e) {
                b.click ? a.setParam("atc", c(b, "click"), {
                    truncate: !0,
                    hitType: [e, "page"]
                }) : b.impression && a.setParam("ati", c(b, "impression"), {
                    truncate: !0,
                    hitType: [e, "page"]
                });
                if (b.customObject) {
                    a.setContext("onsiteads", {
                        customObject: b.customObject
                    });
                    var d = a.getContext("page") || {};
                    d.customObject = ATInternet.Utils.completeFstLevelObj(d.customObject, b.customObject, !1);
                    a.setContext("page", d)
                }
                a.dispatchSubscribe("onSiteAds")
            };
        a.selfPromotion = this.selfPromotion = {};
        a.publisher = this.publisher = {};
        a.publisher.set = this.publisher.set = function(a) {
            f(a, "publisher")
        };
        a.selfPromotion.set = this.selfPromotion.set = function(a) {
            f(a, "selfPromotion")
        };
        a.publisher.add = this.publisher.add = function(b) {
            d(c(b, "impression"), "publisher");
            a.dispatchSubscribe("onSiteAds")
        };
        a.selfPromotion.add = this.selfPromotion.add =
            function(b) {
                d(c(b, "impression"), "selfPromotion");
                a.dispatchSubscribe("onSiteAds")
            };
        var g = this.advertEvent = function(d) {
            var e = !0,
                f = null;
            d && d.hasOwnProperty("event") && (f = d.event || window.event);
            !ATInternet.Utils.isTabOpeningAction(f) && d.elem && (e = a.techClicks.manageClick(d.elem, f));
            if (d.click) {
                var f = ["onSiteAdsClick"],
                    g = a.getContext("page") || {},
                    h = {};
                h.atc = {
                    _value: c(d, "click"),
                    _options: {
                        truncate: !0
                    }
                };
                h.type = "AT";
                h.patc = l(g);
                h.s2atc = g.level2 || "";
                if (g = d.customObject) g = a.processTagObject("stc", f, g), h.stc = {
                    _value: ATInternet.Utils.jsonSerialize(g),
                    _options: {
                        hitType: f,
                        encode: !0,
                        separator: ",",
                        truncate: !0
                    }
                };
                a.sendHit(h, [
                    ["hitType", f]
                ], d.callback, null)
            } else d.impression && b(d);
            return e
        };
        a.publisher.send = this.publisher.send = function(a) {
            return g(a)
        };
        a.selfPromotion.send = this.selfPromotion.send = function(a) {
            return g(a)
        };
        a.onSiteAds = {};
        a.onSiteAds.onDispatch = this.onDispatch = function(b) {
            if (!a.dispatchSubscribed("page")) {
                a.setParam("type", "AT", {
                    hitType: ["publisher", "selfPromotion"]
                });
                var d = a.getContext("page") || {};
                a.getParam("atc") && (a.setParam("patc", l(d), {
                    hitType: ["publisher", "selfPromotion"]
                }), a.setParam("s2atc", d.level2 || "", {
                    hitType: ["publisher", "selfPromotion"]
                }));
                ATInternet.Utils.isPreview() && a.getConfig("preview") && a.setParam("pvw", 1);
                var c = ["publisher", "selfPromotion"];
                (d = (a.getContext("onsiteads") || {}).customObject) ? a.processContextObjectAndSendHit("stc", {
                    hitType: c,
                    encode: !0,
                    separator: ",",
                    truncate: !0
                }, d, b): a.manageSend(function() {
                    a.sendHit(null, [
                        ["hitType", c]
                    ], b, null)
                })
            }
        };
        a.plugins.waitForDependencies(["Utils",
            "TechClicks"
        ], function() {
            h = document.location.href;
            var b = a.utils.getQueryStringValue("xtatc", h);
            b && a.setParam("atc", b, {
                hitType: ["publisher", "selfPromotion", "page"]
            });
            a.emit("OnSiteAds:Ready", {
                lvl: "INFO",
                details: {
                    href: h
                }
            })
        })
    };
    window.ATInternet.Tracker.addPlugin("OnSiteAds");
}).call(window);
if (typeof window.ATInternet.onTrackerLoad === 'function') {
    window.ATInternet.onTrackerLoad();
}