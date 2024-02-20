# AngularSass

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.


## Introduction

Checkpoints:
- Angular 17: Getting started with standalone components
- SASS in Angular 17
- ngx-markdown
- HTTP communication with JSON server [json and static files md in 'public']
- Pagination
- Light/Dark mode [prefers-color-scheme]
- prismjs [meta.load-css to load template depending on light/dark mode]
- Query params



## Requeriments / Prerequisites

🖥️ node -v
→ v20.9.0

🖥️ npm -v
→ 10.2.1

🖥️ ng version
→ Angular: 17.1.0



## Dependencies

- angular 17
- npm install ngx-markdown marked --save
- npm install prismjs --save
- npm install -g json-server



## Get Started

- git clone https://github.com/aleongit/angular_sass.git
- cd angular_sass
- npm install
- `json-server --watch db/db.json`
- `ng serve`
- http://localhost:4200/



## Dev environment

- angular 17
- node v20.9.0
- npm 10.2.1
- Visual Studio Code 1.85.1
- git version 2.38.0.windows.1
- Microsoft Windows [Versión 10.0.19045.3803]



## Run

- cd angular_sass
- json-server --watch db/db.json
- ng serve
- http://localhost:4200/




## Project Steps - Angular with Sass

- create new angular app with scss styles
```
ng new angular_sass --style=scss
? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? No
```

- create files structure, for example:
```
|- src/
    |- sass/
        |- _variables.scss
        |- _mixins.scss
        |- _main.scss
    |- styles.scss
```

- configure sass path in `angular.json` [project-name > architect > build > options]
```
"styles": ["src/styles.scss"],
"stylePreprocessorOptions": {
    "includePaths": ["src", "src/sass"]
},
```

- import sass files into the main `/src/styles.scss`
```
@import "main";
@import "variables";
@import "mixins";
```

- import sass files into Angular Components
```
// src/app/app.component.scss

@import 'variables';

// now we can use those variables!
```



## Project Steps - Angular using markdown files

- install ngx-markdown `npm install ngx-markdown marked --save`
- install Prism.js library for Syntax highlight `npm install prismjs --save`
- include Prism.js theme and components that you need in `angular.json`
```
"styles": [
  "styles.css",
+ "node_modules/prismjs/themes/prism.css"
],
"scripts": [
+ "node_modules/prismjs/prism.js",
+ "node_modules/prismjs/components/prism-scss.min.js",
+ "node_modules/prismjs/components/prism-css.min.js"
]
```

- you can download theme and component file that you need
- https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+sass+scss


- you can move the 'prismjs css theme' in your styles folder and import it
- **angular.json**
```
"styles": ["src/styles.scss"],
```
- **styles.scss**
```
@import "./prismjs/prism.css";
...
```
- for dark mode, you can import an other theme with `@use "sass:meta";` and `@include meta.load-css()`
```
html[data-theme="auto"] {
  @include meta.load-css("./prismjs/prism.css");
}
html[data-theme="dark"] {
  @include meta.load-css("./prismjs/prism-tomorrow.css");
}
```



- content 'md'
```
- all posts in object or json file 
- assets > blog > [category] > *.md: blog posts
```

- routes
```
- A route /blog display a list of all posts
- A route /blog/[category] display a list of category posts
- A route /blog/[category]/name-of-the-post (=name)
```

- add HTTP communication with JSON server
```
npm install -g json-server
```
- create file json with data */db/db.json*
```json
{
  "posts": [
    {
    "id": "1",
    "name": "variables",
    "title": "Variables",
    "description": "Sass uses the $ symbol to make something a variable",
    "category": "learn"
    },
    ...
  ]
}
 
```
- run json server
```
json-server --watch db/db.json
```
- open your browser
```
http://localhost:3000/       // server
http://localhost:3000/posts  // endpoint 'posts'
```

- ***.md static files**
- json-server can serve static files in 'public' folder
- moved content in **\public\blog** 
- example: `\public\blog\learn\mixins.md` = `http://localhost:3000/blog/learn/mixins.md`
- **! but error CORS in angular**
- to fix it
- create a file `proxy.conf.json` in your project's `src/` folder.
```
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    },
    "logLevel": "debug"
  }
}
```
- in the CLI configuration file, `angular.json`, add the `proxyConfig` option to the `serve` target:
```
…
  "architect": {
    "serve": {
      "builder": "@angular-devkit/build-angular:dev-server",
      "options": {
        "proxyConfig": "src/proxy.conf.json"
      },
…
```
- use **/api/** url in components:
```
    this.post = `/api/blog/${cat}/${name}.md`;
```



## Update Angular version
- Node and npm installed and updated
- clean old modules in npm `npm uninstall *`
- update angular CLI `npm install -g @angular/cli`
- or `npm install -g @angular/cli@latest`
- update Angular `ng update`
- check Angular version `ng version`



## Doc

### Update Angular version
- https://angular.io/guide/updating
- https://update.angular.io/
- https://www.geeksforgeeks.org/how-to-update-angular-projects-to-the-latest-version/
- https://www.dongee.com/tutoriales/como-actualizar-angular-a-la-ultima-version/



### Angular - Getting started with standalone components
- https://angular.io/guide/standalone-components



### Angular 17
- https://medium.com/@brocco/angular-17-what-does-that-mean-for-you-49fcacec3bb2



### Angular with Sass
- https://www.geeksforgeeks.org/how-do-you-create-application-to-use-scss/
- https://www.digitalocean.com/community/tutorials/using-sass-with-the-angular-cli


### Angular-cli and Global SASS Variables
- https://netbasal.com/angular-cli-and-global-sass-variables-a1b92d8ca9b7



### Sass
- https://sass-lang.com/
- https://sass-lang.com/guide/



### Sass guides
- https://www.freecodecamp.org/news/the-beginners-guide-to-sass/
- https://www.eniun.com/tutorial-sass/



### Blog with Angular
- https://dev.to/analogjs/how-to-build-a-blog-with-analog-and-angular-4pk2
- https://daviddalbusco.medium.com/add-a-blog-to-your-angular-website-using-markdown-files-31cdb0627bdd
- https://www.makeuseof.com/angular-markdown-files-website/


### ngx-markdown
- https://github.com/jfcere/ngx-markdown
- https://jfcere.github.io/ngx-markdown/get-started#usage



### marked.js [options]
- https://marked.js.org/using_advanced#options



### json-server
- https://github.com/typicode/json-server
- https://angular.io/tutorial/first-app/first-app-lesson-14


### Promises vs Observables [RxJS]
- https://stackoverflow.com/questions/37364973/what-is-the-difference-between-promises-and-observables
- https://angular.io/guide/comparing-observables
- https://rxjs.dev/deprecations/subscribe-arguments


### of [RxJS]
- https://rxjs.dev/api/index/function/of
- https://www.learnrxjs.io/learn-rxjs/operators/creation/of


### Pipe
- https://www.freecodecamp.org/news/pipe-and-compose-in-javascript-5b04004ac937/


### Pagination in Angular
- https://medium.com/@hassaanali.dev/efficient-data-pagination-in-angular-implementing-smooth-and-performant-pagination-for-large-data-637fe994bbbf
- https://javascript.plainenglish.io/handling-pagination-in-a-single-observable-stream-in-angular-b6d58e9c97d1
- https://keepcoding.io/blog-frr/paginacion-en-angular-dos-componentes-un-servicio/


### Input/ Output [Angular]
- https://angular.io/guide/inputs-outputs
- https://medium.com/williambastidasblog/angular-decoradores-input-y-output-70af5f43a04


### Angular Property has no initializer and is not definitely assigned in the constructor
- https://monsterlessons-academy.com/posts/angular-property-has-no-initializer-and-is-not-definitely-assigned-in-the-constructor


### How To Use Query Parameters with Angular Router
- https://www.digitalocean.com/community/tutorials/angular-query-parameters


### Angular Router: Navigation Using RouterLink, Navigate, or NavigateByUrl
- https://www.digitalocean.com/community/tutorials/angular-navigation-routerlink-navigate-navigatebyurl


### IsActiveMatchOptions - Angular
- https://angular.io/api/router/IsActiveMatchOptions
- https://lmfinney.wordpress.com/2021/10/08/how-to-mark-a-link-as-active-in-angular-even-if-the-query-params-are-different/


### Router #navigate - Angular
- https://angular.io/api/router/Router#navigate


### How to Create a Dark Mode in Sass
- https://dev.to/wgnrd/adding-a-dark-mode-to-your-website-using-scss-4pdc
- https://berbaquero.com/posts/2023/03/sass-dark-mode/


### Angular Theming: How to Create a Dynamic Theme Switcher for Light & Dark Mode
- https://codebeyondlimits.com/articles/angular-theming-how-to-create-a-dynamic-theme-switcher-for-light-and-dark-mode


### Class and style binding - Angular
- https://angular.io/guide/class-binding#single-and-multiple-style-binding-example


### Scope your CSS imports with meta.load-css in Sass
- https://tinytip.co/tips/scss-load-css/
- https://stackoverflow.com/questions/59257368/how-to-dynamically-change-the-theme-using-highlight-js


### Use vs Import in Sass: Which One Should You Choose?
- https://kentwynn.com/frontend-languages/use-vs-import-in-sass-which-one-should-you-choose/kentwynn/27/03/2023/


### Material Icons Guide
- https://developers.google.com/fonts/docs/material_icons
- https://fonts.google.com/icons


### The Markdown Guide
- https://www.markdownguide.org/


### Serving static files - json-server
- https://www.npmjs.com/package/json-server#serving-static-files


### Proxying to a backend server - Angular
- https://angular.io/guide/build#proxying-to-a-backend-server


### Angular CORS Guide 🛠️ Fixing errors
- https://dev-academy.com/angular-cors/