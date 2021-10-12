import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

class CommentTable extends React.Component {
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
            fetch('http://infosys3.f4.htw-berlin.de:8003/comment_table')
        ])
            .then(([res]) => Promise.all([res.json()]))
            .then(([data]) => {
                data.forEach(function (element, i) {
                    element.key = i
                    element.polarity = element.polarity.toFixed(6)
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
                key: 'sender',
                dataIndex: 'sender',
                title: 'Absender',
                sorter: (a, b) => a.sender.localeCompare(b.sender),
                ...this.getColumnSearchProps('sender')
            },
            {
                key: 'receiver',
                dataIndex: 'receiver',
                title: 'Empfänger',
                sorter: (a, b) => a.receiver.localeCompare(b.receiver),
                ...this.getColumnSearchProps('receiver')
            },
            {
                key: 'comment',
                dataIndex: 'comment',
                title: 'Kommentar',
                sorter: (a, b) => a.comment.localeCompare(b.comment),
                ...this.getColumnSearchProps('comment')
            },
            {
                key: 'polarity',
                dataIndex: 'polarity',
                title: 'Polarität',
                sorter: (a, b) => a.polarity - b.polarity
            },
        ]

        return (
            <Table columns={columns} dataSource={this.state.data} loading={this.state.isLoading}></Table>
        )
    }
}

export default CommentTable