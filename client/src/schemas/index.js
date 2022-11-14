import * as Yup from "yup";

export const registerSchema = Yup.object({
    firstName: Yup.string().min(2).max(25).required("Please Enter first name"),
    middleName: Yup.string().min(2).max(25).required("Please Enter middle name"),
    lastName: Yup.string().min(2).max(25).required("Please Enter last name"),
    password: Yup.string().min(5).max(25).required("Please Enter Valid Password"),
    confPassword: Yup.string().required().oneOf([Yup.ref("password"), null], "Password must match"),

})

export const loginSchema = Yup.object({
    email: Yup.string().min(2).max(25).required("Please Enter Valid email"),
    password: Yup.string().min(5).max(25).required("Please Enter Valid Psassword"),

})