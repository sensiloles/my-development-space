import * as React from 'react';

export type FocusEventsHandlers<T extends HTMLElement> = {
  onBlur?: React.FocusEventHandler<T>;
  onFocus?: React.FocusEventHandler<T>;
};

export type KeyboardEventsHandlers<T extends HTMLElement> = {
  onKeyDown?: React.KeyboardEventHandler<T>;
  onKeyUp?: React.KeyboardEventHandler<T>;
};

export type MouseEventsHandlers<T extends HTMLElement> = {
  onMouseDown?: React.MouseEventHandler<T>;
  onMouseUp?: React.MouseEventHandler<T>;
  onMouseEnter?: React.MouseEventHandler<T>;
  onMouseLeave?: React.MouseEventHandler<T>;
};

export type SelectionEventHandler<T extends HTMLElement> = {
  onSelect?: React.ReactEventHandler<T>;
};
