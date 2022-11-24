const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Token = require("../models/Token");
const { sendConfirmationEmail } = require("../../mailer");
const { sendResetPasswordEmail } = require("../../resetPassword");

//[POST]: /api/auth/register
const createUser = async (req, res) => {
  try {
    if (req.body.id) {
      const user = await User.findOneAndUpdate(
        { _id: req.body.id },
        {
          acctiveAccount: true,
        }
      );
    } else {
      const salt = await bcrypt.genSalt(10);
      const hassPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hassPassword,
        acctiveAccount: false,
      });
      await newUser.save();
      sendConfirmationEmail({ toUser: req.body }, newUser._id);
      // console.log({ toUser: req.body }, newUser._id);
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT,
    {
      expiresIn: "1h",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_REFRESH_TOKEN,
    {
      expiresIn: "7d",
    }
  );
};

//[POST]: /api/auth/login
const userLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log("login user: ", req.body);
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (user) {
      if (user.acctiveAccount === false) {
        res.status(404).json("please active your email");
      } else if (!validPassword) {
        res.status(404).json("Wrong password");
      } else {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        const newToken = new Token({
          userId: user._id,
          token: refreshToken,
        });
        await newToken.save();

        console.log({
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
        const { password, isAdmin, acctiveAccount, ...others } = user._doc;

        res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          sameSite: "strict",
          secure: false,
          path: "/",
        });

        return res.status(200).json({ ...others, accessToken });
      }
    } else {
      res.status(404).json("Tài khoản không tồn tại");
    }
  } catch (err) {
    console.log("error 500:", err);
    res.status(500).json(err);
  }
};

//[POST]: /api/auth/refresh-token
const refreshToken = async (req, res, next) => {
  try {
    // const user = await User.findById({ _id: req.params.userId });
    //get rf cookie

    // rf cookie === rf cookie db
    const refreshToken = req.cookies.refresh_token;
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN,
      async (err, user) => {
        console.log("hello user: ", user);
        if (user.id) {
          const tokens = await Token.find({ userId: user.id });
          const isCheckToken = tokens.some(
            (token) => token.token === refreshToken
          );

          console.log({
            tokens: tokens,
            refreshToken: refreshToken,
          });

          if (!isCheckToken) {
            return res.status(403).json({ msg: "refresh token is not valid!" });
          }

          const newAccessToken = generateAccessToken(user);
          const newRefreshToken = generateRefreshToken(user);

          const newToken = new Token({
            userId: user.id,
            token: newRefreshToken,
          });
          await newToken.save();

          res.cookie("refresh_token", newRefreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "strict",
            secure: false,
            path: "/",
          });

          return res.status(200).json({
            newRefreshToken: newRefreshToken,
            newAccessToken: newAccessToken,
          });
        } else {
          res.status(403).json("Fresh token bị lỗi");
        }
      }
    );
    if (!refreshToken) res.status(404).json("Errorrrrr");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//[POST]: /api/auth/logout
const logout = async (req, res) => {
  try {
    res.clearCookie("refresh_token", { path: "/" });
    return res.status(200).json({ msg: "logout sucsses" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getToken = async (req, res) => {
  try {
    const token = await Token.find();
    res.status(200).json(token);
  } catch (err) {
    res.status(500).json(err);
  }
};

//[POST]: /api/auth/reset-password
const resetPassword = async (req, res, next) => {
  try {
    if (req.body.id) {
      const user = await User.findOneAndUpdate(
        { _id: req.body.id },
        { password: req.body.password }
      );
    } else {
      const user = await User.findOne({ email: req.body.email });
      sendResetPasswordEmail({ myUser: req.body }, user._id);
      // console.log({ myUser: req.body }, user._id);
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//[POST]: /api/auth/reset-password
const changePassword = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hassPassword = await bcrypt.hash(req.body.password, salt);
  try {
    if (req.body.id) {
      console.log(req.body.id);
      const user = await User.findOneAndUpdate(
        { _id: req.body.id },
        {
          password: hassPassword,
        }
      );
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createUser,
  userLogin,
  refreshToken,
  resetPassword,
  changePassword,
  getToken,
  logout,
};
