# Slidev Slides Template

It is inspired by [Plura Slides](https://github.com/CondensedMilk7/pluraslides), which is a template for managing multiple [slidev](https://sli.dev) presentation projects in monorepo. 
- Upgrade to [pnpm](https://pnpm.io) and latest verions of packages.
- Test slides syntax and features in examples slides.
- Fix some bugs.

## Usage

Build all the slides with:

```sh
pnpm run build
```

run a single project in watch mode:

```sh
pnpm run slidev --entry slides/hi-slidev/slides.md
pnpm run slidev build --entry slides/hi-slidev/slides.md --base "nemossi/slides/hi-slidev/"
```
