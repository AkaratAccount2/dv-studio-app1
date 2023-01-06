import React, { useState } from 'react';
import { Table, Form, Input, Button, Select } from 'antd';
import { searchProfile, searchCourse } from './../services/profile.service'
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

const PupilLearnSearch = () => {
  const [form] = Form.useForm();
  const [searchResults, setSearchResults] = useState([]);

  const [dataLearn, setDataLearn] = useState<any[]>([]);

  const onFinish = async (values) => {
    console.log('Search criteria:', values);
    // Perform search using values.codeNumber, values.firstName, etc.
    // Set searchResults using setSearchResults
    let learns = await searchCourse(values)
    console.log(learns)
    setDataLearn(learns)
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Code Number',
      dataIndex: 'usercode',
      key: 'usercode',
    },
    {
      title: 'Course Running No.',
      dataIndex: 'gen_learn_no',
      key: 'gen_learn_no',
    },
    {
      title: 'Course Day / Time',
      dataIndex: 'class_primary_day',
      key: 'class_primary_day',
      render: (text: string, record: any) => {
        console.log('Course Day / Time')
        console.log(record.length)
        if (!dataLearn || dataLearn.length === 0) {
          return <p>No data to display</p>;
        } else {
          return `${record.class_primary_day} / ${record.class_time}`
        }
      }
    },
    {
      title: 'Begin Date',
      dataIndex: 'class_start_date',
      key: 'class_start_date',
      render: (_) => datetimeConvertToDB(_)
    },
    {
      title: 'No. of Booking / Hour(s)',
      dataIndex: 'class_booking_total',
      key: 'class_booking_total',
      render: (text: string, record: any) => {
        if (!dataLearn || dataLearn.length === 0) {
          return <p>No data to display</p>;
        } else {
          return `${record.class_booking_total} / ${record.class_booking_duration_time} hour(s)`
        }
      }
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (text: string, record: any) => (
        <Link to={`/class/checkpoint?learnNo=${record.gen_learn_no}`}>Check Point</Link>
      ),
    },

  ];

  return (
    <>
      <Form {...layout} form={form} onFinish={onFinish}>
        <Form.Item label="Code Number" name="codeNumber">
          <Input />
        </Form.Item>
        <Form.Item label="Course Running Number" name="learnNo">
          <Input />
        </Form.Item>
        <Form.Item label="Begin Date" name="startDate" tooltip="format YYYY-MM-DD"
          rules={[{ pattern: /^\d{4}-\d{2}-\d{2}$/, message: 'Please enter value in format YYYY-MM-DD!', }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Class Day" name="primaryDay">
          <Select
            placeholder="Select a day"
            loading={false}
          >
            {dayOptions && dayOptions.map((option) => (
              <Option key={option.DAY} value={option.DAY}>{option.DAY}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={dataLearn} columns={columns} scroll={{ y: 480 }} pagination={{ pageSize: 20 }} />
    </>

  );
};

export default PupilLearnSearch