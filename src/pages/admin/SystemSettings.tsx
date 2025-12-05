import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function SystemSettings() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">System Settings</h1>
        <p className="text-slate-400 mt-2">Configure global application settings.</p>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">General Configuration</CardTitle>
          <CardDescription className="text-slate-400">Manage basic system parameters.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-slate-200">Maintenance Mode</Label>
              <p className="text-sm text-slate-500">Disable user access for maintenance.</p>
            </div>
            <Switch />
          </div>
          <Separator className="bg-slate-800" />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-slate-200">New User Registration</Label>
              <p className="text-sm text-slate-500">Allow new users to sign up.</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Security Settings</CardTitle>
          <CardDescription className="text-slate-400">Configure security thresholds and limits.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="max-transfer" className="text-slate-200">Max Transfer Limit (Global)</Label>
                <Input id="max-transfer" defaultValue="10000" className="bg-slate-950 border-slate-800 text-white" />
                <p className="text-xs text-slate-500">Maximum amount allowed per transaction.</p>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="session-timeout" className="text-slate-200">Session Timeout (minutes)</Label>
                <Input id="session-timeout" defaultValue="30" className="bg-slate-950 border-slate-800 text-white" />
            </div>
            <div className="pt-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Save Changes</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
