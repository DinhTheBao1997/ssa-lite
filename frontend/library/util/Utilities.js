class Utilities {
    static callFunction(instance, method, ...agrs) {
        if (instance === null || instance === undefined || typeof method !== "string") {
            return;
        }
        const func = instance[method];
        if (typeof func !== "function") {
            return;
        }
        func.apply(instance, agrs);
    }
}