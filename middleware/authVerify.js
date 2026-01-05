import bcrypt from "bcrypt";
import { checkUser } from "../services/auth.js";

export async function authenticateUserAndPassword(req, res, next) {
  try {
    const username = req.headers["x-username"];
    const password = req.headers["x-password"];

    if (!username || !password) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Missing credentials" });
    }

    const checkUsername = await checkUser(username, password);

    if (checkUsername === "userFound!") {
      next();
    } else {
      res.status(200).json({ msg: "failure login" });
    }
    return;
  } catch (error) {
    console.error(`Authentication error: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
