export interface Pagination<E> {
    content:          E[];
    pageable:         Pageable;
    last:             boolean;
    totalElements:    number;
    totalPages:       number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface Pageable {
    sort:       Sort;
    offset:     number;
    pageNumber: number;
    pageSize:   number;
    unpaged:    boolean;
    paged:      boolean;
}

export interface Sort {
    empty:    boolean;
    unsorted: boolean;
    sorted:   boolean;
}
