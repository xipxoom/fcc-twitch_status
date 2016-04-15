//onReady
$(function() {
  //temporary testing functionality
  $('#refreshBtn').on('click', function() {
    updateStreams();
  });
});


function updateStreams() {
  // Clear out the stale data
  $('#mainContainer').html("");
  // And fetch the fresh
  // TODO: Remove blank lines
  var streamList = $('#streamList').val().split('\n');
  for (var i = 0, len = streamList.length; i < len; i++) {
    fetchStreamData(streamList[i]);
  }
}

function fetchStreamData( streamName ) {
  $.getJSON('https://api.twitch.tv/kraken/streams/' + streamName + '?callback=?', function(data){
    var streamObj = {};
    console.log(data);

    // Account not streaming
    if (!data.stream){
      console.log('Not currently streaming.  Handle this!');

    // Account doesn't exist
    } else if (data.status == 404) {
      streamObj.streamName = streamName;
      streamObj.preview = './img/static.jpg';
      streamObj.status = 'Account Doesn\'t exist';
      streamObj.logo = './img/question.jpg';
      streamObj.streaming = false;

    // Account closed
    } else if (data.status == 422) {
      streamObj.streamName = streamName;
      streamObj.preview = './img/static.jpg';
      streamObj.status = 'Account Closed';
      streamObj.logo = './img/question.jpg';
      streamObj.streaming = false;

    } else {
    // Currently streaming
      streamObj.streamName = data.stream.channel.display_name;
      streamObj.preview = data.stream.preview.medium;
      streamObj.status = data.stream.channel.status;
      streamObj.logo = data.stream.channel.logo;
      streamObj.url = data.stream.channel.url;
      streamObj.streaming = true;
    }

    displayStream(streamObj);
  });
}


function displayStream( streamObj ) {
  var container = $('<div class="twitchContainer col-xs-12 col-sm-4">' +
      '<img class="streamLogo" src="' + streamObj.logo + '" alt="logo">' +
      '<h2>' + streamObj.streamName + '</h2>' +
      '<p>' + streamObj.status + '</p>' +
      '</div>'
  )
  .css('background-image', 'url(' + streamObj.preview + ')')
  .on('click', function() {
    window.open(streamObj.url, '_blank');
  });
  container.appendTo($('#mainContainer'));
}
