import bcrypt from "bcrypt";

export async function hashPassword(pliainPassword, saltRound = 10) {
  const hashPassword = await bcrypt.hash(pliainPassword, saltRound);
  return hashPassword;
}
