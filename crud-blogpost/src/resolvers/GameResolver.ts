import { Game } from "../entity/Game";
import { Arg, Int, Mutation, Query, Resolver,} from "type-graphql";

// @InputType()
// class GameInput {
//     // @Field()

//     // @Field()
// }

@Resolver()
export class GameResolver {
    @Mutation(() => Boolean)
    async createGame(
        @Arg('myTeamScore', () => Int) myTeamScore: number,
        @Arg('opponentTeamScore', () => Int) opponentTeamScore: number,
        @Arg('date', () => String) date: string,
    ) {
        await Game.insert({myTeamScore, opponentTeamScore, date})
        console.log(myTeamScore, date);
        return true
    }


    @Query(() => [Game])
    games() {
        return Game.find()
    }

    @Mutation(() => Boolean)
    async updateGame(
        @Arg('id', () => Int) id: number,
        @Arg('myTeamScore', () => Int) myTeamScore: number,
        @Arg('opponentTeamScore', () => Int) opponentTeamScore: number,
        @Arg('date', () => String) date: string,
    ) {
        await Game.update({id}, {myTeamScore, opponentTeamScore, date})
        return true
    }


    @Mutation(() => Boolean)
    async deleteGame(
        @Arg("id", () => Int) id: number
    ) {
        await Game.delete({id})
        return true
    }

}