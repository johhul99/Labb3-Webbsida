(function () {
    console.log("Running unload preventer...");

    const blockedEvents = ["unload", "beforeunload", "pagehide"];
    const originalAddEventListener = EventTarget.prototype.addEventListener;

    EventTarget.prototype.addEventListener = function (type, listener, options) {
        if (blockedEvents.includes(type)) {
            return;
        }
        return originalAddEventListener.call(this, type, listener, options);
    };

    Object.defineProperty(window, "Xo", {
        configurable: false,
        get: function () {
            return {
                sendDisconnectBeacon: function () {
                    console.log("sendDisconnectBeacon() is permanently disabled!");
                }
            };
        },
        set: function () {
            console.log("Attempt to modify Xo blocked!");
        }
    });

    Object.freeze(EventTarget.prototype.addEventListener);

    console.log("Unload prevention active and locked!");
})();





