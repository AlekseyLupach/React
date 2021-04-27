import FeactUserComponentWrapper, { FeactReconciler } from './feact-user-component-wrapper.js';
import TopLevelWrapper from './top-level-wrapper.js';

function FeactComponent() { }

FeactComponent.prototype.setState = function (partialState) {
    const internalInstance = this._feactInternalInstance;

    internalInstance._pendingPartialState =
        internalInstance._pendingPartialState || [];

    internalInstance._pendingPartialState.push(partialState);

    if (internalInstance._rendering) {
        FeactReconciler.performUpdateIfNecessary(internalInstance);
    }

    FeactReconciler.performUpdateIfNecessary(internalInstance);
};

function mixSpecIntoComponent(Constructor, spec) {
    const proto = Constructor.prototype;

    for (const key in spec) {
        proto[key] = spec[key];
    }
}

const Feact = {
    createClass(spec) {
        // создали конструктор компонента для пропсов
        function Constructor(props) {
            this.props = props;

            const initialState = this.getInitialState ? this.getInitialState() : null;

            this.state = initialState;
        }
        //добавляем все метор компонента в конструктор
        Constructor.prototype = new FeactComponent();

        mixSpecIntoComponent(Constructor, spec);

        return Constructor;
    },

    createElement(type, props, children) {
        const element = {
            type,
            props: props || {}
        };

        if (children) {
            element.props.children = children;
        }
        return element;
    },

    render(element, container) {
        const prevComponent = getTopLevelComponentContainer(container)

        if (prevComponent) {
            return updateRootComponent(prevComponent, element);
        }

        const wrapperElement = this.createElement(TopLevelWrapper, element);

        const componentInstance = new FeactUserComponentWrapper(wrapperElement);

        const markUp = FeactReconciler.mountComponent(componentInstance, container);

        container.__feactComponentInstance = componentInstance._renderedComponent;

        return markUp;
    }
}

function getTopLevelComponentContainer(container) {
    return container.__feactComponentInstance;
}

function updateRootComponent(prevComponent, nextElement) {
    FeactReconciler.receiveComponent(prevComponent, nextElement);
}

export default Feact;