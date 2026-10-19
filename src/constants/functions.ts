import { type AddItemDependencies } from "./FormTypes";

export function submitAddItem({
    getValues,
    setValue,
    appendItem,
}: AddItemDependencies) {
    return () => {
        const name = getValues("itemName");
        const quantity = getValues("itemQuantity");
        const price = getValues("itemPrice");

        if (!name?.trim() || quantity == null || price == null) {
            alert("Please fill all the fields");
            return;
        }

        appendItem({
            itemName: name.trim(),
            itemQuantity: Number(quantity),
            itemPrice: Number(price),
        });

        setValue("itemName", "");
        setValue("itemQuantity", undefined);
        setValue("itemPrice", undefined);
    };
}
