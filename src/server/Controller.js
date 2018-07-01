import ImageProblem from '../problem-engine/ImageProblem';
import EventEmitter from 'events';
import { problem } from './db/views';

export class ProblemEmitter extends EventEmitter {}
export const problemEmitter = new ProblemEmitter();

class ProblemQueue {
    constructor() {
        this.problemQueue = {};
    }

    enqueue(playerId) {
        this.problemQueue[playerId] = true;
    }

    dequeue(playerId) {
        if (this.problemQueue[playerId]) {
            return delete this.problemQueue[playerId];
        } else {
            return false;
        }
    }
}

let problemQueue = new ProblemQueue();
problemEmitter.on('display', (playerId) => {
    problemQueue.enqueue(playerId);
});

export default class Controller {
    static getProblem(req, res) {
        if (problemQueue.dequeue(req.params.playerId)) {
            console.log('sending problem');
            res.json({ title: 'New problem' });
        } else {
            res.status(204).send('No problem yet');
        }
    }

    static pushProblem(socket, playerId, dbId) {
        problem(dbId)
            .then((problem) => {
                return new ImageProblem(problem.original).serialize();
            })
            .then((serialized) => {
                socket.emit('problem', serialized);
            });
    }
}