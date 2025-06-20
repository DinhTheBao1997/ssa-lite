class AComponent {
    /** @type {HTMLElement} */ elementRef;
    /** @type {string} */ selector;
    /** @type {string} */ htmlTemplate;

    getHtmlTemplate() {
        return this.htmlTemplate;
    }

    onInit() {}

    onAfterViewInit() {}
}