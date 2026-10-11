import { useFormContext } from "react-hook-form";
import type { CustomerFormData } from "../constants/FormTypes";
import { DEFAULT_FORM_VALS } from "../constants/formDefaults";


export function AddItems() {

    const formItems = useFormContext<CustomerFormData>()

    return (
        <>
            <div className="form-section">
                <h4>Add Items</h4>

                <div className="row">
                    <div className="col">
                        <label htmlFor="itemName">Item Name</label>
                        <input type="text" id="itemName"
                            {...formItems.register("itemName", { required: true })}
                        />
                        {formItems.formState.errors.itemName && <p className="error">{DEFAULT_FORM_VALS.fieldError}</p>}
                    </div>
                    <div className="col">
                        <label htmlFor="itemQuantity">Item Quantity</label>
                        <input type="number" id="itemQuantity"
                            {...formItems.register("itemQuantity", {
                                required: {
                                    value: true,
                                    message: "Item Quantity is Required"
                                }
                            })}
                        />
                        {formItems.formState.errors.itemQuantity?.message && <p className="error">{DEFAULT_FORM_VALS.fieldError}</p>}
                    </div>
                    <div className="col">
                        <label htmlFor="itemPrice">Item Price (Rate)</label>
                        <input type="number" id="itemPrice"
                            {...formItems.register("itemPrice", { required: true })}
                        />
                        {formItems.formState.errors.itemPrice && <p className="error">{DEFAULT_FORM_VALS.fieldError}</p>}
                    </div>
                    <div className="col submit-btn">
                        <button type="submit">Add Item</button>
                    </div>
                </div>
            </div>
        </>
    )
}
