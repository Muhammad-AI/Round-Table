import React from 'react'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const Main = () => {
    const history = useHistory();
    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => history.push('/join')}>
                JOIN
            </Button>
            <Button variant="contained" color="secondary" onClick={() => history.push('/hub')}>
                HOST
            </Button>
        </div>
    )
}

export default Main
