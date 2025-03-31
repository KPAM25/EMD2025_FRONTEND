import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useModalStore } from '@/store/use-modal';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

export const Modal = () => {
  const {
    isModalOpen,
    title,
    content,
    okText,
    cancelText,
    onOk,
    onCancel,
    closeModal,
    resetModalData,
    description,
    isOkLoading,
    isCancelLoading,
    setOkLoading,
    setCancelLoading,
  } = useModalStore();

  // Este useEffect maneja la limpieza de datos cuando el modal se cierra
  useEffect(() => {
    if (!isModalOpen) {
      // Establecemos un pequeño retraso para asegurarnos de que la
      // animación de cierre haya terminado antes de limpiar los datos
      const timeoutId = setTimeout(() => {
        resetModalData();
      }, 300); // Ajusta este valor según la duración de tu animación

      return () => clearTimeout(timeoutId);
    }
  }, [isModalOpen, resetModalData]);

  const handleOk = async () => {
    if (onOk) {
      try {
        setOkLoading(true);
        const result = onOk();
        // Check if result is a Promise
        if (result instanceof Promise) {
          await result;
        }
      } catch (error) {
        console.error('Error en acción OK del modal:', error);
      } finally {
        setOkLoading(false);
        closeModal();
      }
    } else {
      closeModal();
    }
  };

  const handleCancel = async () => {
    if (onCancel) {
      try {
        setCancelLoading(true);
        const result = onCancel();
        // Check if result is a Promise
        if (result instanceof Promise) {
          await result;
        }
      } catch (error) {
        console.error('Error en acción Cancelar del modal:', error);
      } finally {
        setCancelLoading(false);
        closeModal();
      }
    } else {
      // Si no hay onCancel, simplemente cerramos el modal
      closeModal();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent
        onEscapeKeyDown={closeModal}
        onInteractOutside={closeModal}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {content}
        <DialogFooter>
          {/* Siempre mostramos el botón de cancelar primero */}
          <Button
            onClick={handleCancel}
            disabled={isOkLoading || isCancelLoading}
            variant='outline'
            className='flex items-center gap-2'
          >
            {isCancelLoading && <Loader2 className='animate-spin h-4 w-4' />}
            {cancelText || 'Cancelar'}
          </Button>
          {/* Botón de acción principal */}
          {onOk && (
            <Button
              onClick={handleOk}
              variant='default'
              disabled={isOkLoading || isCancelLoading}
              className='flex items-center gap-2'
            >
              {isOkLoading && <Loader2 className='animate-spin h-4 w-4' />}
              {okText || 'Aceptar'}
            </Button>
          )}
          {/* Botón de cierre invisible para manejar correctamente el evento de cierre */}
          <DialogClose className='hidden' onClick={closeModal} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
