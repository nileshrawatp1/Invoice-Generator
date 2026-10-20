import { getTodayDate } from './functions';

export const DEFAULT_FORM_VALS = {
    companyName: 'Deep Nutrition',
    companyAdd: 'Ground Floor, 1897, chhippy wada, chandni chowk, DELHI-110006',
    customerName: '',
    customerAdd: '',
    invoiceNumber: '',
    invoiceDate: getTodayDate(),
    companyGst: '',
    customerGst: '',
    gstPercent: undefined,
    itemName: '',
    itemQuantity: undefined,
    itemPrice: undefined,
    addedItems: [],
}

export const GENERIC_ERROR_MSG = 'Field is Required';

export const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
