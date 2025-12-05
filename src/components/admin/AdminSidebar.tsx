import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  ArrowRightLeft,
  Settings,
  LogOut,
  Shield,
  Menu,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function AdminSidebar() {
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'User Management', path: '/admin/users' },
    { icon: ArrowRightLeft, label: 'Transactions', path: '/admin/transactions' },
    { icon: Settings, label: 'System Settings', path: '/admin/settings' },
  ];

  const renderSidebarContent = (isCollapsed: boolean, showCollapseToggle = true) => (
    <div className={`flex h-full flex-col bg-slate-900 text-slate-100 ${isCollapsed ? 'items-center' : ''}`}>
      <div className="w-full border-b border-slate-800 p-5">
        {!isCollapsed && (
          <div className="mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-emerald-500" />
            <span className="text-xl font-bold tracking-tight">Admin Panel</span>
          </div>
        )}
        <div
          className={`rounded-xl bg-slate-800 p-3 ${
            isCollapsed ? 'flex flex-col items-center text-center gap-2' : 'flex items-center gap-3 justify-between'
          }`}
        >
          <div className="rounded-full bg-emerald-600 p-2">
            <Shield className="h-4 w-4 text-white" />
          </div>
          {!isCollapsed ? (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user?.name || 'Admin'}</p>
              <p className="text-xs text-slate-400 truncate">Administrator</p>
            </div>
          ) : (
            <p className="text-xs font-medium text-slate-400">Admin</p>
          )}
          <div className={isCollapsed ? '' : 'ml-2'}>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {items.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <motion.button
              key={item.label}
              layout
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              title={item.label}
              className={`group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition ${
                isCollapsed ? 'justify-center' : 'gap-3'
              } ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="h-4 w-4" />
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4 space-y-3 w-full">
        <Button
          variant="ghost"
          className={`w-full gap-3 text-slate-400 hover:bg-slate-800 hover:text-white ${isCollapsed ? 'justify-center' : 'justify-start'}`}
          onClick={() => navigate('/dashboard')}
          title="Back to User Dashboard"
        >
          <LayoutDashboard className="h-4 w-4" />
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
              >
                User Dashboard
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
        <Button
          variant="ghost"
          className={`w-full gap-3 text-red-400 hover:bg-red-900/20 hover:text-red-300 ${isCollapsed ? 'justify-center' : 'justify-start'}`}
          onClick={() => {
            logout();
            navigate('/login');
          }}
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </Button>

        {showCollapseToggle && (
          <Button
            variant="ghost"
            className="w-full justify-center text-slate-500 hover:text-slate-300 hover:bg-slate-800"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? (
              <>
                <ChevronsRight className="h-4 w-4" />
                <span className="sr-only">Expand navigation</span>
              </>
            ) : (
              <>
                <ChevronsLeft className="h-4 w-4" />
                Collapse
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden fixed top-4 left-4 z-50">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 border-r-slate-800 bg-slate-900">
            {renderSidebarContent(false, false)}
          </SheetContent>
        </Sheet>
      </div>

      <motion.aside
        className="hidden border-r border-slate-800 bg-slate-900 lg:block h-screen sticky top-0"
        animate={{ width: collapsed ? 80 : 280 }}
        initial={false}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {renderSidebarContent(collapsed, true)}
      </motion.aside>
    </>
  );
}
