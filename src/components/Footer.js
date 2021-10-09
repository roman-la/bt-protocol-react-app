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
        textAlign: 'center',
        color: '#FFFFFF',
        marginTop: '30px'
    }}>
        <Container sx={{ padding: 3 }}>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                justifyContent="center"
                alignItems="flex-start"
            >
                <Stack sx={{ width: '20%' }}>
                    <Typography variant="overline"><EmailOutlinedIcon style={{ position: 'relative', top: '8px' }} /> Kontakt</Typography>
                    <Link variant="caption" underline="hover" color="inherit" href="mailto:Roman.Laas@Student.HTW-Berlin.de">Roman.Laas@Student.HTW-Berlin.de</Link>
                </Stack>
                <Stack sx={{ width: '20%' }}>
                    <Typography variant="overline"><GitHubIcon style={{ position: 'relative', top: '8px' }} /> Sourcecode</Typography>
                    <Link variant="caption" underline="hover" color="inherit" href="https://github.com/roman-la/bt-protocol-crawler">Crawler</Link>
                    <Link variant="caption" underline="hover" color="inherit" href="https://github.com/roman-la/bt-protocol-processing">Processing</Link>
                    <Link variant="caption" underline="hover" color="inherit" href="https://github.com/roman-la/bt-protocol-api">REST API</Link>
                    <Link variant="caption" underline="hover" color="inherit" href="https://github.com/roman-la/bt-protocol-react-app">React App</Link>
                </Stack>
                <Stack sx={{ width: '20%' }}>
                    <Typography variant="overline"><InsertChartOutlinedIcon style={{ position: 'relative', top: '8px' }} /> UI-Komponenten</Typography>
                    <Link variant="caption" underline="hover" color="inherit" href="https://reactjs.org/">React</Link>
                    <Link variant="caption" underline="hover" color="inherit" href="https://mui.com/">Material UI</Link>
                    <Link variant="caption" underline="hover" color="inherit" href="https://nivo.rocks/">Nivo</Link>
                </Stack>
                <Stack sx={{ width: '40%' }}>
                    <Typography variant="overline"><CodeOutlinedIcon style={{ position: 'relative', top: '8px' }} /> Root</Typography>
                    <Typography variant="caption">
                        Der <Link color="inherit" href="https://github.com/Sentiments-of-Bundestag">erste Prototyp</Link> dieses Projekts entstand im Wintersemester 2020/21 im Rahmen des Moduls Information Systems im Studiengang Angewandte Informatik (Master) an der Hochschule für Technik und Wirtschaft Berlin und wird seitdem weiterentwickelt.
                    </Typography>
                </Stack>
            </Stack>
        </Container>
    </Box>;

export default Footer;
