import React from 'react';

import { Layout } from '../components';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return ( 
    //refers to the component we are currently on (home, details, checkout)
    //get access to this component in Layout by passing "children" 
    // props and rendering them where we want it
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp;
