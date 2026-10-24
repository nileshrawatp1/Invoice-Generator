import type { UseFieldArrayAppend, UseFormGetValues } from "react-hook-form";

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
    invoiceDate: string,
    itemName: string;
    itemQuantity: number | undefined;
    itemPrice: number | undefined;
    addedItems: InvoiceItem[];
};

export type AddItemDependencies = {
    getValues: UseFormGetValues<CustomerFormData>;
    appendItem: UseFieldArrayAppend<CustomerFormData, "addedItems">;
};
