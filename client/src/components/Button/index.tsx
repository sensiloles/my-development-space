import React, { MouseEvent as ReactMouseEvent } from 'react';

interface Props {
  title: string;
  onClick: (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
  ariaLabel: string;
  disabled: boolean;
}

function Button(props: Props) {
  const { title, onClick, ariaLabel, disabled } = props;
  return (
    <button
      className="main-button"
      type="button"
      title={title}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    />
  );
}

export default Button;
