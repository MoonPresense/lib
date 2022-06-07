import React from 'react';
import PDFPrinter from './PDFPrinter';
import '../App.css'


const ControlPanel = (props) => {
  const { file, pageNumber, numPages, setPageNumber, scale, setScale } = props;

  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;

  const firstPageClass = isFirstPage ? 'disabled' : 'clickable';
  const lastPageClass = isLastPage ? 'disabled' : 'clickable';

  const goToFirstPage = () => {
    if (!isFirstPage) setPageNumber(1);
  };
  const goToPreviousPage = () => {
    if (!isFirstPage) setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (!isLastPage) setPageNumber(pageNumber + 1);
  };
  const goToLastPage = () => {
    if (!isLastPage) setPageNumber(numPages);
  };

  const onPageChange = (e) => {
    const { value } = e.target;
    setPageNumber(Number(value));
  };

  const isMinZoom = scale < 0.6;
  const isMaxZoom = scale >= 2.0;

  const zoomOutClass = isMinZoom ? 'disabled' : 'clickable';
  const zoomInClass = isMaxZoom ? 'disabled' : 'clickable';

  const zoomOut = () => {
    if (!isMinZoom) setScale(scale - 0.1);
  };

  const zoomIn = () => {
    if (!isMaxZoom) setScale(scale + 0.1);
  };

  return (
    <div style={{ display: 'flex', marginBottom: '15px', padding: '15px', alignItems: 'baseline', justifyContent: 'center' }}
      className="control-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginRight: '30px' }}>
        <i
          style={{ margin: '0 10px 0 10px' }}
          className={`fas fa-fast-backward  ${firstPageClass}`}
          onClick={goToFirstPage}
        />
        <i
          style={{ margin: '0 10px 0 10px' }}
          className={`fas fa-backward ${firstPageClass}`}
          onClick={goToPreviousPage}
        />
        <span>
          Страница{' '}
          <input
            name="pageNumber"
            type="number"
            min={1}
            max={numPages || 1}
            style={{ padding: '0', paddingLeft: '5px', margin: '0 10px 0 10px' }}
            value={pageNumber}
            onChange={onPageChange}
          />{' '}
          из {numPages}
        </span>
        <i
          style={{ margin: '0 10px 0 10px' }}
          className={`fas fa-forward  ${lastPageClass}`}
          onClick={goToNextPage}
        />
        <i
          style={{ margin: '0 10px 0 10px' }}
          className={`fas fa-fast-forward  ${lastPageClass}`}
          onClick={goToLastPage}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginRight: '30px'  }} >
        <i
          style={{ margin: '0 15px 0 15px' }}
          className={`fas fa-search-minus ${zoomOutClass}`}
          onClick={zoomOut}
        />
        <span style={{ margin: '0'}}>{(scale * 100).toFixed()}%</span>
        <i
          style={{ margin: '0 15px 0 15px' }}
          className={`fas fa-search-plus ${zoomInClass}`}
          onClick={zoomIn}
        />
      </div>
      <div style={{ margin: '0 15px 0 15px', marginRight: '30px' }}>
        <a href="../assets/book.pdf" download={true} title="download">
          <i className="fas fa-file-download clickable" />
        </a>
      </div>
      <div style={{ margin: '0 15px 0 15px', marginRight: '30px' }}>
        <PDFPrinter file={file} />
      </div>
    </div>
  );
};

export default ControlPanel;
