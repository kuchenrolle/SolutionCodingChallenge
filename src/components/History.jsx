import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from "@material-ui/core/Typography";


export const History = ({ calculations }) => {
    let [calculation, ...rest] = calculations

    return (
    <List aria-label="Calculations">
        <ListItem>
            <ListItemText primary={
                <Typography variant="h6"> {/* should be done with css */}
                    {calculation}
                </Typography>
            } />
        </ListItem>
    
        {rest.map((calculation, index) => {
            return (
            <ListItem key={index}>
                <ListItemText primary={ calculation } />
            </ListItem>)
        })}
    </List>
    )
}