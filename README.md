# React Typescript Vite Template

This is a template based on experiences from assessments and personal projects and [this wonderful project](https://github.com/eruptionjs/core), which gave me a lot of new information on tools we never used before. Thanks [@Diago Fonseca](https://github.com/devMozao)!!!

## Installation

Clone the project and give it a name:

```Bash
git clone git@github.com:SalahAdDin/challenge-query-todo your-project-name
```

Check your current **Node version** to be minimum **18**, if you use [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) working on your environment, the node version should automatically be loaded from `.nvmrc`.

Then, to start the project:

```Bash
cd your-project-name
pnpm install
```

Run the mock server: `pnpm run:server`

Finally, run the project: `pnpm dev`

If you have any **CORS** issue you can solve it by enabling them on the Vite configuration:

```ts
server: {
  open: true,
  host: process.env.VITE_SERVER_HOST,
  port: Number(process.env.VITE_SERVER_PORT),
  cors: {
    origin: [`${process.env.VITE_SERVER_HOST}:${process.env.VITE_SERVER_PORT}`], // "http://localhost:5173"
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
},
```

## Technologies

It is build on:

- [**Typescript**](https://www.typescriptlang.org/), of course, who does not like Typescript?
- [**Vite**](https://vitejs.dev/): it's faster than **Webpack** at development and building time, it comes out of the box prepared for working with many different frameworks but still keeps simplicity and customizability.
- [**MSW**](https://mswjs.io/): it intercepts requests on the network level, guarantying an identical application's behavior with and without mocks, without requiring any change in the application's code for the sake of mocking.
- [**Axios**](https://github.com/axios/axios) as fetching API tool.
- [**TanStack-Query**](https://tanstack.com/query/v4/docs/react/overview): gives us caching of server data out of the box with cache invalidation and request de-duping.
- [**ESLint**](https://eslint.org/) and [**Prettier**](https://prettier.io/) for linting and beautifying code.
- [**Testing Library**](https://testing-library.com/) with **[Vitest](https://vitest.dev/)**: **Vitest** support itself in **Vite**, accelerating the testing a lot, and addressing many of the **Jest** modern problems while keeping also a compatible **API**, so making testing even more enjoyable.
- [**Husky**](https://typicode.github.io/husky/#/) with [**Lint Staged**](https://github.com/okonet/lint-staged) for automatizing code beautifying at committing.
- [**Playwright**](https://playwright.dev/): It is an agnostic tool who support testing for multiple browsers and devices, it has a similar **API** (to **Cypress** and other frameworks) and multilanguage support; it have multiple improvements related theh the modern browser capabilities and addresses some of the most common problems of its counterparts in testing field.
- [**Commitlint**](https://github.com/conventional-changelog/commitlint): It allows you to establish a series of rules for the construction of the messages of the commits.
- [**Semantic Release**](https://github.com/semantic-release): Fully automated version management and package publishing.
- [**React Headless Pagination**](https://github.com/fullhdpixel/react-headless-pagination): the pagination is the most complex component to handle in the project, to avoid wasting much time on it, we opted for using a headless ready component to it, so we can customize its design by using **CSS**.

## Folder Structure

Following the architectural approach, we decided to structure this project as follows:

- **mocks:** It contains all sources relates to **MSW**, i. e., the mocking service.
- **src**: It is the application sources' folder itself.
- **tests**: It includes **E2E**, **integration** and other non unit tests.

### Application's Architecture

It tries to follow the Clean Architecture(getting some of inspiration from [Alan Buscaglia](https://www.linkedin.com/in/alanbuscaglia/)'s Clean Architecture series on [Gentleman Programming](https://www.youtube.com/c/GentlemanProgramming): [Clean Architecture](https://www.youtube.com/watch?v=vRGVnqylO68), [React Part 1](https://www.youtube.com/watch?v=5LqhlCd2_nE), [React Part 2](https://www.youtube.com/watch?v=XEcZaKK38fg)):

- **application:** Contains all related business logic.
- **domain:** Contains all models(a.k.a types/dto for Typescript).
- **infrastructure:** Contains all services required to interact with foreign services.
- **presentation:** Contains all screens and components intended to render our data.

It is an intended architecture, it can be used either globally or per application's feature.

## Git Flow

This project have commits configured to follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)'s best practice(with some changes to make it fully compatible with [semantic-release](https://github.com/semantic-release)) and it's configured with ESLint, Prettier and Stylelint.

### Commit Convention

> ~~Note: Development based on [Planable/commitlint-config](https://github.com/Planable/commitlint-config) and its [blog](https://strdr4605.com/commitlint-custom-commit-message-with-emojis).~~

The commint convention tries to add a ticker number before the commit `type`, always optional, extentending the [conventional commit base proposition](https://www.conventionalcommits.org/en/v1.0.0/).

Hence, the intended pattern[ is as follows](https://regex101.com/r/YyeQ0X/1):

```
[PAP-2013] feat(lang): :arrow_up: add Polish language.
```

Where the ticket number is embedded in square brackets and is optional. It accept [gitmojies](https://gitmoji.dev/) now on the `subject`. You can find the [gitmoji standard guide](https://gitmoji.dev/) and the [emoji full api](https://emojiapi.dev/) too to get inpired if you are using emojis.

Then, [**Husky**](https://typicode.github.io/husky/#/) will start the `pre-commit` hook and run [**Lint Staged**](https://github.com/okonet/lint-staged) , who will run `prettier` and `lint` to validate code format and code lint. If you fail to follow any one of these validations above, the commit will be aborted.

You can also commit your files with the help of the CLI. To do so just run `pnpm commit` From there, the CLI will assist you on the process. As said before: if your files fail the validation, you must fix it before proceeds.

As a best practice, it is strongly suggested that you avoid skip validations. If you need to change the way your commit messages are written, just go to file `commitlint.config.ts` and you will find there the configs needed.

### Semantic Release

In order to automatize the releasing workflow(including analysing commits, writing release notes on a CHANGELOG file, etc.), we add [semantic-release](https://github.com/semantic-release) and configuration and support for Github Actions(following [this](https://medium.com/miq-tech-and-analytics/automating-releases-via-semantic-release-4781eb0106e8), [this](https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/ci-configurations/github-actions.md) and [this](https://pnpm.io/es/continuous-integration#github-actions)).

We recommend to follow the git flow, pushing to master only fully finished feature, cause the release workflow will be triggered after pushing to main/master; the triggered job will analyze all the commits, generate the `CHANGELOG` file listing all the commits grouped per type, write release notes altogether with the commit message (triggering the `husky` `pre-commit` hook) and finally, will create a respective release tag.

You can "preview" the release workflow and output running `GH_TOKEN=your_token pnpm release`, [it requires to pass](https://github.com/semantic-release/github#github-authentication) your[github personal token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) to simulate all the process.

You can change the release behavior in the `.releaserc` and the action behavior in the `release.yaml` workflow file.

### ~~Emoji(Type) Description~~

~~Inspired by [parmentf/GitCommitEmoji](https://gist.github.com/parmentf/035de27d6ed1dce0b36a), we follow [this emoji schema](https://gitmoji.dev/).~~

## Testing

We strongly recommend to use [Grekhin Syntax](https://cucumber.io/docs/gherkin/)(or [this](https://docs.behat.org/en/v2.5/guides/1.gherkin.html)) and Scenarios to write the tests, like it is possible in [Jest](https://jestjs.io/) with this [plugin](https://github.com/bencompton/jest-cucumber), but in the way of writing test, making it clear (optionally) by writing commits.
You can preview your test by running `pnpm test:preview` and [writing](https://www.vitest-preview.com/guide/getting-started#step-3-usage) `debug()` where you want to debug your code.

## Available Scripts

### `pnpm dev`

Runs the app in development mode.
Open `https://localhost:5173` to view it in the browser.

The page will automatically reload if you make changes to the code.
You will see the build errors and lint warnings in the console.

### `pnpm build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed.

### `pnpm preview`

Locally preview production build.

### `pnpm commit`

Run the [Commit LInt CLI](https://github.com/conventional-changelog/commitlint#cli) to build your commit messages in a guided tour.

### `pnpm test:ui`

Run all `vitests` in [UI mode](https://vitest.dev/guide/ui.html).

### `pnpm test:coverage`

Run all `vitests` in [UI mode](https://vitest.dev/guide/ui.html) with **coverage**.

### `pnpm test:preview`

Run [vitest-preview](https://www.vitest-preview.com/guide/getting-started) for visual testing experience.

### `pnpm test:e2e:install`

Install all dependencies required by Playwright before to run the **e
e** tests.

### `pnpm test:e2e`

Run all **e2e** tests.

### `pnpm format:lint`

Format all your code by running `prettier` and `lint`.

### `GH_TOKEN=your_token pnpm release`

Simulates the release process: it connects to Github(or Gitlab, based on your configuration), analyses all the commits, generale release notes, creates the tag and show you all the process. But it won't release anything on the repot.

[It requires to pass](https://github.com/semantic-release/github#github-authentication) your[github personal token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) to simulate all the process.
