import React, { useState } from 'react';
import { Table, Form, Input, Button } from 'antd';
import { searchProfile } from './../services/profile.service'
import { datetimeConvertToDB } from './../services/utils'
import { Link } from 'react-router-dom';

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

const PupilSearch = () => {
  const [form] = Form.useForm();
  const [searchResults, setSearchResults] = useState([]);

  const [data, setData] = useState<any[]>([]);

  const onFinish = async (values) => {
    console.log('Search criteria:', values);
    // Perform search using values.codeNumber, values.firstName, etc.
    // Set searchResults using setSearchResults
    let persons = await searchProfile(values)
    console.log(persons)
    setData(persons)
  };

  const columns = [
    {
      title: 'Registration Date',
      dataIndex: 'register_date',
      key: 'register_date',
      render: (_) => datetimeConvertToDB(_)
    },
    {
      title: 'Code Number',
      dataIndex: 'usercode',
      key: 'usercode',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text: string, record: any) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: 'Info',
      key: 'actions',
      render: (text: string, record: any) => (
        <Link to={`/profile?codeNumber=${record.usercode}`}>
          <Button type="primary">View Details</Button>
        </Link>
      ),
    },

  ];

  return (
    <>
      <Form {...layout} form={form} onFinish={onFinish}>
        <Form.Item label="Code Number" name="codeNumber">
          <Input />
        </Form.Item>
        <Form.Item label="First Name" name="firstName">
          <Input />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName">
          <Input />
        </Form.Item>
        <Form.Item label="Nick Name" name="nickName">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email"
          rules={[{ pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Please enter a valid email address!', }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Phone Number" name="phoneNumber"
          rules={[
            { pattern: /^(02\d{7}|0\d{9})$/, message: 'Please enter a valid phone no!', }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={data} columns={columns} scroll={{ y: 480 }} pagination={{ pageSize: 20 }} />
    </>

  );
};

export default PupilSearch