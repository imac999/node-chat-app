var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMsg', function(msg) {
  console.log('newMsg: ', msg);
  var li=$('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  $('#messages').append(li);
});
socket.on('newLoc', function(loc) {
  console.log('newLoc: ', loc);
  var li=$('<li></li>');
  var a=$('<a></a>');
  a.append(`latitude: ${loc.lat}, longitude: ${loc.lng}`);
  a.attr('href',`https://www.google.com/maps?q=${loc.lat},${loc.lng}`);
  a.attr('target','_blank');
  li.append(`${loc.from}: `);
  li.append(a);
  $('#messages').append(li);
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
