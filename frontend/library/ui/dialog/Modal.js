class Modal extends AComponent {
    /** @type {string} */ htmlTemplate = `
    <div class="modal fade show" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" ssa-click="test($event)" data-bs-dismiss="modal">Close</button>
                    <ssa-button [title]="Save changes" ></ssa-button>
                </div>
            </div>
        </div>
    </div>
    `;
    /** @type {string} */ selector = "ssa-modal";
    /** @type {HTMLElement} */ elementRef;

    show() {
        const elementRef = DomUtils.convertStringToDOM(this.htmlTemplate);
        this.elementRef = elementRef;
        document.body.appendChild(elementRef);
    }
}