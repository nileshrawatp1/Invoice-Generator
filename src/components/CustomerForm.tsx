import { useForm } from "react-hook-form";
import { DEFAULT_FORM_VALS } from "../constants/formDefaults";

type CustomerFormData = {
    companyName: String,
    companyAdd: String,
    customerName: String,
    customerAdd: String,
    gstPercent: Number,
    companyGst: String,
    customerGst: String,
    invoiceNumber: String,
    invoiceDate: Date,
};

export function CostomerForm() {
    const {
        register: billData,
        handleSubmit,
        formState: { errors },
    } = useForm<CustomerFormData>({
        defaultValues: DEFAULT_FORM_VALS
    });

    const onSubmmit = (data: CustomerFormData) => {
        console.log("Customer data: ", data);
    }

    return (
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
                        {errors.customerName && <p className="error">Customer Name Is Required</p>}
                    </div>
                    <div className="col">
                        <label>Customer Address</label>
                        <input
                            {...billData("customerAdd", { required: true })}
                            placeholder="Ground Floor, 1897, chhippy wada, chandni chowk, DELHI-110006"
                        />
                        {errors.customerAdd && <p className="error">Customer Address Is Required</p>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-gst percent">
                        <label>GST Percent</label>
                        <input
                            {...billData("gstPercent", { required: true })}
                        />
                        <span className="percent-symbol">%</span>
                        {errors.gstPercent && <p className="error">GST Is Required</p>}
                    </div>
                    <div className="col-gst">
                        <label>Company GST Number</label>
                        <input
                            {...billData("companyGst", { required: true })}
                        />
                        {errors.companyGst && <p className="error">Company GST Number Is Required</p>}
                    </div>
                    <div className="col-gst">
                        <label>Customer GST Number</label>
                        <input
                            {...billData("customerGst", { required: true })}
                        />
                        {errors.customerGst && <p className="error">Customer GST Number Is Required</p>}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>Invoice Number</label>
                        <input
                            {...billData("invoiceNumber")}
                        />
                    </div>
                    <div className="col">
                        <label>Invoice Date</label>
                        <input
                            type="date"
                            {...billData("invoiceDate")}
                            placeholder="e.g. DN/579/26-27"
                        />
                    </div>
                </div>
                <div className="row">
                    <button type="submit">Add Item</button>
                </div>
            </div>
        </form>
    )
}
