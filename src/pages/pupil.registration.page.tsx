import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Modal, Form, Input, DatePicker, Select, Button } from 'antd';
import { getProfileUserCode, getMaxUserCode, saveNewProfile, getStudentType } from './../services/profile.service'
import { useHistory } from 'react-router'
// type Props = {
//     grabOrderId: string
// }
// props: Props

interface OptionType {
    name: string;
}

const { Option } = Select;
const { Content } = Layout
const { TextArea } = Input;

interface FormValues {
    registrationDate: string;
    codeNumber: string;
    firstName: string;
    lastName: string;
    nickName: string;
    educationName: string;
    educationGrade: string;
    email: string;
    facebook: string;
    birthDate: string;
    studentType: string;
    note: string;
    address: string;
    tel: string;
    telEmergency: string;
    parentName: string;
}


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

const PupilRegistration = () => {
    let history = useHistory()
    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState<FormValues>({
        registrationDate: '',
        codeNumber: '',
        firstName: '',
        lastName: '',
        nickName: '',
        educationName: '',
        educationGrade: '',
        email: '',
        facebook: '',
        birthDate: '',
        studentType: '',
        note: '',
        address: '',
        tel: '',
        telEmergency: '',
        parentName: ''
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [modalCreateVisible, setModalCreateVisible] = useState(false);

    const handleSubmit = (values: FormValues) => {
        setFormValues(values);
        setModalCreateVisible(true)
    };

    const generateCodeNumber = async () => {
        const currentYear = new Date().getFullYear().toString().substr(-2);
        const max_usercode = await getMaxUserCode(currentYear) //console.log(max_usercode) // emtry is []
        let new_usercode = max_usercode.length == 0 ? 1 : Number(max_usercode[0].usercode) +1
        if(new_usercode === 1){
            new_usercode = Number(`${currentYear}000${new_usercode}`)
        }
        let _codeNumber = String(new_usercode)   //const _codeNumber = `${currentYear}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;  //const codeNumber = `${currentYear}${Number(0.09133335960023081).toString(36).substr(2, 6).toUpperCase()}`;
        
        const person = await getProfileUserCode(_codeNumber) //console.log(person)
        if (!person?.usercode) {
            let _formValues = { ...formValues };
            _formValues.codeNumber = _codeNumber
            setFormValues(_formValues);
            //console.log('_formValues')
            //console.log(_formValues)
            form.setFieldsValue({ codeNumber: _formValues.codeNumber });
        } else {
            setModalVisible(true);
        }
    };

    //*** Begin: Handle selection drop down */
    const [options, setOptions] = useState<OptionType[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const data = await getStudentType() //fetch('http://example.com/api/student-types');
                setOptions(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOptions();
    }, []);


    return (
        <>
            <Form {...layout} form={form} onFinish={handleSubmit}>

                <Form.Item
                    label="Registration Date"
                    name="registrationDate"
                    rules={[{ required: true, message: 'Please input the registration date!' }]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    label="Code Number"
                    name="codeNumber"
                    rules={[{ required: false, message: 'Please input code number!' }]}
                >
                    <Input value={formValues.codeNumber} disabled/> {/* disabled */}
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" onClick={generateCodeNumber}>
                        Generate Code Number
                    </Button>
                </Form.Item>

                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please input the first name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please input the last name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Nick Name"
                    name="nickName"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Education Name"
                    name="educationName"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Education Grade"
                    name="educationGrade"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input the email!' }
                        , { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Please enter a valid email address!', }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Facebook"
                    name="facebook"
                    rules={[{ required: false, message: 'Please input the Facebook profile!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Birth Date"
                    name="birthDate"
                    rules={[{ required: true, message: 'Please input the birth date!' }]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Student Type"
                    name="studentType"
                    rules={[{ required: true, message: 'Please input the pupil type!' }]}
                >
                    {/* <Input /> */}
                    <Select
                        placeholder="Select a student type"
                        loading={loading}
                    >
                        {options && options.map((option) => (
                            <Option key={option.name} value={option.name}>{option.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Note" name="note">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Address" name="address">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="Tel"
                    name="tel"
                    rules={[
                        { pattern: /^(02\d{7}|0\d{9})$/, message: 'Please enter a valid phone no!', }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tel of Emergency"
                    name="telEmergency"
                    rules={[
                        { pattern: /^(02\d{7}|0\d{9})$/, message: 'Please enter a valid phone no!', }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Parent Name"
                    name="parantName"
                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                title="Code Number Generated"
                open={modalVisible}
                closable={false}
                footer={true}
                onOk={() => {
                    setModalVisible(false)
                    let _formValues = { ...formValues };
                    _formValues.codeNumber = ''
                    setFormValues(_formValues)
                }}
            // onCancel={() => setModalVisible(false)}
            >
                <p>The code number has been generated and already exists. Please refresh new one.</p>
            </Modal>
            <Modal
                title="Pubil created is done"
                open={modalCreateVisible}
                closable={false}
                onOk={async () => {
                    setModalCreateVisible(false)
                    //Sent data to API
                    await saveNewProfile(formValues)
                    console.log(`go to /profile?codeNumber=${formValues.codeNumber}`)
                    history.push(`/profile?codeNumber=${formValues.codeNumber}`)
                }}
            >
                <p>Congratuation for new pubil at Davinci Studio</p>
                <h1>{formValues.codeNumber}</h1>
                <Button type="primary" onClick={() => { navigator.clipboard.writeText(formValues.codeNumber); }}>
                    Copy to Clipboard
                </Button>
            </Modal>
        </>
    )
}

export default PupilRegistration