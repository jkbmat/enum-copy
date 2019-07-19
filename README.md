#enum-copy

I am a stupid person unable to figure out how to painlessly export TS enums from a library. This forced me to find a painful way.
An enum is both a type and a value at once, similar to classes. But there is one caveat - you cannot assign enums!
This means that your `.d.ts` files need to duplicate the definition. And since that would be a lot of work, I've created this little utility.

`enum-copy` tries to walk a directory structure, finding exported enums and copying them over to your destination of choice.

Feel free to contribute in any way you want.

## Installation

`npm install enum-copy --save-dev`

or just

`npx enum-copy`

You will be greeted with a help screen, listing the options.
