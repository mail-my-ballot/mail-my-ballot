import React from 'react';
import { render } from '@testing-library/react';
import { Success } from './Success';
import { MemoryRouter, Route } from 'react-router-dom';
import { MemoryRouterProps } from 'react-router'

const Router: React.FC<MemoryRouterProps> = (props) => (
  <MemoryRouter {...props} initialEntries={['/success#hash']} initialIndex={0}/>
)

test('renders learn react link', () => {
  const { getByText } = render(
    <Route path='/success'>
      <Success/>
    </Route>, {
    wrapper: Router
  })
  const h1 = getByText(/^Congratulations!$/i)
  expect(h1).toBeInTheDocument()

  // const confCode = getByText(/hash/i)
  // expect(confCode).toBeInTheDocument()
});
//
