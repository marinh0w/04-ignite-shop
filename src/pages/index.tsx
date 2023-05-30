import { GetServerSideProps, GetStaticProps } from "next";
import Image from "next/image";

import { useKeenSlider } from "keen-slider/react";

import { HomeContainer, Product } from "@/styles/pages/home";

import Stripe from 'stripe'
import { stripe } from "../lib/stripe"

import imagem1 from "../assets/1.png";
import imagem2 from "../assets/2.png";
import imagem3 from "../assets/3.png";

import "keen-slider/keen-slider.min.css";

interface HomeProps {
  products: {
    id: String;
    name: string;
    imageUrl: String;
    price: number;
  }[]
}

export default function Home({ products }) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => {
         <Product key={product.id} className="keen-slider__slide">
         <Image src={product.imageUrl} width={520} height={480} alt={""} />
 
         <footer>
           <strong>{product.name}</strong>
           <span>{product.price}</span>
         </footer>
       </Product>
      })}
    </HomeContainer>
  );
}

export const getStaticProps: GetStaticProps = async ({  }) => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });


  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100,
      
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2 // 2 hours,
  };
};
