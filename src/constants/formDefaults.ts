export const getTodayDate = (): string => {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Kolkata'
    }).format(new Date());
}

export const DEFAULT_FORM_VALS = {
    companyName: 'Deep Nutrition',
    companyAdd: 'Ground Floor, 1897, chhippy wada, chandni chowk, DELHI-110006',
    customerName: 'Nilesh',
    customerAdd: 'Rao colony',
    invoiceNumber: 'DN/579/26-27',
    invoiceDate: getTodayDate() as unknown as Date,
    companyGst: '123456',
    customerGst: '987650',
    gstPercent: undefined,
    itemName: '',
    itemQuantity: undefined,
    itemPrice: undefined,
    addedItems: [],
}

export const GENERIC_ERROR_MSG = 'Field is Required';
