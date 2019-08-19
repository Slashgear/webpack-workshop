# Why learning to use Webpack?

webpack is nowadays a very widespread tool in the world of web frontend development.
It is either used directly or via toolkit (Vue-CLI, Angular-CLI, CRA, etc...).

Its use may seem complicated at first, but the internal magic is relatively easy to grasp.

> If its use can be hidden by a toolkit, why should we learn it then?

It turns out that webpack, even if embedded in a toolkit, is a tool on which the web developer will have to act in order to be able to integrate his specific configuration.
The developer may also want to play on the performance of his _build_.

Tackling the evolution of a self-generated webpack configuration can be very complicated.
As always, the self-generated code can save a lot of time at first, but will waste a lot later.

To avoid this situation, it is very interesting to learn the concepts and basics of webpack through some examples.

## What is Webpack?

Ok it is interesting to learn how to use webpack. But what is webpack?

webpack is a tool for _packaging_ JS files for the web.
It allows developers to write modular JS code (without requiring it to write everything to a file, or having to manage a file concatenation by hand).

By _packaging_, we do not mean packaging or _package_ in the NPM sense. It is a _prepared_ archive for the web.

webpack provides several major features:

- It solves the dependency tree of the modules it has in input in order to build a complete graph of all dependencies (internal or NPM dependency).
- It concatenates the files in the form of _bundles_ by following the configuration of its _outputs (output)_ while keeping the JS scopes.
- It allows you to load only the JS required for the page.

How many times have you seen this message when using tools like PageSpeed, Dareboost, Speedcurve, LightHouse or others?

![lighthouse results](../assets/lighthouse.png)

The use of webpack is not limited to the JS, to a web target.
You will be able, through the different workshops available here, to learn how to use advanced features.
