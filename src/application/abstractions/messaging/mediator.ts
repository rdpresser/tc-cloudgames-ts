import { ResultAsync, errAsync } from 'neverthrow';

type Handler<TRequest, TResponse, TError = Error> = {
  handle(request: TRequest): ResultAsync<TResponse, TError>;
};

export class Mediator {
  private handlers = new Map<Function, Handler<any, any, any>>();

  register<TRequest extends object, TResponse, TError = Error>(
    requestType: new (...args: any[]) => TRequest,
    handler: Handler<TRequest, TResponse, TError>
  ) {
    this.handlers.set(requestType, handler);
  }

  send<TRequest, TResponse, TError = Error>(request: TRequest): ResultAsync<TResponse, TError> {
    const requestType = Object.getPrototypeOf(request).constructor;
    const handler = this.handlers.get(requestType) as Handler<TRequest, TResponse, TError> | undefined;

    // If no handler is found, return an error asynchronously
    if (!handler) {
      return errAsync(new Error('No handler registered for this request') as TError);
    }
    return handler.handle(request);
  }
}
