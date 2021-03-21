import { Box, Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import { GameCard } from "../../Component/GameCard";
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
              return (
                <GameCard
                  myTeamScore={e.myTeamScore}
                  opponentTeamScore={e.opponentTeamScore}
                  date={e.date}
                  key={e.id}
                ></GameCard>
              );
            })}
      </Box>
    );
  }
};

export default Index;
