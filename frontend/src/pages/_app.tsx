import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

import theme from "../theme";
import React from "react";
import {
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  ApolloClient,
} from "@apollo/client";

function MyApp({ Component, pageProps }) {
  const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  //serviceWorker.unregister();
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
