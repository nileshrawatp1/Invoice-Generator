import { CostomerForm } from './components/CustomerForm';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { type CustomerFormData, formSchema } from './constants/FormTypes'
import { DEFAULT_FORM_VALS } from './constants/formDefaults';
import './App.css';
import InvoiceReceipt from './components/RecieptPdf';
import { zodResolver } from "@hookform/resolvers/zod";

function App() {
    const customerData = useForm<CustomerFormData>({
        defaultValues: DEFAULT_FORM_VALS,
        resolver: zodResolver(formSchema)
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
