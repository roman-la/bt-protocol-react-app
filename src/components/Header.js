import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Switch from '@mui/material/Switch'
import Stack from '@mui/material/Stack'
import FormControlLabel from '@mui/material/FormControlLabel'
import Collapse from '@mui/material/Collapse'
import Link from '@mui/material/Link'

export function Header() {
    const [checked, setChecked] = React.useState(false)

    const handleChange = () => {
        setChecked((prev) => !prev)
    }

    return (
        <>
            <Box sx={{
                width: '100%',
                backgroundColor: '#555555',
                color: '#FFFFFF'
            }}>
                <Container sx={{ padding: 2 }}>
                    <Stack direction="row"
                        justifyContent="space-between"
                        alignItems="center">
                        <Typography variant='h5' style={{ color: '#FFFFFF' }}>Analyse der Sitzungsprotokolle des 19. Deutschen Bundestages<sup style={{ color: '#888888' }}>beta</sup></Typography>
                        <FormControlLabel
                            control={<Switch checked={checked} onChange={handleChange} />}
                            label="About"
                        />
                    </Stack>
                </Container>
            </Box >
            <Box sx={{
                '& > :not(style)': { display: 'flex' },
                marginTop: '10px',
                marginBottom: '10px'
            }}>
                <Container>
                    <Collapse in={checked}>
                        <Typography align='justify'>
                            Auf dieser Website werden die Ergebnisse einer Analyse der Sitzungsprotokolle des 19. Deutschen Bundestages gezeigt.
                            Im Fokus stehen dabei die Kommentare und Zwischenrufe bei Reden, welche mit dem jeweiligen Absender in den Protokollen vermerkt werden.
                            Mithilfe einer sog. <Link href='https://de.wikipedia.org/wiki/Sentiment_Detection'>Sentimentanalyse</Link> wird die Stimmung jedes Kommentars ermittelt und das Ergebnis in eine <Link href='https://neo4j.com/'>Graphdatenbank</Link> geschrieben.
                            Die Stimmungswerte, welche auch als Polarität bezeichnet werden, liegen zwischen -1,0 (sehr negativ) und 1,0 (sehr positiv).
                            Die Basis der Sentimentanalyse bilden <Link href='https://sites.google.com/site/iggsahome/downloads'>bekannte annotierte Wortlisten</Link>.
                            Es wurde jedoch auch eine eigene Wortliste angelegt, welche in der Politik-Domäne häufig verwendete Worte enthält.
                        </Typography>
                        <Typography align='justify'>
                            Die Sitzungsprotokolle sind frei zugänglich und wurden direkt von der <Link href='https://www.bundestag.de/protokolle'>Website des Deutschen Bundestages</Link> bezogen.
                            Referenzen zum Autor der Analyse, dem Sourcecode sowie den für diese Website verwendeten Frontend- und Backend-Komponenten befinden sich am Ende dieser Website.
                            Der <Link href="https://github.com/Sentiments-of-Bundestag">erste Prototyp</Link> dieses Projekts entstand im Wintersemester 2020/21 im Rahmen des Moduls Information Systems im Studiengang Angewandte Informatik (Master) an der Hochschule für Technik und Wirtschaft Berlin und wird seitdem weiterentwickelt.
                        </Typography>
                    </Collapse>
                </Container>
            </Box>
        </>
    )
}
