import { type HttpResponse, HttpStatusCode } from '../protocols'
import {
  AccessDeniedError,
  BadRequestError,
  ConflictError,
  NotFoundError,
  RequestWithoutResponseError,
  ServerError,
  UnexpectedError,
} from './errors'

export interface IValidationErrors<T> {
  errors(httpResponse: HttpResponse<T>): T
}

export class ValidationErrors<T> implements IValidationErrors<T> {
  private getErrorMessage(body: unknown, defaultMessage: string): string {
    if (typeof body === 'string') return body

    if (body && typeof body === 'object' && 'message' in body) {
      const message = (body as { message?: unknown }).message
      if (typeof message === 'string' && message.trim()) {
        return message
      }
    }

    return defaultMessage
  }

  errors(httpResponse: HttpResponse<T>): T {
    if (httpResponse.kind === 'no-response') {
      throw new RequestWithoutResponseError()
    }

    if (
      httpResponse.kind === 'success' &&
      httpResponse.statusCode >= HttpStatusCode.ok &&
      httpResponse.statusCode < 300
    ) {
      return httpResponse.body
    }

    const errorMessage = this.getErrorMessage(
      httpResponse.body,
      'Unexpected error',
    )

    switch (httpResponse.statusCode) {
      case HttpStatusCode.notFound:
        throw new NotFoundError(errorMessage)

      case HttpStatusCode.badRequest:
        throw new BadRequestError(errorMessage)

      case HttpStatusCode.conflict:
        throw new ConflictError(errorMessage)

      case HttpStatusCode.serverError:
        throw new ServerError(errorMessage)

      case HttpStatusCode.forbidden:
        throw new AccessDeniedError(errorMessage)

      case HttpStatusCode.unauthorized:
        throw new AccessDeniedError(errorMessage)

      default:
        throw new UnexpectedError()
    }
  }
}
