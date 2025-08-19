// Representación del objeto Http Request esperado
interface HttpRequest {
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: unknown;
  queryParams?: Record<string, string>;
  timeout?: number;
}

// Builder
export class HttpRequestBuilder {
  private method: string = 'GET';
  private url: string = '';
  private headers: Record<string, string> = {};
  private body?: unknown;
  private queryParams: Record<string, string> = {};
  private timeout?: number;

  // Métodos del Builder
  setMethod(method: 'GET' | 'POST' | 'PUT' | 'DELETE'): this {
    this.method = method;
    return this;
  }

  setUrl(url: string): this {
    this.url = url;
    return this;
  }

  addHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  setBody(body: unknown): this {
    this.body = body;
    return this;
  }

  addQueryParam(key: string, value: string): this {
    this.queryParams[key] = value;
    return this;
  }

  setTimeout(ms: number): this {
    this.timeout = ms;
    return this;
  }

  // Método que construye el objeto
  build(): HttpRequest {
    if (!this.url) throw new Error('La URL es obligatoria');

    return {
      method: this.method,
      url: this.builderUrlWithParams(),
      headers: this.headers,
      body: this.body,
      ...(this.timeout !== undefined && { timeout: this.timeout }),
    };
  }

  private builderUrlWithParams(): string {
    const query = Object.entries(this.queryParams)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');
    return query ? `${this.url}?${query}` : this.url;
  }
}
