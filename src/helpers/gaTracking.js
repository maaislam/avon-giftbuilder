const gaTracking = (label) => {
  const labelMessage = 'Test ID: mealdeal Variation: ' + 1 + ' Label: ' + label;

  window.ga('send', {
    hitType: 'event',
    eventCategory: 'Experimentation',
    eventAction: 'Avon - mealdeal',
    eventLabel: labelMessage,
  });
};

export default gaTracking;
