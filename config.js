const StyleDictionary = require('style-dictionary');

function transformReferences(key, value) {
  if (typeof value === 'string' && value.startsWith('$')) {
    return `{${value.slice(1)}.value}`;
  }
  return value;
}

StyleDictionary.registerParser({
  pattern: /.json$/,
  parse: ({ contents }) => {
    const json = JSON.parse(contents, (key, value) => {
      return transformReferences(key, value);
    });
    return json;
  },
});

function px(value) {
  return `${value}px`;
}

StyleDictionary.registerTransform({
  name: 'hf/px',
  type: 'value',
  matcher: (token) =>
    ['fontSizes', 'sizing', 'spacing'].includes(token.original.type),
  transformer: (token) => px(token.original.value),
});

StyleDictionary.registerTransform({
  name: 'hf/shadow',
  type: 'value',
  matcher: (token) => ['boxShadow'].includes(token.original.type),
  transformer: ({ original: { value } }) =>
    [
      px(value.x),
      px(value.y),
      px(value.blur),
      px(value.spread),
      value.color,
    ].join(' '),
});

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transforms: [
        'attribute/cti',
        'name/cti/camel',
        'time/seconds',
        'content/icon',
        'size/rem',
        'color/css',
        'hf/px',
        'hf/shadow',
      ],
      buildPath: 'src/tokens/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
};
