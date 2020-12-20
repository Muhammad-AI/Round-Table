import React from 'react'
import { firestore } from '../firebase/config';
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button'

const Hub = () => {

    const { pin } = useParams();

    const [gameDocument, setGameDocument] = React.useState([]);

    React.useEffect(() => {
        /*createGameDocument({
            pin: randNumb,
        })*/
        const docRef = firestore.collection('games').doc(pin);
        const unsubscribe = docRef.onSnapshot((doc) => {
            //console.log(doc.docs[0].data());
            if(doc.exists){
                const documentData = doc.data().players;
                setGameDocument(documentData);
            }
        });
        return unsubscribe;
    },[pin])
    return (
        <div>
            <h1>{pin}</h1>
            {gameDocument.map((player) => (
                <h3>{player.name}</h3>
            ))}
            <Button variant="contained" color="primary">
              Start
            </Button>
        </div>
    )
}

export default Hub
