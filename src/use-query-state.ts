import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';

export const useQueryState = (query) => {
  const location = useLocation();
  const history = useHistory();

  const setQuery = useCallback(
    (value) => {
      const existingQueries = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      const queryString = qs.stringify(
        { ...existingQueries, [query]: value },
        { skipNulls: true }
      );

      history.push(`${location.pathname}?${queryString}`);
    },
    [history, location, query]
  );

  if (!query) return ['123', setQuery];

  return [
    qs.parse(location.search, { ignoreQueryPrefix: true })[query],
    setQuery,
  ];
};
