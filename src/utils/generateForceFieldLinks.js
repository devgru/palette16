import { range } from 'd3-array';

export default function generateForceFieldLinks(
  bgColorsCount,
  fgColorsCount,
  accentColorsCount
) {
  const links = [];

  const baseColorsCount = bgColorsCount + fgColorsCount;
  const allColorsCount = baseColorsCount + accentColorsCount;

  // We link background colors to foreground and accent colors
  range(0, bgColorsCount - 1).forEach(source => {
    range(bgColorsCount, allColorsCount).forEach(target => {
      links.push({ source, target });
    });
  });

  return links;
}
