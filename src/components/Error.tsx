import React from 'react';
import { BsX } from 'react-icons/bs';
interface Props {
  data: string;
  close: () => void;
}

export const ErrorCard: React.FC<Props> = (props) => {
  const { data, close } = props;

  return (
    <div id="error-display" className="error-display">
      <div className="error-icon-container">
        <BsX className="error-icon" onClick={close}></BsX>
      </div>
      <p>{data}</p>
      <div className="close-icon-container">
        <BsX className="close-icon" onClick={close}></BsX>
      </div>
    </div>
  );
};
