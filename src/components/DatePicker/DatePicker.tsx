import React, { useEffect, useState } from 'react';
import styles from './datePicker.module.css';

interface IProps {
  title: string;
  date: string | undefined;
}
const DatePicker = (props: IProps) => {
  //! Destructuring
  const { title, date } = props;

  //! UseState Hooks
  const [isDate, setIsDate] = useState<string>(date || new Date().toISOString());

  //! Handlesrs
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDate(e.target.value);
  };

  return (
    <div className={styles.datePiclerWrapper}>
      <label htmlFor="date">{title} Date:</label>
      <input type="date" name="search" onChange={handleInput} value={isDate}></input>
    </div>
  );
};

export default DatePicker;
