// class MyComponent extends Component {
//     render() {
//         return React.createElement('div', null, "Hellow World");
//         return <div>Hello World</div>
//     }
// }
import Feact from './feact.js';

// class MyComponent extends Component {
//     render() {
//         return <h1>{this.props.message}</h1>
//     }
// }

const InnerComponent = Feact.createClass({
    componentDidMount() {
        console.log('Inner Component')
    },

    render() {
        return Feact.createElement('h1', null, this.props.message);
    },
});

const MyComponent = Feact.createClass({
    componentDidMount() {
        console.log('My Component')
    },

    render() {
        return Feact.createElement(InnerComponent, { message: this.props.message });
    },
});

Feact.render(
    Feact.createElement("div", null, "Hello World"),
    document.getElementById('root')
);

Feact.render(
    Feact.createElement(MyComponent, { message: "text" }),
    document.getElementById('root')
);