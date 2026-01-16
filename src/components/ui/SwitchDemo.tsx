import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function SwitchDemo({ text, stateSwitch }) {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" onClick={() => stateSwitch(prev => !prev)} />
      <Label htmlFor="airplane-mode">{text}</Label>
    </div>
  );
}
