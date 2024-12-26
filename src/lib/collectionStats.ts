import { formatDistanceToNow } from 'date-fns';
import type { Shoe } from './types';

export function getCollectionStats(shoes: Shoe[]) {
  if (!shoes.length) return null;

  // Get unique colors
  const uniqueColors = new Set(shoes.flatMap(shoe => shoe.colors));

  // Get most recent shoe
  const recentShoes = [...shoes].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const newestShoe = recentShoes[0];

  // Get most recently worn shoe
  const lastWornShoe = shoes
    .filter(shoe => shoe.last_worn)
    .sort((a, b) => 
      new Date(b.last_worn!).getTime() - new Date(a.last_worn!).getTime()
    )[0];

  return {
    totalCount: shoes.length,
    uniqueColorCount: uniqueColors.size,
    newestShoe,
    lastWornShoe,
  };
}

export function formatCollectionDescription(shoes: Shoe[]): string {
  const stats = getCollectionStats(shoes);
  if (!stats) return '';

  const { totalCount, uniqueColorCount, newestShoe, lastWornShoe } = stats;

  const recentAddition = newestShoe
    ? `${newestShoe.name}`
    : 'None';

  const lastWorn = lastWornShoe
    ? `${lastWornShoe.name} (${formatDistanceToNow(new Date(lastWornShoe.last_worn!), { addSuffix: true })})`
    : 'None';

  return `This collection features ${totalCount} pieces with ${uniqueColorCount} unique colors. The most recently added piece to the collection: ${recentAddition}. Last piece of the collection worn by The Curator: ${lastWorn}.`;
}