import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  Shield, 
  Database, 
  CheckCircle2, 
  ArrowRight,
  User,
  Building2,
  Sparkles,
  Clock,
  FileText
} from 'lucide-react';

export default function Landing() {
  const features = [
    {
      icon: Phone,
      title: 'AI Voice Calls',
      description: 'Automated calls to parents with text-to-speech for instant approval requests.',
    },
    {
      icon: Shield,
      title: 'Secure Verification',
      description: 'Press-key responses ensure authentic parent authorization.',
    },
    {
      icon: Database,
      title: 'Monthly Records',
      description: 'Complete digital trail of all outpass requests and approvals.',
    },
    {
      icon: Clock,
      title: 'Real-time Status',
      description: 'Track outpass requests from submission to approval instantly.',
    },
  ];

  const steps = [
    { step: '01', title: 'Student Requests', desc: 'Submit outpass with details' },
    { step: '02', title: 'AI Calls Parent', desc: 'Automated voice verification' },
    { step: '03', title: 'Parent Responds', desc: 'Press 1 or 2 on phone' },
    { step: '04', title: 'Status Updated', desc: 'Instant database record' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              AI-Powered Hostel Management
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-slide-up">
              Smart Outpass Approval with{' '}
              <span className="text-accent">Voice AI</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
              Automate hostel outpass approvals with AI voice calls to parents. 
              Secure, transparent, and paperless permission management.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Link to="/student">
                <Button size="xl" variant="hero" className="gap-2 group">
                  <User className="h-5 w-5" />
                  Student Portal
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/warden">
                <Button size="xl" variant="heroOutline" className="gap-2">
                  <Shield className="h-5 w-5" />
                  Warden Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 rounded-2xl bg-accent/10 backdrop-blur-sm border border-accent/20 flex items-center justify-center animate-float hidden lg:flex">
          <Phone className="h-8 w-8 text-accent" />
        </div>
        <div className="absolute bottom-1/4 right-10 w-16 h-16 rounded-xl bg-success/10 backdrop-blur-sm border border-success/20 flex items-center justify-center animate-float hidden lg:flex" style={{ animationDelay: '1s' }}>
          <CheckCircle2 className="h-6 w-6 text-success" />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple 4-step process from request to approval
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((item, index) => (
              <div key={item.step} className="relative animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="glass-card rounded-2xl p-6 text-center h-full hover:shadow-xl transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent font-display font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-5 w-5 text-accent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Key Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for modern hostel management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Modernize Your Hostel?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Join the future of hostel management with AI-powered automation
            </p>
            <Link to="/student">
              <Button size="xl" variant="hero" className="gap-2">
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Building2 className="h-4 w-4" />
              </div>
              <span className="font-display font-semibold text-foreground">HostelGuard</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-Based Hostel Management System © 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
