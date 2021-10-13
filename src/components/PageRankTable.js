import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

class PageRankTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            searchText: '',
            searchedColumn: ''
        }
    }

    componentDidMount() {
        Promise.all([
            fetch('http://infosys3.f4.htw-berlin.de:8003/pagerank_table')
        ])
            .then(([res]) => Promise.all([res.json()]))
            .then(([data]) => {
                data.forEach(function (element, i) {
                    element.key = i
                })

                this.setState({
                    data: data,
                    isLoading: false
                })
            })
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Suchen
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        }
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        var columns = [
            {
                key: 'name',
                dataIndex: 'name',
                title: 'MdB',
                sorter: (a, b) => a.sender.localeCompare(b.name),
                ...this.getColumnSearchProps('sender')
            },
            {
                key: 'faction',
                dataIndex: 'faction',
                title: 'Fraktion',
                sorter: (a, b) => a.sender.localeCompare(b.faction),
                ...this.getColumnSearchProps('sender')
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
            <Table columns={columns} dataSource={this.state.data} loading={this.state.isLoading}></Table>
        )
    }
}

export default PageRankTable