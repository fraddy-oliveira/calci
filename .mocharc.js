module.exports = {
  diff: true,
  reporter: 'mochawesome',
  'reporter-option': ['reportDir=test-report', 'reportFilename=report'],
  slow: '5',
  timeout: '1000',
};
