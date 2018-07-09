import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Editor from './editor.jsx';
import ace from 'ace-builds';
import ProblemComponent from './ProblemComponent.jsx';

import './CSS/Modal.scss';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '500px'
    }
};

export class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            problem: undefined,
            code: '',
            generator: function(x, y) {
                return 0;
            }
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setGenerator = this.setGenerator.bind(this);

        let setSocketEvent = () => {
            if (!this.props.clientEngine.socket) {
                window.setTimeout(() => {
                    setSocketEvent();
                }, 1000);
            } else {
                this.props.clientEngine.socket.on('problem', (data) => {
                    console.log('display', data);
                    this.setState({ problem: data, code: data.code });
                    this.openModal();
                });
            }
        };
        setSocketEvent();
    }

    setGenerator(code) {
        console.log('onchange');
        try {
            let func = eval(code);
            this.setState({ generator: func });
        } catch (error) {
            console.log(error);
        }
    }

    openModal() {
        console.log('modal is open');
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >
                    {this.state.problem && (
                        <ProblemComponent
                            problem={this.state.problem}
                            generator={this.state.generator}
                        />
                    )}
                    <Editor
                        onChange={this.setGenerator}
                        value={this.state.code}
                    />
                </Modal>
            </div>
        );
    }
}

export default function createApp(clientEngine) {
    window.addEventListener('DOMContentLoaded', () => {
        Modal.setAppElement('#overlay');
        ReactDOM.render(
            <App clientEngine={clientEngine} />,
            document.getElementById('overlay')
        );
    });
}
