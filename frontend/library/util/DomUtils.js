class DomUtils {

    /**
     * @param {any} selector 
     * @param {string | string[]} css 
     */
    static addClass(selector, css) {
        const elements = DomUtils.getElement(selector);
        const cssList = DomUtils.getCssAsList(css) ;
        for (const element of elements) {
            for (const v of cssList) {
                if (!element.classList.contains(v)) {
                    element.classList.add(v);
                }
            }
        }
    }

    /**
     * @param {any} selector 
     * @param {string | string[]} css 
     */
    static removeClass(selector, css) {
        const elements = DomUtils.getElement(selector);
        const cssList = DomUtils.getCssAsList(css) ;
        for (const element of elements) {
            for (const v of cssList) {
                if (element.classList.contains(v)) {
                    element.classList.remove(v);
                }
            }
        }
    }

    /**
     * @param {string} html 
     * @returns  {HTMLElement}
     */
    static convertStringToDOM(html) {
        if (typeof html !== "string") {
            throw new Error("Function doesn't support type " + typeof html);
        }
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.firstElementChild;
    }

    /**
     * @param {any} selector 
     * @returns {HTMLElement[]}
     */
    static getElement(selector) {
        if (!selector) return [];
        if (typeof selector === "string") {
            return document.querySelectorAll(selector);
        }
        if (typeof selector === "object") {
            return [selector];
        }
        return [];
    }

    /**
     * @param {any} css 
     * @returns {string[]}
     */
    static getCssAsList(css) {
        if (typeof css === "string") return css.split(" ");
        if (Array.isArray(css)) return css;
        return [];
    }

    /**
     * @param {HTMLElement} elementRef 
     * @param {"click"} event 
     * @param {Function} callback 
     * @returns {void}
     */
    static addEventListener(elementRef, event, callback) {
        if (elementRef === null || typeof elementRef !== "object") return;
        if (typeof event !== "string") return;
        if (typeof callback !== "function") return;
        elementRef.addEventListener(event, callback);
    }
}