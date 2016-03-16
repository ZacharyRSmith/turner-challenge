var twitterApp = {
  // TODO set according to process.env
  server: 'http://127.0.0.1:3000/api',

  init: function () {
    $('#new-feed').off('submit.handleSubmit').on('submit.handleSubmit', twitterApp.handleSubmit);

    twitterApp.fetch();
    setInterval(twitterApp.fetch, 5000);
  },

  addStatus: function (status) {
    var $tweet = $('<li class="tweet">' + status.text + '</li>');
    // DUP #feed
    $('.feed').append($tweet);
  },

  clearFeed: function () {
    // DUP #feed
    $('.feed > .tweets').children().remove();
  },

  createNewFeed: function (newFeedQuery) {
    // TODO refactor this into feeds stored on server
    // Add feed elt
    console.log('createNewFeed:', newFeedQuery);

    $.ajax({
      url: twitterApp.server,
      type: 'POST',
      data: newFeedQuery,
      contentType: 'application/json',
      success: function (data) {
        twitterApp.fetch();
        console.log('twitterApp: new feed created for:', newFeedQuery);
      },
      error: function (err) {
        console.error('twitterApp: new feed creation error:', err);
      }
    });
  },

  fetch: function (data) {
    $.ajax({
      url: twitterApp.server,
      type: 'GET',
      data: data,
      contentType: 'application/json',
      success: function (data) {
        twitterApp.setFeed(data);
        // console.log('twitterApp: fetch success. Data:', data);
      },
      error: function (err) {
        console.error('twitterApp: fetch error:', err);
      }
    });
  },

  handleSubmit: function (evt) {
    console.log('evt', evt);
    evt.preventDefault();
    twitterApp.createNewFeed($('#new-feed-query'));
    $('#new-feed-query').val('');
  },

  setFeed: function (data) {
    if (!Array.isArray(data.statuses)) return;

    twitterApp.clearFeed();
    data.statuses.forEach(function (status) {
      twitterApp.addStatus(status);
    });
  },
};
