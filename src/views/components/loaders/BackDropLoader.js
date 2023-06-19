import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';


const BackDropLoader = ({ isLoading }) => {
    return (
        <Backdrop open={isLoading}>
            <CircularProgress color='inherit' />
        </Backdrop>
    );
}

export default BackDropLoader;