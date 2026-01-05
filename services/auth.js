import supabase from "../connection/connecedSupaBase.js";
import bcrypt from "bcrypt";

async function verifyPassword(pliainPassword, hashPassword) {
  const match = await bcrypt.compare(pliainPassword, hashPassword);
  return match;
}

export const checkUser = async (username, password) => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("username", username);

  if (data.length === 0) {
    return `user not found !`;
  } else {
    const correctPassword = await verifyPassword(password, data[0].password);

    if (correctPassword) {
      return `userFound!`;
    } else {
      return `wrong password!`;
    }
  }
};

export function isSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }

  return arr;
}

export function sumArry(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    count += arr[i];
  }
  return count;
}
