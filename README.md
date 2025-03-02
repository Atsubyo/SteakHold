# AgentScript Template!

This is a template for starting out a new Model and its associated View 
from scratch.

A Model is basically data updated every time
model.step() is called.

To *see* the results, a View is used. In this case, we use the TwoDraw 
class. Its constrctor takes your model, and an object containing 
* the html div element which will contain the view
* the patchSize, in pixels, used to see the model's patches
* and an object containing the TwoDraw options.

[Here are](https://github.com/backspaces/agentscript/blob/master/src/TwoDraw.js)
the view options and their defaults.

Be sure to look at 
[agentscript-template-dump](https://glitch.com/edit/#!/agentscript-template-dump)
which is the same as this model, but without the 
https://code.agentscript.org imports,
simplifying the modeler's getting started.

## What's in this project?

← `Model.js`: This is where you can build a Model. It's architecture
is based on creating a class with standard functions:

- A constructor that creates the patches, turtles and links.
- A setup() method that initializes the model.
- A step() method that animates the model

← `README.md`: That's this file, where you can tell people what your
Model can do.

← `index.html`: This is the browser html file that imports
your Model and TwoDraw library, creates the view, 
and runs them in an Animator.

