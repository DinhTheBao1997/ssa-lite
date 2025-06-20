class ComponentRenderer {
    /** @type {Injector} */ injector;

    constructor(injector) {
        this.injector = injector;
    }

    /**
     * @param {typeof AComponent} ComponentRef
     * @param {HTMLElement} elementRef
     * @param {AComponent} parent
     * @returns {AComponent}
     */
    render(ComponentRef, elementRef, parent = null) {
        if (typeof ComponentRef !== "function") {
            throw new Error(
                "ComponentRenderer doesn't support type: " + typeof ComponentRef
            );
        }
        const component = this.instantiateComponent(ComponentRef, elementRef);
        // call onInit
        Utilities.callFunction(component, LifeCycleHooks.onInit);

        // get input, output attribute
        const eventBindingAttribute = this.getEventAttributes(component);
        this.setInputValue(component, parent, eventBindingAttribute);
        this.setOutputSubscribe(component, parent, eventBindingAttribute);

        // Create html element
        component.elementRef.innerHTML = this.#getHtmlTemplate(component);

        // Call function afterViewInit
        Utilities.callFunction(component, LifeCycleHooks.onAfterViewInit);
        return component;
    }

    #injectInjection(component) {
        if (this.injector === null || this.injector === undefined) return;
        const keys = this.injector.keys;
        for (const key of keys) {
            component[key] = this.injector.getInjection(key);
        }
    }

    /**
     * @param {AComponent} component
     */
    #getHtmlTemplate(component) {
        let htmlTemplate = component.htmlTemplate;
        const array = htmlTemplate.match(
            RenderRegExpConstant.getVariableInTemplate
        );
        if (!array) return htmlTemplate;
        const variables = Array.from(array)
            .map((v) => {
                const match = v.match(RenderRegExpConstant.getVariable);
                return !match ? null : match[0];
            })
            .filter((x) => x);
        for (const variable of variables) {
            console.log(component[variable]);
            htmlTemplate = htmlTemplate.replace(
                new RegExp(`{{${variable}}}`, "g"),
                component[variable] || ""
            );
            console.log(htmlTemplate);
        }
        return htmlTemplate;
    }

    /**
     * @param {typeof AComponent} ComponentRef
     * @param {HTMLElement} elementRef
     * @returns {AComponent}
     */
    instantiateComponent(ComponentRef, elementRef) {
        const component = new ComponentRef();
        component.elementRef = elementRef;
        this.#injectInjection(component);
        return component;
    }

    /**
     * @param {AComponent} component
     * @returns {EventBindingAttribute}
     */
    getEventAttributes(component) {
        const eventBindingAttribute = new EventBindingAttribute(component.elementRef);
        eventBindingAttribute.getEventBindingAttribute()
        return eventBindingAttribute;
    }

    /**
     * @param {AComponent} component
     * @param {AComponent} parent
     * @param {EventBindingAttribute} eventBindingAttribute
     * @return {void}
     */
    setInputValue(component, parent, eventBindingAttribute) {
        const inputs = eventBindingAttribute.inputs;
        for (const input of inputs) {
            const name = eventBindingAttribute.getVariableName(input);
            const value = eventBindingAttribute.getInputValue(input, parent);
            if (typeof name !== "string") continue;
            component[name] = value;
        }
    }

    /**
     * @param {AComponent} component
     * @param {AComponent} parent
     * @param {EventBindingAttribute} eventBindingAttribute
     * @return {void}
     */
    setOutputSubscribe(component, parent, eventBindingAttribute) {
        if (parent === null || typeof parent !== "object") return;
        const outputs = eventBindingAttribute.outputs;
        for (const output of outputs) {
            const evenEmiterName = eventBindingAttribute.getEvenEmiterName(output);
            const callback = eventBindingAttribute.getOutputListener(output);
            const parameters = eventBindingAttribute.getParameters(output);
            /** @type {EventEmitter} */ const evenEmiter = component[evenEmiterName];
            if (evenEmiter === null || typeof evenEmiter !== "object") continue;
            if (typeof evenEmiter.subscribe !== "function") continue;
            /** @type {Function} */ const method = parent[callback];
            if (typeof method !== "function") continue;
            evenEmiter.subscribe(x => {
                const args = [];
                for (const param of parameters) {
                    if (param.indexOf("$") === 0) {
                        args.push(x);
                    } else {
                        args.push(parent[param]);
                    }
                }
                method.apply(parent, args)
            })
        }
    }
}