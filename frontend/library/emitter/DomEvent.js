window.onload = function(event) {
    if (typeof onloadCallback === "function") {
        onloadCallback.apply(null, [event]);
    }
}