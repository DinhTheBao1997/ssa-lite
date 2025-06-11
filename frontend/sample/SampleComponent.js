class SampleComponent {
    /** @type {string} */ htmlTemplate = `
        <div>
            Hello Sample
            <test></test>
        </div>
    `;
    /** @type {HTMLElement} */ elementRef;
    /** @type {TestService} */ service;
    /** @type {HTMLElement} */ selector = "sample";

    onInit() {
        this.service.test();
    }
}

class TestComponent {
    /** @type {string} */ htmlTemplate = `
        <div>Hello Test</div>
    `;
    /** @type {HTMLElement} */ elementRef;
    /** @type {HTMLElement} */ selector = "test";
}
class TestService {
    constructor(text) {
        this.text = text;
    }
    test() {
        console.log("This is sample!");
    }
}

function onloadCallback() {
    const starter = new Starter();
    starter.setRootComponentRef(SampleComponent);
    starter.setChildComponentRefs([TestComponent]);
    starter.addInjector("service", TestService);
    starter.start();
}