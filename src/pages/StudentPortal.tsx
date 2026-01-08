import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/StatusBadge';
import { VoiceCallSimulation } from '@/components/VoiceCallSimulation';
import { useOutpass } from '@/context/OutpassContext';
import { OutpassRequest } from '@/types/outpass';
import { 
  User, 
  Phone, 
  Calendar, 
  FileText, 
  Send,
  History,
  GraduationCap
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  studentName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  rollNo: z.string().min(3, 'Invalid roll number').max(20),
  parentPhone: z.string().regex(/^\+?[\d\s-]{10,15}$/, 'Invalid phone number'),
  reason: z.string().min(10, 'Please provide a detailed reason').max(500),
  requestDate: z.string().min(1, 'Please select a date'),
  returnDate: z.string().min(1, 'Please select a return date'),
});

type FormData = z.infer<typeof formSchema>;

export default function StudentPortal() {
  const { requests, addRequest, updateStatus } = useOutpass();
  const { toast } = useToast();
  const [showCall, setShowCall] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<OutpassRequest | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    const month = format(new Date(data.requestDate), 'MMMM');
    const request = addRequest({
      studentName: data.studentName,
      rollNo: data.rollNo,
      parentPhone: data.parentPhone,
      reason: data.reason,
      requestDate: data.requestDate,
      returnDate: data.returnDate,
      month,
    });
    
    setCurrentRequest(request);
    updateStatus(request.id, 'calling');
    setShowCall(true);
    
    toast({
      title: 'Outpass Request Submitted',
      description: 'Initiating voice call to parent...',
    });
  };

  const handleCallComplete = (status: 'approved' | 'rejected') => {
    if (currentRequest) {
      updateStatus(currentRequest.id, status);
      toast({
        title: status === 'approved' ? 'Outpass Approved!' : 'Outpass Rejected',
        description: status === 'approved' 
          ? 'Your parent has approved the outpass request.'
          : 'Your parent has rejected the outpass request.',
        variant: status === 'approved' ? 'default' : 'destructive',
      });
    }
    setShowCall(false);
    setCurrentRequest(null);
    reset();
  };

  const handleCallCancel = () => {
    if (currentRequest) {
      updateStatus(currentRequest.id, 'pending');
    }
    setShowCall(false);
    setCurrentRequest(null);
  };

  // Get user's recent requests (last 5)
  const recentRequests = [...requests]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
              <GraduationCap className="h-5 w-5 text-accent" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Student Portal
            </h1>
          </div>
          <p className="text-muted-foreground">
            Request outpass and track your approvals
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Request Form */}
          <div className="lg:col-span-3 animate-slide-up">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Send className="h-5 w-5 text-accent" />
                  Request Outpass
                </CardTitle>
                <CardDescription>
                  Fill in your details to request a hostel outpass
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Student Name */}
                    <div className="space-y-2">
                      <Label htmlFor="studentName" className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        Full Name
                      </Label>
                      <Input
                        id="studentName"
                        placeholder="Enter your full name"
                        {...register('studentName')}
                        className="bg-background"
                      />
                      {errors.studentName && (
                        <p className="text-sm text-destructive">{errors.studentName.message}</p>
                      )}
                    </div>

                    {/* Roll Number */}
                    <div className="space-y-2">
                      <Label htmlFor="rollNo" className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        Roll Number
                      </Label>
                      <Input
                        id="rollNo"
                        placeholder="e.g., CS2021001"
                        {...register('rollNo')}
                        className="bg-background"
                      />
                      {errors.rollNo && (
                        <p className="text-sm text-destructive">{errors.rollNo.message}</p>
                      )}
                    </div>

                    {/* Parent Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="parentPhone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        Parent Phone Number
                      </Label>
                      <Input
                        id="parentPhone"
                        placeholder="+91 98765 43210"
                        {...register('parentPhone')}
                        className="bg-background"
                      />
                      {errors.parentPhone && (
                        <p className="text-sm text-destructive">{errors.parentPhone.message}</p>
                      )}
                    </div>

                    {/* Request Date */}
                    <div className="space-y-2">
                      <Label htmlFor="requestDate" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        Leaving Date
                      </Label>
                      <Input
                        id="requestDate"
                        type="date"
                        {...register('requestDate')}
                        className="bg-background"
                      />
                      {errors.requestDate && (
                        <p className="text-sm text-destructive">{errors.requestDate.message}</p>
                      )}
                    </div>

                    {/* Return Date */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="returnDate" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        Return Date
                      </Label>
                      <Input
                        id="returnDate"
                        type="date"
                        {...register('returnDate')}
                        className="bg-background"
                      />
                      {errors.returnDate && (
                        <p className="text-sm text-destructive">{errors.returnDate.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Outpass</Label>
                    <Textarea
                      id="reason"
                      placeholder="Please provide a detailed reason for your outpass request..."
                      rows={4}
                      {...register('reason')}
                      className="bg-background resize-none"
                    />
                    {errors.reason && (
                      <p className="text-sm text-destructive">{errors.reason.message}</p>
                    )}
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-2">
                    <Phone className="h-5 w-5" />
                    Submit & Call Parent
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Recent Requests */}
          <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <History className="h-5 w-5 text-accent" />
                  Recent Requests
                </CardTitle>
                <CardDescription>
                  Your outpass history
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentRequests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No requests yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentRequests.map((request) => (
                      <div
                        key={request.id}
                        className="p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-border transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <p className="font-medium text-foreground">{request.studentName}</p>
                            <p className="text-sm text-muted-foreground">{request.rollNo}</p>
                          </div>
                          <StatusBadge status={request.status} />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {request.reason}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {request.requestDate} → {request.returnDate}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Voice Call Simulation */}
      {showCall && currentRequest && (
        <VoiceCallSimulation
          parentPhone={currentRequest.parentPhone}
          studentName={currentRequest.studentName}
          onComplete={handleCallComplete}
          onCancel={handleCallCancel}
        />
      )}
    </div>
  );
}
