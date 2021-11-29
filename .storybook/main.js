module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal(config) {
    const cssRule = config.module.rules.find((rule) => rule.test.test('.css'));
    const use = cssRule.use;
    delete cssRule.use;

    const cssLoaderIndex = use.findIndex((r) =>
      (r.loader || r).includes('/css-loader/')
    );
    cssRule.oneOf = [
      {
        //  `<style module>`
        resourceQuery: /module=true/,
        use: [
          ...use.slice(0, cssLoaderIndex),
          {
            ...use[cssLoaderIndex],
            options: {
              ...use[cssLoaderIndex].options,
              modules: {
                mode: 'local',
                localIdentName: '[local]--[hash:base64:5]'
              },
            },
          },
          ...use.slice(cssLoaderIndex + 1),
        ],
      },
      {
        // plain `<style>` or `<style scoped>`
        use,
      },
    ];

    return config;
  },
};
