(function ($, pubsub) {
    var codeProcess = function (items) {
        $.each(items, function () {
            var item = $(this).addClass('prettyprint'), codeType = item.hasClass('glimpse-code') ? item.attr('data-codeType') : item.closest('.glimpse-code').attr('data-codeType');
            item.html(prettyPrintOne(item.html(), codeType));
        });
    }, apply = function (options) {
        options.scope.find('.glimpse-expand').click(function () {
            var toggle = $(this).toggleClass('glimpse-collapse'), hasClass = toggle.hasClass('glimpse-collapse');
            toggle.parent().next().children().first().toggle(!hasClass).next().toggle(hasClass);
        });
        options.scope.find('.info, .warn, .error, .fail, .loading, .ms').find('> td:first-child, > tr:first-child .glimpse-cell:first-child').not(':has(.icon)').prepend('<div class="icon"></div>');
        ;
        codeProcess(options.scope.find('.glimpse-code:not(:has(table)), .glimpse-code > table:not(:has(thead)) .glimpse-preview-show'));
        options.scope.find('.glimpse-start-open > td > .glimpse-expand:first-child').click();
    };
    pubsub.subscribe('trigger.panel.render.style', apply);
})(jQueryGlimpse, glimpse.pubsub);
