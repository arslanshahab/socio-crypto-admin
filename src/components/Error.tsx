import React from 'react';
import { BsXSquare } from 'react-icons/bs';
interface Props {
  data: string;
  close: () => void;
}

export const ErrorCard: React.FC<Props> = (props) => {
  const { data, close } = props;
  console.log('rendered');
  return (
    <div id="error-display" className="error-display">
      <p>{data}</p>
      <BsXSquare onClick={close}></BsXSquare>
      <div></div>
    </div>
  );
};
