import React from 'react'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { createGameDocument } from '../firebase/game';

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const Main = () => {
    // history package for changing routes
    const history = useHistory();
    const [isLoading, setIsLoading] = React.useState(false);

    // change to hub
    const handleChangeToHub = () => {
        // loading boolean set to true
        setIsLoading(true);
        // random number
        const randNumb = getRndInteger(100000000,999999999);
        // creates a first time document in game master with pin 
        createGameDocument({
            pin: randNumb,
            players: []
        }).then(() => {
            // loading boolean set to false
            setIsLoading(false);
            // routing to hub/random number
            history.push(`/hub/${randNumb}`)
        });
    };
    return (
        (isLoading)?
            (
                <h1>Loading ...</h1>
            ):
            (<div>
                <Button variant="contained" color="primary" onClick={() => history.push('/join')}>
                    JOIN
                </Button>
                <Button variant="contained" color="secondary" onClick={handleChangeToHub}>
                    HOST
                </Button>
            </div>)
    )
}

export default Main
