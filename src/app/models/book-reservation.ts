export interface BookReservationDetailS {
  book_id: string,
  book_reservation_id: null,
  action: number,
  description: string|null,
  date_borrow: null,
  date_return: null
}

export interface BookReservationType {
BookReservationDetailS: BookReservationDetailS[]
type: number,
action: number
}
