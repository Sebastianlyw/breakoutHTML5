Set Up setps:

1.Clone my repository to your local machine
2.I user 'http-server for node.js' as local web server for game testing.

Open a command prompt in the repository root and run the following:
 npm install http-server -g

This will install http-server globally so that it may be run from the command line. Type following in comand line to run the http server:
  http-server 
  
Now you can visit http://localhost:8080 to testing my game.


Breakout Game:
1. There is a starting scene. click to start the game.
2. In game, only control input is mouse click. Paddle will follow mouse.
3. Simple score system, paddle will expand when achieving certain scores. 
4. If life is equal to zero, game go to game over scene. There is some simple particle effect and background music as well.
5. IE11  in my machine does not support audio play. 
6. Tested int mobile device emulator, game scales to fit the screen size.


To Do:
I starting from Monday Morning and takes a lot time to familar with phaser API. So there is still many areas in this game can be polished. 
Things I want to try in few days:
1. make game installed as app
2. Fixed portrait view size scale issue.
3. I coded ball, brick and paddle as indviudal classes. so there are a lot fun feathers can be implmented easily. 
4. Completed menu scene, like adding Setting page into menu.


Enjoy reviewing! I value all feedback and comments from you. 



