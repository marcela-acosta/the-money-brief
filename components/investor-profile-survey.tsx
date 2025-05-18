"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

interface InvestorProfileSurveyProps {
  onComplete: (answers: Record<string, any>) => void
}

export function InvestorProfileSurvey({ onComplete }: InvestorProfileSurveyProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isTransitioning, setIsTransitioning] = useState(false)

  const questions = [
    {
      id: "age",
      question: "What is your age range?",
      type: "radio",
      options: [
        { value: "under25", label: "Under 25" },
        { value: "25-34", label: "25–34" },
        { value: "35-44", label: "35–44" },
        { value: "45-54", label: "45–54" },
        { value: "55+", label: "55 or older" },
      ],
    },
    {
      id: "investmentGoal",
      question: "What is your primary investment goal?",
      type: "radio",
      options: [
        { value: "preservation", label: "Capital preservation" },
        { value: "income", label: "Generating income" },
        { value: "balanced", label: "Balanced growth and income" },
        { value: "aggressive", label: "Aggressive long-term growth" },
      ],
    },
    {
      id: "knowledge",
      question: "How would you describe your knowledge of financial markets?",
      type: "radio",
      options: [
        { value: "none", label: "None" },
        { value: "basic", label: "Basic" },
        { value: "intermediate", label: "Intermediate" },
        { value: "advanced", label: "Advanced" },
      ],
    },
    {
      id: "riskTolerance",
      question: "How would you react if your investment dropped 20% in a short period?",
      type: "radio",
      options: [
        { value: "sell", label: "Sell immediately to avoid further losses" },
        { value: "wait", label: "Wait and monitor the market" },
        { value: "buy", label: "Buy more while prices are low" },
      ],
    },
    {
      id: "timeHorizon",
      question: "What is your investment time horizon?",
      type: "radio",
      options: [
        { value: "less1", label: "Less than 1 year" },
        { value: "1-3", label: "1–3 years" },
        { value: "3-5", label: "3–5 years" },
        { value: "more5", label: "More than 5 years" },
      ],
    },
    {
      id: "investmentPortion",
      question: "What portion of your income can you invest regularly?",
      type: "radio",
      options: [
        { value: "less10", label: "Less than 10%" },
        { value: "10-25", label: "10–25%" },
        { value: "25-50", label: "25–50%" },
        { value: "more50", label: "More than 50%" },
      ],
    },
    {
      id: "hasInvestments",
      question: "Do you currently have other investments?",
      type: "radio",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      id: "investmentTypes",
      question: "What types of assets do you hold?",
      type: "textarea",
      placeholder: "e.g., stocks, bonds, real estate, crypto",
      conditional: {
        questionId: "hasInvestments",
        value: "yes",
      },
    },
  ]

  // Filter questions based on conditionals
  const filteredQuestions = questions.filter((q) => {
    if (!q.conditional) return true

    const { questionId, value } = q.conditional
    return answers[questionId] === value
  })

  const progress = (currentQuestion / filteredQuestions.length) * 100

  // Auto-advance to next question after selection (with a slight delay for animation)
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        if (currentQuestion < filteredQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
        } else {
          onComplete(answers)
        }
        setIsTransitioning(false)
      }, 300) // Short delay for visual feedback

      return () => clearTimeout(timer)
    }
  }, [isTransitioning, currentQuestion, filteredQuestions.length, answers, onComplete])

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [filteredQuestions[currentQuestion].id]: value })

    // For radio buttons, auto-advance
    if (filteredQuestions[currentQuestion].type === "radio") {
      setIsTransitioning(true)
    }
  }

  const handleSubmit = () => {
    onComplete(answers)
  }

  const currentQuestionData = filteredQuestions[currentQuestion]
  const isLastQuestion = currentQuestion === filteredQuestions.length - 1
  const canProceed = answers[currentQuestionData?.id] !== undefined

  return (
    <div className="space-y-6 text-center">
      <div className="space-y-6 mb-8">
        <h1 className="text-3xl font-bold text-futuristic-green-700 mt-6">Investor Profile Assessment</h1>
      </div>

      <div className="futuristic-progress">
        <div
          className="futuristic-progress-bar"
          style={
            {
              width: `${progress}%`,
              "--start-color": "#10B981",
              "--end-color": "#059669",
              "--glow-color": "rgba(16, 185, 129, 0.5)",
            } as React.CSSProperties
          }
        ></div>
      </div>

      <Card className="futuristic-card w-full shadow-lg">
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-futuristic-grey-800 text-center">
                {currentQuestionData.question}
              </h2>

              {currentQuestionData.type === "radio" && (
                <RadioGroup
                  value={answers[currentQuestionData.id] || ""}
                  onValueChange={handleAnswer}
                  className="space-y-3"
                >
                  {currentQuestionData.options?.map((option) => (
                    <div
                      key={option.value}
                      className={`option-card p-4 rounded-lg hover:bg-white/30 transition-colors cursor-pointer ${
                        answers[currentQuestionData.id] === option.value ? "selected bg-white/30" : ""
                      }`}
                      onClick={() => {
                        if (answers[currentQuestionData.id] !== option.value) {
                          handleAnswer(option.value)
                        }
                      }}
                    >
                      <div className="text-base py-1 text-futuristic-grey-800 text-center">{option.label}</div>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestionData.type === "textarea" && (
                <div className="space-y-4">
                  <div className="futuristic-panel p-1">
                    <Textarea
                      placeholder={currentQuestionData.placeholder}
                      value={answers[currentQuestionData.id] || ""}
                      onChange={(e) => handleAnswer(e.target.value)}
                      className="min-h-[100px] border-0 focus:ring-0 focus:outline-none bg-white/20 resize-none text-futuristic-grey-800 text-center"
                    />
                  </div>

                  {/* Only show submit button for textarea questions or the last question */}
                  {isLastQuestion && (
                    <div className="flex justify-center">
                      <Button
                        onClick={handleSubmit}
                        disabled={!canProceed}
                        className="futuristic-button bg-futuristic-green-600 hover:bg-futuristic-green-700 text-white"
                      >
                        Submit
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="futuristic-button bg-white/20 hover:bg-white/30 text-futuristic-grey-800 border-futuristic-grey-300 flex items-center"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="text-sm text-futuristic-grey-700 flex items-center bg-white/30 px-3 py-1 rounded-full">
              Question {currentQuestion + 1} of {filteredQuestions.length}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
