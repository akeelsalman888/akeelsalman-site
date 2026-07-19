import { Resend } from "resend";
import { site } from "../../content";

// Contact form handler. Sends the submission to your inbox via Resend.
//
// Required env vars (set in Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY    — your Resend API key
//   CONTACT_TO_EMAIL  — where messages land (defaults to site.email)
//   CONTACT_FROM_EMAIL— a verified sender on your Resend domain,
//                       e.g. "Akeel Salman <contact@akeelsalman.com>"
//                       (falls back to Resend's shared onboarding sender)

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || site.email;
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bad(message, status = 400) {
  return Response.json({ ok: false, error: message }, { status });
}

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return bad("Invalid request.");
  }

  const name = (data?.name || "").toString().trim();
  const email = (data?.email || "").toString().trim();
  const message = (data?.message || "").toString().trim();
  // Honeypot: real users leave this empty; bots fill it. Pretend success.
  const trap = (data?.company || "").toString().trim();

  if (trap) return Response.json({ ok: true });

  if (!name || !email || !message) {
    return bad("Please fill in your name, email, and a message.");
  }
  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return bad("One of the fields is too long.");
  }
  if (!EMAIL_RE.test(email)) {
    return bad("That email address doesn't look right.");
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Contact form: RESEND_API_KEY is not set.");
    return bad("The contact form isn't configured yet. Please email directly.", 500);
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${name} — akeelsalman.com`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#211d18">
          <h2 style="margin:0 0 12px">New inquiry from akeelsalman.com</h2>
          <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0 0 16px"><strong>Email:</strong>
            <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <div style="white-space:pre-wrap;padding:16px;background:#f3ecdf;border-radius:8px">${escapeHtml(
            message
          )}</div>
        </div>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return bad("Couldn't send your message. Please try emailing directly.", 502);
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return bad("Something went wrong. Please try emailing directly.", 500);
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
