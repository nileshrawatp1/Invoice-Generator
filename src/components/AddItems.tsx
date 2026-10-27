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
                        placeholder="e.g Pre-Workout Supplement 300gm"
                    />
                    <FormInput
                        fieldName="itemQuantity"
                        label="Item Quantity"
                        inputType="number"
                        placeholder="e.g 24"
                    />
                    <FormInput
                        fieldName="itemPrice"
                        label="Item Price (Rate)"
                        inputType="number"
                        placeholder="e.g 650"
                    />
                    <div className="col submit-btn">
                        <button type="submit">Add Item</button>
                    </div>
                </div>
            </div>
        </>
    )
}
