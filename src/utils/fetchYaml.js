import yaml from 'js-yaml';

export default async url => {
  const response = await fetch(url);
  const text = await response.text();
  return yaml.safeLoad(text);
};
