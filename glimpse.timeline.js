(function ($, pubsub, settings, util, renderEngine) {
    var timeline = {};
    timeline.elements = (function () {
        var elements = {}, find = function () {
            elements.scope = timeline.scope;
            elements.contentRow = elements.scope.find('.glimpse-tl-row-content');
            elements.summaryRow = elements.scope.find('.glimpse-tl-row-summary');
            elements.resizer = elements.contentRow.find('.glimpse-tl-resizer');
            elements.contentBandScroller = elements.contentRow.find('.glimpse-tl-content-scroll');
            elements.contentBandHolder = elements.contentRow.find('.glimpse-tl-band-group');
            elements.contentEventHolder = elements.contentRow.find('.glimpse-tl-event-group');
            elements.contentDescHolder = elements.contentRow.find('.glimpse-tl-event-desc-group');
            elements.contentTableHolder = elements.contentRow.find('.glimpse-tl-table-holder');
            elements.summaryBandHolder = elements.summaryRow.find('.glimpse-tl-band-group');
            elements.summaryEventHolder = elements.summaryRow.find('.glimpse-tl-event-group');
            elements.summaryDescHolder = elements.summaryRow.find('.glimpse-tl-event-desc-group');
            elements.eventInfo = elements.scope.find('.glimpse-tl-event-info');
            elements.zoomHolder = elements.summaryRow.find('.glimpse-tl-resizer-holder');
            elements.zoomLeftHandle = elements.summaryRow.find('.glimpse-tl-resizer:first-child');
            elements.zoomRightHandle = elements.summaryRow.find('.glimpse-tl-resizer:last-child');
            elements.zoomLeftPadding = elements.summaryRow.find('.glimpse-tl-padding:first-child');
            elements.zoomRightPadding = elements.summaryRow.find('.glimpse-tl-padding:last-child');
            elements.contentDividerHolder = elements.contentRow.find('.glimpse-tl-divider-line-holder');
            elements.summaryDividerHolder = elements.summaryRow.find('.glimpse-tl-divider-line-holder');
        };
        pubsub.subscribe('action.timeline.shell.loaded', find);
        return elements;
    })();
    (function () {
        var templates = {
            html: '<div class="glimpse-timeline"><div class="glimpse-tl-row-summary"><div class="glimpse-tl-content-scroll"><div class="glimpse-tl-event-desc-holder glimpse-tl-col-side"><div class="glimpse-tl-band glimpse-tl-band-title">Categories<span>[Switch view]</span></div><div class="glimpse-tl-event-desc-group"></div></div><div class="glimpse-tl-band-holder glimpse-tl-col-main"><div class="glimpse-tl-band glimpse-tl-band-title"></div><div class="glimpse-tl-band-group"></div></div><div class="glimpse-tl-event-holder glimpse-tl-col-main"><div class="glimpse-tl-band glimpse-tl-band-title"></div><div class="glimpse-tl-event-group"></div></div></div><div class="glimpse-tl-padding-holder glimpse-tl-col-main"><div class="glimpse-tl-padding glimpse-tl-padding-l glimpse-tl-summary-height"></div><div class="glimpse-tl-padding glimpse-tl-padding-r glimpse-tl-summary-height"></div></div><div class="glimpse-tl-divider-holder glimpse-tl-col-main"><div class="glimpse-tl-divider-title-bar"></div><div class="glimpse-tl-divider-line-holder"></div></div><div class="glimpse-tl-resizer-holder glimpse-tl-col-main"><div class="glimpse-tl-resizer glimpse-tl-resizer-l glimpse-tl-summary-height"><div class="glimpse-tl-resizer-bar"></div><div class="glimpse-tl-resizer-handle"></div></div><div class="glimpse-tl-resizer glimpse-tl-resizer-r glimpse-tl-summary-height"><div class="glimpse-tl-resizer-bar"></div><div class="glimpse-tl-resizer-handle"></div></div></div></div><div class="glimpse-tl-row-spacer"></div><div class="glimpse-tl-row-content"><div class="glimpse-tl-content-scroll"><div class="glimpse-tl-band-holder glimpse-tl-col-main"><div class="glimpse-tl-band glimpse-tl-band-title"></div><div class="glimpse-tl-band-group"></div></div><div class="glimpse-tl-divider-holder glimpse-tl-col-main"><div class="glimpse-tl-divider-zero-holder"><div class="glimpse-tl-divider"></div></div><div class="glimpse-tl-divider-line-holder"></div></div><div class="glimpse-tl-event-holder glimpse-tl-col-main"><div class="glimpse-tl-event-holder-inner"><div class="glimpse-tl-band glimpse-tl-band-title"></div><div class="glimpse-tl-event-group"></div></div></div><div class="glimpse-tl-event-desc-holder glimpse-tl-col-side"><div class="glimpse-tl-band glimpse-tl-band-title">Events</div><div class="glimpse-tl-event-desc-group"></div></div></div><div class="glimpse-tl-content-overlay"><div class="glimpse-tl-divider-holder glimpse-tl-col-main"><div class="glimpse-tl-divider-title-bar"></div><div class="glimpse-tl-divider-zero-holder"><div class="glimpse-tl-divider"><div>0</div></div></div><div class="glimpse-tl-divider-line-holder"></div></div></div><div class="glimpse-tl-resizer"><div></div></div><div class="glimpse-tl-content-scroll" style="display:none"><div class="glimpse-tl-table-holder"></div></div></div><div class="glimpse-tl-event-info"></div></div>'
        }, setup = function () {
            pubsub.publish('action.timeline.template.processing', { templates: templates });
            pubsub.publish('action.timeline.shell.loading');
            timeline.scope.html(templates.html);
            pubsub.publish('action.timeline.shell.loaded');
            pubsub.publish('action.timeline.template.processed', { templates: templates });
        };
        pubsub.subscribe('trigger.timeline.shell.init', setup);
    })();
    (function (elements) {
        var wireListeners = function () {
            $(window).resize(function () {
                render({});
            });
        }, render = function (args) {
            renderDiverders(elements.summaryDividerHolder, { startTime: 0, endTime: timeline.data.duration }, args.force);
            renderDiverders(elements.contentDividerHolder, { startTime: timeline.data.startTime, endTime: timeline.data.endTime }, args.force);
            adjustHeight();
        }, renderDiverders = function (scope, range, force) {
            var x;
            for (x = 0; x < scope.length; x += 1) {
                var holder = $(scope[x]), dividerCount = Math.round(holder.width() / 64), currentDividerCount = holder.find('.glimpse-tl-divider').length;
                if (!force && currentDividerCount === dividerCount) {
                    return;
                }
                var leftOffset = 100 / dividerCount, timeSlice = (range.endTime - range.startTime) / dividerCount, divider = holder.find('.glimpse-tl-divider:first-child');
                for (var i = 0; i < dividerCount; i += 1) {
                    if (divider.length == 0) {
                        divider = $('<div class="glimpse-tl-divider"><div></div></div>');
                        holder.append(divider);
                    }
                    divider.css('left', (leftOffset * (i + 1)) + '%');
                    var time = i == (dividerCount - 1) ? range.endTime : (timeSlice * (i + 1)) + range.startTime;
                    divider.find('div').text(util.timeConvert(parseFloat(time)));
                    divider = divider.next();
                }
                while (divider.length == 1) {
                    var nextDivider = divider.next();
                    divider.remove();
                    divider = nextDivider;
                }
            }
        }, adjustHeight = function () {
            var innerHeight = Math.max(elements.contentBandScroller.height(), elements.contentBandScroller.find('.glimpse-tl-band-holder').height());
            elements.contentBandScroller.find('.glimpse-tl-divider-holder').height(innerHeight);
            elements.summaryRow.find('.glimpse-tl-summary-height').height(elements.summaryRow.height());
        };
        pubsub.subscribe('trigger.timeline.shell.subscriptions', wireListeners);
        pubsub.subscribe('trigger.timeline.divider.render', render);
        pubsub.subscribe('trigger.timeline.filtered', adjustHeight);
    })(timeline.elements);
    (function (elements) {
        var wireListeners = function () {
            elements.summaryDescHolder.delegate('.glimpse-tl-band', 'mouseenter', function () {
                if ($(this).has('input:checked').length > 0) {
                    $(this).find('input').stop(true, true).clearQueue().fadeIn();
                }
            }).delegate('.glimpse-tl-band', 'mouseleave', function () {
                if ($(this).has('input:checked').length > 0) {
                    $(this).find('input').stop(true, true).clearQueue().fadeOut();
                }
            }).delegate('input', 'click', function () {
                categoryEvents($(this));
            });
        }, render = function () {
            pubsub.publish('action.timeline.event.rendering');
            processCategories();
            processEvents();
            processEventSummary();
            processTableData();
            pubsub.publish('action.timeline.event.rendered');
        }, processTableData = function () {
            var dataResult = [['Title', 'Description', 'Category', 'Timing', 'Start Point', 'Duration', 'w/out Children']], metadata = { layout: [[{ data: '{{0}} |({{1}})|' }, { data: 2, width: '18%' }, { data: 3, width: '9%' }, { data: 4, align: 'right', pre: 'T+ ', post: ' ms', className: 'mono', width: '100px' }, { data: 5, align: 'right', post: ' ms', className: 'mono', width: '100px' }, { data: 6, align: 'right', post: ' ms', className: 'mono', width: '100px' }]] };
            for (var i = 0; i < timeline.data.events.length; i++) {
                var event = timeline.data.events[i], data = [event.title, event.subText, event.category, '', event.startPoint, event.duration, event.childlessDuration];
                dataResult.push(data);
            }
            var result = renderEngine.build(dataResult, metadata);
            elements.contentTableHolder.append(result);
            pubsub.publish('trigger.panel.render.style', { scope: elements.contentTableHolder });
            elements.contentTableHolder.find('.glimpse-row > tr').each(function (i) {
                var row = $(this), event = timeline.data.events[i], category = timeline.data.category[event.category];
                row.find('> td:first-child').prepend($('<div class="glimpse-tl-event"></div>').css({ 'backgroundColor': category.eventColor, marginLeft: (15 * event.nesting) + 'px' }));
                row.find('> td:nth-child(3)').css('position', 'relative').prepend($('<div class="glimpse-tl-event"></div>').css({ 'backgroundColor': category.eventColor, 'margin-left': event.startPersent + '%', width: event.widthPersent + '%' }));
            });
        }, processCategories = function () {
            for (var categoryName in timeline.data.category) {
                var category = timeline.data.category[categoryName];
                elements.summaryDescHolder.append('<div class="glimpse-tl-band glimpse-tl-category-selected"><input type="checkbox" value="' + categoryName + '" checked="checked" /><div class="glimpse-tl-event" style="background-color:' + category.eventColor + ';"></div>' + categoryName + '</div>');
                elements.summaryBandHolder.append('<div class="glimpse-tl-band"></div>');
                category.holder = $('<div class="glimpse-tl-band"></div>').appendTo(elements.summaryEventHolder);
                category.events = {};
            }
        }, processEvents = function () {
            var eventStack = [], lastEvent = { startPoint: 0, duration: 0, childlessDuration: 0, endPoint: 0 };
            for (var i = 0; i < timeline.data.events.length; i += 1) {
                var event = timeline.data.events[i], topEvent = eventStack.length > 0 ? eventStack[eventStack.length - 1] : null, category = timeline.data.category[event.category], left = (event.startPoint / timeline.data.duration) * 100, rLeft = Math.round(left), actualWidth = (event.duration / timeline.data.duration) * 100, width = actualWidth == 0 ? 0 : actualWidth, rWidth = Math.round(width), widthStyle = (width > 0 ? 'width:' + width + '%' : ''), maxStyle = (width <= 0 ? 'max-width:6px;' : ''), subTextPre = (event.subText ? '(' + event.subText + ')' : ''), subText = (subTextPre ? '<span class="glimpse-tl-event-desc-sub">' + subTextPre + '</span>' : ''), stackParsed = false;
                event.endPoint = parseFloat((event.startPoint + event.duration).toFixed(2));
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
                event.childlessDuration = event.duration;
                event.startPersent = left;
                event.endPersent = left + width;
                event.widthPersent = width;
                event.nesting = eventStack.length;
                var eventDecoration = '';
                if (width >= 0)
                    eventDecoration = '<div class="glimpse-tl-event-overlay-lh"><div class="glimpse-tl-event-overlay-li"></div><div class="glimpse-tl-event-overlay-lt">' + event.startPoint + ' ms</div></div>';
                if (width > 0)
                    eventDecoration += '<div class="glimpse-tl-event-overlay-rh"><div class="glimpse-tl-event-overlay-ri"></div><div class="glimpse-tl-event-overlay-rt">' + event.endPoint + ' ms</div></div><div class="glimpse-tl-event-overlay-c">' + (width < 3.5 ? '...' : (event.duration + ' ms')) + '</div>';
                eventDecoration = '<div class="glimpse-tl-event-overlay" style="left:' + left + '%;' + widthStyle + maxStyle + '" data-timelineItemIndex="' + i + '">' + eventDecoration + '</div>';
                elements.contentBandHolder.append('<div class="glimpse-tl-band"></div>');
                elements.contentEventHolder.append('<div class="glimpse-tl-band"><div class="glimpse-tl-event" style="background-color:' + category.eventColor + ';left:' + left + '%;' + widthStyle + maxStyle + '"></div>' + eventDecoration + '</div>');
                elements.contentDescHolder.append('<div class="glimpse-tl-band" title="' + event.title + ' ' + subTextPre + '"><div class="glimpse-tl-event" style="background-color:' + category.eventColor + ';"></div>' + event.title + subText + '</div>');
                deriveEventSummary(category, left, rLeft, width, rWidth);
                lastEvent = event;
            }
        }, deriveEventSummary = function (category, left, rLeft, width, rWidth) {
            for (var j = rLeft; j <= (rLeft + rWidth); ++j) {
                var data = category.events[j], right = left + width;
                if (data) {
                    data.left = Math.min(left, data.left);
                    data.right = Math.max(right, data.right);
                }
                else
                    category.events[j] = { left: left, right: right };
            }
        }, processEventSummary = function () {
            var addCategoryEvent = function (category, start, finish) {
                var width = (finish - start), widthStyle = (width > 0 ? 'width:' + width + '%' : ''), maxStyle = (width <= 0 ? 'max-width:6px;' : '');
                category.holder.append('<div class="glimpse-tl-event" style="background-color:' + category.eventColor + ';left:' + start + '%;' + widthStyle + maxStyle + '"></div>');
            };
            for (var categoryName in timeline.data.category) {
                var category = timeline.data.category[categoryName], events = category.events, startData = null, next = 0;
                for (var currentPoint in events) {
                    var current = parseInt(currentPoint);
                    if (!startData) {
                        startData = events[currentPoint];
                        next = current + 1;
                    }
                    else if (current != next) {
                        addCategoryEvent(category, startData.left, events[next - 1].right);
                        startData = events[currentPoint];
                        next = current + 1;
                    }
                    else
                        next++;
                }
                if (startData) {
                    addCategoryEvent(category, startData.left, events[next - 1].right);
                }
            }
        }, colorRows = function (args) {
            var filter = args.applyAll ? '' : ':visible';
            colorElement(elements.contentBandHolder.find('> div'), filter, 'glimpse-row-');
            colorElement(elements.contentDescHolder.find('> div'), filter, 'glimpse-row-alt-');
            colorElement(elements.summaryBandHolder.find('> div'), filter, 'glimpse-row-');
            colorElement(elements.summaryDescHolder.find('> div'), filter, 'glimpse-row-alt-');
        }, colorElement = function (scope, filter, baseClass) {
            var odd = baseClass + 'odd', even = baseClass + 'even';
            scope.removeClass(odd).removeClass(even);
            scope.filter(filter + ':even').addClass(odd);
            scope.filter(filter + ':odd').addClass(even);
        }, categoryEvents = function (item) {
            var isChecked = item[0].checked, parent = item.parent();
            parent.animate({ 'opacity': (isChecked ? 0.95 : 0.6) }, 200);
            elements.summaryEventHolder.find('.glimpse-tl-band').eq(parent.index()).animate({ 'opacity': (isChecked ? 1 : 0.7) }, 200);
            pubsub.publish('trigger.timeline.search.category');
        };
        pubsub.subscribe('trigger.timeline.shell.subscriptions', wireListeners);
        pubsub.subscribe('trigger.timeline.event.render', render);
        pubsub.subscribe('trigger.timeline.filtered', colorRows);
        pubsub.subscribe('action.timeline.shell.switched', colorRows);
    })(timeline.elements), (function (elements) {
        var positionLeft = function () {
            var persentLeft = (elements.zoomLeftHandle.position().left / elements.zoomHolder.width()) * 100, persentRight = (elements.zoomRightPadding.width() / elements.zoomHolder.width()) * 100;
            elements.zoomLeftHandle.css('left', persentLeft + '%');
            elements.zoomLeftPadding.css('width', persentLeft + '%');
            timeline.data.startTime = timeline.data.duration * (persentLeft / 100);
            pubsub.publish('trigger.timeline.divider.render', { force: true });
            zoomEvents(persentLeft, persentRight);
            toggleZeroLine(persentLeft == 0);
            pubsub.publish('trigger.timeline.search.zoom', { persentLeft: persentLeft, persentRight: persentRight });
        }, positionRight = function () {
            var persentRight = ((elements.zoomHolder.width() - 4 - elements.zoomRightHandle.position().left) / elements.zoomHolder.width()) * 100, persentLeft = (elements.zoomLeftPadding.width() / elements.zoomHolder.width()) * 100;
            elements.zoomRightHandle.css('right', persentRight + '%');
            elements.zoomRightPadding.css('width', persentRight + '%');
            timeline.data.endTime = timeline.data.duration - (timeline.data.duration * (persentRight / 100));
            pubsub.publish('trigger.timeline.divider.render', { force: true });
            zoomEvents(persentLeft, persentRight);
            pubsub.publish('trigger.timeline.search.zoom', { persentLeft: persentLeft, persentRight: persentRight });
        }, zoomEvents = function (persentLeft, persentRight) {
            var offset = (100 / (100 - persentLeft - persentRight)) * -1, lOffset = offset * persentLeft, rOffset = offset * persentRight;
            elements.contentRow.find('.glimpse-tl-event-holder-inner').css({ left: lOffset + '%', right: rOffset + '%' });
        }, toggleZeroLine = function (show) {
            elements.contentRow.find('.glimpse-tl-divider-zero-holder').toggle(show);
            elements.contentRow.find('.glimpse-tl-divider-line-holder').css('left', (show ? '15' : '0') + 'px');
            elements.contentRow.find('.glimpse-tl-event-holder').css('marginLeft', (show ? '15' : '0') + 'px');
        }, wireListeners = function () {
            jQueryGlimpse.draggable({
                handelScope: elements.zoomLeftHandle,
                opacityScope: elements.zoomLeftHandle,
                resizeScope: elements.zoomLeftHandle,
                valueStyle: 'left',
                isUpDown: false,
                offset: 1,
                min: 0,
                max: function () {
                    return (elements.zoomRightHandle.position().left - 20);
                },
                dragging: function () {
                    elements.zoomLeftHandle.css('left', (elements.zoomLeftHandle.position().left) + 'px');
                },
                dragged: function () {
                    positionLeft();
                }
            });
            jQueryGlimpse.draggable({
                handelScope: elements.zoomRightHandle,
                opacityScope: elements.zoomRightHandle,
                resizeScope: elements.zoomRightHandle,
                valueStyle: 'right',
                isUpDown: false,
                min: 0,
                max: function () {
                    return (elements.zoomHolder.width() - elements.zoomLeftHandle.position().left) - 20;
                },
                dragging: function () {
                    elements.zoomRightHandle.css('right', (elements.zoomHolder.width() - elements.zoomRightHandle.position().left) + 'px');
                },
                dragged: function () {
                    positionRight();
                }
            });
        };
        pubsub.subscribe('trigger.timeline.shell.subscriptions', wireListeners);
    })(timeline.elements);
    (function (elements) {
        var criteria = {
            persentLeft: 0,
            persentRightFromLeft: 100,
            hiddenCategories: null
        }, search = function (c) {
            pubsub.publish('trigger.timeline.filtering', { criteria: c });
            for (var i = 0; i < timeline.data.events.length; i += 1) {
                var event = timeline.data.events[i], show = !(c.persentLeft > event.endPersent || c.persentRightFromLeft < event.startPersent) && (c.hiddenCategories == null || c.hiddenCategories[event.category] == true);
                elements.contentBandHolder.find('.glimpse-tl-band').eq(i).toggle(show);
                elements.contentEventHolder.find('.glimpse-tl-band').eq(i).toggle(show);
                elements.contentDescHolder.find('.glimpse-tl-band').eq(i).toggle(show);
                elements.contentTableHolder.find('tbody').eq(i).toggle(show);
            }
            pubsub.publish('trigger.timeline.filtered', { criteria: c });
        }, zoom = function (args) {
            criteria.persentLeft = args.persentLeft;
            criteria.persentRightFromLeft = 100 - args.persentRight;
            search(criteria);
        }, category = function () {
            var hiddenCategoriesObj = {}, hiddenCategories = elements.summaryDescHolder.find('input:checked').map(function () {
                return $(this).val();
            }).get();
            for (var i = 0; i < hiddenCategories.length; i++)
                hiddenCategoriesObj[hiddenCategories[i]] = true;
            criteria.hiddenCategories = hiddenCategoriesObj;
            search(criteria);
        };
        pubsub.subscribe('trigger.timeline.search.zoom', zoom);
        pubsub.subscribe('trigger.timeline.search.category', category);
    })(timeline.elements);
    (function (elements) {
        var wireListeners = function () {
            elements.scope.delegate('.glimpse-tl-event-info', 'mouseenter', function () {
                elements.eventInfo.stop(true, true).clearQueue();
            }).delegate('.glimpse-tl-event-info', 'mouseleave', function () {
                hideBubble();
            });
            elements.contentRow.delegate('.glimpse-tl-event-overlay', 'mouseenter', function () {
                showBubble($(this));
            }).delegate('.glimpse-tl-event-overlay', 'mouseleave', function () {
                hideBubble($(this));
            });
            elements.contentEventHolder.delegate('.glimpse-tl-band', 'mouseenter', function () {
                showTip($(this));
            }).delegate('.glimpse-tl-band', 'mouseleave', function () {
                hideTip($(this));
            });
        }, showTip = function (item) {
            item.find('.glimpse-tl-event-overlay').stop(true, true).fadeIn();
        }, hideTip = function (item) {
            item.find('.glimpse-tl-event-overlay').stop(true, true).fadeOut();
        }, buildBubbleDetails = function (event, category) {
            var details = '', detailKey;
            for (detailKey in event.details) {
                details += '<tr><th>' + detailKey + '</th><td>' + event.details[detailKey] + '</td></tr>';
            }
            return '<table><tr><th colspan="2"><div class="glimpse-tl-event-info-title"><div class="glimpse-tl-event" style="background-color:' + category.eventColor + ';"></div>' + event.title + ' - Details</div></th></tr><tr><th>Duration</th><td>' + event.duration + ' ms (at ' + event.startPoint + ' ms' + (+event.duration > 1 ? (' to ' + event.endPoint + ' ms') : '') + ')</td></tr>' + (event.duration != event.childlessDuration ? '<tr><th>w/out Children</th><td>' + event.childlessDuration + ' ms</td></tr>' : '') + (event.subText ? '<tr><th>Details</th><td>' + event.subText + '</td></tr>' : '') + details + '</table>';
        }, updateBubble = function (item) {
            var eventOffset = item.offset(), containerOffset = elements.eventInfo.parent().offset(), eventSize = { height: item.height(), width: item.width() }, event = timeline.data.events[item.attr('data-timelineItemIndex')], category = timeline.data.category[event.category], content = buildBubbleDetails(event, category);
            eventOffset.top -= containerOffset.top;
            eventOffset.left -= containerOffset.left;
            elements.eventInfo.html(content);
            var detailSize = { height: elements.eventInfo.height(), width: elements.eventInfo.width() }, newDetailLeft = Math.min(Math.max((eventOffset.left + ((eventSize.width - detailSize.width) / 2)) - 15, 5), $(document).width() - detailSize.width - 30), newDetailTop = eventOffset.top - detailSize.height - 20;
            elements.eventInfo.css('left', newDetailLeft + 'px');
            elements.eventInfo.css('top', newDetailTop + 'px');
        }, showBubble = function (item) {
            elements.eventInfo.stop(true, true).clearQueue().delay(500).queue(function () {
                updateBubble(item);
                elements.eventInfo.show();
            });
        }, hideBubble = function () {
            elements.eventInfo.stop(true, true).clearQueue().delay(500).fadeOut();
        };
        pubsub.subscribe('trigger.timeline.shell.subscriptions', wireListeners);
    })(timeline.elements);
    (function (elements) {
        var wireListeners = function () {
            jQueryGlimpse.draggable({
                handelScope: elements.resizer,
                opacityScope: elements.resizer,
                resizeScope: elements.resizer,
                valueStyle: 'left',
                isUpDown: false,
                offset: 1,
                min: 50,
                max: 300,
                dragged: function (options, position) {
                    columnResize(position);
                }
            });
        }, columnResize = function (position) {
            elements.scope.find('.glimpse-tl-col-side').width(position + 'px');
            elements.scope.find('.glimpse-tl-col-main').css('left', position + 'px');
            pubsub.publish('trigger.timeline.divider.render', {});
        }, panelResize = function (args) {
            if (elements.scope) {
                var panelHeight = (args && args.panelHeight) || settings.local('panelHeight'), contentHeight = panelHeight - (elements.summaryRow.height() + elements.scope.find('.glimpse-tl-row-spacer').height() + 2);
                elements.contentRow.height(contentHeight + 'px');
                pubsub.publish('trigger.timeline.divider.render', {});
            }
        };
        pubsub.subscribe('trigger.timeline.shell.subscriptions', wireListeners);
        pubsub.subscribe('trigger.shell.resize', panelResize);
        pubsub.subscribe('trigger.shell.fullScreen.resize', panelResize);
        pubsub.subscribe('action.panel.showed.glimpse_timeline', function () {
            setTimeout(panelResize, 1);
        });
    })(timeline.elements);
    (function (elements) {
        var wireListeners = function () {
            elements.summaryRow.find('.glimpse-tl-band-title span').click(function () {
                toggle();
            });
        }, apply = function (showTimeline, isFirst) {
            if (showTimeline == null)
                showTimeline = false;
            pubsub.publish('action.timeline.shell.switching', { applyAll: isFirst, showTimeline: showTimeline });
            elements.contentTableHolder.parent().toggle(showTimeline);
            elements.contentRow.find('.glimpse-tl-content-scroll:first-child').toggle(!showTimeline);
            elements.contentRow.find('.glimpse-tl-resizer').toggle(!showTimeline);
            elements.contentRow.find('.glimpse-tl-content-overlay').toggle(!showTimeline);
            if (!showTimeline) {
                pubsub.publish('trigger.timeline.divider.render', {});
            }
            pubsub.publish('action.timeline.shell.switched', { applyAll: isFirst, showTimeline: showTimeline });
        }, toggle = function () {
            var showTimeline = !(settings.local('timelineView'));
            apply(showTimeline);
            settings.local('timelineView', showTimeline);
        }, start = function () {
            apply(settings.local('timelineView'), true);
        };
        pubsub.subscribe('trigger.timeline.shell.subscriptions', wireListeners);
        pubsub.subscribe('trigger.timeline.shell.toggle', toggle);
        pubsub.subscribe('action.timeline.event.rendered', start);
    })(timeline.elements);
    (function () {
        var init = function () {
            timeline.data.startTime = 0;
            timeline.data.endTime = timeline.data.duration;
            pubsub.publish('trigger.timeline.shell.init');
            pubsub.publish('trigger.timeline.shell.subscriptions');
            pubsub.publish('trigger.timeline.event.render');
        }, modify = function (options) {
            options.templates.css += '.glimpse-panel .glimpse-tl-resizer {position: absolute;width: 4px;height: 100%;cursor: col-resize;}.glimpse-panel .glimpse-tl-row-summary {position: relative;height: 100px;}.glimpse-panel .glimpse-tl-row-summary .glimpse-tl-resizer-bar {background-color: #404040;width: 1px;height: 100%;margin-left: 2px;}.glimpse-panel .glimpse-tl-row-summary .glimpse-tl-resizer-handle {background-color: #404040;width: 5px;height: 20px;top: 0;position: absolute;-webkit-border-radius: 2px;-moz-border-radius: 2px;border-radius: 2px;}.glimpse-panel .glimpse-tl-row-spacer {background: #cfcfcf;background: -moz-linear-gradient(top, #cfcfcf 0%, #dddddd 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#cfcfcf), color-stop(100%,#dddddd));background: -webkit-linear-gradient(top, #cfcfcf 0%,#dddddd 100%);background: -o-linear-gradient(top, #cfcfcf 0%,#dddddd 100%);background: -ms-linear-gradient(top, #cfcfcf 0%,#dddddd 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#cfcfcf\', endColorstr=\'#dddddd\',GradientType=0 );background: linear-gradient(top, #cfcfcf 0%,#dddddd 100%);-webkit-box-shadow: inset 0px 1px 0px 0px #E2E2E2;-moz-box-shadow: inset 0px 1px 0px 0px #E2E2E2;box-shadow: inset 0px 1px 0px 0px #E2E2E2;border-top: 1px solid #7A7A7A;border-bottom: 1px solid #7A7A7A;height: 5px;}.glimpse-panel .glimpse-tl-col-side {position: absolute;width: 200px;height: 100%;left: 0px;}.glimpse-panel .glimpse-tl-col-main {position: absolute;left: 200px;right: 0px;top: 0px;}.glimpse-panel .glimpse-tl-row-content .glimpse-tl-col-side {border-right: 1px solid #404040;}.glimpse-panel .glimpse-tl-row-content {position: relative;height: 400px;}.glimpse-panel .glimpse-tl-row-content .glimpse-tl-resizer {left: 200px;}.glimpse-panel .glimpse-tl-row-content .glimpse-tl-resizer div {background-color: #404040;width: 1px;height: 100%;}.glimpse-panel .glimpse-tl-band {padding-top: 2px;padding-bottom: 2px;}.glimpse-panel .glimpse-tl-col-side .glimpse-tl-band {padding-top: 2px;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;padding-left: 5px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}.glimpse-panel .glimpse-tl-band {position: relative;height: 18px;padding: 0px;}.glimpse-panel .glimpse-tl-col-main .glimpse-tl-event {position: absolute;top: 4px;margin-left: -2px;}.glimpse-panel .glimpse-tl-band-title {height: 20px !important;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;font-weight: bold;padding-top: 4px;}.glimpse-panel .glimpse-tl-event {border-radius: 2px;width: 9px;height: 9px;display: inline-block;margin: 0 5px 0 2px;/*background: -moz-linear-gradient(top, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 70%, rgba(0,0,0,0.5) 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,0.7)), color-stop(40%,rgba(255,255,255,0)), color-stop(70%,rgba(255,255,255,0)), color-stop(100%,rgba(0,0,0,0.5)));background: -webkit-linear-gradient(top, rgba(255,255,255,0.7) 0%,rgba(255,255,255,0) 40%,rgba(255,255,255,0) 70%,rgba(0,0,0,0.5) 100%);background: -o-linear-gradient(top, rgba(255,255,255,0.7) 0%,rgba(255,255,255,0) 40%,rgba(255,255,255,0) 70%,rgba(0,0,0,0.5) 100%);background: -ms-linear-gradient(top, rgba(255,255,255,0.7) 0%,rgba(255,255,255,0) 40%,rgba(255,255,255,0) 70%,rgba(0,0,0,0.5) 100%);background: linear-gradient(top, rgba(255,255,255,0.7) 0%,rgba(255,255,255,0) 40%,rgba(255,255,255,0) 70%,rgba(0,0,0,0.5) 100%);*/}.glimpse-panel .glimpse-tl-col-main .glimpse-tl-event {width: 1%;min-width: 3px;}.glimpse-panel .glimpse-tl-event-info {position: absolute;top: 1px;padding: 0.75em;border: 1px solid rgba(0, 0, 0, 0.3);background-color: #FCF7BD;display: none;-webkit-border-radius: 15px;-moz-border-radius: 15px;border-radius: 15px;-webkit-box-shadow: 0px 0px 8px 0px #696969;-moz-box-shadow: 0px 0px 8px 0px #696969;box-shadow: 0px 0px 8px 0px #696969;}.glimpse-panel .glimpse-tl-event-info th, .glimpse-panel .glimpse-tl-event-info td {padding: 3px 7px;}.glimpse-panel .glimpse-tl-event-info th {font-weight: bold;text-align: right;}.glimpse-panel .glimpse-tl-event-info .glimpse-tl-event-info-title {text-align: left;border-bottom: 1px solid rgba(0, 0, 0, 0.3);padding-bottom: 6px;}.glimpse-panel .glimpse-tl-row-summary .glimpse-tl-event-holder {margin-left: 3px;}.glimpse-panel .glimpse-tl-row-content .glimpse-tl-event-holder {margin-left: 15px;}.glimpse-panel .glimpse-tl-event-holder-inner {position: absolute;left: 0px;right: 0px;margin-left: 4px;}.glimpse-panel .glimpse-tl-event-desc-sub {color: #AAA;font-size: 0.9em;margin-left: 5px;}.glimpse-panel .glimpse-tl-event-overlay {display: none;position: absolute;height: 18px;width: 7px;}.glimpse-panel .glimpse-tl-event-overlay-lh {position: absolute;left: 0;width: 1px;}.glimpse-panel .glimpse-tl-event-overlay-li {position: absolute;right: -2px;font-size: 0.8em;top: 7px;background: url() no-repeat -31px -17px;width: 11px;height: 3px;}.glimpse-panel .glimpse-tl-event-overlay-lt {position: absolute;right: 15px;font-size: 0.8em;top: 2px;color: rgba(0, 0, 0, 0.75);white-space: nowrap;}.glimpse-panel .glimpse-tl-event-overlay-rh {position: absolute;right: 0;width: 1px;}.glimpse-panel .glimpse-tl-event-overlay-ri {position: absolute;left: -4px;font-size: 0.8em;top: 7px;background: url() no-repeat -44px -17px;width: 11px;height: 3px;}.glimpse-panel .glimpse-tl-event-overlay-rt {font-size: 0.8em;position: absolute;top: 2px;left: 11px;color: rgba(0, 0, 0, 0.75);white-space: nowrap;}.glimpse-panel .glimpse-tl-event-overlay-c {font-size: 0.9em;text-align: center;padding-top: 2px;color: white;font-weight: bold;}.glimpse-panel .glimpse-tl-content-scroll {overflow-y: scroll;overflow-x: hidden;width: 100%;position: absolute;height: 100%;}.glimpse-panel .glimpse-tl-padding-holder {right: 18px;}.glimpse-panel .glimpse-tl-padding {position: absolute;width: 0;top: 0;bottom: 0;background-color: rgba(0, 0, 0, 0.3);}.glimpse-panel .glimpse-tl-padding-l {left: 0;border-left: 1px solid #555;}.glimpse-panel .glimpse-tl-padding-r {right: 0;border-right: 1px solid #555;}.glimpse-panel .glimpse-tl-divider-line-holder {position: absolute;height: 100%;top: 0;right: 0;}.glimpse-panel .glimpse-tl-divider {position: absolute;width: 1px;top: 0;bottom: 0;background-color: rgba(0, 0, 0, 0.1);}.glimpse-panel .glimpse-tl-divider div {position: absolute;top: 4px;right: 5px;font-size: 9px;color: #323232;white-space: nowrap;}.glimpse-panel .glimpse-tl-divider-title-bar {width: 100%;background-color: rgba(255, 255, 255, 0.8);border-bottom: 1px solid rgba(0, 0, 0, 0.3);height: 20px;}.glimpse-panel .glimpse-tl-divider-zero-holder {position: absolute;height: 100%;top: 0;right: 0;left: 0;}.glimpse-panel .glimpse-tl-divider-zero-holder .glimpse-tl-divider {left: 15px;}.glimpse-panel .glimpse-tl-content-scroll .glimpse-tl-divider div {display: none;}.glimpse-panel .glimpse-tl-row-summary .glimpse-tl-divider-holder {right: 19px;height: 20px;}.glimpse-panel .glimpse-tl-row-content .glimpse-tl-content-scroll .glimpse-tl-divider-holder {right: -1px;margin-left: 1px;height: 100%;}.glimpse-panel .glimpse-tl-row-content .glimpse-tl-content-overlay .glimpse-tl-divider-holder {right: 16px;height: 20px;border-left: 1px solid #404040;}.glimpse-panel .glimpse-tl-row-summary .glimpse-tl-divider-line-holder {left: 0;}.glimpse-panel .glimpse-tl-row-content .glimpse-tl-divider-line-holder {left: 15px;}.glimpse-panel .glimpse-tl-resizer-holder {right: 17px;}.glimpse-panel .glimpse-tl-resizer-l {left: 0px;margin-left: -2px;}.glimpse-panel .glimpse-tl-resizer-r {right: 0px;}.glimpse-panel .glimpse-tl-col-side {background-color: #F2F5F7;}.glimpse-panel .glimpse-tl-row-summary .glimpse-tl-band-title {opacity: 0.9;}.glimpse-panel .glimpse-tl-row-summary .glimpse-tl-event-desc-group .glimpse-tl-band {opacity: 0.95;}.glimpse-panel .glimpse-tl-row-summary .glimpse-tl-event-desc-group input {margin-right: 5px;float: right;display: none;}.glimpse-panel .glimpse-tl-band-title span {font-weight: normal;font-size: 0.8em;margin-left: 1em;cursor: pointer;}';
        }, prerender = function (args) {
            args.pluginData._data = args.pluginData.data;
            args.pluginData.data = 'Loading data, please wait...';
        }, postrender = function (args) {
            args.pluginData.data = args.pluginData._data;
            args.pluginData._data = null;
            timeline.data = args.pluginData.data;
            timeline.scope = args.panel;
            pubsub.publishAsync('trigger.timeline.init');
        };
        pubsub.subscribe('action.template.processing', modify);
        pubsub.subscribe('trigger.timeline.init', init);
        pubsub.subscribe('action.panel.rendering.glimpse_timeline', prerender);
        pubsub.subscribe('action.panel.rendered.glimpse_timeline', postrender);
    })();
})(jQueryGlimpse, glimpse.pubsub, glimpse.settings, glimpse.util, glimpse.render.engine);
