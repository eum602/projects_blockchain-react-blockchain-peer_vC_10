import React from "react";
//import Header from "./Header.js";
import { Container } from "semantic-ui-react";
import Head from "next/head"; /*se importa el componente Head para usarlo
con otros componentes*/
export default props => {
  /*props.children=>> clildren tomara lo que vaya en medio de
  este, ir a index para ver como se usa, se nota que en el render se le llama a
  Layout con las etquetas <Layout>El contenido que va aqui es el children</Layout>*/
  return (
    <Container>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"
        />
      {props.children}
    </Container>
  );
};
