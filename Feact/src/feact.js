import FeactUserComponentWrapper, { FeactReconciler } from './feact-user-component-wrapper.js';
import TopLevelWrapper from './top-level-wrapper.js';

const Feact = {
    createClass(spec) {
        // создали конструктор компонента для пропсов
        function Constructor(props) {
            this.props = props;
        }
        //добавляем все метор компонента в конструктор
        Constructor.prototype = Object.assign(Constructor.prototype, spec);

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
        const wrapperElement = this.createElement(TopLevelWrapper, element);

        const componentInstance = new FeactUserComponentWrapper(wrapperElement);

        return FeactReconciler.mountComponent(componentInstance, container)
    }
}

export default Feact;