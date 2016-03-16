# alexicon
Alexicon is a command line utility for generating Alexa skills.  It makes generating various permutations of your utterances a piece of cake.  When given a valid input JSON file, alexicon will output the following files:

Command:

    alexicon -i input.json -o output.txt
Output:

    intents.output.txt
    utterances.output.txt
    slots.output.txt

 At the moment, alexicon only supports outputing into the current directory, but can read input files from any path.
 
 Please see the sample.json file for an example of how to structure your input.

# installation
    npm install alexicon -g
    


