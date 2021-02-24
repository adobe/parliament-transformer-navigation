# parliament-transformer-navigation

Allows you to specify your side navigation in json or yaml formats.

## Install

```shell
yarn add @adobe/parliament-transformer-navigation
```

## How to use

```javascript
// In your gatsby-config.js
const gitInfo = GitUrlParse(process.env.GATSBY_SOURCE)
const gitRepoInfo = {
  org: gitInfo.owner,
  name: gitInfo.name,
  branch: process.env.GATSBY_SOURCE_BRANCH,
}
module.exports = {
  plugins: [
    {
      resolve: `@adobe/parliament-transformer-navigation`,
      options: {
        gitRepoInfo: gitRepoInfo
      },
    },
  ],
}
```

## How to query

```graphql
{
  parliamentNavigation {
    homePage
    pages
  }
}
```

## Contributing

Contributions are welcomed! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
