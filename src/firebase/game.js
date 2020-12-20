import { firestore } from './config'

export const createGameDocument = async (game) => {
    // get a reference to the Firestore document
    const docRef = firestore.doc(`/games/${game.pin}`)

    // create a game object
    const gameProfile = {
        players: game.players,
    };

    // write to Cloud Firestore
    return docRef.set(gameProfile);
};

export const updateGameDocument = async (game) => {
    const docRef = firestore.doc(`/games/${game.pin}`);
    return docRef.update({ players: game.players});
}