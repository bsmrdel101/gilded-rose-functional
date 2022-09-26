import { useState, useEffect } from 'react';
import { updateQuality, Item } from '../../gilded-rose/index';

import './ItemsTable.css';
import TableRow from '../TableRow/TableRow';


function ItemsTable() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const newItems: any = getNewItems();
    setItems(newItems);
  }, []);

  const getNewItems = () => [
    new Item('+5 Dexterity Vest', 10, 20),
    new Item('Aged Brie', 2, 0),
    new Item('Elixir of the Mongoose', 5, 7),
    new Item('Sulfuras, Hand of Ragnaros', 0, 80),
    new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
    new Item('Conjured Mana Cake', 3, 6),
  ];

  const onClickUpdateQuality = () => {
    const newItems = items.map((item: Item) => ({ ...item }));
    const updatedItems: any = updateQuality(newItems);
    setItems(updatedItems);
  };

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Item name</th>
            <th>Quality</th>
            <th>Sell in</th>
          </tr>
        </thead>
        <tbody>
          {
            items.map((item, i) => {
              return (
                <TableRow item={item} key={i} />
              );
            })
          }
        </tbody>
      </table>
      <form className='form'>
        <button id="reset-items-button">Reset</button>
        <button id="update-items-button" type='button' onClick={onClickUpdateQuality}>Update Items</button>
      </form>
    </section>
  );
}

export default ItemsTable;
