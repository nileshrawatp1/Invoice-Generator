import { useForm, FormProvider } from "react-hook-form";
import { DEFAULT_FORM_VALS } from "../constants/formDefaults";
import type { CustomerFormData } from '../constants/FormTypes'
import { AddItems } from "./AddItems";

export function CostomerForm() {

    const customerData = useForm<CustomerFormData>({
        defaultValues: DEFAULT_FORM_VALS
    });
    // console.log("first: ", DEFAULT_FORM_VALS);

    const {
        register: billData,
        handleSubmit,
        formState: { errors },
    } = customerData;

    const onSubmmit = (data: CustomerFormData) => {
        console.log("Customer data: ", data);
    }

    return (
        <FormProvider {...customerData}>
            <form id="invoice-form" onSubmit={handleSubmit(onSubmmit)}>
                <div className="form-section">
                    <h4>Company Information</h4>
                    <div className="row">
                        <div className="col">
                            <label>Company Name</label>
                            <input
                                {...billData("companyName", { required: true })}
                                placeholder="Deep Nutrition"
                            />
                            {errors.companyName && <p className="error">Company Name Is Required</p>}
                        </div>
                        <div className="col">
                            <label>Company Address</label>
                            <input
                                {...billData("companyAdd", {
                                    required: {
                                        value: true,
                                        message: 'Company Address Is Required'
                                    },
                                    validate: (fieldValue) => fieldValue.trim() !== '' || 'Add a valid Company Address'
                                })}
                                placeholder="Ground Floor, 1897, chhippy wada, chandni chowk, DELHI-110006"
                            />
                            {errors.companyAdd && <p className="error">{errors.companyAdd?.message}</p>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label>Customer Name</label>
                            <input
                                {...billData("customerName", { required: true })}
                                placeholder="Deep Nutrition"
                            />
                            {errors.customerName && <p className="error">{DEFAULT_FORM_VALS.fieldError}</p>}
                        </div>
                        <div className="col">
                            <label>Customer Address</label>
                            <input
                                {...billData("customerAdd", { required: true })}
                                placeholder="Ground Floor, 1897, chhippy wada, chandni chowk, DELHI-110006"
                            />
                            {errors.customerAdd && <p className="error">{DEFAULT_FORM_VALS.fieldError}</p>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label>Invoice Number</label>
                            <input
                                {...billData("invoiceNumber", { required: true })}
                                placeholder="e.g. DN/579/26-27"
                            />
                        </div>
                        <div className="col">
                            <label>Invoice Date</label>
                            <input
                                type="date"
                                {...billData("invoiceDate", { required: true, valueAsDate: true })}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-gst">
                            <label>Company GST Number</label>
                            <input
                                {...billData("companyGst", { required: true })}
                            />
                            {errors.companyGst && <p className="error">{DEFAULT_FORM_VALS.fieldError}</p>}
                        </div>
                        <div className="col-gst">
                            <label>Customer GST Number</label>
                            <input
                                {...billData("customerGst", { required: true })}
                            />
                            {errors.customerGst && <p className="error">{DEFAULT_FORM_VALS.fieldError}</p>}
                        </div>
                        <div className="col-gst percent">
                            <label>GST Percent</label>
                            <div className="input-wrapper">
                                <input
                                    {...billData("gstPercent", { required: true })}
                                    placeholder="e.g 5 or 2.5"
                                />
                                <span className="percent-symbol">%</span>
                            </div>
                            {errors.gstPercent && <p className="error">{DEFAULT_FORM_VALS.fieldError}</p>}
                        </div>
                    </div>
                </div>
                <AddItems />
            </form>
        </FormProvider>
    )
}
