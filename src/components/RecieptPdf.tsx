import { type FieldArrayWithId } from 'react-hook-form';
import '../styles/receipt.css';
import type { CustomerFormData } from '../constants/FormTypes';

type InvoiceReceiptProps = {
    fields: FieldArrayWithId<CustomerFormData, "addedItems">[];
};

const InvoiceReceipt = ({ fields }: InvoiceReceiptProps) => {

    return (
        <>
            <div id="pdf-content" className="invoice-preview-wrapper">
                <div className="invoice-box">
                    <div className="invoice-header">DEEP NUTRITION</div>
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
