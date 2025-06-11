class AComponent {
    /** @type {HTMLElement} */ elementRef;
    /** @type {string} */ selector;
    /** @type {string} */ htmlTemplate;
}
class ComponentRenderer {
    /** @type {Injector} */ #injector;

    constructor(injector) {
        this.#injector = injector;
    }

    /**
     * @param {typeof AComponent} ComponentRef 
     * @param {HTMLElement} parentElementRef 
     * @returns {AComponent}
     */
    render(ComponentRef, parentElementRef = document) {
        if (typeof ComponentRef !== "function") {
            throw new Error("ComponentRenderer doesn't support type: " + typeof ComponentRef);
        }
        const component = new ComponentRef();
        this.#injectInjection(component);
        Utilities.callFunction(component, LifeCycleHooks.onInit);
        const elementRef = parentElementRef.querySelector(component.selector);
        component.elementRef = elementRef;
        if (typeof component.htmlTemplate === "string") {
            component.elementRef.innerHTML = component.htmlTemplate;
        }
        Utilities.callFunction(component, LifeCycleHooks.onAfterViewInit);
        return component;
    }

    #injectInjection(component) {
        if (this.#injector === null || this.#injector === undefined) return;
        const keys = this.#injector.keys;
        for (const key of keys) {
            component[key] = this.#injector.getInjection(key);
        }
    }
}