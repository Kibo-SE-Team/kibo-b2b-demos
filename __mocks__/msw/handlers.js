import { graphql } from 'msw'

import { orderMock } from '../stories/orderMock'
import { searchSuggestionMock } from '../stories/searchSuggestionResultMock'

export const checkoutHandlers = [
  // useLoadCheckout
  graphql.query('getCheckout', (_req, res, ctx) => {
    return res(ctx.data(orderMock))
  }),

  // useCheckout
  graphql.query('getOrCreateCheckout', (_req, res, ctx) => {
    return res(ctx.data(orderMock))
  }),

  // useLoadFromCart
  graphql.mutation('getOrCreateCheckoutFromCart', (_req, res, ctx) => {
    return res(ctx.data(orderMock))
  }),

  // useCheckout
  graphql.mutation('updatePersonalDetails', (_req, res, ctx) => {
    return res(ctx.data(orderMock))
  }),
]

export const searchSuggestionHandlers = [
  // useSearchSuggestions
  graphql.query('getSearchSuggestions', (_req, res, ctx) => {
    return res(ctx.data(searchSuggestionMock))
  }),
]

export const handlers = [...checkoutHandlers, ...searchSuggestionHandlers]
