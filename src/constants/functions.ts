import { type AddItemDependencies } from "./FormTypes";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export function submitAddItem({
    getValues,
    resetField,
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

        resetField("itemName");
        resetField("itemQuantity");
        resetField("itemPrice");
    };
}

export const getTodayDate = (): string => {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Kolkata'
    }).format(new Date());
}

export function convertNumberToWords(num: number) {
    if (num === 0) return "Zero Rupees";
    const a = ["", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ", "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    function getWords(n: number) {
        const numberString = n.toString();
        if (numberString.length > 9) return "overflow";
        const nMask = ("000000000" + numberString)
            .slice(-9)
            .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!nMask) return;
        let str = "";
        str +=
            nMask[1] !== "00"
                ? (a[Number(nMask[1])] || b[Number(nMask[1][0])] + " " + a[Number(nMask[1][1])]) +
                "Crore "
                : "";
        str +=
            nMask[2] !== "00"
                ? (a[Number(nMask[2])] || b[Number(nMask[2][0])] + " " + a[Number(nMask[2][1])]) +
                "Lakh "
                : "";
        str +=
            nMask[3] !== "00"
                ? (a[Number(nMask[3])] || b[Number(nMask[3][0])] + " " + a[Number(nMask[3][1])]) +
                "Thousand "
                : "";
        str +=
            nMask[4] !== "0"
                ? (a[Number(nMask[4])] || b[Number(nMask[4][0])] + " " + a[Number(nMask[4][1])]) +
                "Hundred "
                : "";
        str +=
            nMask[5] !== "00"
                ? (str != "" ? "and " : "") +
                (a[Number(nMask[5])] || b[Number(nMask[5][0])] + " " + a[Number(nMask[5][1])])
                : "";
        return str.trim();
    }
    return getWords(Math.floor(num)) + " Rupees Only";
}

export const handleDownloadPdf = async (pdfName: string) => {
        const receipt = document.getElementById('pdf-content');
        if (!receipt) return;

        const canvas = await html2canvas(receipt, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            ignoreElements: (element) => element.classList.contains('no-export'),
        });
        const image = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;
        const imageWidth = pageWidth - margin * 2;
        const imageHeight = (canvas.height * imageWidth) / canvas.width;
        const pageContentHeight = pageHeight - margin * 2;
        let heightLeft = imageHeight;
        let imageTop = margin;

        pdf.addImage(image, 'PNG', margin, imageTop, imageWidth, imageHeight);
        heightLeft -= pageContentHeight;

        while (heightLeft > 0) {
            imageTop = margin - (imageHeight - heightLeft);
            pdf.addPage();
            pdf.addImage(image, 'PNG', margin, imageTop, imageWidth, imageHeight);
            heightLeft -= pageContentHeight;
        }

        const filename = (pdfName || 'invoice').replace(/[^a-z0-9-_]/gi, '-');
        pdf.save(`${filename}.pdf`);
    };
