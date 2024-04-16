import { z } from "zod";

//* Createing an object schema
const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is Required " })
    .trim()
    .min(3, { message: "username must be at least 3 character" })
    .max(255, { message: "username must not be more than 255 character !" }),

  email: z
    .string({ required_error: "Email Is Required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 character" })
    .max(255, { message: "Email must not be more than 255 character " }),

  phone: z
    .string({ required_error: "Phone number is required " })
    .trim()
    .min(10, { message: "Phone must be at least of 10 chacacters " })
    .max(20, { message: "Phone must not be more than 20 chacater" }),

  password: z
    .string({ required_error: "Password is required " })
    .trim()
    .min(7, { message: "passwod must be at least of 6 character " })
    .max(30, { message: " password can't be more than 30 char" }),
});


const LoginSchema = z.object({
  username: z
  .string({ required_error: "Name is Required " })
  .trim()
  .min(3, { message: "Name must be at least 3 character" })
  .max(255, { message: "Name must not be more than 255 character !" }),

  password: z
    .string({ required_error: "Password is required " })
    .trim()
    .min(3, { message: "passwod must be at least of 3 character " })
    .max(30, { message: " password can't be more than 30 char" }),

})

export { signupSchema ,LoginSchema };
