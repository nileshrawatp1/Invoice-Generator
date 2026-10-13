import { useForm, FormProvider } from "react-hook-form";
import { DEFAULT_FORM_VALS, GENERIC_ERROR_MSG } from "../constants/formDefaults";
import type { CustomerFormData } from '../constants/FormTypes'
import FormInput from "./FormInput";
import { AddItems } from "./AddItems";

export function CostomerForm() {

    const customerData = useForm<CustomerFormData>({
        defaultValues: DEFAULT_FORM_VALS
    });

    const onSubmmit = (data: CustomerFormData) => {
        console.log("Customer data: ", data);
    }

    return (
        <FormProvider {...customerData}>
            <form id="invoice-form" onSubmit={customerData.handleSubmit(onSubmmit)}>
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
                            placeholder="e.g. Nilesh Organization"
                            validation={{ required: GENERIC_ERROR_MSG }}
                        />
                        <FormInput
                            fieldName="customerAdd"
                            label="Customer Address"
                            placeholder="Ground Floor, 1897, chhippy wada, chandni chowk, DELHI-110006"
                            validation={{ required: GENERIC_ERROR_MSG }}
                        />
                    </div>

                    <div className="row">
                        <FormInput
                            fieldName="invoiceNumber"
                            label="Invoice Number"
                            placeholder="e.g. DN/579/26-27"
                            validation={{ required: GENERIC_ERROR_MSG }}
                        />
                        <FormInput
                            fieldName="invoiceDate"
                            label="Invoice Date"
                            inputType='date'
                            placeholder="e.g. DN/579/26-27"
                            validation={{ required: GENERIC_ERROR_MSG, valueAsDate: true }}
                        />
                    </div>

                    <div className="row">
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
                        <FormInput
                            fieldName="gstPercent"
                            label="GST Percent"
                            inputType="number"
                            validation={{ required: GENERIC_ERROR_MSG, valueAsNumber: true }}
                            className="col-gst percent"
                            wrapClassName="input-wrapper"
                            symbolClassName="percent-symbol"
                            symbol="%"
                        />
                    </div>
                </div>
                <AddItems />
            </form>
        </FormProvider>
    )
}
