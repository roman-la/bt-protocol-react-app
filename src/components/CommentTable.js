import React from 'react';
import { useFetch } from '../hooks/useFetch'
import { CustomTable } from './CustomTable.js'
import LinearProgress from '@mui/material/LinearProgress';

export function CommentTable() {
    const [data, isLoading] = useFetch('/comment_table')

    const columns = React.useMemo(
        () => [
            {
                Header: 'Absender',
                accessor: 'sender'
            },
            {
                Header: 'Empfänger',
                accessor: 'receiver'
            },
            {
                Header: 'Kommentar',
                accessor: 'comment'
            },
            {
                Header: 'Polarität',
                accessor: 'polarity',
                disableFilters: true
            }
        ],
        []
    )

    if (isLoading) {
        return <div style={{ margin: 20 }}>
            <LinearProgress />
        </div>
    } else {
        return (<CustomTable columns={columns} data={data} />)
    }
}
