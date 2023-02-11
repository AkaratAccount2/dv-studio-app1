import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Badge, Descriptions, Layout, Button } from 'antd';
import { Link } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router'
import { getProfileUserCode, getProfileAlllearn } from './../services/profile.service';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
//   name: string;
//   age: number;
//   address: string;
}

type Props = {
    codeNumber: string
}

function isNull(value) {
    return value === null;
}

function isUndefined(value) {
    return typeof value === 'undefined';
}

function isNullEmptry(value) {
    return isNull(value) || isUndefined(value) || value.length === 0;
}
const defaultEmptryValue = (value) => {
    return isNullEmptry(value) ? 'N/A' : value
}
const datetimeConvertToDB = (dateTimeString) => {
    //const dateTimeString = '2023-01-05T04:44:04.333Z';

    const date = new Date(dateTimeString); // that convert to date with locale timezone
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    const formattedDateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    console.log(formattedDateTimeString); // Output: "2023-01-05 04:44:04"
    return formattedDateTimeString
}

/** Entry Component by pass component Prop or Path URL of codeNumber parameter  */
const PersonProfilePage: React.FC<Props> = (props: Props) => {
    const location = useLocation();
    let history = useHistory()
    const queryParams = new URLSearchParams(location.search);
    const codeNumber = queryParams.get('codeNumber') ?? props.codeNumber
    const [dataLearn, setDataLearn] = useState<any[]>([]);
    const [dataPerson, setDataPeeson] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getProfileUserCode(codeNumber);
            console.log(`PersonProfilePage load&set datasource  ${response}`)
            console.log(response)
            setDataPeeson([response]);

            const response2 = await getProfileAlllearn(codeNumber);
            console.log(`LearnProfilePage load&set datasource  ${response2}`)
            console.log(response2)
            setDataLearn(response2);
        };
        fetchData();
    }, []);

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
        <Layout className="site-layout-background">
            <Layout.Header className="site-layout-background"  style={{ padding: '0 10px' }}>
                <div className="container">
                    <Button type="primary" shape="round" onClick={() => {
                        window.history.back()
                    }}
                        icon={<LeftOutlined />}
                    >
                        Go Back
                    </Button>
                </div>
            </Layout.Header>

            <Layout.Content style={{ padding: '4px 10px' }} >
                <Descriptions title="Course List" layout="vertical" bordered>
                </Descriptions>
                <div className="div_container">
                    <Button className="div_button" onClick={() => { history.push(`/profile/course/create?usercode=${dataPerson[0].usercode}`) }} type="primary" style={{ marginBottom: 16 }}>  {/* handleAdd */}
                        New Course
                    </Button>
                    <Table dataSource={dataLearn} columns={columns}
                        scroll={{ x: 240, y: 240 }} pagination={{ pageSize: 20 }} />
                </div>

                {/* { String(data[0].nick_name).trim()==""?"":"("+data[0].nick_name+")" } */}
                {dataPerson[0] &&
                    <Descriptions title="Pupil Info" layout="vertical" bordered>
                        <Descriptions.Item label="Code Number / User Code" >{dataPerson[0].usercode}</Descriptions.Item>
                        <Descriptions.Item label="Name">{dataPerson[0].first_name + ' ' + dataPerson[0].last_name}  {String(dataPerson[0].nick_name).trim() == "" ? "" : "(" + dataPerson[0].nick_name + ")"} </Descriptions.Item>
                        <Descriptions.Item label="Registered Date">{datetimeConvertToDB(dataPerson[0].register_date)}</Descriptions.Item>
                        <Descriptions.Item label="Birth Date">{datetimeConvertToDB(dataPerson[0].birth_date)}</Descriptions.Item>
                        <Descriptions.Item label="Email" span={2}>
                            {dataPerson[0].email}
                        </Descriptions.Item>
                        <Descriptions.Item label="User Type" span={3}>
                            <Badge status="processing" text={dataPerson[0].person_type} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Telphone">{defaultEmptryValue(dataPerson[0].tel)}</Descriptions.Item>
                        <Descriptions.Item label="Parent" span={2}>
                            {defaultEmptryValue(dataPerson[0].parent_name)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Address" span={3}>
                            {dataPerson[0].address}
                        </Descriptions.Item>
                        <Descriptions.Item label="Note" span={3}>
                            {dataPerson[0].note}
                        </Descriptions.Item>
                        <Descriptions.Item label="Facebook" >{defaultEmptryValue(dataPerson[0].facebook)}</Descriptions.Item>
                        <Descriptions.Item label="Eduction" >{defaultEmptryValue(dataPerson[0].education_name)}</Descriptions.Item>
                        <Descriptions.Item label="Grade" >{defaultEmptryValue(dataPerson[0].education_grade)}</Descriptions.Item>

                    </Descriptions>
                }
            </Layout.Content>
        </Layout>
    );
};

export default PersonProfilePage;

{/* <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
        <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
        <Descriptions.Item label="Config Info">
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
          <br />
        </Descriptions.Item> */}
