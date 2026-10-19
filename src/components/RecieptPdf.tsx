import { useFormContext, useWatch, type FieldArrayWithId } from 'react-hook-form';
import '../styles/receipt.css';
import type { CustomerFormData } from '../constants/FormTypes';

type InvoiceReceiptProps = {
    fields: FieldArrayWithId<CustomerFormData, "addedItems">[];
};

const InvoiceReceipt = ({ fields }: InvoiceReceiptProps) => {
    const { control } = useFormContext<CustomerFormData>();
    const formVals = useWatch({ control });

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const [year, month, day] = (formVals.invoiceDate ?? "").split("-");
    const monthName = monthNames[Number(month) - 1] ?? "";
    const todayDate = year ? `${day}-${monthName}-${year}` : "";

    return (
        <>
            <div id="pdf-content" className="invoice-preview-wrapper">
                <div className="invoice-box">
                    <div className="invoice-header">{formVals.companyName?.trim().toUpperCase()}</div>
                    <div className="invoice-subtext">{formVals.companyAdd?.trim()}</div>
                    {formVals.companyGst && <div className="invoice-gst">
                        {`GST: ${formVals.companyGst}`}
                    </div>}
                    <div className="tax-invoice">TAX INVOICE</div>
                    <div className="invoice-customer-details">
                        <div>
                            <strong>BILL TO: </strong>
                            <span>{formVals.customerName}</span>
                        </div>
                        <div>
                            <strong>Address: </strong>
                            <span>{formVals.customerAdd}</span>
                        </div>
                        <div>
                            <strong>GST: </strong>
                            <span>{formVals.customerGst}</span>
                        </div>
                    </div>

                    <div className="invoice-table">
                        <div>
                            <strong>Invoice No: </strong>
                            {formVals.invoiceNumber && <span>{formVals.invoiceNumber}</span>}
                        </div>
                        <div>
                            <strong>Date: </strong>
                            {formVals.invoiceDate && <span>{todayDate}</span>}
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>S. No.</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Rate</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                fields.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} style={{ textAlign: 'center', padding: '15px' }}> No Items Added</td>
                                    </tr>
                                ) : (
                                    fields.map((field, index) => {
                                        const qty = Number(field.itemQuantity) || 0;
                                        const price = Number(field.itemPrice) || 0;
                                        const totalAmount = qty * price;

                                        return (
                                            <tr key={field.id}>
                                                <td>{index + 1}</td>
                                                <td>{field.itemName || "—"}</td>
                                                <td>{qty}</td>
                                                <td>{price.toFixed(2)}</td>
                                                <td>{totalAmount.toFixed(2)}</td>
                                            </tr>
                                        )
                                    })
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
``
export default InvoiceReceipt;
