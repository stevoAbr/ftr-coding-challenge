# ftr-coding-challenge #
FTR Coding Challenge - Fibonacci

## Requirements ##

Node v14.17.4 (best to use NVM to manage node version)   
Yarn  
Typescript

Once you have the correct version of node running, run ```yarn install``` in the root dir to install dependanices.

## Launch ##

Enter the `root` directory, install the NPM packages and start the program using the `yarn` scripts:

```bash
yarn run start
```
This will launch the app in your terminal

## Part 2 ##

1. In order to implement a new UI in this application, for example a web app. The core logic can be retained as the processing of user input is contained within `src/index.ts` in the `getUserInput` and `processInput` functions. A frontend UI would need to be implemented as the application is currently a console app. However the logic contained within the aforementioned functions could be utilised to handle user input, whether that be completely handled in the front end or if a backend was to be implemented this logic could be abstracted into API functionality. 

2. In order to make this application production ready:  
    1. Tests need to be written
    2. More user friendly interface
    3. Repeatable deployment method is required. i.e Docker image
    4. CI/CD pipeline, ideally with image produced at the end of pipeline execution

3. Very enjoyable coding challenge. It was challenging enough without unnecessary complexities. An improvement I would suggest is an extension activity of creating a docker-compose.yml to test knowledge of docker.
    