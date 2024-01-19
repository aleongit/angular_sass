# AngularSass

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.


## Introduction

TODO:
- Test sass in Angular 17



## Requeriments / Prerequisites

🖥️ node -v
→ v20.9.0

🖥️ npm -v
→ 10.2.1

🖥️ ng version
→ Angular: 17.1.0



## Dependencies

- angular 17



## Get Started

- git clone https://github.com/aleongit/angular_sass.git
- cd angular_sass
- npm install
- ng serve
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
- ng serve
- http://localhost:4200/




## Project Steps

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
- - https://www.dongee.com/tutoriales/como-actualizar-angular-a-la-ultima-version/


### Angular with Sass
- https://www.geeksforgeeks.org/how-do-you-create-application-to-use-scss/
- https://www.digitalocean.com/community/tutorials/using-sass-with-the-angular-cli


### Angular-cli and Global SASS Variables
- https://netbasal.com/angular-cli-and-global-sass-variables-a1b92d8ca9b7







## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
