# lightning-talk-badges

## Development

Install all dependencies

```bash
npm install
```

Start the app in dev mode. This includes watching src files for changes and auto-restarting

```bash
gulp dev
```

For production mode, the app requires the following environment variables set in order to communicate with the associated google spreadsheet:

```bash
DRIVE_USER
SPREADSHEET_ID
PEM_KEY_FILE or PEM_KEY
```

So, your command line will look something like this:

```bash
NODE_ENV=production DRIVE_USER=abc@developer.gserviceaccount.com SPREADSHEET_ID=12345 PEM_KEY_FILE=my_secret.pem node server.js
```
