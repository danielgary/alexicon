# alexicon
Alexicon is a command line utility for generating Alexa skills.  When given a valid input JSON file, alexicon will output the following files:

Command: alexicon -i input.json -o output.txt

1. intents.output.txt
2. utterances.output.txt
3. slots.output.txt

 At the momenth, alexicon only supports outputing into the current directory, but can read input files from any path.
 
 Please see the sample.json file for an example of how to structure your input.

