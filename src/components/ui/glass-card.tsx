import { cn } from '@/lib/utils';
import { Card, CardProps } from './card';

interface GlassCardProps extends CardProps {}

export function GlassCard({ className, ...props }: GlassCardProps) {
  return (
    <Card
      className={cn(
        'relative overflow-hidden border-none bg-white/10 backdrop-blur-lg',
        'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
        className
      )}
      {...props}
    />
  );
}