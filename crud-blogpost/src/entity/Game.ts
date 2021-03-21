import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class Game extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;
  
    @Field(() => Int)
    @Column('int')
    myTeamScore: number;
  
    @Field(() => Int)
    @Column()
    opponentTeamScore: number;
  
    @Field()
    @Column()
    date: string;
  }
