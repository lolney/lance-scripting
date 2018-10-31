import React from 'react';
import querystring from 'query-string';
import MyClientEngine from '../client/MyClientEngine';
import Router from '../client/Router';
import MyGameEngine from '../common/MyGameEngine';

// default options, overwritten by query-string options
// is sent to both game engine and client engine
const defaults = {
    traceLevel: 1,
    delayInputCount: 3,
    scheduler: 'render-schedule',
    syncOptions: {
        sync: 'extrapolate',
        localObjBending: 0.0,
        remoteObjBending: 0.0,
        bendingIncrements: 6
    },
    auth: {
        username: 'test',
        password: 'secret'
    },
    collisionOptions: {
        collisions: {
            type: 'HSHG',
            keyObjectDetection: true
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
            Router.init(clientEngine.socket);
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
