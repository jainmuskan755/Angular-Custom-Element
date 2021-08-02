const fs = require('fs');
const child_process = require('child_process');
const path = require('path');
const components = fs.readdirSync(`projects/elements/src/app/projects`);

compileAll();

async function compileAll() {
    for (let component of components) {
        await compileComponent(component);
        await compileCss(component);
    }
    let src = `node_modules/zone.js/dist/zone.min.js`;
    let destDir = `dist/components/`;
    let res, rej;
    let zone_promise = new Promise((_res, _rej) => {
        res = _res; rej = _rej;
    });
    fs.access(destDir, (err) => {
        if (err)
            fs.mkdirSync(destDir);
        copyFile(src, path.join(destDir, `zone.min.js`), res, rej);
    });
    await zone_promise;
    
    console.log("process finished");
}

async function compileCss(component){
    try{
        let buildCssFile = `node-sass --include-path scss projects/elements/src/app/projects/${component}/style.css dist/components/custom-${component}.css`;
        await child_process.execSync(buildCssFile);
    }catch(err){
        console.log(err);
    }
}
    
async function compileComponent(component) {
    const buildJsFiles = `ng build --prod --configuration=production --project=elements --build-optimizer --namedChunks=true --output-hashing none --main=projects/elements/src/app/projects/${component}/compile.ts`;
    await child_process.execSync(buildJsFiles);
    var concat = require('concat-files');
    let res, rej;
    let promise = new Promise((_res, _rej) => {
        res = _res;
        rej = _rej;
    });
    concat([
        'dist/elements/runtime.js',
        'dist/elements/polyfills-es5.js',
        'dist/elements/polyfills.js',
        'dist/elements/main.js'
    ], `dist/elements/custom-${component}.js`, function (err) {
        if (err) {
            rej();
            console.log("failed to concat files");
            throw err
        }

        let src = `dist/elements/custom-${component}.js`;
        let destDir = `dist/components/`;
        fs.access(destDir, (err) => {
            if (err)
                fs.mkdirSync(destDir);
            copyFile(src, path.join(destDir, `custom-${component}.js`), res, rej);
        });
    });
    await promise;
}


function copyFile(src, dest, res, rej) {

    let readStream = fs.createReadStream(src);

    readStream.once('error', (err) => {
        console.error("failed to copy ", src);
        rej();
    });

    readStream.once('end', () => {
        console.log("copied ", src);
        res();
    });

    readStream.pipe(fs.createWriteStream(dest));
}