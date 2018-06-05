function openUrl (url, title) {
  title = title || 'auth'
  var w = 500, h = 600
  var screenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
  var screenTop = window.screenTop !== undefined ? window.screenTop : screen.top

  var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
  var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

  var left = ((width / 2) - (w / 2)) + screenLeft
  var top = ((height / 2) - (h / 2)) + screenTop
  var newWindow = window.open(url, title, 'toolbar=no,location=no,status=yes,resizable=yes,scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

  if (window.focus) {
    newWindow.focus()
  }
}

window.addEventListener('message', function (event) {
  if (typeof event.data === 'string' && ~event.data.indexOf('FlespiToken')) {
    var div = document.createElement('div');
    div.innerHTML = event.data;
    document.querySelector('#tokens').appendChild(div);
  }
})

var req = new XMLHttpRequest()
req.open('GET', 'https://flespi.io/auth/oauth/providers', true);
req.onreadystatechange = function() {
  if (req.readyState == 4) {
    if(req.status == 200) {
      var response = JSON.parse(req.responseText)
      Object.keys(response.result[0]).forEach(function(key,index) {
        var div = document.createElement('div');
        div.innerHTML = key;
        div.className = 'button';
        div.onclick = function(e) {
          openUrl(response.result[0][key])
        };
        document.body.appendChild(div);
      });
      var div = document.createElement('div');
      div.innerHTML = 'email';
      div.className = 'button';
      div.onclick = function(e) {
        openUrl('https://flespi.io/#/login/')
      };
      document.body.appendChild(div);
	 }
  }
};
req.send(null);
