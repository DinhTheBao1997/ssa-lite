class StringUtils {
    /**
     * @param {string} str
     * @param {string | RegExp} check
     * @returns {boolean}
     */
    static isMatch(str, check) {
        if (!check || !str) return false;
        if (typeof check !== "string" && typeof check !== "object") {
            throw new Error("Type does not support.");
        }
        if (typeof str !== "string") {
            str = str.toString();
        }
        const regex = typeof check === "string" ? new RegExp(check) : check;
        return str.match(regex) ? true : false;
    }
    /**
     * @param {string} str
     * @returns {boolean}
     */
    static isEmpty(str) {
        return str === null || str === undefined || str === "";
    }
    /**
     * @param {string} str
     * @returns {boolean}
     */
    static isBlank(str) {
        if (StringUtils.isEmpty(str)) return true;
        if (typeof str === "string") return str.trim() === 0;
        return false;
    }

    /**
     * @param {string} str
     * @returns {string}
     */
    static camelize(str) {
        return str
            .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (word, index) {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            })
            .replace(/[^a-zA-Z]/g, "");
    }
}
