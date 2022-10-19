module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal(config) {
    const cssRuleIndex = config.module.rules.findIndex((rule) => rule.test.test('.css'));
    const cssRule = config.module.rules[cssRuleIndex];
    console.log(cssRule);
    const use = cssRule.use;
    delete cssRule.use;

    const cssLoaderIndex = use.findIndex((r) =>
      (r.loader || r).includes('/css-loader/')
    );
    const cssMouleUse = [
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
    ];
    cssRule.oneOf = [
      {
        //  `<style module>`
        resourceQuery: /module=true/,
        use: cssMouleUse,
      },
      {
        //  `<style module>`
        test: /\.module\.css$/,
        use: cssMouleUse,
      },
      {
        // plain `<style>` or `<style scoped>`
        use,
      },
    ];


    // config.module.rules.splice(cssRuleIndex, 0, {
    //   test: /\.module\.css$/,
    //   use: use,
    //   sideEffects: true
    // });
    // console.log(cssMouleUse);

    return config;
  },
};
