import React from 'react'
import Typography from '@material-ui/core/Typography';

import firebase from '../Firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
const firestore = firebase.firestore();

const Hub = () => {
    console.log(firestore.collection('games').doc());
    const gamesRef = firestore.collection('games');
    const query  = gamesRef.orderBy('pin').limit(25);
    //const [games] = useCollectionData(query, {idField: 'id'})
    const games = []
    //const randNumb = Math.floor(Math.random() * 999999);
    return (
        <div>
            {games.map((game) => 
                <div id={game.id}>
                    <Typography variant="h1" component="h2" gutterBottom>
                        {game.pin}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {game.users}
                    </Typography>
                </div>
            )}
        </div>
    )
}

export default Hub
