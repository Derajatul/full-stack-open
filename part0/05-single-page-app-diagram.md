```mermaid
sequenceDiagram
  Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
  Server -->> Browser: HTML document

  Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  Server -->> Browser: CSS file

  Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
  Server -->> Browser: JavaScript file (spa.js)
  
  Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  Server -->> Browser: JSON (existing notes)
```