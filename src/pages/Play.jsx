import React from 'react'
import { useLocation } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { firestore } from '../firebase/config';
import { updateGameDocument } from '../firebase/game'

const Play = () => {
    const {name, pin, rank} = useLocation().state;
    const [isQuestioner, setIsQuestioner] = React.useState(false);
    const [isAnswerer, setIsAnswerer] = React.useState(false);
    const [gameDocument, setGameDocument] = React.useState(null);

    const setAnswerer = async (answerRank) => {
        await updateGameDocument({
            pin: pin,
            answerer: gameDocument.players.find(player => player.rank === answerRank),
        });
    };

    const NormalDisplay = () => (
        <div>
            <h1>Hi {name}, You are {rank}</h1>
        </div>
    );

    const QuestionerDisplay = () => (
        <div>
            <h1>{name}, your turn to ask the question. Who would you like to ask?</h1>
            <Button variant="outlined" color="primary" onClick={() => setAnswerer(1)}>
                Ranked 1: {gameDocument.players.find(player => player.rank === 1).name}
            </Button>
            <Button variant="outlined" color="primary" onClick={() => setAnswerer(2)}>
                Ranked 2: {gameDocument.players.find(player => player.rank === 2).name}
            </Button>
            <Button variant="outlined" color="primary" onClick={() => setAnswerer(3)}>
                Ranked 3: {gameDocument.players.find(player => player.rank === 3).name}
            </Button>
            <h1>Is the Answer given correct?</h1>
            <Button variant="contained" color="primary">
              yes
            </Button>
            <Button variant="contained" color="primary">
              no
            </Button>
        </div>
    );

    const AnswererDisplay = () => (
        <h1>You are selected to answer a question</h1>
    );

    React.useEffect(() => {
        const docRef = firestore.collection('games').doc(pin);
        const unsubscribe = docRef.onSnapshot((doc) => {
            doc.exists && setGameDocument(doc.data());
            if(doc.exists && doc.data().questioner.rank === rank){
                setIsQuestioner(true);
            } else {
                setIsQuestioner(false);
            }
            if(doc.exists && doc.data().answerer.rank === rank){
                setIsAnswerer(true);
            } else {
                setIsAnswerer(false);
            }
        });
        return unsubscribe;
    },[pin, rank]);

    return (
        <>
            <NormalDisplay />
            {isQuestioner && <QuestionerDisplay />}
            {isAnswerer && <AnswererDisplay />}
        </>
    )
}

export default Play
