## Discord.js Bot Base

## Warning: this bot base is unfinished and is not receiving important updates.

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#requirements">Requirements</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#api-documentation">API Documentation</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

NOT FINISHED!!
## Requirements
- git
- [Node.js](https://nodejs.org/)
- [MongoDB server](https://www.mongodb.com/try/download/community)
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ItzRock/BotBaseV2.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
## About the Repository
- <a href="https://github.com/ItzRock/BotBaseV2/tree/master/commands">commands</a> (Directory) Does what you would expect a commands folder to do; Stores all the command files/functions
- <a href="https://github.com/ItzRock/BotBaseV2/tree/master/events">events</a> (Directory) Stores the discord.js event handlers to be used on that specific event (The name of the file)
- <a href="https://github.com/ItzRock/BotBaseV2/tree/master/reference">reference</a> (Directory) Stores references for some of the features.
- <a href="https://github.com/ItzRock/BotBaseV2/tree/master/handlers">handlers</a> (Directory) Includes the loaders, functions, configuration, etc.
- <a href="https://github.com/ItzRock/BotBaseV2/blob/master/Application.js">Application.js</a> Main Application

<!-- LICENSE -->
## License

Distributed under the Apache License 2.0 License. See `LICENSE` for more information.

## API Documentation
### Functions: 
Too many to write here, see <a href="https://github.com/ItzRock/BotBaseV2/tree/master/handlers/Functions.js">handlers/functions.js</a> for more.

### Custom Events
Discord.js's Client class extends off of node.js's event emitter so you can run `client.emit` and emit custom classes. Currently there are two

`messageButton` - Extends interaction, handles the message buttons.

`slashCommand` - Extends interaction, handles slash commands.

<!-- CONTACT -->
## Contact
Discord server (Public): [Hue](https://discord.com/invite/QwgnZ83XD3)
