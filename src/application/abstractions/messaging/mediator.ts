type Handler<TRequest, TResponse> = { handle(request: TRequest): Promise<TResponse> };

export class Mediator {
  private handlers = new Map<Function, Handler<any, any>>();

  register<TRequest extends object, TResponse>(requestType: new (...args: any[]) => TRequest, handler: Handler<TRequest, TResponse>) {
    this.handlers.set(requestType, handler);
  }

  async send<TRequest extends object, TResponse>(request: TRequest): Promise<TResponse> {
    const handler = this.handlers.get(request.constructor as Function) as Handler<TRequest, TResponse> | undefined;
    if (!handler) throw new Error('No handler registered for this request');
    return handler.handle(request);
  }
}
