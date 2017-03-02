import React from 'react'
import htmlescape from 'htmlescape'
import Helmet from 'react-helmet'
import manifest from '../build/asset-manifest.json'

const tracking = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KTF4Z9" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
const intercomScript = `window.intercomSettings = {
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
`

const html = ({children, hydrate}) => {
  let head = Helmet.rewind();
  const attrs = head.htmlAttributes.toComponent();

  return (
    <html {...attrs}>
      <head>
        <meta charSet="utf-8"/> {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        <link rel="stylesheet" href={'/' + manifest['main.css']}/>
      </head>
      <body>
        <noscript dangerouslySetInnerHTML={{__html: tracking}}></noscript>
        <div id="root">{children}</div>
        <script id="hydrated-state" type="application/json" dangerouslySetInnerHTML={{__html: htmlescape(hydrate)}}></script>
        <script src={'/' + manifest['main.js']}></script>
        <script src="//platform.twitter.com/widgets.js" async="" charSet="utf-8"></script>
        <script dangerouslySetInnerHTML={{__html: intercomScript}}></script>
      </body>
    </html>
  )
}

export default html
