# Quiz Web App 
## Tools & technologies
- HTML, CSS, JavaScript (vanilla)
- JSON for question data
- Development: VS Code (recommended), Live Server extension
- Optional servers: Python http.server or Node http-server for local testing
![Quiz screenshot](/imgs/Screen%20Shot.png)

## How to run
1. Serve the project folder with a local web server (required to load JSON):
   - VS Code + Live Server: right-click the project root -> Open with Live Server
   - Python (from project root):
     ```
     python -m http.server 8000
     ```
   - Node (if installed):
     ```
     npx http-server .
     ```
2. Open in browser:
   - http://localhost:8000/Quiz_app.html

## Important files
- Quiz_app.html — main UI
- master.js — application logic and request handling
- html_q.json — questions data (edit to change questions)
- css/master.css, css/templet1.css — styles
- template1.html — page template

