import { Buffer } from "buffer";

const base64ToJson = (base64String: string) => {
  if (!base64String) return undefined;
  const json = Buffer.from(base64String, "base64").toString();
  return JSON.parse(json);
};

const jsonToBase64 = (data?: object) => {
  if (!data) return "";
  const json = JSON.stringify(data);
  return Buffer.from(json).toString("base64");
};

export { base64ToJson, jsonToBase64 };
