export const getTodayDate = (): string => {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Kolkata'
    }).format(new Date());
}

export const DEFAULT_FORM_VALS = {
    companyName: 'Deep Nutrition',
    companyAdd: 'Ground Floor, 1897, chhippy wada, chandni chowk, DELHI-110006',
    fieldError: 'Field is Required',
    invoiceDate: getTodayDate() as unknown as Date,
}
