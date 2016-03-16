# Twitter App

> My solution to a coding challenge from Turner.  See [instructions](./instructions.md) for requirements.

## Installation and usage instructions

- Git clone this repo down, then

- Run `npm install`, which installs dependencies, then

- Run `npm start` with 4 process.env variables set (`TWITTER_CONSUMER_KEY`, `TWITTER_CONSUMER_SECRET`, `TWITTER_TOKEN_KEY`, and `TWITTER_TOKEN_SECRET`), which spins up a node.js server that uses the Twitter API.  The 4 variables associate with [Twitter App](https://apps.twitter.com) and Twitter Account keys/tokens thus:

> Application Settings:

> * TWITTER_CONSUMER_KEY: Consumer Key (API Key)
> * TWITTER_CONSUMER_SECRET: Consumer Secret (API Secret)

> Your Account's Access Token:

> * TWITTER_TOKEN_KEY: Access Token
> * TWITTER_TOKEN_SECRET: Access Token Secret

- Then, point a browser (preferably an updated Chrome) window to "localhost:3000", which inits the app and renders the user interface.
