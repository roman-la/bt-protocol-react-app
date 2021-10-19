import React from 'react';
import { Table } from 'antd';
import { useFetch } from './APIUtils'

export function PageRankTable() {
    const [data, isLoading] = useFetch('/pagerank_table')

    // TODO: Add to rest api
    data.forEach((element, i) => {
        element.key = i
    })

    const columns = [
        {
            key: 'name',
            dataIndex: 'name',
            title: 'MdB',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            key: 'faction',
            dataIndex: 'faction',
            title: 'Fraktion',
            sorter: (a, b) => a.faction.localeCompare(b.faction),
        },
        {
            key: 'pagerank',
            dataIndex: 'pagerank',
            title: 'PageRank',
            sorter: (a, b) => a.pagerank - b.pagerank
        },
        {
            key: 'eigenvector',
            dataIndex: 'eigenvector',
            title: 'Eigenvektor',
            sorter: (a, b) => a.eigenvector - b.eigenvector
        },
        {
            key: 'comments',
            dataIndex: 'comments',
            title: 'Kommentare',
            sorter: (a, b) => a.comments - b.comments
        }
    ]

    return (
        <Table columns={columns} dataSource={data} loading={isLoading} />
    )
}
