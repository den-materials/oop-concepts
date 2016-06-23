<!--
Creator: Ben Hulan
Market: SF
-->

![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# Going Deeper with OOP Concepts and JavaScript

## Why is this important?
<!-- framing the "why" in big-picture/real world examples -->
Understanding OOP concepts gives us an excellent frame of reference for a lot of information that comes later in the course. OOP concepts are the most common way that developers think about organizing code
at a high level. OOP concepts help inform the MVC architecture, how frameworks liks Rails and React 
are used to create apps and so much more. OOP design patterns give us an opinion about the way we architect our own applications. Simply put, understanding Object Oriented Programming will make us better developers.

As we prepare for Project 1 browser games, OOP concepts can give us some insight into how to break down complex problems into multiple smaller, simpler steps.

## What are the objectives?
<!-- specific/measurable goal for students to achieve -->
*After this workshop, developers will be able to:*

- Refactor code with OOP concepts such as
    - encapsulation
    - abstraction
- Recognize when objects can help in creating simpler tasks
- Recognize, understand and write prototype functions

## Where should we be now?
*Before this workshop, developers should already be able to:*

- Code working solutions for projects of a complexity similar to the [tic-tac-toe](https://github.com/den-wdi-1/tic-tac-toe)
and [geoquakes](https://github.com/den-wdi-1/geoquakes) labs.
- Explain how to create objects in Javascript using literals and constructors.

## What is OOP?
Object Oriented Programming(OOP) is one of the big progamming paradigms. It stretches across languages, 
so you can talk about OOP in JavaScript, in Ruby, or C++. The primary benefit of OOP is providing a 
common way for developers to talk about breaking down problems. It is a super deep area. At CU Denver,
you can take a [graduate course](https://oneclass.com/#!/schools/university_of_colorado_denver/1489296-csci-5255)
on OOP.

The basic idea behind OOP is to create Abstract Data Type(ADTs). ADTs are representations of concepts 
that defined in terms that the computer can understand. An example is the flowers from this mornings. 
What is the essence of rose to JavaScript? .... I don't know but I can try to build an understand by
defining some properties that JavaScript does understand. 

We can even combine previous ADT's we've created in defining new ADT's. If we're trying to define a car 
ADT and we've already defined a Tire ADT we can use the Tire ADT to define the Car ADT. Languages that 
support OOP understand what it means for a property to defined as an ADT. We can even go back and 
redefine one object in terms of another later.

So why do we care about ADTs if everything needs to be translated back into 1's and 0's. Humans don't 
think in 1's and 0's. Giving something a more concrete name makes it much easier to work with. Using ADTs
makes it easy to talk about the same things all day. We don't need to talk about earthquakes with our 
project managers and objects when writing code. We can change the code that we write to match the way 
we talk about what we are trying to do.

Let's think about some of ADTs that might be in the Geoquakes lab. Another way to put this are what the objects in Geoquakes lab.

Let's look at what [I came up with](https://github.com/den-wdi-1/oop-concepts/blob/master/geoquakes/scripts/app.js).

### Encapsulation

Once we've identified some ADTs, our key responsibility is to make sure that someone only needs to 
understand the properties and methods in our ADT to use our ADT. In other words we should be able to 
write a once sentence description of any properties and methods in our ADT. This description 

Think about addition. Whoever wrote JavaScript needed to specify at the 1's and 0's level what it means
to add two numbers. As a user of the JavaScript number ADT, I just need to know the method, ``+`` and 
what number addition means to use the ADT.

Another example. If I write a Car ADT that has the concept of position, I just need to give enough 
information to set and change the position. For example, I could pass an address, or a lat/lng 
combination, or just some grid coordinates. The ADT has responsibility for deciding how to actually 
store and manipulate the position once I've set it.

Let's go back to the code and look more directly at how we encapsulated the [Geoquakes objects](https://github.com/den-wdi-1/oop-concepts/blob/master/geoquakes/scripts/app.js).

### Inheritance and Polymorphism
JavaScript inheritance is different from most languages. In most languages instances are born with type 
and die with type. They're like a turtle's shell. Take away the shell and you've taken away the turtle. 
In JavaScript, instance are more like hermit crabs, where the type is just the shell they're carrying
around right now.

<img src="https://github.com/den-wdi-1/oop-concepts/blob/master/images/turtle.jpg" width="300">
<img src="https://github.com/den-wdi-1/oop-concepts/blob/master/images/hermit_crab.jpg" width="300">

When we make a new Object, we're getting a new copy of the shell. If we use the literal notation, we
saying take the ``Object`` shell add some new stuff and that's the ADT of my newly created instance.
When we say ``Object.create(rose)``, we're saying to the ``rose`` instance, I like your shell, let 
me have a copy of your shell, with one more piece of information, where I copied my shell. Using a 
constructor is basically a factory for creating shells.

```js 
function Flower() {
    this.color = "red";
    this.petals = 32;
    this.smells= true;
 }

var tulip = new Flower(); // Factory for shells
var rose = Object.create(tulip); //Give me your shell.
```

Once we start using an object, we start by asking if the object itself has changed a property or 
method. (Did the crab change it's own shell). If the object has changed it's property, we ask is the 
property or method defined in the prototype of the object. (Was the property or method defined on the 
source of the crab's shell.) If we can't find it in that prototype we ask is there another prototype 
of the prototype, and so on. (Did the source of our shell copy their shell from somewhere else.) 
Eventually we'll end up at the ``Object`` prototype which is pretty minimal. If we don't find it there
 we return ``undefined``.

This ability to go up the prototype chain, let's you define hierarchies of ADTs. For example, we can 
define a Vehicle ADT, then we can define a Car ADT that contains all of the Vehicle properties, and 
methods but also contains some properties that are specific to cars, finally we might have Lamborghini 
ADT that contains methods that are specific just to Lamborghini's.

We'll come back to these hierarchies when talk about Ruby because they're built into Rails.

```js 
daisy = {
    color: "white",
    petals: 64,
    smells: false
    bloom: function(){ console.log("Look at me") }; 
} 

function Flower() {
    this.color = "red";
    this.petals = 32;
    this.smells= true;
 }

Flower.prototype = { bloom: function(){ console.log("Look at me")}  }; 

var rose = new Flower(); // Factory for shells
var tulip = Object.create(rose); //Give me your shell.
tulip.color = "yellow"
```
Where are the following things defined? If it is defined in the object, saw the object name. If it's 
defined in the prototype list object.prototype. If its defined in the prototype's prototype write object.prototype.prototype, etc. If it's not defined how many prototype's do you need to check?
* rose.bloom? rose.prototype
* rose.color?
* tulip.color? 
* tulip.petals?
* tulip.bloom?
* daisy.color?
* daisy.watered?
* rose.watered?
* tulip.watered?

## Lab

Take your solution from the [tic-tac-toe](https://github.com/den-wdi-1/tic-tac-toe) mini-project.
- Identify some ADTs(objects) that might be present in your solution. 
    - Add the names of the ADTs to an ``adts.txt`` file.
    - Push the change back to Github
- Create a constructor for each ADT you think you identified in the ``adts.txt``
    - Refactor your code to use the constructor and any methods you defined on your ADT
- If you find a new ADT while doing this, Great!, add it back to the ``adts.txt`` and include those changes in your commit. 

## Additional Resources
- [Object Oriented Analysis and Design with Applications, by Grady Booch and others](http://www.goodreads.com/book/show/424923.Object_Oriented_Analysis_and_Design_with_Applications)
- [Great lecture notes](https://atomicobject.com/resources/oo-programming/introduction-motivation-for-oo)
- [OOP in JS from JavascriptIsSexy](http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/)
- [Javascript, The Good Parts](http://www.goodreads.com/book/show/2998152-javascript)
- [Practical Object Oriented Design in Ruby, by Sandi Metz](http://www.poodr.com/)
