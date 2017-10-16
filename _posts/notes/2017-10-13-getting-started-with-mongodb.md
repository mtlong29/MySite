---
layout: article

permalink: /notes/getting-started-with-monogodb/

title: "Getting Started with MongoDB"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Notes on how MongoDB works. Comparing it to other databases. Why should you use MonogoDB and who is currently using it. There are also notes on how to get it installed and working on your computer. There is a working example as well. There's notes on working with collections and organizing records into 'categories' in Mongo. Finally, notes on how MongoDB is used to update data records."

categories: notes

modified: 2017-10-13
---

{% include /globalSections/toc.html %}

MongoDB is a databse used to store information for applications. There is a big difference between MonogoDB and other databases. It falls into a category of databases called NoSQL.

## MongoDB is NoSQL

NoSQL is not anti-SQL or opposed to SQL databases. NoSQL is an acronym that atands for Not Only SQL. Whereas, SQL databases store information in tables. And have a schema different NoSQL databases store data in a multitude of formats and are generally less bound to schema controls.

Another big difference is that SQL databases have a standard mostly unified language that they are named for.

It is called Structured Query Language.

### Why Use MongoDB

There are a bunch of reasons you should use MongoDB:

<ul>
  <li>MongoDB does not have a schema, it makes development really fast</li>
  <li>Changing and evolving prjects is easy without a schema to migrate</li>
  <li>Mongo's query language is really easy to use (it looks a lot more like a functional programming language)</li>
  <li>It is popular among developers. Companies large and small are adopting MongoDB</li>
  <li>Monogo is being adopted not because it's old and is simply the standad but because it's awesome..</li>
</ul>

See more on why to use MonogoDB on their website <a href="https://www.mongodb.com/who-uses-mongodb">here</a>.

#### Quiz

Question: MongoDB is a SQL based database.

Answer: False

Question: Mongo has been widely adopted, however it is generally used for non business critical use cases.

Answer: False

Question: MongoDB is a relational database.

Answer: False

Question: NoSQL means ____.

Answer: Not Only SQL

Question: Mongo is great to use because ____.

Answer: it has a powerful and simple query language

## Documents in Mongo

From a developer's perspective, documents are core to how you interact with and model date in Mongo.

Documents are uniqe records. They are a lot like JSON objects. Every document has a required ID field which makes them easily identifable. Mongo takes care of the ID field. This is called ObjectId. Learn more on the <a href="https://docs.mongodb.com/manual/reference/method/ObjectId/">mongodb documentation</a>.

#### Quiz

Question: The `_id` field is always required.

Answer: True

Question: Mongo documents can store objects as field values.

Answer: True

Question: There is generally only one right way to model data in Mongo.

Answer: False

Question: Which of the following is NOT a mongo field type:

Answer: Map

Question: Mongo only accepts the ISODate format.

Answer: False

## Setting Up MongoDB

The easiest way to install MongoDB on your mac is using homebrew. First make sure homebrew is up to date by typing `brew update`. Afterward install MongoDB by typing `brew install mongodb`. To make sure it is installed type `which mongod`. There is no `b`.

You will then create the mongo directory. Type `mkdir -p /data/db`. The `-p` flag means to create the entire path if it doesnt exist. You may need to make sure the file is readable, writable, and executable by everyone by typing `chmod 777 /data/db`. For both of these you may need to be the super user or `sudo`.

To get MongoDB up and running run the command `mongod`. Note you can only do this because it was installed using homebrew. If you downloaded it you would navigate to the executables in the terminal.

Once you have MongoDB up and running you need to open another terminal window to access Mongo via the shell. Since it was installed using homebrew you can type `mongo` in the new terminal window to access the MongoDB shell. Which is just an access point to the database where you can control it.

### Shell Basics

`show dbs` will show the databases that we currently have.

`use mongoBasics` will switch to the mongoBasics database. 

`db.post.insert({title: "horray!"})` will insert the object with a title key and a string "horray!".

Now when you type `show dbs` it will list mongoBasics as a database.

`show collections` will show all the collections in the databases.

`db.post.find()` will show the one document that we have created. `{ "_id" : ObjectId("59e15b6aab9139f65d11a5ab"), "title" : "horray!" }` for example.

#### Quiz

Question: When installing Mongo manually (by downloading it from the web), commands to run Mongo Dawmon and the Mongo Shell ____.

Answer: must be run relative to the directory - for example, `bin/mongod`, `bin/mongo`.

Question: In the command, `db.posts.insert({...})` "posts" stands for a ____.

Answer: collection

Question: The default location for mongo to store data is ____.

Answer: `/data/db`

Question: `show dbs` is the command for listing databases in a Mongo installation.

Answer: True

Question: Homebrew is ____.

Answer: a package manager for OSX.

## Data in Mongo, By Example

<a href="https://www.mongodb.com/nosql-explained">NoSQL</a> encompasses a wide variety of ifferent databast technologies that were developed in response to the demands presented in building modern applications.

Learn more on difference between SQL and MongoDB <a href="https://docs.mongodb.com/manual/reference/sql-comparison/">here</a>.

#### Quiz

Question: Collections are like ____ in a relational database.

Answer: tables

Question: In Mongo, when a field is missing a given value in a document it is necessary to give the field a substitute value, e.g. `null`.

Answer: False

Question: In Mongo, documents are ____.

Answer: individual records

Question: A document is like a ____ in a relational database.

Answer: row

Question: Documents can store references to other documents.

Answer: True

### Loading Files

To load a file you want to have the file installed on your computer and ideally close to Mongo. This is because you will be using realtive paths.

First, make sure mongo daemon is running:

{% highlight bash linenos %}
> mongod
{% endhighlight %}

Next, open a new tab or terminal window and run mongo:

{% highlight bash linenos %}
> mongo
{% endhighlight %}

To see all files in the directory you can list directory:

{% highlight bash linenos %}
> ls()
{% endhighlight %}

To load the file such as `seed.js` use local paths (this will most defeinitely apply to you if you installed mongo manually instead of using homebrew):

{% highlight bash linenos %}
> load('./seed.js')
{% endhighlight %}

### Example File (seed.js)

{% highlight javascript linenos %}
// this is the same as running `use mongoBasics` from the shell
var db = db.getSiblingDB('mongoBasics');

// delete any data that was there already
db.dropDatabase();

// create fake names for our users
var firstNames = ['Sam', 'Bill', 'Roger', 'Sara', 'Natasha', 'Nivine'];
var lastNames = ['Lund', 'Noor', 'Riola', 'Henderson', 'Frank'];
var usersRaw = [];

// Give all users a first name, and a signup date give 5 out of 6 users a last name
for (var i = 0; i < firstNames.length; i++) {
    var user = {
        name: {
            first: firstNames[i],
            last: lastNames[i]
        },
        signupDate: new Date()
    };
    usersRaw.push(user);
}

// insert the users into the database in the `users` collection
db.users.insert(usersRaw);

// find all users and assign them to the variable 'authors'
var authors = db.users.find().toArray();

var titles = ['My Awesome Recipe!', 'I love the holidays', 'How to workout', 'Parenting 101'];
var description = "Pinterest asymmetrical raw denim, neutra sriracha lumbersexual tousled. Heirloom chia banjo brunch deep v echo park. Humblebrag tousled semiotics, tattooed hella pickled biodiesel fanny pack kickstarter tacos crucifix brooklyn. Cold-pressed drinking vinegar chillwave mlkshk. Cardigan you probably haven't heard of them mlkshk, small batch four dollar toast yuccie stumptown actually wolf literally fingerstache celiac pork belly retro. Vinyl street art fashion axe, retro lumbersexual cardigan ramps austin pug single-origin coffee. Cardigan humblebrag four loko, blog put a bird on it messenger bag disrupt kogi irony."
var body = "Knausgaard photo booth paleo, tacos vice flexitarian bespoke celiac blue bottle williamsburg tofu four dollar toast. Pug actually cred, iPhone sustainable pitchfork DIY salvia distillery asymmetrical gentrify humblebrag. Mlkshk drinking vinegar meh selvage. Street art marfa before they sold out, flannel bicycle rights crucifix photo booth intelligentsia iPhone mustache. Semiotics thundercats health goth 8-bit, mlkshk ethical banh mi. Taxidermy pop-up dreamcatcher portland, narwhal tote bag helvetica. Four dollar toast shoreditch chillwave, craft beer tilde street art food truck yr cardigan polaroid.\
\
DIY flexitarian craft beer, everyday carry pug artisan food truck before they sold out polaroid heirloom butcher. Blue bottle taxidermy photo booth, small batch street art pop-up irony YOLO actually. Chartreuse PBR&B fixie, sriracha church-key master cleanse dreamcatcher pork belly williamsburg selvage raw denim bespoke heirloom four dollar toast. Heirloom etsy health goth humblebrag chambray, church-key cray four dollar toast lumbersexual freegan taxidermy fixie thundercats. Gluten-free brunch shabby chic, heirloom listicle kale chips church-key skateboard banjo lumbersexual occupy vegan mlkshk narwhal biodiesel. Drinking vinegar narwhal food truck chambray pork belly tousled. Mlkshk beard tote bag try-hard neutra wolf.\
\
Blog poutine authentic chillwave, chicharrones scenester art party pickled ennui celiac retro squid. Readymade beard gluten-free meditation thundercats echo park. Letterpress try-hard pork belly, ethical iPhone 90's post-ironic fingerstache. Mixtape intelligentsia austin disrupt aesthetic. Meggings polaroid swag pickled photo booth, flexitarian migas. Irony tilde celiac lumbersexual messenger bag. Helvetica keytar banjo truffaut, bushwick 3 wolf moon 8-bit pour-over meggings pork belly brunch +1 health goth.\
\
Blog ethical normcore roof party. Typewriter chambray post-ironic fashion axe try-hard everyday carry. Post-ironic shabby chic pork belly narwhal jean shorts hella. Vice ramps put a bird on it neutra try-hard ennui. Godard kitsch kale chips williamsburg, synth franzen raw denim bitters ugh. Williamsburg pickled art party knausgaard pabst, kale chips 8-bit brunch cliche. XOXO craft beer locavore, messenger bag blog crucifix next level mustache VHS selfies schlitz poutine gluten-free pickled PBR&B."

var postsRaw = [];

// Create posts from our fake titles give each post an author which is the `_id` of a random user from the authors array

for(var i = 0; i < titles.length; i++) {
    var post = {
        title: titles[i],
        description: description,
        body: body,
        author: authors[Math.floor(Math.random() * authors.length)]._id
    }
    postsRaw.push(post);
}

// insert posts into posts collection
db.posts.insert(postsRaw);
{% endhighlight %}

The above JavaScript file creates 6 users and 4 blog posts. This can be seen by using the `count()` method.

{% highlight bash linenos %}
> db.users.count()
6
> db.posts.count()
4
{% endhighlight %}

You can see all of the users by using the `find()` method without any parameters.

{% highlight bash linenos %}
> db.users.find()
{ "_id" : ObjectId("59e3b5aaf81f4072f17b49f4"), "name" : { "first" : "Sam", "last" : "Lund" }, "signupDate" : ISODate("2017-10-15T19:23:22.156Z") }
{ "_id" : ObjectId("59e3b5aaf81f4072f17b49f5"), "name" : { "first" : "Bill", "last" : "Noor" }, "signupDate" : ISODate("2017-10-15T19:23:22.158Z") }
{ "_id" : ObjectId("59e3b5aaf81f4072f17b49f6"), "name" : { "first" : "Roger", "last" : "Riola" }, "signupDate" : ISODate("2017-10-15T19:23:22.158Z") }
{ "_id" : ObjectId("59e3b5aaf81f4072f17b49f7"), "name" : { "first" : "Sara", "last" : "Henderson" }, "signupDate" : ISODate("2017-10-15T19:23:22.158Z") }
{ "_id" : ObjectId("59e3b5aaf81f4072f17b49f8"), "name" : { "first" : "Natasha", "last" : "Frank" }, "signupDate" : ISODate("2017-10-15T19:23:22.158Z") }
{ "_id" : ObjectId("59e3b5aaf81f4072f17b49f9"), "name" : { "first" : "Nivine", "last" : undefined }, "signupDate" : ISODate("2017-10-15T19:23:22.158Z") }
{% endhighlight %}

If we wanted to view individual users we could query the command like an array:

{% highlight bash linenos %}
> db.users.find()[0]
{
	"_id" : ObjectId("59e3b5aaf81f4072f17b49f4"),
	"name" : {
		"first" : "Sam",
		"last" : "Lund"
	},
	"signupDate" : ISODate("2017-10-15T19:23:22.156Z")
}
{% endhighlight %}

If you have a large dataset you can use the `limit()` method to limit the number of documents returned.

{% highlight bash linenos %}
> db.users.find().limit(2)
{ "_id" : ObjectId("59e3b5aaf81f4072f17b49f4"), "name" : { "first" : "Sam", "last" : "Lund" }, "signupDate" : ISODate("2017-10-15T19:23:22.156Z") }
{ "_id" : ObjectId("59e3b5aaf81f4072f17b49f5"), "name" : { "first" : "Bill", "last" : "Noor" }, "signupDate" : ISODate("2017-10-15T19:23:22.158Z") }
{% endhighlight %}

As you can see Mongo has a nice method chaining syntax.

You can also set variables within Mongo. For example, if we set the second post to a variable it is then easy to access its properties:

{% highlight bash linenos %}
> const post = db.posts.find()[1];
> post.title
Parenting 101
> post.author
ObjectId("59e3b5aaf81f4072f17b49f4")
{% endhighlight %}

Note that the `post.author` field is called a reference field, because it references documents in another collection. In this case, the reference is to documents in the users collection. This means you can assign `post.author` to a variable and use that to look up the associated user!

{% highlight bash linenos %}
> const id = post.author
> db.users.find(id);
{ "_id" : ObjectId("59e3b5aaf81f4072f17b49f4"), "name" : { "first" : "Sam", "last" : "Lund" }, "signupDate" : ISODate("2017-10-15T19:23:22.156Z") }
{% endhighlight %}

Generally, you won't have to write a lot of scripts to use Mongo. Every software language has bindings for Mongo. 

#### Quiz

Question: Mongo only accepts the ISO Date Format.

Answer: False. See more <a href="https://docs.mongodb.org/v3.0/reference/method/Date/">here</a>.

Question: The `load()` command in the Mongo shell runs files with a path relative to the Mongo shell installation.

Answer: False. The load command is relative to the current working directory of where you launch the mongo shell from.

Question: `db.collection.____()` returns the number of documents in a collection. 

Answer: `count`

Question: The `limit()` command limits the ____ when chained to the end of a query.

Answer: number of documents returned

Question: The Mongo shell is the best way to programmatically access data in MongoDB.

Answer: False. The Mongo shell is great for management and data exploration. However, almost every functional programming language has a library to access Mongo directly.

## Working With Collections

Collections are how you organize and categorize documents in MongoDB. Being able to alter and delete collections is important as it grows and changes.

The `getCollectionNames()` method is useful anytime you're handed a database of data and you have to start exploring it. As soon as you know the collection names you can start using the individual collections methods from the previous sections in these notes.

{% highlight bash linenos %}
> db.getCollectionNames()
[ "posts", "users" ]
{% endhighlight %}

Another useful collection level operation is the ability to see indexes on a collection. Using the `getIndexes()` method. 

{% highlight bash linenos %}
> db.posts.getIndexes()
[
	{
		"v" : 2,
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "mongoBasics.posts"
	}
]
{% endhighlight %}

This tells you there is only one index and it is on the `_id` key. 

Creating our own indexes can have a huge performance benefit for our application. In our use case, a logical index would be on the post title since we may decide to look up posts by title in our application.

In order to create this index, we'll use the `createIndex()` method. The method takes an object with a key, in our example it will be title. Then it takes a value of `1` to index the documents by title, in ascending order, or `-1` in descending order. There is also an optional second parameter that holds options.

{% highlight bash linenos %}
> db.posts.createIndex({title: 1})
{
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
}
{% endhighlight %}

Now there are two indexs.

{% highlight bash linenos %}
> db.posts.getIndexes()
[
	{
		"v" : 2,
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "mongoBasics.posts"
	},
	{
		"v" : 2,
		"key" : {
			"title" : 1
		},
		"name" : "title_1",
		"ns" : "mongoBasics.posts"
	}
]
{% endhighlight %}

As you can see Mongo has named it "title_" and of course ot is on the posts collection.

You can delete the index with the `dropIndex()` method.

{% highlight bash linenos %}
> db.posts.dropIndex('title_1')
{ "nIndexesWas" : 2, "ok" : 1 }
{% endhighlight %}

Note that you cannot drop the `_id` index because Mongo protects it internatlly.

#### Quiz

Question: With Mongo Hacker installed, the command to rename a database is `db.____()`.

Answer: `rename`

Question: One of the most important things to do when creating a new collection is to index the `_id` field.

Answer: False. Month takes care of this for you.

Question: As applications grow and change, collections change too.

Answer: True. Often times how collections are indexed and how data is stored in documents will change as an application evolves.

Question: The ____ command returns a collections indexes.

Answer: `getIndexes`

Question: indexes are useful because ____.

Answer: they allow quick lookups of documents for queries on fields that have been indexed

## Querying Collections

Being able to query data from Mongo collections underlies just about everything you do in a relation to the database. How you query Mongo will dictate how you model the data, and can even affect some aspects of how your application works.

In addition to the `find()` method there is also the `findOne()` method. You can add query parameters as well `find({})` or `findOne({})`. There is a second parameter called projects.

Projects are an object where the keys are filled to return true or false.

{% highlight bash linenos %}
> db.posts.find({}, {body: false, description: false})
{ "_id" : ObjectId("59e3b5aaf81f4072f17b49fa"), "title" : "My Awesome Recipe!", "author" : ObjectId("59e3b5aaf81f4072f17b49f8") }
{ "_id" : ObjectId("59e3b5aaf81f4072f17b49fb"), "title" : "I love the holidays", "author" : ObjectId("59e3b5aaf81f4072f17b49f4") }
{ "_id" : ObjectId("59e3b5aaf81f4072f17b49fc"), "title" : "How to workout", "author" : ObjectId("59e3b5aaf81f4072f17b49f7") }
{ "_id" : ObjectId("59e3b5aaf81f4072f17b49fd"), "title" : "Parenting 101", "author" : ObjectId("59e3b5aaf81f4072f17b49f4") }
{% endhighlight %}

You will usually want to return the `_id` field, you can set this to false as well.

{% highlight bash linenos %}
> db.posts.find({}, {_id: false, body: false, description: false, author: false})
{ "title" : "My Awesome Recipe!" }
{ "title" : "I love the holidays" }
{ "title" : "How to workout" }
{ "title" : "Parenting 101" }
{% endhighlight %}

If you want to return a specific known post you can type the title as an option in the first parameter.

{% highlight bash linenos %}
> db.posts.find({title: "Parenting 101"}, {_id: false, body: false, description: false, author: false})
{ "title" : "Parenting 101" }
{% endhighlight %}

Keep in mind that Mongo is looking for exact matches it will not return anything unless there is an exact match.

You can return a document using the `$or` operator as well. Use this when you need to return a document that has a title My Awesome Recipe or Parenting 101 for example.

{% highlight bash linenos %}
> db.posts.find({$or: [{title: "Parenting 101"}, {title: "My Awesome Recipe!"}]}, {_id: false, body: false, description: false, author: false})
{ "title" : "My Awesome Recipe!" }
{ "title" : "Parenting 101" }
{% endhighlight %}

The `$or` operator is powerful, but its not the one you'll use most often. See more <a href="https://docs.mongodb.org/v3.0/reference/operator/query/">here</a>.

#### Quiz

Question: The ____ method is like the `find()` method, but returns only one document.

Answer: `findOne()`

Question: The `_id` field is always returned unless explicitely set to false in the projections.

Answer: True

Question: The second parameter of the `find()` method is the ____ parameter.

Answer: projections

Question: The "projections" parameter takes an object where the keys are the fields to return and the values are ____.

Answer: booleans

Question: The ____ operator allows you to query a single field or multiple fields based on different query values.

Answer: `$or`

## Updating Data

In a typical application, one of the most common things you'll do is update existing data. Whi.e records are created only once and sometimes they are deleted, they might be updated hundreds or thousands of times!

To update a document you can use the `update()` method:

{% highlight bash linenos %}
> db.posts.update({author:ObjectId("59e3b5aaf81f4072f17b49f5")}, {$set: {tags: ['foo', 'bar', 'interesting'], title:"I'm an updated title!"}})
Updated 1 record(s) in 4ms
WriteResult({
  "nMatched": 1,
  "nUpserted": 0,
  "nModified": 1
})
{% endhighlight %}

## Doing More With Queries in Mongo

Mongo's query engine is extremely powerful. Additionally, some of the ways that you can sort, filter, and aggregate data will determine how you choose to model your data.

Recall you can use the `limit()` method to limit the number of results returned. This can be chained onto the `find()` method as well.

{% highlight bash linenos %}
> db.posts.find({}, {title: true})
{
  "_id": ObjectId("59e3b5aaf81f4072f17b49fa"),
  "title": "My Awesome Recipe!"
}
{
  "_id": ObjectId("59e3b5aaf81f4072f17b49fb"),
  "title": "I love the holidays"
}
{
  "_id": ObjectId("59e3b5aaf81f4072f17b49fc"),
  "title": "How to workout"
}
{
  "_id": ObjectId("59e3b5aaf81f4072f17b49fd"),
  "title": "Parenting 101"
}
Fetched 4 record(s) in 2ms
> db.posts.find({}, {title: true}).limit(2)
{
  "_id": ObjectId("59e3b5aaf81f4072f17b49fa"),
  "title": "My Awesome Recipe!"
}
{
  "_id": ObjectId("59e3b5aaf81f4072f17b49fb"),
  "title": "I love the holidays"
}
Fetched 2 record(s) in 0ms
{% endhighlight %}

You can use the `Object.keys` method to display all of the keys on an object.

{% highlight bash linenos %}
> Object.keys(db.posts.find()[0])
[
  "_id",
  "title",
  "description",
  "body",
  "author"
]
{% endhighlight %}

The above is a very loose method. In a real world environment you'd likely need a better query such as the example <a href="http://stackoverflow.com/questions/2298870/mongodb-get-names-of-all-keys-in-collection">here</a>.

We can also return the post documents in alphabetical order. This can be done using the `sort()` method. The `sort()` method takes a parameter which is an object that asks what you want to sort by and if you want in ascending or descending (1 or -1).

{% highlight bash linenos %}
> db.posts.find({}, {title: true}).sort({title: 1})
{
  "_id": ObjectId("59e3b5aaf81f4072f17b49fc"),
  "title": "How to workout"
}
{
  "_id": ObjectId("59e3b5aaf81f4072f17b49fb"),
  "title": "I love the holidays"
}
{
  "_id": ObjectId("59e3b5aaf81f4072f17b49fa"),
  "title": "My Awesome Recipe!"
}
{
  "_id": ObjectId("59e3b5aaf81f4072f17b49fd"),
  "title": "Parenting 101"
}
Fetched 4 record(s) in 4ms
{% endhighlight %}

### Pagination

Another common scenario you will run into is where you want to paginate results. Check out <a href="https://pdxstartups.switchboardhq.com/">this</a> example from the Portland startup switchboard. Pagination means that you display a set of results across different pages.

To accomplish this with our data we use the `skip()` method along with the `limit()` method.

{% highlight bash linenos %}
> db.posts.find({}, {title: true}).limit(2)
{
  "_id": ObjectId("59e3b5aaf81f4072f17b49fa"),
  "title": "My Awesome Recipe!"
}
{
  "_id": ObjectId("59e3b5aaf81f4072f17b49fb"),
  "title": "I love the holidays"
}
Fetched 2 record(s) in 0ms
> db.posts.find({}, {title: true}).limit(2).skip(2)
{
  "_id": ObjectId("59e3b5aaf81f4072f17b49fc"),
  "title": "How to workout"
}
{
  "_id": ObjectId("59e3b5aaf81f4072f17b49fd"),
  "title": "Parenting 101"
}
Fetched 2 record(s) in 2ms
{% endhighlight %}

Think of pagination like ` limit = number of records on each page`, `skip = number of records on each page * page number - 1`.

#### Quiz

Question: The second parameter of the `update` method is the ____ parameter.

Answer: update

Question: If you try to update a file that does not exist on a document, by providing a field that is not already on the document, the field will be created with the values you provide.

Answer: True

Question: The `sort()` method will sort strings in alphabetical or reverse alphabetical order, data, and will sort numbers in ascending or descending order.

Answer: True

Question: The `skip()` method and the `limit()` method CANNOT be used together.

Answer: False

Question: In the mongo shell, documents are like ____.

Answer: JavaScript Objects

## Language Drivers

The most common way MongoDB is used in applications is through language drivers. Language drivers, sometimes callsed "clients", "plugins", "bindings", or "wrappers", are sets of functions and methods that allow you to more easily interact with a technology. In the case of MongoDB, there are drivers for Node, Scala, C++, Ruby, Python, and basically any other language you can imagine, even including Go and Erlang. Find them all <a href="https://docs.mongodb.org/ecosystem/drivers/">here</a>.

This allows you to use Mongo within the language you wish instead of from the command line.

There are also entire open-source frameworks built that use these libraries. The most well-known framework for nodeJS is Mongoose.

## Sharding

In the most basic MongoDB setup, all the data for your database is stored on one server. This is like having it installed locally. All the data for our database is stored on our computer, but as the database grows very large you will eventually need to store data across multiple machines. This process is called sharding, and is also known as horizontally scaling. 

Besides the size of the data, another big reason you'd scale your database onto multiple machines is so that multiple databases can handle requests to read and write data.

This is where MongoDB has a big advantage over SQL databases. MongoDB can spread read operations and write operations across as many machines as it needs to. This is because Mongo can store portions of the data set across many different instances as it wants. Meanwhile relational databases can store data on as many databases as they want, however each database contains an entire copy of the data set. What this means is they can only write to one of them. This architecture is called a master slave architechure where one database, the master, accepts all write bridge. The master is a big powerful database that then spreads the results of its write operations to the slaves, which are oftentimes smaller machines. While hardware is continually getting more and more powerful, it is not necessarily happening at the same rate that certain applications need it to.

From a perfoamance standpoint, this is why many large applications choose Mongo.

#### Quiz

Question: Relational databases can send write operations to ____.

Answer: only one database

Question: Which of the following is NOT a name a language driver might go by.

Answer: resource

Question: Sharding is also known as ____.

Answer: horizontal scaling

Question: The Mongo Shell is the primary way that developers interact with MongoDB in their applications.

Answer: False

Question: MongoDB can send write operations to ____.

Answer: all shards