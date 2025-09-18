```mermaid
sequenceDiagram
  Browser ->> Server: POST /new_note
  Server -->> Browser: 302 Redirect to /notes

  Browser ->> Server: GET /notes
  Server -->> Browser: HTML
  
  Browser ->> Server: GET /data.json
  Server -->> Browser: JSON
```
