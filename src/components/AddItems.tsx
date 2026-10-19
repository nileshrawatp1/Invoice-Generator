import { GENERIC_ERROR_MSG } from "../constants/formDefaults";
import FormInput from "../components/FormInput";

export function AddItems() {

    return (
        <>
            <div className="form-section">
                <h4>Add Items</h4>

                <div className="row">
                    <FormInput
                        fieldName="itemName"
                        label="Item Name"
                        validation={{ required: GENERIC_ERROR_MSG }}
                    />
                    <FormInput
                        fieldName="itemQuantity"
                        label="Item Quantity"
                        inputType="number"
                        validation={{ required: GENERIC_ERROR_MSG, valueAsNumber: true }}
                    />
                    <FormInput
                        fieldName="itemPrice"
                        label="Item Price (Rate)"
                        inputType="number"
                        validation={{ required: GENERIC_ERROR_MSG, valueAsNumber: true }}
                    />
                    <div className="col submit-btn">
                        <button type="submit">Add Item</button>
                    </div>
                </div>
            </div>
        </>
    )
}
