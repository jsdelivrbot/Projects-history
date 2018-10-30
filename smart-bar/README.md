To start react app on `localhost:8080`:
```
> npm install
> npm start
```

To start server for widget on `localhost:3000`:
```
> cd widget
> node server.js
```

Widget code:
```
<!-- begin smartbar code -->
<script type="text/javascript" async>
  !function(e,t,r){var n,a=e.getElementsByTagName(t)[0]
  if(!e.getElementById(r))return n=e.createElement(t),
  n.id=r,n.src="//localhost:3000/smartbar",a.parentNode.insertBefore(n,a),
  function(e){n.onload=function(){smartbar.init(e)}}}
(document,"script","smartbar-js")("your-experiment-id")
</script>
<!-- end smartbar code -->
```


