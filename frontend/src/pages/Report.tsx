import { useState, useRef } from 'react';
import Layout from '@/components/Layout';
import { reportApi } from '@/lib/api';
import { Loader2, Download, AlertTriangle, Brain, TrendingUp, Shield, Heart, Lightbulb, UserCheck } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ReportData {
  summary: string;
  moodPatterns: string;
  riskLevel: string;
  selfCareSuggestions: string[];
  seekHelp: string;
}

const Report = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);
  const [error, setError] = useState('');
  const reportRef = useRef<HTMLDivElement>(null);

  const generateReport = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await reportApi.generate();
      setReport(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to generate report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!reportRef.current) return;

    setIsDownloading(true);

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: '#0d1117',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('mental-health-report.pdf');
    } catch (err) {
      console.error('Failed to download PDF:', err);
    } finally {
      setIsDownloading(false);
    }
  };

const getRiskBadgeClass = (level?: string) => {
  if (!level) return 'risk-low';

  const lowercased = level.toLowerCase();
  if (lowercased.includes('low')) return 'risk-low';
  if (lowercased.includes('medium') || lowercased.includes('moderate')) return 'risk-medium';
  return 'risk-high';
};


  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Weekly AI Mental Health Report
          </h1>
          <p className="text-muted-foreground">
            Get a comprehensive AI-powered analysis of your mental health based on your mood history and screening results.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="disclaimer mb-8 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>
            This platform provides mental health support and awareness only. It does not replace professional medical advice, diagnosis, or treatment.
          </p>
        </div>

        {!report ? (
          /* Generate Report Button */
          <div className="calm-card text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Brain className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
              Ready for Your Report?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Our AI will analyze your mood history and screening results to provide personalized insights and recommendations.
            </p>

            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive mb-6 max-w-md mx-auto">
                {error}
              </div>
            )}

            <button
              onClick={generateReport}
              disabled={isLoading}
              className="btn-primary inline-flex items-center gap-2 px-8"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  Generate My Mental Health Report
                </>
              )}
            </button>
          </div>
        ) : (
          /* Report Display */
          <div className="space-y-6 animate-fade-in">
            {/* Download Button */}
            <div className="flex justify-end">
              <button
                onClick={downloadPDF}
                disabled={isDownloading}
                className="btn-secondary inline-flex items-center gap-2"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Preparing PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download as PDF
                  </>
                )}
              </button>
            </div>

            {/* Report Content */}
            <div ref={reportRef} className="space-y-6 p-2">
              {/* Header */}
              <div className="calm-card text-center py-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Your Mental Health Report
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  Generated on {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              {/* Overall Summary */}
              <div className="calm-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Overall Mental Health Summary
                  </h3>
                </div>
                <p className="text-foreground leading-relaxed">
                  {report.summary}
                </p>
              </div>

              {/* Mood Patterns */}
              <div className="calm-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-mood-calm/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-mood-calm" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Mood Patterns
                  </h3>
                </div>
                <p className="text-foreground leading-relaxed">
                  {report.moodPatterns}
                </p>
              </div>

              {/* Risk Level */}
              <div className="calm-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-mood-happy/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-mood-happy" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Risk Assessment
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">Current Risk Level:</span>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getRiskBadgeClass(report.riskLevel)}`}>
                    {report.riskLevel}
                  </span>
                </div>
              </div>

              {/* Self-Care Suggestions */}
              {report.selfCareSuggestions && report.selfCareSuggestions.length > 0 && (
                <div className="calm-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      Self-Care Suggestions
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {report.selfCareSuggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* When to Seek Help */}
              <div className="calm-card border-primary/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    When to Seek Professional Help
                  </h3>
                </div>
                <p className="text-foreground leading-relaxed">
                  {report.seekHelp}
                </p>
              </div>

              {/* Footer Disclaimer */}
              <div className="text-center py-6 border-t border-border mt-8">
                <p className="text-sm text-muted-foreground">
                  This report is generated by AI for awareness purposes only. 
                  Please consult a healthcare professional for medical advice.
                </p>
              </div>
            </div>

            {/* Generate New Report */}
            <button
              onClick={() => setReport(null)}
              className="btn-secondary w-full"
            >
              Generate New Report
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Report;
