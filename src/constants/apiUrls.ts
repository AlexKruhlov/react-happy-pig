export const apiUrls = {
  root: '/',
  funds: {
    root: '/funds',
    rootWithId: (id: number) => `/funds/${id}`
  },
  bank: {
    root: '/bank',
    incomes: '/bank/incomes',
    incomeWithId: (id: number) => `/bank/incomes/${id}`
  }
};
