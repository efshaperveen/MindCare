import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { moodApi } from '@/lib/api';
import { Loader2, Calendar, MessageSquare } from 'lucide-react';

interface MoodEntry {
  _id: string;
  mood: string;
  note?: string;
  createdAt: string;
}

const moods = [
  { value: 'happy', emoji: '😊', label: 'Happy', color: 'text-mood-happy border-mood-happy/50 bg-mood-happy/10' },
  { value: 'calm', emoji: '🙂', label: 'Calm', color: 'text-mood-calm border-mood-calm/50 bg-mood-calm/10' },
  { value: 'neutral', emoji: '😐', label: 'Neutral', color: 'text-mood-neutral border-mood-neutral/50 bg-mood-neutral/10' },
  { value: 'sad', emoji: '😔', label: 'Sad', color: 'text-mood-sad border-mood-sad/50 bg-mood-sad/10' },
  { value: 'anxious', emoji: '😣', label: 'Anxious', color: 'text-mood-anxious border-mood-anxious/50 bg-mood-anxious/10' },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<MoodEntry[]>([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await moodApi.getHistory();
      setHistory(response.data.moods || response.data || []);
    } catch (error) {
      console.error('Failed to fetch mood history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) {
      setMessage({ type: 'error', text: 'Please select a mood' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      await moodApi.add(selectedMood, note || undefined);
      setMessage({ type: 'success', text: 'Mood saved successfully!' });
      setSelectedMood('');
      setNote('');
      fetchHistory();
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to save mood. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMoodDetails = (moodValue: string) => {
    return moods.find(m => m.value === moodValue) || moods[2];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Daily Mood Tracker
          </h1>
          <p className="text-muted-foreground">
            How are you feeling today? Tracking your mood helps identify patterns.
          </p>
        </div>

        {/* Mood Selection Form */}
        <div className="calm-card mb-8">
          <form onSubmit={handleSubmit}>
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">
              Select Your Current Mood
            </h2>

            {message.text && (
              <div
                className={`p-4 rounded-lg mb-4 ${
                  message.type === 'success'
                    ? 'bg-success/10 border border-success/30 text-success'
                    : 'bg-destructive/10 border border-destructive/30 text-destructive'
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => setSelectedMood(mood.value)}
                  className={`mood-btn ${selectedMood === mood.value ? 'selected' : ''}`}
                >
                  <span className="text-3xl mb-2">{mood.emoji}</span>
                  <span className="text-sm font-medium text-foreground">{mood.label}</span>
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Add a note (optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind? Any specific thoughts or feelings..."
                rows={3}
                className="calm-input w-full resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Mood'
              )}
            </button>
          </form>
        </div>

        {/* Mood History */}
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Recent Mood History
          </h2>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : history.length === 0 ? (
            <div className="calm-card text-center py-12">
              <p className="text-muted-foreground">
                No mood entries yet. Start tracking your mood above!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.slice(0, 10).map((entry) => {
                const moodDetails = getMoodDetails(entry.mood);
                return (
                  <div
                    key={entry._id}
                    className="calm-card flex items-start gap-4 animate-fade-in"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border-2 ${moodDetails.color}`}>
                      {moodDetails.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground capitalize">
                          {moodDetails.label}
                        </span>
                      </div>
                      {entry.note && (
                        <p className="text-muted-foreground text-sm flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {entry.note}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(entry.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MoodTracker;
