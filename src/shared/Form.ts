import React, { ChangeEvent, FormEvent } from 'react';
import { FormComponentState, Validator } from './Validator';

export function handleFieldChange<TFields extends string = string>(
  this: React.Component<unknown, FormComponentState<TFields>, unknown>,
  event: ChangeEvent<HTMLInputElement>,
): void {
  this.setState({
    fields: {
      ...this.state.fields,
      [event.target.id as TFields]: event.target.value,
    },
  });
}

export function handleDefaultFormSubmit<TFields extends string = string>(
  component: React.Component<unknown, FormComponentState<TFields>, unknown>,
  validator: Validator<TFields>,
  runIfValid: () => void,
) {
  return (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const validationState = validator.validate(component.state.fields);
    component.setState({ errors: validationState.errors });

    if (validationState.isValid) {
      runIfValid();
    }
  };
}
