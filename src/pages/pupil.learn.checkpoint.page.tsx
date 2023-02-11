import React, { useState, useEffect, useContext, useRef } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table, DatePicker, Descriptions, Layout, message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';
import { getCheckpointlearn, getProfilelearn, saveOrUpdateCheckpoint ,removeCheckpoint} from './../services/profile.service'
import { convertUTCDateTimeToBangkokLocalTime } from './../services/utils'
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router'

type Props = {
    learnNo: string
}

//This is a React context that provides access to the current form instance. The form instance is used to manage the form data and validate the inputs
const EditableContext = React.createContext<FormInstance<any> | null>(null);

//interface: This interface defines the structure of the data items that are displayed in the table
interface Item {
    key: string;
    learnDate: string;
    startTime: string;
    endTime: string;
    note: string;
    needUpdate: boolean;
}

//############## ROW COMPONENT #####################
//interface: This interface defines the properties that are passed to the EditableRow component. The only property is the index of the row in the table.
interface EditableRowProps {
    index: number;
}

//component: This component wraps a table row and provides access to the form instance using the EditableContext. The component uses the Form.useForm() hook to create a new form instance and render it using the Form component.
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

//############## CELL COMPONENT #####################
//interface: This interface defines the properties that are passed to the EditableCell component. The properties include the title of the column, the editable status of the cell, the children to be displayed in the cell, the dataIndex that corresponds to the data item's property, the record that contains the data item, and the handleSave function that is called when the data is saved.
interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    datepicker: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    datepicker,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    //const datePickerRef = useRef<typeof DatePicker>(null);
    const datePickerRef = useRef<any>(null); //const instance = datePickerRef.current;
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            console.log(`Edit values ${values} dataIndex ${dataIndex} record ${record}`);
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        if (datepicker) {
            childNode = editing ?
                (
                    <Form.Item
                        style={{ margin: 0 }}
                        name={dataIndex}
                        rules={[
                            {
                                required: true,
                                message: `${title} is required.`,
                            },
                        ]}
                    >
                        <DatePicker ref={datePickerRef} onChange={save} />
                        {/* <Input ref={inputRef} onPressEnter={save} onBlur={save} /> */}
                    </Form.Item>
                ) : (
                    <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                        {children}
                    </div>
                );
        } else {
            childNode = editing ?
                (
                    <Form.Item
                        style={{ margin: 0 }}
                        name={dataIndex}
                        rules={[
                            {
                                required: true,
                                message: `${title} is required.`,
                            },
                        ]}
                    >
                        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                    </Form.Item>
                ) : (
                    <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                        {children}
                    </div>
                );
        }

    }

    return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

//####################### TABLE COMPONENT ############################

interface DataType {
    key: React.Key;
    learnDate: string;
    startTime: string;
    endTime: string;
    note: string;
    needUpdate: boolean;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

/** FC Component */
const PupilLearnCheckPointPaege: React.FC<Props> = (props: Props) => {
    const location = useLocation();
    let history = useHistory()
    const queryParams = new URLSearchParams(location.search);
    const learnNo = queryParams.get('learnNo') ?? props.learnNo

    const [count, setCount] = useState(0); //Row no
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [form] = Form.useForm();
    const [profile, setProfile] = useState<any>();

    useEffect(() => {
        console.log('useEffect learnNo', learnNo);

        //async anonymous function
        (async (learnNo) => {
            const learn = await getProfilelearn(learnNo)
            console.log('learn', learn)
            setProfile(learn)

            getCheckpointlearn(learnNo).then((res) => {
                console.log('getCheckpointlearn res ', res)
                let newDatas: DataType[] = [];
                res.forEach((item, index) => {
                    let newData: DataType = {
                        key: item.seq,
                        learnDate: convertUTCDateTimeToBangkokLocalTime(item.learned_date),
                        startTime: item.start_time,
                        endTime: item.end_time,
                        note: item.learned_date, //item.note,
                        needUpdate: false,
                    };
                    newDatas.push(newData);

                })
                //get last row of newDatas
                let lastRow = newDatas[newDatas.length - 1];
                setCount(Number(lastRow['key']))
                setDataSource([...newDatas]);
            })
        })(learnNo)

    }, [learnNo])


    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; datepicker?: boolean; dataIndex: string })[] = [
        // {
        //     title: 'Key',
        //     dataIndex: 'key',
        // },
        {
            title: 'Learn Date (YYYY-MM-DD)',
            dataIndex: 'learnDate',
            width: '30%',
            editable: true,
            //datepicker: true,
        },
        {
            title: 'Start Time (HH:MM)',
            dataIndex: 'startTime',
            editable: true,
        },
        {
            title: 'End Time (HH:MM)',
            dataIndex: 'endTime',
            editable: true,
        },
        {
            title: 'Note',
            dataIndex: 'note',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record: {}, idx: number) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Confirm to update?" onConfirm={async () => {
                        //alert(idx) alert(JSON.stringify(record) )
                        message.loading({ content: 'Updating...', key: 'updatable' })
                        await saveOrUpdateCheckpoint(record, learnNo, profile?.usercode)
                        message.success({ content: 'Saved!', key: 'updatable', duration: 2 });
                    }}>
                        <a>Update</a>
                    </Popconfirm>
                ) : null,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record: {}, idx: number) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={ async() => {
                        message.loading({ content: 'Deleting...', key: 'deletable' })
                        await removeCheckpoint(record, learnNo, profile?.usercode)
                        message.success({ content: 'Deleted!', key: 'deletable', duration: 2 });
                        handleDelete(record['key'])
                    }}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        }
    ];

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                //datepicker: col.datepicker,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });



    const handleDelete = (key: React.Key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const handleAdd = () => {
        const newData: DataType = {
            key: (count + 1),
            learnDate: convertUTCDateTimeToBangkokLocalTime((new Date()).toISOString()), //'2023-01-01',
            startTime: '00:00',
            endTime: '00:00',
            note: 'Note...',
            needUpdate: true,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleSave = (row: DataType) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        //alert('will save on index ' + index)
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };




    return (
        <Layout className="site-layout-background">
            <Layout.Header className="site-layout-background" style={{ padding: '0 10px' }}>
                <div className="container">
                    <Button type="primary" shape='round' onClick={() => {
                        window.history.back()
                    }}
                        icon={<LeftOutlined />}
                    >
                        Go Back
                    </Button>
                </div>
            </Layout.Header>

            <Layout.Content style={{ padding: '4px 10px' }} >
                <div>
                    <Descriptions title="User Info" bordered size="small" column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                        <Descriptions.Item label="User Code">{profile?.usercode}</Descriptions.Item>
                        <Descriptions.Item label="Course Running No">{props.learnNo}</Descriptions.Item>
                        <Descriptions.Item label="No. of booking / Time">
                            {profile?.class_booking_total} time(s) / {profile?.class_booking_duration_time} hour(s)
                        </Descriptions.Item>
                    </Descriptions>
                </div>
                <br />
                <br />
                <div>
                     {/* [ current count is {count}] */}
                    <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
                        Add a row
                    </Button>
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns as ColumnTypes}
                    />
                </div>
            </Layout.Content>
        </Layout>
    )
}
export default PupilLearnCheckPointPaege