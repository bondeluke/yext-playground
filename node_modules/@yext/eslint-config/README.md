# eslint-config

<div>
  <a href="https://npmjs.org/package/@yext/eslint-config">
    <img src="https://img.shields.io/npm/v/@yext/eslint-config" alt="NPM version"/>
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-BSD%203--Clause-blue.svg" alt="License"/>
  </a>
</div>
<br>

Yext's ESLint configurations for Typescript and React repos.

## Configs

This package offers two pre-built configs:

- A default config for typescript specific rules
- "typescript-react" config, which extends our default config with react rules

Example usage:

```js
{
  extends: [
    '@yext/eslint-config/typescript-react',
  ]
}
```
