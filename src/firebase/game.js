import { firestore } from './config'

export const createGameDocument = async (game) => {
    // get a reference to the Firestore document
    const docRef = firestore.doc(`/games/${game.pin}`)

    // create a game object
    const gameProfile = {
        players: game.players,
        questioner: { name: '', rank: 0},
        answerer: { name: '', rank: 0}
    };

    // write to Cloud Firestore
    return docRef.set(gameProfile);
};

export const updateGameDocument = async (game) => {
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
    console.log(updateDict);
    return docRef.update(updateDict);
}