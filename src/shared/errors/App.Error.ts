interface IAppError {
  message: string;
  statusCode: number;
}

class AppEror {
  public readonly message: string;
  public readonly statusCode: number;

  constructor({ message, statusCode = 400 }: IAppError) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { AppEror };
