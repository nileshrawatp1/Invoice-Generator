import { CostomerForm } from './components/CustomerForm';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import type { CustomerFormData } from './constants/FormTypes'
import { DEFAULT_FORM_VALS } from './constants/formDefaults';
import './App.css';
import InvoiceReceipt from './components/RecieptPdf';

function App() {
    const customerData = useForm<CustomerFormData>({
        defaultValues: DEFAULT_FORM_VALS,
        mode: "onTouched"
    })

    const { fields, append, remove } = useFieldArray({
        control: customerData.control,
        name: 'addedItems'
    })

    return (
        <FormProvider {...customerData}>
            <div className="container">
                <h2>Invoice & Receipt Builder</h2>
                <CostomerForm appendItem={append} />
                <InvoiceReceipt fields={fields} removeItem={remove} />
            </div>
        </FormProvider>
    )
}

export default App
