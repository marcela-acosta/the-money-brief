"use client"

import { useEffect, useState } from "react"
import { jsPDF } from "jspdf"
import { PdfExport } from "./pdf-export"

interface PdfRendererProps {
  profile: string
  recommendations: string[]
  riskScore: number
  answers: Record<string, any>
  onComplete: (success: boolean) => void
}

export function PdfRenderer({ profile, recommendations, riskScore, answers, onComplete }: PdfRendererProps) {
  const [isRendering, setIsRendering] = useState(true)

  useEffect(() => {
    const renderPdf = async () => {
      try {
        // Create a container for the PDF export component
        const container = document.createElement("div")
        container.style.position = "absolute"
        container.style.left = "-9999px"
        container.style.top = "0"
        container.style.width = "800px" // Fixed width for consistent PDF output
        document.body.appendChild(container)

        // Render the PDF export component to the container
        const { createRoot } = await import("react-dom/client")
        const root = createRoot(container)

        // Create a promise that resolves when the component is rendered
        await new Promise<void>((resolve) => {
          root.render(
            <PdfExport
              profile={profile as any}
              recommendations={recommendations}
              riskScore={riskScore}
              answers={answers}
            />,
          )

          // Give time for the component to render
          setTimeout(resolve, 1000)
        })

        // Use html2canvas with optimal settings
        const html2canvas = (await import("html2canvas")).default
        const canvas = await html2canvas(container.firstChild as HTMLElement, {
          scale: 2, // Reduced scale to avoid excessive size
          useCORS: true,
          allowTaint: true,
          backgroundColor: "white",
          logging: false,
        })

        // Clean up
        root.unmount()
        document.body.removeChild(container)

        // Create PDF with the captured image
        const imgData = canvas.toDataURL("image/png")

        // Calculate dimensions to fit on a single page
        const imgWidth = 210 // A4 width in mm
        const pageHeight = 297 // A4 height in mm

        // Calculate height based on aspect ratio but constrain to page height
        let imgHeight = (canvas.height * imgWidth) / canvas.width

        // If image would be too tall, scale it down to fit on one page
        if (imgHeight > pageHeight - 10) {
          // Leave a small margin
          imgHeight = pageHeight - 10
        }

        // Create PDF with portrait orientation
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        })

        // Add the image to fit on a single page
        pdf.addImage(
          imgData,
          "PNG",
          0, // x position
          5, // y position with small margin
          imgWidth, // width
          imgHeight, // height (scaled to fit)
        )

        // Save the PDF
        pdf.save(`Investor_Profile_${profile.replace(/\s+/g, "_")}.pdf`)

        onComplete(true)
      } catch (error) {
        console.error("Error generating PDF:", error)
        onComplete(false)
      } finally {
        setIsRendering(false)
      }
    }

    renderPdf()
  }, [profile, recommendations, riskScore, answers, onComplete])

  return null
}
