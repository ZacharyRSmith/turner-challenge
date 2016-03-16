var twitterApp = {
  // TODO set according to process.env
  server: 'http://127.0.0.1:3000/api',

  init: function () {
    setInterval(twitterApp.fetch, 3000);
  },

  addStatus: function (status) {
    var $tweet = $('<div class="tweet">' + status.text + '</div>');
    // DUP #feed
    $('#feed').append($tweet);
  },

  clearFeed: function () {
    // DUP #feed
    $('#feed').children().remove();
  },

  fetch: function () {
    $.ajax({
      url: twitterApp.server,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        twitterApp.setFeed(data);
        console.log('twitterApp: fetch success. Data:', data);
      },
      error: function (err) {
        console.error('twitterApp: fetch error:', err);
      }
    });
  },

  setFeed: function (data) {
    if (!Array.isArray(data.statuses)) return;

    twitterApp.clearFeed();
    data.statuses.forEach(function (status) {
      twitterApp.addStatus(status);
    });
  },
};
