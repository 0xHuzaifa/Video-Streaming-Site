class ApiResponse {
  constructor(statusCode, message = "Success", data, type) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
    if (type !== undefined) {
      this.type = type; // only add if provided
    }
  }
}

export default ApiResponse;
