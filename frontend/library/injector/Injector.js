class Injector {
    /** @type {Map<string, any>} */ #injections;
    /** @type {Set<string>} */ #keys;

    constructor() {
        this.#keys = new Set();
        this.#injections = new Map();
    }

    get keys() {
        return Array.from(this.#keys.values());
    }

    create(name, InjectionRef, ...args) {
        if (typeof InjectionRef !== "function") return;
        const injection = new InjectionRef(...args);
        this.setInjection(name, injection);
    }

    setInjection(name, injection) {
        if (!this.#keys.has(name)) {
            this.#keys.add(name);
        }
        this.#injections.set(name, injection);
    }

    getInjection(name) {
        return this.#injections.get(name);
    }

    removeInjection(name) {
        this.#injections.delete(name);
    }
}