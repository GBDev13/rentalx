import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcrypt";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepository
  ) { }

  async execute({
    name,
    email,
    driver_license,
    password
  }: ICreateUserDTO): Promise<void> {

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      name,
      email,
      driver_license,
      password: passwordHash
    });
  }
}

export { CreateUserUseCase };