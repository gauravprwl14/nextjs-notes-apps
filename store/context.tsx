import { GetServerSidePropsContext } from 'next/types';
import { createContext, useContext, useState, useMemo } from "react";
import { getAPIContext, CONSTANTS } from 'utils/helper';
import { fetcher, HttpMethods } from '../utils/fetcher'
import { useNotesController } from './notes'
import { INotes } from '@/types/note'

const AppContext = createContext({});






export function AppProvider({ children, notes }: { children: React.ReactNode, notes: INotes[] }) {
    return (
        <AppContext.Provider value={useNotesController(notes)} > {children} </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}