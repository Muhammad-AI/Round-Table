import { firestore } from './config'

export const createGameDocument = async (game) => {
    // get a reference to the Firestore document
    // create a doc with pin
    const docRef = firestore.doc(`/games/${game.pin}`)

    // create a intial game object
    const gameProfile = {
        players: game.players,
        questioner: { name: '', rank: 0},
        answerer: { name: '', rank: 0},
        judge: {}
    };

    // write to Cloud Firestore
    return docRef.set(gameProfile);
};

export const updateGameDocument = async (game) => {
    console.log('updating game: ', game);
    const docRef = firestore.doc(`/games/${game.pin}`);
    let updateDict = {};
    if('questioner' in game){
        updateDict.questioner = game.questioner;
    }
    if('answerer' in game){
        updateDict.answerer = game.answerer;
    }
    if ('players' in game){
        updateDict.players = game.players;
    }
    if ('judge' in game){
        updateDict.judge = game.judge;
    }
    return docRef.update(updateDict);
}