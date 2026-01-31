import { useState } from 'react';
import Layout from '@/components/Layout';
import { screeningApi } from '@/lib/api';
import { Loader2, AlertTriangle, Shield, Heart, Lightbulb } from 'lucide-react';

interface ScreeningResult {
  riskLevel: string;
  explanation: string;
  guidance: string[];
}

const questions = [
  {
    id: 'mood',
    question: 'How have you been feeling lately?',
    options: [
      { value: 'great', label: 'Great - I feel positive and energetic' },
      { value: 'good', label: 'Good - Generally okay with minor ups and downs' },
      { value: 'neutral', label: 'Neutral - Neither good nor bad' },
      { value: 'low', label: 'Low - Feeling down or unmotivated' },
      { value: 'very_low', label: 'Very Low - Struggling significantly' },
    ],
  },
  {
    id: 'sleep',
    question: 'How is your sleep quality?',
    options: [
      { value: 'excellent', label: 'Excellent - Sleeping well and waking refreshed' },
      { value: 'good', label: 'Good - Mostly sleeping well' },
      { value: 'fair', label: 'Fair - Some trouble sleeping' },
      { value: 'poor', label: 'Poor - Frequently disturbed sleep' },
      { value: 'very_poor', label: 'Very Poor - Severe sleep problems' },
    ],
  },
  {
    id: 'stress',
    question: 'Do you feel stressed or anxious often?',
    options: [
      { value: 'rarely', label: 'Rarely - Almost never feel stressed' },
      { value: 'sometimes', label: 'Sometimes - Occasional stress' },
      { value: 'often', label: 'Often - Frequent stress or anxiety' },
      { value: 'very_often', label: 'Very Often - Constant worry or tension' },
      { value: 'always', label: 'Always - Overwhelming anxiety' },
    ],
  },
  {
    id: 'support',
    question: 'Do you talk to someone about your feelings?',
    options: [
      { value: 'always', label: 'Always - I have strong support systems' },
      { value: 'often', label: 'Often - I share with friends/family regularly' },
      { value: 'sometimes', label: 'Sometimes - Occasionally open up' },
      { value: 'rarely', label: 'Rarely - I keep things to myself mostly' },
      { value: 'never', label: 'Never - I don\'t share my feelings' },
    ],
  },
];

const Screening = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [error, setError] = useState('');

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const isComplete = questions.every((q) => answers[q.id]);

  const handleSubmit = async () => {
    if (!isComplete) {
      setError('Please answer all questions before submitting.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await screeningApi.analyze({
        mood: answers.mood,
        sleep: answers.sleep,
        stress: answers.stress,
        support: answers.support,
      });
      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to analyze screening. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

 const getRiskBadgeClass = (level?: string) => {
  if (!level) return 'risk-medium'; // fallback

  const lowercased = level.toLowerCase();
  if (lowercased.includes('low')) return 'risk-low';
  if (lowercased.includes('medium') || lowercased.includes('moderate')) return 'risk-medium';
  return 'risk-high';
};


  const resetScreening = () => {
    setAnswers({});
    setResult(null);
    setError('');
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Mental Health Screening
          </h1>
          <p className="text-muted-foreground">
            Answer a few questions to get insights about your mental well-being.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="disclaimer mb-8 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>
            This screening is for awareness purposes only. It does not replace professional medical advice, diagnosis, or treatment.
          </p>
        </div>

        {result ? (
          /* Results */
          <div className="space-y-6 animate-fade-in">
            {/* Risk Level Card */}
            <div className="calm-card">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Screening Results
                </h2>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-muted-foreground">Risk Level:</span>
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getRiskBadgeClass(result.riskLevel)}`}>
                  {result.riskLevel}
                </span>
              </div>

              <p className="text-foreground leading-relaxed">
                {result.explanation}
              </p>
            </div>

            {/* Guidance Card */}
            {result.guidance && result.guidance.length > 0 && (
              <div className="calm-card">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-mood-happy" />
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Self-Care Guidance
                  </h2>
                </div>

                <ul className="space-y-3">
                  {result.guidance.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button onClick={resetScreening} className="btn-secondary w-full">
              Take Screening Again
            </button>
          </div>
        ) : (
          /* Questions Form */
          <div className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive">
                {error}
              </div>
            )}

            {questions.map((q, index) => (
              <div key={q.id} className="calm-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  {index + 1}. {q.question}
                </h3>
                <div className="space-y-2">
                  {q.options.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                        answers[q.id] === option.value
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={option.value}
                        checked={answers[q.id] === option.value}
                        onChange={() => handleAnswer(q.id, option.value)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          answers[q.id] === option.value
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground'
                        }`}
                      >
                        {answers[q.id] === option.value && (
                          <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                        )}
                      </div>
                      <span className="text-foreground">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={handleSubmit}
              disabled={!isComplete || isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Submit Screening'
              )}
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Screening;
