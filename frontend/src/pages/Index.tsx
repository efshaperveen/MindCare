import { Link } from 'react-router-dom';
import { Heart, ArrowRight, SmilePlus, ClipboardList, FileText, Shield, Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-3xl mx-auto">
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-8 glow">
              <Heart className="w-10 h-10 text-primary" />
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your Mental Health
              <span className="gradient-text block">Matters</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Track your mood, understand your patterns, and get AI-powered insights to support your mental wellness journey.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4 glow"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How We Support You
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our platform provides tools to help you understand and improve your mental well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="calm-card text-center group">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-mood-calm/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <SmilePlus className="w-8 h-8 text-mood-calm" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              Daily Mood Tracking
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Log your emotions daily and identify patterns in your mental health journey.
            </p>
          </div>

          <div className="calm-card text-center group">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-mood-happy/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ClipboardList className="w-8 h-8 text-mood-happy" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              Mental Health Screening
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Take quick assessments to understand your current mental health state.
            </p>
          </div>

          <div className="calm-card text-center group">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              AI-Powered Reports
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Get personalized insights and recommendations powered by artificial intelligence.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="calm-card max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Your Privacy Matters</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Safe & Confidential
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Your mental health data is encrypted and kept completely confidential. We're here to support you, not judge you.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-secondary/50">
                <Sparkles className="w-6 h-6 text-accent mb-2" />
                <p className="font-medium text-foreground">AI Insights</p>
                <p className="text-sm text-muted-foreground">Smart analysis</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <Shield className="w-6 h-6 text-primary mb-2" />
                <p className="font-medium text-foreground">Secure</p>
                <p className="text-sm text-muted-foreground">Encrypted data</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <Heart className="w-6 h-6 text-mood-calm mb-2" />
                <p className="font-medium text-foreground">Supportive</p>
                <p className="text-sm text-muted-foreground">Always here</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <SmilePlus className="w-6 h-6 text-mood-happy mb-2" />
                <p className="font-medium text-foreground">Easy to Use</p>
                <p className="text-sm text-muted-foreground">Simple tracking</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Start Your Wellness Journey Today
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Take the first step towards better mental health. It's free and takes only a minute.
          </p>
          <Link
            to="/register"
            className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
          >
            Create Free Account
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              <span className="font-display font-semibold text-foreground">MindCare</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              This platform provides mental health support and awareness only. Not a replacement for professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
