class EventEmitter {
    /** @type {Function[]} */ #subscriptions;

    constructor() {
        this.#subscriptions = [];
    }

    subscribe(subscription) {
        if (typeof subscription !== "function") return;
        this.#subscriptions.push(subscription);
    }

    next(...agrs) {
        for (const subscription of this.#subscriptions) {
            subscription.apply(null, agrs);
        }
    }

    complete() {
        while(this.#subscriptions.length !== 0) {
            this.#subscriptions.pop();
        }
    }
}