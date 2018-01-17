import {
  forceSimulation,
  forceLink,
  forceCenter,
  forceX,
  forceY,
  forceCollide,
} from 'd3-force';

export default function runForceFieldSimulation(nodes, links, onTick) {
  forceSimulation()
    .nodes(nodes)
    .force(
      'x',
      forceX()
        .x(({r, g, b}) => b - r)
    )
    .force(
      'y',
      forceY()
        .y(({r, g, b}) => -(r + g + b) / 2)
    )
    .force(
      'collide',
      forceCollide().radius(7)
    )
    .force(
      'link',
      forceLink()
        .id((d) => d.id)
        .distance(({distance}) => distance)
        .links(links)
    )
    .force(
      'center',
      forceCenter(100, 100)
    )
    .alphaMin(0.5)
    .on('tick', onTick);
}
