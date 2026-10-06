import { useForm } from "react-hook-form";

type CustomerFormData = {
    companyName: string,
    companyAdd: string,
    customerName: string,
    customerAdd: string
};

export function CostomerForm() {
    const {
        register: billData,
        handleSubmit,
        formState: { errors },
    } = useForm<CustomerFormData>();

    const onSubmmit = (data: CustomerFormData) => {
        console.log("Customer data: ", data)
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
                            {...billData("companyAdd", { required: true })}
                            placeholder="Ground Floor, 1897, chhippy wada, chandni chowk, DELHI-110006"
                        />
                        {errors.companyAdd && <p className="error">Company Address Is Required</p>}
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
                    <button type="submit">Add Item</button>
                </div>
            </div>
        </form>
    )
}
