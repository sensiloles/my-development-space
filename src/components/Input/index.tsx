import React, { ChangeEvent } from 'react';

interface Props {
  value: string | null;
  onChange: (event?: ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: Props) => {
  const { value, onChange } = props;
  return <input className="main-input" value={value} onChange={onChange} />;
};

export default Input;
