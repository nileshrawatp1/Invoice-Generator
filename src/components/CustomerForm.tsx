import { useFormContext, type UseFieldArrayAppend } from "react-hook-form";
import type { CustomerFormData } from '../constants/FormTypes';
import FormInput from "./FormInput";
import { AddItems } from "./AddItems";
import { submitAddItem } from "../constants/functions"
import { useEffect } from "react";

type CustomerFormProps = {
    appendItem: UseFieldArrayAppend<CustomerFormData, "addedItems">
}

export function CostomerForm({ appendItem }: CustomerFormProps) {
    const { handleSubmit, getValues, resetField, formState: { isSubmitSuccessful } } = useFormContext<CustomerFormData>();

    useEffect(() => {
        if (isSubmitSuccessful) {
            resetField("itemName");
            resetField("itemQuantity");
            resetField("itemPrice");
        }
    }, [isSubmitSuccessful, resetField])

    return (
        <form
            id="invoice-form"
            noValidate
            onSubmit={handleSubmit(submitAddItem({
                getValues,
                appendItem,
            }))}>
            <div className="form-section">
                <h4>Company Information</h4>

                <div className="row">
                    <FormInput
                        fieldName='companyName'
                        label='Company Name'
                        placeholder='Deep Nutrition'
                    />
                    <FormInput
                        fieldName='companyAdd'
                        label='Company Address'
                        placeholder='Ground Floor, 1897, chhippy wada, chandni chowk, DELHI-110006'
                    />
                </div>

                <div className="row">
                    <FormInput
                        fieldName="customerName"
                        label="Customer Name"
                        placeholder="e.g Nilesh Organization"
                    />
                    <FormInput
                        fieldName="customerAdd"
                        label="Customer Address"
                        placeholder="e.g Ground Floor, 1897, DELHI-110006"
                    />
                </div>

                <div className="row">
                    <FormInput
                        fieldName="invoiceNumber"
                        label="Invoice Number"
                        placeholder="e.g DN/579/26-27"
                    />
                    <FormInput
                        fieldName="invoiceDate"
                        label="Invoice Date"
                        inputType='date'
                        className="invoice-date"
                    />
                </div>

                <div className="row">
                    <FormInput
                        fieldName="gstPercent"
                        label="GST Percent"
                        inputType="number"
                        placeholder="e.g 18.5"
                        className="col-gst percent"
                        wrapClassName="input-wrapper"
                        symbolClassName="percent-symbol"
                        symbol="%"
                    />
                    <FormInput
                        fieldName="companyGst"
                        label="Company GST Number"
                    />
                    <FormInput
                        fieldName="customerGst"
                        label="Customer GST Number"
                    />
                </div>
            </div>
            <AddItems />
        </form>
    )
}
