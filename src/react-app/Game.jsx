import React from 'react';
import querystring from 'query-string';
import MyClientEngine from '../client/MyClientEngine';
import MyGameEngine from '../common/MyGameEngine';

// default options, overwritten by query-string options
// is sent to both game engine and client engine
const defaults = {
    traceLevel: 1,
    delayInputCount: 3,
    scheduler: 'render-schedule',
    syncOptions: {
        sync: 'interpolate',
        localObjBending: 0.0,
        remoteObjBending: 0.8,
        bendingIncrements: 6
    },
    auth: {
        username: 'test',
        password: 'secret'
    },
    collisionOptions: {
        collisions: {
            type: 'HSHG'
        }
    }
};

// TODO: replace auth with token
export default class Game extends React.Component {
    componentDidMount() {
        const qsOptions = querystring.parse(location.search);
        let options = Object.assign(defaults, qsOptions);

        // create a client engine and a game engine
        const gameEngine = new MyGameEngine(options);
        const clientEngine = new MyClientEngine(gameEngine, options);

        clientEngine.start().then(() => {
            this.props.onReceiveSocket(clientEngine.socket);
            clientEngine.socket.on('solution', (data) => {
                gameEngine.renderer.onReceiveSolution(
                    data.problemId,
                    data.playerId
                );
            });
        });
    }

    render() {
        return <div className="pixiContainer" />;
    }
}
