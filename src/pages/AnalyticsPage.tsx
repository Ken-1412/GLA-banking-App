import { useMemo } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, TrendingUp, TrendingDown, DollarSign, PieChart, Target, Sparkles } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useBank } from '@/contexts/BankContext';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, AreaChart, Area } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

export default function AnalyticsPage() {
  const { accounts, transactions } = useBank();

  const approvedTransactions = transactions.filter(t => t.status === 'approved');
  
  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    return months.slice(Math.max(0, currentMonth - 5), currentMonth + 1).map((month, idx) => {
      const monthTransactions = approvedTransactions.filter(t => {
        const date = new Date(t.date);
        return date.getMonth() === (currentMonth - 5 + idx);
      });
      const income = monthTransactions.filter(t => t.type === 'receive').reduce((sum, t) => sum + t.amount, 0);
      const expenses = monthTransactions.filter(t => t.type === 'send').reduce((sum, t) => sum + t.amount, 0);
      return {
        month,
        income,
        expenses,
        savings: income - expenses
      };
    });
  }, [approvedTransactions]);

  const categoryData = useMemo(() => {
    const categories = [
      { name: 'Food & Dining', amount: 0, color: '#f59e0b' },
      { name: 'Shopping', amount: 0, color: '#8b5cf6' },
      { name: 'Transportation', amount: 0, color: '#eab308' },
      { name: 'Utilities', amount: 0, color: '#3b82f6' },
      { name: 'Entertainment', amount: 0, color: '#ec4899' },
      { name: 'Healthcare', amount: 0, color: '#ef4444' },
    ];
    
    approvedTransactions.forEach(t => {
      if (t.type === 'send') {
        const category = categories[Math.floor(Math.random() * categories.length)];
        category.amount += t.amount;
      }
    });
    
    return categories.filter(c => c.amount > 0);
  }, [approvedTransactions]);

  const accountDistribution = useMemo(() => {
    return accounts.map(acc => ({
      name: acc.name,
      value: Math.abs(acc.balance),
      type: acc.type
    }));
  }, [accounts]);

  const totalIncome = useMemo(() => {
    return approvedTransactions
      .filter(t => t.type === 'receive')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [approvedTransactions]);

  const totalExpenses = useMemo(() => {
    return approvedTransactions
      .filter(t => t.type === 'send')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [approvedTransactions]);

  const netSavings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) : '0';

  const transactionTrend = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayTransactions = approvedTransactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate.toDateString() === date.toDateString();
      });
      days.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        transactions: dayTransactions.length,
        amount: dayTransactions.reduce((sum, t) => sum + t.amount, 0)
      });
    }
    return days;
  }, [approvedTransactions]);

  return (
    <div className="flex min-h-screen bg-muted/20 dark:bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title="Analytics"
          description="Monitor spending, income, and savings trends across all accounts."
          tag="Insights"
          actions={
            <>
              <Button variant="outline" className="gap-2" onClick={() => {
                const headers = ['Date', 'Description', 'Amount', 'Type', 'Status'];
                const csvContent = [
                  headers.join(','),
                  ...transactions.map(t => [
                    new Date(t.date).toLocaleDateString(),
                    `"${t.description}"`,
                    t.amount,
                    t.type,
                    t.status
                  ].join(','))
                ].join('\n');
                
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                if (link.download !== undefined) {
                  const url = URL.createObjectURL(blob);
                  link.setAttribute('href', url);
                  link.setAttribute('download', 'transactions.csv');
                  link.style.visibility = 'hidden';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              }}>
                <Download className="h-4 w-4" />
                Export data
              </Button>
              <Button 
                className="gap-2 bg-gradient-to-r from-green-700 to-emerald-600"
                onClick={() => window.print()}
              >
                <Sparkles className="h-4 w-4" />
                Generate report
              </Button>
            </>
          }
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total income</CardTitle>
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{formatCurrency(totalIncome)}</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total expenses</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{formatCurrency(totalExpenses)}</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Net savings</CardTitle>
                  <DollarSign className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{formatCurrency(netSavings)}</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Savings rate</CardTitle>
                  <PieChart className="h-4 w-4 text-fuchsia-500" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{savingsRate}%</p>
                  <p className="text-xs text-muted-foreground">Of income saved</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Account Balance Distribution</CardTitle>
                  <CardDescription>Balance across all your accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  {accountDistribution.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={accountDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {accountDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex h-64 flex-col items-center justify-center text-center text-muted-foreground">
                      <PieChart className="mb-3 h-12 w-12 opacity-50" />
                      <p>No account data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transaction Trend (Last 7 Days)</CardTitle>
                  <CardDescription>Daily transaction activity</CardDescription>
                </CardHeader>
                <CardContent>
                  {transactionTrend.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={transactionTrend}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="transactions" fill="#3b82f6" name="Transactions" />
                        <Bar dataKey="amount" fill="#10b981" name="Amount" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex h-64 flex-col items-center justify-center text-center text-muted-foreground">
                      <TrendingUp className="mb-3 h-12 w-12 opacity-50" />
                      <p>No transaction data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="spending" className="space-y-4">
              <TabsList>
                <TabsTrigger value="spending">Spending</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
              </TabsList>

              <TabsContent value="spending" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Spending by Category</CardTitle>
                    <CardDescription>Compare your top categories and watch for unusual activity.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {categoryData.length > 0 ? (
                      <div className="space-y-4">
                        <ResponsiveContainer width="100%" height={300}>
                          <RechartsPieChart>
                            <Pie
                              data={categoryData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="amount"
                            >
                              {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                        <div className="space-y-2">
                          {categoryData.map((category) => {
                            const total = categoryData.reduce((sum, c) => sum + c.amount, 0);
                            const percentage = (category.amount / total) * 100;
                            return (
                              <div key={category.name} className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                                    <span>{category.name}</span>
                                  </div>
                                  <span className="font-medium">{formatCurrency(category.amount)}</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-muted">
                                  <div
                                    className="h-full rounded-full"
                                    style={{ width: `${percentage}%`, backgroundColor: category.color }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex h-64 flex-col items-center justify-center text-center text-muted-foreground">
                          <PieChart className="mb-3 h-12 w-12 opacity-50" />
                          <p>No spending data yet</p>
                          <p className="text-sm">Start transacting to unlock charts and benchmarks.</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Comparison</CardTitle>
                    <CardDescription>Income vs Expenses over the last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {monthlyData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          <Legend />
                          <Bar dataKey="income" fill="#10b981" name="Income" />
                          <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex h-64 flex-col items-center justify-center text-center text-muted-foreground">
                        <PieChart className="mb-3 h-12 w-12 opacity-50" />
                        <p>No spending data yet</p>
                        <p className="text-sm">Start transacting to unlock charts and benchmarks.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="income">
                <Card>
                  <CardHeader>
                    <CardTitle>Income Sources</CardTitle>
                    <CardDescription>Income breakdown by account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {approvedTransactions.filter(t => t.type === 'receive').length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={monthlyData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          <Area type="monotone" dataKey="income" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex h-64 flex-col items-center justify-center text-center text-muted-foreground">
                        <TrendingUp className="mb-3 h-12 w-12 opacity-50" />
                        <p>No income data available</p>
                        <p className="text-sm">Income transactions will appear here.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trends">
                <Card>
                  <CardHeader>
                    <CardTitle>6-Month Cash Flow Trend</CardTitle>
                    <CardDescription>Income, expenses, and savings over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {monthlyData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          <Legend />
                          <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="Income" />
                          <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                          <Line type="monotone" dataKey="savings" stroke="#3b82f6" strokeWidth={2} name="Savings" />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex h-64 flex-col items-center justify-center text-center text-muted-foreground">
                        <TrendingUp className="mb-3 h-12 w-12 opacity-50" />
                        <p>No trend data available</p>
                        <p className="text-sm">Historical data will be displayed here.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
