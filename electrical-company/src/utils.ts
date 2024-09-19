import {traceparent} from "tctx";
import {ErrorResponse} from "./types";

export const getTraceId = () => traceparent.make().toString();

export async function postData (url: string, key: string, payload: Record<string, any>) {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json, */*",
                "Content-Type": "application/json",
                Traceparent: getTraceId(),
                Authorization: `Bearer ${key}`
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            return res.json();
        } else if (res.status == 401) {
            return Promise.reject(statusReject(res));
        } else {
            return res.json().then((data) => {
                return Promise.reject(data);
            });
        }
    } catch (err) {
        console.warn('Error sending message to user');
        throw err;
    }

}

function statusReject(res: Response): ErrorResponse {
    const unrecoverable = res.status === 401;
    let statusText = null;

    switch (res.status) {
        case 401:
            statusText = 'Authentication Error';
            break;
        case 403:
            statusText = 'Authorization Error';
            break;
        case 404:
            statusText = 'Not Found';
            break;
        case 409:
            statusText = 'Conflict';
            break;
        default:
            statusText = 'Request Error';
            break;
    }

    const statusMessage = res.statusText;

    if (res.status == 400) {
        return {
            statusCode: res.status,
            statusMessage: statusMessage,
            unrecoverable: unrecoverable
        };
    } else {
        return {
            statusCode: res.status,
            statusMessage: statusText,
            unrecoverable: unrecoverable
        }
    }
}
