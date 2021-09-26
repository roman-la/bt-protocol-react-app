import React from 'react';
import MaterialTable from 'material-table'

class PageRankTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true
        }
    }

    componentDidMount() {
        Promise.all([
            fetch('http://' + window.location.hostname + ':8003/pagerank_table')
        ])
            .then(([res]) => Promise.all([res.json()]))
            .then(([data]) => this.setState({
                data: data,
                isLoading: false
            }))
    }

    render() {
        return (
            <>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <MaterialTable
                    columns={[
                        { title: 'Mdb', field: 'name' },
                        { title: 'Fraktion', field: 'faction' },
                        { title: 'PageRank', field: 'pagerank'},
                        { title: 'Eigenvektor', field: 'eigenvector', defaultSort: 'desc' },
                        { title: 'Kommentare', field: 'comments' }
                    ]}
                    data={this.state.data}
                    isLoading={this.state.isLoading}
                    options={{
                        showTitle: false,
                        searchFieldAlignment: 'left',
                        thirdSortClick: false
                    }}>
                </MaterialTable>
            </>
        )
    }
}

export default PageRankTable