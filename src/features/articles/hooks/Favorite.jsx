import { Button,Typography } from '@mui/material';
import React from 'react'
import { useState } from 'react';


export const Favorite = () => {
        const [color, setColor] = useState ("red");
        return(
    <>
        <Typography>My favorite color is {color}!</Typography>
        <Button
            type="button"
            onClick={() => setColor("blue")}
        >Blue</Button>
        <Button
            type="button"
            onClick={() => setColor("red")}
        >Red</Button>
        <Button
            type="button"
            onClick={() => setColor("pink")}
        >Pink</Button>
        <Button
            type="button"
            onClick={() => setColor("green")}
        >Green</Button>
    </>
        )
}