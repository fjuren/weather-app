// Error type for weather api
export class WeatherAPIError extends Error {
    code: string;
    status?: number;
    constructor(message: string, code: string, status?: number) {
        super(message)
        this.name = 'WeatherAPIError';
        this.code = code;
        this.status = status;
    }
}