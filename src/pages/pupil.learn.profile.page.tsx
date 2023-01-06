import React, { useState, useEffect } from 'react';
import { Layout, Modal, Form, Input, DatePicker, Select, Button, Slider ,InputNumber} from 'antd';
import { saveNewCourse ,getProfileUserCode ,getProfilelearn} from './../services/profile.service'
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router'

type Props = {
    usercode: string
}

const { Option } = Select;
const { Content } = Layout
const { TextArea } = Input;

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

interface FormValues {
    usercode: string;
    learnNo: string;
    primaryDay: string;
    time: string;
    startDate: string;
    bookingTotal: string;
    bookingDurationTime: string;
}

interface Time {
    time: string;
}

const PupilLearnProfilePaege: React.FC<Props> = (props: Props) => {
    const location = useLocation();
    let history = useHistory()
    const queryParams = new URLSearchParams(location.search);
    const usercode = queryParams.get('usercode') ?? props.usercode

    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState<FormValues>({
        usercode: usercode,
        learnNo: '',
        primaryDay: '',
        time: '',
        startDate: '',
        bookingTotal: '',
        bookingDurationTime: ''
    });

    const [modalCreateVisible, setModalCreateVisible] = useState(false);
    const [modalError1Visible, setModalError1Visible] = useState(false);
    const [modalError2Visible, setModalError2Visible] = useState(false);
    const handleSubmit = async(values: FormValues) => {
        setFormValues(values);
        let valid_usercode = true
        const person = await getProfileUserCode(values.usercode)
        if (!person?.usercode) {
            valid_usercode = false
        }
        let valid_learn_no = true
        const learn = await getProfilelearn(values.learnNo)
        if (learn?.usercode) {
            valid_learn_no = false
        }

        if(valid_usercode && valid_learn_no){
            setModalCreateVisible(true)
        }else{
            if(!valid_usercode)
                setModalError1Visible(true)
            else if(!valid_learn_no)
                setModalError2Visible(true)
        }
        
    };
    const generateCodeNumber = async () => {
        const currentYear = new Date().getFullYear().toString().substr(-2);
        const currentMonth = ('0' + (new Date().getMonth() + 1).toString()).substr(-2);
        const currentDay = `0${new Date().getDate()}`.slice(-2); //new Date().getDate().toString().substr(-2);
        const _codeNumber = `${currentYear}${currentMonth}${currentDay}CR${Math.random().toString(10).substr(2, 3).toUpperCase()}`;
        let _formValues = { ...formValues };
        _formValues.learnNo = _codeNumber
        setFormValues(_formValues);
        form.setFieldsValue({ learnNo: _formValues.learnNo });
    }
    const dayOptions = [
        { "DAY": "MON" },
        { "DAY": "TUE" },
        { "DAY": "WED" },
        { "DAY": "THR" },
        { "DAY": "FRI" },
        { "DAY": "SAT" },
        { "DAY": "SUN" }
    ]
    //const [loading, setLoading] = useState(false);


    const createTimeList = (): Time[] => {
        const timeList: Time[] = [];

        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 4; j++) {
                const time = `${i.toString().padStart(2, '0')}:${(j * 15).toString().padStart(2, '0')}`;
                timeList.push({ time });
            }
        }

        return timeList;
    };
    const [times, setTimes] = useState(createTimeList());
    const [durationTimeValue, setDurationTimeValue] = useState(0);
    const [bookingDayValue, setBookingDayValue] = useState(0);

    const onChange = (newValue: number) => {
        setDurationTimeValue(newValue);
        form.setFieldsValue({ bookingDurationTime: newValue });
    };

    const onChangeDay = (newValue: number) => {
        setBookingDayValue(newValue);
        form.setFieldsValue({ bookingTotal: newValue });
    };

    useEffect(() => {
        console.log('Mount PupilLearnProfilePaege')
        form.setFieldsValue({ usercode: usercode })
    },[])

    return (
        <>
            <Form {...layout} form={form} onFinish={handleSubmit}>
                <Form.Item
                    label="Code Number"
                    name="usercode"
                    rules={[{ required: false, message: 'Please input code number!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Course Running Number"
                    name="learnNo"
                >
                    <Input value={formValues.learnNo} disabled /> {/* disabled */}
                    <Button type="primary" onClick={generateCodeNumber}>
                        Generate Course Running Number
                    </Button>
                </Form.Item>

                <Form.Item
                    label="Class Day"
                    name="primaryDay"
                    rules={[{ required: true, message: 'Please input the day of class!' }]}
                >
                    <Select
                        placeholder="Select a day"
                        loading={false}
                    >
                        {dayOptions && dayOptions.map((option) => (
                            <Option key={option.DAY} value={option.DAY}>{option.DAY}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Class Time"
                    name="time"
                    rules={[{ required: true, message: 'Please input the time of class!' }]}
                >
                    <Select
                        placeholder="Select a time"
                        loading={false}
                    >
                        {times && times.map((option) => (
                            <Option key={option.time} value={option.time}>{option.time}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Begin Date"
                    name="startDate"
                    rules={[{ required: true, message: 'Please input the date of course begining!' }]}
                >
                    <DatePicker showTime={false} />
                </Form.Item>

                <Form.Item
                    label="No. of day(s)"
                    name="bookingTotal"
                    rules={[{ required: true, message: 'Please slide to get value!' }]}
                >
                     <Slider
                        min={1}
                        max={10}
                        onChange={onChangeDay}
                        value={typeof bookingDayValue === 'number' ? bookingDayValue : 0}
                    />
                    <InputNumber
                        min={1}
                        max={20}
                        style={{ margin: '0 16px' }}
                        value={bookingDayValue}
                    /> Day(s)
                </Form.Item>

                <Form.Item
                    label="Duration Time"
                    name="bookingDurationTime"
                    rules={[{ required: true, message: 'Please slide to get value!' }]}
                >
                    <Slider
                        min={1}
                        max={10}
                        onChange={onChange}
                        value={typeof durationTimeValue === 'number' ? durationTimeValue : 0}
                    />
                    <InputNumber
                        min={1}
                        max={20}
                        style={{ margin: '0 16px' }}
                        value={durationTimeValue}
                    /> Hour(s)
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Create Course
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                title="New course is done"
                open={modalCreateVisible}
                closable={false}
                onOk={async () => {
                    setModalCreateVisible(false)
                    //Sent data to API
                    await saveNewCourse(formValues)
                    //console.log(`go to /profile?codeNumber=${formValues.codeNumber}`)
                    history.push(`/profile?codeNumber=${formValues.usercode}`)
                }}
            >
                <p>Congratuation for new course at Davinci Studio</p>
                <h1>User Code : {formValues.usercode}</h1>
                <h1>Course Running No : {formValues.learnNo}</h1>
                <Button type="primary" onClick={() => { navigator.clipboard.writeText(formValues.learnNo); }}>
                    Copy Course Running No to Clipboard
                </Button>
            </Modal>
            <Modal
                title="Error!!!"
                open={modalError1Visible}
                closable={false}
                onOk={async () => {
                    setModalError1Visible(false)
                }}
            >
                <p>Your user code is wrong ,please use an other value</p>
                <h1>User Code : {formValues.usercode}</h1>
            </Modal>
            <Modal
                title="Error!!!"
                open={modalError2Visible}
                closable={false}
                onOk={async () => {
                    setModalError2Visible(false)
                }}
            >
                <p>Your course running number is exists ,please create a new value</p>
                <h1>Course Running Number : {formValues.learnNo}</h1>
            </Modal>
        </>
    )
}

export default PupilLearnProfilePaege