"use client";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export function BlogPost() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Content layer */}
      <div className="relative z-10 w-full max-w-4xl">
        <Card className="futuristic-card w-full shadow-lg">
          <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold text-futuristic-green-700 text-center">
              📉 Banco do Brasil Stock Plummets Over 12% After Q1 Earnings Miss
            </h1>

            <p className="text-center text-futuristic-grey-700">
              <strong>Date:</strong> May 17, 2025
              <br />
              <strong>Author:</strong> The Money Brief
            </p>

            <div className="space-y-6">
              <p className="text-futuristic-grey-800">
                On Friday, May 16, Banco do Brasil (BVMF: BBAS3) suffered a
                dramatic market downturn, with its stock closing at{" "}
                <strong>R$25.67</strong>, marking a{" "}
                <strong>12.69% decline</strong> from the previous day's close of
                R$29.40. This sharp drop came in the wake of a disappointing
                first-quarter earnings report that missed analysts' expectations
                and prompted immediate revisions to the bank's 2025 outlook.
              </p>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-futuristic-green-600">
                  🚨 Q1 2025 Earnings Disappointment
                </h2>
                <div className="futuristic-panel p-1">
                  <div className="bg-white/20 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="p-3 text-left text-futuristic-grey-800">
                            Metric
                          </th>
                          <th className="p-3 text-left text-futuristic-grey-800">
                            Reported
                          </th>
                          <th className="p-3 text-left text-futuristic-grey-800">
                            Analyst Expectation
                          </th>
                          <th className="p-3 text-left text-futuristic-grey-800">
                            Surprise
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/20">
                          <td className="p-3 text-futuristic-grey-800">
                            Revenue
                          </td>
                          <td className="p-3 text-futuristic-grey-800">
                            R$24.0 billion
                          </td>
                          <td className="p-3 text-futuristic-grey-800">
                            ~R$26.3 billion
                          </td>
                          <td className="p-3 text-futuristic-grey-800 text-red-500">
                            -8.8%
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-futuristic-grey-800">
                            EPS (Earnings per Share)
                          </td>
                          <td className="p-3 text-futuristic-grey-800">
                            R$1.19
                          </td>
                          <td className="p-3 text-futuristic-grey-800">
                            ~R$1.45
                          </td>
                          <td className="p-3 text-futuristic-grey-800 text-red-500">
                            -18%
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-futuristic-green-600">
                  📉 Market Reaction
                </h2>
                <p className="text-futuristic-grey-800">
                  The broader <strong>Bovespa index</strong> declined only{" "}
                  <strong>0.11%</strong> on the same day, indicating that{" "}
                  <strong>
                    Banco do Brasil's stock plunge was not part of a broader
                    market downturn
                  </strong>
                  , but rather a direct reaction to company-specific
                  developments.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-futuristic-green-600">
                  📉 Analyst Downgrades and Revised Forecasts
                </h2>
                <p className="text-futuristic-grey-800">
                  Following the earnings release, several analysts revised their
                  projections downward:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-futuristic-grey-800">
                  <li>
                    <strong>2025 Revenue Forecast:</strong> Adjusted to{" "}
                    <strong>R$107.1 billion</strong>
                  </li>
                  <li>
                    <strong>2025 EPS Forecast:</strong> Lowered to{" "}
                    <strong>R$5.92</strong>
                  </li>
                </ul>
                <p className="text-futuristic-grey-800">
                  These adjustments suggest{" "}
                  <strong>diminished earnings potential</strong> for the
                  remainder of the fiscal year.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-futuristic-green-600">
                  💬 Investor Sentiment and What's Next
                </h2>
                <p className="text-futuristic-grey-800">
                  Despite strong fundamentals and a large customer base, Banco
                  do Brasil faces increased scrutiny over:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-futuristic-grey-800">
                  <li>Cost management amid rising inflation pressures</li>
                  <li>
                    Potential credit risk as interest rates remain elevated
                  </li>
                  <li>Competition from fintechs and digital-first banks</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-futuristic-green-600">
                  📊 Summary
                </h2>
                <div className="futuristic-panel p-1">
                  <div className="bg-white/20 rounded-lg">
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-white/20">
                          <td className="p-3 font-semibold text-futuristic-grey-800">
                            Event
                          </td>
                          <td className="p-3 text-futuristic-grey-800">
                            Q1 2025 earnings miss
                          </td>
                        </tr>
                        <tr className="border-b border-white/20">
                          <td className="p-3 font-semibold text-futuristic-grey-800">
                            Stock Movement
                          </td>
                          <td className="p-3 text-futuristic-grey-800">
                            -12.69% on May 16
                          </td>
                        </tr>
                        <tr className="border-b border-white/20">
                          <td className="p-3 font-semibold text-futuristic-grey-800">
                            Analyst Revisions
                          </td>
                          <td className="p-3 text-futuristic-grey-800">
                            Lowered revenue and EPS projections
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-futuristic-grey-800">
                            Market Reaction
                          </td>
                          <td className="p-3 text-futuristic-grey-800">
                            Company-specific decline, not broad market-driven
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-futuristic-green-600">
                  📚 Sources & Further Reading
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <a
                      href="https://simplywall.st/stocks/br/banks/bovespa-bbas3/banco-do-brasil-shares/news/earnings-miss-banco-do-brasil-sa-missed-eps-by-18-and-analys"
                      target="_blank"
                      className="text-futuristic-green-600 hover:underline"
                      rel="noreferrer"
                    >
                      Banco do Brasil Earnings Miss – SimplyWall.St
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://markets.ft.com/data/equities/tearsheet/summary?s=BBAS3%3ASAO"
                      target="_blank"
                      className="text-futuristic-green-600 hover:underline"
                      rel="noreferrer"
                    >
                      BBAS3 Stock Summary – Financial Times
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.investing.com/news/stock-market-news/brazil-stocks-lower-at-close-of-trade-bovespa-down-011-4051361"
                      target="_blank"
                      className="text-futuristic-green-600 hover:underline"
                      rel="noreferrer"
                    >
                      Brazil Stock Market Report – Investing.com
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-10 space-y-4">
                <div className="futuristic-card p-6 border-2 border-futuristic-green-500/50">
                  <h2 className="text-2xl font-semibold text-futuristic-green-600 text-center mb-4">
                    🚀 Ready to Invest in Brazil?
                  </h2>
                  <p className="text-futuristic-grey-800 text-center mb-6">
                    Before making investment decisions in the Brazilian market,
                    discover your investor profile and get personalized
                    recommendations tailored to your risk tolerance and
                    financial goals.
                  </p>
                  <div className="flex justify-center">
                    <Link
                      href="/"
                      className="futuristic-button bg-futuristic-green-600 hover:bg-futuristic-green-700 text-white px-6 py-3 rounded-md text-lg font-medium transition-all duration-300 flex items-center"
                    >
                      Take the Investor Profile Survey
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
