import {
  Hammer,
  Snowflake,
  Sparkles,
  GraduationCap,
  Truck,
  WashingMachine,
  Wrench,
  Zap,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/types";

const icons: Record<IconName, React.ComponentType<LucideProps>> = {
  wrench: Wrench,
  zap: Zap,
  hammer: Hammer,
  sparkles: Sparkles,
  graduation: GraduationCap,
  truck: Truck,
  appliance: WashingMachine,
  snowflake: Snowflake,
};

export function CategoryIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Icon = icons[name];
  return <Icon aria-hidden {...props} />;
}
