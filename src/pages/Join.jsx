import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { updateGameDocument } from '../firebase/game';
import { firestore } from '../firebase/config';
import { useHistory } from 'react-router-dom';

const Join = () => {
  const history = useHistory();
  const [pin, setPin] = React.useState('');
  const [name, setName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      // ref of pin doc
      const docRef = firestore.collection('games').doc(pin);
      // gets the doc
      const doc = await docRef.get();
      // update player
      if(doc.exists){
        let players = doc.data().players;
        players.push({
          name: name,
          rank: 0
        });
        // updates data
        await updateGameDocument({ pin: pin, players: players});
      } else {
        throw new Error('Wrong Pin')
      }
      history.push(`/lobby`, {
        pin: pin,
        name: name
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    (isLoading)?
      (<h1>Loading ...</h1>):
      (<div>
          <TextField
            id="pin"
            label="Pin Number"
            type="number"
            value={pin}
            onChange={(event) => setPin(event.target.value)}
            
          />
          <TextField
            id="name"
            label="Nickname"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            
          />
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Add
          </Button>
      </div>)
  )
}

export default Join
