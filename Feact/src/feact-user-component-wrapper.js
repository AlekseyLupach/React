import FeactDOMComponent from "./feact-dom-component.js";

export default class FeactUserComponentWrapper {
    constructor(element) {
        this._element = element;
    }

    mountComponent(container) {
        const Component = this._element.type;

        // создаем физически наш компонент и передаем ему пропрсы в конструктор
        const componentInstance = new Component(this._element.props);

        this._instance = componentInstance;

        const markup = this.performInitialMount(container);

        if (componentInstance.componentDidMount) {
            componentInstance.componentDidMount();
        }

        return markup;
    }

    performInitialMount(container) {
        const renderElement = this._instance.render();

        const child = instantiateFeactComponent(renderElement);

        this._renderedComponent = child;

        return FeactReconciler.mountComponent(child, container);
    }
}
// обьект который вызывает метод mountComponent переданного компонента
export const FeactReconciler = {
    mountComponent(internalInstance, container) {
        return internalInstance.mountComponent(container);
    }
}

// получаем обьект компонента нужного типа
function instantiateFeactComponent(element) {
    if (typeof element.type === "string") {
        return new FeactDOMComponent(element);
    }
    return new FeactUserComponentWrapper(element);
}