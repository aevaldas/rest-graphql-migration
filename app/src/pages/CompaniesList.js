import React from 'react';
import {Link} from "react-router-dom";
import {Button, PageHeader, Space, Table} from 'antd';
import axios from '../axios';
import CreateCompanyModal from "../components/CreateCompanyModal";
import {formatDataForTable} from "../utils";

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => <Link to={`/companies/${record.key}`}>{text}</Link>,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Action',
        key: 'action',
        render: (record) => (
            <Space size="middle">
                <Link to={`/companies/${record.key}`}>View</Link>
            </Space>
        ),
    },
];

class CompaniesList extends React.Component {
    state = {
        isLoading: true,
        data: [],
        isCreateCompanyModalActive: false
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => axios.get('/companies')
        .then(res => {
            this.setState({
                isLoading: false,
                data: res.data,
            });
        });

    onCompanyCreate = (values) => {
        this.setState(({data}) => ({data: data.concat(values)}));
        this.setState({isCreateCompanyModalActive: false});
    };

    onCompanyCreateCancel = () => this.setState({isCreateCompanyModalActive: false});

    showModal = () => this.setState({isCreateCompanyModalActive: true});

    render() {
        const {isLoading, data, isCreateCompanyModalActive} = this.state;

        return (
            <PageHeader
                title="Companies"
                extra={[
                    <Button
                        key="1"
                        type="primary"
                        onClick={this.showModal}>
                        Create new
                    </Button>,
                ]}
            >
                <Table
                    loading={isLoading}
                    columns={columns}
                    dataSource={formatDataForTable(data)}
                />
                <CreateCompanyModal
                    visible={isCreateCompanyModalActive}
                    onCreate={this.onCompanyCreate}
                    onCancel={this.onCompanyCreateCancel}
                />
            </PageHeader>
        );
    }
}

export default CompaniesList