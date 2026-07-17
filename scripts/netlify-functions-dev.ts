import type { IncomingMessage } from 'node:http';
import type { Plugin } from 'vite';

interface FunctionEvent {
  httpMethod: string;
  body: string;
  queryStringParameters: Record<string, string>;
}

interface FunctionResult {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
}

type FunctionHandler = (event: FunctionEvent) => Promise<FunctionResult>;

const FUNCTION_PATH_PREFIX = '/.netlify/functions/';

const readBody = async (request: IncomingMessage) => {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8');
};

const loadHandler = async (
  functionName: string
): Promise<FunctionHandler | null> => {
  if (functionName === 'send-quote') {
    const module = await import('../netlify/functions/send-quote.js');
    return module.handler;
  }

  if (functionName === 'address-search') {
    const module = await import('../netlify/functions/address-search.js');
    return module.handler;
  }

  return null;
};

export const netlifyFunctionsDev = (): Plugin => ({
  name: 'netlify-functions-dev',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use(async (request, response, next) => {
      const requestUrl = new URL(request.url ?? '/', 'http://localhost');
      if (!requestUrl.pathname.startsWith(FUNCTION_PATH_PREFIX)) {
        next();
        return;
      }

      const functionName = requestUrl.pathname.slice(
        FUNCTION_PATH_PREFIX.length
      );
      const handler = await loadHandler(functionName);
      if (!handler) {
        next();
        return;
      }

      try {
        const result = await handler({
          httpMethod: request.method ?? 'GET',
          body: await readBody(request),
          queryStringParameters: Object.fromEntries(requestUrl.searchParams),
        });

        response.statusCode = result.statusCode;
        Object.entries(result.headers ?? {}).forEach(([name, value]) => {
          response.setHeader(name, value);
        });
        response.end(result.body);
      } catch (error) {
        server.config.logger.error(
          error instanceof Error ? error.stack ?? error.message : String(error)
        );
        response.statusCode = 500;
        response.setHeader('Content-Type', 'application/json; charset=utf-8');
        response.end(JSON.stringify({ error: 'Local function error' }));
      }
    });
  },
});
