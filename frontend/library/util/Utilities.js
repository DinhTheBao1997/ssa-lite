class Utilities {
    /**
     * 
     * @param {Object} instance 
     * @param {string} method 
     * @param  {...any} agrs 
     * @returns 
     */
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


    static hasOwnProperty(instance, property) {
        if (instance === null || instance === undefined || typeof instance !== "object") {
            return false;
        }
        if (StringUtils.isBlank(property)) {
            return false;
        }
        return instance.hasOwnProperty(property);
    }
}