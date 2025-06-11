class Starter {
    /** @type {Injector} */ #injector;
    /** @type {AComponent} */ rootComponentRef;
    /** @type {AComponent[]} */ childComponentRefs;
    /** @type {ComponentRenderer} */ render;
    constructor() {
        this.childComponentRefs = [];
        this.#injector = new Injector();
        this.render = new ComponentRenderer(this.#injector);
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

    start() {
        const root = this.render.render(this.rootComponentRef);
        for (const childComponentRef of this.childComponentRefs) {
            this.render.render(childComponentRef, root.elementRef);
        }
    }
}