import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OutpassRequest, OutpassStatus, MonthlyStats } from '@/types/outpass';

interface OutpassContextType {
  requests: OutpassRequest[];
  addRequest: (request: Omit<OutpassRequest, 'id' | 'status' | 'createdAt'>) => OutpassRequest;
  updateStatus: (id: string, status: OutpassStatus) => void;
  getMonthlyStats: () => MonthlyStats[];
  getRequestsByMonth: (month: string) => OutpassRequest[];
}

const OutpassContext = createContext<OutpassContextType | undefined>(undefined);

// Sample data for demonstration
const sampleRequests: OutpassRequest[] = [
  {
    id: '1',
    studentName: 'Rahul Kumar',
    rollNo: 'CS2021001',
    parentPhone: '+91 98765 43210',
    reason: 'Family function',
    requestDate: '2024-01-15',
    returnDate: '2024-01-17',
    status: 'approved',
    month: 'January',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    studentName: 'Priya Sharma',
    rollNo: 'EC2021015',
    parentPhone: '+91 87654 32109',
    reason: 'Medical appointment',
    requestDate: '2024-01-18',
    returnDate: '2024-01-18',
    status: 'approved',
    month: 'January',
    createdAt: new Date('2024-01-18'),
  },
  {
    id: '3',
    studentName: 'Amit Singh',
    rollNo: 'ME2021008',
    parentPhone: '+91 76543 21098',
    reason: 'Personal work',
    requestDate: '2024-01-20',
    returnDate: '2024-01-21',
    status: 'rejected',
    month: 'January',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '4',
    studentName: 'Sneha Patel',
    rollNo: 'CS2021022',
    parentPhone: '+91 65432 10987',
    reason: 'Sister wedding',
    requestDate: '2024-02-05',
    returnDate: '2024-02-08',
    status: 'approved',
    month: 'February',
    createdAt: new Date('2024-02-05'),
  },
  {
    id: '5',
    studentName: 'Vikram Rao',
    rollNo: 'EE2021011',
    parentPhone: '+91 54321 09876',
    reason: 'Family emergency',
    requestDate: '2024-02-10',
    returnDate: '2024-02-12',
    status: 'approved',
    month: 'February',
    createdAt: new Date('2024-02-10'),
  },
];

export function OutpassProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<OutpassRequest[]>(sampleRequests);

  const addRequest = (request: Omit<OutpassRequest, 'id' | 'status' | 'createdAt'>): OutpassRequest => {
    const newRequest: OutpassRequest = {
      ...request,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date(),
    };
    setRequests((prev) => [...prev, newRequest]);
    return newRequest;
  };

  const updateStatus = (id: string, status: OutpassStatus) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status } : req))
    );
  };

  const getMonthlyStats = (): MonthlyStats[] => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    
    return months.map((month) => {
      const monthRequests = requests.filter((r) => r.month === month);
      return {
        month,
        approved: monthRequests.filter((r) => r.status === 'approved').length,
        rejected: monthRequests.filter((r) => r.status === 'rejected').length,
        pending: monthRequests.filter((r) => r.status === 'pending' || r.status === 'calling').length,
        total: monthRequests.length,
      };
    }).filter((stat) => stat.total > 0);
  };

  const getRequestsByMonth = (month: string): OutpassRequest[] => {
    return requests.filter((r) => r.month === month);
  };

  return (
    <OutpassContext.Provider value={{ requests, addRequest, updateStatus, getMonthlyStats, getRequestsByMonth }}>
      {children}
    </OutpassContext.Provider>
  );
}

export function useOutpass() {
  const context = useContext(OutpassContext);
  if (!context) {
    throw new Error('useOutpass must be used within an OutpassProvider');
  }
  return context;
}
