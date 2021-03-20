import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from "./resolvers/HelloWorldResolver";
import { GameResolver } from "./resolvers/GameResolver";
import { UserResolver } from "./resolvers/UserResolver";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis'

(async () => {
  const app = express();

  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient()

  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 10000000000, //long time
        httpOnly: true,
        secure: false,  //cookie only works in https (we are developing)
        sameSite: 'lax'
      },
      saveUninitialized: false,
      secret: 'qiwroasdjlasddde', //you would want to hide this in production
      resave: false
    })
  )

  const conn = await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver, GameResolver, UserResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  conn.runMigrations()

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("express server started");
  });
})();