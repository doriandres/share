export const defineComponent = (componentClass) => {
    if (!customElements.get(componentClass.name)) {
        customElements.define(componentClass.name, componentClass);
    }
}