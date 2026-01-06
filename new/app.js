import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { requireAuth } from './requireAuth.js';

const app = express();
app.use(express.json());

// דוגמה למאגר משתמשים (כאן תבוא השאילתה ל-DB שלך)
const users = []; 

// 1. Signup - שמירת סיסמה מוצפנת (Hash)
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const password_hash = await bcrypt.hash(password, 10);
    users.push({ username, password_hash });
    res.status(201).json({ status: "User created" });
});

// 2. Verify - כניסה והנפקת JWT
app.post('/verify', async (req, res) => {
    const { username, password } = req.body;
    
    // חיפוש המשתמש (במציאות: SELECT מ-MySQL)
    const user = users.find(u => u.username === username);
    if (!user) return res.status(401).json({ status: "Unauthorized" });

    // השוואת סיסמה בעזרת bcrypt
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ status: "Unauthorized" });

    // יצירת טוקן (Payload מכיל רק username)
    const token = jwt.sign(
        { username: user.username }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({ status: "Verified", token });
});

// 3. Decode Message - נתיב מוגן עם לוגיקה
app.post('/decode-message', requireAuth, (req, res) => {
    const { message } = req.body; // המערך מהגוף
    const currentAnalyst = req.user.username; // השם מגיע מהטוקן!

    // בדיקה האם המערך עולה (Ascending)
    let isAscending = true;
    for (let i = 0; i < message.length - 1; i++) {
        if (message[i] >= message[i + 1]) {
            isAscending = false;
            break;
        }
    }

    if (isAscending) {
        const sum = message.reduce((a, b) => a + b, 0);
        return res.json({ analyst: currentAnalyst, result: sum });
    } else {
        return res.json({ analyst: currentAnalyst, result: -1 });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));