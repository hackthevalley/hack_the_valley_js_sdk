# Hack the Valley JavaScript SDK

Interested in building with Hack the Valley API? Download our JS SDK to get started!

```bash
$ npm install @hackthevalley/sdk --save
```

Once you have installed the SDK, import it by simply typing:

```js
import htv from '@hackthevalley/sdk';
```

You can find the API reference here: https://hackthevalley.github.io/js_sdk/.

## Contributing

Feel free to contribute to this repository, there isn't really any style guidelines, once you read through the codebase everything should be very self-explanatory.

Note that we use Flow to do static type checking, you can manually run `npm test` to check types. There is also a pre-commit hook where we automatically checks the typing for you.

## Deployment

To deploy a new version of the documentation, run

```
$ npm run deploy-doc
```

To deploy a new version to NPM, run

```
$ npm run deploy:(patch|minor|major)
```