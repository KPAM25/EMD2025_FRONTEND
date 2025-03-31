'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot='tabs'
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = React.useState({
    width: 0,
    left: 0,
    opacity: 0,
  });

  React.useEffect(() => {
    const updateIndicator = () => {
      if (listRef.current) {
        const activeTab = listRef.current.querySelector(
          '[data-state="active"]'
        ) as HTMLElement;
        if (activeTab) {
          const { offsetLeft, offsetWidth } = activeTab;
          setIndicatorStyle({
            width: offsetWidth,
            left: offsetLeft,
            opacity: 1,
          });
        }
      }
    };

    // Actualizar indicador inmediatamente y al cambiar de tab
    updateIndicator();

    // Usar MutationObserver para detectar cambios en el DOM
    const observer = new MutationObserver(updateIndicator);
    if (listRef.current) {
      observer.observe(listRef.current, { attributes: true, subtree: true });
    }

    // Limpiar observer al desmontar
    return () => observer.disconnect();
  }, []);

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot='tabs-list'
      className={cn('relative flex bg-stone-100 p-1 rounded-lg', className)}
      {...props}
    >
      {/* Indicador deslizante que se mueve bajo el tab activo */}
      <div
        className='absolute shadow-sm inset-y-0 my-auto h-[85%] bg-white rounded-md transition-all duration-300 z-0'
        style={{
          width: `${indicatorStyle.width}px`,
          left: `${indicatorStyle.left}px`,
          opacity: indicatorStyle.opacity,
        }}
      />
      {props.children}
    </TabsPrimitive.List>
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className={cn(
        'relative z-10 flex items-center justify-center text-sm gap-2 py-2 px-4',
        'text-stone-800 transition-all duration-300',
        'data-[state=active]:text-primary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
        'disabled:pointer-events-none disabled:opacity-50',
        '[&_svg]:size-4 [&_svg]:shrink-0 mr-1',
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot='tabs-content'
      className={cn(
        'flex-1 outline-none mt-4',
        'data-[state=inactive]:opacity-0 data-[state=inactive]:translate-y-1 data-[state=inactive]:absolute',
        'data-[state=active]:opacity-100 data-[state=active]:translate-y-0 data-[state=active]:relative',
        'transition-all duration-300 transform',
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
