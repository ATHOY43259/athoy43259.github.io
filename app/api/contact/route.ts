import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL   = "athoykanti.roy1612@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service not configured. Add RESEND_API_KEY to .env.local" },
      { status: 503 },
    );
  }

  const body = await req.json();
  const { name, email, subject, message } = body as Record<string, string>;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from:     FROM_EMAIL,
    to:       TO_EMAIL,
    replyTo:  email,
    subject:  `[Portfolio] ${subject}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#0f0f1a;color:#e2e8f0;border-radius:12px">
        <h2 style="color:#6c63ff;margin-top:0">New message from your portfolio</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
          <tr>
            <td style="padding:8px 0;color:#94a3b8;width:90px;vertical-align:top">From</td>
            <td style="padding:8px 0;font-weight:600">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#94a3b8;vertical-align:top">Email</td>
            <td style="padding:8px 0"><a href="mailto:${email}" style="color:#6c63ff">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#94a3b8;vertical-align:top">Subject</td>
            <td style="padding:8px 0">${subject}</td>
          </tr>
        </table>
        <div style="background:#1a1a2e;padding:20px;border-radius:8px;border-left:3px solid #6c63ff;white-space:pre-wrap">${message}</div>
        <p style="color:#475569;font-size:12px;margin-top:24px;margin-bottom:0">
          Sent via your portfolio contact form · Reply to this email to respond directly to ${name}.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
