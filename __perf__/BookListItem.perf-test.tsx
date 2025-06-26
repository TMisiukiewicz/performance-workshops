import React from 'react';
import {measureRenders} from 'reassure';
import {Provider} from 'react-redux';
import {store} from '../store';
import BookListItem from '../components/BookListItem';

const TestWrapper = ({children}: {children: React.ReactNode}) => {
  return <Provider store={store}>{children}</Provider>;
};

test('BookListItem performance', async () => {
  await measureRenders(<BookListItem id="1" favoriteBookIds={[]} />, {
    wrapper: TestWrapper,
  });
});

test('BookListItem performance with favorite', async () => {
  await measureRenders(<BookListItem id="1" favoriteBookIds={['1']} />, {
    wrapper: TestWrapper,
  });
});
