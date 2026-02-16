# Countdown to Close - Lightweight Charts™ Plugin

This plugin adds a countdown timer onto the last price line of LWC. It requires LWC version `5.0.9` or greater.

Features (3):
 - Last price line and countdown timer:
   - Customise the line (style, thickness, colour) and label (background colour, text colour, price formatting)
   - Customise the countdown timer (e.g. to display `1m 12s`, `01:12`, etc)
 - Add a list of countdown timers to the chart (any timeframes)
 - Display additional horizontal lines relative to the last price (by fixed points or percentages)

## Installation

```bash
npm install lwc-plugin-countdown-to-close
```

## Usage

```ts
import { CountdownToClose, CountdownToCloseOptions, TimeToClose } from 'lwc-plugin-countdown-to-close';
```

## Visual Demo

Showing all 3 features (last price line with countdown timer, list of other countdown timers in the top-right, and blue lines 40 points away from the last price):
![demo](https://github.com/user-attachments/assets/f8c321e1-1659-44ba-bacb-14b30fb65044)

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
