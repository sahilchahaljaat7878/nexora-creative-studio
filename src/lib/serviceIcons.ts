import {
  Camera,
  Clapperboard,
  Globe2,
  PanelTop,
  PenTool,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon } from "@/types";

export const serviceIconMap: Record<ServiceIcon, LucideIcon> = {
  camera: Camera,
  "panel-top": PanelTop,
  youtube: Youtube,
  clapperboard: Clapperboard,
  globe: Globe2,
  "pen-tool": PenTool,
};
