"use client";

import { useEffect, useState } from "react";
import { InvestorProfileSurvey } from "@/components/investor-profile-survey";
import { InvestorProfileSummary } from "@/components/investor-profile-summary";
import Link from "next/link";

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[3px] opacity-90"
          style={{
            backgroundImage: `url("/the-money-brief/images/finance-background.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-futuristic-green-500"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Blurred background layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[3px] opacity-90"
        style={{
          backgroundImage: `url("${basePath}/images/finance-background.png")`,
        }}
      ></div>

      {/* Content layer */}
      <div className="relative z-10 w-full max-w-3xl">
        {completed ? (
          <InvestorProfileSummary
            answers={answers}
            onStartOver={() => {
              // Reset all state
              setAnswers({});
              setCompleted(false);
              // Remove query parameters from URL without page reload
              window.history.replaceState(
                {},
                document.title,
                window.location.pathname
              );
            }}
          />
        ) : (
          <InvestorProfileSurvey
            onComplete={(surveyAnswers) => {
              setAnswers(surveyAnswers);
              setCompleted(true);
            }}
          />
        )}

        {/* Blog link */}
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
