export type OutpassStatus = 'pending' | 'calling' | 'approved' | 'rejected';

export interface OutpassRequest {
  id: string;
  studentName: string;
  rollNo: string;
  parentPhone: string;
  reason: string;
  requestDate: string;
  returnDate: string;
  status: OutpassStatus;
  month: string;
  createdAt: Date;
}

export interface MonthlyStats {
  month: string;
  approved: number;
  rejected: number;
  pending: number;
  total: number;
}
