import React, { useState, useEffect, useContext, useRef } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table, DatePicker, Descriptions, Layout, Space } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';
import { saveNewCourse, getProfileUserCode, getProfilelearn } from './../services/profile.service'
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router'

type Props = {
    learnNo: string
}

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
    key: string;
    learnDate: string;
    startTime: string;
    endTime: string;
    note: string;
}

interface EditableRowProps {
    index: number;
}

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

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    datepicker: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => {
        //save to db
    } //void;
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

interface DataType {
    key: React.Key;
    learnDate: string;
    startTime: string;
    endTime: string;
    note: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

/** FC Component */
const PupilLearnCheckPointPaege: React.FC<Props> = (props: Props) => {
    const location = useLocation();
    let history = useHistory()
    const queryParams = new URLSearchParams(location.search);
    const learnNo = queryParams.get('learnNo') ?? props.learnNo

    const [count, setCount] = useState(0);
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const handleDelete = (key: React.Key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: 'Date',
            dataIndex: 'learnDate',
            width: '30%',
            editable: true,
        },
        {
            title: 'Start',
            dataIndex: 'startTime',
            editable: true,
        },
        {
            title: 'End',
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
            // render: (_, record: { key: React.Key }) =>
            //     dataSource.length >= 1 ? (
            //         <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            //             <a>Delete</a>
            //         </Popconfirm>
            //     ) : null,
        },
    ];


    const handleAdd = () => {
        // const newData: DataType = {
        //     key: count,
        //     // name: `Edward King ${count}`,
        //     // age: '32',
        //     // address: `London, Park Lane no. ${count}`,
        // };
        // setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleSave = (row: DataType) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });


    return (
        <Layout>
            <Layout.Header className="site-layout-background" style={{ padding: '0 10px' }}>
                <div className="container">
                    <Button type="primary" onClick={() => {
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
                        <Descriptions.Item label="User Code">N/A</Descriptions.Item>
                        <Descriptions.Item label="Course Running No">${props.learnNo}</Descriptions.Item>
                        <Descriptions.Item label="Detail">
                            No. of booking / Time
                        </Descriptions.Item>
                    </Descriptions>
                </div>
                <br />
                <br />
                <div>
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