import flatten from 'lodash.flatten';

import fetchYaml from '../utils/fetchYaml';

export const PALETTE_LIST_LOADED = 'paletteList/PALETTE_LIST_LOADED';

const initialState = {
  paletteUrls: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PALETTE_LIST_LOADED:
      return {
        ...state,
        paletteUrls: action.urls,
      };
    default:
      return state;
  }
};

const loadRepoContents = url =>
  fetchYaml(
    url.replace('github.com', 'api.github.com/repos') +
      '/contents?client_id=5df605cf10394cab2ad6&client_secret=257ce992952149587b4fb1ad88caf79eab61e9a1'
  );

export const loadPaletteUrls = () => async dispatch => {
  const reposList = await fetchYaml(
    'https://raw.githubusercontent.com/chriskempson/base16-schemes-source/master/list.yaml'
  );
  const reposContents = await Promise.all(
    Object.values(reposList).map(loadRepoContents)
  );

  const palettesUrls = flatten(
    reposContents.map(files =>
      files
        .filter(file => file.name.endsWith('.yaml'))
        .map(({ download_url }) => download_url)
    )
  );

  const hash = {};
  palettesUrls.forEach(paletteUrl => {
    const path = paletteUrl.split('/');
    const key = path[path.length - 1].slice(0, -5);
    hash[key] = {
      name: key,
      url: paletteUrl,
      loaded: false,
      loading: false,
    };
  });

  dispatch({
    type: PALETTE_LIST_LOADED,
    urls: hash,
  });
};
