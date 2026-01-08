import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { useOutpass } from '@/context/OutpassContext';
import { 
  Shield, 
  Calendar, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock,
  FileText,
  Download,
  Filter,
  BarChart3
} from 'lucide-react';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const months = [
  'All', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function WardenDashboard() {
  const { requests, getMonthlyStats } = useOutpass();
  const [selectedMonth, setSelectedMonth] = useState('All');

  const filteredRequests = selectedMonth === 'All' 
    ? requests 
    : requests.filter(r => r.month === selectedMonth);

  const sortedRequests = [...filteredRequests].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  const stats = {
    total: filteredRequests.length,
    approved: filteredRequests.filter(r => r.status === 'approved').length,
    rejected: filteredRequests.filter(r => r.status === 'rejected').length,
    pending: filteredRequests.filter(r => r.status === 'pending' || r.status === 'calling').length,
  };

  const monthlyStats = getMonthlyStats();
  const chartData = monthlyStats.map(stat => ({
    month: stat.month.slice(0, 3),
    Approved: stat.approved,
    Rejected: stat.rejected,
  }));

  const statCards = [
    { label: 'Total Requests', value: stats.total, icon: FileText, color: 'text-foreground' },
    { label: 'Approved', value: stats.approved, icon: CheckCircle2, color: 'text-success' },
    { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'text-destructive' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-warning' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Warden Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground">
            Monitor and manage all outpass requests
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, index) => (
            <Card key={stat.label} className="glass-card border-0 animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className={`text-3xl font-display font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Monthly Chart */}
          <Card className="lg:col-span-2 glass-card border-0 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                Monthly Statistics
              </CardTitle>
              <CardDescription>Approval vs Rejection trends</CardDescription>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="Approved" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Rejected" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Monthly Summary */}
          <Card className="glass-card border-0 animate-slide-up" style={{ animationDelay: '150ms' }}>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Monthly Summary
              </CardTitle>
              <CardDescription>Quick overview by month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monthlyStats.length > 0 ? (
                  monthlyStats.slice(0, 6).map((stat) => (
                    <div 
                      key={stat.month}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <span className="font-medium text-foreground">{stat.month}</span>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-success flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> {stat.approved}
                        </span>
                        <span className="text-destructive flex items-center gap-1">
                          <XCircle className="h-3 w-3" /> {stat.rejected}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No monthly data
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests Table */}
        <Card className="glass-card border-0 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="font-display flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  All Outpass Requests
                </CardTitle>
                <CardDescription>Complete list of student requests</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-[180px] bg-background">
                    <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Filter by month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map(month => (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                    <TableHead className="font-semibold">Student</TableHead>
                    <TableHead className="font-semibold">Roll No</TableHead>
                    <TableHead className="font-semibold">Reason</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Month</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedRequests.length > 0 ? (
                    sortedRequests.map((request) => (
                      <TableRow key={request.id} className="hover:bg-secondary/30">
                        <TableCell className="font-medium">{request.studentName}</TableCell>
                        <TableCell className="text-muted-foreground">{request.rollNo}</TableCell>
                        <TableCell className="max-w-[200px] truncate text-muted-foreground">
                          {request.reason}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {request.requestDate}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{request.month}</TableCell>
                        <TableCell>
                          <StatusBadge status={request.status} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No requests found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
