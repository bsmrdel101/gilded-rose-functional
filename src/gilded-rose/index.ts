/* eslint-disable */

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

interface ItemType {
  improvesWithAge: boolean,
  constantQuality: boolean
};

const AGED_BRIE: string = 'Aged Brie';
const BACKSTAGE_PASSES: string = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS: string = 'Sulfuras, Hand of Ragnaros';

export function updateQuality(items: Array<Item>) {
  let updatedItems: Array<Item> = [];
  items.forEach((item: Item) => {
    updatedItems.push(determineItemQuality(item));
  });
  return updatedItems;
}

// Modifies the quality of an item as time moves on
export function determineItemQuality(item: Item) {
  const { improvesWithAge, constantQuality } = getItemType(item);
  let newItem: Item = item;

  if (constantQuality) return newItem;

  // Quality degrades twice as fast when sellIn < 0.
  if (newItem.sellIn < 0) newItem.quality -= 1;

  // Add quality if the item improves with age.
  if (improvesWithAge) {
    newItem.quality += handleImproveWithAge(newItem);
  } else {
    // Quality degrades by 1 as default, only if it doesn't improve with age.
    newItem.quality -= 1;
  }

  // Degrade quality twice as fast if the item has conjured in its name
  if (newItem.name.toLowerCase().includes('conjured')) newItem.quality -= 1;

  // Quality has a max of 50 and cannot be negative.
  newItem.quality = keepItemQualityWithinRange(newItem.quality, 0, 50);
  newItem.sellIn -= 1;

  return newItem;
}

function getItemType(item: Item): ItemType {
  const improvesWithAge: boolean = item.name === AGED_BRIE || item.name === BACKSTAGE_PASSES;
  const constantQuality: boolean = item.name === SULFURAS;
  return { improvesWithAge, constantQuality };
}

function handleImproveWithAge(item: Item): number {
  if (item.name === BACKSTAGE_PASSES) {
    return handleBackstagePass(item);
  } else {
    // All other items that improve with age increase by 1
    return 1;
  }
};

function keepItemQualityWithinRange(itemQuality: number, min: number, max: number): number {
  return Math.min(Math.max(itemQuality, min), max);
};

// Modifies backstage passes, based on the sellIn value
function handleBackstagePass(item: Item): number {
  if (item.sellIn <= 10 && item.sellIn > 5) {
    return 2;
  } else if (item.sellIn <= 5) {
    return 3;
  }
  return 0;
}
