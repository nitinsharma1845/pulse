class ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  statusCode: number;

  constructor(statusCode: number, message: string, data: T | null = null) {
    this.success = true;
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default ApiResponse;
