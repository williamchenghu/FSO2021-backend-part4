# FullStackOpen2021-backend

Backend exercises (part4) of Full Stack Open 2021.

This repo is used for excercises handing-in.

## Exercises 4.1.-4.2.

In the exercises for this part we will be building a _blog list_ application, that allows users to save information about interesting blogs they have stumbled across on the internet. For each listed blog we will save the author, title, url, and amount of upvotes from users of the application.

### Step 1

Base on the code given [HERE](https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing#exercises-4-1-4-2)

Turn the application into a functioning _npm_ project. In order to keep your development productive, configure the application to be executed with _nodemon_. You can create a new database for your application with MongoDB Atlas, or use the same database from the previous part's exercises.

Verify that it is possible to add blogs to list with Postman or the VS Code REST client and that the application returns the added blogs at the correct endpoint.

### Step 2

Refactor the application into separate modules as shown earlier in this part of the course material.

**NB** refactor your application in baby steps and verify that the application works after every change you make. If you try to take a "shortcut" by refactoring many things at once, then [Murphy's law](https://en.wikipedia.org/wiki/Murphy%27s_law) will kick in and it is almost certain that something will break in your application. The "shortcut" will end up taking more time than moving forward slowly and systematically.

One best practice is to commit your code every time it is in a stable state. This makes it easy to rollback to a situation where the application still works.

## Exercises 4.3.-4.7.

Let's create a collection of helper functions that are meant to assist dealing with the blog list. Create the functions into a file called _utils/list_helper.js_. Write your tests into an appropriately named test file under the _tests_ directory.

### Step 3

First define a dummy function that receives an array of blog posts as a parameter and always returns the value 1.

### Step 4

Define a new totalLikes function that receives a list of blog posts as a parameter. The function returns the total sum of _likes_ in all of the blog posts.

Write appropriate tests for the function. It's recommended to put the tests inside of a _describe_ block, so that the test report output gets grouped nicely:

### Step 5

Define a new _favoriteBlog_ function that receives a list of blogs as a parameter. The function finds out which blog has most likes. If there are many top favorites, it is enough to return one of them.

**NB** when you are comparing objects, the [toEqual](https://jestjs.io/docs/en/expect#toequalvalue) method is probably what you want to use, since the [toBe](https://jestjs.io/docs/expect#tobevalue) tries to verify that the two values are the same value, and not just that they contain the same properties.

Write the tests for this exercise inside of a new _describe_ block. Do the same for the remaining exercises as well.

### Step 6

Define a function called _mostBlogs_ that receives an array of blogs as a parameter. The function returns the author who has the largest amount of blogs. The return value also contains the number of blogs the top author has.

If there are many top bloggers, then it is enough to return any one of them.

Finishing this exercise can be done without the use of additional libraries. However, this exercise is a great opportunity to learn how to use the [Lodash](https://lodash.com/) library.

### Step 7

Define a function called _mostLikes_ that receives an array of blogs as its parameter. The function returns the author, whose blog posts have the largest amount of likes. The return value also contains the total number of likes that the author has received.

If there are many top bloggers, then it is enough to show any one of them.

## Exercises 4.8.-4.12.

### Step 8

Use the supertest package for writing a test that makes an HTTP GET request to the _/api/blogs_ url. Verify that the blog list application returns the correct amount of blog posts in the JSON format.

Once the test is finished, refactor the route handler to use the async/await syntax instead of promises.

Notice that you will have to make similar changes to the code that were made [in the material](https://fullstackopen.com/en/part4/testing_the_backend#test-environment), like defining the test environment so that you can write tests that use their own separate database.

**NB:** When running the tests, you may run into "Mongoose & Jest" environment warning. If this happens, follow the [instructions](https://mongoosejs.com/docs/jest.html) and create a new jest.config.js file at the root of the project.

**NB:** when you are writing your tests it is better to not execute all of your tests, only execute the ones you are working on.
