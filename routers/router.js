import express from "express";
import supabase from "../connection/connecedSupaBase.js";
import { hashPassword } from "../services/signup.js";
import { isSort, sumArry } from "../services/auth.js";
import { authenticateUserAndPassword } from "../middleware/authVerify.js";
const router = express();

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Missing credentials" });
    }
    const password_hash = await hashPassword(password);

    const { data, error } = await supabase
      .from("users")
      .insert({
        username: username,
        password: password_hash,
      })
      .select();
    if (data) {
      res.status(200).json({ msg: "ok" });
    }
    if (error) {
      res.status(401).json({ msg: "error" });
    }
  } catch (error) {
    console.error(`Authentication error: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/verify", authenticateUserAndPassword, async (req, res) => {
  try {
    res.status(200).json({ msg: "Verified" });
  } catch (error) {
    console.error(`Authentication error: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/decode-message", authenticateUserAndPassword, (req, res) => {
  try {
    const { message, password, username } = req.body;

    if (!message || !password || !username) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Missing credentials" });
    }
    if (isSort(message)) {
      const sum = sumArry(message);

      res.status(200).json({ msg: sum });
    } else {
      res.status(201).json({ msg: "Warning traps" });
    }
  } catch (error) {
    console.error(`Authentication error: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
