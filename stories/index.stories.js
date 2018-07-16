import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import BinaryTreeComponent from '../src/react-app/BinaryTreeComponent.jsx';
import ProblemComponent from '../src/react-app/ProblemComponent.jsx';
import EditorModal from '../src/react-app/EditorModal.jsx';
import ImageProblem from '../src/problem-engine/ImageProblem';
import SolutionHistory from '../src/react-app/SolutionHistory.jsx';

const btreeProblem = {
    title: 'title',
    description: 'description',
    type: 'btree'
};

const mockEngine = (data) => ({
    socket: {
        on: (event, callback) => {
            window.setTimeout(() => {
                callback(data);
            }, 100);
        }
    }
});

class AsyncComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    componentDidMount() {
        this.props.fetchProps().then((data) => this.setState({ data }));
    }

    render() {
        if (this.state.data) {
            let elem = React.cloneElement(this.props.children, this.state.data);
            console.log(elem);
            return elem;
        } else {
            return <div> Loading </div>;
        }
    }
}

storiesOf('SolutionHistory', module).add('Solution History', () => (
    <SolutionHistory />
));

storiesOf('BinaryTreeComponent', module).add('the tree', () => (
    <BinaryTreeComponent />
));

storiesOf('ProblemComponent', module).add('binary tree component', () => (
    <ProblemComponent problem={btreeProblem} />
));

storiesOf('EditorModal', module)
    .add('BinaryTreeComponent', () => {
        let mockedEngine = mockEngine(btreeProblem);
        return <EditorModal socket={mockedEngine.socket} />;
    })
    .add('ImageComponent', () => {
        let fetchProps = async () => {
            let problem = await ImageProblem.create();
            let serialized = await problem.serialize();
            return { socket: mockEngine(serialized).socket };
        };
        return (
            <AsyncComponent fetchProps={fetchProps}>
                <EditorModal />
            </AsyncComponent>
        );
    });
