import MockAdapter from 'axios-mock-adapter';
import {configureAPI} from '../../api';
import {getOfferList, LOAD_OFFERS} from '../actions';


it(`Expect correct API call to server`, () => {
  const dispatch = jest.fn();
  const api = configureAPI();
  const mock = new MockAdapter(api);

  mock.onGet(`/hotels`).reply(200, [{
    test: `Test`
  }]);

  return getOfferList()(dispatch, jest.fn(), api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: LOAD_OFFERS,
      offers: [{test: `Test`}]
    });
  });
});

