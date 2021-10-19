import React from 'react';
import { Table } from 'antd';
import { useFetch } from '../hooks/useFetch'

export function CommentTable() {
    const [data, isLoading] = useFetch('/comment_table')   

    const columns = [
        {
            key: 'sender',
            dataIndex: 'sender',
            title: 'Absender',
            sorter: (a, b) => a.sender.localeCompare(b.sender)
        },
        {
            key: 'receiver',
            dataIndex: 'receiver',
            title: 'Empfänger',
            sorter: (a, b) => a.receiver.localeCompare(b.receiver)
        },
        {
            key: 'comment',
            dataIndex: 'comment',
            title: 'Kommentar',
            sorter: (a, b) => a.comment.localeCompare(b.comment),
        },
        {
            key: 'polarity',
            dataIndex: 'polarity',
            title: 'Polarität',
            sorter: (a, b) => a.polarity - b.polarity
        },
    ]

    return (
        <Table columns={columns} dataSource={data} loading={isLoading} />
    )
}
