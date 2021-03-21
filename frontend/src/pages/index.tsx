import { Box, Spinner } from "@chakra-ui/react";
import React from "react";
import { useGamesQuery } from "../generated/graphql";

const Index = () => {
  const { data, loading } = useGamesQuery();

  if (loading) {
    return <Spinner></Spinner>;
  } else {
    return (
      <Box>
        {!data
          ? null
          : data.games.map((e) => {
              return <Box key={e.id}>{e.date}</Box>;
            })}
        :
      </Box>
    );
  }
};

export default Index;
