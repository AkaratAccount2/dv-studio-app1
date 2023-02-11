import React, { useState } from 'react';
import { Table, Form, Input, Button, Select } from 'antd';
import { searchPayment } from './../services/profile.service'
import { datetimeConvertToDB } from './../services/utils'
import { Link } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;

const dayOptions = [
  { "DAY": "MON" },
  { "DAY": "TUE" },
  { "DAY": "WED" },
  { "DAY": "THR" },
  { "DAY": "FRI" },
  { "DAY": "SAT" },
  { "DAY": "SUN" }
]

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    lg: { span: 6 },
  },
}

const tailLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
    lg: {
      span: 6,
      offset: 6,
    },
  },
}


interface DataType {
  key: React.Key;
}

const PaymentSearch = () => {
  const [form] = Form.useForm();
  const [searchResults, setSearchResults] = useState([]);

  const [dataPayment, setDataPayment] = useState<any[]>([]);

  const onFinish = async (values) => {
    console.log('Search criteria:', values);
    // Perform search using values.codeNumber, values.firstName, etc.
    // Set searchResults using setSearchResults
    let payment = await searchPayment(values)
    console.log(payment)
    setDataPayment(payment)
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Paymen No',
      dataIndex: 'gen_payment_no',
      key: 'gen_payment_no',
    },
    {
      title: 'Receipt Date',
      dataIndex: 'receipt_date',
      key: 'receipt_date',
      render: (_) => datetimeConvertToDB(_)
    },
    {
      title: 'User Code',
      dataIndex: 'usercode',
      key: 'usercode',
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Pay Amount',
      dataIndex: 'payment_amount',
      key: 'payment_amount',
    },
    {
      title: 'Pay For',
      dataIndex: 'payment_option',
      key: 'payment_option',
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (text: string, record: any) => (
        <Link to={`/class/checkpoint?learnNo=${record.gen_learn_no}`}>Go to Course</Link>
      ),
    },

  ];

  return (
    <>
      <Form {...layout} form={form} onFinish={onFinish}>
        <Form.Item label="Payment Number" name="paymentNo">
          <Input />
        </Form.Item>
        <Form.Item label="Receipt Date" name="receiptDate" tooltip="format YYYY-MM-DD"
          rules={[{ pattern: /^\d{4}-\d{2}-\d{2}$/, message: 'Please enter value in format YYYY-MM-DD!', }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="First Name" name="firstName">
          <Input />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName">
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={dataPayment} columns={columns} scroll={{ y: 480 }} pagination={{ pageSize: 20 }} />
    </>

  );
};

export default PaymentSearch