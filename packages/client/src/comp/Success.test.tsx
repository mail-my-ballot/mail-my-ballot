import React from 'react';
import { render } from '@testing-library/react';
import { Success } from './Success';
import { MemoryRouter } from 'react-router-dom';

test('renders learn react link', () => {
  const { getByText } = render(
    <Success/>, {
    wrapper: MemoryRouter
  })
  const h1 = getByText(/^Congratulations!$/i)
  expect(h1).toBeInTheDocument()

});
