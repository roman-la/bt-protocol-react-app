import React from 'react';
import ReactDOM from 'react-dom';
import CommentChord from './components/CommentChord';
import FactionsPie from './components/FactionsPie';
import CommentTable from './components/CommentTable';
import PageRankTable from './components/PageRankTable';
import PolarityHeatmap from './components/PolarityHeatmap';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import HeadingTooltip from './components/HeadingTooltip';
import Footer from './components/Footer';
import Header from './components/Header';
import 'antd/dist/antd.css';

ReactDOM.render(
  <>
    <Header />

    <Container>
      <HeadingTooltip header={'Sitzverteilung'} tooltip={'Dieses Kreisdiagramm zeigt die Sitzverteilung am Beginn der 19. Wahlperiode.'} />
      <FactionsPie />
    </Container>

    <Divider variant='middle' sx={{ marginTop: '25px', marginBottom: '25px' }} />

    <Container>
      <HeadingTooltip header={'Kommentare zwischen Fraktionen'} tooltip={'Dieses Sehnendiagramm zeigt die Gesamtzahl von Kommentaren einer Fraktion sowie die Anzahl von Kommentaren zwischen Fraktionen.'} />
      <CommentChord />
    </Container>

    <Divider variant='middle' sx={{ marginTop: '25px', marginBottom: '25px' }} />

    <Container>
      <HeadingTooltip header={'Durchschnittliche Kommentar-Polarität'} tooltip={'Diese Heatmap zeigt die durchschnittliche Kommentar-Polarität zwischen Fraktionen.'} />
      <PolarityHeatmap />
    </Container>

    <Divider variant='middle' sx={{ marginTop: '25px', marginBottom: '25px' }} />

    <Container>
      <HeadingTooltip header={'Kommentare'} tooltip={'Diese Tabelle zeigt alle Kommentare in der Datenbank.'} />
      <CommentTable />
    </Container>

    <Divider variant='middle' sx={{ marginTop: '25px', marginBottom: '25px' }} />

    <Container>
      <HeadingTooltip header={'Einfluss'} tooltip={<>Diese Tabelle zeigt alle MdBs in der Datenbank mit <a href="https://de.wikipedia.org/wiki/PageRank">PageRank</a> und <a href="https://en.wikipedia.org/wiki/Eigenvector_centrality">Eigenvektor</a>. Beide Werte werden mit der Neo4j <a href="https://neo4j.com/docs/graph-data-science/current/algorithms/page-rank/">Graph Data Science Library</a> berechnet.</>} />
      <PageRankTable />
    </Container>

    <Footer />
  </>,
  document.getElementById('root')
);
