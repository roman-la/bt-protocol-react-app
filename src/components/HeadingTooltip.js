import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
    tooltip: {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        border: '.5px solid #999999',
        fontSize: '.85rem',
        fontWeight: '400',
        boxShadow: '2px 2px 10px grey'
    }
});

export function HeadingTooltip(props) {
    return (
        <Grid container direction="row" alignItems="center" spacing={1} sx={{ marginBottom: '10px' }}>
            <Grid item>
                <Typography variant='h5'>{props.header}</Typography>
            </Grid>
            <Grid item>
                <Tooltip title={props.tooltip} classes={{ tooltip: styles().tooltip }}>
                    <InfoOutlinedIcon />
                </Tooltip>
            </Grid>
        </Grid>)
}
