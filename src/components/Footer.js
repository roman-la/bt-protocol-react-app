import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import Link from '@mui/material/Link';
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';

export function Footer() {
    return (
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
                    justifyContent="space-evenly"
                    alignItems="center"
                >
                    <Stack>
                        <Typography variant="overline"><GitHubIcon style={{ position: 'relative', top: '8px' }} /> Sourcecode</Typography>
                        <Link variant="caption" underline="hover" color="inherit" href="https://github.com/roman-la/bt-protocol-crawler">Crawler</Link>
                        <Link variant="caption" underline="hover" color="inherit" href="https://github.com/roman-la/bt-protocol-processing">Processing</Link>
                        <Link variant="caption" underline="hover" color="inherit" href="https://github.com/roman-la/bt-protocol-api">REST API</Link>
                        <Link variant="caption" underline="hover" color="inherit" href="https://github.com/roman-la/bt-protocol-react-app">React App</Link>
                    </Stack>
                    <Stack>
                        <Typography variant="overline"><DnsOutlinedIcon style={{ position: 'relative', top: '8px' }} /> Backend</Typography>
                        <Link variant="caption" underline="hover" color="inherit" href="https://scrapy.org/">Scrapy</Link>
                        <Link variant="caption" underline="hover" color="inherit" href="https://spacy.io/">spaCy</Link>
                        <Link variant="caption" underline="hover" color="inherit" href="https://neo4j.com/">Neo4j</Link>
                        <Link variant="caption" underline="hover" color="inherit" href="https://flask.palletsprojects.com/">Flask</Link>
                    </Stack>
                    <Stack>
                        <Typography variant="overline"><WebOutlinedIcon style={{ position: 'relative', top: '8px' }} /> Frontend</Typography>
                        <Link variant="caption" underline="hover" color="inherit" href="https://reactjs.org/">React</Link>
                        <Link variant="caption" underline="hover" color="inherit" href="https://mui.com/">Material UI</Link>
                        <Link variant="caption" underline="hover" color="inherit" href="https://react-table.tanstack.com/">React Table</Link>
                        <Link variant="caption" underline="hover" color="inherit" href="https://nivo.rocks/">Nivo</Link>
                    </Stack>
                </Stack>

                <Divider variant='middle' sx={{ marginTop: '15px', marginBottom: '5px' }} />

                <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    justifyContent="center"
                    alignItems="flex-start"
                >
                    <Stack>
                        <Typography variant="overline"><EmailOutlinedIcon style={{ position: 'relative', top: '8px' }} /> Kontakt</Typography>
                        <Link variant="caption" underline="hover" color="inherit" href="mailto:Roman.Laas@Student.HTW-Berlin.de">Roman.Laas@Student.HTW-Berlin.de</Link>
                    </Stack>
                </Stack>
            </Container>
        </Box >)
}
