// JWT token management via Web Crypto API — works in Edge (middleware) and Node.js
const SECRET = process.env.JWT_SECRET ?? "admonde-admin-secret-2024";

function b64url(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function unb64url(s: string): Uint8Array<ArrayBuffer> {
  const decoded = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  const bytes = new Uint8Array(decoded.length);
  for (let i = 0; i < decoded.length; i++) bytes[i] = decoded.charCodeAt(i);
  return bytes;
}

async function hmacKey(usage: KeyUsage[]) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    usage
  );
}

export async function signToken(id: number, email: string): Promise<string> {
  const header = b64url(
    new TextEncoder().encode(JSON.stringify({ alg: "HS256", typ: "JWT" })).buffer as ArrayBuffer
  );
  const payload = b64url(
    new TextEncoder().encode(
      JSON.stringify({
        id,
        email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      })
    ).buffer as ArrayBuffer
  );
  const key = await hmacKey(["sign"]);
  const sig = b64url(
    await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(`${header}.${payload}`).buffer as ArrayBuffer
    )
  );
  return `${header}.${payload}.${sig}`;
}

export async function verifyToken(
  token: string
): Promise<{ id: number; email: string } | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [h, p, s] = parts;
    const key = await hmacKey(["verify"]);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      unb64url(s),
      new TextEncoder().encode(`${h}.${p}`).buffer as ArrayBuffer
    );
    if (!valid) return null;
    const data = JSON.parse(new TextDecoder().decode(unb64url(p)));
    if (data.exp < Math.floor(Date.now() / 1000)) return null;
    return { id: data.id, email: data.email };
  } catch {
    return null;
  }
}

export async function getAuthFromRequest(
  req: Request | { headers: { get(name: string): string | null } }
): Promise<{ id: number; email: string } | null> {
  const cookie = req.headers.get("cookie") ?? "";
  const match = /admin_token=([^;]+)/.exec(cookie);
  if (!match) return null;
  return verifyToken(match[1]);
}
