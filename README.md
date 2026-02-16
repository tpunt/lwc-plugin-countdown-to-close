# Countdown to Close - Lightweight Charts™ Plugin

This plugin adds a countdown timer onto the last price line of LWC. It requires LWC version `5.0.9` or greater.

Features (3):
 1. Last price line and countdown timer:
   - Customise the line (style, thickness, colour) and label (background colour, text colour, price formatting)
   - Customise the countdown timer (e.g. to display `1m 12s`, `01:12`, etc)
 1. Add a list of countdown timers to the chart (any timeframes)
 1. Display additional horizontal lines relative to the last price (by fixed points or percentages)

The following demonstrates all 3 features (last price line with countdown timer, top-right for a list of other countdown timers, and blue lines 40 points away from the last price):
![demo](https://github.com/user-attachments/assets/f8c321e1-1659-44ba-bacb-14b30fb65044)

## Installation

```bash
npm install lwc-plugin-countdown-to-close
```

## Usage

```ts
import { CountdownToClose, CountdownToCloseOptions, TimeToClose } from 'lwc-plugin-countdown-to-close';
```

## Visual Demo

Using the default countdown:

https://github.com/user-attachments/assets/5dda3091-9baa-4885-8ddf-258b8a39df26

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
