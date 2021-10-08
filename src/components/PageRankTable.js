import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

class PageRankTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,

        }
    }

    componentDidMount() {
        Promise.all([
            fetch('http://infosys3.f4.htw-berlin.de:8003/pagerank_table')
        ])
            .then(([res]) => Promise.all([res.json()]))
            .then(([data]) => this.setState({
                data: data,
                isLoading: false
            }))
    }

    render() {
        var columns = [
            { field: 'name', headerName: 'MdB', flex: 1 },
            { field: 'faction', headerName: 'Fraktion', flex: .5 },
            { field: 'pagerank', headerName: 'PageRank', flex: 1 },
            { field: 'eigenvector', headerName: 'Eigenvektor', flex: 1 },
            { field: 'comments', headerName: 'Kommentare', flex: 1 }
        ]

        var rows = []

        this.state.data.forEach(function (dict, i) {
            dict.id = i
            rows.push(dict)
        })

        return (
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={this.state.isLoading}
                />
            </div>
        )
    }
}

export default PageRankTable