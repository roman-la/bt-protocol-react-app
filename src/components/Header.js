import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import Link from '@mui/material/Link';

const Footer = () =>
    <Box sx={{
        width: '100%',
        backgroundColor: '#555555',
        color: '#FFFFFF',
        marginBottom: '20px'
    }}>
        <Container sx={{ padding: 2 }}>
            <Typography variant='h5'>Analyse der Sitzungsprotokolle des 19. Deutschen Bundestags</Typography>
        </Container>
    </Box>;

export default Footer;
