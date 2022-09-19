// Not a stable code & WIP


import { Session } from "next-auth"
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useRouter, } from 'next/router';

export async function fetchSession() {
    const res = await fetch('/api/auth/session');
    const session = await res.json();
    if (Object.keys(session).length > 0) {
        return session;
    }
    return null;
}


interface ISession<R> {
    required?: R;
    redirectTo?: string;
    queryConfig?: Omit<
        UseQueryOptions<Session, unknown, Session>,
        'queryKey' | 'queryFn' | 'initialData'
    >
}

// export function useSession<R extends boolean = false>({ required, redirectTo = '/api/auth/signin?error=SessionExpired', queryConfig = {} } = {}) {
//     const router = useRouter();
//     const query = useQuery(['session'], fetchSession, {
//         ...queryConfig,
//         onSettled(data, error) {
//             if (queryConfig.onSettled) queryConfig.onSettled(data, error);
//             if (data || !required) return;
//             router.push(redirectTo);
//         },
//     });
//     return [query.data, query.status === 'loading'];
// }