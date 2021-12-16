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

### Step 9

Write a test that verifies that the unique identifier property of the blog posts is named _id_, by default the database names the property _\_id_. Verifying the existence of a property is easily done with Jest's [toBeDefined](https://jestjs.io/docs/en/expect#tobedefined) matcher.

Make the required changes to the code so that it passes the test. The [toJSON](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#backend-connected-to-a-database) method discussed in part 3 is an appropriate place for defining the id parameter.

### Step 10

Write a test that verifies that making an HTTP POST request to the _/api/blogs_ url successfully creates a new blog post. At the very least, verify that the total number of blogs in the system is increased by one. You can also verify that the content of the blog post is saved correctly to the database.

Once the test is finished, refactor the operation to use async/await instead of promises.

### Step 11

Write a test that verifies that if the _likes_ property is missing from the request, it will default to the value 0. Do not test the other properties of the created blogs yet.

Make the required changes to the code so that it passes the test.

### Step 12

Write a test related to creating new blogs via the _/api/blogs_ endpoint, that verifies that if the _title_ and _url_ properties are missing from the request data, the backend responds to the request with the status code _400 Bad Request_.

Make the required changes to the code so that it passes the test.

## Exercises 4.13.-4.14.

### Step 13

Implement functionality for deleting a single blog post resource.

Use the async/await syntax. Follow [RESTful](https://fullstackopen.com/en/part3/node_js_and_express#rest) conventions when defining the HTTP API.

Feel free to implement tests for the functionality if you want to. Otherwise verify that the functionality works with Postman or some other tool.

### Step 14

Implement functionality for updating the information of an individual blog post.

Use async/await.

The application mostly needs to update the amount of _likes_ for a blog post. You can implement this functionality the same way that we implemented updating notes in [part 3](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#other-operations).

Feel free to implement tests for the functionality if you want to. Otherwise verify that the functionality works with Postman or some other tool.

## Exercises 4.15.-4.23.

In the next exercises, basics of user management will be implemented for the Bloglist application. The safest way is to follow the story from part 4 chapter [User administration](https://fullstackopen.com/en/part4/user_administration) to the chapter [Token-based authentication](https://fullstackopen.com/en/part4/token_authentication). You can of course also use your creativity.

### Step 15

Implement a way to create new users by doing a HTTP POST-request to address _api/users_. Users have _username_, _password_ and _name_.

Do not save passwords to the database as clear text, but use the _bcrypt_ library like we did in part 4 chapter [Creating new users](https://fullstackopen.com/en/part4/user_administration#creating-users).

Implement a way to see the details of all users by doing a suitable HTTP request.

### Step 16

Add a feature which adds the following restrictions to creating new users: Both username and password must be given. Both username and password must be at least 3 characters long. The username must be unique.

The operation must respond with a suitable status code and some kind of an error message if invalid user is created.

**NB** Do not test password restrictions with Mongoose validations. It is not a good idea because the password received by the backend and the password hash saved to the database are not the same thing. The password length should be validated in the controller like we did in [part 3](https://fullstackopen.com/en/part3/node_js_and_express) before using Mongoose validation.

Also, implement tests which check that invalid users are not created and invalid add user operation returns a suitable status code and error message.

### Step 17

Expand blogs so that each blog contains information on the creator of the blog.

Modify adding new blogs so that when a new blog is created, _any_ user from the database is designated as its creator (for example the one found first). Implement this according to part 4 chapter [populate](https://fullstackopen.com/en/part4/user_administration#populate). Which user is designated as the creator does not matter just yet. The functionality is finished in exercise 4.19.

Modify listing all blogs so that the creator's user information is displayed with the blog, and listing all users also displays the blogs created by each user.
