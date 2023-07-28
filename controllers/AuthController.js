import { comparePassword, hashPassword } from "../helpers/authHeper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

//REGISTER CONTROLLER
export const registerControler = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    //validation:
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }

    //check user
    const existingUser = await userModel.findOne({ email });
    //existing user:
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Aready Register pease login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Successful",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//LOGIN CONTROLLER:

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Vadilation:
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not recognize",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //token:
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgot Password Controller:

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    //validation:
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }

    if (!newPassword) {
      return res.send({ message: "New Password is Required" });
    }

    //check :
    const user = await userModel.findOne({ email, answer });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email Or Answer",
      });
    }

    const hash = await hashPassword(newPassword);

    await userModel.findByIdAndUpdate(user._id, { password: hash });
    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in forget password controller",
      error,
    });
  }
};

//Test controller:

export const testController = async (req, res) => {
  try {
    res.send("Protected route");
  } catch (error) {
    console.log(error);
  }
};
