class SampleComponent {
    /** @type {string} */ htmlTemplate = `
        <div>Hello Test</div>
    `;
    /** @type {HTMLElement} */ elementRef;
    /** @type {HTMLElement} */ selector = "test";
}

function onloadCallback() {
    const render = new ComponentRenderer();
    render.render(SampleComponent);
}