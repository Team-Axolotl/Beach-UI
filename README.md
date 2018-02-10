### About

Forked from Project Dream - https://github.com/Cryru/Dream this is an internal demo for Software Group connecting to a UT5 backend.

### Features

* Powerful theming options using material.
 - Demonstrates how an implementation can overwrite standard styles.
 - Implements Software Group UX designer's designs as defaults.
* Page-by-page loading for smaller bundle sizes.
* Material UI components improved without cutting off the original props.
 - Button
 - Input
 - Table (?)
 - Dropdown
* Authentification
* Small overall bundle size.

### How to connect to UT5?

1. Start UT5.
2. Edit the file located in configs/dreamConfig.js with your local ip under the Frontend.Rest.Root key. (ipconfig -> Default ipv4).
3. Open the browser and connect to that ip at the port specified in the config.
