NestJS  modules
        Controllers
        Services and Provider
        controller to Service communication 
        validation using NestJS pipes
        DTO
nest new nestjs-task-management
        (nest command prjname)
        delete app,controller.spec
                app.controller,ts
                app.service.ts
                delete imported files in app.module
yarn start:dev
        script 
        // "start:dev": "nest start --watch",
        ama 
        "start:dev": "nodemon", has benn done
NestJS Modules
        Each application has at least one module- the root module. That is starting point of application
        Modules are singletons, thereofre a module can be imported by multiple other modules.
        a module is defined by annotating a closs with the @Module decorator.
        the decorator provides metadata that Nest uses to organize the application structure
                providers: Array of the providers to be available within the module via dependency injection
                controllers: arrat of controllers to be instantiated within the module
                exports: array of providers to export to other modules
                imports: List of modules required by this module. Any exported provider by these modules will now be available in our module via dependecy injection. 
nest g module tasks
        (nest generate module pathname) it creates tasks folder unders src and task.module.ts file
NestJS controllers
        responsible for handling incoming request and returning responses to the client
        can take advantage of dependency injection to consume providers within the same module.
        are defined by decorating a closs with the @Controller decorator
        the decorator accepts a string which is the path to be handled by the controller
nest g controller tasks --no-spec it generates controller file under tasks folder
NestJS Providers
        can be injected into constructors if decorated as an @Injectable via dependency injection
        can be a plain value, class, sync/async factory etc.
NestJS Services
        The main source of business logic. For Example, a service will be called from a controller to validate data, create an item in the database and return a response.
Dependecy Injection
        any component within the nestJS ecosystem can inject a provider that is decorated with the @Injectable.
        we define the dependencies in the constructor of the class. NestJS will take care of of the injection for us, and it will then be available as a class property.
nest g service tasks --no-spec it creates @Injectable service file under the tasks 
        folder, dont forget to look imported files app,module
        Controller a service i inject etmek icin constructor yolu ile yapariz boylelikle controller service de ki methodu calistirabilir
Service
        tasklari array icerisinde tutacagiz simdilik arrayin adi tasks = [] ve private olacak ki diger inject edilenler bunu degistiremesin 
Controllers to call service method
task.model.ts (not db connected yet)
        we can create model as classs or interface 
we will use yarn add uuid to genrate unique id for each task
DTO-Data Transfer Object
        DTO is NOT a model definition. It defines the shape of data for spesific case, for example creating a task
        DTO can be defined as classes or interfaces
        DTO are NOT mandatory, you can still develop without DTO, it makes easy to maintain and refactor your code







 






        