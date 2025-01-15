# GitLab Search

## Get Started

Before you start, make sure you have the following installed:

- `node` (v18.16.1). We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage your node versions. Once you have `nvm` installed, run `nvm install v18.16.1` to install node. Then use [avn](https://github.com/wbyoung/avn) to automatically switch to the correct node version when you enter the project directory.
- `yarn`

Install the necessary dependencies via:

```bash
yarn install
```

And then add the following to your `.env` file:

```
GITLAB_URL=https://gitlab.example.com
GITLAB_PRIVATE_TOKEN=your-private-token
```

## Usage

Run the script with your search term:

```bash
node index.mjs "Search Term"
```

If you want to write the results to a file, you can use the following command:

```bash
node index.mjs "Search Term" 2>&1 > result.log
```