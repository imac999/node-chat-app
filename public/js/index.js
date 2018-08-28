var socket = io();

function scrollToBottom(){
  var messages=$('#messages');
  var newMessage=messages.children('li:last-child');
  var clientHeight=messages.prop('clientHeight');
  var scrollTop=messages.prop('scrollTop');
  var scrollHeight=messages.prop('scrollHeight');
  var newMessageHeight=newMessage.innerHeight();
  var lastMessageHeight=newMessage.prev().innerHeight();

  if((clientHeight + scrollTop + newMessageHeight + lastMessageHeight) >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMsg', function(msg) {
  var formattedTime=moment(msg.createdAt).format('h:mma');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    from: msg.from,
    text: msg.text,
    createdAt: formattedTime
  });
  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLoc', function(loc) {
  var formattedTime=moment(loc.createdAt).format('h:mma');
  var template = $('#loc-template').html();
  var html = Mustache.render(template, {
    from: loc.from,
    lat: loc.lat,
    lng: loc.lng,
    url: loc.url,
    createdAt: formattedTime
  });
  $('#messages').append(html);
  scrollToBottom();
});


$(function() {
  var messageTextbox=$('[name=message]');
  $('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMsg', {
      from: 'Iain',
      text: messageTextbox.val()
    }, () => {
      messageTextbox.val('');
    });
  });

  var locationButton=$('#send-location');
  locationButton.on('click', function(e) {
    if(!navigator.geolocation){
      return alert('Not Supported By Your Browser');
    }
    locationButton.attr('disabled', 'disabled')
                  .text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function(pos){
      socket.emit('createLoc', {
        from: 'dave',
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }, () => {
        locationButton.removeAttr('disabled').text('Send Location');
      });
    }, function(){
        locationButton.removeAttr('disabled')
                        .text('Send Location');
        return alert('Unable to get Location');
    });
  });
})
