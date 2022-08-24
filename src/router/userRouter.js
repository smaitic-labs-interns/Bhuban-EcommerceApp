const userRouter = require("express").Router();
const api = require('../api/api');

userRouter.get("/", async(req, resp) => {
    resp.send("Hello!, This is from user API.")
})

userRouter.post("/userRegister", api.user.user_register);
userRouter.post("/userLogin", api.user.user_login);


module.exports = userRouter;