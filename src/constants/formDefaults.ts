export const getTodayDate = (): string => {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Kolkata'
    }).format(new Date());
}

export const DEFAULT_FORM_VALS = {
    companyName: 'Deep Nutrition',
    companyAdd: 'Ground Floor, 1897, chhippy wada, chandni chowk, DELHI-110006',
    invoiceDate: getTodayDate() as unknown as Date,
    customerName: '',
    customerAdd: '',
    invoiceNumber: '',
    companyGst: '',
    customerGst: '',
    gstPercent: undefined,
    itemName: '',
    itemQuantity: undefined,
    itemPrice: undefined,
}

export const GENERIC_ERROR_MSG = 'Field is Required';
