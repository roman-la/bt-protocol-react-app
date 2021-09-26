import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import {
  Container, Divider, Grid, Header, List, Menu, Segment, Popup, Icon
} from 'semantic-ui-react';
import CommentChord from './components/CommentChord';
import FactionsPie from './components/FactionsPie';
import CommentTable from './components/CommentTable';
import PageRankTable from './components/PageRankTable';
import PolarityHeatmap from './components/PolarityHeatmap';


ReactDOM.render(
  <>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
          <Icon circular name='search' />
          BT Protocol Analysis
        </Menu.Item>
      </Container>
    </Menu>

    <Container text style={{ marginTop: '6em', marginBottom: '3em' }}>
      <Header as='h1'>Analyse der Sitzungsprotokolle des 19. Deutschen Bundestags</Header>
      <p>
        Die auf dieser Website visualisierten Daten werden aus den öffentlich zugänglichen <a href="https://www.bundestag.de/services/opendata">Sitzungsprotokollen</a> des Deutschen Bundestags gewonnen.
        Betrachtet werden vor allem Zwischenrufe bei Reden, welche eindeutig einem Mitglied des Bundestages (MdB) zugewiesen werden können.
      </p>
      <p>
        Um herauszufinden, ob ein Kommentar positiv, neutral oder negativ ist, wird eine <a href="https://de.wikipedia.org/wiki/Sentiment_Detection">Sentimentanalyse</a> durchgeführt, dessen Ergebnis ein Polaritätswert zwischen 1,0 (sehr positiv) und -1,0 (sehr negativ) ist.
        Basis dieser Analyse ist eine annotierte Wortliste, welche das Ergebnis einer Zusammenfassung <a href="https://sites.google.com/site/iggsahome/downloads">bekannter deutscher Wortlisten</a> und einer eigens für die "politik Sprache" erstellten Wortliste ist.
      </p>
    </Container>

    <Divider></Divider>

    <Container>
      <Header as='h2' style={{ 'display': 'inline-block', 'paddingRight': 10 }}>Sitzverteilung</Header>
      <Popup hoverable size='large' trigger={<Icon circular name='info' />}>Dieses Kreisdiagramm zeigt die Sitzverteilung zu Beginn der 19. Wahlperiode.</Popup>
      <FactionsPie />
    </Container>

    <Divider></Divider>

    <Container>
      <Header as='h2' style={{ 'display': 'inline-block', 'paddingRight': 10 }}>Anzahl der Kommentare pro Fraktion</Header>
      <Popup hoverable size='large' trigger={<Icon circular name='info' />}>Dieses Sehnendiagramm zeigt die Gesamtzahl von Kommentaren einer Fraktion sowie die Anzahl von Kommentaren zwischen Fraktionen.</Popup>
      <CommentChord />
    </Container>

    <Divider></Divider>

    <Container>
      <Header as='h2' style={{ 'display': 'inline-block', 'paddingRight': 10 }}>Durchschnittliche Kommentar-Polarität zwischen Fraktionen</Header>
      <Popup hoverable size='large' trigger={<Icon circular name='info' />}>Diese Heatmap zeigt die durchschnittliche Kommentar-Polarität zwischen Fraktionen.</Popup>
      <PolarityHeatmap />
    </Container>

    <Divider></Divider>

    <Container>
      <Header as='h2' style={{ 'display': 'inline-block', 'paddingRight': 10 }}>Kommentare</Header>
      <Popup hoverable size='large' trigger={<Icon circular name='info' />}>Diese Tabelle zeigt alle Kommentare in der Datenbank.</Popup>
      <CommentTable />
    </Container>

    <Divider></Divider>

    <Container>
      <Header as='h2' style={{ 'display': 'inline-block', 'paddingRight': 10 }}>MdB PageRank und Eigenvektor</Header>
      <Popup hoverable size='large' trigger={<Icon circular name='info' />}>Diese Tabelle zeigt alle MdBs in der Datenbank mit <a href="https://de.wikipedia.org/wiki/PageRank">PageRank</a> und <a href="https://en.wikipedia.org/wiki/Eigenvector_centrality">Eigenvektor</a>. Beide Werte werden mit der Neo4j <a href="https://neo4j.com/docs/graph-data-science/current/algorithms/page-rank/">Graph Data Science Library</a> berechnet.</Popup>
      <PageRankTable />
    </Container>

    <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
      <Container textAlign='center'>
        <Grid divided inverted stackable>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='About' />
            <List link inverted>
              <List.Item>
                <List.Content><List.Icon name='mail' /><a href='mailto:Roman.Laas@Student.HTW-Berlin.de'>Contact</a></List.Content>
              </List.Item>
              <List.Item>
                <List.Content><List.Icon name='github' /><a href="https://github.com/roman-la/bt-protocol-react-app">React App</a></List.Content>
              </List.Item>
              <List.Item>
                <List.Content><List.Icon name='github' /><a href="https://github.com/roman-la/bt-protocol-api">REST API</a></List.Content>
              </List.Item>
              <List.Item>
                <List.Content><List.Icon name='github' /><a href="https://github.com/roman-la/bt-protocol-processing">Processing</a></List.Content>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Technologies' />
            <List link inverted>
              <List.Item>
                <List.Content><List.Icon name='react' /><a href="https://reactjs.org/">React</a></List.Content>
              </List.Item>
              <List.Item>
                <List.Content><List.Icon name='database' /><a href="https://neo4j.com/">Neo4j</a></List.Content>
              </List.Item>
              <List.Item>
                <List.Content><List.Icon name='flask' /><a href="https://flask.palletsprojects.com/en/2.0.x/">Flask</a></List.Content>
              </List.Item>
              <List.Item>
                <List.Content><List.Icon name='bars' /><a href="https://spacy.io/">spaCy</a></List.Content>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='UI Components' />
            <List link inverted>
              <List.Item>
                <List.Content><List.Icon name='pie chart' /><a href="https://nivo.rocks/">nivo</a></List.Content>
              </List.Item>
              <List.Item>
                <List.Content><List.Icon name='grid layout' /><a href="https://semantic-ui.com/">Semantic UI</a></List.Content>
              </List.Item>
              <List.Item>
                <List.Content><List.Icon name='table' /><a href="https://material-table.com/#/">material-table</a></List.Content>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header inverted as='h4' content='Root' />
            Der <a href="https://github.com/Sentiments-of-Bundestag">erste Prototyp</a> dieses Projekts entstand im Wintersemester 2020/21 im Rahmen des Moduls Information Systems im Studiengang Angewandte Informatik (Master) an der Hochschule für Technik und Wirtschaft Berlin und wird seitdem weiterentwickelt.
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  </>,
  document.getElementById('root')
);
