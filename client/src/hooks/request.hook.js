import { useState, useCallback } from 'react';

export const useRequest = () => {
    const [err, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body, headers = {}) => {
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-type'] ='application/json'
            }

            const res = await (await fetch(url, { method, body, headers })).json();

            !res.ok && setError(res.message || 'Server error');

            return { res, err };

        } catch (e) {
           setError(e);
        }

        return { err }
    }, [err, setError]);

    return { request };
}




// import { useState, useCallback } from 'react'
//
// export const useRequest = () => {
//     const [err, setError] = useState(null);
//
//     const request = useCallback( async (url, method = 'GET', body, headers = {}) => {
//         try {
//             if (body) {
//                 body = JSON.stringify(body);
//                 headers['Content-type'] ='application/json'
//             }
//
//             const res = await (await fetch(url, { method, body, headers })).json();
//
//             !res.ok && setError(res.message || 'Server error');
//
//             return { res, err };
//         } catch (e) {
//             setError(e);
//         }
//
//         return { err };
//     }, [err]);
//
//     return { request };
// };
