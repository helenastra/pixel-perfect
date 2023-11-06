import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

//create Sanity client
export const client = sanityClient({
    projectId: 'igqz8u7v', //know which project to connect with 
    dataset: 'production',
    apiVersion: '2022-11-07',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN 
  });
  
  const builder = imageUrlBuilder(client);
  
  export const urlFor = (source) => builder.image(source);