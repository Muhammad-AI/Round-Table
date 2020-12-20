import React from 'react'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { createGameDocument } from '../firebase/game';

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const Main = () => {
    const history = useHistory();

    const handleChangeToHub = () => {
        const randNumb = getRndInteger(100000000,999999999);
        createGameDocument({
            pin: randNumb,
            players: []
        }).then(() => history.push(`/hub/${randNumb}`));
    };
    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => history.push('/join')}>
                JOIN
            </Button>
            <Button variant="contained" color="secondary" onClick={handleChangeToHub}>
                HOST
            </Button>
        </div>
    )
}

export default Main
