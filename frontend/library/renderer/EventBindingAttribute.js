class EventBindingAttribute {
    /** @type {Attr[]} */ inputs;
    /** @type {Attr[]} */ outputs;
    /** @type {HTMLElement} */ elementRef;
    constructor(elementRef) {
        this.inputs = [];
        this.outputs = [];
        this.elementRef = elementRef;
    }

    getEventBindingAttribute() {
        const attributes = this.elementRef.attributes;
        for (const attr of attributes) {
            const name = attr.name;
            if (StringUtils.isMatch(name, RenderRegExpConstant.inputAttribute)) {
                this.inputs.push(attr);
            } else if (StringUtils.isMatch(name, RenderRegExpConstant.outputAttribute)) {
                this.outputs.push(attr);
            }
        }
    }

    /**
     * @param {Attr} attr 
     */
    getVariableName(attr) {
        const name = attr.name;
        if (!StringUtils.isMatch(name, RenderRegExpConstant.getVariable)) {
            return null;
        }
        const str = name.match(RenderRegExpConstant.getVariable)[0];
        return StringUtils.camelize(str);
    }

    /**
     * @param {Attr} attr 
     */
    getEvenEmiterName(attr) {
        const name = this.getVariableName(attr);
        const evenEmiterName = `on${name[0].toUpperCase()}${name.substring(1)}`;
        return evenEmiterName;
    }

    /**
     * @param {Attr} attr 
     * @param {AComponent} parent
     * @returns {string | null}
     */
    getInputValue(attr, parent) {
        const value = attr.value;
        if (Utilities.hasOwnProperty(parent, value)) return parent[value];
        const length = value.length;
        if (value.charAt(0) === "'" && value.charAt(length - 1) === "'") return value.substring(1, length - 1);
        return value;
    }

    /**
     * @param {Attr} attr 
     * @returns {string | null}
     */
    getOutputListener(attr) {
        const value = attr.value;
        if (StringUtils.isBlank(value)) return null;
        const match = value.match(/\w+/g);
        if (!match) return null;
        return match[0];
    }

    /**
     * @param {Attr} attr 
     * @returns {string | null}
     */
    getParameters(attr) {
        const value = attr.value;
        if (StringUtils.isBlank(value)) return null;
        const listener = this.getOutputListener(attr);
        const argsString = value.replace(listener, "");
        const match = argsString.match(/(\$even)|([\w]+)/g);
        return match;
    }
}