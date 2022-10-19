## Integrating final project using vite

## Deploy

Step1: Copy package.json file in your <final-project> folder

Step2: `npm install` in your project folder

Step3: Make sure that .js imports are type="module"

Step4: `npm run build`

Step5: `npm install -g surge` - one time only

Step6: `surge dist nume-proiect.surge.sh`

## Development

Step1: `npm install` in your project folder

Step2: `npm run dev`

Step3: CTRL+click on resource from terminal

### Adding multiple html pages

Create a new vite config file (vite.config.js) with the following content:

```javascript
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				cart: resolve(__dirname, 'src/pages/cart.html'),
				details: resolve(__dirname, 'src/pages/details.html'),
			},
		},
	},
});
```

For adding more page add a new line with a different key for each page. E.g. cart, details.
