import "server-only";

export function publicSignupEnabled() {
  return process.env.ALLOW_PUBLIC_SIGNUP !== "false";
}

export function siteIndexingEnabled() {
  return process.env.SITE_INDEXING === "true";
}

export function publicError(devMessage: string) {
  return process.env.NODE_ENV === "production" ? "Serviço temporariamente indisponível." : devMessage;
}

export function accountsOnlineMessage() {
  return "O login na internet ainda não está ligado a um banco. As páginas da cidade estão no ar; contas ficam para o próximo passo.";
}

export function isValidNickname(value: string) {
  return /^[A-Za-z0-9._-]{2,32}$/.test(value);
}

export function isStrongPassword(value: string) {
  return value.length >= 8 && value.length <= 72;
}

export function clip(value: string, max: number) {
  return value.trim().slice(0, max);
}

export function isSafeText(value: string, max: number) {
  const text = value.trim();
  return text.length > 0 && text.length <= max;
}
