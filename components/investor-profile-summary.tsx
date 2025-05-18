"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { PdfRenderer } from "./pdf-renderer"

type InvestorProfileType =
  | "Conservative"
  | "Moderately Conservative"
  | "Moderate"
  | "Moderately Aggressive"
  | "Aggressive"

interface ProfileSummaryProps {
  answers: Record<string, any>
  onStartOver: () => void
}

export function InvestorProfileSummary({ answers, onStartOver }: ProfileSummaryProps) {
  const profile = determineInvestorProfile(answers)
  const recommendations = getRecommendations(profile, answers)
  const riskScore = calculateRiskScore(answers)
  const summaryRef = useRef<HTMLDivElement>(null)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const { toast } = useToast()
  const [showPdfRenderer, setShowPdfRenderer] = useState(false)

  // Generate and download PDF
  const handleDownloadPdf = () => {
    if (isGeneratingPdf) return
    setIsGeneratingPdf(true)
    setShowPdfRenderer(true)
  }

  // Add a handler for when PDF generation is complete:
  const handlePdfComplete = (success: boolean) => {
    setIsGeneratingPdf(false)
    setShowPdfRenderer(false)

    if (success) {
      toast({
        title: "PDF Downloaded",
        description: "Your investor profile has been saved as a PDF.",
      })
    } else {
      toast({
        title: "PDF Generation Failed",
        description: "There was an error creating your PDF. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6 text-center">
      <h1 className="text-3xl font-bold text-futuristic-green-700 mt-6 mb-8">Your Investment Profile Results</h1>

      <Card className="futuristic-card w-full shadow-lg" ref={summaryRef}>
        <CardHeader className="pb-2 border-b border-futuristic-grey-300/30">
          <div className="flex justify-center items-center flex-col">
            <CardTitle className="text-2xl font-bold text-futuristic-green-700 mb-2">Your Investor Profile</CardTitle>
            <Badge className={`futuristic-badge text-white ${getBadgeColor(profile)}`}>{profile}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-futuristic-grey-800">Risk Tolerance Score</h3>
            <div className="futuristic-progress">
              <div
                className="futuristic-progress-bar"
                style={
                  {
                    width: `${riskScore}%`,
                    "--start-color": getRiskScoreStartColor(riskScore),
                    "--end-color": getRiskScoreEndColor(riskScore),
                    "--glow-color": getRiskScoreGlowColor(riskScore),
                  } as React.CSSProperties
                }
              ></div>
            </div>
            <div className="flex justify-between text-sm text-futuristic-grey-700">
              <span>Conservative</span>
              <span>Moderate</span>
              <span>Aggressive</span>
            </div>
          </div>

          <div className="futuristic-panel p-5 space-y-4">
            <h3 className="text-lg font-semibold text-futuristic-green-600">Profile Summary</h3>
            <p className="text-futuristic-grey-800">{getProfileDescription(profile)}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-futuristic-grey-800">Personalized Recommendations</h3>
            <ul className="space-y-3">
              {recommendations.map((rec, index) => (
                <li key={index} className="recommendation-card flex items-start p-3 pl-5 rounded-lg text-left">
                  <span className="inline-flex items-center justify-center rounded-full bg-futuristic-green-100 text-futuristic-green-600 h-5 w-5 text-xs mr-2 mt-0.5 shadow-sm">
                    ✓
                  </span>
                  <span className="text-futuristic-grey-800">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-futuristic-grey-800">Your Responses</h3>
            <div className="futuristic-panel p-1">
              <div className="bg-white/20 rounded-lg">
                {Object.entries(answers).map(([key, value], index) => {
                  const question = getQuestionText(key)
                  const answer = getFormattedAnswer(key, value)

                  if (!question) return null

                  return (
                    <div
                      key={key}
                      className={`grid grid-cols-2 gap-2 p-3 hover:bg-white/30 transition-colors ${
                        index !== Object.entries(answers).length - 1 ? "border-b border-white/20" : ""
                      }`}
                    >
                      <div className="text-futuristic-grey-700 text-center">{question}</div>
                      <div className="text-futuristic-grey-900 font-medium text-center">{answer}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-4">
        <Button
          onClick={onStartOver}
          variant="outline"
          className="futuristic-button bg-white/20 hover:bg-white/30 text-futuristic-grey-800 border-futuristic-grey-300"
        >
          Start Over
        </Button>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="futuristic-button bg-futuristic-green-600 hover:bg-futuristic-green-700 text-white flex items-center"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
              >
                {isGeneratingPdf ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save your profile as a PDF document</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {showPdfRenderer && (
        <PdfRenderer
          profile={profile}
          recommendations={recommendations}
          riskScore={riskScore}
          answers={answers}
          onComplete={handlePdfComplete}
        />
      )}
    </div>
  )
}

// Helper functions remain the same
function determineInvestorProfile(answers: Record<string, any>): InvestorProfileType {
  let score = 0

  // Age factor (younger = more risk tolerance)
  if (answers.age === "under25") score += 10
  else if (answers.age === "25-34") score += 8
  else if (answers.age === "35-44") score += 6
  else if (answers.age === "45-54") score += 4
  else if (answers.age === "55+") score += 2

  // Investment goal
  if (answers.investmentGoal === "preservation") score += 1
  else if (answers.investmentGoal === "income") score += 3
  else if (answers.investmentGoal === "balanced") score += 6
  else if (answers.investmentGoal === "aggressive") score += 10

  // Knowledge level
  if (answers.knowledge === "none") score += 1
  else if (answers.knowledge === "basic") score += 3
  else if (answers.knowledge === "intermediate") score += 6
  else if (answers.knowledge === "advanced") score += 10

  // Risk tolerance
  if (answers.riskTolerance === "sell") score += 1
  else if (answers.riskTolerance === "wait") score += 5
  else if (answers.riskTolerance === "buy") score += 10

  // Time horizon
  if (answers.timeHorizon === "less1") score += 1
  else if (answers.timeHorizon === "1-3") score += 3
  else if (answers.timeHorizon === "3-5") score += 6
  else if (answers.timeHorizon === "more5") score += 10

  // Investment portion
  if (answers.investmentPortion === "less10") score += 2
  else if (answers.investmentPortion === "10-25") score += 4
  else if (answers.investmentPortion === "25-50") score += 7
  else if (answers.investmentPortion === "more50") score += 10

  // Normalize score to 0-100
  const normalizedScore = Math.min(Math.round((score / 60) * 100), 100)

  // Determine profile based on score
  if (normalizedScore < 20) return "Conservative"
  if (normalizedScore < 40) return "Moderately Conservative"
  if (normalizedScore < 60) return "Moderate"
  if (normalizedScore < 80) return "Moderately Aggressive"
  return "Aggressive"
}

function calculateRiskScore(answers: Record<string, any>): number {
  let score = 0

  // Age factor
  if (answers.age === "under25") score += 10
  else if (answers.age === "25-34") score += 8
  else if (answers.age === "35-44") score += 6
  else if (answers.age === "45-54") score += 4
  else if (answers.age === "55+") score += 2

  // Investment goal
  if (answers.investmentGoal === "preservation") score += 1
  else if (answers.investmentGoal === "income") score += 3
  else if (answers.investmentGoal === "balanced") score += 6
  else if (answers.investmentGoal === "aggressive") score += 10

  // Risk tolerance
  if (answers.riskTolerance === "sell") score += 1
  else if (answers.riskTolerance === "wait") score += 5
  else if (answers.riskTolerance === "buy") score += 10

  // Time horizon
  if (answers.timeHorizon === "less1") score += 1
  else if (answers.timeHorizon === "1-3") score += 3
  else if (answers.timeHorizon === "3-5") score += 6
  else if (answers.timeHorizon === "more5") score += 10

  return Math.min(Math.round((score / 40) * 100), 100)
}

function getRecommendations(profile: InvestorProfileType, answers: Record<string, any>): string[] {
  const recommendations: string[] = []

  // Base recommendations on profile
  if (profile === "Conservative") {
    recommendations.push("Focus on capital preservation with high-quality bonds and certificates of deposit.")
    recommendations.push("Consider allocating 70-80% to fixed income and 20-30% to equities.")
    recommendations.push("Maintain an emergency fund covering 6-12 months of expenses.")
  } else if (profile === "Moderately Conservative") {
    recommendations.push("Prioritize income and modest growth with a mix of bonds and dividend-paying stocks.")
    recommendations.push("Consider allocating 60% to fixed income and 40% to equities.")
    recommendations.push("Explore blue-chip stocks with consistent dividend histories.")
  } else if (profile === "Moderate") {
    recommendations.push("Balance growth and income with a diversified portfolio of stocks and bonds.")
    recommendations.push("Consider allocating 40-50% to fixed income and 50-60% to equities.")
    recommendations.push("Include a mix of growth and value stocks across different sectors.")
  } else if (profile === "Moderately Aggressive") {
    recommendations.push("Focus on long-term growth with a higher allocation to equities.")
    recommendations.push("Consider allocating 25-30% to fixed income and 70-75% to equities.")
    recommendations.push("Explore international markets for diversification opportunities.")
  } else if (profile === "Aggressive") {
    recommendations.push("Maximize growth potential with a portfolio heavily weighted toward equities.")
    recommendations.push("Consider allocating 10-15% to fixed income and 85-90% to equities.")
    recommendations.push("Explore emerging markets and small-cap stocks for higher growth potential.")
  }

  // Add personalized recommendations based on specific answers
  if (answers.knowledge === "none" || answers.knowledge === "basic") {
    recommendations.push("Consider working with a financial advisor to build your investment knowledge.")
  }

  if (answers.timeHorizon === "less1" || answers.timeHorizon === "1-3") {
    recommendations.push("For short-term goals, maintain higher cash reserves and focus on liquidity.")
  }

  if (answers.investmentPortion === "less10") {
    recommendations.push("Consider increasing your savings rate to build your investment portfolio faster.")
  }

  return recommendations
}

function getProfileDescription(profile: InvestorProfileType): string {
  switch (profile) {
    case "Conservative":
      return "You prioritize protecting your capital over growth. You prefer stable, low-risk investments and are uncomfortable with significant market fluctuations. Your portfolio should focus on preserving wealth while generating modest income."
    case "Moderately Conservative":
      return "You seek to protect your capital while achieving modest growth. You can tolerate some market fluctuations but prefer stability. Your portfolio should balance income generation with some growth-oriented investments."
    case "Moderate":
      return "You aim for a balance between growth and stability. You understand market fluctuations are normal and can tolerate moderate volatility. Your portfolio should have a balanced mix of growth and income investments."
    case "Moderately Aggressive":
      return "You prioritize long-term growth and can tolerate significant market fluctuations. You understand that higher returns come with higher risk and are comfortable with volatility. Your portfolio should focus on growth with some stability."
    case "Aggressive":
      return "You seek maximum long-term growth and can tolerate substantial market fluctuations. You have a long time horizon and are comfortable with significant volatility. Your portfolio should focus primarily on growth investments."
  }
}

function getBadgeColor(profile: InvestorProfileType): string {
  switch (profile) {
    case "Conservative":
      return "bg-gradient-to-r from-blue-500 to-blue-600 shadow-md"
    case "Moderately Conservative":
      return "bg-gradient-to-r from-teal-500 to-teal-600 shadow-md"
    case "Moderate":
      return "bg-gradient-to-r from-futuristic-green-500 to-futuristic-green-600 shadow-md"
    case "Moderately Aggressive":
      return "bg-gradient-to-r from-amber-500 to-amber-600 shadow-md"
    case "Aggressive":
      return "bg-gradient-to-r from-rose-500 to-rose-600 shadow-md"
  }
}

function getRiskScoreStartColor(score: number): string {
  if (score < 30) return "#3B82F6" // blue-500
  if (score < 50) return "#14B8A6" // teal-500
  if (score < 70) return "#10B981" // green-500
  if (score < 85) return "#F59E0B" // amber-500
  return "#F43F5E" // rose-500
}

function getRiskScoreEndColor(score: number): string {
  if (score < 30) return "#2563EB" // blue-600
  if (score < 50) return "#0D9488" // teal-600
  if (score < 70) return "#059669" // green-600
  if (score < 85) return "#D97706" // amber-600
  return "#E11D48" // rose-600
}

function getRiskScoreGlowColor(score: number): string {
  if (score < 30) return "rgba(59, 130, 246, 0.5)" // blue glow
  if (score < 50) return "rgba(20, 184, 166, 0.5)" // teal glow
  if (score < 70) return "rgba(16, 185, 129, 0.5)" // green glow
  if (score < 85) return "rgba(245, 158, 11, 0.5)" // amber glow
  return "rgba(244, 63, 94, 0.5)" // rose glow
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
  }

  return questionMap[questionId] || null
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
  }

  if (answerMaps[questionId] && answerMaps[questionId][value]) {
    return answerMaps[questionId][value]
  }

  // For text inputs, return the value as is
  return value
}
