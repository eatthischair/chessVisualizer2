import { Button } from './button';
import { cn } from '../../utils/utils';

export function GhostButton({ game, onClick, className, ...props }) {
  return (
    <div
      className={cn(
        `
        text-slate-300 justify-start gap-0 content-center py-2 px-4
        bg-inherit font-semibold rounded-lg shadow-md
        hover:bg-gray-700/50 hover:text-slate-200
        focus:outline-none focus:ring-2 focus:ring-gray-400
        text-sm ml-1 h-16 w-52
        flex
      `,
        className
      )}
      onClick={onClick}
      {...props}
    ></div>
  );
}
