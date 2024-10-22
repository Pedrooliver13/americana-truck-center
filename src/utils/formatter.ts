export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const convertCurrencyToNumber = (value: string) => {
  return Number(value.replace('R$', '').replace(/\./g, '').replace(/,/g, '.'));
};
