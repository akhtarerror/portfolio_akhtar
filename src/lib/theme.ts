// Shared "kombinasi warna & bentuk" helpers.
// Every literal class name below is written out in full (not built with template
// strings) so Tailwind's scanner can find and generate it.

export type Accent = {
  name: string;
  solid: string; // bg-{color}
  text: string; // text-{color}
  border: string; // border-{color}
  tintBg: string; // bg-{color}/15 — soft background tint
  ring: string; // ring-{color}
  hoverText: string; // hover:text-{color}
  hex: string; // raw hex, for inline CSS custom properties
};

export const ACCENTS: Accent[] = [
  {
    name: "blue",
    solid: "bg-blue",
    text: "text-blue",
    border: "border-blue",
    tintBg: "bg-blue/10",
    ring: "ring-blue",
    hoverText: "hover:text-blue",
    hex: "#3d5cff",
  },
  {
    name: "coral",
    solid: "bg-coral",
    text: "text-coral",
    border: "border-coral",
    tintBg: "bg-coral/10",
    ring: "ring-coral",
    hoverText: "hover:text-coral",
    hex: "#ff6452",
  },
  {
    name: "yellow",
    solid: "bg-yellow",
    text: "text-yellow",
    border: "border-yellow",
    tintBg: "bg-yellow/15",
    ring: "ring-yellow",
    hoverText: "hover:text-yellow",
    hex: "#ffc93c",
  },
  {
    name: "mint",
    solid: "bg-mint",
    text: "text-mint",
    border: "border-mint",
    tintBg: "bg-mint/10",
    ring: "ring-mint",
    hoverText: "hover:text-mint",
    hex: "#10c79a",
  },
  {
    name: "violet",
    solid: "bg-violet",
    text: "text-violet",
    border: "border-violet",
    tintBg: "bg-violet/10",
    ring: "ring-violet",
    hoverText: "hover:text-violet",
    hex: "#9b5de5",
  },
];

export const SHAPES = [
  "shape-blob-1",
  "shape-blob-2",
  "shape-blob-3",
  "shape-squircle",
  "shape-circle",
];

export function getAccent(index: number): Accent {
  return ACCENTS[index % ACCENTS.length];
}

export function getShape(index: number): string {
  return SHAPES[index % SHAPES.length];
}

// A small deterministic rotation set so cards feel hand-placed, not perfectly grid-aligned.
const ROTATIONS = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2", "rotate-0"];

export function getRotation(index: number): string {
  return ROTATIONS[index % ROTATIONS.length];
}
