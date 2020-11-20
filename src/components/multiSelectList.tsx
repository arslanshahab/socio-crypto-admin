import React, { Component, useEffect, useState } from 'react';

interface Props {
  items: string[];
  selectedItems: string[];
  updateSelected: any;
  maxSelectable?: number;
}

export const MultiSelectList: React.FC<Props> = ({ items, selectedItems, updateSelected, maxSelectable }) => {
  const [localSelected, setLocalSelected] = useState([...selectedItems]);
  const toggleItem = (item: string) => {
    if (localSelected.includes(item)) {
      const temp = localSelected;
      const index = temp.indexOf(item);
      temp.splice(index, 1);
      updateSelected(temp);
    } else {
      const temp = localSelected;
      temp.push(item);
      updateSelected(temp);
    }
  };

  return (
    <div>
      <div>
        {items.map((item) => {
          const isSelected = localSelected.includes(item);
          return (
            <div
              key={item + `${isSelected == true ? '-selected' : '-not-selelcted'}`}
              className={`multi-select-item ${isSelected ? 'selected' : ''}`}
              onClick={() => {
                if (maxSelectable && selectedItems.length == maxSelectable && !localSelected.includes(item)) {
                  if (maxSelectable === 1) {
                    setLocalSelected([item]);
                    updateSelected([item]);
                  }
                  return;
                } else {
                  toggleItem(item);
                }
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};
