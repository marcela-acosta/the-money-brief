export function getQuestionText(questionId: string): string | null {
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

export function getFormattedAnswer(questionId: string, value: string): string {
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
