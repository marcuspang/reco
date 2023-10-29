// This was necessary because Lighthouse was not working at all
import { createCipheriv, createDecipheriv } from "crypto";

const algorithm = "aes-256-cbc";
const key = process.env.IPFS_SECRET_KEY;
const iv = process.env.IPFS_IV;

export function encrypt(text) {
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export function decrypt(encrypted) {
  const decipher = createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
