import React from 'react'
import PDFReader from '../components/PDFReader'


const Reader = () => {
  return (
    <div style={{
        textAlign: 'center',
        backgroundColor: '#282c34',
        minHeight: '100vh',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }}>
      <PDFReader />
    </div>
  )
}

export default Reader