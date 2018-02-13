import { range } from 'd3-array';

export default function generateForceFieldLinks(
  baseColorsCount,
  accentColorsCount
) {
  const links = [];

  //monotoneLinks
  range(0, baseColorsCount - 1).forEach(source =>
    links.push({ source, target: source + 1 })
  );

  //accentLinks
  range(0, baseColorsCount).forEach(monotone =>
    range(baseColorsCount, baseColorsCount + accentColorsCount).forEach(
      accent => links.push({ source: monotone, target: accent })
    )
  );
  return links;
}
