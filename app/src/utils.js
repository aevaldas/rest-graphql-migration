export const formatDataForTable = (data) =>
  data.map(({ id, ...rest }) => ({ key: id, ...rest }));
