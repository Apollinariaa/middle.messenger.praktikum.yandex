export const  METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

interface Options {
    timeout: number;
    method: string;
    data: Record<string, unknown>
    headers: Record<string, string>;
}

function queryStringify(data: Record<string, unknown>): string {
    if (typeof data !== 'object') {
		throw new Error('Data must be object');
	}

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

class HTTPTransport {
    get = ({url, options}: {url: string, options: Options}) => {
        return this.request({url, options: {...options, method: METHODS.GET}});
    };

    post = ({url, options}: {url: string, options: Options}) => {
        return this.request({url, options: {...options, method: METHODS.POST}});
    };

    put = ({url, options}: {url: string, options: Options}) => {
        return this.request({url, options: {...options, method: METHODS.PUT}});
    };

    delete = ({url, options}: {url: string, options: Options}) => {
        return this.request({url, options: {...options, method: METHODS.DELETE}});
    };

    request = ({url, options}: {url: string, options: Options}) => {
        const {headers = {}, method, data, timeout} = options;

        return new Promise(function(resolve, reject) {
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
                resolve(xhr);
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
