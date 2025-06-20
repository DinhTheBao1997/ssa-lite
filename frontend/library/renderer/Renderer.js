class Renderer {
    /** @type {Injector} */ #injector;

    constructor(injector) {
        this.#injector = injector;
    }

    /**
     * @param {typeof AComponent} ComponentRef 
     * @param {HTMLElement} elementRef 
     * @returns {AComponent}
     */
    render(ComponentRef, elementRef) {
        const componentRenderer = new ComponentRenderer(this.#injector)
        return componentRenderer.render(ComponentRef, elementRef);
    }

    /**
     * @param {typeof AComponent} ComponentRef 
     * @param {HTMLElement} elementRef 
     * @param {AComponent} rootComponent 
     * @returns {AComponent}
     */
    renderChild(ComponentRef, elementRef, rootComponent) {
        const componentRenderer = new ComponentRenderer(this.#injector)
        return componentRenderer.render(ComponentRef, elementRef, rootComponent);
    }
}