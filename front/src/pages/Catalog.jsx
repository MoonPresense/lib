import React, { useState, useEffect } from 'react';
import CardUi from '../components/card';
import Sidebar from '../components/Sidebar';
import {  Grid } from '@mui/material';

const Catalog = ({setIdCard, idCard}) => {

  return (
    <>
      <Sidebar />
        <Grid container alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <CardUi setIdCard={setIdCard} idCard={idCard}/>
          </Grid>
        </Grid>
    </>
  )
}

export default Catalog