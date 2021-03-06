import express from 'express';
import MatchMaker from '../MatchMaker';
import InstanceManager from '../InstanceManager';
import cookieParser from 'cookie-parser';

export class MatchmakingRouter {
    /**
     *
     * @param {*} io
     * @param {*} Auth - injectable auth dependency
     */
    constructor(io, Auth) {
        this.Auth = Auth;

        this.manager = new InstanceManager(io, Auth);
        this.matchmaker = new MatchMaker(this.manager);
    }

    handleVs(res, req) {
        const callback = (resp) => {
            res.cookie('gameId', resp.gameId, {
                sameSite: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            res.json(resp);
        };

        const gameId = req.cookies.gameId;

        if (
            gameId &&
            this.manager.gameExists(gameId) &&
            !this.manager.gameIsFull(gameId)
        ) {
            callback(MatchMaker.createResponse(gameId));
        } else {
            this.matchmaker.queue(callback);
            req.on('aborted', () => {
                this.matchmaker.cancel(callback);
            });
        }
    }

    async handlePractice(res, req) {
        const resp = await this.matchmaker.createPractice();
        res.json(resp);
    }

    get router() {
        const router = express.Router();
        router.use(cookieParser());

        router.post('/match', async (req, res) => {
            if (!req.query)
                return res.status(500).send('Must include querystring');

            const mode = req.query.mode;

            switch (mode) {
            case 'vs':
                return this.handleVs(res, req);
            case 'practice':
                return this.handlePractice(res, req);
            default:
                res.status(500).send('Must include mode parameter');
            }
        });

        return router;
    }
}

export default function makeRouter(io, Auth) {
    return new MatchmakingRouter(io, Auth).router;
}
