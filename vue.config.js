module.exports = {
  chainWebpack: config => {
    config.plugin('copy').tap(args => [
      [
        {
          from: 'public/data',
          to: 'data',
          toType: 'dir',
          ignore: [
            'country.json',
            'country_history.json',
            'state.json',
            'state_history.json',
            'states.json',
            'municipality.json',
            'municipalities.json',
            'municipality_history.json',
            'school.json',
            'school_history.json',
            'schools.json',
          ],
        },
      ],
    ]);
  },
};
