module.exports = {
  chainWebpack: config => {
    config.plugin('copy').tap(args => [
      [
        {
          from: 'public',
          to: '',
          toType: 'dir',
          ignore: [
            'data/country.json',
            'data/country_history.json',
            'data/state.json',
            'data/state_history.json',
            'data/states.json',
            'data/municipality.json',
            'data/municipalities.json',
            'data/municipality_history.json',
            'data/school.json',
            'data/school_history.json',
            'data/schools.json',
          ],
        },
      ],
    ]);
  },
};
