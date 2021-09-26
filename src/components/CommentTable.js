import React from 'react';
import MaterialTable from 'material-table'

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
            fetch('http://' + window.location.hostname + ':8003/comment_table')
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
                        { title: 'Absender', field: 'sender' },
                        { title: 'Empfänger', field: 'receiver' },
                        { title: 'Kommentar', field: 'comment' },
                        { title: 'Polarität', field: 'polarity', customSort: (a, b) => a.polarity - b.polarity },
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

export default CommentTable