import {createSlug} from "../utils";

const generateFilters = () => {
  return [{
    name: `Watchlist`,
    count: 13,
    url: createSlug(`Watchlist`),
  },
  {
    name: `History`,
    count: 4,
    url: createSlug(`History`),
  },
  {
    name: `Favorites`,
    count: 12,
    url: createSlug(`Favorites`),
  }];
};

export {generateFilters};
