import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useState } from "react";
import stripe from "stripe";

interface ProductProps {
  product: {
    id: String;
    name: String;
    imageUrl: String;
    price: String;
    description: String;
    defaultPriceId: String;
  }
  
}

export default function Product({ product }: ProductProps) {    
  const [ísCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  
  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })
      const { checkoutUrl } = response.data;      

      window.location.href = checkoutUrl
    }
    
    catch (err) {
      // Conectar com uma ferramenta de observabilidade (datadog/ sentry)
      setIsCreatingCheckoutSession(false);
      
      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>
          {product.description}
        </p>

        <button disabled={setIsCreatingCheckoutSession} onClick={handleBuyProduct}>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_MiwMNZU8sIbVfI'} }
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrive(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as stripe.Price;  

  return {
    props: {
      product: {        
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          price: new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price.unit_amount / 100),
          description: product.description,
          defaultPriceId: price.id,
        };      
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
