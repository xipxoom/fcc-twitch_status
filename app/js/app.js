//onReady
$(function() {
  if (localStorage.getItem('ts_streams')) {
    $('#streamList').val(localStorage.getItem('ts_streams'));
    updateStreams();
  }
  $('#refreshBtn').on('click', function() {
    localStorage.setItem('ts_streams', $('#streamList').val());
    updateStreams();
  });
  $('#displayStreams').change(function() {
    if(this.checked) {
      // display only online streams
      $('.offline').hide();
      console.log('checked');
    } else {
      // display all streams
      console.log('not checked');
      $('.offline').show();
    }
  });
});


function updateStreams() {
  // Clear out the stale data
  $('#mainContainer').html("");
  // And fetch the fresh
  var streamList = $('#streamList').val().split('\n');
  for (var i = 0, len = streamList.length; i < len; i++) {
    if (streamList[i]) {
      fetchStreamData(streamList[i]);
    }
  }
}

function fetchStreamData( streamName ) {
  $.getJSON('https://api.twitch.tv/kraken/streams/' + streamName + '?callback=?', function(data){
    var streamObj = {};

    // Account not streaming
    if (!data.stream && !data.status){
      $.getJSON('https://api.twitch.tv/kraken/users/' + streamName + '?callback=?', function(data){
        streamObj.streamName = data.name;
        streamObj.preview = './img/static.jpg';
        streamObj.status = "Offline";
        streamObj.logo = data.logo || './img/question.jpg';
        streamObj.url = 'https://www.twitch.tv/' + data.name;
        streamObj.streaming = false;

        displayStream(streamObj);
      });

    // Account doesn't exist
    } else if (data.status == 404) {
      streamObj.streamName = streamName;
      streamObj.preview = './img/static.jpg';
      streamObj.status = 'Account Doesn\'t Exist';
      streamObj.logo = './img/question.jpg';
      streamObj.streaming = false;

      displayStream(streamObj);

    // Account closed
    } else if (data.status == 422) {
      streamObj.streamName = streamName;
      streamObj.preview = './img/static.jpg';
      streamObj.status = 'Account Closed';
      streamObj.logo = './img/question.jpg';
      streamObj.streaming = false;

      displayStream(streamObj);

    } else {
    // Currently streaming
      streamObj.streamName = data.stream.channel.display_name;
      streamObj.preview = data.stream.preview.medium;
      streamObj.status = data.stream.channel.status;
      streamObj.logo = data.stream.channel.logo;
      streamObj.url = data.stream.channel.url;
      streamObj.streaming = true;

      displayStream(streamObj);
    }
  });
}


function displayStream( streamObj ) {
  var container = $('<div class="twitchContainer col-xs-12 col-sm-4">' +
      '<img class="streamLogo" src="' + streamObj.logo + '" alt="logo">' +
      '<h2>' + streamObj.streamName + '</h2>' +
      '<p>' + streamObj.status + '</p>' +
      '</div>'
  )
  .css('background-image', 'url(' + streamObj.preview + ')');
  if (streamObj.url) {
    container.on('click', function() {
      window.open(streamObj.url, '_blank');
    });
  }
  if (streamObj.streaming) {
    container.addClass('streaming');
  } else {
    container.addClass('offline');
  }
  container.addClass('animated fadeIn');
  container.appendTo($('#mainContainer'));
}
