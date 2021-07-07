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
Pipes 
        pipes operate on the arguments to be processed by the route handler, just before the handler is called
        pipes can perform data transformation or data validation
        can return data either original or modified which will be passed on the route handler
        ParseintPipe, ValidationPipe 
        are classed @Injectable decorator 
        the Transform() method accepts two parameters
                value: value of the processed arguments
                metadata(optional): an object metdadata about the argument 
                handler level pipes @UsePPipes() process allparameters for incoming request.
                parameter level type only specific parameter will be processed
                        @Body("description", somepipe) description
                global pipes are application level will be applied to any incoming request 
                        app.useGlobalPipes(SomePipe)
                packages required are class validator and class transform
                yarn add class-validator class-transformer
                        we did in DTO (create-taskDTO)
                        @UsePipes(ValidationPipe) is smart to get validation via DTO on controller 
TypeORM
        yarn add @nestjs/typeorm typeorm pg
        to initialize DB we use app module to globalize it 
                config yazdiktan sonra app.module de import kisminada yaziyoruz
        entity olusturdak sonra Repository olusturuyoruz entitynin gorunme formati icin ve custom Logic icin such as validation and etc. 
                task.module de import ediyoruz
nest g module auth 
nest g controller auth --no-spec 
nest g service auth --no-spec 
created user.entity.ts 
created user.repository.ts
        dont forget to import auth module 
        auth.service.ts de ise contructor kisminda userRepository i ekliyoruz as @InjectRepository
created DTO for auth paramaters auth-creadentials.dto.ts 
        add as parameter in user.repository.ts cunku input parameter will pass on DTO 
        now we can destructure our dto 
        we go service that return user.repositroy method
                {DTO parameters type, repository destructuring of DTO}
                {service de islem yapip repository de DB de islem yapiyoruz, yani service repository e donuyor}
        we go controller file to specify REST api method 
                we aim to retun service with body values 
                        constructor da auth service as parameter 
                



        


                





 






        