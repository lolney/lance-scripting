import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import '.././CSS/Solutions.scss';
import { solvedProblem } from './SelectMenu.jsx';

export default class Problem extends React.Component {
    render() {
        let subproblems = {};
        for (const solvedProblem of this.props.solvedProblems) {
            let subproblem = solvedProblem.problem.subproblem;
            if (!subproblem) subproblem = 'none';
            if (subproblems[subproblem])
                subproblems[subproblem].push(subproblem);
            else subproblems[subproblem] = [subproblem];
        }
        console.log(subproblems);
        return (
            <div className="bootstrap-styles">
                {this.props.solvedProblems.every(
                    (solvedProblem) => solvedProblem.problem.subproblem
                ) && (
                    <DropdownButton
                        bsStyle="default"
                        bsSize="large"
                        title="hello"
                        id="dropdown-size-large"
                    >
                        {Object.keys(subproblems).map((subproblem) => (
                            <MenuItem eventKey="1" key={subproblem}>
                                {subproblem}
                            </MenuItem>
                        ))}
                    </DropdownButton>
                )}
            </div>
        );
    }
}

Problem.propTypes = {
    solvedProblems: PropTypes.arrayOf(solvedProblem).isRequired
};
