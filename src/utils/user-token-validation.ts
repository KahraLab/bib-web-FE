import { useStorage } from "@vueuse/core";
import decode, { BibTokenPayload } from "./crypto/token-decode";

const tokenDefaultValue = "__$bT:default";
export const tokenStorageRef = useStorage<string | null>(
  "__$bT",
  tokenDefaultValue
);

/** 检查当前 Token 是否可用 */
export function isBibUserTokenValid() {
  if (!tokenStorageRef.value || tokenStorageRef.value === tokenDefaultValue)
    return false;
  const token = decode(tokenStorageRef.value) as BibTokenPayload;
  if (!token || Date.now() > token.exp * 1000) return false;
  return true;
}

export function usePayloadFromToken() {
  if (tokenStorageRef.value && isBibUserTokenValid()) {
    const { exp, uid, sub } = decode(tokenStorageRef.value) as BibTokenPayload;
    return { expiredAt: exp * 1000, userId: uid, userName: sub };
  } else
    return {} as {
      expiredAt: number;
      userId: number;
      userName: string;
    };
}
