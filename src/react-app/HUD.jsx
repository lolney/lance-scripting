import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import './CSS/HUD.scss';
import DefencesBrowser from './defences/DefencesBrowser.jsx';
import PropTypes from 'prop-types';
import ControlledButton from './ControlledButton.jsx';

export default class HUD extends React.Component {
    render() {
        return (
            <div className="hud-buttons bootstrap-styles">
                <ButtonToolbar>
                    <Button className="top-btn">
                        <div className="hud-column">
                            <img
                                alt="log icon"
                                src="assets/log.png"
                                height="20px"
                                width="20px"
                            />
                        </div>
                        <div className="hud-column-2">txt</div>
                    </Button>
                    <Button>
                        <div className="hud-column">
                            <img
                                alt="rock icon"
                                src="assets/rock-particle.png"
                                height="20px"
                                width="20px"
                            />
                        </div>
                        <div className="hud-column-2">txt</div>
                    </Button>
                    <ControlledButton
                        addWindow={() =>
                            this.props.addWindow(
                                <DefencesBrowser
                                    imageSrcs={['assets/sprites/tree1.png']}
                                    socket={this.props.socket}
                                />,
                                'defencesBrowser'
                            )
                        }
                        removeWindow={() =>
                            this.props.removeWindow('defencesBrowser')
                        }
                    >
                        <div className="hud-column">
                            <img
                                alt="defence icon"
                                src="assets/noun_rook_3679.svg"
                                height="20px"
                                width="20px"
                            />
                        </div>
                        <div className="hud-column-2">Siege Tools</div>
                    </ControlledButton>
                    <Button className="btm-btn" onClick={this.props.openWindow}>
                        Menu
                    </Button>
                </ButtonToolbar>
            </div>
        );
    }
}

HUD.propTypes = {
    openWindow: PropTypes.func.isRequired,
    addWindow: PropTypes.func.isRequired,
    removeWindow: PropTypes.func.isRequired,
    socket: PropTypes.object.isRequired
};
