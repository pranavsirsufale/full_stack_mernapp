{
  //*------------------------------------------------
  //* Contrllers
  //*------------------------------------------------
  //? In an Express.js applications, a "contrller" refers to a part of your code that is responsible for handling the application's logic. Controllers are typically used to process incoming requrest, interact with models (data sources), and send response back to clients. They help organize your application by separating concerns and following the MVC ( Model-view-controller) design pattern.
  //*------------------------------------------------
  //* Home Logic
  //*------------------------------------------------
}
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

const home = async (req, res) => {
  try {
    res.status(200).send("welcome to world best app");
  } catch (error) {
    console.log("ERROR OCCURED FROM AUTH HOME :: ", error);
  }
};

//! registraion algorithm
//todo 1> Get Registraoion Data
//todo 2> check email existence
//todo 3> Hash Password
//todo 4> create User
//todo 5> save to db
//todo 6> respond

const register = async (req, res) => {
  try {
    //todo 5> save to db
    //todo 6> respond

    //todo 1> Get Registraoion Data
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    //todo 2> check if username and email already exists
    const userAlreadyExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userAlreadyExists) {
      return res.status(400).json({ message: "email or username already exists" });
    }

    //todo 3> Hash Password hashing done by pre

    //todo 4> create User
    const createdUser = await User.create({
      username,
      email,
      phone,
      password,
    });

    res
      .status(200)
      .json({
        message: createdUser,
        token: await createdUser.generateToken(),
        userId: createdUser?._id?.toString(),
      });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) return res.status(400).json("Enter username");
    if (!password) return res.status(400).json("Enter Password");

    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ message:"Invalid Username"});

    const passwordMatched = await user.checkPassword(password);

    if (!passwordMatched) return res.status(400).json({message : "enter a valid password"});

    return res
      .status(200)
      .json({
        message: "Login successfully",
        token: await user.generateToken(),
        userId: user._id.toString(),
        user,
      });
  } catch (error) {
    res.status(401).json({message: error });
  }
};

//*-----------------------------------------------
//* to send user data - User Logic
//*-----------------------------------------------

const user = async (req, res) => {
  try {
    const userData = req.user;
    const userId = req.userId;
    const token = req.token;
    res.status(200).json({ userData });
  } catch (error) {
    console.log(`errro from the user route ${error}`);
  }
};

export { home, register, login, user };
