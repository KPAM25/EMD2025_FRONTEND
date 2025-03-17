'use client';
import React, { ComponentPropsWithoutRef } from 'react';
import { Input } from '../ui/input';
import { FieldWrapper } from '@/components/forms/field-wrapper';

type InputProps = ComponentPropsWithoutRef<typeof Input>;

type InputFieldProps = {
  label: string;
  name: string;
  description?: string;
  className?: string;
  inputProps?: Omit<InputProps, 'name'>;
};

export const InputField = ({
  label,
  name,
  description,
  className,
  inputProps = {},
}: InputFieldProps) => {
  return (
    <FieldWrapper
      name={name}
      label={label}
      description={description}
      className={className}
    >
      {(field) => (
        <Input
          {...field}
          value={field.value || ''}
          onChange={(e) => field.onChange(e.target.value)}
          {...inputProps}
        />
      )}
    </FieldWrapper>
  );
};
