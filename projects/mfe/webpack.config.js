const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mfe',
  filename: "remoteEntry.js",
  exposes: {
    './Component': './projects/mfe/src/app/app.component.ts',
    './ChartModule': './projects/mfe/src/app/chart/chart.module.ts'
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
