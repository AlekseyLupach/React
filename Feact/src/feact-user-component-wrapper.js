import FeactDOMComponent from "./feact-dom-component.js";

export default class FeactUserComponentWrapper {
    constructor(element) {
        this._element = element;
    }

    receiveComponent(nextElement) {
        const prevElement = this._element;

        this.updateComponent(prevElement, nextElement);
    }

    updateComponent(prevElement, nextElement) {
        this._rendering = true;

        const nextProps = nextElement.props;
        const inst = this._instance;

        let shouldUpdate = true;

        const nextState = this._processPendingState();

        if (inst.shouldComponentUpdate) {
            shouldUpdate = inst.shouldComponentUpdate(nextProps, nextState);
        }

        if (shouldUpdate) {
            this._performComponentUpdate(nextElement, nextProps, nextState);

            this._rendering = false;

            return;
        }

        inst.props = nextProps;
        inst.state = nextState;

        this._rendering = false;
    }

    _processPendingState() {
        const inst = this._instance;

        if (!this._pendingPartialState) {
            return inst.state;
        }
        const nextState = this._pendingPartialState.reduce((result, current) => {

            if (typeof current === 'function') {
                return { ...result, ...current(result) };
            }

            return { ...result, ...current };
        }, inst.state)

        this._pendingPartialState = null;

        return nextState;
    }

    _performComponentUpdate(nextElement, nextProps, nextState) {
        this._element = nextElement;

        const inst = this._instance;

        inst.props = nextProps;
        inst.state = nextState;

        this._updateRenderedComponent();
    }

    _updateRenderedComponent() {
        const prevComponentInstance = this._renderedComponent;

        const inst = this._instance;

        const nextRenderedElement = inst.render();

        FeactReconciler.receiveComponent(prevComponentInstance, nextRenderedElement)
    }

    mountComponent(container) {
        const Component = this._element.type;

        // создаем физически наш компонент и передаем ему пропрсы в конструктор
        const componentInstance = new Component(this._element.props);

        this._instance = componentInstance;

        componentInstance._feactInternalInstance = this;

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

    performUpdateIfNecessary() {
        this.updateComponent(this._element, this._element);
    }
}
// обьект который вызывает метод mountComponent переданного компонента
export const FeactReconciler = {
    mountComponent(internalInstance, container) {
        return internalInstance.mountComponent(container);
    },

    receiveComponent(internalInstance, nextElement) {
        internalInstance.receiveComponent(nextElement);
    },

    performUpdateIfNecessary(internalInstance) {
        internalInstance.performUpdateIfNecessary();
    },
}

// получаем обьект компонента нужного типа
function instantiateFeactComponent(element) {
    if (typeof element.type === "string") {
        return new FeactDOMComponent(element);
    }
    return new FeactUserComponentWrapper(element);
}