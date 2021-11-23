import React from 'react'
import { useLocation } from "react-router-dom";
import { firestore } from '../firebase/config';
import { useHistory } from 'react-router-dom';

const Lobby = () => {
    const name = useLocation().state.name;;
    const pin = useLocation().state.pin;
    const history = useHistory();
    
    React.useEffect(() => {
        // ref for pin doc
        const docRef = firestore.collection('games').doc(pin);

        // listener that checks if game started then redirects to play 
        const unsubscribe = docRef.onSnapshot((doc) => {
            // if game started
            if(doc.exists && doc.data().questioner.rank !== 0){
                const rank = doc.data().players.find(player => player.name === name).rank;
                history.push('/play', {
                    pin,
                    name,
                    rank,
                });
            }
        });
        return unsubscribe;
    },[history, name, pin]);
    return (
        <div>
            <h1> {pin} {name} Waiting for players ...</h1>
        </div>
    )
}

export default Lobby
