import React from "react";

interface PersonalizedReportProps {
  report: string;
  loading?: boolean;
  error?: string;
}

export const PersonalizedReport: React.FC<PersonalizedReportProps> = ({
  report,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="futuristic-card p-8 text-center animate-pulse">
        <p className="text-lg text-futuristic-grey-700">
          Generating your personalized report...
        </p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="futuristic-card p-8 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="futuristic-card p-8 text-left whitespace-pre-line">
      <h2 className="text-2xl font-bold mb-4 text-futuristic-green-700 text-center">
        Your Personalized Financial Report
      </h2>
      <div className="prose max-w-none">{report}</div>
    </div>
  );
};
