import htmlescape from 'htmlescape'

export default(app, finalHydrate) => {
  return `
    <!doctype html>
    <html lang="en-US">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="shortcut icon" href="/favicon.ico">
      <title>Customer-centric Software for Airlines | Travelaer</title>
      <link href="/static/css/main.css" rel="stylesheet">
    </head>
    <body>
      <div id="root">${app}</div>
      <script id="hydrated-state">window.__HYDRATED_STATE__ = ${htmlescape(finalHydrate)};</script>
      <script type="text/javascript" src="/static/js/main.js"></script>
      <script src="//platform.twitter.com/widgets.js" async="" charSet="utf-8"></script>
      <script>
        window.intercomSettings = {
          app_id: 'cbfc4rcs'
        };
        (function() {
          var w = window;
          var ic = w.Intercom;
          if (typeof ic === "function") {
            ic('reattach_activator');
            ic('update', intercomSettings);
          } else {
            var d = document;
            var i = function() {
              i.c(arguments)
            };
            i.q = [];
            i.c = function(args) {
              i.q.push(args)
            };
            w.Intercom = i;

            function l() {
              var s = d.createElement('script');
              s.type = 'text/javascript';
              s.async = true;
              s.src = 'https://widget.intercom.io/widget/cbfc4rcs';
              var x = d.getElementsByTagName('script')[0];
              x.parentNode.insertBefore(s, x);
            }
            if (w.attachEvent) {
              w.attachEvent('onload', l);
            } else {
              w.addEventListener('load', l, false);
            }
          }
        })()
      </script>
    </body>
    </html>
  `;
};
