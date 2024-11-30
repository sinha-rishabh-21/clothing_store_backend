import productDatabase from "../models/dataModels.js";
import UserDataModel from "../models/userAuth.js";

async function handlerSetData(req, res) {
  const body = req.body;
  if (!body) return res.json({ status: "Error inserting data" });
  await productDatabase
    .create({
      title: body.title,
      price: body.price,
      image: body.image,
      desc: body.desc,
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ Status: `Error inserting data, Error: ${err}` });
    });

  return res.status(201).json({ status: "Success" });
}

async function handlerProductsData(req, res) {
  const body = await productDatabase.find({});
  return res.json(body);
}

// const bcrypt = require("bcrypt");

async function handlerSignUpUser(req, res) {
  const { username, email, password } = req.body;

  // Check for required fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Fill all required fields" });
  }

  // Check if user already exists
  const user = await UserDataModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (user) {
    return res
      .status(409)
      .json({ message: "Username or Email is already registered" });
  }

  // Hash the password before saving
  // const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  try {
    await UserDataModel.create({
      username: username,
      email: email,
      password: password,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error inserting data, Error: ${err.message}` });
  }
}

async function handlerLoginUser(req, res) {
  const { username, email, password } = req.body;

  // Query to find user by either username or email, and password
  const user = await UserDataModel.findOne({
    $or: [{ username: username }, { email: email }],
    password: password,
  });

  if (user) {
    res.status(200).json({ message: "Login successful", user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
}

export {
  handlerProductsData,
  handlerSetData,
  handlerLoginUser,
  handlerSignUpUser,
};
