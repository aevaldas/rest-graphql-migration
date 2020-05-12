import React from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Descriptions,
  PageHeader,
  Popconfirm,
  Space,
  Table,
} from "antd";
import client, {
  DELETE_COMPANY,
  DELETE_EMPLOYEE,
  GET_COMPANY,
} from "../client";
import CreateEmployeeModal from "../components/CreateEmployeeModal";
import { formatDataForTable } from "../utils";

class Company extends React.Component {
  state = {
    isLoading: true,
    title: null,
    address: null,
    employees: [],
    isCreateEmployeeModalActive: false,
  };

  componentDidMount() {
    this.getCompany();
  }

  getCompany = () => {
    return client
      .query({
        query: GET_COMPANY,
        variables: {
          companyId: this.props.match.params.companyId,
        },
      })
      .then(
        ({
          data: {
            company: { title, address, employees },
          },
        }) => {
          this.setState({
            isLoading: false,
            title,
            address,
            employees,
          });
        }
      )
      .catch(this.toCompanies);
  };

  toCompanies = () => {
    this.props.history.push("/companies");
  };

  deleteCompany = () => {
    return client
      .mutate({
        mutation: DELETE_COMPANY,
        variables: {
          companyId: this.props.match.params.companyId,
        },
      })
      .then(this.toCompanies);
  };

  deleteEmployee = (id) => {
    return client
      .mutate({
        mutation: DELETE_EMPLOYEE,
        variables: { id },
      })
      .then(() => {
        this.setState(({ employees }) => {
          const index = employees.findIndex((item) => item.id === id);

          if (index === -1) {
            return null;
          }

          return {
            employees: [
              ...employees.slice(0, index),
              ...employees.slice(index + 1, index.length),
            ],
          };
        });
      });
  };

  onEmployeeCreateCancel = () =>
    this.setState({ isCreateEmployeeModalActive: false });

  onEmployeeCreate = (values) => {
    this.setState(({ employees }) => ({ employees: employees.concat(values) }));
    this.setState({ isCreateEmployeeModalActive: false });
  };

  render() {
    const {
      isLoading,
      title,
      address,
      employees,
      isCreateEmployeeModalActive,
    } = this.state;

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => text,
      },
      {
        title: "Job name",
        dataIndex: "jobName",
        key: "jobName",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={() => this.deleteEmployee(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">Delete</a>
            </Popconfirm>
          </Space>
        ),
      },
    ];

    return (
      <PageHeader
        title={title}
        subTitle="company"
        onBack={this.toCompanies}
        extra={[
          <Button
            key={1}
            type="primary"
            onClick={() => this.setState({ isCreateEmployeeModalActive: true })}
          >
            Add employee
          </Button>,
          <Popconfirm
            key={2}
            title="Are you sure delete this task?"
            onConfirm={this.deleteCompany}
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete company</Button>
          </Popconfirm>,
        ]}
      >
        <Descriptions size="normal" column={1}>
          <Descriptions.Item label="Address">{address}</Descriptions.Item>
        </Descriptions>
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={formatDataForTable(employees)}
        />
        <CreateEmployeeModal
          companyId={this.props.match.params.companyId}
          visible={isCreateEmployeeModalActive}
          onCreate={this.onEmployeeCreate}
          onCancel={this.onEmployeeCreateCancel}
        />
      </PageHeader>
    );
  }
}

export default withRouter(Company);
