"use client";

type InvestorProfileType =
  | "Conservative"
  | "Moderately Conservative"
  | "Moderate"
  | "Moderately Aggressive"
  | "Aggressive";

interface PdfExportProps {
  profile: InvestorProfileType;
  recommendations: string[];
  riskScore: number;
  answers: Record<string, any>;
}

export function PdfExport({
  profile,
  recommendations,
  riskScore,
  answers,
}: PdfExportProps) {
  return (
    <div
      className="pdf-export-container"
      style={{ width: "800px", padding: "20px", backgroundColor: "white" }}
    >
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Your Investment Profile Results
      </h1>

      <div
        className="w-full shadow-lg rounded-lg border border-gray-200 overflow-hidden"
        style={{ backgroundColor: "white" }}
      >
        <div className="flex justify-center items-center flex-col p-4">
          <div
            className="tracking-tight text-2xl font-bold mb-2"
            style={{ color: "#059669" }}
          >
            {profile}
          </div>
        </div>
        <div className="space-y-4 p-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              Risk Tolerance Score
            </h3>
            <div className="h-2 rounded-full overflow-hidden bg-gray-200">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${riskScore}%`,
                  backgroundColor: getRiskScoreColorSimple(riskScore),
                }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Conservative</span>
              <span>Moderate</span>
              <span>Aggressive</span>
            </div>
          </div>

          <div
            className="p-4 space-y-3 border rounded-lg"
            style={{ borderColor: "rgba(16, 185, 129, 0.2)" }}
          >
            <h3
              className="text-lg font-semibold text-center"
              style={{ color: "#059669" }}
            >
              Profile Summary
            </h3>
            <p className="text-gray-800 text-center">
              {getProfileDescription(profile)}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              Personalized Recommendations
            </h3>
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li
                  key={index}
                  className="flex items-start p-2 rounded-lg border-l-4"
                  style={{
                    borderLeftColor: "#10b981",
                    backgroundColor: "rgba(240, 240, 240, 0.5)",
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center rounded-full h-5 w-5 text-xs mr-2 mt-0.5 shadow-sm"
                    style={{
                      backgroundColor: "rgba(16, 185, 129, 0.1)",
                      color: "#059669",
                    }}
                  >
                    ✓
                  </span>
                  <span className="text-gray-800">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              Your Responses
            </h3>
            <div
              className="border rounded-lg overflow-hidden"
              style={{ borderColor: "rgba(16, 185, 129, 0.2)" }}
            >
              <div className="bg-gray-50 rounded-lg">
                {Object.entries(answers).map(([key, value], index) => {
                  const question = getQuestionText(key);
                  const answer = getFormattedAnswer(key, value);

                  if (!question) return null;

                  return (
                    <div
                      key={key}
                      className="grid grid-cols-2 gap-2 p-2"
                      style={{
                        borderBottom:
                          index !== Object.entries(answers).length - 1
                            ? "1px solid rgba(220, 220, 220, 0.8)"
                            : "none",
                        backgroundColor:
                          index % 2 === 0
                            ? "rgba(240, 240, 240, 0.5)"
                            : "rgba(250, 250, 250, 0.5)",
                      }}
                    >
                      <div className="text-gray-600 text-center">
                        {question}
                      </div>
                      <div className="text-gray-900 font-medium text-center">
                        {answer}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-6 text-sm text-gray-500">
        Generated on {new Date().toLocaleDateString()}
      </div>
    </div>
  );
}

// Helper functions remain the same
function getBadgeColorSimple(profile: InvestorProfileType): string {
  switch (profile) {
    case "Conservative":
      return "#3B82F6"; // blue-500
    case "Moderately Conservative":
      return "#14B8A6"; // teal-500
    case "Moderate":
      return "#10B981"; // green-500
    case "Moderately Aggressive":
      return "#F59E0B"; // amber-500
    case "Aggressive":
      return "#EF4444"; // red-500
  }
}

function getRiskScoreColorSimple(score: number): string {
  if (score < 30) return "#3B82F6"; // blue-500
  if (score < 50) return "#14B8A6"; // teal-500
  if (score < 70) return "#10B981"; // green-500
  if (score < 85) return "#F59E0B"; // amber-500
  return "#EF4444"; // red-500
}

function getProfileDescription(profile: InvestorProfileType): string {
  switch (profile) {
    case "Conservative":
      return "You prioritize protecting your capital over growth. You prefer stable, low-risk investments and are uncomfortable with significant market fluctuations. Your portfolio should focus on preserving wealth while generating modest income.";
    case "Moderately Conservative":
      return "You seek to protect your capital while achieving modest growth. You can tolerate some market fluctuations but prefer stability. Your portfolio should balance income generation with some growth-oriented investments.";
    case "Moderate":
      return "You aim for a balance between growth and stability. You understand market fluctuations are normal and can tolerate moderate volatility. Your portfolio should have a balanced mix of growth and income investments.";
    case "Moderately Aggressive":
      return "You prioritize long-term growth and can tolerate significant market fluctuations. You understand that higher returns come with higher risk and are comfortable with volatility. Your portfolio should focus on growth with some stability.";
    case "Aggressive":
      return "You seek maximum long-term growth and can tolerate substantial market fluctuations. You have a long time horizon and are comfortable with significant volatility. Your portfolio should focus primarily on growth investments.";
  }
}

function getQuestionText(questionId: string): string | null {
  const questionMap: Record<string, string> = {
    age: "Age Range",
    investmentGoal: "Investment Goal",
    knowledge: "Financial Knowledge",
    riskTolerance: "Risk Tolerance",
    timeHorizon: "Time Horizon",
    investmentPortion: "Investment Portion",
    hasInvestments: "Current Investments",
    investmentTypes: "Investment Types",
  };

  return questionMap[questionId] || null;
}

function getFormattedAnswer(questionId: string, value: string): string {
  const answerMaps: Record<string, Record<string, string>> = {
    age: {
      under25: "Under 25",
      "25-34": "25–34",
      "35-44": "35–44",
      "45-54": "45–54",
      "55+": "55 or older",
    },
    investmentGoal: {
      preservation: "Capital preservation",
      income: "Generating income",
      balanced: "Balanced growth and income",
      aggressive: "Aggressive long-term growth",
    },
    knowledge: {
      none: "None",
      basic: "Basic",
      intermediate: "Intermediate",
      advanced: "Advanced",
    },
    riskTolerance: {
      sell: "Sell immediately to avoid further losses",
      wait: "Wait and monitor the market",
      buy: "Buy more while prices are low",
    },
    timeHorizon: {
      less1: "Less than 1 year",
      "1-3": "1–3 years",
      "3-5": "3–5 years",
      more5: "More than 5 years",
    },
    investmentPortion: {
      less10: "Less than 10%",
      "10-25": "10–25%",
      "25-50": "25–50%",
      more50: "More than 50%",
    },
    hasInvestments: {
      yes: "Yes",
      no: "No",
    },
  };

  if (answerMaps[questionId] && answerMaps[questionId][value]) {
    return answerMaps[questionId][value];
  }

  // For text inputs, return the value as is
  return value;
}
