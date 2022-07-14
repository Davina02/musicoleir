export interface PaginationRequestDto {
    link: string;
    page: number | null;
    perPage: number | null;
}