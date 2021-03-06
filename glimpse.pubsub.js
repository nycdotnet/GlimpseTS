glimpse.pubsub = (function () {
    var debug = {
        level: 0,
        logCaller: function (subscriber, message, data, level) {
        },
        logPublish: function (message, data, level) {
        }
    }, messages = {}, lastUid = -1, throwException = function (ex) {
        return function () {
            throw ex;
        };
    }, callSubscriber = function (subscriber, message, data) {
        try {
            debug.logCaller(subscriber, message, data, debug.level);
            subscriber(data, message);
        }
        catch (ex) {
            setTimeout(throwException(ex), 0);
        }
    }, deliverMessage = function (originalMessage, matchedMessage, data) {
        var subscribers = messages[matchedMessage], i, j;
        if (!messages.hasOwnProperty(matchedMessage)) {
            return;
        }
        for (i = 0, j = subscribers.length; i < j; i++) {
            callSubscriber(subscribers[i].func, originalMessage, data);
        }
    }, createDeliveryFunction = function (message, data) {
        return function () {
            var topic = String(message), position = topic.lastIndexOf('.');
            deliverMessage(message, message, data);
            while (position !== -1) {
                topic = topic.substr(0, position);
                position = topic.lastIndexOf('.');
                deliverMessage(message, topic, data);
            }
            debug.level--;
        };
    }, messageHasSubscribers = function (message) {
        var topic = String(message), found = messages.hasOwnProperty(topic), position = topic.lastIndexOf('.');
        while (!found && position !== -1) {
            topic = topic.substr(0, position);
            position = topic.lastIndexOf('.');
            found = messages.hasOwnProperty(topic);
        }
        return found;
    }, publish = function (message, data, sync) {
        var deliver = createDeliveryFunction(message, data), hasSubscribers = messageHasSubscribers(message);
        debug.logPublish(message, data, debug.level);
        if (!hasSubscribers) {
            return false;
        }
        debug.level++;
        if (sync === true) {
            deliver();
        }
        else {
            setTimeout(deliver, 0);
        }
        return true;
    };
    return {
        _debug: debug,
        publishAsync: function (message, data) {
            return publish(message, data, false);
        },
        publish: function (message, data) {
            return publish(message, data, true);
        },
        subscribe: function (message, func, _unshift) {
            if (!messages.hasOwnProperty(message)) {
                messages[message] = [];
            }
            var token = String(++lastUid), method = _unshift ? 'unshift' : 'push';
            messages[message][method]({ token: token, func: func });
            return token;
        },
        unsubscribe: function (tokenOrFunction) {
            var isToken = typeof tokenOrFunction === 'string', key = isToken ? 'token' : 'func', succesfulReturnValue = isToken ? tokenOrFunction : true, result = false, m, i;
            for (m in messages) {
                if (messages.hasOwnProperty(m)) {
                    for (i = messages[m].length - 1; i >= 0; i--) {
                        if (messages[m][i][key] === tokenOrFunction) {
                            messages[m].splice(i, 1);
                            result = succesfulReturnValue;
                            if (isToken) {
                                return result;
                            }
                        }
                    }
                }
            }
            return result;
        }
    };
})();
