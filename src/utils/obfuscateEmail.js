export function obfuscateEmail(email) {
  if (email) {
    const [localPart, domain] = email?.split("@");

    // Ensure exactly 5 characters after the first character
    const obfuscatedLocalPart = localPart[0] + "*****";
    return `${obfuscatedLocalPart}@${domain}`;
  }
}
