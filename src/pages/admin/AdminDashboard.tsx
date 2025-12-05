import { useEffect, useState } from 'react';
import { adminAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CreditCard, ArrowRightLeft, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function AdminDashboard() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [accData, txData] = await Promise.all([
          adminAPI.getAccounts(),
          adminAPI.getTransactions()
        ]);
        setAccounts(accData);
        setTransactions(txData);
      } catch (error) {
        console.error("Failed to load admin dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const pendingTransactions = transactions.filter((t) => t.status === 'pending');
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  if (loading) {
      return <div className="text-white">Loading dashboard...</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-slate-400 mt-2">Overview of your banking system.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total accounts</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{accounts.length}</p>
            <p className="text-xs text-slate-500">Active accounts</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total balance</CardTitle>
            <CreditCard className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{formatCurrency(totalBalance)}</p>
            <p className="text-xs text-slate-500">Across all accounts</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total transactions</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{transactions.length}</p>
            <p className="text-xs text-slate-500">All time</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Pending approvals</CardTitle>
            <ShieldCheck className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{pendingTransactions.length}</p>
            <p className="text-xs text-slate-500">Awaiting review</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Accounts</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="rounded-md border border-slate-800">
                <Table>
                    <TableHeader className="bg-slate-950">
                        <TableRow className="border-slate-800 hover:bg-slate-900">
                            <TableHead className="text-slate-400">User</TableHead>
                            <TableHead className="text-slate-400">Account Type</TableHead>
                            <TableHead className="text-right text-slate-400">Balance</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {accounts.slice(0, 5).map((account) => (
                            <TableRow key={account.id || account._id} className="border-slate-800 hover:bg-slate-800/50">
                                <TableCell className="text-slate-300">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{account.userId?.name || 'Unknown User'}</span>
                                        <span className="text-xs text-slate-500">{account.userId?.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-300 capitalize">{account.type}</TableCell>
                                <TableCell className="text-right font-medium text-slate-200">
                                    {formatCurrency(account.balance)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
             </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
                <CardTitle className="text-white">System Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Database</span>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500">Operational</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">API Gateway</span>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500">Operational</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Auth Service</span>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500">Operational</span>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
