export default class FeactDOMComponent {
    constructor(element) {
        this._element = element;
    }

    mountComponent(container) {
        const domElement = document.createElement(this._element.type);

        const text = this._element.props.children;

        const textNode = document.createTextNode(text);

        domElement.appendChild(textNode);

        container.appendChild(domElement);

        this._hostNode = domElement;

        return domElement;
    }
}