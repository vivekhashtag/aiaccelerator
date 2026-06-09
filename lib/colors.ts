export interface ModuleColor {
  primary: string;
  dark: string;
  light: string;
  subtle: string;
  border: string;
  bgSubtle: string;
  bgMuted: string;
  sidebarBg: string;
  label: string;
}

export const MODULE_COLORS: Record<string, ModuleColor> = {
  "01": {
    label: "Teal",
    primary:    "#00C9A7",
    dark:       "#00A88B",
    light:      "#00F5D4",
    subtle:     "#E6FFF9",
    border:     "#A3F0D8",
    bgSubtle:   "#F0FDF9",
    bgMuted:    "#DCFFF5",
    sidebarBg:  "#F0FDF9",
  },
  "02": {
    label: "Blue",
    primary:    "#3B82F6",
    dark:       "#2563EB",
    light:      "#60A5FA",
    subtle:     "#EFF6FF",
    border:     "#BFDBFE",
    bgSubtle:   "#EFF6FF",
    bgMuted:    "#DBEAFE",
    sidebarBg:  "#EFF6FF",
  },
  "03": {
    label: "Violet",
    primary:    "#8B5CF6",
    dark:       "#7C3AED",
    light:      "#A78BFA",
    subtle:     "#F5F3FF",
    border:     "#DDD6FE",
    bgSubtle:   "#F5F3FF",
    bgMuted:    "#EDE9FE",
    sidebarBg:  "#F5F3FF",
  },
  "04": {
    label: "Rose",
    primary:    "#F43F5E",
    dark:       "#E11D48",
    light:      "#FB7185",
    subtle:     "#FFF1F2",
    border:     "#FECDD3",
    bgSubtle:   "#FFF1F2",
    bgMuted:    "#FFE4E6",
    sidebarBg:  "#FFF1F2",
  },
  "05": {
    label: "Amber",
    primary:    "#F59E0B",
    dark:       "#D97706",
    light:      "#FCD34D",
    subtle:     "#FFFBEB",
    border:     "#FDE68A",
    bgSubtle:   "#FFFBEB",
    bgMuted:    "#FEF3C7",
    sidebarBg:  "#FFFBEB",
  },
  "06": {
    label: "Lime",
    primary:    "#84CC16",
    dark:       "#65A30D",
    light:      "#A3E635",
    subtle:     "#F7FEE7",
    border:     "#D9F99D",
    bgSubtle:   "#F7FEE7",
    bgMuted:    "#ECFCCB",
    sidebarBg:  "#F7FEE7",
  },
  "07": {
    label: "Sky",
    primary:    "#0EA5E9",
    dark:       "#0284C7",
    light:      "#38BDF8",
    subtle:     "#F0F9FF",
    border:     "#BAE6FD",
    bgSubtle:   "#F0F9FF",
    bgMuted:    "#E0F2FE",
    sidebarBg:  "#F0F9FF",
  },
  "08": {
    label: "Orange",
    primary:    "#F97316",
    dark:       "#EA580C",
    light:      "#FB923C",
    subtle:     "#FFF7ED",
    border:     "#FED7AA",
    bgSubtle:   "#FFF7ED",
    bgMuted:    "#FFEDD5",
    sidebarBg:  "#FFF7ED",
  },
  "09": {
    label: "Indigo",
    primary:    "#6366F1",
    dark:       "#4F46E5",
    light:      "#818CF8",
    subtle:     "#EEF2FF",
    border:     "#C7D2FE",
    bgSubtle:   "#EEF2FF",
    bgMuted:    "#E0E7FF",
    sidebarBg:  "#EEF2FF",
  },
  "10": {
    label: "Emerald",
    primary:    "#10B981",
    dark:       "#059669",
    light:      "#34D399",
    subtle:     "#ECFDF5",
    border:     "#A7F3D0",
    bgSubtle:   "#ECFDF5",
    bgMuted:    "#D1FAE5",
    sidebarBg:  "#ECFDF5",
  },
};

export function getModuleColor(moduleNum: string): ModuleColor {
  return MODULE_COLORS[moduleNum] ?? MODULE_COLORS["01"];
}
