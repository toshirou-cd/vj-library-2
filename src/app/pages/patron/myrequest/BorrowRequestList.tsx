import {
  BookReservationDetailS,
  BookReservationType,
} from '@app/models/book-reservation';
import { RequestAction } from '@app/models/request-action';
import authHeader from '@app/services/auth/auth-header';
import { sendBoorowRequestOnline } from '@app/services/request/sendRequest';
import { removeItemFromCart } from '@app/store/actions/cartActions';
import { RootStore } from '@app/store/myStore';
import { CartDispatchType } from '@app/store/types';
import apiLinks from '@app/utils/api-links';
import Axios from 'axios';
import React, { Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Container,
  Icon,
  Input,
  Item,
  ItemDescription,
  Label,
} from 'semantic-ui-react';
import '../mainLibrary/test.css';

const BorrowRequestList = () => {
  const cartState = useSelector((state: RootStore) => state.CartReducer);
  const dispatch: Dispatch<any> = useDispatch();

  const handleOnClick = (bookId: string) => {
    dispatch(removeItemFromCart(bookId));
  };

  const sendRequest = async () => {
    const bookReservationDetails: BookReservationDetailS[] = cartState.books.map(
      (book) => {
        return {
          book_id: book.id,
          book_reservation_id: null,
          action: 1,
          description: null,
          date_borrow: null,
          date_return: null,
        };
      },
    );
    const tmp: BookReservationDetailS[] = [
      {
        book_id: '19867916-f27d-11eb-9a03-0242ac130003',
        book_reservation_id: null,
        action: 1,
        description: null,
        date_borrow: null,
        date_return: null,
      },
    ];

    const bookReservation: BookReservationType = {
      BookReservationDetailS: bookReservationDetails,
      type: 1,
      action: RequestAction.borrow,
    };

    await sendBoorowRequestOnline(bookReservation)
      .then((data:any) =>
        console.log('send req ' + data + 'boooks ' + JSON.stringify(bookReservationDetails)),
      )
      .catch((err) => console.log('err ' + err));
  };
  const getDetails = () => {
    Axios.get(`apiLinks.getReservationDetail.user`, {
      headers: {
        authHeader,
      },
    }).then((data) => console.log(' bc', data.data));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(cartState + ' booksreservation: ' , token);
  }, []);

  return (
    <Container className="BorrowReqList">
      <Button color="blue" icon content="Sort">
        Sort by
        <Icon name="sort alphabet ascending" />
      </Button>
      <Item.Group>
        {cartState.books.map((book, id) => {
          return (
            <Item key={id}>
              {/* <Item.Image size="small" src={`${apiUrl}/displayimg/${book.book_avatar}`} /> */}
              <Item.Image
                size="small"
                src={`${apiLinks.getBookCover}${book.book_avatar}`}
              />
              <Item.Content verticalAlign="top">
                <Item.Header as="a">{book.book_title}</Item.Header>
                <Item.Meta>
                  <span>{book.authors}</span>
                </Item.Meta>
                <ItemDescription>
                  <Input fluid size="big" focus placeholder="Your Message..." />
                </ItemDescription>
                <Item.Extra>
                  {book.categorys.map((val, id) => {
                    return <Label key={id} icon="laptop" content={val} />;
                  })}
                  <Label content="Novel" />
                  <Label content="Fiction Book" />
                  <Button
                    color="red"
                    floated="right"
                    icon
                    labelPosition="right"
                    onClick={() => handleOnClick(book.id)}
                  >
                    Remove
                    <Icon name="remove" />
                  </Button>
                </Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>

      <Button
        className="Button"
        content="Send Request"
        primary
        floated="right"
        size="big"
        onClick={() => sendRequest()}
      />
    </Container>
  );
};

export default BorrowRequestList;
