import type { UseFieldArrayAppend, UseFormGetValues, UseFormSetValue } from "react-hook-form";

export interface InvoiceItem {
    itemName: string,
    itemQuantity: number,
    itemPrice: number,
};

export type CustomerFormData = {
    companyName: string,
    companyAdd: string,
    customerName: string,
    customerAdd: string,
    gstPercent: number | undefined,
    companyGst: string,
    customerGst: string,
    invoiceNumber: string,
    invoiceDate: Date,
    itemName: string;
    itemQuantity: number | undefined;
    itemPrice: number | undefined;
    addedItems: InvoiceItem[];
};

export type AddItemDependencies = {
    getValues: UseFormGetValues<CustomerFormData>;
    setValue: UseFormSetValue<CustomerFormData>;
    appendItem: UseFieldArrayAppend<CustomerFormData, "addedItems">;
};
