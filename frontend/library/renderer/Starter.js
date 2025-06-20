class Starter {
    /** @type {Injector} */ #injector;
    /** @type {AComponent} */ rootComponentRef;
    /** @type {AComponent[]} */ childComponentRefs;
    /** @type {Renderer} */ render;
    constructor() {
        this.childComponentRefs = [];
        this.#injector = new Injector();
        this.render = new Renderer(this.#injector);
    }

    addInjector(name, InjectionRef, ...args) {
        this.#injector.create(name, InjectionRef, ...args);
    }

    setRootComponentRef(rootComponentRef) {
        this.rootComponentRef = rootComponentRef;
    }

    setChildComponentRefs(childComponentRefs) {
        this.childComponentRefs = childComponentRefs;
    }

    start(rootElement = document) {
        const root = this.#renderRootComponent(rootElement) ;
        this.#renderChildComponent(root);
    }

    /**
     * @param {typeof AComponent} ComponentRef 
     * @param {HTMLElement} parentElementRef 
     * @returns {NodeListOf<Element>}
     */
    getElementRefs(ComponentRef, parentElementRef) {
        const instance = new ComponentRef();
        return parentElementRef.querySelectorAll(instance.selector);
    }

    /**
     * @param {HTMLElement} rootElement 
     * @returns {AComponent}
     */
    #renderRootComponent(rootElement) {
        const rootElementRefs = this.getElementRefs(this.rootComponentRef, rootElement);
        return this.render.render(this.rootComponentRef, rootElementRefs[0]);
    }

    /**
     * @param {AComponent} root 
     * @returns {void}
     */
    #renderChildComponent(root) {
        for (const childComponentRef of this.childComponentRefs) {
            const elementRefs = this.getElementRefs(childComponentRef, root.elementRef);
            for (const elementRef of elementRefs) {
                this.render.renderChild(childComponentRef, elementRef, root);
            }
        }
    }
}