```mermaid
sequenceDiagram
  participant Browser
  participant Server

  Browser ->> Server: POST /new_note
  Server -->> Browser: 302 Redirect to /notes
  Browser ->> Server: GET /notes
  Server -->> Browser: HTML page
  Browser ->> Server: GET /data.json
  Server -->> Browser: JSON
  Browser ->> Server: GET /main.js
  Server -->> Browser: JavaScript
```
