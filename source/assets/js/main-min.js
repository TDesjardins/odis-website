"use strict";

function _typeof(t) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
}
var lineChart = function (t) {
        var e = {},
            n = t.container || d3.select("body"),
            a = t.height || 250,
            r = t.width || 500,
            o = t.xTickNum || !1,
            i = t.data,
            c = t.xGrid || !1,
            s = t.yGrid || !1,
            l = t.xLabel || !1,
            d = t.yLabel || !1,
            u = t.group_sort || !1,
            h = t.date_column || "date",
            p = t.data_column || "value",
            f = t.zero_based || !1,
            g = t.group_column || !1,
            m = t.colors || "#000",
            y = n.append("svg").attr("width", r).attr("height", a).attr("viewBox", "0 0 ".concat(r, " ").concat(a)).attr("preserveAspectRatio", "xMidYMid meet"),
            v = t.margin || {
                top: 20,
                right: 20,
                bottom: 30,
                left: 50
            },
            b = r - v.left - v.right,
            x = a - v.top - v.bottom,
            _ = y.append("g").attr("transform", "translate(".concat(v.left, ",").concat(v.top, ")")),
            k = t.parseTime || d3.timeParse("%Y-%m-%d"),
            w = t.isTime || !1,
            z = t.xTicks || !1;
        i.forEach(function (t) {
            t[h] = w ? k(t[h]) : +t[h], t[p] = +t[p]
        });
        var M = t.x || 1 == w ? d3.scaleTime().rangeRound([0, b]).domain(d3.extent(i, function (t) {
                return t[h]
            })) : d3.scaleLinear().range([0, b]).domain(d3.extent(i, function (t) {
                return t[h]
            })),
            A = t.y || d3.scaleLinear().rangeRound([x, 0]).domain(f ? [0, d3.max(i, function (t) {
                return t[p]
            })] : d3.extent(i, function (t) {
                return t[p]
            })),
            T = t.line || d3.line().x(function (t) {
                return M(t[h])
            }).y(function (t) {
                return A(t[p])
            }),
            B = d3.axisBottom(M);
        if (z && B.tickFormat(z), o && B.ticks(o), c) {
            var L = d3.axisBottom(M);
            z && L.tickFormat(z), o && L.ticks(o), _.append("g").attr("transform", "translate(0,".concat(x, ")")).attr("class", "gridline").call(L.tickSize(-x).tickFormat(""))
        }
        if (s) {
            var N = d3.axisLeft(A);
            _.append("g").attr("class", "gridline").call(N.tickSize(-b).tickFormat(""))
        }
        if (_.append("g").attr("transform", "translate(0," + x + ")").call(B), _.append("g").call(d3.axisLeft(A)), g) {
            var D = [];
            u ? D = u : i.forEach(function (t) {
                -1 == D.indexOf(t[g]) && D.push(t[g])
            }), D.forEach(function (t, e) {
                _.append("path").attr("class", "path").attr("id", "path_" + t).datum(i.filter(function (e) {
                    return e[g] == t
                })).attr("fill", "none").attr("stroke", "object" == _typeof(m) ? m[t] : m).attr("stroke-linejoin", "round").attr("stroke-linecap", "round").attr("stroke-width", 1.5).attr("d", T)
            })
        } else _.append("path").datum(i).attr("class", "path").attr("fill", "none").attr("stroke", "object" == _typeof(m) ? m[key] : m).attr("stroke-linejoin", "round").attr("stroke-linecap", "round").attr("stroke-width", 1.5).attr("d", T);
        return l && _.append("g").attr("transform", "translate(".concat(b, ",").concat(x + 10, ")")).append("text").text(l).attr("text-anchor", "end").attr("fill", "#000").style("font-size", 10).style("font-family", "sans-serif"), d && _.append("g").append("text").attr("fill", "#000").attr("transform", "rotate(-90)").style("font-size", 10).style("font-family", "sans-serif").attr("y", 6).attr("dy", "0.71em").attr("text-anchor", "end").text(d), e.svg = function () {
            return y
        }, e.x = function (t) {
            return M(t)
        }, e.y = function (t) {
            return A(t)
        }, e.g = function () {
            return _
        }, e.dHeight = function () {
            return x
        }, e.dWidth = function () {
            return b
        }, e.parseTime = function (t) {
            return k(t)
        }, e
    },
    histogram = function (t) {
        var e = {},
            n = t.container || d3.select("body"),
            a = t.height || 250,
            r = t.width || 500,
            o = t.data,
            i = t.data_column || "value",
            c = (t.zero_based, t.colors, n.append("svg").attr("width", r).attr("height", a).attr("viewBox", "0 0 ".concat(r, " ").concat(a)).attr("preserveAspectRatio", "xMidYMid meet")),
            s = t.margin || {
                top: 20,
                right: 20,
                bottom: 30,
                left: 50
            },
            l = r - s.left - s.right,
            d = a - s.top - s.bottom,
            u = c.append("g").attr("transform", "translate(".concat(s.left, ",").concat(s.top, ")")),
            h = t.parseTime || d3.timeParse("%Y-%m-%d"),
            p = t.isTime || !1,
            f = t.equalize || !1,
            g = [];
        o.forEach(function (t) {
            p ? "NaN" != t[i] && g.push(h(t[i])) : "NaN" != t[i] && g.push(+t[i])
        });
        var m = t.maxValue || d3.max(g),
            y = t.bins || d3.thresholdSturges(g, d3.min(g), m),
            v = d3.scaleLinear().domain([d3.min(g), m]).range([0, l]),
            b = d3.histogram().domain(v.domain()).thresholds(y)(g),
            x = [];
        b.forEach(function (t) {
            var e = d3.extent(t);
            isNaN(e[0]) || isNaN(e[1]) ? x.push({
                count: t.length,
                label: "-"
            }) : Math.floor(e[0]) != Math.floor(e[1]) ? x.push({
                count: t.length,
                label: Math.floor(e[0]) + "-" + Math.floor(e[1])
            }) : x.push({
                count: t.length,
                label: Math.floor(e[0])
            })
        });
        for (var _ = t.maxLength || d3.max(b, function (t) {
                return f ? f(t.length) : t.length
            }), k = [], w = 0; w < x.length; w++) k.push(w);
        var z = d3.scaleBand().domain(k).range([0, l]),
            M = d3.scaleLinear().domain([0, _]).nice().range([d, 0]);
        return u.append("g").call(d3.axisLeft(M)).call(function (t) {
            return t.select(".domain").remove()
        }).call(function (t) {
            return t.selectAll(".tick line").attr("x1", l).style("stroke", "rgba(0,0,0,0.1)")
        }).call(function (t) {
            return t.select(".tick:last-of-type text").clone().attr("x", 4).attr("text-anchor", "start").attr("font-weight", "bold").text(o.y)
        }), u.append("g").attr("transform", "translate(0,".concat(d, ")")).call(d3.axisBottom(z).tickFormat(function (t) {
            return x[t].label
        })), u.append("g").call(d3.axisBottom(z).tickFormat(function (t) {
            return x[t].count > 0 ? f ? Math.round(f(x[t].count)) : x[t].count : ""
        })).call(function (t) {
            return t.selectAll(".tick line").style("stroke", function (t) {
                return x[t].count > 0 ? "#000" : "transparent"
            })
        }).call(function (t) {
            return t.selectAll(".tick text").attr("dy", -12)
        }).call(function (t) {
            return t.selectAll(".tick").attr("transform", function (t, e) {
                return "translate(".concat(z(e) + z.bandwidth() / 2, ",").concat(M(f ? f(x[t].count) : x[t].count) - 7, ")")
            })
        }).call(function (t) {
            return t.select(".domain").remove()
        }), u.append("g").attr("fill", "#000").selectAll("rect").data(b).enter().append("rect").attr("x", function (t, e) {
            return l / b.length * e + 1
        }).attr("width", function (t) {
            return Math.max(0, v(t.x1) - v(t.x0) - 2)
        }).attr("y", function (t) {
            var e = M(f ? f(t.length) : t.length);
            return e > d - 1 && t.length > 0 && (e = d - 1), e
        }).attr("height", function (t) {
            var e = M(0) - M(f ? f(t.length) : t.length);
            return e > 0 && e < 1 && (e = 1), e
        }), e.svg = function () {
            return c
        }, e.g = function () {
            return u
        }, e.dHeight = function () {
            return d
        }, e.dWidth = function () {
            return l
        }, e
    },
    histodots = function (t) {
        var e = {},
            n = t.container || d3.select("body"),
            a = t.height || 250,
            r = t.width || 500,
            o = t.data,
            i = t.data_column || "value",
            c = t.zero_based || !1,
            s = t.colors || ["#2e91d2", "#E60032"],
            l = n.append("svg").attr("width", r).attr("height", a).attr("viewBox", "0 0 ".concat(r, " ").concat(a)).attr("preserveAspectRatio", "xMidYMid meet"),
            d = t.margin || {
                top: 20,
                right: 20,
                bottom: 30,
                left: 50
            },
            u = r - d.left - d.right,
            h = a - d.top - d.bottom,
            p = l.append("g").attr("transform", "translate(".concat(d.left, ",").concat(d.top, ")")),
            f = t.parseTime || d3.timeParse("%Y-%m-%d"),
            g = t.isTime || !1,
            m = (t.equalize, []);
        o.forEach(function (t) {
            g ? "NaN" != t[i] && m.push(f(t[i])) : "NaN" != t[i] && m.push(+t[i])
        });
        var y = t.maxValue || d3.max(m),
            v = d3.scaleLinear().domain([c ? 0 : d3.min(m), y]).range(s),
            b = t.bins || d3.thresholdSturges(m, d3.min(m), y),
            x = d3.histogram().thresholds(b)(m),
            _ = [];
        x.forEach(function (t) {
            var e = d3.extent(t);
            isNaN(e[0]) || isNaN(e[1]) ? _.push({
                count: t.length,
                label: "-"
            }) : Math.floor(e[0]) != Math.floor(e[1]) ? _.push({
                count: t.length,
                label: Math.floor(e[0]) + "-" + Math.floor(e[1])
            }) : _.push({
                count: t.length,
                label: Math.floor(e[0])
            })
        });
        var k = 0;
        return _.forEach(function (t, e) {
            if (t.count > 0) {
                var n = Math.floor(u / 8),
                    a = p.append("g").attr("transform", "translate(0,".concat(k, ")")),
                    r = a.append("text").text(t.label).style("font-family", "sans-serif").style("font-size", 10).node().getBoundingClientRect();
                x[e] = x[e].sort(), a.append("line").attr("x1", r.width + 10).attr("y1", 0).attr("y2", 0).attr("x2", u).style("stroke-dasharray", "3,3").style("stroke", "black"), a.append("g").attr("transform", "translate(".concat(4, ",").concat(14, ")")).selectAll("circle").data(x[e]).enter().append("circle").attr("r", 3).style("fill", function (t) {
                    return v(t)
                }).attr("cy", function (t, e) {
                    return 8 * Math.floor(e / n)
                }).attr("cx", function (t, e) {
                    return 8 * (e - Math.floor(e / n) * n)
                }), k += 10 * (e == _.length - 1 ? 1 : 3) + 8 * Math.ceil(t.count / n)
            }
        }), a = k + d.top + d.bottom, l.attr("height", a).attr("viewBox", "0 0 ".concat(r, " ").concat(a)), e.svg = function () {
            return l
        }, e.g = function () {
            return p
        }, e.dHeight = function () {
            return h
        }, e.dWidth = function () {
            return u
        }, e
    },
    stackedArea = function (t) {
        var e = {},
            n = t.container || d3.select("body"),
            a = t.height || 250,
            r = t.width || 500,
            o = t.data,
            i = t.date_column || "date",
            c = (t.data_column, t.zero_based, t.colors, n.append("svg").attr("width", r).attr("height", a).attr("viewBox", "0 0 ".concat(r, " ").concat(a)).attr("preserveAspectRatio", "xMidYMid meet")),
            s = t.margin || {
                top: 20,
                right: 20,
                bottom: 30,
                left: 50
            },
            l = r - s.left - s.right,
            d = a - s.top - s.bottom,
            u = c.append("g").attr("transform", "translate(".concat(s.left, ",").concat(s.top, ")")),
            h = t.parseTime || d3.timeParse("%Y-%m-%d"),
            p = t.isTime || !1,
            f = [],
            g = d3.max(o, function (t) {
                return d3.sum(d3.keys(t).map(function (e) {
                    return e !== i ? t[e] : 0
                }))
            });
        o.forEach(function (t) {
            var e = 0;
            for (var n in t) p && n == i ? t[n] = h(t[n]) : (t[n] = +t[n], e += t[n]);
            f.push(e)
        });
        var m = [];
        o.forEach(function (t, e) {
            var n = {};
            for (var a in t) n[a] = p && a == i ? t[a] : t[a] / f[e] * g;
            m.push(n)
        });
        var y = o.columns.filter(function (t) {
                return t !== i
            }),
            v = d3.scaleTime().range([0, l]).domain(d3.extent(o, function (t) {
                return t[i]
            })),
            b = d3.scaleLinear().range([d, 0]).domain([0, g]),
            x = (d3.scaleOrdinal().range(d3.schemeAccent).domain(d3.keys(o[0]).filter(function (t) {
                return t !== i
            })), d3.axisBottom().scale(v)),
            _ = d3.axisLeft().scale(b),
            k = d3.area().x(function (t) {
                return v(t.data.date)
            }).y0(function (t) {
                return b(t[0])
            }).y1(function (t) {
                return b(t[1])
            }),
            w = d3.stack().keys(y).order(d3.stackOrderNone).offset(d3.stackOffsetNone)(o),
            z = d3.stack().keys(y).order(d3.stackOrderNone).offset(d3.stackOffsetNone)(m),
            M = u.selectAll(".browser").data(w).enter().append("g").attr("class", function (t) {
                return "browser " + t.key
            }).attr("fill-opacity", .5).append("path").attr("class", "area").attr("d", k).style("fill", "rgba(0,0,0,0.1)").style("stroke", "#555").style("stroke-width", "0.1").on("mouseover", function (t) {
                d3.select(this).style("fill", "#1e3791"), A.attr("transform", "translate(".concat(d3.mouse(this)[0], ",").concat(d3.mouse(this)[1], ")")).text(t.key).style("display", "block")
            }).on("mousemove", function (t) {
                A.attr("dx", d3.mouse(this)[0] < l / 2 ? 10 : -10).attr("text-anchor", d3.mouse(this)[0] < l / 2 ? "start" : "end").attr("transform", "translate(".concat(d3.mouse(this)[0], ",").concat(d3.mouse(this)[1], ")"))
            }).on("mouseout", function () {
                d3.select(this).style("fill", "rgba(0,0,0,0.1)"), A.style("display", "none")
            });
        u.append("g").attr("class", "x axis").attr("transform", "translate(0," + d + ")").call(x), u.append("g").attr("class", "y axis").call(_), u.append("text").attr("dx", 10).attr("dy", 15).text("Zugriffszahlen").style("font-family", "sans-serif").style("font-size", 10);
        var A = u.append("text").attr("dy", 6).style("text-shadow", "0px 0px 3px #fff").style("fill", "#000").style("font-weight", "bold").style("pointer-events", "none").style("font-family", "sans-serif").style("font-size", 10).style("text-transform", "capitalize"),
            T = !0;
        return e.setMode = function (t) {
            T = t
        }, e.mode = function () {
            return T
        }, e.update = function () {
            M.datum(function (t, e) {
                return T ? w[e] : z[e]
            }).transition().attr("d", k)
        }, e.svg = function () {
            return c
        }, e.g = function () {
            return u
        }, e.dHeight = function () {
            return d
        }, e.dWidth = function () {
            return l
        }, e
    },
    histoline = function (t) {
        var e = t.container || d3.select("body"),
            n = t.height || 250,
            a = t.width || 500,
            r = t.data,
            o = t.data_column || "value",
            i = (t.zero_based, t.colors, e.append("svg").attr("width", a).attr("height", n).attr("viewBox", "0 0 ".concat(a, " ").concat(n)).attr("preserveAspectRatio", "xMidYMid meet")),
            c = t.margin || {
                top: 20,
                right: 20,
                bottom: 30,
                left: 50
            },
            s = a - c.left - c.right,
            l = n - c.top - c.bottom,
            d = i.append("g").attr("transform", "translate(".concat(c.left, ",").concat(c.top, ")")),
            u = t.parseTime || d3.timeParse("%Y-%m-%d"),
            h = t.isTime || !1,
            p = [];
        r.forEach(function (t) {
            "NaN" != t[o] && (h ? p.push(u(t[o])) : p.push(+t[o]))
        });
        var f = d3.scaleLinear().domain(d3.extent(p)).nice().range([0, s]),
            g = d3.max(p) - d3.min(p),
            m = d3.histogram().thresholds(g)(p),
            y = d3.min(p);
        m.forEach(function (t, e) {
            t.v = e + y
        }), m.slice(g, m.length - g), m = m.filter(function (t) {
            return t.length > 0
        });
        var v = d3.line().x(function (t) {
                return f(t.v)
            }).y(function (t, e) {
                return b(t.length)
            }),
            b = d3.scaleLinear().domain([0, d3.max(m, function (t) {
                return t.length
            })]).nice().range([l, 0]);
        return d.append("g").call(d3.axisLeft(b)).call(function (t) {
            return t.select(".domain").remove()
        }).call(function (t) {
            return t.selectAll(".tick line").attr("x1", s).style("stroke", "rgba(0,0,0,0.1)")
        }).call(function (t) {
            return t.select(".tick:last-of-type text").clone().attr("x", 4).attr("text-anchor", "start").attr("font-weight", "bold").text(r.y)
        }), d.append("g").attr("transform", "translate(0,".concat(l, ")")).call(d3.axisBottom(f)), d.append("g").append("path").attr("fill", "transparent").attr("stroke", "red").attr("d", v(m)), {}
    },
    heatgrid = function (t) {
        var e = t.container || d3.select("body"),
            n = t.height || 250,
            a = t.width || 500,
            r = t.data,
            o = t.date_column || "date",
            i = t.data_column || "value",
            c = t.zero_based || !1,
            s = (t.group_column, t.colors || ["rgba(255,255,255,1)", "rgba(0,0,0,1)"]),
            l = e.append("svg").attr("width", a).attr("height", n).attr("viewBox", "0 0 ".concat(a, " ").concat(n)).attr("preserveAspectRatio", "xMidYMid meet"),
            d = t.margin || {
                top: 20,
                right: 20,
                bottom: 30,
                left: 50
            },
            u = a - d.left - d.right,
            h = n - d.top - d.bottom,
            p = l.append("g").attr("transform", "translate(".concat(d.left, ",").concat(d.top, ")")),
            f = t.parseTime || d3.timeParse("%Y-%m-%d"),
            g = t.isTime || !1;
        r.forEach(function (t) {
            t[o] = g ? f(t[o]) : +t[o], t[i] = +t[i]
        });
        var m = t.cols || 10,
            y = t.rows || 10,
            v = t.x || 1 == g ? d3.scaleTime().rangeRound([0, m - 1]).domain(d3.extent(r, function (t) {
                return t[o]
            })) : d3.scaleLinear().rangeRound([0, m - 1]).domain(d3.extent(r, function (t) {
                return t[o]
            })),
            b = t.y || d3.scaleLinear().rangeRound([y - 1, 0]).domain(c ? [0, d3.max(r, function (t) {
                return t[i]
            })] : d3.extent(r, function (t) {
                return t[i]
            })),
            x = u / m,
            _ = h / y,
            k = t.x || 1 == g ? d3.scaleTime().rangeRound([0, u - x]).domain(d3.extent(r, function (t) {
                return t[o]
            })) : d3.scaleLinear().range([0, u - x]).domain(d3.extent(r, function (t) {
                return t[o]
            })),
            w = t.y || d3.scaleLinear().rangeRound([h, 0]).domain(c ? [0, d3.max(r, function (t) {
                return t[i]
            })] : d3.extent(r, function (t) {
                return t[i]
            })),
            z = {};
        r.forEach(function (t) {
            var e = v(t[o]),
                n = b(t[i]);
            e in z || (z[e] = {}), n in z[e] || (z[e][n] = 0), z[e][n]++
        });
        var M = [];
        for (var A in z)
            for (var T in z[A]) M.push({
                x: A,
                y: T,
                c: z[A][T]
            });
        var B = d3.scaleLinear().domain([0, d3.max(M, function (t) {
            return t.c
        })]).range([s[0], s[1]]);
        return p.append("g").attr("transform", "translate(".concat(x / 2, ",").concat(h, ")")).call(d3.axisBottom(k)), p.append("g").call(d3.axisLeft(w)), p.append("g").selectAll("rect").data(M).enter().append("rect").attr("width", x).attr("height", _).attr("x", function (t) {
            return t.x * x
        }).attr("y", function (t) {
            return t.y * _
        }).attr("fill", function (t) {
            return B(t.c)
        }), {}
    };
d3.csv("/charts/all.csv").then(function (t) {
    var e = lineChart({
            container: d3.select("#introvis"),
            data: t,
            yLabel: "Zugriffe",
            isTime: !0,
            zero_based: !0,
            group_column: "type",
            width: 500,
            height: 250,
            group_sort: ["pv", "a_pv", "r_pv", "ra_pv", "ora_pv"],
            colors: {
                pv: "rgba(0,0,0,0.25)",
                a_pv: "rgba(0,0,0,0.5)",
                r_pv: "rgba(0,0,0,0.75)",
                ra_pv: "rgba(0,0,0,1)",
                ora_pv: "rgba(255,0,0,1)"
            }
        }),
        n = [{
            y: 30,
            dy: 20,
            date: "2013-04-01",
            note: {
                title: "VBB Daten"
            }
        }, {
            y: 30,
            dy: 20,
            date: "2013-09-01",
            note: {
                title: "Wahl 2013"
            }
        }, {
            y: 30,
            dy: 20,
            date: "2017-03-01",
            note: {
                title: "Beliebte Vornamen"
            }
        }, {
            y: 30,
            dy: 20,
            date: "2017-09-01",
            note: {
                title: "Wahl 2017"
            }
        }];
    n.forEach(function (t) {
        t.x = e.x(e.parseTime(t.date)), t.x > e.dWidth() / 2 ? t.dx = -50 : t.dx = 50, t.annotation = e.g().append("g").attr("class", "annotation-group").call(d3.annotation().notePadding(5).type(d3.annotationCalloutElbow).annotations([t])).style("display", "none")
    });
    var a = e.g().append("g").selectAll("line").data(n).enter().append("line").attr("x1", function (t) {
            return t.x
        }).attr("x2", function (t) {
            return t.x
        }).attr("y1", 0).attr("y2", e.dHeight()).attr("stroke", "red").attr("stroke-dasharray", "5,5"),
        r = [{
            title: "Zugriffszahlen",
            copy: "Die Kurve links zeigt die Zugriffszahlen seid April 2013. Nach gutem Beginn stagnierte die Entwicklung über einen längeren Zeitraum. Seit 2017 ist wieder ein deutlicher Anstieg zu verzeichnen. <br /><br />Klicke auf weiter um mehr zu erfahren."
        }, {
            title: "Verschwundene Daten",
            copy: "Einige der in der Statistik aufgeführten Datensätze sind inzwischen nicht mehr auf dem Portal abrufbar. Für die weitere Analyse nutzen wir nur Daten, die nach wie vor offen verfügbar sind."
        }, {
            title: "Tests",
            copy: "Regelmäßig gibt es eine geringe Zahl an Downloads, die vor dem Veröffentlichungsdatum liegen. Vermutlich handelt es sich um interne Tests."
        }, {
            title: "Ausreißer",
            copy: "Bei Betrachtung der Kurve fallen einige Ausreißer auf..."
        }, {
            title: "VBB Daten",
            copy: "Im April 2013 stellte der Verkehrsverbund Berlin Brandenburg (VBB) seine Fahrplandaten unter freie Lizenz. Die Daten erfreuten sich in den ersten Monaten großer Beliebtheit. Da der VBB mittlerweile eine eigene API anbietet, sind die Zugriffe über das Portal inzwischen niedriger."
        }, {
            title: "Wahlen",
            copy: "Die Bundestagswahlen von 2013 und 2017 sind ebenfalls deutlich sichtbar. Speziell die Datensätze, die Wahlbezirke definieren, werden in diesen Zeiträumen häufig heruntergeladen."
        }, {
            title: "Beliebte Vornamen",
            copy: "Alle Jahre wieder ein Lieblingsthema der Medien: Die beliebtesten Vornamen in Berlin. Dieser Datensatz wird im Frühjahr des Folgejahrs veröffentlicht und führt zu einer Vielzahl an Karten und Visualisierungen in der Berliner Presse."
        }, {
            title: "Bereinigte Daten",
            copy: "Da eine weitere Analyse mit den extremen Ausschlägen sehr schwierig ist, wurden die Daten für die folgenden Analysen angeglichen."
        }],
        o = 0,
        i = function () {
            d3.select("#introtitle").html(r[o].title), d3.select("#introcopy").html(r[o].copy), e.svg().selectAll(".path").style("display", "none"), n.forEach(function (t) {
                t.annotation.style("display", "none")
            });
            var t = ["pv"];
            switch (o) {
                case 0:
                    a.style("display", "none");
                    break;
                case 1:
                    t = ["pv", "a_pv"];
                    break;
                case 2:
                    a.style("display", "none"), t = ["pv", "a_pv", "ra_pv"];
                    break;
                case 3:
                    a.style("display", "block"), t = ["pv", "a_pv", "ra_pv"];
                    break;
                case 4:
                    t = ["pv", "a_pv", "ra_pv"], n[0].annotation.style("display", "block");
                    break;
                case 5:
                    t = ["pv", "a_pv", "ra_pv"], n[1].annotation.style("display", "block"), n[3].annotation.style("display", "block");
                    break;
                case 6:
                    t = ["pv", "a_pv", "ra_pv"], n[2].annotation.style("display", "block");
                    break;
                case 7:
                    t = ["pv", "a_pv", "ra_pv", "ora_pv"]
            }
            e.svg().selectAll("#path_" + t.join(", #path_")).style("display", "block"), d3.select("#introprev").property("disabled", 0 == o), d3.select("#intronext").property("disabled", o == r.length - 1)
        };
    d3.select("#intronext").on("click", function () {
        o < r.length - 1 && (o++, i())
    }), d3.select("#introprev").on("click", function () {
        o > 0 && (o--, i())
    }), i()
}).catch(function (t) {
    throw t
}), d3.json("/charts/outlier.json").then(function (t) {
    t.forEach(function (t) {
        var e = d3.select("#outliers").append("div");
        e.append("h3").attr("class", "p-top").text(t.title);
        var n = "<strong>Lizenz</strong>: ".concat(t.license_title, "<br /><strong>Veröffentlichungsdatum</strong>:").concat(t.date_released, "<br /><strong>Autor</strong>:").concat(t.author, '<br /><a href="https://daten.berlin.de/datensaetze/').concat(t.page, '">Zum Datensatz &raquo;</a>');
        e.append("p").attr("class", "copy small-copy").html(n), lineChart({
            container: e,
            yLabel: "Zugriffe",
            xGrid: !0,
            yGrid: !0,
            data: t.original_pv,
            data_column: "c",
            isTime: !0,
            width: 700,
            xTickNum: 5,
            zero_based: !0,
            colors: "#000"
        })
    })
}).catch(function (t) {
    throw t
}), d3.csv("/charts/bots.csv").then(function (t) {
    t.forEach(function (t) {
        t.value = 100 * t.value
    }), lineChart({
        container: d3.select("#timepatterns"),
        data: t,
        isTime: !0,
        width: 700,
        yLabel: "Datensätze mit Klicks in %",
        zero_based: !0,
        group_column: "type",
        colors: {
            req: "rgba(0,0,0,1)",
            reql: "rgba(0,0,0,0.5)"
        }
    })
}).catch(function (t) {
    throw t
}), d3.csv("/charts/releases.csv").then(function (t) {
    var e = lineChart({
        container: d3.select("#newdata"),
        data: t,
        yLabel: "Neue Datensätze",
        yGrid: !0,
        width: 700,
        isTime: !0,
        zero_based: !0,
        y: d3.scaleLinear().rangeRound([200, 0]).domain([0, 100])
    });
    e.g().append("g").attr("class", "annotation-group black").call(d3.annotation().notePadding(5).type(d3.annotationCalloutElbow).annotations([{
        note: {
            title: "19.2.2014",
            label: "403 neue Datensätze"
        },
        x: e.x(e.parseTime("2014-02-19")),
        y: 20,
        dx: 20,
        dy: 50
    }]))
}).catch(function (t) {
    throw t
}), d3.csv("/charts/seasonal.csv").then(function (t) {
    lineChart({
        container: d3.select("#seasonal"),
        data: t,
        yLabel: "Zugriffe rel. zum Jahresmax.",
        width: 700,
        xGrid: !0,
        group_column: "year",
        date_column: "month",
        zero_based: !0,
        xTicks: function (t) {
            return ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"][t]
        },
        colors: {
            2014: "rgba(0,0,0,0.25)",
            2015: "rgba(0,0,0,0.5)",
            2016: "rgba(0,0,0,0.75)",
            2017: "rgba(0,0,0,0.1)"
        }
    })
}).catch(function (t) {
    throw t
}), d3.csv("/charts/overtime.csv").then(function (t) {
    lineChart({
        container: d3.select("#individual"),
        data: t,
        group_column: "type",
        colors: "rgba(0,0,0,0.1)"
    }), heatgrid({
        container: d3.select("#individual"),
        data: t,
        rows: 10,
        cols: 24,
        zero_based: !0
    })
}).catch(function (t) {
    throw t
}), d3.csv("/charts/histofull.csv").then(function (t) {
    histodots({
        container: d3.select("#histograms-1"),
        data: t,
        data_column: "all"
    }), histodots({
        container: d3.select("#histograms-2"),
        data: t,
        data_column: "mean"
    }), histodots({
        container: d3.select("#histograms-3"),
        data: t,
        data_column: "median"
    })
}).catch(function (t) {
    throw t
}), d3.select("#showhistos").on("click", function () {
    var t = d3.select("#individual-histograms"),
        e = d3.select("#showhistos");
    "block" == t.style("display") ? (t.style("display", "none"), e.text("Die ersten 12 Monate eines Datensatzes als Histogramme anzeigen")) : (t.style("display", "block"), e.text("Histogramme ausblenden"))
}), d3.csv("/charts/histotime.csv").then(function (t) {
    for (var e = [], n = 0, a = function (a) {
            e[a] = 0, t.forEach(function (t) {
                "NaN" != t["t" + a + "_median"] && e[a]++
            }), e[a] > n && (n = e[a])
        }, r = 1; r <= 12; r++) a(r);
    var o = function (a) {
        var r = histogram({
            container: d3.select("#individual-histograms"),
            data: t,
            width: 350,
            height: 200,
            maxValue: 160,
            maxLength: 820,
            bins: 20,
            equalize: function (t) {
                return t / e[a] * n
            },
            data_column: "t".concat(a, "_").concat("median")
        });
        r.g().append("g").attr("transform", "translate(".concat(r.dWidth(), ",0)")).append("text").attr("text-anchor", "end").text(a + " Monate nach Release").attr("dy", 6).style("font-family", "sans-serif").style("font-weight", "bold").style("font-size", 12)
    };
    for (r = 1; r <= 12; r++) o(r)
}).catch(function (t) {
    throw t
}), d3.csv("/charts/group_author.csv").then(function (t) {
    var e = stackedArea({
        container: d3.select("#stacked_groups_2"),
        data: t,
        isTime: !0,
        height: 600,
        width: 700
    });
    d3.select("#stacked_groups_2-abs").on("click", function () {
        e.setMode(!0), e.update()
    }), d3.select("#stacked_groups_2-rel").on("click", function () {
        e.setMode(!1), e.update()
    })
}).catch(function (t) {
    throw t
}), d3.csv("/charts/group_group_name.csv").then(function (t) {
    var e = stackedArea({
        container: d3.select("#stacked_groups_1"),
        data: t,
        isTime: !0,
        height: 600,
        width: 700
    });
    d3.select("#stacked_groups_1-abs").on("click", function () {
        e.setMode(!0), e.update()
    }), d3.select("#stacked_groups_1-rel").on("click", function () {
        e.setMode(!1), e.update()
    })
}).catch(function (t) {
    throw t
}), d3.csv("/charts/group_license_title.csv").then(function (t) {
    var e = stackedArea({
        container: d3.select("#stacked_groups_3"),
        data: t,
        isTime: !0,
        height: 600,
        width: 700
    });
    d3.select("#stacked_groups_3-abs").on("click", function () {
        e.setMode(!0), e.update()
    }), d3.select("#stacked_groups_3-rel").on("click", function () {
        e.setMode(!1), e.update()
    })
}).catch(function (t) {
    throw t
});
var buildTable = function (t, e) {
    var n = d3.select("#" + e).append("table"),
        a = n.append("thead").append("tr"),
        r = n.append("tbody").selectAll("tr").data(t).enter().append("tr");
    a.append("th").text("Datensatz"), a.append("th").text("Zugriffe"), r.append("td").html(function (t) {
        return "group" in t ? '<strong><a href="https://daten.berlin.de/datensaetze/'.concat(t.page, '">').concat(t.page, '</a></strong><br /><span class="small">').concat(t.group, "</span>") : '<a href="https://daten.berlin.de/datensaetze/'.concat(t.page, '">').concat(t.page, "</a>")
    }), r.append("td").html(function (t) {
        return "<strong>".concat(Math.round(t.count), "</strong>")
    })
};
d3.csv("/charts/top_abs.csv").then(function (t) {
    buildTable(t, "top_abs")
}).catch(function (t) {
    throw t
}), d3.csv("/charts/top_month.csv").then(function (t) {
    buildTable(t, "top_month")
}).catch(function (t) {
    throw t
}), d3.csv("/charts/top_group_abs.csv").then(function (t) {
    buildTable(t, "top_group_abs")
}).catch(function (t) {
    throw t
}), d3.csv("/charts/top_group_month.csv").then(function (t) {
    buildTable(t, "top_group_month")
}).catch(function (t) {
    throw t
});