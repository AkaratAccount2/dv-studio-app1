import React, { useState, useEffect, useRef } from 'react';
import { Layout, Modal, Form, Input, DatePicker, Select, Button, Steps, InputNumber, Divider, Collapse, Alert, Space, Spin, Result } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBahtSign } from '@fortawesome/free-solid-svg-icons';
//import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { getPaymentOption,  sendReceiptMailWithoutFile, saveNewPayment } from './../services/profile.service'
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router'
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import * as _jspdf from 'jspdf';
import ReceiptDocument from './../components/payment.receipt';
import AWS from 'aws-sdk'
import { buffer } from 'stream/consumers';

interface OptionType {
    name: string;
}
const { Option } = Select;
const { Panel } = Collapse;

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
    userCode: string;
    firstName: string;
    lastName: string;
    receiptDate: string;
    paymentOption: string;
    paymentAmount: Number;
    totalAmount: Number;
    payee: string;
    emailTo: string;
}


const PaymentPage: React.FC = () => {
    const location = useLocation();
    let history = useHistory()
    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState<FormValues>({
        paymentNo: '',
        userCode: '',
        firstName: '',
        lastName: '',
        receiptDate: '',
        paymentOption: '',
        paymentAmount: 0,
        totalAmount: 0,
        payee: '',
        emailTo: ''
    });
    const [currentStep, setCurrentStep] = useState<number>(1); //handle STEPs Component
    const documentRef = useRef<HTMLDivElement>(null);
    const [pdfDataBlob, setPdfDataBlob] = useState<Blob>(new Blob());

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
    }, [currentStep])

    /** STEP #1 */
    const generatePaymentCode = async () => {
        const currentYear = new Date().getFullYear().toString().substr(-2);
        const currentMonth = ('0' + (new Date().getMonth() + 1).toString()).substr(-2);
        const currentDay = `0${new Date().getDate()}`.slice(-2);
        const _codeNumber = `${currentYear}${currentMonth}${currentDay}PAY${Math.random().toString(10).substr(2, 3).toUpperCase()}`
        let _formValues = { ...formValues };
        _formValues.paymentNo = _codeNumber
        console.log(` _formValues.paymentNo: ${_formValues.paymentNo}`)
        setFormValues(_formValues);
        form.setFieldsValue({ paymentNo: _formValues.paymentNo });
    }

    const handleSubmit = (values: any) => {
        console.log('Received values of form: ', values);
        setFormValues(values);
        setCurrentStep(2)

        console.log(`Go to step : ${currentStep}`);
    };

    /** STEP #2 */
    const handlePrintOut = async (values: FormValues) => {
        //callComponentView();

        //Go to step 3
        callComponentPrint();
    };
    
    //Inside the component callComponentPrint()
    //function to save pdf to s3
    const addPdfToS3Bucket = async (pdfData: Blob, receiptFileName: string) => {
        //Go to step 3
        setCurrentStep(3);

        const S3_BUCKET ='dv-receipts';
        const REGION ='ap-southeast-1';
        //set BufferSize to 64MB
        const BUFFER_SIZE = 64 * 1024 * 1024;
        //set the AWS configuration using the access keys provided in the email you received

        AWS.config.update({
            accessKeyId: 'AKIAQHS4IHLX2QIJJGE3',
            secretAccessKey: '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'
            
        })

        const s3 = new AWS.S3({ 
            region: REGION,
            params: { Bucket: S3_BUCKET }   
        });

        const params = {
            Bucket: S3_BUCKET,
            Key: receiptFileName,
            Body: pdfData,
            ACL: 'public-read'
        };

        console.log(`Uploading ${receiptFileName} file to S3 bucket...`);
        s3.putObject(params)
        .on('httpUploadProgress', (evt) => {
            console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
            //setProgress(Math.round((evt.loaded / evt.total) * 100))
        })    
        .send((err) => {
            if (err) {
                console.log(err)
            }else{
                console.log('File uploaded successfully.')    
            }
        })

        //wait for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));

        //return s3.getSignedUrl('getObject', { Bucket: S3_BUCKET, Key: receiptFileName });
        return `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${receiptFileName}`;
    }

    function blobToArray(blob: Blob): BlobPart[] {
        const fileReader = new FileReader();
        const chunks: BlobPart[] = [];
        const chunkSize = 2097152; // 2 MB chunk sizes.
        const totalChunks = Math.ceil(blob.size / chunkSize);

        for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = start + chunkSize >= blob.size ? blob.size : start + chunkSize;
            chunks.push(blob.slice(start, end));
        }

        return chunks;
    }

    //Inside the component callComponentPrint()
    const savePaymentAndSendMail = async (pdfData: Blob, values: FormValues) => {
        
        //save payment to database
        await saveNewPayment(formValues)
        //wait 3 seconds
        await new Promise(resolve => setTimeout(resolve, 3000));

        //send it email
        await sendReceiptMailWithoutFile(values) //, pdfData ?? new Blob()
        setCurrentStep(4);
    }

    const sendHtmlData = async (htmlData: HTMLHtmlElement, values: FormValues) => {
        setCurrentStep(3)
        //save payment to database
        await saveNewPayment(formValues)
        //wait 3 seconds
        await new Promise(resolve => setTimeout(resolve, 3000));

        //send it email

        await sendReceiptMailWithoutFile(values ) //, htmlData==null?new HTMLHtmlElement():htmlData
        setCurrentStep(4);
    }

    //Hook service to print a document
    const callComponentPrint = useReactToPrint({
        content: () => documentRef.current,
        print: async (printIframe) => {
            const document = printIframe.contentDocument;
            if (document) {
                const html = document.getElementsByTagName("html")[0];
                console.log(html);

                html2canvas(html).then(async (canvas) => {
                    // You can use the canvas object to create an image, or you can convert it to a data URL.
                    const imgData = canvas.toDataURL('image/png');
                    // You can use the imgData in your project as you see fit.
                    var pdf = new _jspdf.default();
                    //pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
                    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, 'someAlias', 'FAST');
                    let savedPDF = pdf.save(formValues.paymentNo + '.pdf')
                    console.log('Image saved to pdf');

                    // //get pdf   
                    // let pdf2 = new _jspdf.default(); //_jspdf.default('p', 'pt', 'a4');
                    // pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, 'someAlias', 'FAST');//pdf2.addImage(imgData, 'PNG', 0, 0, 210, 297);
                    
                    let pdfData = savedPDF.output('blob');
                    console.log('set pdfData: ', pdfData);

                    //wait 3`s
                    console.log('wait 3 seconds');
                    await new Promise(resolve => setTimeout(resolve, 3000));

                    //add to S3 bucket
                    await addPdfToS3Bucket(pdfData, formValues.paymentNo + '.pdf')
                    await savePaymentAndSendMail(pdfData, formValues)
                    //await sendHtmlData(html, formValues);
                    //await sendBlobData(pdfData,formValues);

                    //const pdfData = pdf2.output('bloburi');
                    //const pdfData = pdf2.output('arraybuffer');
                    //const pdfData = pdf2.output('datauristring');
                    //const pdfData = pdf2.output('dataurlnewwindow');
                });

                //const exporter = new Html2Pdf(html,{filename:"Nota Simple.pdf"});
                //exporter.getPdf(true);
            }
        },
    });

    const onChangePaymentAmount = (value: any) => {
        console.log(`onChangePaymentAmount value: ${value}`)
        let _formValues = { ...formValues };
        _formValues.paymentAmount = value
        _formValues.totalAmount = value
        setFormValues(_formValues);
        form.setFieldsValue({ paymentAmount: _formValues.paymentAmount });
        form.setFieldsValue({ totalAmount: _formValues.totalAmount });
    }

    const onChangeTotalAmount = (value: any) => {
        console.log(`onChangeTotalAmount value: ${value}`)
        let _formValues = { ...formValues };
        _formValues.totalAmount = value
        setFormValues(_formValues);
        form.setFieldsValue({ totalAmount: _formValues.totalAmount });
    }

    const onChangeReceiptDate = (value: any, dateString: string) => {
        console.log(`onChangeReceiptDate value: ${dateString}`)
        let _formValues = { ...formValues };
        _formValues.receiptDate = dateString
        setFormValues(_formValues);
        form.setFieldsValue({ receiptDate: _formValues.receiptDate });
    }

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    const resetToNewOne = () => {
        setCurrentStep(1);
        setFormValues({
            paymentNo: '',  //generatePaymentCode(),
            userCode: '',
            firstName: '',
            lastName: '',
            receiptDate: '',
            paymentOption: '',
            paymentAmount: 0,
            totalAmount: 0,
            payee: '',
            emailTo: '',
        });
        form.resetFields();
    }

    return (
        <div style={{ padding: '20px 10px' }}>
            <Steps
                size="small"
                current={currentStep}
                items={[
                    {
                        title: 'Info',
                    },
                    {
                        title: 'Pay & Receive',
                    },
                    {
                        title: 'Receipt View & Print',
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
            {currentStep === 1 && (
                <Form {...layout} form={form} name="paymentForm" onFinish={handleSubmit}
                    initialValues={
                        {
                            paymentNo: formValues.paymentNo,
                            userCode: formValues.userCode,
                            firstName: formValues.firstName,
                            lastName: formValues.lastName,
                            receiptDate: formValues.receiptDate,
                            paymentOption: formValues.paymentOption,
                            paymentAmount: formValues.paymentAmount,
                            totalAmount: formValues.totalAmount,
                            payee: formValues.payee,
                            emailTo: formValues.emailTo,
                        }
                    } >
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
                        name="userCode"
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
                        label=""
                        name="receiptDate"
                        hidden={true}
                    >
                    </Form.Item>

                    <Form.Item
                        label="Receipt Date"
                        name="datePicker"
                        rules={[{ required: true, message: 'Please input the receipt date!' }]}
                    >
                        <DatePicker onChange={onChangeReceiptDate} format={'DD/MM/YYYY'} />
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
                        label="Amount"
                    // rules={[{ type: 'number', min: 0, max: 9999999 }]}
                    >
                        <InputNumber min={0} max={999999} defaultValue={0} onChange={onChangePaymentAmount} /> <FontAwesomeIcon icon={faBahtSign} />
                    </Form.Item>

                    <Divider />

                    <Form.Item name="totalAmount"
                        label="Total Amount" >
                        <InputNumber min={0} max={999999} defaultValue={0} onChange={onChangeTotalAmount} /> <FontAwesomeIcon icon={faBahtSign} />
                    </Form.Item>

                    <Form.Item
                        label="Payee"
                        name="payee"
                    >
                        <Input />
                    </Form.Item>

                    <Divider />

                    <Form.Item
                        label="Email to"
                        name="emailTo"
                        rules={[{ required: true, message: 'Please input the email!' }
                            , { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Please enter a valid email address!', }]}
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

            {currentStep === 2 && (
                <>
                    {formValues.paymentNo &&
                        <Collapse defaultActiveKey={['1']} onChange={onChange}>
                            <Panel header="View Receipt" key="1">
                                <ReceiptDocument ref={documentRef} values={formValues} />
                            </Panel>
                        </Collapse>
                    }
                    <br />
                    <Button type="primary" htmlType="button" onClick={() => handlePrintOut(formValues)}>
                        Save Receipt & Print
                    </Button>

                </>

            )}

            {currentStep === 3 && (
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Spin tip="Loading...">
                        <Alert
                            message="Waiting for sending email."
                            description="Receipt will be sent to your email."
                            type="info"
                        />
                    </Spin>
                </Space>
            )}

            {currentStep === 4 && (
                <Result
                    status="success"
                    title="Successfully Payment and Sent Email"
                    subTitle={`Payment number: ${formValues.paymentNo} is completed, next step.`}
                    extra={[
                        <Button type="primary" key="go_back_home" onClick={() => { history.push(`/class/search`) }}>
                            Go Main
                        </Button>,
                        <Button key="create_payment_for_next" onClick={() => { resetToNewOne() }} >Go Next Payment</Button>,
                        //Button to reload page to create new payment   
                    ]}
                />

            )}

        </div>
    )
}

export default PaymentPage