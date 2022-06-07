import React, { useState } from 'react'
import Loader from './Loader'
import ControlPanel from './ControlPanel'
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const PDFReader = () => {
    const [scale, setScale] = useState(1.0);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setLoading] = useState(true);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setLoading(false);
    }


    return (
        <div >
            <Loader isLoading={isLoading} />
            <section
                id="pdf-section"
                className="d-flex flex-column align-items-center w-100"
                style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}
            >
            <ControlPanel
                scale={scale}
                setScale={setScale}
                numPages={numPages}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                file="../assets/book.pdf" />
            <Document
                file="../assets/book.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} scale={scale} />
            </Document>
            </section>
        </div>
    )
}

export default PDFReader