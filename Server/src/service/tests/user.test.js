const { user } = require("../allService");
const { userData } = require("./data");
const {
  register,
  signinRight,
  signinWrong,
  signinResponse,
  limitedRight,
  limitedWrong,
  userIdWrong,
} = userData;

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
    var result = await user.user_signin(
      signinRight.email,
      signinRight.password
    );
    expect(result).toMatchObject(signinResponse);
  });

  test("should throw error while signin", async () => {
    expect.assertions(1);
    try {
      var result = await user.user_signin(
        signinWrong.email,
        signinRight.password
      );
    } catch (err) {
      expect(err.message).toMatch("Invalid login Credintals");
    }
  });

  test("should throw error while signin", async () => {
    expect.assertions(1);
    try {
      var result = await user.user_signin(
        signinRight.email,
        signinWrong.password
      );
    } catch (err) {
      expect(err.message).toMatch("Invalid login Credintals");
    }
  });

  test("should throw error while signin", async () => {
    expect.assertions(1);
    try {
      var result = await user.user_signin(
        signinWrong.email,
        signinWrong.password
      );
    } catch (err) {
      expect(err.message).toMatch("Invalid login Credintals");
    }
  });

  /*
   * Test to fetc limited users
   */

  test("should fetch limited user, response must be instance of Object.", async () => {
    var result = await user.get_limited_users(limitedRight);
    expect(result.data).toBeInstanceOf(Object);
  });

  test("should throw error while fetching limited user with out of range", async () => {
    expect.assertions(1);
    try {
      var result = await user.get_limited_users(limitedWrong);
    } catch (err) {
      expect(err.message).toMatch("No User Found");
    }
  });

  /*
   * Test to fetch all users
   */

  test("should fetch all user, response must be instance of Object.", async () => {
    var result = await user.get_all_users();
    expect(result).toBeInstanceOf(Object);
  });

  // test("should throw error while no user is present", async () => {
  //   expect.assertions(1);
  //   try {
  //     var result = await user.get_all_users();
  //   } catch (err) {
  //     expect(err.message).toMatch("No User Found");
  //   }
  // });

  /*
   * To remove user
   */

  test("should remove user and return success message.", async () => {
    var res = await user.user_signin(signinRight.email, signinRight.password);
    var result = await user.remove_user_by_id(res.id);
    expect(result).toMatch("User removed sucessfully");
  });

  test("should throw error message, when removing non-existing user.", async () => {
    try {
      var result = await user.remove_user_by_id(userIdWrong);
    } catch (err) {
      expect(err.message).toMatch("User doesnot exists");
    }
  });
});
