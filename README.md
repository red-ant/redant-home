# Red Ant Website

The [Red Ant Website](https://ra1.ghost.io/) based on [Ghost](https://ghost.org/).

This repo contains the Red Ant site theme and routes.yaml file.

## Local installation

Install Ghost CLI globally

```
npm install -g ghost-cli@latest
```

Run local ghost installation

```
cd ~/src
mkdir ghost-blog
cd ghost-blog
ghost install local
```

Clone and set up this repo

```
cd ~/src
git clone git@github.com:red-ant/redant-home.git
cd redant-home
yarn install
```

Create zip of theme (builds to /dist/red-ant.zip)

```
yarn zip
```

Open and run ghost

```
cd ~/src/ghost-blog
ghost start --development
open http://localhost:2369/ghost/#/settings/design
```

Click "Upload a theme" and upload the theme zip (red-ant.zip) so that it gets added to the db.

Open themes and create a symlink to repo

```
cd ~/src/ghost-blog/content/themes
rm -rf red-ant
ln -s ~/src/redant-home ~/src/ghost-blog/content/themes/red-ant
```

## Running locally

Run Ghost and gulp

```
cd ~/src/ghost-blog
ghost start --development
cd ~/src/redant-home
yarn start
```

When you're done, stop Ghost

```
cd ~/src/ghost-blog
ghost stop
```

## Updating theme changes on production

Create zip of theme (builds to /dist/red-ant.zip)

```
cd ~/src/redant-home
yarn zip
```

Open [Ghost Admin > Design](https://ra1.ghost.io/ghost/#/settings/design) and replace old theme.

## Updating routes.yaml

To enact changes to routes.yaml, go to your [Ghost Admin > Labs](https://ra1.ghost.io/ghost/#/settings/labs) and "Upload routes YAML".
