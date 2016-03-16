#!/usr/bin/env node

var $WD = __dirname;
var fs = require('fs');
var path = require('path');
var shell = require('shelljs');
var yargs = require('yargs');

var argv = yargs
    .usage("Usage: $0 -i \"input.json\" -g \"output.txt\"")
    .demand(["i"])
    .default({ o: "output.txt" }).argv;



const SAMPLE_REGEX = /\[(\w+)\]/g;

fs.readFile(argv.i, 'utf8', function(err, data) {
    if (err)
        console.log(err);
    else {

        var definition = JSON.parse(data);
        processDefinition(definition);

    }

});

function applyPermutation(inputString, sampleDefinitions, outArray) {
    if (outArray == null || outArray == undefined) {
        outArray = [];
    }
    var matches = SAMPLE_REGEX.exec(inputString);
    // console.log(matches);
    if (matches !== null && matches.length > 0) {
        var sampleName = matches[0];
        var s = sampleName.replace("[", "").replace("]", "");
        // console.log(s);
        if (sampleDefinitions[s] !== undefined) {

            for (var v in sampleDefinitions[s]) {

                var str = inputString.replace(sampleName, sampleDefinitions[s][v]);
                // console.log(str);
                applyPermutation(str, sampleDefinitions, outArray);

            }

        }


    }
    else {
        outArray.push(inputString);
    }

    return outArray;
}

function processDefinition(def) {



    var SAMPLES = def.utterances._samples;
    var INTENTS = def.intents;
    var output = "";
    var intentArray = [];

    var slotOutput = "";

    for (var SLOT in def.slots) {

        if (slotOutput.length > 0)
            slotOutput += "\n\n\n";

        slotOutput += "** BEGIN " + SLOT + "**";
        for (var k = 0; k < def.slots[SLOT].length; k++) {
            slotOutput += "\n" + def.slots[SLOT][k];
        }

    }

    for (var i in INTENTS) {

        var name = i;
        var intent = INTENTS[i];

        var u = def.utterances[i];
        var usamples = def.utterances[i].samples;
        if (usamples === undefined)
            usamples = {};
        for (var s in SAMPLES) {
            usamples[s] = SAMPLES[s];
        }

        intentArray.push({ "intent": name, slots: intent });

        for (var p in u.patterns) {

            var values = applyPermutation(u.patterns[p], usamples);
            for (var v in values) {
                output += name + " " + values[v] + "\n";
            }


        }

    }


    fs.writeFileSync("slots." + argv.o, slotOutput, "UTF-8", { 'flags': 'w+' });
    fs.writeFileSync("intents." + argv.o, JSON.stringify({ "intents": intentArray }), "UTF-8", { "flags": "w+" });
    fs.writeFileSync("utterances." + argv.o, output, "UTF-8", { 'flags': 'w+' });


}


