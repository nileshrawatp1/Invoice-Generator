import type { UseFieldArrayAppend, UseFormGetValues } from "react-hook-form";
import { z } from "zod";

const GENERIC_ERROR_MSG = 'Field is Required';
const stringFieldScema = z.string().trim().nonempty(GENERIC_ERROR_MSG);

export const formSchema = z.object({
    companyName: stringFieldScema,
    companyAdd: stringFieldScema,
    customerName: stringFieldScema,
    customerAdd: stringFieldScema,
    gstPercent: z.number({ error: "Enter a valid percent" }).min(0, "Must be 0 or greater").max(90, "Can't be more the 90"),
    companyGst: stringFieldScema,
    customerGst: stringFieldScema,
    invoiceNumber: stringFieldScema,
    invoiceDate: stringFieldScema,
    itemName: stringFieldScema,
    itemQuantity: z.number({ error: "Enter a valid quantity" }).min(1, "Must be 1 or greater"),
    itemPrice: z.number({ error: "Enter a valid price" }).min(0, "Must be 0 or greater"),
    addedItems: z.array(z.object({
        itemName: z.string(),
        itemQuantity: z.number(),
        itemPrice: z.number(),
    }))
})

export type CustomerFormData = z.infer<typeof formSchema>;

export type AddItemDependencies = {
    getValues: UseFormGetValues<CustomerFormData>;
    appendItem: UseFieldArrayAppend<CustomerFormData, "addedItems">;
};
