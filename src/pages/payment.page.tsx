import React, { useState, useEffect } from 'react';
import { Layout, Modal, Form, Input, DatePicker, Select, Button, Steps, InputNumber, Divider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBahtSign } from '@fortawesome/free-solid-svg-icons';
//import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { getPaymentOption } from './../services/profile.service'
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router'

interface OptionType {
    name: string;
}
const { Option } = Select;

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
    paymentNo: string;
    usercode: string;
    firstName: string;
    lastName: string;
    receiptDate: string;
    paymentOption: string;
    paymentAmount: string;
    totalAmount: string;
    payee: string;
}


const PaymentPage: React.FC = () => {
    const location = useLocation();
    let history = useHistory()
    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState<FormValues>({
        paymentNo: '',
        usercode: '',
        firstName: '',
        lastName: '',
        receiptDate: '',
        paymentOption: '',
        paymentAmount: '',
        totalAmount: '',
        payee: '',
    });

    //*** Begin: Handle selection drop down */
    const [options, setOptions] = useState<OptionType[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const data = await getPaymentOption() //fetch('http://example.com/api/student-types');
                setOptions(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOptions();
    }, [])

    const handleSubmit = (values: FormValues) => {
        setFormValues(values);
        setCurrentStep(2)
        //setModalCreateVisible(true)
    };

    const generatePaymentCode = async () => {
        const currentYear = new Date().getFullYear().toString().substr(-2);
        const currentMonth = ('0' + (new Date().getMonth() + 1).toString()).substr(-2);
        const currentDay = `0${new Date().getDate()}`.slice(-2);
        const _codeNumber = `${currentYear}${currentMonth}${currentDay}PAY${Math.random().toString(10).substr(2, 3).toUpperCase()}`
        let _formValues = { ...formValues };
        _formValues.paymentNo = _codeNumber
        setFormValues(_formValues);
        form.setFieldsValue({ paymentNo: _formValues.paymentNo });
    }

    const [currentStep, setCurrentStep] = useState(1);

    return (
        <div style={{ padding: '20px 10px' }}>
            <Steps
                size="small"
                current={currentStep}
                items={[
                    {
                        title: 'Payment Info',
                    },
                    {
                        title: 'Pay & Receive',
                    },
                    {
                        title: 'Receipt View',
                    },
                    {
                        title: 'Receipt Print',
                    },
                    {
                        title: 'Waiting',
                    },
                    {
                        title: 'Email Sent',
                    },
                ]}
            />
            <br />
            <br />
            <br />
            { currentStep == 1  && (
            <Form {...layout} form={form} name="paymentForm" onFinish={handleSubmit}>
                <Form.Item
                    label="Payment Running No."
                    name="paymentNo"
                    rules={[{ required: false, message: 'Please input payment no.!' }]}
                >
                    <Input value={formValues.paymentNo} disabled /> {/* disabled */}
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" onClick={generatePaymentCode}>
                        Generate Payment No.
                    </Button>
                </Form.Item>

                <Form.Item
                    label="User Code"
                    name="usercode"
                    rules={[{ required: false, message: 'Please input user code!' }]}
                >
                    <Input />
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
                    label="Receipt Date"
                    name="receiptDate"
                    rules={[{ required: true, message: 'Please input the receipt date!' }]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    label="Payment Option"
                    name="paymentOption"
                    rules={[{ required: true, message: 'Please input the payment option!' }]}
                >
                    {/* <Input /> */}
                    <Select
                        placeholder="Select option"
                        loading={loading}
                    >
                        {options && options.map((option) => (
                            <Option key={option.name} value={option.name}>{option.name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="paymentAmount"
                    label="Amount" rules={[{ type: 'number', min: 0, max: 9999999 }]}>
                    <InputNumber /> <FontAwesomeIcon icon={faBahtSign} />
                </Form.Item>

                <Divider />

                <Form.Item name="totalAmount"
                    label="Total Amount" >
                    <InputNumber /> <FontAwesomeIcon icon={faBahtSign} />
                </Form.Item>

                <Form.Item
                    label="Payee"
                    name="payee"
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Pay receive
                    </Button>
                </Form.Item>
            </Form>
            )}

            { currentStep == 2  && ( 
                    <Button type="primary" htmlType="submit">
                        View Receipt
                    </Button>) }
        </div>
    )
}

export default PaymentPage