const RenderRegExpConstant = {
    getVariableInTemplate: /{{(\w|_|-|\.)+}}/g,
    getVariable: /(\w|_|-|\.)+/g,
    inputAttribute: /\[(\w|_|-)+\]/g,
    outputAttribute: /\((\w|_|-)+\)/g,
}