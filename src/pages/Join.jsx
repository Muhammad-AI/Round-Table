import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const Join = () => {
    const [pin, setPin] = React.useState('');
    return (
        <div>
            <TextField
              id="pin"
              label="Pin Number"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              
            />
            <Button variant="contained" color="primary">
              Find
            </Button>
        </div>
    )
}

export default Join
