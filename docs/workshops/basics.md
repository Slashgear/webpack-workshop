# Basics

> To start this exercise, be sure to be in `./packages/novice/basic` folder.
> Be sure you have [installed this repository first](./README.md#install)

## Introduction

This first example is here to help you why Webpack exist and his basic usage.

Here is define two CommonJS module (commonly used [in a NodeJS env](https://nodejs.org/docs/latest/api/modules.html)).
They are both loaded in the html file.

If you're not familiar enough with the browser env, it won't be able to load CommonJS bundle.
A browser can't handles NodeJS-like dependencies.

Here is the dependency graph of those modules:

```
title.js
      <- color.js
             <- node_modules/lodash
```

## Old way

If we were few years ago, we would have load all those files in the browser without the `require` syntax and by keeping the dependency order.
For `lodash` library we would have used a cdn to load it.

This way works perfectly... But for a long time project, it would generate a lot of `<script/>` loading.
Keeping the order would have been humanly difficult.

## Webpack solution

Webpack is a tool to generate a bundle base on module dependencies graph resolution.
It's a NodeJS package made for Web developer to do the packaging.

### Step 1: Setup simple configuration

### Step 2: Change index.html script target

### Step 3: Script the build with webpack-cli
