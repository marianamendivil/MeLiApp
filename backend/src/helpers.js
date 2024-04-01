function transformItem(rawItem, description) {
    const stringPriceSplit = (rawItem.price + '').split('.')

    const transformedItem = {
        "id": rawItem.id,
        "title": rawItem.title,
        "price": {
            "currency": rawItem.currency_id,
            "amount": Number(stringPriceSplit[0]),
            "decimals": Number(stringPriceSplit[1])
        },
        "picture": description ? rawItem.pictures[0]?.url : rawItem.thumbnail,
        "condition": rawItem.attributes.filter(attribute => 
            attribute.id === "ITEM_CONDITION"
        )[0].value_name,
        "free_shipping": Boolean(rawItem.shipping.free_shipping),
        
    }

    if (description) {
        transformedItem['sold_quantity'] =  rawItem.sold_quantity || null
        transformedItem['description'] =  description.plain_text
    }

    return transformedItem
}

function getTransformedItemsAndCategories(data, description) {
    return {
        'categories': data.results.map(item => item.category_id),
        'items': data.results.map(item => transformItem(item, description))
    }
}

function getTransformedItem(data, description) {
    return transformItem(data, description)
}

export { getTransformedItemsAndCategories, getTransformedItem }