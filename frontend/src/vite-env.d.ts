/// <reference types="vite/client" />
interface ImportMetaEnv{
    readonly VITE_BACKEND_ROUTE:string;
}

interface ImportMeta{
    readonly env: ImportMetaEnv
}