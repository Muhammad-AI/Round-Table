import React from 'react'
import Button from '@material-ui/core/Button'
import { firestore } from '../firebase/config';
import { useParams } from "react-router-dom";

const GameHost = () => {
    const { pin } = useParams();
    const [displayCheck, setDisplayCheck] = React.useState(false);

    const JugementDisplay = () => (
      <>
        <h1>Is the Answer given correct?</h1>
        <Button variant="contained" color="primary">
          yes
        </Button>
        <Button variant="contained" color="primary">
          no
        </Button>
      </>
    );

    React.useEffect(() => {
      // ref for pin doc
      const docRef = firestore.collection('games').doc(pin);
      
      // listener check if doc exists then DOES NOTHING
      const unsubscribe = docRef.onSnapshot((doc) => {
          //console.log(doc.docs[0].data());
          if(doc.exists){
              const documentData = doc.data().players;
              //setGameDocument(documentData);
          }
      });
      return unsubscribe;
    },[pin]);
    return (
        <div>
            <h1>Welcome Host!</h1>
            {displayCheck && <JugementDisplay />}
        </div>
    )
}

export default GameHost
