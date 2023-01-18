import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import toast, { Toaster } from 'react-hot-toast';

import axios from 'axios';

import { useApplication } from '../hooks/useApplication';

interface UpdateTaskProps {
    id: string | undefined;
    task: string | undefined;
    isOpenedModal: boolean;
    isCompleted: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UpdateTask({ id, task, isOpenedModal, isCompleted, setModal }: UpdateTaskProps) {
    const { mutate } = useApplication();

    async function RemoveTask() {
      if (isCompleted) {
        toast.error('Ops! tarefa já concluída!', {
          position: 'bottom-center',
        });
        setModal(false);

        return;
      };

      try {
          await axios.patch(`http://localhost:3333/todos/${id}`, {
            is_completed: true,
          });

          mutate();

          toast.success('Tarefa finalizada!', {
            position: 'bottom-center',
          });
      } catch (err) {
          toast.error('Ops! algo deu errado');
          alert(err);
      }

      setModal(false);
    }

  return (
    <>
      <Toaster />
      <Transition appear show={isOpenedModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-600 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    Concluir uma tarefa
                  </Dialog.Title>
                  <div className="flex flex-col gap-3 mt-12 text-white">
                    <div className="flex items-center gap-4">
                        <span>Esta ação irá fazer com que a tarefa com a seguinte descrição seja concluída: {task}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center mt-12 justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => setModal(false)}
                    >
                      Cancelar
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:opacity-80 disabled:cursor-not-allowed"
                      onClick={() => RemoveTask()}
                    >
                      Confirmar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}