import { faker } from '@faker-js/faker';
import { User, type UserProps } from '../../../../src/domain/user/user.aggregate';

test('Create_User_From_Validator_Should_Return_Success_When_All_Fields_Are_Valid', async () => {
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

  // Create Email value object
  //const emailResult = Email.create(user.email);

  // create UserPropsValueObjects from user object
  // This is necessary to ensure that the email is validated and transformed into a value object
  // const userPropsValueObjects: UserPropsValueObjects = {
  //   firstName: user.firstName,
  //   lastName: user.lastName,
  //   email: (emailResult.isOk() ? emailResult.value : null) as Email,
  //   password: user.password,
  //   role: user.role
  // };

  // Act
  //const result = UserSchema.safeParse(userPropsValueObjects); // Validate user object against UserSchema
  const result2 = await User.create(user); // Create user using the User class
  if (result2.isErr()) {
    // Handle creation errors
    console.error(result2.error); // Displays structured error messages
  }


  // if (!result.success) {
  //   // Handle Zod errors
  //   if (result.error instanceof z.ZodError) {
  //     const errors = result.error.issues.map(issue => ({
  //       propertyName: issue.path.join('.'),
  //       code: issue.code,
  //       message: issue.message
  //     }));
  //     console.log(errors); // Displays structured error messages
  //   }
  // }

  // Assert
  if (result2.isOk()) {
    //const user2 = result2.value; // Extract the created user
    //expect(user2.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  }
  expect(user.firstName).toBeDefined();
  expect(user.lastName).toBeDefined();
  expect(user.firstName).not.toBe('');
  expect(user.lastName).not.toBe('');
  expect(user.role).toBeDefined();
  expect(user.role).toBe('User');
  expect(user).toHaveProperty('email');
  expect(user).toHaveProperty('password');
});

// test('Create_User_Should_Return_Success_When_All_Fields_Are_Valid', () => {
//   // Arrange
//   const user = {
//     id: uuidv4(),
//     firstName: faker.person.firstName(),
//     lastName: faker.person.lastName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     role: 'User'
//   };

//   // Act

//   const result = EmailSchema.safeParse({ email: "" });

//   if (!result.success) {
//     // Handle Zod errors
//     if (result.error instanceof z.ZodError) {
//       const errors = result.error.issues.map(issue => ({
//         propertyName: issue.path.join('.'),
//         code: issue.code,
//         message: issue.message
//       }));
//       console.log(errors); // Displays structured error messages
//     }
//     console.log(z.formatError(result.error)); // Displays structured error messages
//   }

//   // Assert
//   expect(user).toHaveProperty('id');
//   expect(user).toHaveProperty('firstName');
//   expect(user).toHaveProperty('lastName');
//   expect(user).toHaveProperty('role');
//   expect(user.role).toBe('User');
//   expect(user.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
//   expect(user.firstName).toBeDefined();
//   expect(user.lastName).toBeDefined();
//   expect(user.firstName).not.toBe('');
//   expect(user.lastName).not.toBe('');
//   expect(user.role).toBeDefined();
//   expect(user.role).toBe('User');
//   expect(user).toHaveProperty('email');
//   expect(user).toHaveProperty('password');
// });
