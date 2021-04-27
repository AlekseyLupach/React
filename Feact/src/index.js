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

    getInitialState() {
        return { count: 0 };
    },
    shouldComponentUpdate() {
        return true;
    },
    render() {
        return Feact.createElement(InnerComponent, { message: this.props.message });
    },
});

const Button = Feact.createClass({
    getInitialState() {
        return { count: 0 }
    },

    componentDidMount() {
        setTimeout(() => {
            this.setState(({ count }) => ({
                count: count + 1,
            }));

            this.setState(({ count }) => ({
                count: count + 2,
            }));

            this.setState(({ count }) => ({
                count: count + 3,
            }));
        }, 2000)
    },

    render() {
        console.log('render');
        const { count } = this.state;

        return Feact.createElement('button', null, count + '');
    }
})

// Feact.render(
//     Feact.createElement("div", null, "Hello World"),
//     document.getElementById('root')
// );

// Feact.render(
//     Feact.createElement(MyComponent, { message: "text" }),
//     document.getElementById('root')
// );

Feact.render(
    Feact.createElement(Button), document.getElementById('root')
);



setTimeout(() => {
    Feact.render(
        Feact.createElement(MyComponent, { message: "new text" }),
        document.getElementById('root')
    );
}, 2000)