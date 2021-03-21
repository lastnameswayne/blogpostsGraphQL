import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  games: Array<Game>;
};

export type Game = {
  __typename?: 'Game';
  id: Scalars['Int'];
  myTeamScore: Scalars['Int'];
  opponentTeamScore: Scalars['Int'];
  date: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createGame: Scalars['Boolean'];
  updateGame: Scalars['Boolean'];
  deleteGame: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
};


export type MutationCreateGameArgs = {
  date: Scalars['String'];
  opponentTeamScore: Scalars['Int'];
  myTeamScore: Scalars['Int'];
};


export type MutationUpdateGameArgs = {
  date: Scalars['String'];
  opponentTeamScore: Scalars['Int'];
  myTeamScore: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationDeleteGameArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  password: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type GamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GamesQuery = (
  { __typename?: 'Query' }
  & { games: Array<(
    { __typename?: 'Game' }
    & Pick<Game, 'id' | 'myTeamScore' | 'opponentTeamScore' | 'date'>
  )> }
);


export const GamesDocument = gql`
    query Games {
  games {
    id
    myTeamScore
    opponentTeamScore
    date
  }
}
    `;

/**
 * __useGamesQuery__
 *
 * To run a query within a React component, call `useGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGamesQuery(baseOptions?: Apollo.QueryHookOptions<GamesQuery, GamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GamesQuery, GamesQueryVariables>(GamesDocument, options);
      }
export function useGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GamesQuery, GamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GamesQuery, GamesQueryVariables>(GamesDocument, options);
        }
export type GamesQueryHookResult = ReturnType<typeof useGamesQuery>;
export type GamesLazyQueryHookResult = ReturnType<typeof useGamesLazyQuery>;
export type GamesQueryResult = Apollo.QueryResult<GamesQuery, GamesQueryVariables>;