export interface RegisterJWTDTO {
    jwt_token: string;
    user_id: string;
    device_type: number;
    expired_at: Date;
}