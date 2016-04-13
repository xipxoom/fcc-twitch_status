//onReady
$(function() {
  //temporary testing functionality
  $('#refreshBtn').on('click', function() {
    updateStreams();
  });
});


function updateStreams() {
  var streamArr = fetchAllStreams();
  displayStreams(streamArr);
}

function fetchAllStreams() {
  var streamList = $('#streamList').val().split('\n');
  var streamData = [];
  for (var i = 0, len = streamList.length; i < len; i++) {
    streamData.push(fetchStreamData(streamList[i]));
  }
  return streamData;
}

function fetchStreamData( streamName ) {
  var obj = {};
  $.getJSON('https://api.twitch.tv/kraken/streams/' + streamName + '?callback=?', function(data){
    obj.streamName = data.stream.channel.display_name;
    obj.preview = data.stream.preview.medium;
    obj.status = data.stream.channel.status;
    obj.logo = data.stream.channel.logo;
    obj.url = data.stream._links.self;
    console.log(data.stream.channel.logo);
  });
  console.dir(obj.logo);
  return obj;
}

function displayStreams( streamArr ) {
  $('#mainContainer').append(
    '<div class="twitchContainer col-xs-12 col-sm-4">' +
    '<img class="streamLogo" src="' + streamArr[0].logo + '" alt="logo">' +
    '<h2>' + streamArr[0].streamName + '</h2>' +
    '<p>' + streamArr[0].status + '</p>' +
    '</div>'
  );
}
