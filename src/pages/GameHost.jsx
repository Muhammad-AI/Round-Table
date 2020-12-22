import React from 'react'
import Button from '@material-ui/core/Button'

const GameHost = () => {
    return (
        <div>
            <h1>Welcome Host!</h1>
            <h1>Is the Answer given correct?</h1>
            <Button variant="contained" color="primary">
              yes
            </Button>
            <Button variant="contained" color="primary">
              no
            </Button>
        </div>
    )
}

export default GameHost
