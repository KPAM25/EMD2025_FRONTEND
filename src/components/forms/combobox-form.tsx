'use client';
import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { FieldWrapper } from './field-wrapper';
import { useFormContext } from 'react-hook-form';
export type ComboboxOption = {
  label: string;
  value: string;
};

export type ComboboxFieldProps = {
  label: string;
  name: string;
  options: ComboboxOption[];
  placeholder?: string;
  description?: string;
  emptyMessage?: string;
  className?: string;
  popoverClassName?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export const ComboboxField = ({
  label,
  name,
  options = [],
  placeholder,
  description,
  emptyMessage = 'No hay opciones disponibles',
  className,
  onChange,
  disabled = false,
}: ComboboxFieldProps) => {
  const [open, setOpen] = useState(false);
  const form = useFormContext();
  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <FieldWrapper
      name={name}
      label={label}
      description={description}
      className={className}
    >
      {(field) => {
        return (
          <Popover
            open={open && !disabled}
            onOpenChange={disabled ? () => {} : setOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={open}
                className='w-full justify-between bg-transparent'
                disabled={disabled}
              >
                <span className='truncate'>
                  {field.value
                    ? safeOptions.find((item) => item.value === field.value)
                        ?.label
                    : placeholder || `Seleccione ${label}`}
                </span>
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className={'p-0 w-full'}>
              <Command>
                <CommandInput
                  placeholder={`Buscar ${label.toLowerCase()}...`}
                />
                <CommandList>
                  <CommandEmpty>{emptyMessage}</CommandEmpty>
                  <CommandGroup>
                    {safeOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        onSelect={(currentValue) => {
                          const selectedOption = safeOptions.find(
                            (opt) => opt.label === currentValue
                          );
                          if (field.value === selectedOption?.value) {
                            form.setValue(name, '');
                            onChange?.('');
                          } else {
                            form.setValue(name, selectedOption?.value || '');
                            onChange?.(selectedOption?.value || '');
                          }
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            field.value === option.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        );
      }}
    </FieldWrapper>
  );
};
