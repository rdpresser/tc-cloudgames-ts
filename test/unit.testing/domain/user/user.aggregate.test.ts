import { faker } from '@faker-js/faker';
import { User, type UserProps } from 'domain/user';

test('Create_User_From_Aggregate_Should_Return_Success_When_All_Fields_Are_Valid', async () => {
  // Arrange
  const password = [
    faker.string.alpha({ length: 1, casing: 'upper' }),   // at least one uppercase
    faker.string.alpha({ length: 1, casing: 'lower' }),   // at least one lowercase
    faker.string.numeric(1),                              // at least one digit
    faker.string.symbol(1),                               // at least one special char
    faker.string.alpha({ length: 4 })                     // fill to at least 8 chars
  ].join('');

  // Example user object with valid fields from application command
  const user: UserProps = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password,
    role: 'User'
  };

  // Act
  const result = await User.create(user); // Create user using the User class
  if (result.isErr()) {
    // Handle creation errors
    console.error(result.error); // Displays structured error messages
  }

  // Assert
  expect(result.isOk()).toBe(true); // Ensure the creation was successful

  if (result.isOk()) {
    const userfromAggregate = result.value; // Extract the created user

    expect(userfromAggregate.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    expect(userfromAggregate.firstName).toBe(user.firstName);
    expect(userfromAggregate.lastName).toBe(user.lastName);
    expect(userfromAggregate.role.value).toBe(user.role);
    expect(userfromAggregate.email.value).toBe(user.email);
    expect(userfromAggregate.password.value).toBeDefined();
  }
});
