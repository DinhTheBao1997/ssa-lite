class SSAButton extends AComponent {
    /** @type {string} */ htmlTemplate = `
        <button type="button" class="btn btn-primary">{{title}}</button>
    `;
    /** @type {string} */ selector = "ssa-button";
    /** @type {HTMLElement} */ elementRef;

    /** @type {string} */ title;
    /** @type {EventEmitter} */ onClick;

    constructor() {
        super();
        this.onClick = new EventEmitter();
    }

    onAfterViewInit() {
        DomUtils.addEventListener(this.elementRef.firstElementChild, "click", (e) => this.onClick.next(e));
    }
}