import React from 'react';
import ReactDOM from 'react-dom';
import CommentChord from './components/CommentChord';
import FactionsPie from './components/FactionsPie';
import CommentTable from './components/CommentTable';
import PageRankTable from './components/PageRankTable';
import PolarityHeatmap from './components/PolarityHeatmap';
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

ReactDOM.render(
  <>
    <Container>
      <h1>Analyse der Sitzungsprotokolle des 19. Deutschen Bundestags</h1>
      <p>
        Die auf dieser Website visualisierten Daten werden aus den öffentlich zugänglichen <a href="https://www.bundestag.de/services/opendata">Sitzungsprotokollen</a> des Deutschen Bundestags gewonnen.
        Betrachtet werden vor allem Zwischenrufe bei Reden, welche eindeutig einem Mitglied des Bundestages (MdB) zugewiesen werden können.
      </p>
      <p>
        Um herauszufinden, ob ein Kommentar positiv, neutral oder negativ ist, wird eine <a href="https://de.wikipedia.org/wiki/Sentiment_Detection">Sentimentanalyse</a> durchgeführt, dessen Ergebnis ein Polaritätswert zwischen 1,0 (sehr positiv) und -1,0 (sehr negativ) ist.
        Basis dieser Analyse ist eine annotierte Wortliste, welche das Ergebnis einer Zusammenfassung <a href="https://sites.google.com/site/iggsahome/downloads">bekannter deutscher Wortlisten</a> und einer eigens für die "politik Sprache" erstellten Wortliste ist.
      </p>
    </Container>

    <Divider />

    <Container>
      <h2>Sitzverteilung</h2>
      <p>Dieses Kreisdiagramm zeigt die Sitzverteilung zu Beginn der 19. Wahlperiode.</p>
      <FactionsPie />
    </Container>

    <Divider />

    <Container>
      <h2>Anzahl der Kommentare pro Fraktion</h2>
      <p>Dieses Sehnendiagramm zeigt die Gesamtzahl von Kommentaren einer Fraktion sowie die Anzahl von Kommentaren zwischen Fraktionen.</p>
      <CommentChord />
    </Container>

    <Divider />

    <Container>
        <h2>Durchschnittliche Kommentar-Polarität zwischen Fraktionen
        <Tooltip title='Asd'>
          <InfoOutlinedIcon />
        </Tooltip>
        </h2>
      <p>Diese Heatmap zeigt die durchschnittliche Kommentar-Polarität zwischen Fraktionen.</p>
      <PolarityHeatmap />
    </Container>

    <Divider />

    <Container>
      <h2>Kommentare</h2>
      <p>Diese Tabelle zeigt alle Kommentare in der Datenbank.</p>
      <CommentTable />
    </Container>

    <Divider />

    <Container>
      <h2>MdB PageRank und Eigenvektor</h2>
      <p>Diese Tabelle zeigt alle MdBs in der Datenbank mit <a href="https://de.wikipedia.org/wiki/PageRank">PageRank</a> und <a href="https://en.wikipedia.org/wiki/Eigenvector_centrality">Eigenvektor</a>. Beide Werte werden mit der Neo4j <a href="https://neo4j.com/docs/graph-data-science/current/algorithms/page-rank/">Graph Data Science Library</a> berechnet.</p>
      <PageRankTable />
    </Container>
  </>,
  document.getElementById('root')
);
