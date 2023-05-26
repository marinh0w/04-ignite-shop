import Image from "next/image";
import { HomeContainer, Product } from "@/styles/pages/home";

import imagem1 from "../assets/1.png";
import imagem2 from "../assets/2.png";
import imagem3 from "../assets/3.png";

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={imagem1} width={520} height={480} alt={""} />

        <footer>
          <strong>Imagem X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product>
        <Image src={imagem1} width={520} height={480} alt={""} />

        <footer>
          <strong>Imagem X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}
