# Project Salus

## About
A project started by Emilie Mickelsen and Josh Ramirez at Brigham Young University - Idaho.

Salus is an open-source project that can be used by mental health professionals to help their patients track progress made with their Recovery Plans (specifically addiction recovery).

## How to Use
For individual use, click **Fork** and follow the wizard to create a personal copy of the project. Cloning and other contributions to ***this*** project will need to go through pull-requests to be pushed to main.

## Branches
Main has 3 branches: frontend, backend, and feature. These will have changes made corresponding to their names.

- **Frontend** has changes to styles, buttons, layout, etc.
- **Backend** has changes to database connections, routing, server connections, etc.
- **Feature** has changes that need to be done directly to main, such as README changes and dependency updates.

## Commits

From the correct branch, a secondary branch should be created with the name of the issue being addressed.

Commit standards should follow this format: type(scope): change summary # issues summary

Types include:
- feat: used when adding new feature
- fix: used when fixing a bug
- refactor: used when reorganizing existing code
- docs: used when making changes related to documentation or comments
- style: used for changes in code formatting, whitespace, punctuation, etc.
- test: used when adding test code or scenarios
- chore: used for changes related to tools, conf files, or project organization

**Example git command:** 

```
git checkout issue#
git add <files>
git commit -m "fix(ui): Added path to button" -m "# button labelled a was routing to b, adjusted route to fix issue [issue link]"
git push 
```

## Contact

For future and current updates, please refer to the [Issues tab](https://github.com/emilie134340/salus/issues).

All other inquiries should be made through the [Discussions tab](https://github.com/emilie134340/salus/discussions). 