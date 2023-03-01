import React from 'react';

type Props = {
  isEpmty: boolean,
};

export const Error: React.FC<Props> = ({ isEpmty }) => {
  return (
    <p className={
      isEpmty
        ? 'form__error--active'
        : 'form__error'
    }
    >
      This field is empty
    </p>
  );
};
