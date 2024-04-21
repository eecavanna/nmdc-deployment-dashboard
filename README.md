# nmdc-deployment-dashboard

Deployment Dashboard is an _unofficial_ dashboard showing NMDC service versions and CronJob history.

It is a client-side web application built using TypeScript (language), React Bootstrap (UI framework),
and Vite (build tool).

## Development

### Prerequisites

- [Git](https://git-scm.com/) is installed
- [Node.js v20](https://nodejs.org/en/download) is installed

### Quick start

You can get a development environment up and running by issuing the following commands on your computer:

```
# Download the repository onto your computer:
git clone {repo-url}
cd nmdc-deployment-dashboard

# Install dependencies and run a local development server:
npm install
npm run dev
```

### Lint code

You can [run ESLint manually](https://eslint.org/docs/latest/use/command-line-interface) on the entire codebase by
issuing the following command in the root directory of the repository:

```shell
npm run lint
```

### Format code

You can [run Prettier manually](https://prettier.io/docs/en/cli) on the entire codebase by
issuing the following command(s) in the root directory of the repository:

```shell
# Check format.
npm run format:check

# Apply format.
npm run format:write
```

