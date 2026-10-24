import { useFormContext, type UseFieldArrayAppend } from "react-hook-form";
import { GENERIC_ERROR_MSG } from "../constants/formDefaults";
import type { CustomerFormData } from '../constants/FormTypes';
import FormInput from "./FormInput";
import { AddItems } from "./AddItems";
import { submitAddItem } from "../constants/functions"

type CustomerFormProps = {
    appendItem: UseFieldArrayAppend<CustomerFormData, "addedItems">
}

export function CostomerForm({ appendItem }: CustomerFormProps) {
    const { handleSubmit, getValues, resetField } = useFormContext<CustomerFormData>()

    return (
        <form
            id="invoice-form"
            onSubmit={handleSubmit(submitAddItem({
                getValues,
                resetField,
                appendItem,
            }))}>
            <div className="form-section">
                <h4>Company Information</h4>

                <div className="row">
                    <FormInput
                        fieldName='companyName'
                        label='Company Name'
                        placeholder='Deep Nutrition'
                        validation={{ required: true }}
                    />
                    <FormInput
                        fieldName='companyAdd'
                        label='Company Address'
                        placeholder='Ground Floor, 1897, chhippy wada, chandni chowk, DELHI-110006'
                        validation={{
                            required: 'Company Address Is Required',
                            validate: (val) => String(val).trim() !== '' || 'Add a valid Company Address'
                        }}
                    />
                </div>

                <div className="row">
                    <FormInput
                        fieldName="customerName"
                        label="Customer Name"
                        placeholder="e.g Nilesh Organization"
                        validation={{ required: GENERIC_ERROR_MSG }}
                    />
                    <FormInput
                        fieldName="customerAdd"
                        label="Customer Address"
                        placeholder="e.g Ground Floor, 1897, DELHI-110006"
                        validation={{ required: GENERIC_ERROR_MSG }}
                    />
                </div>

                <div className="row">
                    <FormInput
                        fieldName="invoiceNumber"
                        label="Invoice Number"
                        placeholder="e.g DN/579/26-27"
                        validation={{ required: GENERIC_ERROR_MSG }}
                    />
                    <FormInput
                        fieldName="invoiceDate"
                        label="Invoice Date"
                        inputType='date'
                        className="invoice-date"
                        validation={{ required: GENERIC_ERROR_MSG }}
                    />
                </div>

                <div className="row">
                    <FormInput
                        fieldName="gstPercent"
                        label="GST Percent"
                        inputType="number"
                        placeholder="e.g 18.5"
                        validation={{
                            required: GENERIC_ERROR_MSG,
                            valueAsNumber: true,
                            min: { value: 0, message: 'Below 0 not allowed' },
                            max: { value: 90, message: 'Above 90 not allowed' }
                        }}
                        className="col-gst percent"
                        wrapClassName="input-wrapper"
                        symbolClassName="percent-symbol"
                        symbol="%"
                    />
                    <FormInput
                        fieldName="companyGst"
                        label="Company GST Number"
                        validation={{ required: GENERIC_ERROR_MSG }}
                    />
                    <FormInput
                        fieldName="customerGst"
                        label="Customer GST Number"
                        validation={{ required: GENERIC_ERROR_MSG }}
                    />
                </div>
            </div>
            <AddItems />
        </form>
    )
}
