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
  var streamList = $('#streamList').val().split('\n');
  for (var i = 0, len = streamList.length; i < len; i++) {
    fetchStreamData(streamList[i]);
  }
}

function fetchStreamData( streamName ) {
  $.getJSON('https://api.twitch.tv/kraken/streams/' + streamName + '?callback=?', function(data){
    var streamObj = {};
    streamObj.streamName = data.stream.channel.display_name;
    streamObj.preview = data.stream.preview.medium;
    streamObj.status = data.stream.channel.status;
    streamObj.logo = data.stream.channel.logo;
    streamObj.url = data.stream._links.self;

    displayStream(streamObj);
  });
}

function displayStream( streamObj ) {
  $('#mainContainer').append(
    '<div class="twitchContainer col-xs-12 col-sm-4">' +
    '<img class="streamLogo" src="' + streamObj.logo + '" alt="logo">' +
    '<h2>' + streamObj.streamName + '</h2>' +
    '<p>' + streamObj.status + '</p>' +
    '</div>'
  );
}
