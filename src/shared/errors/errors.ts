export class InvalidCredentialsError extends Error {
  constructor() {
    super('Credenciais inválidas')
    this.name = 'InvalidCredentialError'
  }
}

export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message || 'Dados não encontrando')
    this.name = 'NotFoundError'
  }
}

export class UnexpectedError extends Error {
  constructor() {
    super('Algo de errado aconteceu. Tente novamente em breve')
    this.name = 'UnexpectedError'
  }
}

export class EmailInUseError extends Error {
  constructor() {
    super('Esse email já esta sendo utilizado')
    this.name = 'EmailInUseError'
  }
}

export class AccessDeniedError extends Error {
  constructor(message?: string) {
    super(message || 'Acesso negado!')
    this.name = 'AccessDeniedError'
  }
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BadRequestError'
  }
}

export class ServerError extends Error {
  constructor(message: string = 'Erro interno do servidor') {
    super(message)
    this.name = 'ServerError'
  }
}
