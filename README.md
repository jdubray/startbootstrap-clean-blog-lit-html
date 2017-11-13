# [xgen.io](http://xgen.io) - A SAM Implementation of the [Clean Blog](http://startbootstrap.com/template-overviews/clean-blog/) with the lit-html library

[Clean Blog](http://startbootstrap.com/template-overviews/clean-blog/) is a responsive blog theme for [Bootstrap](http://getbootstrap.com/) created by [Start Bootstrap](http://startbootstrap.com/). This theme features a blog homepage, about page, contact page, and an example post page along with a working node.js contact form.

## Getting Started

To begin using this template, choose one of the following options to get started:
* Clone the repo: `git clone https://github.com/jdubray/startbootstrap-clean-blog-lit-html.git`
* Fork the repo

The original code can be found [on Start Bootstrap](http://startbootstrap.com/template-overviews/clean-blog/)


## Bugs and Issues

Have a bug or an issue with this template? [Open a new issue]https://github.com/jdubray/startbootstrap-clean-blog-lit-html/issues).

## Creator

Start Bootstrap was created by and is maintained by **[David Miller](http://davidmiller.io/)**, Owner of [Blackrock Digital](http://blackrockdigital.io/).

* https://twitter.com/davidmillerskt
* https://github.com/davidtmiller

Start Bootstrap is based on the [Bootstrap](http://getbootstrap.com/) framework created by [Mark Otto](https://twitter.com/mdo) and [Jacob Thorton](https://twitter.com/fat).

This version of the project was created by and is maintained by **[Jean-Jacques Dubray](http://xgen.io)**, Founder of [xgen.io](http://xgen.io)

* https://twitter.com/metapgmr
* https://github.com/jdubray

## SAM Pattern

This sample was modified to illustrate how one may consider implementing the [SAM pattern](http://sam.js.org). This project uses a new and exciting library from PolymerLabs: [lit-html](https://github.com/PolymerLabs/lit-html) which makes Functional HTML viable. 

The back-end is a node.js application, located in the `./app/` directory. The blog metadata can be specified in the `./app/data.js` file.

The SAM pattern is implemented as a single page application. The structure of the pattern is implemented in the `./sam/` directory:
- actions.js
- model.js
- state.js
- view.js
 
This project is a boilerplate implementation and can be reused across projects. The pattern is initialized in index.html
```
// wire the elements of the pattern as a reactive look action->model->state->view
state.init(view,theme, display, components) ;
model.init(state, components, options) ;
actions.init(model.present, options) ;
components.actions.forEach(function(action) {
    actions[action.name] = function(data, present) {
        return action.implementation(data, present, model) ;
    }
}) ;

view.init(model,theme(options))

// wire SAM actions to the global variable a 
a = actions ;

// render initial state
state.representation(model) ;
``` 

The display function is in charge of rendering the State representation into the Single Page structure (header, page, footer).
```
var display = function(representation) {
    preparePage(model) ;
    if (representation.header) { document.getElementById('header-representation').innerHTML = representation.header ; }
    if (representation.page) { document.getElementById('page-representation').innerHTML = representation.page ; }
    if (representation.footer) { document.getElementById('footer-representation').innerHTML = representation.footer ; }
    initElements() ;
    checkBackButton(model) ;
}
```

A simple page transformation lifecycle is implemented:
- preparePage (for rendering)
- render state representation
- initEments of the page (e.g. datePicker)
- checkBackButton

The sample is written in ES6 and transpiled at load time with [Google Traceur](https://github.com/google/traceur-compiler).

To install and run the back-end (assuming you have already installed node.js):

```
$  cd app/
$  npm install
$  node server-model.js
```

Open a browser at: [http://localhost:5625/html/](http://localhost:5625/html/)

The implemenation is designed to work with an atom 2.0 feed and currently configured to fetch the GitHub feed (`./config/default.json`)

## Copyright and License

Copyright 2013-2016 Blackrock Digital LLC. Code released under the [MIT](https://github.com/BlackrockDigital/startbootstrap-clean-blog/blob/gh-pages/LICENSE) license.
Copyright 2016 Jean-Jacques Dubray Code released under the [MIT](https://github.com/jdubray/startbootstrap-clean-blog-lit-html/blob/master/LICENSE) license.