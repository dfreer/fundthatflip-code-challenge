# fundthatflip-code-challenge

## 1. Why did you choose to submit this specific example?

I chose to submit this code because it was an example of a specific problem/solution that I was able to tackle recently. They were using a Pinia store to manage their data and to make api calls. This resulted in a lot of api calls and many forms and tables throughout the site sharing unwanted persisted data. After looking through the code I noticed the majority of the components were not sharing data and were really only performing crud operations. I decided to create an api service layer and get rid of the stores unless they were used in multiple components displayed at the same time (config, auth, snackbars and modals). The service was a wrapper around axios and individual services could be setup based on the micro service they were hitting. I also extended the base service class with a crud service to make it easy to perform the majority of i/o the components were needing.

## 2. What are you most proud of about this code?

Most of my frontend projects have have some sort of wrapper around axios to make api calls. That is not unique, but what I liked about this is the way it was geared towards restful crud operations. It had a clean api and simplified things at the component level. They called the service, updated their state, done. No messing with stores or worrying about invalidating state. It was also inline with Laravel's Api Resource Controllers so it is a simple process to spin up a crud page for any resource.

## 3. Which part or file paths should reviewers specifically pay attention to?

I have only published relevant files. The base files in which all others extend are:

- api.js
  - exports methods to help with creating axios instances
- services/BaseService.js
  - used when a service still needs to pass auth will have custom methods/endopints not using rest
- services/CrudService.js
  - used to simplify crud actions and displaying notifications

After that you can see how they are implemented with:

- services/ExampleBaseService.js
- services/ExampleCrudService.js

Finally at the component level with:

- Example.vue

## 4. Would you change anything about this code?

Couple things that are lingering:

1. We ran into some issues when posting data as a plain json object with some endpoints that required multipart/form-data. The solution was to have a method to convert it before sending (convertToFormData in services/BaseService.js). This method still needs some work as it doesn't handle nested objects. We were temporarily leaving it up the components to manage until I come up with something better.
2. Dealing with images (blob) being sent to a PUT endpoint. For some reason Laravel/php doesn't handle this very well. It's not in the source code but I thought about checking to see if the data being sent contains a file, then change the method to use POST instead of PUT. I have looked for a middleware package to handle this but no-one has built it. Links found for reference:
   - https://bugs.php.net/bug.php?id=55815
   - https://github.com/laravel/framework/issues/13457
   - via https://stackoverflow.com/questions/65008650/how-to-use-put-method-in-laravel-api-with-file-upload

## 5. What testing strategy did you use for this code?

Ideally I would have used Jest for testing the components and utils functions. Then Cypress for e2e and automation. The company that this was for was a startup and did not want to invest time in testing.
