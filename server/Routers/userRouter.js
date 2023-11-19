import express from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { tokenControl } from "../utils/tokenControl.js";
import axios from "axios";
import fs from "fs";
import {
  changeFullnameSchema,
  changeMailSchema,
  changePasswordSchema,
  signInSchema,
  signUpSchema,
} from "../JoiModels/CreateSchema.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { value, error } = signUpSchema.validate(req.body);

    if (error) {
      return res.status(500).json({ message: error.message });
    }
    const { username, password, email, fullname } = value;

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username }).exec();
    if (duplicate)
      return res
        .status(409)
        .json({ message: "Bu kullanıcı adı zaten kullanılıyor." }); //Conflict

    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    //create and store the new user
    const result = await User.create({
      username,
      password: hashedPwd,
      fullname,
      email,
    });

    res
      .status(201)
      .json({ success: `Yeni kullanıcı ${username} oluşturuldu.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { value, error } = signInSchema.validate(req.body);

    if (error) {
      return res.status(500).json({ message: error.message });
    }
    const { username, password } = value;

    const foundUser = await User.findOne({ username }).exec();

    if (!foundUser) return res.sendStatus(401); //Unauthorized
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      // create JWTs
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      const newRefreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );

      res.cookie("refreshToken", newRefreshToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      // Send authorization roles and access token to user

      res.json({ foundUser, accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {}
});

router.get("/Logout", async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/relogin", async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.sendStatus(400);
    }

    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(403); //invalid token

        const foundUser = await User.findOne({
          username: decoded.username,
        }).exec();
        if (!foundUser) {
          res.status(404);
        }
        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: foundUser.username,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        const newRefreshToken = jwt.sign(
          { username: foundUser.username },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "30d" }
        );

        res.cookie("refreshToken", newRefreshToken, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        // Send authorization roles and access token to user
        res.json({ foundUser, accessToken });
      }
    );
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post("/google-login", async (req, res) => {
  const { token } = req.body;
  let response = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
  );
  const data = response.data;

  const { email, picture } = data;

  const user = await User.findOne({ email }, { password: 0 });

  if (user) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: `${data.given_name}${data.family_name}`,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const newRefreshToken = jwt.sign(
      { username: `${data.given_name}${data.family_name}` },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("refreshToken", newRefreshToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    // Send authorization roles and access token to user
    return res.json({ user, accessToken });
  } else {
    const destinationFolder = "./uploads/"; // İndirilen resimlerin kaydedileceği klasör
    const newFileName = email;

    await axios({
      method: "GET",
      url: picture,
      responseType: "stream",
    })
      .then((response) => {
        const filePath = `${destinationFolder}${newFileName}.jpg`;
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
          writer.on("finish", resolve);
          writer.on("error", reject);
        });
      })
      .then(() => {});
    let { password, ...result } = await User.create({
      username: `${data.given_name}${data.family_name}`,
      password: "denemesifresi",
      fullname: data.name,
      email: data.email,
      profilePhoto: `${newFileName}.jpg`,
    });

    if (result) {
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: `${data.given_name}${data.family_name}`,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      const newRefreshToken = jwt.sign(
        { username: `${data.given_name}${data.family_name}` },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );

      res.cookie("refreshToken", newRefreshToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      result = result._doc;
      // Send authorization roles and access token to user
      return res.json({ result, accessToken });
    }
  }

  res.status(200).json();
});

router.put("/changeFullname/:newFullname", tokenControl, async (req, res) => {
  try {
    const username = req.user;
    const { value, error } = changeFullnameSchema.validate(
      req.params.newFullname
    );

    if (error) {
      return res.status(500).json({ message: error.message });
    }
    const user = await User.findOne({ username });
    await user.updateOne({ $set: { fullname: value } });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.post("/changePassword", tokenControl, async (req, res) => {
  try {
    const username = req.user;
    const { oldPassword, newPassword, newPasswordAgain } = req.body.password;

    const { value, error } = changePasswordSchema.validate(req.body?.password);

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    if (value.newPassword !== value.newPasswordAgain) {
      return res.sendStatus(500);
    }

    const user = await User.findOne({ username });

    const match = await bcrypt.compare(value.oldPassword, user.password);

    if (match) {
      const hashedPwd = await bcrypt.hash(value.newPassword, 10);
      await user.updateOne({ $set: { password: hashedPwd } });

      return res.sendStatus(200);
    }
    return res.sendStatus(501);
  } catch (err) {
    res.sendStatus(500);
  }
});
router.put("/changeMail/:mail", tokenControl, async (req, res) => {
  try {
    const mail = req.params.mail;
    const username = req.user;

    const { value, error } = changeMailSchema.validate(req.params.mail);

    if (error) {
      return res.status(500).json({ message: error.message });
    }
    const user = await User.findOne({ username });
    await user.updateOne({ $set: { email: value } });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
});
export default router;
