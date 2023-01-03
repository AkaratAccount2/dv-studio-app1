export type GrabOrderResponse = {
    id: bigint
    grab_order_id: string
    grab_merchant_id: string
    store_merchant_id: string
    order_time: string
    payment_type: string
    stort_order_number: string
    receiver_name: string
    receiver_phones: string
    receiver_location_address: string
    receiver_delivery_instruction: string
    receiver_unitnumber: string
    receiver_latitude: number
    receiver_longtitude: number
    currency_code: string
    currency_symbol: string
    currency_exponent: string
    cutlery: number
    json_items: object
    price_subtotal: number
    price_tax: number
    price_delivery_fee: number
    price_eater_payment: number
    price_grabfund_promo: number
    price_minorfund_promo: number
    grab_order_state: string
    grab_order_reason: string
    store_order_id: string
    created_time: Date
    site_group: string
    store_name: string
}

export type GrabRequestResponse = {
    id: bigint
    source: string
    method: string
    grab_order_id: string
    grab_merchant_id: string
    store_merchant_id: string
    request_data: string
    created_time: string
}

export type GrabSitesResponse = {
    id: bigint
    grab_merchant_id: string
    platform: string
    store_merchant_id: string
    store_name: string
    store_address: string
    bu_code: string
    site_group: string
    active: number
}

export type GrabSyncResponse = {
    key: bigint
    id: bigint
    grab_merchant_id: string
    store_merchant_id: string
    site_group: string
    sync: string
    store_name: string
    store_address: string
    update_time_menusync_success: string
    update_time_menusync_fail: string
    json_data: string
    menusync_errors : object
    menusync_sections_errors : object
}

export type TabState = {
    activeKey: string
    panes: object
}

export type GrabQueueResponse = {
    messageCount: bigint
    consumerCount: bigint
    message: string
    queue: string
}

export type GrabReportCancelResponse = {
    id: bigint
    aggregator: string
    report_type: string
    report_run_by: string
    report_file: string
    report_s3_url: string
    report_created_status: string
    report_created_time: string
    report_send_out_status: string
    report_send_out_time: string
    report_send_out_email: string
    report_failed_status: string
    report_failed_time: string
    report_data_type: string
    report_data_year: string
    report_data_month: string
    report_data_date_begin: string
    report_data_date_end: string
    report_data_sum_amt: string
}

export type ExcelReportCols = {
    id: bigint
    grab_order_id: string
    short_order_number: string
    grab_merchant_id: string
    bu: string
    store_name: string
    price_subtotal: string
    order_time: string
    transaction_time: string
    arrived_time: string
    collected_time: string
    delivered_time: string
    canceled_time: string
    canceled_reason: string
    store_order_id: string
    order_check_no: string
    order_subtotal: string
}

export type GrabMenuSyncScheduleResponse = {
    id: bigint
    site_group: string
    template: string
    run_time: string
    daily: string
}

export type GrabUrbanSiteMapResponse = {
    id: bigint
    grab_urban_store_id: string
    minor_store_id: string
    site_group: string
}