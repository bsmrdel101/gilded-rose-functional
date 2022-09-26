/* eslint-disable */
// @ts-nocheck

import { determineItemQuality, Item } from '../src/gilded-rose';

describe('determineItemQuality', () => {
  it('deprecates the sellIn by one for a Haunted Shoe', () => {
    const standardItem = new Item('Haunted Shoe', 10, 10);
    const updatedItem = determineItemQuality(standardItem);
    expect(updatedItem.sellIn).toBe(9);
  });

  it('Aged Brie should increase in quality over time', () => {
    const standardItem = new Item('Aged Brie', 5, 0);
    const updatedItem = determineItemQuality(standardItem);
    expect(updatedItem.quality).toBe(1);
  });

  it('Quality shouldn\'t drop below 0', () => {
    const standardItem = new Item('Bread flavored bread', 0, 0);
    const updatedItem = determineItemQuality(standardItem);
    expect(updatedItem.quality).toBe(0);
  });

  it('Quality degrades twice as fast when sellIn is below 0', () => {
    const standardItem = new Item('Wooden sword', -5, 8);
    const updatedItem = determineItemQuality(standardItem);
    expect(updatedItem.quality).toBe(6);
  });

  it('Quality has a max of 50 by default', () => {
    const standardItem = new Item('Aged Brie', 0, 50);
    const updatedItem = determineItemQuality(standardItem);
    expect(updatedItem.quality).toBe(50);
  });

  it('sellIn and quality should not change for Sulfuras', () => {
    const standardItem = new Item('Sulfuras, Hand of Ragnaros', 0, 100);
    const updatedItem = determineItemQuality(standardItem);
    expect(updatedItem.quality).toBe(100);
    expect(updatedItem.sellIn).toBe(0);
  });

  it('Backstage passes should increase in quality by 2, when sellIn is <= 10', () => {
    const standardItem = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0);
    const updatedItem = determineItemQuality(standardItem);
    expect(updatedItem.quality).toBe(2);
  });

  it('Backstage passes should increase in quality by 3, when sellIn is <= 5', () => {
    const standardItem = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 0);
    const updatedItem = determineItemQuality(standardItem);
    expect(updatedItem.quality).toBe(3);
  });

  it('Backstage passes quality shouldn\'t increase once sellIn is <= 0', () => {
    const standardItem = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 50);
    const updatedItem = determineItemQuality(standardItem);
    expect(updatedItem.quality).toBe(50);
  });

  it('Conjured items should degrade twice as fast.', () => {
    const standardItem = new Item('Conjured Rye', 5, 20);
    const updatedItem = determineItemQuality(standardItem);
    expect(updatedItem.quality).toBe(18);
  });
});