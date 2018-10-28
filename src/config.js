export const WIDTH = 2000;
export const HEIGHT = 1200;

export const getSiegeItemFromId = (id) => {
    return siegeItems.find((item) => item.id == id);
};

export const getAssetPaths = () => {
    let items = siegeItems.concat([playerBase, verticalWall, horizontalWall]);
    let assetPaths = {};
    for (const item of items) {
        assetPaths[item.name] = item.image;
    }
    return assetPaths;
};

export const Player = {
    height: 25,
    width: 25
};

export const assaultBot = {
    height: 25,
    width: 25,
    cost: {
        wood: '10',
        stone: '10'
    },
    damage: 10
};

export const playerBase = {
    baseHP: 10,
    height: 50,
    width: 50,
    name: 'Keep',
    image: 'assets/Keep-warped.png'
};

export const verticalWall = {
    name: 'verticalWall',
    image: 'assets/rock-wall-vertical.png'
};

export const horizontalWall = {
    name: 'horizontalWall',
    image: 'assets/rock-wall-horizontal.png'
};

export const dirt = {
    name: 'dirt',
    image: 'assets/dirt.png'
};

export const siegeItems = [
    {
        name: 'Gate',
        image: 'assets/gate.png',
        type: 'offensive',
        cost: {
            wood: '4',
            stone: '0'
        }
    },
    {
        name: 'Bridge',
        image: 'assets/bridge4.png',
        type: 'offensive',
        cost: {
            wood: '4',
            stone: '0'
        }
    },
    {
        name: 'Ladder',
        image: 'assets/ladder1.png',
        type: 'offensive',
        cost: {
            wood: '4',
            stone: '0'
        }
    },
    {
        name: 'Slowfield',
        image: 'assets/slowfield3.png',
        type: 'defensive',
        cost: {
            wood: '2',
            stone: '2'
        }
    },
    {
        name: 'Pit',
        image: 'assets/hole2.png',
        type: 'defensive',
        cost: {
            wood: '1',
            stone: '3'
        }
    },
    {
        name: 'Fence',
        image: 'assets/fence.png',
        type: 'defensive',
        cost: {
            wood: '4',
            stone: '0'
        }
    }
].map((obj, i) => Object.assign({ id: i.toString() }, obj));
