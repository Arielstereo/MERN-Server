import { generateToken } from "../utils/tokenGenerator.js";
import { User } from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    let verifyEmail = await User.findOne({ email });
    if (verifyEmail) {
      return res.status(400).json({ msg: "* Email already registered!" });
    }
    const user = new User({ email, password, username });
    const salt = await User.encryptPassword(password);
    user.password = salt;
    const result = await user.save();
    const token = generateToken(result._id);
    res
      .status(200)
      .json({ token: token, id: result._id, msg: "User saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("* Email invalid!");
    }
    const result = await User.comparePassword(password, user.password);
    if (result) {
      const token = generateToken(user._id);
      return res
        .status(200)
        .json({
          token: token,
          id: user._id,
          email: user.email,
          username: user.username,
        });
    }
    return res.status(401).json("* Password invalid!");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid, { password: 0, __v: 0 }); //elimino el password y el __v
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
