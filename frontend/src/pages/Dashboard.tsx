import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { SmilePlus, ClipboardList, FileText, Sparkles, Heart, TrendingUp } from 'lucide-react';

const features = [
  {
    title: 'Daily Mood Tracker',
    description: 'Track your emotional well-being daily and identify patterns over time.',
    icon: SmilePlus,
    path: '/mood-tracker',
    color: 'bg-mood-calm/20 text-mood-calm',
  },
  {
    title: 'Mental Health Screening',
    description: 'Take a quick assessment to understand your current mental health state.',
    icon: ClipboardList,
    path: '/screening',
    color: 'bg-mood-happy/20 text-mood-happy',
  },
  {
    title: 'AI Mental Health Report',
    description: 'Get personalized insights and recommendations powered by AI.',
    icon: FileText,
    path: '/report',
    color: 'bg-primary/20 text-primary',
  },
];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Welcome Section */}
        <div className="calm-card mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Welcome back</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Hello, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Taking care of your mental health is a journey. We're here to support you every step of the way.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="calm-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-mood-calm/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-mood-calm" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Track Progress</p>
              <p className="font-semibold text-foreground">Your Journey</p>
            </div>
          </div>
          <div className="calm-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-mood-happy/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-mood-happy" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Self-Care</p>
              <p className="font-semibold text-foreground">Daily Habits</p>
            </div>
          </div>
          <div className="calm-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Wellness</p>
              <p className="font-semibold text-foreground">Stay Mindful</p>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          Explore Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.path}
                to={feature.path}
                className="calm-card group hover:shadow-glow transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Motivational Quote */}
        <div className="mt-8 text-center py-8 px-4">
          <p className="text-muted-foreground italic text-lg">
            "It's okay to not be okay. What matters is that you're taking steps to care for yourself."
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
