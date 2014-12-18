(function ($, pubsub, settings, data, elements, util) {
    var wireListeners = function () {
        elements.holder().find('.glimpse-popout').click(function () {
            pubsub.publish('trigger.shell.popup');
        });
    }, dataLoaded = function (args) {
        var uri = args.metadata.resources.glimpse_popup;
        if (uri) {
            elements.barHolder().find('.glimpse-popout').removeClass('glimpse-hidden');
            tryOpenPopup();
        }
        if (settings.local('popupOn')) {
            $(window).unload(windowUnloading);
        }
    }, registerSuppressedOpen = function () {
        registerSuppressedOpen = true;
    }, generatePopupAddress = function () {
        var currentMetadata = data.currentMetadata();
        return util.uriTemplate(currentMetadata.resources.glimpse_popup, { 'requestId': data.currentData().requestId, 'hash': currentMetadata.hash });
    }, isPopup = function () {
        return window.location.href.indexOf('n=glimpse_popup') > -1;
    }, openPopup = function () {
        settings.local('popupOn', true);
        settings.local('popupKeep', true);
        window.open(generatePopupAddress(), 'GlimpsePopup', 'width=1100,height=600,status=no,toolbar=no,menubar=no,location=no,resizable=yes,scrollbars=yes');
        pubsub.publish('trigger.shell.hide');
    }, tryOpenPopup = function () {
        if (settings.local('popupOn')) {
            if (!isPopup()) {
                pubsub.publish('trigger.shell.popup');
            }
            else {
                pubsub.publish('trigger.shell.open', { isInitial: true, force: true, fullScreen: true });
                settings.local('popupKeep', false);
            }
        }
    }, windowUnloading = function () {
        if (isPopup() && !settings.local('popupKeep'))
            settings.local('popupOn', false);
    }, terminate = function () {
        if (!isPopup()) {
            settings.local('popupOn', false);
            settings.local('popupKeep', false);
        }
    }, loaded = function () {
        if (isPopup())
            elements.root().removeClass('glimpse-inline').addClass('glimpse-fullscreen');
    };
    pubsub.subscribe('trigger.shell.popup', openPopup);
    pubsub.subscribe('trigger.shell.subscriptions', wireListeners);
    pubsub.subscribe('action.shell.loaded', loaded);
    pubsub.subscribe('action.shell.closed', terminate);
    pubsub.subscribe('action.shell.opening', terminate);
    pubsub.subscribe('action.data.initial.changed', dataLoaded);
    pubsub.subscribe('trigger.shell.suppressed.open', registerSuppressedOpen);
})(jQueryGlimpse, glimpse.pubsub, glimpse.settings, glimpse.data, glimpse.elements, glimpse.util);
