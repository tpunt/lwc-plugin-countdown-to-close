# Countdown to Close - Lightweight Charts™ Plugin

This plugin adds a countdown timer onto the last price line of LWC. It requires LWC version 5 or greater.

## Installation

```bash
npm install lwc-plugin-countdown-to-close
```

## Usage

```ts
import { CountdownToClose, CountdownToCloseOptions } from 'lwc-plugin-countdown-to-close';
```

## Development

### Running Locally

```shell
npm install
npm run dev
```

Visit `localhost:5173` in the browser.

### Building the Package

```bash
npm run compile
```

This will:
1. Compile TypeScript to JavaScript
2. Bundle the plugin for both ES modules and UMD
3. Generate TypeScript type definitions
4. Output everything to the `dist/` folder

## Publishing To NPM

You can configure the contents of the package's `package.json` within the
`compile.mjs` script.

Once you have compiled the plugin (see above section) then you can publish the
package to NPM with these commands:

```shell
cd dist
npm publish
```

Hint: append `--dry-run` to the end of the publish command to see the results of
the publish command without actually uploading the package to NPM.
