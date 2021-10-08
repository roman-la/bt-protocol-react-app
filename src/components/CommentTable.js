import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

class CommentTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true
        }
    }

    componentDidMount() {
        Promise.all([
            fetch('http://infosys3.f4.htw-berlin.de:8003/comment_table')
        ])
            .then(([res]) => Promise.all([res.json()]))
            .then(([data]) => this.setState({
                data: data,
                isLoading: false
            }))
    }

    render() {
        var columns = [
            { field: 'sender', headerName: 'Absender', flex: 1 },
            { field: 'receiver', headerName: 'Empfänger', flex: 1 },
            { field: 'comment', headerName: 'Kommentar', flex: 1 },
            { field: 'polarity', headerName: 'Polarität', flex: .5 },
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

export default CommentTable