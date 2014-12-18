define(["require", "exports", 'fs'], function (require, exports, fs) {
    var glimpseScriptFile = '../Glimpse/source/Glimpse.Core/glimpse.js';
    var encoding = 'utf8';
    var lineEnding = '\r\n';
    var mainScriptContents = fs.readFileSync(glimpseScriptFile, encoding).split(lineEnding);
    console.log('read ' + mainScriptContents.length + ' lines.');
    var jsHeadersRegex = /^\/\/(?:\s*).+\.js(?:\s*)$/;
    var glimpseHeadersRegex = /^\/\/(?:\s*).+glimpse.+\.js(?:\s*)$/;
    var oldBuffers = [];
    var buffer = [];
    var inBuffer = false;
    var currentFileName = "";
    for (var i = 0; i < mainScriptContents.length; i += 1) {
        if (jsHeadersRegex.test(mainScriptContents[i])) {
            if (inBuffer) {
                inBuffer = false;
                fs.writeFileSync("C:/Users/Steve/Documents/GitHub/GlimpseTS/" + currentFileName + ".ts", buffer.join(lineEnding), encoding);
                oldBuffers.push(buffer);
                buffer = [];
            }
            console.log("line " + (i + 1).toString() + mainScriptContents[i]);
            if (glimpseHeadersRegex.test(mainScriptContents[i])) {
                console.log("this is a GLimpse script");
                if (!inBuffer) {
                    inBuffer = true;
                    currentFileName = mainScriptContents[i].replace("//", "").replace(".js", "").trim();
                    console.log('prepping ' + currentFileName);
                }
            }
        }
        if (inBuffer) {
            buffer.push(mainScriptContents[i]);
        }
    }
});
