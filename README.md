
# Product Management

> Product Management is an application for managing products and their information

> Products can be easily created, searched, updated and deleted by using this application.

> Products are persisted in Database
## Used technologies

* [Play Framework: 2.7.2](https://www.playframework.com/documentation/2.7.x/Home)
* [Angular: 8.x.x](https://angular.io/)
* [Angular CLI: 8.0.3](https://cli.angular.io/)
* [Scala Slick: 3.x.x](http://scala-slick.org/)
* [Postgresql](https://www.postgresql.org/)
## How to use it?

### Prerequisites

* [Node.js](https://nodejs.org/) (version 10 or higher)
* [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html) (recommend version 1.8 or higher)
* [scala](https://www.scala-lang.org/download/)

### Let's get started,

* clone this repository.

* Set up empty postgresql database (as this app is using postgresql db by default). Then change the db related configurations in application.conf file which you can find in below path

```
    ├── /conf/
    │     ├── application.conf
```

You will also find evolutions file in below path 

```
    ├── /conf/evolutions/default/
    │     ├── 1.sql
          ├── 2.sql            
```

These file are required for the app for persistence purposes 

* When running the app with sbt run, the application can be accessed with two default urls

```
    http://localhost:9000/products   (Backend application which will list down the APIs by default)
    http://localhost:4200/           (Frontend application)
```

Please load the application loaded the first time using  http://localhost:9000/ url as this will ask you to run those evolution scripts. After this the database will be ready with the tables and the application will be ready to use.

After this the application can be accessed with http://localhost:4200/ as well without any issues.

```
    NOTE:- The àpplication may not behave as excepted if evolutions step explained above is not followed properly
```

If you want to access the application with only http://localhost:9000/ then please follow below commands 

```
    sbt stage
    sbt run
```


* Used any of the following [SBT](http://www.scala-sbt.org/) commands which will intern trigger frontend associated npm scripts.

```
    sbt clean           # Clean existing build artifacts

    sbt stage           # Build your application from your project’s source directory

    sbt run             # Run both backend and frontend builds in watch mode

    sbt dist            # Build both backend and frontend sources into a single distribution artifact

    sbt test            # Run both backend and frontend unit tests
```



* This Application is not using [scala play views](https://www.playframework.com/documentation/2.6.x/ScalaTemplates). All the views and frontend associated routes are served via [Angular](https://angular.io/) code base under `ui` directory.

## Complete Directory Layout

```
├── /app/                                 # The backend source (controllers, models, services)
│     └── /controllers/                   # Backend controllers
│           └── FrontendController.scala  # Asset controller wrapper serving frontend assets and artifacts
├── /conf/                                # Configurations files and other non-compiled resources (on classpath)
│     ├── application.conf                # Play application configuratiion file.
│     ├── logback.xml                     # Logging configuration
│     └── routes                          # Routes definition file
├── /logs/                                # Log directory
│     └── application.log                 # Application log file
├── /project/                             # Contains project build configuration and plugins
│     ├── FrontendCommands.scala          # Frontend build command mapping configuration
│     ├── FrontendRunHook.scala           # Forntend build PlayRunHook (trigger frontend serve on sbt run)
│     ├── build.properties                # Marker for sbt project
│     └── plugins.sbt                     # SBT plugins declaration
├── /public/                              # Frontend build artifacts will be copied to this directory
├── /target/                              # Play project build artifact directory
│     ├── /universal/                     # Application packaging
│     └── /web/                           # Compiled web assets
├── /test/                                # Contains unit tests of backend sources
├── /ui/                                  # React frontend source (based on Create React App)
│     ├── /e2e/                           # End to end tests folder
│     ├── /node_modules/                  # 3rd-party frontend libraries and utilities
│     ├── /src/                           # The frontend source code (modules, componensts, models, directives, services etc.) of the application
│     │     ├── karma.conf.js             # Karma configuration file
│     │     └── proxy.conf.json           # UI proxy configuration      
│     ├── .angular.json                   # Angular CLI configuration
│     ├── .editorconfig                   # Define and maintain consistent coding styles between different editors and IDEs
│     ├── .gitignore                      # Contains ui files to be ignored when pushing to git
│     ├── package.json                    # NPM package configuration.
│     ├── README.md                       # Contains all user guide details for the ui
│     ├── tsconfig.json                   # Contains typescript compiler options
│     └── tslint.json                     # Lint rules for the ui
├── .gitignore                            # Contains files to be ignored when pushing to git
├── build.sbt                             # Play application SBT configuration
├── LICENSE                               # License Agreement file
├── README.md                             # Application user guide
└── ui-build.sbt                          # SBT command hooks associated with frontend npm scripts 
```

## Explanation?

### FrontendCommands.scala

* Frontend build command mapping configuration.

```
    ├── /project/
    │     ├── FrontendCommands.scala
```


### FrontendRunHook.scala

* PlayRunHook implementation to trigger ``npm run start`` on ``sbt run``.

```
    ├── /project/
    │     ├── FrontendRunHook.scala
```

### FrontendController.scala

* Asset controller wrapper serving frontend assets and artifacts.

```
    ├── /app/                                 
    │     └── /controllers/                   
    │           └── FrontendController.scala
```

### ui-build.sbt

* This file contains the build task hooks to trigger frontend npm scripts on sbt command execution.

### npm scripts

* New and modified npm scripts of [Angular CLI](https://cli.angular.io/) generated package.json.
* Check [UI README.md](./ui/README.md) to see all available frontend build tasks.

```
├── /ui/
│     ├── package.json
```

### proxy.conf.json

* Used to proxy play backend API when running the project on watch mode.

```
├── /ui/
│     ├── proxy.conf.json
```

## Routes

```
├── /conf/      
│     ├── routes
```

* The following route configuration map index.html to entry route (root). This should be placed as the initial route.

```
GET        /             controllers.FrontendController.index()
```


Example API route:

```
GET       /products      controllers.ProductController.getAllProducts
```

* The following route is being used to serve frontend associated build artifacts (css, js) and static assets (images, etc.). This should be placed as the final route.

```
GET        /*file        controllers.FrontendController.assetOrDefault(file)
```

**Note: _On production build all the front end Angular build artifacts will be copied to the `public/ui` folder._**
