export function determineInvestorProfile(answers: Record<string, any>): string {
  const riskScore = calculateRiskScore(answers)

  if (riskScore <= 25) {
    return "Conservative"
  } else if (riskScore <= 45) {
    return "Moderately Conservative"
  } else if (riskScore <= 65) {
    return "Moderate"
  } else if (riskScore <= 85) {
    return "Moderately Aggressive"
  } else {
    return "Aggressive"
  }
}

export function getRecommendations(profile: string, answers: Record<string, any>): string[] {
  switch (profile) {
    case "Conservative":
      return [
        "Focus on capital preservation with low-risk investments.",
        "Consider government bonds and high-rated corporate bonds.",
        "Limit exposure to stocks and other volatile assets.",
      ]
    case "Moderately Conservative":
      return [
        "Balance capital preservation with modest income generation.",
        "Invest in a mix of bonds and dividend-paying stocks.",
        "Consider real estate investment trusts (REITs) for income.",
      ]
    case "Moderate":
      return [
        "Seek a balance between growth and income.",
        "Diversify across stocks, bonds, and alternative assets.",
        "Rebalance your portfolio regularly to maintain your target asset allocation.",
      ]
    case "Moderately Aggressive":
      return [
        "Prioritize growth with a higher allocation to stocks.",
        "Consider investing in emerging markets and small-cap stocks.",
        "Be prepared for short-term volatility in pursuit of long-term gains.",
      ]
    case "Aggressive":
      return [
        "Maximize long-term growth with a high allocation to stocks.",
        "Consider investing in high-growth sectors such as technology and biotechnology.",
        "Be prepared for significant volatility and potential losses.",
      ]
    default:
      return []
  }
}

export function calculateRiskScore(answers: Record<string, any>): number {
  let score = 50

  // Age
  if (answers.age === "under25") score += 10
  else if (answers.age === "55+") score -= 10

  // Investment Goal
  if (answers.investmentGoal === "preservation") score -= 20
  else if (answers.investmentGoal === "aggressive") score += 20

  // Knowledge
  if (answers.knowledge === "none") score -= 10
  else if (answers.knowledge === "advanced") score += 10

  // Risk Tolerance
  if (answers.riskTolerance === "sell") score -= 20
  else if (answers.riskTolerance === "buy") score += 20

  // Time Horizon
  if (answers.timeHorizon === "less1") score -= 10
  else if (answers.timeHorizon === "more5") score += 10

  // Investment Portion
  if (answers.investmentPortion === "less10") score -= 5
  else if (answers.investmentPortion === "more50") score += 5

  return Math.max(0, Math.min(100, score))
}

export function getBadgeColor(profile: string): string {
  switch (profile) {
    case "Conservative":
      return "bg-green-500"
    case "Moderately Conservative":
      return "bg-green-600"
    case "Moderate":
      return "bg-yellow-500"
    case "Moderately Aggressive":
      return "bg-orange-500"
    case "Aggressive":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

export function getRiskScoreStartColor(riskScore: number): string {
  if (riskScore <= 25) {
    return "#10b981" // Green
  } else if (riskScore <= 50) {
    return "#f59e0b" // Yellow
  } else {
    return "#ef4444" // Red
  }
}

export function getRiskScoreEndColor(riskScore: number): string {
  if (riskScore <= 25) {
    return "#059669" // Dark Green
  } else if (riskScore <= 50) {
    return "#d97706" // Dark Yellow
  } else {
    return "#b91c1c" // Dark Red
  }
}

export function getRiskScoreGlowColor(riskScore: number): string {
  if (riskScore <= 25) {
    return "rgba(16, 185, 129, 0.5)" // Green
  } else if (riskScore <= 50) {
    return "rgba(251, 146, 60, 0.5)" // Yellow
  } else {
    return "rgba(239, 68, 68, 0.5)" // Red
  }
}

export function getProfileDescription(profile: string): string {
  switch (profile) {
    case "Conservative":
      return "You prioritize capital preservation and seek low-risk investments."
    case "Moderately Conservative":
      return "You seek a balance between capital preservation and modest income."
    case "Moderate":
      return "You aim for a balance between growth and income with moderate risk."
    case "Moderately Aggressive":
      return "You prioritize growth with a willingness to take on higher risk."
    case "Aggressive":
      return "You seek maximum long-term growth and are comfortable with significant risk."
    default:
      return "No profile description available."
  }
}

export function getQuestionText(questionId: string): string | null {
  switch (questionId) {
    case "age":
      return "Age Range"
    case "investmentGoal":
      return "Investment Goal"
    case "knowledge":
      return "Financial Knowledge"
    case "riskTolerance":
      return "Risk Tolerance"
    case "timeHorizon":
      return "Time Horizon"
    case "investmentPortion":
      return "Investment Portion"
    case "hasInvestments":
      return "Existing Investments"
    case "investmentTypes":
      return "Investment Types"
    default:
      return null
  }
}

export function getFormattedAnswer(questionId: string, answer: any): string {
  if (typeof answer === "string") {
    switch (questionId) {
      case "age":
        switch (answer) {
          case "under25":
            return "Under 25"
          case "25-34":
            return "25-34"
          case "35-44":
            return "35-44"
          case "45-54":
            return "45-54"
          case "55+":
            return "55 or older"
          default:
            return answer
        }
      case "investmentGoal":
        switch (answer) {
          case "preservation":
            return "Capital preservation"
          case "income":
            return "Generating income"
          case "balanced":
            return "Balanced growth and income"
          case "aggressive":
            return "Aggressive long-term growth"
          default:
            return answer
        }
      case "knowledge":
        switch (answer) {
          case "none":
            return "None"
          case "basic":
            return "Basic"
          case "intermediate":
            return "Intermediate"
          case "advanced":
            return "Advanced"
          default:
            return answer
        }
      case "riskTolerance":
        switch (answer) {
          case "sell":
            return "Sell immediately"
          case "wait":
            return "Wait and monitor"
          case "buy":
            return "Buy more"
          default:
            return answer
        }
      case "timeHorizon":
        switch (answer) {
          case "less1":
            return "Less than 1 year"
          case "1-3":
            return "1-3 years"
          case "3-5":
            return "3-5 years"
          case "more5":
            return "More than 5 years"
          default:
            return answer
        }
      case "investmentPortion":
        switch (answer) {
          case "less10":
            return "Less than 10%"
          case "10-25":
            return "10-25%"
          case "25-50":
            return "25-50%"
          case "more50":
            return "More than 50%"
          default:
            return answer
        }
      case "hasInvestments":
        switch (answer) {
          case "yes":
            return "Yes"
          case "no":
            return "No"
          default:
            return answer
        }
      default:
        return answer
    }
  } else {
    return String(answer)
  }
}
