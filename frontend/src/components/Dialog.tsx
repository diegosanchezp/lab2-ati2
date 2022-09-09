import React from 'react';
import { Dialog, Transition } from '@headlessui/react'


// Todo pass article instance
export type GenericDialogProps = {
  open: boolean
  onClose: () => any
  title: string
  children: React.ReactNode
  titleClassName?: string
};

export const GenericDialog = (props: GenericDialogProps) => {

  const {onClose, title, open, children, titleClassName} = props;

  return (
    <Dialog
      onClose={() => onClose()}
      open={open}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-white/5 drop-shadow-lg" aria-hidden="true" />
      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 overflow-y-auto">
        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className={`max-w-sm mx-auto rounded bg-black border-2 border-solid border-white px-10 py-5 rounded-lg ${titleClassName}`}>
            <Dialog.Title className="text-white text-2xl text-center mb-2">{title}</Dialog.Title>
    {children}
  </Dialog.Panel>
</div>
        </div>
      </Dialog>
  );
}
