const flatten = require('lodash.flatten');
const yaml = require('js-yaml');
const fs = require('fs');
const fetch = require('node-fetch');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const CLIENT = args.id;
const SECRET = args.secret;

const fetchYaml = async url => {
  const response = await fetch(url);
  const text = await response.text();
  return yaml.safeLoad(text);
};

const loadRepoContents = url =>
  fetchYaml(
    url.replace('github.com', 'api.github.com/repos') +
    '/contents?client_id=' + CLIENT + '&client_secret=' + SECRET
  );

const buildPalettes = async () => {
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
        .map(({download_url}) => download_url)
    )
  );

  const palettes = await Promise.all(palettesUrls.map(async paletteUrl => {
    const path = paletteUrl.split('/');
    const key = path[path.length - 1].slice(0, -5);
    const paletteP = fetchYaml(paletteUrl);

    return paletteP.then((palette) => ({ key, palette }));
  }));
  const hash = {};
  palettes.forEach(({ key, palette }) => {
    hash[key] = palette;
  });
  fs.writeFileSync('./src/base16-palettes.json', JSON.stringify(hash, false, 2));
};

buildPalettes();
