// import { UserEmail, UserName, UserPassword } from '../../value-objects';
// import { UserAggregate } from './user.domain-aggregate';

// describe('user.aggregate', () => {
//   it('should create a valid user', () => {
//     const user = UserAggregate.create({
//       email: UserEmail.create({ value: 'valid_mail@domain.com' }).getResult(),
//       name: UserName.create({ value: 'valid_name' }).getResult(),
//       password: UserPassword.create({ value: 'valid_password' }).getResult(),
//     });

//     expect(user.isSuccess).toBe(true);
//   });

//   it('should get valid values', () => {
//     const user = UserAggregate.create({
//       email: UserEmail.create({ value: 'valid_mail@domain.com' }).getResult(),
//       name: UserName.create({ value: 'valid_name' }).getResult(),
//       password: UserPassword.create({ value: 'valid_password' }).getResult(),
//     });

//     const userResult = user.getResult();

//     expect(userResult.id).toBeDefined();
//     expect(userResult.email.value).toBe('valid_mail@domain.com');
//     expect(userResult.name.value).toBe('valid_name');
//     expect(userResult.password.value).toBe('valid_password');
//   });

//   it('should create a valid user with provided id', () => {
//     const user = UserAggregate.create({
//       email: UserEmail.create({ value: 'valid_mail@domain.com' }).getResult(),
//       name: UserName.create({ value: 'valid_name' }).getResult(),
//       password: UserPassword.create({ value: 'valid_password' }).getResult(),
//     });

//     expect(user.getResult().id.value).toBe('valid_id');
//   });
// });
