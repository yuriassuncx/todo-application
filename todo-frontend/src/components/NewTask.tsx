import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { Input } from './Input';

import toast, { Toaster } from 'react-hot-toast';

import { Todo } from '../pages/HomePage';

import { v4 as uuid } from 'uuid';
import { useApplication } from '../hooks/useApplication';


interface NewTaskProps {
    isOpenedModal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NewTask({ isOpenedModal, setModal }: NewTaskProps) {
    const [taskDescription, setTaskDescription] = useState("");
    const { data: todos, mutate } = useApplication();

    async function addNewTask() {
      const id = uuid();

      const todo: Todo = {
        id,
        task: taskDescription,
        is_completed: false
      };

      try {
        const postTodo = async () => {
          const data = await fetch('http://localhost:3333/todos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: todo.id,  
              task: todo.task,
              is_completed: todo.is_completed,
            }),
          }).then(res => res.json());

          return [data, ...todos!]
        }

        await mutate(postTodo, {
          optimisticData: [todo, ...todos!],
          rollbackOnError: true,
        })

        toast.success('Criado com sucesso', {
          position: 'bottom-center',
        });
      } catch (err) {
          toast.error('Ops! algo deu errado', {
            position: 'bottom-center',
          });
          alert(err);
      }

      setTaskDescription("");
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
                    Adicionar uma tarefa
                  </Dialog.Title>
                  <div className="flex flex-col gap-3 mt-12 text-white">
                    <div className="flex items-center gap-4">
                        <span>Tarefa:</span>
                        <Input
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            className="bg-slate-700 py-3 px-4 rounded w-full text-sm text-white placeholder:text-zinc-500"
                        />
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
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      disabled={taskDescription.length < 3}
                      onClick={() => addNewTask()}
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