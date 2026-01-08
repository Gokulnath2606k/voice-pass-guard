import { OutpassStatus } from '@/types/outpass';
import { cn } from '@/lib/utils';
import { Clock, Phone, CheckCircle2, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: OutpassStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = {
    pending: {
      label: 'Pending',
      icon: Clock,
      classes: 'status-pending',
    },
    calling: {
      label: 'Calling Parent',
      icon: Phone,
      classes: 'status-calling',
    },
    approved: {
      label: 'Approved',
      icon: CheckCircle2,
      classes: 'status-approved',
    },
    rejected: {
      label: 'Rejected',
      icon: XCircle,
      classes: 'status-rejected',
    },
  };

  const { label, icon: Icon, classes } = config[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
        classes,
        status === 'calling' && 'animate-pulse-slow',
        className
      )}
    >
      <Icon className={cn('h-3.5 w-3.5', status === 'calling' && 'animate-ring')} />
      {label}
    </span>
  );
}
