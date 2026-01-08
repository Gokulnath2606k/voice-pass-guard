import { useState, useEffect } from 'react';
import { Phone, PhoneCall, CheckCircle2, XCircle, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OutpassStatus } from '@/types/outpass';
import { cn } from '@/lib/utils';

interface VoiceCallSimulationProps {
  parentPhone: string;
  studentName: string;
  onComplete: (status: 'approved' | 'rejected') => void;
  onCancel: () => void;
}

type CallStage = 'dialing' | 'connected' | 'speaking' | 'waiting' | 'response';

export function VoiceCallSimulation({ 
  parentPhone, 
  studentName, 
  onComplete, 
  onCancel 
}: VoiceCallSimulationProps) {
  const [stage, setStage] = useState<CallStage>('dialing');
  const [response, setResponse] = useState<'approved' | 'rejected' | null>(null);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    if (stage === 'dialing') {
      timers.push(setTimeout(() => setStage('connected'), 2000));
    } else if (stage === 'connected') {
      timers.push(setTimeout(() => setStage('speaking'), 1000));
    } else if (stage === 'speaking') {
      timers.push(setTimeout(() => setStage('waiting'), 4000));
    }

    return () => timers.forEach(clearTimeout);
  }, [stage]);

  const handleResponse = (approved: boolean) => {
    const status = approved ? 'approved' : 'rejected';
    setResponse(status);
    setStage('response');
    setTimeout(() => onComplete(status), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-card w-full max-w-md rounded-2xl p-8 animate-slide-up">
        {/* Call Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-500",
            stage === 'dialing' && "bg-accent/20 animate-pulse",
            stage === 'connected' && "bg-success/20",
            stage === 'speaking' && "bg-accent/20",
            stage === 'waiting' && "bg-warning/20",
            stage === 'response' && (response === 'approved' ? "bg-success/20" : "bg-destructive/20")
          )}>
            {stage === 'response' ? (
              response === 'approved' ? (
                <CheckCircle2 className="w-10 h-10 text-success" />
              ) : (
                <XCircle className="w-10 h-10 text-destructive" />
              )
            ) : stage === 'speaking' ? (
              <Volume2 className="w-10 h-10 text-accent animate-pulse" />
            ) : (
              <PhoneCall className={cn(
                "w-10 h-10",
                stage === 'dialing' && "text-accent animate-ring",
                stage === 'connected' && "text-success",
                stage === 'waiting' && "text-warning"
              )} />
            )}
          </div>

          <h3 className="font-display font-bold text-xl text-foreground mb-1">
            {stage === 'dialing' && 'Dialing Parent...'}
            {stage === 'connected' && 'Connected'}
            {stage === 'speaking' && 'AI Speaking...'}
            {stage === 'waiting' && 'Waiting for Response'}
            {stage === 'response' && (response === 'approved' ? 'Permission Granted!' : 'Permission Denied')}
          </h3>
          <p className="text-muted-foreground">{parentPhone}</p>
        </div>

        {/* Call Content */}
        <div className="bg-secondary/50 rounded-xl p-4 mb-6">
          {stage === 'speaking' && (
            <div className="space-y-2 animate-fade-in">
              <p className="text-sm text-muted-foreground italic">
                "Hello, this is an automated call from HostelGuard System."
              </p>
              <p className="text-sm text-muted-foreground italic">
                "Your son/daughter <span className="text-foreground font-medium">{studentName}</span> has requested a hostel outpass."
              </p>
              <p className="text-sm text-muted-foreground italic">
                "Press 1 to approve. Press 2 to reject."
              </p>
            </div>
          )}

          {stage === 'waiting' && (
            <div className="flex flex-col items-center gap-4 py-4 animate-fade-in">
              <p className="text-sm text-muted-foreground text-center">
                Simulate parent response:
              </p>
              <div className="flex gap-3">
                <Button
                  variant="success"
                  size="lg"
                  onClick={() => handleResponse(true)}
                  className="gap-2"
                >
                  <span className="text-lg font-bold">1</span>
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={() => handleResponse(false)}
                  className="gap-2"
                >
                  <span className="text-lg font-bold">2</span>
                  Reject
                </Button>
              </div>
            </div>
          )}

          {(stage === 'dialing' || stage === 'connected') && (
            <div className="flex items-center justify-center gap-2 py-4">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          {stage === 'response' && (
            <div className="text-center py-4 animate-fade-in">
              <p className={cn(
                "font-medium",
                response === 'approved' ? "text-success" : "text-destructive"
              )}>
                {response === 'approved' 
                  ? 'Parent pressed 1 - Outpass Approved!'
                  : 'Parent pressed 2 - Outpass Rejected'}
              </p>
            </div>
          )}
        </div>

        {/* Cancel Button */}
        {stage !== 'response' && (
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={onCancel}
          >
            Cancel Call
          </Button>
        )}
      </div>
    </div>
  );
}
