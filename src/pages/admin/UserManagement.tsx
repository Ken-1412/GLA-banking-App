import { useState } from 'react';
import { useBank } from '@/contexts/BankContext';
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
import { Search, MoreHorizontal, Ban, CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function UserManagement() {
  const { getAllAccounts } = useBank();
  const [searchTerm, setSearchTerm] = useState('');
  const accounts = getAllAccounts();

  const filteredAccounts = accounts.filter(
    (account) =>
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountNumber.includes(searchTerm)
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">User Management</h1>
          <p className="text-slate-400 mt-2">Manage user accounts and permissions.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Add New User
        </Button>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">All Users</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search users..."
                className="pl-8 bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-slate-800">
            <Table>
              <TableHeader className="bg-slate-950">
                <TableRow className="border-slate-800 hover:bg-slate-900">
                  <TableHead className="text-slate-400">Name</TableHead>
                  <TableHead className="text-slate-400">Account Number</TableHead>
                  <TableHead className="text-slate-400">Type</TableHead>
                  <TableHead className="text-slate-400">Status</TableHead>
                  <TableHead className="text-right text-slate-400">Balance</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccounts.length === 0 ? (
                    <TableRow className="border-slate-800 hover:bg-slate-900">
                        <TableCell colSpan={6} className="text-center text-slate-500 py-8">
                            No users found.
                        </TableCell>
                    </TableRow>
                ) : (
                    filteredAccounts.map((account) => (
                    <TableRow key={account.id} className="border-slate-800 hover:bg-slate-800/50">
                        <TableCell className="font-medium text-slate-200">
                        <div>
                            <p>{account.name}</p>
                        </div>
                        </TableCell>
                        <TableCell className="text-slate-400">{account.accountNumber}</TableCell>
                        <TableCell>
                        <Badge variant="outline" className="capitalize border-slate-700 text-slate-300">
                            {account.type}
                        </Badge>
                        </TableCell>
                        <TableCell>
                        <Badge
                            className={
                            account.status === 'active'
                                ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                                : 'bg-slate-700 text-slate-300'
                            }
                        >
                            {account.status}
                        </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-slate-200">
                        {formatCurrency(account.balance)}
                        </TableCell>
                        <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-800">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-200">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">
                                Edit User
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-800" />
                            {account.status === 'active' ? (
                                <DropdownMenuItem className="text-red-500 focus:bg-red-900/20 focus:text-red-400 cursor-pointer">
                                <Ban className="mr-2 h-4 w-4" />
                                Deactivate Account
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem className="text-emerald-500 focus:bg-emerald-900/20 focus:text-emerald-400 cursor-pointer">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Activate Account
                                </DropdownMenuItem>
                            )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
