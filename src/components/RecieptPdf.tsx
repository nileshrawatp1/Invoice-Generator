import { useFormContext, useWatch, type FieldArrayWithId, type UseFieldArrayRemove } from 'react-hook-form';
import '../styles/receipt.css';
import type { CustomerFormData } from '../constants/FormTypes';
import { convertNumberToWords, handleDownloadPdf } from '../constants/functions';
import { monthNames } from '../constants/formDefaults'

type InvoiceReceiptProps = {
    fields: FieldArrayWithId<CustomerFormData, "addedItems">[];
    removeItem: UseFieldArrayRemove;
};

const InvoiceReceipt = ({ fields, removeItem }: InvoiceReceiptProps) => {
    const { control } = useFormContext<CustomerFormData>();
    const formVals = useWatch({ control });
    const subTotal = fields.reduce((sum, field) => {
        const qty = Number(field.itemQuantity) || 0;
        const price = Number(field.itemPrice) || 0;
        return sum + qty * price;
    }, 0);


    const [year, month, day] = (formVals.invoiceDate ?? "").split("-");
    const monthName = monthNames[Number(month) - 1] ?? "";
    const todayDate = year ? `${day}-${monthName}-${year}` : "";

    const gstPercent = formVals.gstPercent ?? 0;
    const cgst = (subTotal * gstPercent) / 100;
    const sgst = (subTotal * gstPercent) / 100;
    const total = subTotal + cgst + sgst;
    const pdfName = `${formVals.companyName}-${formVals.invoiceNumber}`

    return (
        <>
            <div className="receipt-actions">
                <button type="button" className="receipt-action receipt-action--download" onClick={() => handleDownloadPdf(pdfName)}>
                    Download PDF
                </button>
                <button type="button" className="receipt-action receipt-action--print" onClick={() => window.print()}>
                    Print Receipt
                </button>
            </div>
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

                    <div className="invoice-date-num">
                        <div>
                            <strong>Invoice No: </strong>
                            {formVals.invoiceNumber && <span>{formVals.invoiceNumber}</span>}
                        </div>
                        <div>
                            <strong>Date: </strong>
                            {formVals.invoiceDate && <span>{todayDate}</span>}
                        </div>
                    </div>

                    <table className='invoice-items-table'>
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
                                        <td className='no-items' colSpan={5}>No items added yet.</td>
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
                                                <td>
                                                    {totalAmount.toFixed(2)}
                                                    <button
                                                        type="button"
                                                        className="btn-danger no-export"
                                                        onClick={() => removeItem(index)}
                                                    >X</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )
                            }
                            {subTotal > 0 && (
                                <tr className='total-amount'>
                                    <td colSpan={4}>Total</td>
                                    <td>{subTotal.toFixed(2)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {
                        total > 0 && <div className="calculation-summary">
                            <div className="in-words">
                                <strong>INVOICE AMOUNT IN WORDS: </strong>
                                <span>{convertNumberToWords(Math.round(total))}</span>
                            </div>
                            <div className='gst-cal'>
                                <div>Sub Total {subTotal.toFixed(2)}</div>
                                <div>CGST @{gstPercent}%: {cgst.toFixed(2)}</div>
                                <div>SGST @{gstPercent}%: {sgst.toFixed(2)}</div>
                                <div>Total: {total.toFixed(2)}</div>
                            </div>
                        </div>
                    }

                    <div className="terms-section">
                        <strong>TERMS AND CONDITIONS:</strong>
                        <br />
                        1. ALL DISPUTES SUBJECT TO DELHI JURISDICTION EXCLUSIVELY.
                        <br />
                        2. INTEREST @ 24% WILL BE CHARGED IF THE PAYMENT IS NOT MADE WITHIN
                        THE STIPULATED TIME.
                    </div>
                    <div className="signature-section">
                        <span>For, {formVals.companyName?.toUpperCase() || 'DEEP NUTRITION'}</span>
                        Authorized Signatory
                    </div>

                </div>
            </div>
        </>
    )
}
export default InvoiceReceipt;
