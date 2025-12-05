import { useState, useEffect } from 'react';
import { adminAPI } from '@/lib/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, CheckCircle, XCircle, Filter } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function TransactionManagement() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [txData, accData] = await Promise.all([
        adminAPI.getTransactions(),
        adminAPI.getAccounts()
      ]);
      setTransactions(txData);
      setAccounts(accData);
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setLoading(false);
    }
  };
  
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = async (id: string) => {
      try {
          await adminAPI.approveTransaction(id);
          await loadData();
      } catch (error) {
          console.error("Failed to approve", error);
      }
  }

  const handleReject = async (id: string) => {
      try {
          await adminAPI.rejectTransaction(id);
          await loadData();
      } catch (error) {
          console.error("Failed to reject", error);
      }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Transactions</h1>
          <p className="text-slate-400 mt-2">Monitor and manage all banking transactions.</p>
        </div>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <CardTitle className="text-white">Transaction History</CardTitle>
            <div className="flex gap-2">
                <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                    placeholder="Search transactions..."
                    className="pl-8 bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-emerald-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px] bg-slate-950 border-slate-800 text-white">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800 text-white">
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-slate-800">
            <Table>
              <TableHeader className="bg-slate-950">
                <TableRow className="border-slate-800 hover:bg-slate-900">
                  <TableHead className="text-slate-400">Date</TableHead>
                  <TableHead className="text-slate-400">From</TableHead>
                  <TableHead className="text-slate-400">To</TableHead>
                  <TableHead className="text-slate-400">Description</TableHead>
                  <TableHead className="text-slate-400">Status</TableHead>
                  <TableHead className="text-right text-slate-400">Amount</TableHead>
                  <TableHead className="text-right text-slate-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                    <TableRow className="border-slate-800 hover:bg-slate-900">
                        <TableCell colSpan={7} className="text-center text-slate-500 py-8">
                            No transactions found.
                        </TableCell>
                    </TableRow>
                ) : (
                    filteredTransactions.map((transaction) => {
                        const fromAcc = accounts.find((a) => a.id === transaction.fromAccount);
                        const toAcc = accounts.find((a) => a.id === transaction.toAccount);
                        return (
                            <TableRow key={transaction.id} className="border-slate-800 hover:bg-slate-800/50">
                                <TableCell className="text-slate-300">
                                    {new Date(transaction.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </TableCell>
                                <TableCell className="text-slate-300">{fromAcc?.name || 'Unknown'}</TableCell>
                                <TableCell className="text-slate-300">{toAcc?.name || 'Unknown'}</TableCell>
                                <TableCell className="text-slate-300">{transaction.description}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={
                                            transaction.status === 'approved'
                                                ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                                                : transaction.status === 'rejected'
                                                ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                                                : 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20'
                                        }
                                    >
                                        {transaction.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right font-semibold text-slate-200">
                                    {formatCurrency(transaction.amount)}
                                </TableCell>
                                <TableCell className="text-right">
                                    {transaction.status === 'pending' && (
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 w-8 p-0 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-900/20"
                                                onClick={() => handleApprove(transaction.id || transaction._id || '')}
                                                title="Approve"
                                            >
                                                <CheckCircle className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 w-8 p-0 text-red-500 hover:text-red-400 hover:bg-red-900/20"
                                                onClick={() => handleReject(transaction.id || transaction._id || '')}
                                                title="Reject"
                                            >
                                                <XCircle className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
