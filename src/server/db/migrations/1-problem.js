'use strict';

let Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "gameObjects", deps: []
 * createTable "problems", deps: []
 *
 **/

let info = {
    revision: 1,
    name: 'gameObject',
    created: '2018-06-12T06:05:23.156Z',
    comment: ''
};

let migrationCommands = [
    {
        fn: 'createTable',
        params: [
            'problems',
            {
                id: {
                    type: Sequelize.UUID,
                    primaryKey: true,
                    defaultValue: Sequelize.UUIDV1
                },
                title: {
                    type: Sequelize.TEXT
                },
                description: {
                    type: Sequelize.TEXT
                },
                original: {
                    type: Sequelize.TEXT
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW
                }
            },
            {}
        ]
    },
    {
        fn: 'createTable',
        params: [
            'gameObjects',
            {
                id: {
                    type: Sequelize.UUID,
                    primaryKey: true,
                    defaultValue: Sequelize.UUIDV1
                },
                location: {
                    type: Sequelize.GEOMETRY('POINT')
                },
                objectType: {
                    type: Sequelize.TEXT
                },
                problemId: {
                    type: Sequelize.UUID,
                    references: {
                        model: 'problems',
                        key: 'id'
                    }
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW
                }
            },
            {}
        ]
    },
    {
        fn: 'addColumn',
        params: ['problems', 'gameObjectId', Sequelize.UUID]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize) {
        let index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length) {
                    let command = migrationCommands[index];
                    console.log('[#' + index + '] execute: ' + command.fn);
                    index++;
                    queryInterface[command.fn](...command.params).then(
                        next,
                        reject
                    );
                } else resolve();
            }
            next();
        });
    },
    info: info,
    down: function(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.dropTable('gameObjects', {
                force: true,
                cascade: true
            }),
            queryInterface.dropTable('problems')
        ]);
    }
};
