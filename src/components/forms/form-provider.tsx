'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  UseFormProps,
  FieldValues,
  SubmitHandler,
  Resolver,
} from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../ui/form';

type FormValues = Record<string, unknown>;

interface FormProps<
  TSchema extends z.ZodType<FormValues>,
  TFieldValues extends FieldValues = z.infer<TSchema>,
> {
  schema: TSchema;
  defaultValues?: UseFormProps<TFieldValues>['defaultValues'];
  onSubmit: SubmitHandler<TFieldValues>;
  children: React.ReactNode;
  formProps?: React.ComponentProps<'form'>;
  className?: string;
}

export function ZodForm<
  TSchema extends z.ZodType<FormValues>,
  TFieldValues extends FieldValues = z.infer<TSchema>,
>({
  schema,
  defaultValues,
  children,
  onSubmit,
  formProps,
  className,
}: FormProps<TSchema, TFieldValues>) {
  const methods = useForm<TFieldValues>({
    resolver: zodResolver(schema) as Resolver<TFieldValues>,
    defaultValues,
  });


  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={className}
        {...formProps}
      >
        {children}
      </form>
    </Form>
  );
}
