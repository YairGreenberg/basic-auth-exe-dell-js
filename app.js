import { hashPassword, verifyPassword } from "./index.js";





const hashed = await hashPassword('12345678',10)
console.log("heshed:",hashed);

const ok = await verifyPassword('12345678',hashed)
console.log("match?",ok);

