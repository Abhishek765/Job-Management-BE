export interface THttpResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: unknown;
  request: {
    ip?: string | null; // only meant for backend logs we don't have send  this to client
    method: string;
    url: string;
  };
}

export interface THttpError {
  success: boolean;
  statusCode: number;
  message: string;
  data: unknown;
  request: {
    ip?: string | null;
    method: string;
    url: string;
  };
  trace?: object | null; // only meant for backend logs we don't have send  this to client
}

export interface Job {
  id: string;
  status: 'pending' | 'resolved' | 'failed';
  result?: unknown;
}
