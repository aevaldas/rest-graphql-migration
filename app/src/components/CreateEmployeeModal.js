import React from 'react';
import {Form, Input, Modal} from 'antd';
import axios from "../axios";

const CreateEmployeeModal = ({companyId, visible, onCreate, onCancel}) => {
    const [form] = Form.useForm();

    const createCompany = (data) => axios.post('/employees', {...data, companyId});

    return (
        <Modal
            visible={visible}
            title="Create a new company"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={async () => {
                try {
                    const values = await form.validateFields();
                    const {data} = await createCompany(values);
                    form.resetFields();
                    onCreate(data);
                } catch (e) {}
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please write the name of employee',
                        },
                        {
                            min: 3
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="jobName"
                    label="Job name"
                    rules={[
                        {
                            required: true,
                            message: 'Please write the job name of employee',
                        },
                        {
                            min: 3,
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateEmployeeModal;