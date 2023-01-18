import { SetStateAction } from 'react';

import { List, MagnifyingGlass, X } from 'phosphor-react';
import { useApplication } from '../hooks/useApplication';
import { Input } from './Input';

interface NavbarProps {
    search: string;
    setSearch: React.Dispatch<SetStateAction<string>>;
    setIsOpenedModal: React.Dispatch<SetStateAction<boolean>>;
}

interface NavButtonProps {
    icon: any;
    color?: string;
    dotColor?: string;
}

const NavButton = ({ icon, color, dotColor }: NavButtonProps) => (
    <div>
      <div
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
        {icon}
      </div>
    </div>
  );

export function Navbar({ search, setSearch, setIsOpenedModal }: NavbarProps) {
    const { setActiveMenu } = useApplication();

    const today = new Date();

    return (
        <div className="flex justify-between items-center p-2 md:ml-6 md:mr-6 mb-6 relative">
            <div className="flex gap-6">
                <button
                    onClick={() => setActiveMenu((prev) => !prev)}
                    className="hover:bg-slate-100/20 p-1 rounded-full"
                >
                    <NavButton icon={<List size={32} />} />
                </button>

                <div className="flex items-center rounded-md bg-gray-600 px-4 py-1 mr-4">
                    <MagnifyingGlass className="text-white text-lg block float-left cursor-pointer mr-2" />

                    <Input 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        className="text-base bg-transparent w-full flex-1 text-white focus:outline-none" 
                    />

                    {search.length > 1 && (
                        <button
                            className="ml-2"
                            onClick={() => setSearch("")}
                        >
                            <X />
                        </button>
                    )}
                </div>
            </div>

            <p className="font-bold lg:hidden xl:flex">{today.toLocaleDateString()}</p>

            <button
                className="hidden md:flex py-2 px-4 font-semibold bg-violet-500 text-white rounded-md hover:scale-105 cursor-pointer transition ease-in duration-150"
                onClick={() => setIsOpenedModal(true)}
            >
                Adicionar nova tarefa
            </button>
        </div>
      );
}