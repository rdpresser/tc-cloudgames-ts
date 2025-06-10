import { RequestData } from 'mediatr-ts';
import { Result } from 'neverthrow';
import { BadRequestError, NotFoundError } from 'application/common';
import { GetUserResponse } from 'application/use-cases/users/get-by-id';
import { ZodError } from 'zod/v4';

export class GetUserQuery extends RequestData<Result<GetUserResponse, ZodError | BadRequestError | NotFoundError>> {
  constructor(public id: string) {
    super();
  }
}
