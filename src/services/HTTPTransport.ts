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
    data?: Record<string, string>
    headers?: Record<string, string>;
}

function queryStringify(data: Record<string, string>): string {
    if (typeof data !== 'object') {
		throw new Error('Data must be object');
	}

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        const query = `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
        return `${result}${query}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

class HTTPTransport {
    private createMethod(method: METHODS): HTTPMethod {
        return (url, options = {}) => this.request(url, { ...options, method });
    }
    
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
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                resolve(xhr as R);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(queryStringify(data));
            }
        });
    };
}

export default HTTPTransport;
