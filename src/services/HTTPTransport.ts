export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export type HTTPMethod = <R = unknown>(
  url: string,
  options?: RequestOptions
) => Promise<R>;

export interface RequestOptions {
    timeout?: number;
    method?: METHODS;
    data?:  Record<string, unknown>;
    headers?: Record<string, string>;
};

const queryStringify = (data: Record<string, unknown>): string => {
    if (typeof data !== 'object' || data === null) {
		throw new Error('Data must be object');
	}
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(String(data[key]));
        return `${result}${encodedKey}=${encodedValue}${
        index < keys.length - 1 ? '&' : ''
        }`;
    }, '?');
};

class HTTPTransport {
    private createMethod = (method: METHODS): HTTPMethod => {
        return (url, options = {}) => {
            return this.request(url, { ...options, method });
        };
    };

    get = this.createMethod(METHODS.GET);

    put = this.createMethod(METHODS.PUT);

    post = this.createMethod(METHODS.POST);

    delete = this.createMethod(METHODS.DELETE);

    private request<R>(url: string, options: RequestOptions, timeout: number = 5000): Promise<R> {
        const {headers = {}, method, data} = options;

        return new Promise<R>(function(resolve, reject) {
            if (!method) {
                    reject('No method');
                    return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                ? `${url}${queryStringify(data)}`
                : url
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                try {
                    const contentType = xhr.getResponseHeader('Content-Type') || '';

                    let response: unknown;
                    if (contentType.includes('application/json')) {
                        response = JSON.parse(xhr.responseText);
                    } else if (contentType.includes('text')) {
                        response = xhr.responseText;
                    } else {
                        response = xhr.response;
                    }

                    resolve(response as R);
                    } catch (error) {
                        console.log(error);
                        reject(new Error('Failed to process response'));
                    }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;
            xhr.withCredentials = true;
            
            if (isGet || !data) {
                xhr.send();
            } else {
                if (data instanceof FormData) {
                    xhr.send(data);
                } else {
                    xhr.send(JSON.stringify(data));
                }
            }
        });
    };
}

export default new HTTPTransport();
