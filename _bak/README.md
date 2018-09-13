# Jekyll Webpack

Use **Jekyll Webpack** as a starting point for a static [Jekyll](https://jekyllrb.com/)
site which uses [Webpack](https://webpack.js.org/concepts/) to compile all assets.

The app uses a standard Jekyll structure with all uncompiled source files in `./src`.
The webpack entry point is set to `./src/index.js`.

## Install docker and prerequisites

See the playbook for setting up a new machine, in particular the dinghy / docker section.

<https://github.com/red-ant/playbooks/blob/master/new_machine/sierra.md>

## Quick start :runner:

```
cd ~/src
git clone git@github.com:red-ant/jekyll-webpack.git
cd ~/jekyll-webpack
dinghy up
docker-compose up
open http://web.jekyllwebpack.docker:8080
```

## Common commands

Rebuild the docker image:

```
docker-compose up --build
```

Install a gem:

```
docker-compose run web gem install <name>
```

Install a node_module:

```
docker-compose run web yarn add --dev <name>
```

Build the site for production:

```
docker-compose run web yarn build
```
