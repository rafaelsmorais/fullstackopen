```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa.json {"content":"Greetings from João Pessoa, Brazil","date":"2025-10-13T23:30:10.878Z"}
    activate server
    server-->>browser: {"message":"note created"}
    deactivate server
```
```

