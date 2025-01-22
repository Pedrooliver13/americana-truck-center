export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const convertCurrencyToNumber = (value: string) => {
  return Number(value.replace('R$', '').replace(/\./g, '').replace(/,/g, '.'));
};

export function abbreviatesStrings(value?: string) {
  if (!value) return;

  const name = value.replace(/\s+/gi, ' ').trim();
  const listName = removePrepositions(name).split(' ');

  if (listName.length > 2) {
    return listName
      .map((partOfString, index, names) =>
        index === 0 || index === names.length - 1
          ? partOfString
          : `${partOfString[0]}.`
      )
      .join(' ');
  }

  return value;
}

export const removePrepositions = (fullName: string) => {
  return fullName.replace(/\ dos|\ das|\ dos|\ das|\ de|\ da|\ d\'/gi, '');
};
