import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Field()
    @Column({type: "text", unique: true})
    username!: string;

    @Field(() => String)
    @Column()
    password!: string;
  
    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;
  
    @Field(() => String)
    @CreateDateColumn()
    updatedAt: Date;
  }
