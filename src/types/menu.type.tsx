
export type MenuTemplateResponse = {
    id: bigint
    site_group: string
    template: string
}

export type MenuTemplateJSONResponse = {
    id: bigint
    site_group: string
    template: string
    menu: string
    bu: string
    is_sync_schedule: string
}

export type MenuImagesResponse = {
    id: bigint
    site_group: string
    image_id: string
    album_id: string
    name: string
    image_url: string
    created_time: string
}

export type PizzaMappingResponse = {
    id: bigint
    grab_item_id: string
    pan_id: string
    pizza_id: string
    pan_name: string
    pizza_name: string
}


export type CcWebItmResponse = {
    id: bigint
    menu_id: string
    item_id: string
    item_name: string
    free_pan_item1: string
}

export type modifierObject = {
    "id": string
    "quantity": number
    "price": number
}

export type itemObject = {
    "id": string,
    "quantity": number,
    "specifications": string,
    "price": number,
    "modifiers": Array<modifierObject>
}