import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext'

function MyApp({ Component, pageProps }) {
  return ( 
    //refers to the component we are currently on (home, details, checkout)
    //get access to this component in Layout by passing "children" 
    //props and rendering them where we want it
    //pass data  from StateContext to every component inside of it
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp;
