class SampleComponent {
    /** @type {string} */ htmlTemplate = `
        <div>
            Hello Sample
            <ssa-button [title]="title" (click)="onClick($even, title)"></ssa-button>
            <test></test>
        </div>
    `;
    /** @type {HTMLElement} */ elementRef;
    /** @type {TestService} */ service;
    /** @type {HTMLElement} */ selector = "sample";
    /** @type {string} */ title = "sample";

    onInit() {
        this.service.test();
    }

    onClick(...even) {
        console.log(even)
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
    starter.setChildComponentRefs([TestComponent, SSAButton]);
    starter.addInjector("service", TestService);
    starter.start();
    // DomUtils.addClass("body", "modal-open");
    // DomUtils.removeClass("body", "modal-open");
}