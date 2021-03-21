import { User } from "../entity/User";
import {
  Arg,
    Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() {req} : any
  ): Promise<UserResponse> {
    
    //username validation
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "length must be greater than 2",
          },
        ],
      };
    }
    //password validation
    if (options.password.length <= 2) {
      return {
        errors: [
          {
            field: "password",
            message: "password must be greater than 2",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(options.password);
    let user: User | undefined = undefined;
    try {
    user = await User.create({
      username: options.username,
      password: hashedPassword,
    }).save();
    } catch(err) {        
        if (err.errno === 19) {
            return {
              errors: [
                {
                  field: "username",
                  message: "username already taken",
                },
              ],
            };
        }
    }
    //store user id session, auto-logs in after registration🤩
    req.session.userId = user?.id
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() {req}: any 
  ): Promise<UserResponse> {
    const user = await User.findOne({ username: options.username });
    if (!user) {
      return {
        errors: [{ field: "username", message: "username doesn't exist" }],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "that password doesn't exist",
          },
        ],
      };
    }
    req.session.userId = user.id;
    return { user };
  }
}
