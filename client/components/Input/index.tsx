import * as React from 'react';
import {
  FocusEventsHandlers,
  KeyboardEventsHandlers,
  MouseEventsHandlers,
  SelectionEventHandler
} from '../../types/EventsHandlers';

type RequiredProps = Required<
  Pick<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'>
>;

type OptionalProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  | 'inputMode'
  | 'autoComplete'
  | 'autoFocus'
  | 'placeholder'
  | 'className'
  | 'value'
  | 'name'
  | 'id'
  | 'disabled'
>;

type HandlersProps = FocusEventsHandlers<HTMLInputElement> &
  MouseEventsHandlers<HTMLInputElement> &
  KeyboardEventsHandlers<HTMLInputElement> &
  SelectionEventHandler<HTMLInputElement>;

type Props = RequiredProps & OptionalProps & HandlersProps;

function Input(props: Props) {
  return <input {...props} />;
}

export default Input;
