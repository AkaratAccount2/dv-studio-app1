import React, { FC, useState, useEffect, useRef, MutableRefObject } from 'react'
import ReactPDF, { Document as PdfDocument, PDFViewer } from '@react-pdf/renderer'
import { Page as PdfPage } from '@react-pdf/renderer'
import { View as PdfView } from '@react-pdf/renderer'
import { Text } from '@react-pdf/renderer'
//import styles from './../styles/styles'
import compose from './../styles/compose'
import { Image, Space } from 'antd'

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
}

interface Props {
    //children: React.ReactNode;
    values?: FormValues //Invoice
    pdfMode?: boolean
    //onChange?: (invoice: Invoice) => void
    //pdfRef: React.LegacyRef<ReactPDF.PDFViewer>;
    ref: React.ForwardedRef<HTMLDivElement>
}

const ReceiptDocument: React.FC<Props> = React.forwardRef<HTMLDivElement, Props>(({ values, pdfMode }, ref) => {  //, onChange

    //const pdfRef = React.useRef<typeof PDFViewer | null>(null);

    // const handlePrint = () => {
    //     //window.print();
    //     //pdfRef!.current.print()
    // };

    useEffect(() => {
        console.log('Prop values:', values)
        //console.log('pdfRef', pdfRef)
    }, [values])


    return (
        // <PDFViewer ref={pdfRef} style={{ width: '100%', height: '100%' }}>
        // </PDFViewer>

        <div ref={ref}>
            <PdfDocument>
                <PdfPage size="A4" style={compose('page invoice-wrapper')}>
                    <PdfView style={compose('flex mt-10')}>
                        <PdfView style={compose('w-40')}><Space></Space></PdfView>
                        <PdfView style={compose('view w-20')}>
                            <Image
                                width={150}
                                src={`${process.env.PUBLIC_URL}/apple-icon-180x180.png`}
                            />
                        </PdfView>
                        <PdfView style={compose('w-40')}><Space></Space></PdfView>
                    </PdfView>
                    {/* <PdfView style={compose('flex')}>
                        <PdfView style={compose('w-60')}>
                            <Space></Space>
                        </PdfView>
                        <PdfView style={compose('w-40')}>
                            <Text style={compose('fs-20 center')}>
                                วันที่ ${values?.receiptDate} เดือน MM  พ.ศ YYYY
                            </Text>
                        </PdfView>
                    </PdfView> */}
                    <PdfView style={compose('flex mt-10')}>
                        <PdfView style={compose('w-30')}><Space></Space></PdfView>
                        <PdfView style={compose('view w-40 center')}>
                            <Text style={compose('fs-20 bold')}>Receipt/ใบเสร็จรับเงิน</Text>
                        </PdfView>
                        <PdfView style={compose('w-30')}><Space></Space></PdfView>
                    </PdfView>
                    <PdfView style={compose('flex mt-20')}>
                        <PdfView style={compose('p-8-4 w-30')}>
                            <Text style={compose('span-left')}>First Name/ชื่อผู้เรียน  {`${values?.firstName}`}</Text>
                        </PdfView>
                        <PdfView style={compose('p-4-8 w-40')}>
                            <Text style={compose('span-left')}>Last Name/นามสกุล  {`${values?.lastName}`}</Text>
                        </PdfView>
                        <PdfView style={compose('p-4-8 w-30')}>
                            <Text style={compose('span-left')}>Student Code/รหัสผู้เรียน <Space> {`${values?.userCode}`}</Space></Text>
                        </PdfView>
                    </PdfView>

                    <PdfView style={compose('flex mt-20')}>
                        <PdfView style={compose('p-5 w-30')}>
                            <Text style={compose('span-left')}>Payment</Text>
                        </PdfView>
                        <PdfView style={compose('p-5 w-40')}>
                            <Text style={compose('span-left')}>Payment Ref/รหัสอ้างอิงการชำระ <Space>{`${values?.paymentNo}`} </Space></Text>
                        </PdfView>
                        <PdfView style={compose('p-5 w-30')}>
                            <Text style={compose('span-left')}><Space></Space></Text>
                        </PdfView>
                    </PdfView>
                    <PdfView style={compose('flex mt-20')}>
                        <PdfView style={compose('p-5 w-30')}>
                            <Text style={compose('span-left')}></Text>
                        </PdfView>
                        <PdfView style={compose('p-5 w-40')}>
                            <Text style={compose('span-left')}>Option/ชำระ <Space> {`${values?.paymentOption}`} </Space>  {`${values?.paymentAmount}`}  Baht</Text>
                        </PdfView>
                        <PdfView style={compose('p-5 w-30')}>
                            <Text style={compose('span-left')}>If couse <Space>...course...</Space></Text>
                        </PdfView>
                    </PdfView>

                    <PdfView style={compose('flex mt-20')}>
                        <PdfView style={compose('p-5 w-30')}>
                            <Text style={compose('span-left')}>Total</Text>
                        </PdfView>
                        <PdfView style={compose('p-5 w-40')}>
                            <Text style={compose('span-left')}><Space> ...Money... </Space> Baht</Text>
                        </PdfView>
                        <PdfView style={compose('p-5 w-30')}>
                            <Text style={compose('span-left')}> Remark <Space>...remark...</Space></Text>
                        </PdfView>
                    </PdfView>
                    <PdfView style={compose('flex mt-30')}>
                        <PdfView style={compose('p-5 w-17')}>
                            <Space />
                        </PdfView>
                        <PdfView style={compose('p-5 w-70 center')}>
                            <Text style={compose('fs-11 bold')}> {`*Notice >>> This paper is the proof of payment. The Studio reserves the right to refund.`}</Text>
                        </PdfView>
                        <PdfView style={compose('p-5 w-17')}><Space /></PdfView>
                    </PdfView>
                    <PdfView style={compose('flex mt-20')}>
                        <PdfView style={compose('p-5 w-30')}><Space /></PdfView>
                        <PdfView style={compose('p-5 w-30')}><Space /></PdfView>
                        <PdfView style={compose('p-5 w-40')}>{`................................(Signature)`}</PdfView>
                    </PdfView>
                    <PdfView style={compose('flex mt-10')}>
                        <PdfView style={compose('p-5 w-30')}><Space /></PdfView>
                        <PdfView style={compose('p-5 w-30')}><Space /></PdfView>
                        <PdfView style={compose('p-5 w-40')}>{`(..........................................)`}</PdfView>
                    </PdfView>
                    <PdfView style={compose('flex mt-10')}>
                        <PdfView style={compose('p-5 w-30')}><Space /></PdfView>
                        <PdfView style={compose('p-5 w-30')}><Space /></PdfView>
                        <PdfView style={compose('p-5 w-40')}>{`                  Payee                    `}</PdfView>
                    </PdfView>
                    <PdfView style={compose('flex mt-30')}>
                        <PdfView style={compose('p-5 w-100 center')}>
                            <Text style={compose('fs-11 bold')}>{`.......................................................................................................................................................................................................................................................................`}</Text>
                        </PdfView>
                    </PdfView>
                    <PdfView style={compose('flex mt-20')}>
                        <PdfView style={compose('w-30')}><Space></Space></PdfView>
                        <PdfView style={compose('view w-40 center')}>
                            <Text style={compose('fs-20 bold')}>Notifications</Text>
                        </PdfView>
                        <PdfView style={compose('w-30')}><Space></Space></PdfView>
                    </PdfView>
                    <PdfView style={compose('flex mt-30')}>
                        <PdfView style={compose('p-5 w-100 left')}>
                            <Text style={compose('fs-14 span-left')}>{`1. Date and time have to be confirmed before class at least 1 day. `}</Text>
                        </PdfView>
                    </PdfView>
                    <PdfView style={compose('flex mt-10')}>
                        <PdfView style={compose('p-5 w-100 left')}>
                            <Text style={compose('fs-14 span-left')}>{`2. Class canceled of schedule changed have to be confirmed before class at least 1 day. `}</Text>
                        </PdfView>
                    </PdfView>
                    <PdfView style={compose('flex mt-10')}>
                        <PdfView style={compose('p-5 w-100 left')}>
                            <Text style={compose('fs-14 span-left')}>{`   Find the assistant will arrange schedule to make up in that month. `}</Text>
                        </PdfView>
                    </PdfView>
                    <PdfView style={compose('flex mt-10')}>
                        <PdfView style={compose('p-5 w-100 left')}>
                            <Text style={compose('fs-14 span-left')}>{`3. There is no schedule make up for the student who absent from class without noticed. `}</Text>
                        </PdfView>
                    </PdfView>
                    <PdfView style={compose('flex mt-10')}>
                        <PdfView style={compose('p-5 w-100 left')}>
                            <Text style={compose('fs-14 span-left')}>{`4. Please make a payment before start the class. (cash or online banking transfer) `}</Text>
                        </PdfView>
                    </PdfView>
                    <PdfView style={compose('flex mt-10')}>
                        <PdfView style={compose('p-5 w-100 left')}>
                            <Text style={compose('fs-14 span-left')}>{`5. All courses can not transfer to others. `}</Text>
                        </PdfView>
                    </PdfView>
                    <PdfView style={compose('flex mt-10')}>
                        <PdfView style={compose('p-5 w-100 left')}>
                            <Text style={compose('fs-14 span-left')}>{`6. The studio reserves the right to change without prior notice. `}</Text>
                        </PdfView>
                    </PdfView>
                </PdfPage>
            </PdfDocument>
        </div>
    )

});

export default ReceiptDocument

// // invoice-wrapper
{/* <button onClick={() => window.print()}>Print</button> */ }
{/* <button onClick={handlePrint}>Print PDF</button> */ }
// const pdfViewerRef = React.createRef<typeof PDFViewer>() as MutableRefObject<typeof PDFViewer>;