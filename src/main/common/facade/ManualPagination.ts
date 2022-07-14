import PageLessThanOneException from "../exception/PageLessThanOneException";
import {Model} from "sequelize-typescript";
import { PaginationRequestDto } from "../../model/dto/request/pagination-request-dto";

export class ManualPagination<T> {

  static generatePaginationRequest = (
    page: any,
    perPage: any,
    link: string
  ): PaginationRequestDto => {
    const numericPage: number = page === undefined ? 0 : parseInt((page! - 1 ?? 0).toString());
    const numericPerPage: number = page === undefined ? 10 : parseInt((perPage! ?? 10).toString());

    return {
      link: link,
      page: numericPage,
      perPage: numericPerPage
    }
  }
}

export class AsyncManualPagination<T extends Model> {

  public current_page: number = 1; // Current pagination index
  public from: number = 0; // Current pagination index start
  public to: number = 0; // Current pagination index end
  public per_page: number = 12; // Current pagination array limit
  public total: number = 0; // Result Set array size
  public path: string = ""; // Current API URI
  public first_page_uri: string = ""; // Current API pagination URI start index
  public last_page_uri: string = ""; // Current API pagination URI end index
  public next_page_uri: string | null = null; // Current API pagination URI next index
  public prev_page_uri: string | null = null; // Current API pagination URI previous index
  public data: Array<any> = []; // Extracted Result Set

  constructor() {
  }

  getInstance = async (dataset: any, link: string, actualPage: number = 1, perPage: number = 10): Promise<AsyncManualPagination<T>> => {

    /**
     * If page lesser than 1, throw exception.
     */


    this.total = dataset.count;
    const resultSet = dataset.rows;

    if((actualPage + 1) < 1) {
      throw new PageLessThanOneException();
    }

    const paging: number = actualPage + 1;

    const pageParam: string = "?page=";
    const perPageParam: string = "&per_page=";
    const limitPage = perPage!;

    console.log(limitPage, perPage);

    this.data = resultSet;

    // const model = instanceof resultSet[0];

    this.per_page = limitPage;
    this.current_page = paging;
    this.from = (limitPage * actualPage) + 1;
    this.to = (this.from + perPage);
    this.path = link;

    this.prev_page_uri =
      paging === 1
        ? null
        : link + pageParam + (paging - 1).toString() + perPageParam + (limitPage).toString();

    /**
     * If total is lesser or equal to ((value of actual page) + 1) times perPage
     *
     * @example
     *  page = 1
     *  perPage = 10
     *  total = 13
     *
     *  When user requesting for page 2, the data will be start from 11 to 23. @see manual-pagination.ts:19
     *  Which there are no index 24 and further, and it will be point less if next_page_uri
     *  still return something.
     */
    this.next_page_uri =
      (paging * limitPage) >= this.total
        ? null
        : link + pageParam + (paging + 1).toString() + perPageParam + (limitPage).toString();

    this.first_page_uri = link + pageParam + "1" + perPageParam + (limitPage).toString();

    const lastPage = Math.round(this.total / this.per_page);
    const onePageLimiter = lastPage == 0 ? 1 : lastPage;

    this.last_page_uri = link + pageParam + (onePageLimiter).toString() + perPageParam + (limitPage).toString();

    return this;
  }
}
