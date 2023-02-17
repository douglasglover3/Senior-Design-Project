To launch this project from the terminal:

First make sure you are in the Senior Design Project folder, then type:
    
    npm run dev

What npm run dev does is basically run two other commands:

    npm start - launches a local server (and connects to it via your web browser)
    
    npm run electron - opens the electron app and connects to the local server


The web browser is only useful for making a website, so we don't need it to open.

To prevent the browser from opening, make a file called '.env' in the main folder and put this line in it:

    BROWSER=none


To package the app as an executable use:

    npm run electron:package:win

Replace win with mac or linux if for other OS.