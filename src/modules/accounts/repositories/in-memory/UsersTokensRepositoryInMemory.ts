import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokenRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id
    });

    this.usersTokens.push(userToken);
    return userToken;
  };

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      token => token.user_id === user_id && token.refresh_token === refresh_token
    );
    return userToken;
  };

  async deleteById(id: string): Promise<void> {
    this.usersTokens = this.usersTokens.filter(token => token.id !== id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(token => token.refresh_token === refresh_token);
    return userToken;
  }

};

export { UsersTokensRepositoryInMemory }