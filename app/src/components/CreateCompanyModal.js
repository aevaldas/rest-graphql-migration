import React from "react";
import { Form, Input, Modal } from "antd";
import axios from "../axios";

const CreateCompanyModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const createCompany = (data) => axios.post("/companies", data);

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
          const { data } = await createCompany(values);
          form.resetFields();
          onCreate(data);
        } catch (e) {}
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please write the title of company",
            },
            {
              min: 3,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: "Please write the address of company",
            },
            {
              min: 10,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCompanyModal;
