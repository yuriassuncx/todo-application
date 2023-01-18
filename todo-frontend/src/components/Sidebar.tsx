import { Link, NavLink } from 'react-router-dom';
import { Timer, XCircle } from 'phosphor-react';

import { navData } from '../data/constants';

import { useApplication } from '../hooks/useApplication';

export function Sidebar() {    
    const { setActiveMenu } = useApplication();

    const activeLink = 'flex items-center gap-5 pl-4 pr-4 pt-3 pb-2.5 rounded-lg text-white bg-violet-500 dark:text-white text-md m-2';
    const normalLink = 'flex items-center gap-5 pl-4 pr-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-white hover:text-white hover:bg-slate-500 m-2'

    return (
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
            <div className="flex justify-between items-center">
                <Link
                    to="/"
                    className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-900 dark:text-white"
                >
                    <Timer /> <span>TO-DO List</span>
                </Link>
                <div>
                    <button
                        type="button"
                        onClick={() => setActiveMenu(false)}
                        className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block dark:text-white hover:bg-slate-100/20"
                    >
                        <XCircle />
                    </button>
                </div>
            </div>
            <div className="mt-10">
                {navData.map((item) => (
                    <NavLink
                        to={item.path}
                        key={item.name}
                        className={({ isActive }) =>  isActive ? activeLink : normalLink}
                    >
                        {item.icon}
                        <span className="capitalize">
                            {item.name}
                        </span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}