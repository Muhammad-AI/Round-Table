import React from 'react'
import { firestore } from '../firebase/config';
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button'
import { updateGameDocument } from '../firebase/game'
import { useHistory } from 'react-router-dom';

const shuffleArray = array => {
	for(let i = array.length - 1; i > 0; i--){
		const j = Math.floor(Math.random() * (i+1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	
	return array;
};

const Hub = () => {
    // used for routing
    const history = useHistory();
    // pin coming from url
    const { pin } = useParams();

    const [gameDocument, setGameDocument] = React.useState([]);

    const startGame = async () => {
        const newGame = [...gameDocument];
        // randomising order of ranks e.g. [0,1,2,3 ...] => [2,1,3,0]
        const randArray = shuffleArray([...Array(gameDocument.length).keys()].map(i => i + 1));
        let questioner = {};

        // assigning a rank to players
        // assigning last one as the questionier
        await updateGameDocument({
            pin: pin,
            players: newGame.map((player, index) => {
                player.rank = randArray[index];
                if(player.rank === gameDocument.length){
                    questioner = {name: player.name, rank: player.rank}
                };
                return player
            }),
            questioner: questioner,
        });
        history.push('/game-host');
    };

    React.useEffect(() => {
        // ref to pin doc
        const docRef = firestore.collection('games').doc(pin);
        // function that sets game document
        const unsubscribe = docRef.onSnapshot((doc) => {
            //console.log(doc.docs[0].data());
            if(doc.exists){
                const documentData = doc.data().players;
                setGameDocument(documentData);
            }
        });
        return unsubscribe;
    },[pin]);

    return (
        <div>
            <h1>{pin}</h1>
            {gameDocument.map((player) => (
                <h3>{player.name}</h3>
            ))}
            <Button variant="contained" color="primary" onClick={startGame}>
              Start
            </Button>
        </div>
    )
}

export default Hub
