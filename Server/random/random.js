const { user } = require("../src/service/allService");
const { userData } = require("./data");
const { register, signin, signinResponse, limited } = userData;

describe("Perform User related tests", () => {
  /*
   * Test for user Register
   */
  test("should register user and return sucess message", async () => {
    var result = await user.user_register(
      register.firstName,
      register.middleName,
      register.lastName,
      register.address,
      register.email,
      register.password
    );
    expect(result).toMatch("User Registerd Sucessfully. Try Login");
  });

  test("should throw error while registering user as user already exists", async () => {
    expect.assertions(1);
    try {
      var result = await user.user_register(
        register.firstName,
        register.middleName,
        register.lastName,
        register.address,
        register.email,
        register.password
      );
    } catch (err) {
      expect(err.message).toMatch("User Already Registered. Try Login!");
    }
  });

  /*
   * Test for user signin
   */

  test("should signin with user details and match user object", async () => {
    var result = await user.user_signin(signin.email, signin.password);
    expect(result).toMatchObject(signinResponse);
  });

  test("should throw error while signin", async () => {
    expect.assertions(1);
    try {
      var result = await user.user_signin(signin.email, signin.password);
    } catch (err) {
      expect(err.message).toMatch("Invalid login Credintals");
    }
  });
  //email | password | E && P : wrong/right

  // test("should signin with user details and match user object on correct details and show error in false details", async () => {
  //   expect.assertions(1);
  //   try {
  //     var result = await user.user_signin(signin.email, signin.password);
  //     expect(result).toMatchObject(signinResponse);
  //   } catch (err) {
  //     expect(err.message).toMatch("Invalid login Credintals");
  //   }
  // });

  /*
   * Test to fetc limited users
   */

  test("should fetch limited user, response must be instance of Object.", async () => {
    var result = await user.get_limited_users(limited);
    expect(result.data).toBeInstanceOf(Object);
  });

  test("should throw error while fetching limited user with out of range", async () => {
    expect.assertions(1);
    try {
      var result = await user.get_limited_users(limited);
    } catch (err) {
      expect(err.message).toMatch("No User Found");
    }
  });

  test("should fetch limited user , response must be instance of Object and throw error on out of range", async () => {
    expect.assertions(1);
    try {
      var result = await user.get_limited_users(limited);
      expect(result.data).toBeInstanceOf(Object);
    } catch (err) {
      expect(err.message).toMatch("No User Found");
    }
  });

  /*
   * Test to fetc all users
   */

  test("should fetch all user, response must be instance of Object.", async () => {
    var result = await user.get_all_users();
    expect(result).toBeInstanceOf(Object);
  });

  test("should throw error while no user is present", async () => {
    expect.assertions(1);
    try {
      var result = await user.get_all_users();
    } catch (err) {
      expect(err.message).toMatch("No User Found");
    }
  });

  test("should fetch all user , response must be instance of Object and throw error onn no user", async () => {
    expect.assertions(1);
    try {
      var result = await user.get_all_users();
      expect(result).toBeInstanceOf(Object);
    } catch (err) {
      expect(err.message).toMatch("No User Found");
    }
  });
});
