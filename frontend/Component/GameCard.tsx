import { Badge, Box, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";

interface GameCardProps {
  date: string;
  myTeamScore: number;
  opponentTeamScore: number;
}

export const GameCard: React.FC<GameCardProps> = (props) => {
  return (
    <Box maxW="xs" m={2} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {props.myTeamScore > props.opponentTeamScore ? (
            <Badge borderRadius="full" px="2" colorScheme="teal">
              Win
            </Badge>
          ) : (
            <Badge borderRadius="full" px="2" colorScheme="red">
              Loss
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {props.date}
          </Box>
        </Box>

        <Box
          mt="1"
          maxW="50%"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          <Flex ml="auto">
            <Text>{props.myTeamScore}-</Text>
            <Text>{props.opponentTeamScore}</Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};