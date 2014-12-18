(function ($, pubsub, data, elements, util) {
    var modify = function (options) {
        options.templates.css += '.glimpse-open .glimpse-hud {padding: 0 5px 0 0;float: right;background-color: #3c454f;}.glimpse-open .glimpse-hud-section {float: left;-webkit-transition: all 0.3s ease;-moz-transition: all 0.3s ease;-o-transition: all 0.3s ease;transition: all 0.3s ease;border-left: 11px solid #71b1d1;height: 34px;position: relative;cursor: default;}.glimpse-open .glimpse-hud-title {position: absolute;font-family: "Segoe UI Semibold", "Segoe UI", "Helvetica Neue", Helvetica, Arial;color: white;text-transform: uppercase;cursor: pointer;font-weight: bold;height: 100%;width: 12px;left: -12px;}.glimpse-open .glimpse-hud-title span {position: absolute;line-height: 100%;font-size: 9px;top: 2px;-webkit-transform-origin: 16px 14px;-moz-transform-origin: 16px 14px;-ms-transform-origin: 16px 14px;-o-transform-origin: 16px 14px;-webkit-transform: rotate(270deg);-moz-transform: rotate(270deg);-ms-transform: rotate(270deg);-o-transform: rotate(270deg);}.glimpse-open .glimpse-hud-section-inner {-webkit-transition: all 0.3s ease;-moz-transition: all 0.3s ease;-o-transition: all 0.3s ease;transition: all 0.3s ease;max-width: 999px;min-width: 0px;margin-top: -1px;overflow: hidden;}.glimpse-open .glimpse-hud-section-input {display: none !important;font-size: 12px;}.glimpse-open .glimpse-hud-section-input:checked ~ .glimpse-hud-section-inner, .glimpse-open .glimpse-hud-section-input:checked ~ .glimpse-hud-popup-expander {max-width: 0px;overflow: hidden;}.glimpse-open .glimpse-hud-section-input:checked ~ .glimpse-hud-popup {max-height: 0px;overflow: hidden;}.glimpse-open .glimpse-hud-detail {display: inline-block;padding: 0 10px;}.glimpse-open .glimpse-hud-section-inner .glimpse-hud-detail:first-child {padding-left: 15px;}.glimpse-open .glimpse-hud-section-inner .glimpse-hud-detail:last-child {padding-right: 20px;}.glimpse-open .glimpse-hud-data {-webkit-transition: color 0.3s ease;-moz-transition: color 0.3s ease;-o-transition: color 0.3s ease;transition: color 0.3s ease;}.glimpse-open .glimpse-hud-data-important {font-size: 1.2em;font-weight: bold;}.glimpse-open .glimpse-hud-value-update {color: #71b1d1;}.glimpse-open .glimpse-hud-detail-align-right .glimpse-hud-header {text-align: right;} .glimpse-open .glimpse-hud-detail-extra-large, .glimpse-hud-detail-extra-large span {font-size: 2em;line-height: 100%;}.glimpse-open .glimpse-hud-detail-large, .glimpse-hud-detail-large span {font-size: 1.45em;line-height: 100%;}.glimpse-open .glimpse-hud-detail-normal, .glimpse-hud-detail-normal span, .glimpse-hud-detail-normal div {font-size: 1.2em;line-height: 100%;}.glimpse-open .glimpse-hud-detail-small, .glimpse-hud-detail-small span, .glimpse-hud-detail-small div {font-size: 1.1em;} .glimpse-open .glimpse-hud-detail-extra-small, .glimpse-hud-detail-extra-small span, .glimpse-hud-detail-extra-small div {font-size: 1em;} .glimpse-open .glimpse-hud-detail-position-left .glimpse-hud-value, .glimpse-open .glimpse-hud-detail-position-left div, .glimpse-open .glimpse-hud-detail-position-right div {display: inline-block;}.glimpse-open .glimpse-hud-detail-position-left .glimpse-hud-header {margin-right: 5px;}.glimpse-open .glimpse-hud-detail-position-right .glimpse-hud-header {margin-left: 5px;}.glimpse-open .glimpse-hud-value {font-size: 1em;line-height: 100%;margin-top: -3px;}@media screen\0 {.glimpse-open .glimpse-hud-value { margin-top: -4px; }.glimpse-open .glimpse-hud-detail-normal .glimpse-hud-header { margin-bottom: 2px; }} .glimpse-open .glimpse-hud-header {opacity: 0.6;font-size: 0.7em;line-height: 100%;}.glimpse-open .glimpse-hud-detail-extra-large .glimpse-hud-header {font-size: 0.5em;}.glimpse-open .glimpse-hud-detail-large .glimpse-hud-header {font-size: 0.6em;}.glimpse-open .glimpse-hud-prefix, .glimpse-open .glimpse-hud-postfix, .glimpse-open .glimpse-hud-spacer, .glimpse-open .glimpse-hud-plain {opacity: 0.4;font-size: 0.9em;}.glimpse-open .glimpse-hud-postfix {padding-left: 2px;}.glimpse-open .glimpse-hud-prefix {padding-right: 2px;}.glimpse-open .glimpse-hud-spacer {padding: 0 10px;}.glimpse-open .glimpse-hud-quite, .glimpse-open .glimpse-hud-quite * {opacity: 0.6;}.glimpse-open .glimpse-hud-error, .glimpse-open .glimpse-hud-error * {color: #FF8C80;}.glimpse-open .glimpse-data-trivial {display: none;}.glimpse-open .glimpse-hud-section-inner:hover ~ .glimpse-hud-popup, .glimpse-open .glimpse-hud-popup:hover {max-height: 999px;-webkit-transition: max-height 0.3s ease 0.3s;-moz-transition: max-height 0.3s ease 0.3s;-o-transition: max-height 0.3s ease 0.3s;transition: max-height 0.3s ease 0.3s;}.glimpse-open .glimpse-hud-popup {background-color: #3c454f;border-left: 11px solid #71b1d1;position: absolute;left: -11px;right: 0;z-index: 1;bottom: 0px;max-height: 0px;-webkit-transition: max-height 0.3s ease 0.2s;-moz-transition: max-height 0.3s ease 0.2s;-o-transition: max-height 0.3s ease 0.2s;transition: max-height 0.3s ease 0.2s;} .glimpse-open .glimpse-hud-popup-expander {min-width: 0px;height: 1px;-webkit-transition: min-width 0.1s ease 0.5s;-moz-transition: min-width 0.1s ease 0.5s;-o-transition: min-width 0.1s ease 0.5s;transition: min-width 0.1s ease 0.5s;} .glimpse-open .glimpse-hud-section-inner:hover ~ .glimpse-hud-popup-expander, .glimpse-open .glimpse-hud-popup:hover ~ .glimpse-hud-popup-expander {-webkit-transition: min-width 0.1s ease 0.2s;-moz-transition: min-width 0.1s ease 0.2s;-o-transition: min-width 0.1s ease 0.2s;transition: min-width 0.1s ease 0.2s;} .glimpse-open .glimpse-hud-section-http .glimpse-hud-section-inner:hover ~ .glimpse-hud-popup-expander, .glimpse-open .glimpse-hud-section-http .glimpse-hud-popup:hover ~ .glimpse-hud-popup-expander {min-width: 400px;} .glimpse-open .glimpse-hud-section-host .glimpse-hud-section-inner:hover ~ .glimpse-hud-popup-expander, .glimpse-open .glimpse-hud-section-host .glimpse-hud-popup:hover ~ .glimpse-hud-popup-expander {min-width: 600px;} .glimpse-open .glimpse-hud-section-ajax .glimpse-hud-section-inner:hover ~ .glimpse-hud-popup-expander, .glimpse-open .glimpse-hud-section-ajax .glimpse-hud-popup:hover ~ .glimpse-hud-popup-expander {min-width: 450px;} .glimpse-open .glimpse-hud-popup-clear {clear: both;}.glimpse-open .glimpse-hud-popup-header {margin-bottom: 5px;}.glimpse-open .glimpse-hud-popup .glimpse-hud-detail-extra-large {margin-left: -2px;}.glimpse-open .glimpse-hud-popup-inner {padding: 10px 15px;} .glimpse-open .glimpse-hud-popup .glimpse-hud-detail {padding: 0;}.glimpse-open .glimpse-hud-bar {height: 12px;width:100%;margin: 5px 0 10px;}.glimpse-open .glimpse-hud-bar > div {position: relative;} .glimpse-open .glimpse-hud-bar-item {position: absolute;height: 12px;min-width: 1px;} .glimpse-open .glimpse-hud-summary {width: auto;} .glimpse-open .glimpse-hud-summary-left {float: left;} .glimpse-open .glimpse-hud-summary-right {float: right;} .glimpse-open .glimpse-hud-summary tr {vertical-align: bottom;}.glimpse-open .glimpse-hud-summary-space tr:first-child {height: 65px;}.glimpse-open .glimpse-hud-summary tr:last-child {height: 35px;}.glimpse-open .glimpse-hud-summary-space tr:last-child {height: 46px;}.glimpse-open .glimpse-hud-summary th {font-weight: normal;}.glimpse-open .glimpse-hud-summary td .glimpse-hud-detail {float: right;} .glimpse-open table.glimpse-hud-listing {max-width: 100%;width: 100%;} .glimpse-open .glimpse-hud-popup .glimpse-hud-listing {margin-top: 10px;} .glimpse-open .glimpse-hud-listing td {font-size: 1.025em;line-height: 100%;padding-top: 3px;} .glimpse-open .glimpse-hud-listing-row {padding: 2px 0;} .glimpse-open .glimpse-hud-listing-row > div {display: inline-block;} .glimpse-open .glimpse-hud-listing tr:first-child td {padding-top: 1px;}.glimpse-open .glimpse-hud-listing td {padding-bottom: 1px;}.glimpse-open .glimpse-hud-listing thead th {white-space: nowrap;opacity: 0.6;font-weight: normal;color: white;line-height: 100%;padding-bottom: 5px;} .glimpse-open .glimpse-hud-listing-overflow {white-space: nowrap;overflow: hidden;text-overflow: ellipsis;} .glimpse-open td.glimpse-hud-listing-value, .glimpse-open th.glimpse-hud-listing-value {text-align: right; } .glimpse-open td.glimpse-hud-listing-value, .glimpse-open span.glimpse-hud-listing-value {font-family: Consolas, monospace, serif;opacity: 0.85;}.glimpse-open .glimpse-hud .glimpse-data-childless-duration, .glimpse-open .glimpse-hud .glimpse-data-duration, .glimpse-open .glimpse-hud .glimpse-data-content-type {width:90px;}.glimpse-open .glimpse-hud .glimpse-data-size {width:60px;}.glimpse-open .glimpse-hud .glimpse-data-content-method {width:40px;}.glimpse-open .glimpse-hud .glimpse-data-content-type, .glimpse-open .glimpse-hud .glimpse-data-content-time {text-align: right;}.glimpse-open .glimpse-hud .glimpse-data-childless-start-point {width:100px;}.glimpse-open .glimpse-hud .glimpse-data-request-parts {margin-top:15px;}.glimpse-open .glimpse-hud .glimpse-data-wire-part {width:35%;}.glimpse-open .glimpse-hud .glimpse-data-server-part {width:30%}.glimpse-open .glimpse-hud .glimpse-data-client-part {text-align:right;width:33%}.glimpse-open .glimpse-hud .glimpse-data-ajax-method {width: 30px;text-align: right;}.glimpse-open .glimpse-hud .glimpse-data-ajax-uri {max-width: 230px;padding: 0 20px;} .glimpse-open .glimpse-hud .glimpse-data-query-summary .glimpse-hud-listing-value {color: #e2875e;}.glimpse-open .glimpse-hud .glimpse-hud-section-ajax .glimpse-hud-listing-row {position: relative;top: -20px;opacity: 0;-webkit-transition: all 0.6s ease;-moz-transition: all 0.6s ease;-o-transition: all 0.6s ease;transition: all 0.6s ease;}.glimpse-open .glimpse-hud .glimpse-hud-section-ajax .glimpse-hud-listing-row.added {top: 0px;opacity: 1;}.glimpse-open .glimpse-hud .glimpse-data-ajax-detail tbody tr:first-child td {padding-top: 10px; }.glimpse-open .glimpse-hud-controls {text-align: right;font-size: 1.2em;margin-top: 7px;}.glimpse-open .glimpse-hud-controls span {font-weight: bold;color: #71b1d1;cursor: pointer;}.glimpse-open .glimpse-data-ajax-detail a {color:inherit;}';
    }, loaded = function (args) {
        var html = '', details = args.newData.hud, opened = state.current();
        pubsub.publish('trigger.hud.init');
        html += display.http.render(details, opened[0], args.newData);
        html += display.host.render(details, opened[1], args.newData);
        html += display.ajax.render(details, opened[2], args.newData);
        elements.opener().append('<div class="glimpse-hud">' + html + '</div>');
        state.setup();
        display.host.postRender();
        display.ajax.postRender();
        pubsub.publish('trigger.hud.ready');
    }, state = (function () {
        return {
            setup: function () {
                var inputs = elements.opener().find('.glimpse-hud-section-input').change(function () {
                    var state = [];
                    inputs.each(function () {
                        state.push(this.checked);
                    });
                    util.localStorage('glimpseHudDisplay', state);
                });
            },
            current: function () {
                return util.localStorage('glimpseHudDisplay') || [];
            }
        };
    })(), display = function () {
        var rendering = (function () {
            var sizes = ['extra-large', 'large', 'normal', 'small', 'extra-small'], position = ['top', 'bottom', 'left', 'right'], align = ['left', 'right'], shouldUse = function (isVisible, details) {
                if (isVisible !== undefined && isVisible) {
                    var isFunction = $.isFunction(isVisible);
                    return (isFunction && isVisible(details)) || (!isFunction && isVisible);
                }
                return true;
            }, popup = function (structure, details) {
                return '<div class="glimpse-hud-popup" style="border-color:' + structure.color + ';"><label class="glimpse-hud-title" for="glimpse-hud-section-input-' + structure.id + '"><span>' + structure.title + '</span></label><div class="glimpse-hud-popup-inner">' + structure.popup.render(details) + '</div></div><div class="glimpse-hud-popup-expander"></div>';
            }, section = function (structure, details, opened) {
                var html = '<div class="glimpse-hud-section glimpse-hud-section-' + structure.id + '" style="border-color:' + structure.color + '">';
                html += '<label class="glimpse-hud-title" for="glimpse-hud-section-input-' + structure.id + '"><span>' + structure.title + '</span></label><input type="checkbox" class="glimpse-hud-section-input" id="glimpse-hud-section-input-' + structure.id + '"' + (opened ? ' checked="checked"' : '') + ' />';
                html += '<div class="glimpse-hud-section-inner">';
                for (var key in structure.layout.mini) {
                    html += item(structure.layout.mini[key], details);
                }
                html += '</div>';
                if (!structure.popup.suppress) {
                    html += popup(structure, details);
                }
                return html + '</div>';
            }, item = function (item, details) {
                var html = '';
                if (shouldUse(item.visible, details)) {
                    var title = '<div class="glimpse-hud-header">' + item.title + '</div>', postfix = item.postfix ? '<span class="glimpse-hud-postfix">' + item.postfix + '</span>' : '', value = item.getLayoutData ? item.getLayoutData(details) : '<span class="glimpse-hud-data">' + item.getData(details) + '</span>' + postfix, id = item.id ? ' ' + item.id : '';
                    html += item.getLayout ? item.getLayout(details) : '<div class="glimpse-hud-detail glimpse-hud-detail-' + sizes[item.size] + ' glimpse-hud-detail-position-' + position[item.position] + ' glimpse-hud-detail-align-' + align[item.align] + id + '" title="' + item.description + '">' + (item.position % 2 == 0 ? title : '') + '<div class="glimpse-hud-value">' + value + '</div>' + (item.position % 2 == 1 ? title : '') + '</div>';
                }
                return html;
            };
            return {
                section: section,
                item: item,
                popup: popup
            };
        })(), process = (function () {
            var item = function (layout, defaults) {
                for (var key in layout) {
                    layout[key] = $.extend(true, {}, defaults[key], layout[key]);
                }
            };
            return {
                init: function (payload) {
                    item(payload.layout.mini, payload.defaults);
                    item(payload.layout.popup, payload.defaults);
                }
            };
        })();
        return {
            http: function () {
                var timingsRaw = (window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {}).timing, structure = {
                    title: 'HTTP',
                    id: 'http',
                    color: '#e2875e',
                    popup: {
                        render: function (details) {
                            var requestDetails = details.request.data, html = '<div class="glimpse-hud-popup-header">Browser Request</div>';
                            html += '<div><div class="glimpse-hud-summary-left">' + rendering.item(structure.layout.popup.request, details) + '</div>';
                            html += '<table class="glimpse-hud-summary glimpse-hud-summary-right"><tr><td width="1" class="glimpse-hud-listing-overflow">' + rendering.item(structure.layout.popup.host, details) + '</td></tr><tr><td class="glimpse-hud-listing-overflow">' + rendering.item(structure.layout.popup.principal, details) + '</td></tr></table></div>';
                            html += '<div class="glimpse-hud-popup-clear"></div>';
                            html += '<div class="glimpse-data-request-parts"><table><tr><td colspan="3"><div class="glimpse-hud-bar glimpse-hud-tooltips-non"><div><div class="glimpse-hud-bar-item" style="width: 100%;background-color: ' + requestDetails.browser.categoryColor + '"></div><div class="glimpse-hud-bar-item" style="width: ' + requestDetails.server.percentage + '%;background-color: ' + requestDetails.server.categoryColor + ';"></div><div class="glimpse-hud-bar-item" style="width: ' + requestDetails.network.percentage + '%;background-color: ' + requestDetails.network.categoryColor + ';"></div></div></div></td></tr><tr><td class="glimpse-data-wire-part">' + rendering.item(structure.layout.popup.wire, details) + '</td><td class="glimpse-data-server-part">' + rendering.item(structure.layout.popup.server, details) + '</td><td class="glimpse-data-client-part">' + rendering.item(structure.layout.popup.client, details) + '</td></tr></table></div>';
                            return html;
                        }
                    },
                    defaults: {
                        request: { title: 'Request', description: 'Total request time from click to dom ready', visible: true, size: 1, position: 0, align: 0, postfix: 'ms', getData: function (details) {
                            return details.request.data.total.duration;
                        } },
                        wire: { title: 'Wire', description: 'Total time on the network', visible: true, size: 2, position: 0, align: 0, postfix: 'ms', getData: function (details) {
                            return details.request.data.network.duration;
                        } },
                        server: { title: 'Server', description: 'Total time on the server', visible: true, size: 2, position: 0, align: 0, postfix: 'ms', getData: function (details) {
                            return details.request.data.server.duration;
                        } },
                        client: { title: 'Client', description: 'Total time once client kicks in to dom ready', visible: true, size: 2, position: 0, align: 0, postfix: 'ms', getData: function (details) {
                            return details.request.data.browser.duration;
                        } },
                        host: { title: 'Host', description: 'Server that responded to the request', visible: true, size: 2, position: 1, align: 1, postfix: '', getLayoutData: function (details) {
                            return '<div class="glimpse-hud-listing-overflow" style="max-width:170px;">' + details.environment.data.serverName + '</div>';
                        } },
                        principal: { title: 'Principal', description: 'Principal that is currently logged in for this session', visible: function (details) {
                            return details.environment.data.user;
                        }, size: 2, position: 1, align: 1, postfix: '', getLayoutData: function (details) {
                            return '<div class="glimpse-hud-listing-overflow" style="max-width:120px;">' + details.environment.data.user + '</div>';
                        } }
                    },
                    layout: {
                        mini: {
                            request: {},
                            wire: {},
                            server: {},
                            client: {}
                        },
                        popup: {
                            request: { title: 'Total Request Time', size: 0, position: 1, align: 1 },
                            wire: { position: 1, align: 1 },
                            server: { position: 1, align: 1 },
                            client: { position: 1, align: 1 },
                            host: {},
                            principal: {}
                        }
                    }
                }, processTimings = function (details) {
                    var result = {}, networkPre = calculateTimings('navigationStart', 'requestStart'), networkPost = calculateTimings('responseStart', 'responseEnd'), network = networkPre + networkPost, server = calculateTimings('requestStart', 'responseStart'), browser = calculateTimings('responseEnd', 'loadEventEnd'), total = network + server + browser;
                    result.networkSending = { categoryColor: '#FDBF45', duration: networkPre, percentage: (networkPre / total) * 100 };
                    result.networkReceiving = { categoryColor: '#FDBF45', duration: networkPost, percentage: (networkPost / total) * 100 };
                    result.network = { categoryColor: '#FDBF45', duration: network, percentage: (network / total) * 100 };
                    result.server = { categoryColor: '#AF78DD', duration: server, percentage: (server / total) * 100 };
                    result.browser = { categoryColor: '#72A3E4', duration: browser, percentage: (browser / total) * 100 };
                    result.total = { categoryColor: '#10E309', duration: network + server + browser, percentage: 100 };
                    details.request = { data: result, name: 'Request' };
                }, calculateTimings = function (startIndex, finishIndex) {
                    return timingsRaw[finishIndex] - timingsRaw[startIndex];
                }, render = function (details, opened) {
                    var html = '';
                    if (timingsRaw) {
                        process.init(structure);
                        processTimings(details);
                        html = rendering.section(structure, details, opened);
                    }
                    return html;
                };
                return {
                    render: render
                };
            }(),
            host: function () {
                var structure = {
                    title: 'Host',
                    id: 'host',
                    color: '#6161e0',
                    popup: {
                        render: function (details) {
                            var hasTrivial = false, html = '<div class="glimpse-hud-popup-header">Server Side</div>';
                            html += '<div><div style="position: absolute; right: 0; margin-right: 16px;">' + rendering.item(structure.layout.popup.time, details) + '</div><table class="glimpse-hud-summary glimpse-hud-summary-space glimpse-hud-summary-left"><tr><th>' + (rendering.item(structure.layout.popup.action, details) || rendering.item(structure.layout.popup.loading, details)) + '</th></tr><tr><td>' + (rendering.item(structure.layout.popup.controller, details) || rendering.item(structure.layout.popup.viewStateSize, details)) + '</td></tr></table>';
                            html += '<table class="glimpse-hud-summary glimpse-hud-summary-space glimpse-hud-summary-right"><tr><td width="1">' + (rendering.item(structure.layout.popup.view, details) || rendering.item(structure.layout.popup.rendering, details)) + '</td>' + (details.sql ? '<td width="60"></td><td>' + rendering.item(structure.layout.popup.queries, details) + '</td>' : '') + '</tr><tr><td>' + rendering.item(structure.layout.popup.server, details) + '</td>' + (details.sql ? '<td></td><td>' + rendering.item(structure.layout.popup.connections, details) + '</td>' : '') + '</tr></table></div>';
                            html += '<div class="glimpse-hud-popup-clear"></div>';
                            html += '<table class="glimpse-hud-listing" style="table-layout:fixed;"><thead><tr><th></th><th class="glimpse-hud-listing-value glimpse-data-childless-duration">duration (ms)</th><th class="glimpse-hud-listing-value glimpse-data-childless-start-point">from start (ms)</th></tr></thead>';
                            for (var i = 0; i < details.timings.data.length; i++) {
                                var item = details.timings.data[i], isTrivial = item.childlessDuration < 2;
                                if (!item.suppress) {
                                    var maxLength = (16 + (details.sql ? 10 : 0)) - item.nesting * 2;
                                    html += '<tbody' + (isTrivial ? ' class="glimpse-data-trivial"' : '') + '>';
                                    html += '<tr' + (isTrivial ? ' class="glimpse-hud-quite"' : '') + '><td class="glimpse-hud-listing-overflow" style="padding-left:' + (item.nesting * 15) + 'px;" ' + (item.description.length > maxLength ? 'title="' + item.description + '"' : '') + '>' + item.description + '</td><td class="glimpse-hud-listing-value glimpse-data-childless-duration">' + item.childlessDuration + '</td><td class="glimpse-hud-listing-value glimpse-data-childless-start-point"><span class="glimpse-hud-prefix">+</span>' + item.startPoint + '</td></tr>';
                                    if (item.queries && item.queries.listing.length > 0) {
                                        html += '<tr><td class="glimpse-data-query-summary" style="padding-left:' + ((item.nesting * 15) + 20) + 'px;"><span class="glimpse-hud-prefix">➥</span><span class="glimpse-hud-listing-value">' + item.queries.listing.length + '</span><span class="glimpse-hud-postfix">' + (item.queries.listing.length == 1 ? 'query' : 'queries') + '</span> <span class="glimpse-hud-listing-value">' + item.queries.durationSum.toFixed(2) + '</span><span class="glimpse-hud-postfix">ms</span></td><td></td><td></td></tr>';
                                    }
                                    html += '</tbody>';
                                    if (isTrivial) {
                                        hasTrivial = true;
                                    }
                                }
                            }
                            html += '</table>';
                            if (hasTrivial) {
                                html += '<div class="glimpse-hud-controls"><span class="glimpse-control-trivial">Show Trivial</span><span class="glimpse-control-trivial" style="display:none">Hide Trivial</span></div>';
                            }
                            return html;
                        }
                    },
                    defaults: {
                        server: { title: 'Server Time', description: 'Total time on the server', visible: function (details) {
                            return details.request;
                        }, size: 1, position: 1, align: 1, postfix: 'ms', getData: function (details) {
                            return details.request.data.server.duration;
                        } },
                        action: { title: 'Action', description: 'How long root Action took to execute', visible: function (details) {
                            return details.mvc && details.mvc.data && details.mvc.data.actionExecutionTime != null;
                        }, size: 1, position: 0, align: 0, postfix: 'ms', getData: function (details) {
                            return parseInt(details.mvc.data.actionExecutionTime);
                        } },
                        view: { title: 'View', description: 'How long root View took to render', visible: function (details) {
                            return details.mvc && details.mvc.data && details.mvc.data.viewRenderTime != null;
                        }, size: 1, position: 0, align: 0, postfix: 'ms', getData: function (details) {
                            return parseInt(details.mvc.data.viewRenderTime);
                        } },
                        controller: { title: 'Controller/Action', description: 'Name of the root Controller and Action', visible: function (details) {
                            return details.mvc && details.mvc.data;
                        }, size: 2, position: 0, align: 0, postfix: 'ms', getLayoutData: function (details) {
                            return '<span class="glimpse-hud-data">' + details.mvc.data.controllerName + '</span><span class="glimpse-hud-plain">.</span><span class="glimpse-hud-data">' + details.mvc.data.actionName + '</span><span class="glimpse-hud-plain">(...)</span>';
                        } },
                        queries: { title: 'DB Queries', description: 'Total query duration and number of all SQL queries', visible: function (details) {
                            return details.sql && details.sql.data;
                        }, size: 1, position: 0, align: 0, getLayoutData: function (details) {
                            return '<span class="glimpse-hud-data">' + parseInt(details.sql.data.queryExecutionTime) + '</span><span class="glimpse-hud-postfix">ms</span><span class="glimpse-hud-spacer">/</span><span class="glimpse-hud-data">' + details.sql.data.queryCount + '</span>';
                        } },
                        connections: { title: 'DB Connections', description: 'Total connection open time and number of all SQL connections used', visible: function (details) {
                            return details.sql && details.sql.data;
                        }, size: 1, position: 1, align: 1, getLayoutData: function (details) {
                            return '<span class="glimpse-hud-data">' + parseInt(details.sql.data.connectionOpenTime) + '</span><span class="glimpse-hud-postfix">ms</span><span class="glimpse-hud-spacer">/</span><span class="glimpse-hud-data">' + details.sql.data.connectionCount + '</span>';
                        } },
                        time: { title: 'Server Time', description: 'Time on the server', visible: function (details) {
                            return details.environment && details.environment.data;
                        }, size: 4, position: 2, align: 1, getLayoutData: function (details) {
                            var diff = parseInt((new Date(details.environment.data.serverTime + ' ' + details.environment.data.serverTimezoneOffset) - new Date()) / 1000 / 60 / 60);
                            return '<span class="glimpse-hud-data">' + details.environment.data.serverTime + '</span> <span class="glimpse-hud-prefix">GMT</span><span class="glimpse-hud-data">' + details.environment.data.serverTimezoneOffset + '</span> ' + (details.environment.data.serverDaylightSavingTime ? ' <span class="glimpse-hud-plain">(</span><span class="glimpse-hud-data">w/DLS</span><span class="glimpse-hud-plain">)</span>' : '') + (diff ? '<span class="glimpse-hud-spacer"> </span><span title="Time difference between server and client"><span class="glimpse-hud-prefix">Δ</span><span class="glimpse-hud-data glimpse-hud-data-important">' + (diff > 0 ? '+' : '') + diff + '</span></span>' : '');
                        } },
                        viewStateSize: { title: 'ViewState', description: 'Size of your page ViewState', visible: function (details) {
                            return details.webforms && details.webforms.data;
                        }, size: 1, position: 0, align: 0, postfix: 'bytes', getData: function (details) {
                            var viewstate;
                            return (viewstate = $('#__VIEWSTATE').val()) ? viewstate.length : 0;
                        } },
                        loading: { title: 'Load', description: 'Time between Begin PreLoad and End LoadComplete', visible: function (details) {
                            return details.webforms && details.webforms.data && details.webforms.data.loadingTime != null;
                        }, size: 1, position: 0, align: 0, postfix: 'ms', getData: function (details) {
                            return parseInt(details.webforms.data.loadingTime);
                        } },
                        rendering: { title: 'Render', description: 'Time between Begin PreRender and End Render (including SaveState events)', visible: function (details) {
                            return details.webforms && details.webforms.data && details.webforms.data.renderingTime != null;
                        }, size: 1, position: 0, align: 0, postfix: 'ms', getData: function (details) {
                            return parseInt(details.webforms.data.renderingTime);
                        } },
                    },
                    layout: {
                        mini: {
                            action: {},
                            view: {},
                            controller: {},
                            loading: {},
                            rendering: {},
                            viewStateSize: {},
                            queries: {}
                        },
                        popup: {
                            server: {},
                            action: { title: 'Total Action Time', position: 1, align: 1, size: 0 },
                            view: { title: 'Render View', position: 1, align: 1 },
                            controller: { position: 1, align: 1 },
                            queries: { position: 1, align: 1 },
                            connections: {},
                            time: {},
                            viewStateSize: { title: 'ViewState Size', position: 1, align: 1, size: 2 },
                            loading: { title: 'Total Loading Time', position: 1, align: 1, size: 0 },
                            rendering: { title: 'Rendering Page', position: 1, align: 1 }
                        }
                    }
                }, processEvents = function (details, payload) {
                    var eventStack = [], lastEvent = { startPoint: 0, duration: 0, childlessDuration: 0, endPoint: 0 }, lastControllerEvent = {}, rootDuration = details.request ? details.request.data.server.duration : 1, rootChildlessDuration = rootDuration;
                    processEventsWebforms(details, payload);
                    for (var i = 0; i < details.timings.data.length; i += 1) {
                        var event = details.timings.data[i], topEvent = eventStack.length > 0 ? eventStack[eventStack.length - 1] : null, left = (event.startPoint / rootDuration) * 100, width = (event.duration / rootDuration) * 100, stackParsed = false;
                        event.endPoint = parseFloat((event.startPoint + event.duration).toFixed(2));
                        if (event.category == "Controller" || event.category == "Request" || event.category == "Webforms") {
                            lastControllerEvent = event;
                            lastControllerEvent.queries = { durationSum: 0, listing: [] };
                        }
                        else if (event.category == "Command" && lastControllerEvent.queries) {
                            lastControllerEvent.queries.listing.push(event);
                            lastControllerEvent.queries.durationSum += event.duration;
                            event.suppress = true;
                        }
                        while (!stackParsed) {
                            if (event.startPoint > lastEvent.startPoint && event.endPoint <= lastEvent.endPoint) {
                                eventStack.push(lastEvent);
                                stackParsed = true;
                            }
                            else if (topEvent != null && topEvent.endPoint < event.endPoint) {
                                eventStack.pop();
                                topEvent = eventStack.length > 0 ? eventStack[eventStack.length - 1] : null;
                                stackParsed = false;
                            }
                            else
                                stackParsed = true;
                        }
                        var temp = eventStack.length > 0 ? eventStack[eventStack.length - 1] : undefined;
                        if (temp) {
                            temp.childlessDuration = parseFloat((temp.childlessDuration - event.duration).toFixed(2));
                        }
                        if (eventStack.length == 0)
                            rootChildlessDuration -= event.duration;
                        event.childlessDuration = event.duration;
                        event.startPercent = left;
                        event.endPercent = left + width;
                        event.widthPercent = width;
                        event.nesting = eventStack.length + 1;
                        event.description = event.title;
                        lastEvent = event;
                    }
                    details.timings.data.unshift({
                        description: 'Request: ' + (window.location.pathname + window.location.search),
                        title: (window.location.pathname + window.location.search),
                        startTime: 'NOT SURE',
                        duration: rootDuration,
                        startPoint: '0.0',
                        category: 'Request',
                        childlessDuration: Math.round(rootChildlessDuration * 10) / 10,
                        startPercent: 0,
                        endPercent: 100,
                        widthPercent: 100,
                        nesting: 0
                    });
                }, processEventsWebforms = function (details, payload) {
                    if (payload.data.glimpse_webforms_execution) {
                        var executionData = payload.data.glimpse_webforms_execution.data, timelineData = details.timings.data;
                        for (var i = 0; i < executionData.length; i++) {
                            var executionItem = executionData[i];
                            timelineData.push({ title: executionItem.event, startTime: 'NOT SURE', duration: executionItem.duration, startPoint: executionItem.fromFirst, category: 'Webforms' });
                        }
                        timelineData.sort(function (a, b) {
                            return parseFloat(a.startPoint) - parseFloat(b.startPoint);
                        });
                    }
                }, render = function (details, opened, payload) {
                    var html = '';
                    if ((details.mvc && details.mvc.data) || (details.webforms && details.webforms.data)) {
                        process.init(structure);
                        processEvents(details, payload);
                        html = rendering.section(structure, details, opened);
                    }
                    return html;
                }, postRender = function () {
                    $('.glimpse-hud .glimpse-control-trivial').click(function () {
                        $('.glimpse-hud .glimpse-control-trivial, .glimpse-hud .glimpse-data-trivial').toggle();
                    });
                };
                return {
                    render: render,
                    postRender: postRender
                };
            }(),
            ajax: function () {
                var count = 0, summaryStack = [], detailStack = [], structure = {
                    title: 'Ajax',
                    id: 'ajax',
                    color: '#559fdf',
                    popup: {
                        suppress: true,
                        render: function (details) {
                            var html = '<div class="glimpse-hud-popup-header">Ajax Requests</div>';
                            html += '<div>' + rendering.item(structure.layout.popup.requests, details) + '</div>';
                            html += '<div class="glimpse-hud-popup-clear"></div>';
                            html += '<table style="table-layout:fixed;" class="glimpse-hud-listing glimpse-data-ajax-detail"><thead><tr><th class="glimpse-data-content-method"></th><th></th><th class="glimpse-hud-listing-value glimpse-data-duration">duration (ms)</th><th class="glimpse-hud-listing-value glimpse-data-size">size (kb)</th></tr></thead>';
                            html += '</table>';
                            return html;
                        }
                    },
                    defaults: {
                        requests: { title: 'Count', id: 'glimpse-data-ajax-count', description: 'Total Ajax requests detected on this page', visible: true, size: 1, position: 0, align: 0, getData: function (details) {
                            return 0;
                        } }
                    },
                    layout: {
                        mini: {
                            requests: {}
                        },
                        popup: {
                            requests: { title: 'Total Ajax Requests', size: 0, position: 1, align: 1 }
                        }
                    }
                }, processContentType = function (type) {
                    return type ? type.substring(0, type.indexOf(';')) : '';
                }, render = function (details, opened) {
                    process.init(structure);
                    return rendering.section(structure, details, opened);
                }, update = function (method, uri, duration, size, status, statusText, time, contentType, requestId) {
                    if (count == 0) {
                        var section = $('.glimpse-hud-section-ajax');
                        section.find('.glimpse-hud-section-inner').append('<div class="glimpse-hud-detail glimpse-hud-detail-small glimpse-hud-listing glimpse-data-ajax-summary"></div>');
                        section.append(rendering.popup(structure, {}));
                        section.find('.glimpse-data-ajax-detail tbody .glimpse-ajax-link').live('click', function () {
                            pubsub.publish('trigger.shell.open', {});
                            pubsub.publish('trigger.tab.select.ajax', { key: 'ajax' });
                            pubsub.publish('trigger.data.context.switch', { requestId: $(this).attr('data-requestId'), type: 'ajax' });
                        });
                    }
                    var counter = $('.glimpse-data-ajax-count .glimpse-hud-data').text(++count).addClass('glimpse-hud-value-update');
                    setTimeout(function () {
                        counter.removeClass('glimpse-hud-value-update');
                    }, 2000);
                    var rowClass = (status == 304 ? ' glimpse-hud-quite' : !(status >= 200 && status < 300) ? ' glimpse-hud-error' : '');
                    uri = util.htmlEncode(uri);
                    var clickableUri = uri;
                    if (requestId) {
                        clickableUri = '<a href="javascript:void(0)" class="glimpse-ajax-link" data-requestId="' + requestId + '">' + uri + '</a>';
                    }
                    recordItem('<div class="glimpse-hud-listing-row glimpse-hud-value' + rowClass + '"><div class="glimpse-hud-data glimpse-hud-quite glimpse-data-ajax-method">' + method + '</div><div class="glimpse-hud-data glimpse-hud-listing-overflow glimpse-data-ajax-uri" title="' + uri + '">' + uri + '</div><div class="glimpse-data-ajax-duration"><span class="glimpse-hud-data">' + duration + '</span><span class="glimpse-hud-postfix">ms</span></div></div>', '.glimpse-hud-section-ajax .glimpse-data-ajax-summary', summaryStack, 2);
                    recordItem('<tbody class="' + rowClass + '"><tr><td class="glimpse-hud-listing-overflow" title="' + uri + '" colspan="2">' + clickableUri + '</td><td class="glimpse-hud-listing-value glimpse-data-duration">' + duration + '</td><td class="glimpse-hud-listing-value glimpse-data-size">' + (Math.round((size / 1024) * 10) / 10) + '</td></tr><tr><td class="glimpse-hud-quite glimpse-data-content-method">' + method + '</td><td class="glimpse-hud-quite glimpse-hud-listing-overflow">' + status + ' - ' + statusText + '</td><td class="glimpse-hud-quite glimpse-data-content-type glimpse-hud-listing-overflow" title="' + contentType + '">' + processContentType(contentType) + '</td><td class="glimpse-hud-quite glimpse-data-content-time">' + time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1") + '</td></tr></tbody>', '.glimpse-hud-section-ajax .glimpse-data-ajax-detail', detailStack, 6);
                }, recordItem = function (html, selector, stack, length) {
                    var row = $(html).prependTo(selector);
                    setTimeout(function () {
                        row.addClass('added');
                    }, 1);
                    if (stack.length >= length)
                        stack.shift().remove();
                    stack.push(row);
                }, postRender = function () {
                    var open = XMLHttpRequest.prototype.open;
                    XMLHttpRequest.prototype.open = function (method, uri) {
                        if (util.isLocalUri(uri) && uri.indexOf('Glimpse.axd') == -1) {
                            var startTime = new Date().getTime();
                            this.addEventListener("readystatechange", function () {
                                if (this.readyState == 4 && this.getResponseHeader("Glimpse-RequestID")) {
                                    update(method, uri, new Date().getTime() - startTime, this.getResponseHeader("Content-Length"), this.status, this.statusText, new Date(), this.getResponseHeader("Content-Type"), this.getResponseHeader("Glimpse-RequestID"));
                                }
                            }, false);
                        }
                        open.apply(this, arguments);
                    };
                };
                return {
                    render: render,
                    postRender: postRender
                };
            }()
        };
    }();
    pubsub.subscribe('action.template.processing', modify);
    pubsub.subscribe('action.data.initial.changed', function (args) {
        $(window).load(function () {
            setTimeout(function () {
                loaded(args);
            }, 0);
        });
    });
})(jQueryGlimpse, glimpse.pubsub, glimpse.data, glimpse.elements, glimpse.util);
