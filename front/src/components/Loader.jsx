import React from 'react';
import '../App.css'

const Loader = ({isLoading}) => {
  if (!isLoading) return null
  return (
    <div id="loader"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <img src="https://react-pdf.org/images/logo.png" alt="loader"
        style={{ marginBottom: '5rem' }}
        className="App-logo" />
      <p>Загрузка...</p>
    </div>
  )
}

export default Loader
