"use client";

import { useEffect, useState } from "react";
// Importar html2pdf
// import html2pdf from 'html2pdf.js'; // Dynamic import
// Comentar o eliminar importaciones no usadas si html2pdf reemplaza su funcionalidad
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";

import { PdfExport } from "./pdf-export";

interface PdfRendererProps {
  profile: string;
  recommendations: string[];
  riskScore: number;
  answers: Record<string, any>;
  onComplete: (success: boolean) => void;
  saludoCierre: React.ReactNode[];
  resources: { text: string; link: string; linkText: string }[];
}

export function PdfRenderer({
  profile,
  recommendations,
  riskScore,
  answers,
  onComplete,
  saludoCierre,
  resources,
}: PdfRendererProps) {
  const [isRendering, setIsRendering] = useState(true);

  useEffect(() => {
    const renderPdf = async () => {
      try {
        // Dynamic import for html2pdf
        const html2pdf = (await import("html2pdf.js")).default;

        // Create a container for the PDF export component
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.left = "-9999px";
        container.style.top = "0";
        container.style.width = "800px"; // html2pdf works better with a defined width
        // Opcional: agregar estilos para que el contenedor no afecte el layout visual
        container.style.height = "auto";
        container.style.overflow = "hidden";
        document.body.appendChild(container);

        // Render the PDF export component to the container
        // Dynamic import for createRoot
        const { createRoot } = await import("react-dom/client");
        const root = createRoot(container);

        // Create a promise that resolves when the component is rendered
        await new Promise<void>((resolve) => {
          root.render(
            <PdfExport
              profile={profile as any}
              recommendations={recommendations}
              riskScore={riskScore}
              answers={answers}
              saludoCierre={saludoCierre}
              resources={resources}
            />
          );

          // Give time for the component to render and for images to load
          setTimeout(resolve, 1500); // Aumentado el tiempo por si acaso
        });

        // Use html2pdf to generate the PDF
        const element = container.firstChild as HTMLElement; // El elemento a convertir

        const options = {
          margin: 10,
          filename: `Investor_Profile_${profile.replace(/\s+/g, "_")}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            logging: true,
            dpi: 192,
            letterRendering: true,
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["css", "legacy"] }, // Intentar respetar saltos de página CSS
        };

        // Generate and save the PDF
        await html2pdf().from(element).set(options).save();

        // Clean up
        root.unmount();
        document.body.removeChild(container);

        onComplete(true);
      } catch (error) {
        console.error("Error generating PDF:", error);
        onComplete(false);
      } finally {
        setIsRendering(false);
      }
    };

    renderPdf();
  }, [
    profile,
    recommendations,
    riskScore,
    answers,
    onComplete,
    saludoCierre,
    resources,
  ]); // Agregadas dependencias

  return isRendering ? (
    // Puedes poner un spinner o mensaje de carga aquí si lo deseas
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        fontSize: "1.5rem",
        color: "#10B981",
      }}
    >
      Generating PDF...
    </div>
  ) : null;
}

export async function generatePdfBase64({
  profile,
  recommendations,
  riskScore,
  answers,
  saludoCierre,
  resources,
}: PdfRendererProps): Promise<string> {
  // Dynamic import for html2pdf
  const html2pdf = (await import("html2pdf.js")).default;

  // Create a container for the PDF export component
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.width = "800px";
  container.style.height = "auto";
  container.style.overflow = "hidden";
  document.body.appendChild(container);

  // Render the PDF export component to the container
  // Dynamic import for createRoot
  const { createRoot } = await import("react-dom/client");
  const root = createRoot(container);

  // Create a promise that resolves when the component is rendered
  await new Promise<void>((resolve) => {
    root.render(
      <PdfExport
        profile={profile as any}
        recommendations={recommendations}
        riskScore={riskScore}
        answers={answers}
        saludoCierre={saludoCierre}
        resources={resources}
      />
    );
    setTimeout(resolve, 1500); // Aumentado el tiempo
  });

  // Use html2pdf to generate the PDF as base64
  const element = container.firstChild as HTMLElement;

  const options = {
    margin: 10,
    filename: `Investor_Profile_${profile.replace(/\s+/g, "_")}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"] },
  };

  // Generate PDF and get it as base64
  const pdf = await html2pdf()
    .from(element)
    .set(options)
    .output("datauristring");

  // Clean up
  root.unmount();
  document.body.removeChild(container);

  return pdf;
}
