
export type StoreOrderResponse = {
    id: bigint
    grab_order_id: string
    store_order_id: string
    order_to_merchant: string
    order_source: string
    order_mode: string
    order_type: string
    order_status: string
    order_store_id: string
    order_store_name: string
    order_store_number: string
    order_store_bucode: string
    order_store_dob: string
    order_store_order_id: string
    order_store_check_no: string
    order_store_customer_id: string
    order_store_customer_fullname: string
    order_store_customer_mobile: string
    order_store_driver_id: string
    order_store_driver_name: string
    due_time: string
    created_by: string
    created_time: string
    updated_by: string
    updated_time: string
    order_cancel_by: string
    order_cancel_time: string
    order_sale_amount: number
    order_service_charge: number
    order_subtotal: number
    order_gross_total: number
    order_discount_total: number
    order_total: number
    order_balance: number
    order_change: string
    order_payment_method: string
    order_payment_amount: number
    order_remark: string
    ordr_note: string
}

export type StoreOrderDetailsResponse = {
    id: bigint
    store_order_id: string
    store_check_id: string
    level: number
    product_id: string
    product_short_name: string
    product_name: string
    product_type: string
    price: number
    quantity: number
    mod_code: string
    parent_id: string
    order_status: string
}
