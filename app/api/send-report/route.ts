import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getQuestionText, getFormattedAnswer } from "@/utils/answerFormatting";

export async function POST(req: NextRequest) {
  const {
    email,
    profile,
    recommendations,
    riskScore,
    answers,
    saludoCierre,
    resources,
    pdfBase64,
  } = await req.json();

  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
    <div>
      ${(Array.isArray(saludoCierre) ? saludoCierre : [saludoCierre])
        .map((el) => {
          // Ensure we get string content from React nodes
          const content =
            typeof el === "string" ? el : el?.props?.children || "";
          return `<p>${content.trim()}</p>`;
        })
        .join("")}
      <h2>Your Investment Profile: ${profile}</h2>
      <h3>Risk Tolerance Score: ${riskScore}</h3>
      <h3>Personalized Recommendations:</h3>
      <ul>
        ${recommendations.map((rec: string) => `<li>${rec}</li>`).join("")}
      </ul>
      <h3>Your Responses:</h3>
      <ul>
        ${Object.entries(answers)
          .map(([key, value]) => {
            const question = getQuestionText(key);
            const answer = getFormattedAnswer(key, value as string);
            if (!question) return ""; // Skip if question text not found
            return `<li><b>${question}:</b> ${answer}</li>`;
          })
          .join("")}
      </ul>
      <h3>Further Investment Resources:</h3>
      <ul>
        ${resources
          .map(
            (r: any) =>
              `<li>${r.text.replace(/\.$/, "")}: <a href="${r.link}">${
                r.linkText
              }</a></li>`
          )
          .join("")}
      </ul>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Personalized Investment Report",
      html,
      attachments: pdfBase64
        ? [
            {
              filename: "Investor_Profile.pdf",
              content: pdfBase64.split(",")[1], // solo la parte base64
              encoding: "base64",
            },
          ]
        : [],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}
