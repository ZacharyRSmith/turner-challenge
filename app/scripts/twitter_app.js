var twitterApp = {
  // TODO set according to process.env
  server: 'http://127.0.0.1:3000/api',

  init: function () {
    $('#new-feed').off('submit.handleSubmit').on('submit.handleSubmit', twitterApp.handleSubmit);

    twitterApp.fetch();
    setInterval(twitterApp.updateFeeds, 5000);
  },

  addStatuses: function ($feed, statuses) {
    $feedTweets = $feed.find('.tweets');

    statuses.forEach(function (s) {
      $tweet = twitterApp.parseStatus(s);
      $feedTweets.append($tweet);
    });
  },

  clearFeeds: function () {
    $('#feeds').children().remove();
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
        console.log('twitterApp: new feed created for:', newFeedQuery);
        twitterApp.fetch();
      },
      error: function (err) {
        console.error('twitterApp: new feed creation error:', err);
      }
    });
  },

  fetch: function () {
    twitterApp.startSpinner();

    $.ajax({
      url: twitterApp.server,
      type: 'GET',
      contentType: 'application/json',
      success: twitterApp.handleFeeds,
      error: function (err) {
        console.error('twitterApp: fetch error:', err);
      },
      complete: twitterApp.stopSpinner
    });
  },

  genFeed: function (feedQuery) {
    var feedHTML ='<div class="feed col-lg-3 col-md-3 col-sm-4" data-feed-query="' + feedQuery + '">' +
                    '<h4 class="title">' + feedQuery + '</h4>' +
                    '<ul class="tweets"></ul>' +
                  '</div>';
    return $($.parseHTML(feedHTML));
  },

  handleFeeds: function (feeds) {
    twitterApp.clearFeeds();

    Object.keys(feeds).forEach(function (feedQuery) {
      var statuses = feeds[feedQuery].statuses;
      var $feed = twitterApp.genFeed(feedQuery);

      twitterApp.addStatuses($feed, statuses);
      $('#feeds').append($feed);
    });
  },

  handleSubmit: function (evt) {
    evt.preventDefault();
    var newFeedQuery = $('#new-feed-query').val();
    if (newFeedQuery.length > 500) return alert('Search query cannot exceed 500 characters');
    twitterApp.createNewFeed(newFeedQuery);
    $('#new-feed-query').val('');
  },

  parseStatus: function (status) {
    var text = '<b>@' + status.user.screen_name + ': </b>' +
               '<em>' + status.text + '</em>' +
               // TODO refactor:
               ' on ' + status.created_at.substr(0, 10);
    return $('<div class="tweet">' + text + '</div>'); 
  },

  startSpinner: function(){
    $('.spinner img').show();
  },

  stopSpinner: function(){
    $('.spinner img').fadeOut('fast');
  },

  updateFeeds: function () {
    twitterApp.fetch();
  }
};
