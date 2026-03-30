class ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  statusCode: number;

  constructor(statusCode: number, data: T | null = null, message: string) {
    this.success = true;
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default ApiResponse;
