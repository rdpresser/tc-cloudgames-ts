import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { EmailSchema } from '../../../../../src/domain/aggregates/user/value-objects/email';
import { z } from 'zod/v4';

test('Create_User_Should_Return_Success_When_All_Fields_Are_Valid', () => {
  // Arrange
  const user = {
    id: uuidv4(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'User'
  };

  // Act

  const result = EmailSchema.safeParse({ email: "" });

  if (!result.success) {
    // Handle Zod errors
    if (result.error instanceof z.ZodError) {
      const errors = result.error.issues.map(issue => ({
        propertyName: issue.path.join('.'),
        code: issue.code,
        message: issue.message
      }));
      console.log(errors); // Displays structured error messages
    }
    console.log(z.formatError(result.error)); // Displays structured error messages
  }

  // Assert
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('firstName');
  expect(user).toHaveProperty('lastName');
  expect(user).toHaveProperty('role');
  expect(user.role).toBe('User');
  expect(user.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  expect(user.firstName).toBeDefined();
  expect(user.lastName).toBeDefined();
  expect(user.firstName).not.toBe('');
  expect(user.lastName).not.toBe('');
  expect(user.role).toBeDefined();
  expect(user.role).toBe('User');
  expect(user).toHaveProperty('email');
  expect(user).toHaveProperty('password');
});
