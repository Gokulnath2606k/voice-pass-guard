import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building2, User, Shield } from 'lucide-react';

export function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md group-hover:shadow-lg transition-shadow">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-foreground">HostelGuard</span>
            <span className="text-xs text-muted-foreground">AI Outpass System</span>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <Link to="/student">
            <Button 
              variant={isActive('/student') ? 'default' : 'ghost'} 
              size="sm"
              className="gap-2"
            >
              <User className="h-4 w-4" />
              Student Portal
            </Button>
          </Link>
          <Link to="/warden">
            <Button 
              variant={isActive('/warden') ? 'default' : 'ghost'} 
              size="sm"
              className="gap-2"
            >
              <Shield className="h-4 w-4" />
              Warden Dashboard
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
