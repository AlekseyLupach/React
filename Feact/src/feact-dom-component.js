export default class FeactDOMComponent {
    constructor(element) {
        this._element = element;
    }

    receiveComponent(nextElement) {
        const prevElement = this._element;

        this.updateComponent(prevElement, nextElement);
    }

    updateComponent(prevElement, nextElement) {
        const lastProps = prevElement.props;
        const nextProps = nextElement.props;

        // this._updateDOMProps(lastProps, nextProps);
        this._updateDOMChildren(lastProps, nextProps);

        this._element = nextElement;
    }

    _updateDOMChildren(lastProps, nextProps) {
        const lastContent = lastProps.children;
        const nextContent = nextProps.children;

        if (!nextContent) {
            this.updateTextContent('');
        } else if (nextContent !== lastContent) {
            this.updateTextContent('' + nextContent);
        }
    }

    updateTextContent(text) {
        const node = this._hostNode;

        node.textContent = text;
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