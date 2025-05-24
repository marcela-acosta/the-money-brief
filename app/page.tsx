"use client";

import { useEffect, useState } from "react";
import { InvestorProfileSurvey } from "@/components/investor-profile-survey";
import { InvestorProfileSummary } from "@/components/investor-profile-summary";
import Link from "next/link";
import { PersonalizedReport } from "@/components/personalized-report";
import { BarChart2 } from "lucide-react";
import Money3DSpinner from "@/components/Money3DSpinner";
import Head from "next/head";

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [report, setReport] = useState<string>("");
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState<string | undefined>(undefined);
  const [wantsPersonalized, setWantsPersonalized] = useState<null | boolean>(
    null
  );

  // Check for shared profile data in URL
  useEffect(() => {
    const handleUrlParams = () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams(window.location.search);
        const data = params.get("data");

        if (data) {
          const decodedData = JSON.parse(decodeURIComponent(data));
          setAnswers(decodedData);
          setCompleted(true);
        }
      } catch (error) {
        console.error("Error parsing shared data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    handleUrlParams();
  }, []);

  const handleSurveyComplete = async (surveyAnswers: Record<string, any>) => {
    setAnswers(surveyAnswers);
    setCompleted(true);
    setReport("");
    setReportError(undefined);
    setReportLoading(true);
    // Formato tabla para el prompt
    const profileTable = `User Profile:\n- First Name: ${surveyAnswers.firstName}\n- Last Name: ${surveyAnswers.lastName}\n- Email: ${surveyAnswers.email}\n- Currently Working: ${surveyAnswers.working}`;
    const surveyTable = `Survey Responses:\n${Object.entries(surveyAnswers)
      .filter(
        ([key]) => !["firstName", "lastName", "email", "working"].includes(key)
      )
      .map(
        ([key, value]) =>
          `- ${key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}: ${value}`
      )
      .join("\n")}`;
    let extraSection = "";
    if (surveyAnswers.emergencyFund === "No") {
      extraSection = `\n\n**Emergency Fund Resources**\n- Learn how to build your emergency fund in Brazil: https://www.nomadbrazil.com/emergency-fund-brazil-guide`;
    }
    const prompt = `You are an expert financial advisor. The user\'s profile and survey responses will be shown above in a formatted summary. DO NOT repeat the user\'s profile or survey responses. Start with "Hi [FirstName]," followed by a brief one-sentence introduction. Keep all sections concise and to the point. Only provide the following sections in this exact order:\n\nHi [FirstName],\n[One brief introductory sentence]\n\n**Risk Profile Analysis**\n[2-3 concise sentences]\n\n**Investment Recommendations**\n[3-4 bullet points with brief explanations]\n\n**Practical Tips**\n[2-3 bullet points]\n\n**Relevant Warnings**\n[2-3 bullet points]\n\n**Motivational Closing**\n[1-2 brief sentences]\n${extraSection}\n\nThe tone should be professional, clear, and empathetic. Write the entire report in English. All resource links must be about investing in Brazil and in English.\n\nUser Profile:\n${profileTable}\n\n${surveyTable}`;
    try {
      const res = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (res.ok) {
        setReport(data.report);
      } else {
        setReportError(data.error || "Failed to generate report.");
      }
    } catch (err) {
      setReportError("Failed to generate report.");
    } finally {
      setReportLoading(false);
    }
  };

  const handleStartOver = () => {
    setAnswers({});
    setCompleted(false);
    setReport("");
    setReportError(undefined);
    setReportLoading(false);
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
        <Head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        </Head>
        <div className="relative z-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-futuristic-green-500"></div>
        </div>
      </main>
    );
  }

  // Nueva animación de carga tras el survey
  if (completed && reportLoading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <Head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        </Head>
        <div className="flex flex-col items-center justify-center gap-4 min-h-[300px]">
          <Money3DSpinner />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      {/* Content layer */}
      <div className="relative z-10 w-full max-w-3xl futuristic-card p-8">
        {!completed ? (
          <InvestorProfileSurvey onComplete={handleSurveyComplete} />
        ) : (
          <>
            <InvestorProfileSummary
              answers={answers}
              onStartOver={handleStartOver}
              personalizedReport={report}
              reportLoading={reportLoading}
              reportError={reportError}
            />
          </>
        )}
        {/* Blog link dentro del cuadro blanco */}
        <div className="mt-6 text-center">
          <Link
            href="/blog"
            className="text-white bg-futuristic-green-600 hover:bg-futuristic-green-700 px-4 py-2 rounded-md transition-colors"
          >
            Read Our Latest Financial Insights
          </Link>
        </div>
      </div>
    </main>
  );
}
