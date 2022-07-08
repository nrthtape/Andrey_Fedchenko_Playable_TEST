//Aliases
const   Application = PIXI.Application,
        Container = PIXI.Container,
        ParticleContainer = PIXI.ParticleContainer,
        loader = PIXI.Loader.shared,
        resources = PIXI.Loader.shared.resources,
        Graphics = PIXI.Graphics,
        TextureCache = PIXI.utils.TextureCache,
        Sprite = PIXI.Sprite,
        Text = PIXI.Text,
        TextStyle = PIXI.TextStyle,
        tweenManager = PIXI.tweenManager,
        Easing = PIXI.tween.Easing,
        ticker = PIXI.Ticker.shared

//Set game options
const game = {
    width: 1390,
    height: 1080,
    safeWidth: 640,
    safeHeight: 640,
    element: document.body
}

const fixH = (game.height - game.safeHeight) / 2;

//Create a Pixi Application
const app = new Application({
        width: game.width,             // default: 800
        height: game.height,            // default: 600
        antialias: true,                // default: false
        transparent: false,             // default: false
        resolution: 1                   // default: 1
    }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);



//Add scene

const scene = new Container();
// scene.y += (1390 - 640) / 2;

const right = new Container();
const choices = new Container();

const maskW = new Graphics();
maskW.beginFill(0x111111);
maskW.drawRect(0, 0, game.width, game.safeHeight);
maskW.endFill();
maskW.alpha = 0;

scene.addChild(maskW);

const maskH = new Graphics();
maskH.beginFill(0x111111);
maskH.drawRect(0, 0, game.width, game.height);
maskH.endFill();
maskH.alpha = 0;

scene.addChild(maskH);



const dark = new Graphics();
dark.beginFill(0x111111);
dark.drawRect(0, 0, game.width, game.height);
dark.endFill();

const darkIn = tweenManager.createTween(dark);
darkIn.to({alpha: 1});
darkIn.time = 1;

const darkPackshot = tweenManager.createTween(dark);
darkPackshot.to({alpha: 0.5});
darkPackshot.time = 500;
darkPackshot.delay = 1500;

const darkOut = tweenManager.createTween(dark);
darkOut.to({alpha: 0});
darkOut.time = 500;
darkOut.delay = 500;

scene.addChild(dark);



//Load an image and run the `setup` function when it's done
loader
    .add("images/atlas.json")
    .add("images/bg.png")
    .add("images/austin_idle.json")
    .add("images/austin_clap.json")
    .load(setup);



//Add sprite to parent and return
function drawItem(name, parent, anchor, position, alpha, scale, interactive){

    const atlas = resources["images/atlas.json"].textures;

    const sprite = new Sprite(atlas[name + ".png"]);

    parent.addChild(sprite);

    // sprite.mask = mask;

    sprite.anchor.x = anchor[0];
    sprite.anchor.y = anchor[1];
    sprite.x = position[0] - sprite.width / 2 + sprite.width * anchor[0];
    sprite.y = position[1] - sprite.height / 2 + sprite.height * anchor[1];
    sprite.alpha = alpha;
    sprite.scale.set(scale);
    sprite.interactive = interactive;

    return sprite;
}

//Add sequence
function addSequence(name, parent, anchor, position, alpha, scale, speed, interactive){

    const sheet = resources["images/" + name + ".json"].spritesheet;

    const sequence = new PIXI.AnimatedSprite(sheet.animations["Default_Pass8624_Main."]);

    parent.addChild(sequence);

    // sequence.mask = mask;

    sequence.anchor.x = anchor[0];
    sequence.anchor.y = anchor[1];
    sequence.x = position[0] - sequence.width / 2 + sequence.width * anchor[0];
    sequence.y = position[1] - sequence.height / 2 + sequence.height * anchor[1];
    sequence.alpha = alpha;
    sequence.scale.set(-scale, scale);
    sequence.animationSpeed = speed;
    sequence.interactive = interactive;

    return sequence;
}

//Add tween animations
function addAnimation(sprite, type, x, y, scale, time, delay, easing){

    const tween = tweenManager.createTween(sprite);

    if (type === "in"){

        tween.from({x: sprite.x + x, y: sprite.y + y, width: sprite.width * scale, height: sprite.height * scale, alpha: 0})
        tween.to({x: sprite.x, y: sprite.y, width: sprite.width, height: sprite.height, alpha: 1});
    }
    else if (type === "out"){

        tween.from({x: sprite.x, y: sprite.y, width: sprite.width, height: sprite.height, alpha: 1});
        tween.to({x: sprite.x + x, y: sprite.y + y, width: sprite.width * scale, height: sprite.height * scale, alpha: 0});
    }

    tween.time = time;
    tween.delay = delay;
    tween.easing = easing;

    return tween;
}

//Add color filters
const logoColor = new PIXI.filters.ColorMatrixFilter();
const buttonColor = new PIXI.filters.ColorMatrixFilter();

//Declare variables for images
let bg, bg2, sofa, plant_1, table, globe, plant_2, book,
    austin, austin_idle_sheet, austin_idle, austin_clap_sheet, austin_clap,
    stairs,
    plant_3,
    choice_1, choice_2, choice_3,
    choice_active, choice_active_1, choice_active_2, choice_active_3,
    icon_1, icon_2, icon_3,
    ok_button, ok_1, ok_2, ok_3,
    hammer,
    packshot,
    logo,
    button

//Declare variables for tween-animations
let logoIn, logoOver, logoOut,
    buttonLoop, buttonOver,
    hammerIn, hammerOver, hammerOut,
    choiceIn_1, choiceIn_2, choiceIn_3,
    choiceActiveIn_1, choiceActiveIn_2, choiceActiveIn_3,
    okIn_1, okIn_2, okIn_3, okOut_1, okOut_2, okOut_3,
    stairsIn,
    packshotIn

//This function will run when the image has loaded
function setup() {

    //BG
    bg = new Sprite(resources["images/bg.png"].texture);
    bg.anchor.set(0.5, 0.5);
    bg.position.set(scene.width / 2, scene.height / 2);
    scene.addChildAt(bg);


    sofa = drawItem("sofa", scene, [0.5, 0.5], [314.5, 477.5 + fixH], 1, 1, false);
    plant_1 = drawItem("plant_1", scene, [0.5, 0.5], [513.5, 33.5 + fixH], 1, 1, false);
    table = drawItem("table", scene, [0.5, 0.5], [353, 307 + fixH], 1, 1, false);
    globe = drawItem("globe", scene, [0.5, 0.5], [160.5, 203 + fixH], 1, 1, false);
    plant_2 = drawItem("plant_2", scene, [0.5, 0.5], [1192.5, 239.5 + fixH], 1, 1, false);
    book = drawItem("book", scene, [0.5, 0.5], [904, 66.5 + fixH], 1, 1, false);

    //AUSTIN

    austin = {

        idle: addSequence("austin_idle", scene, [0.5, 0.5], [739.5, 266 + fixH], 1, 1, 0.2, false),
        clap: addSequence("austin_clap", scene, [0.5, 0.5], [739.5, 266 + fixH], 0, 1, 0.4, false)
    }
    austin["idle"].play();

    //STAIRS

    stairs = {

        old: drawItem("stairs_old", right, [0.5, 0.5], [1111.5, 382 + fixH], 1, 1, false),
        1.1: drawItem("stairs_1_1", right, [0.5, 0.5], [1149, 393.5 + fixH], 0, 1, false),
        1.2: drawItem("stairs_1_2", right, [0.5, 0.5], [1128, 308 + fixH], 0, 1, false),
        1.3: drawItem("stairs_1_3", right, [0.5, 0.5], [1161, 387 + fixH], 0, 1, false),
        2.1: drawItem("stairs_2_1", right, [0.5, 0.5], [1149, 394 + fixH], 0, 1, false),
        2.2: drawItem("stairs_2_2", right, [0.5, 0.5], [1122, 301.5 + fixH], 0, 1, false),
        2.3: drawItem("stairs_2_3", right, [0.5, 0.5], [1144, 392 + fixH], 0, 1, false),
        3.1: drawItem("stairs_3_1", right, [0.5, 0.5], [1150, 394 + fixH], 0, 1, false),
        3.2: drawItem("stairs_3_2", right, [0.5, 0.5], [1140, 322 + fixH], 0, 1, false),
        3.3: drawItem("stairs_3_3", right, [0.5, 0.5], [1159.5, 378.5 + fixH], 0, 1, false)
    }

    scene.addChild(right);

    stairsIn = {

        1.1: addAnimation(stairs["1.1"], "in", 0, -100, 1, 800, 0, Easing.outExpo()),
        1.2: addAnimation(stairs["1.2"], "in", 0, -100, 1, 800, 200, Easing.outExpo()),
        1.3: addAnimation(stairs["1.3"], "in", 0, -100, 1, 800, 400, Easing.outExpo()),
        2.1: addAnimation(stairs["2.1"], "in", 0, -100, 1, 800, 0, Easing.outExpo()),
        2.2: addAnimation(stairs["2.2"], "in", 0, -100, 1, 800, 200, Easing.outExpo()),
        2.3: addAnimation(stairs["2.3"], "in", 0, -100, 1, 800, 400, Easing.outExpo()),
        3.1: addAnimation(stairs["3.1"], "in", 0, -100, 1, 800, 0, Easing.outExpo()),
        3.2: addAnimation(stairs["3.2"], "in", 0, -100, 1, 800, 200, Easing.outExpo()),
        3.3: addAnimation(stairs["3.3"], "in", 0, -100, 1, 800, 400, Easing.outExpo())
    }

    //FG

    plant_3 = drawItem("plant_3", right, [0.5, 0.5], [1250.5, 560 + fixH], 1, 1, false);

    //INTERFACE

    //choice

    // choice_1 = drawItem("choice_1", right, [0.5, 0.5], [910.5, 74.5 + fixH], 1, 1, true);
    // choice_2 = drawItem("choice_2", right, [0.5, 0.5], [1039.5, 74.5 + fixH], 1, 1, true);
    // choice_3 = drawItem("choice_3", right, [0.5, 0.5], [1167.5, 74.5 + fixH], 1, 1, true);

    choice_1 = drawItem("choice_1", choices, [0.5, 0.5], [910.5, 74.5 + fixH], 0, 0.5, true);
    choice_2 = drawItem("choice_2", choices, [0.5, 0.5], [1039.5, 74.5 + fixH], 0, 0.5, true);
    choice_3 = drawItem("choice_3", choices, [0.5, 0.5], [1167.5, 74.5 + fixH], 0, 0.5, true);

    right.addChild(choices);

    choiceIn_1 = tweenManager.createTween(choice_1);
    choiceIn_1.to({width: choice_1.width * 2, height: choice_1.height * 2, alpha: 1});
    choiceIn_1.time = 500;
    choiceIn_1.easing = Easing.outElastic(0.4, 0.5);

    choiceIn_2 = tweenManager.createTween(choice_2);
    choiceIn_2.to({width: choice_2.width * 2, height: choice_2.height * 2, alpha: 1});
    choiceIn_2.time = 500;
    choiceIn_2.delay = 100;
    choiceIn_2.easing = Easing.outElastic(0.4, 0.5);

    choiceIn_3 = tweenManager.createTween(choice_3);
    choiceIn_3.to({width: choice_3.width * 2, height: choice_3.height * 2, alpha: 1});
    choiceIn_3.time = 500;
    choiceIn_3.delay = 200;
    choiceIn_3.easing = Easing.outElastic(0.4, 0.5);

    //choice_active

    choice_active_1 = drawItem("choice_active", choice_1, [0.5, 0.5], [0, -4], 0, 1, false);
    choice_active_2 = drawItem("choice_active", choice_2, [0.5, 0.5], [0, -4], 0, 1, false);
    choice_active_3 = drawItem("choice_active", choice_3, [0.5, 0.5], [0, -4], 0, 1, false);

    //icon

    icon_1 = drawItem("icon_1", choice_1, [0.5, 0.5], [1, 0], 1, 1, false);
    icon_2 = drawItem("icon_2", choice_2, [0.5, 0.5], [2, -4], 1, 1, false);
    icon_3 = drawItem("icon_3", choice_3, [0.5, 0.5], [1, -2], 1, 1, false);

    //ok_button

    ok_1 = drawItem("ok_button", choice_1, [0.5, 0.5], [0.5, 90], 0, 0.5, true);

    okIn_1 = tweenManager.createTween(ok_1);
    okIn_1.to({width: ok_1.width * 2, height: ok_1.height * 2, alpha: 1});
    okIn_1.time = 100;
    okIn_1.easing = Easing.inOutSine();

    okOut_1 = tweenManager.createTween(ok_1);
    okOut_1.to({width: ok_1.width / 2, height: ok_1.height / 2, alpha: 0});
    okOut_1.time = 100;
    okOut_1.easing = Easing.inOutSine();

    ok_2 = drawItem("ok_button", choice_2, [0.5, 0.5], [0.5, 90], 0, 0.5, true);

    okIn_2 = tweenManager.createTween(ok_2);
    okIn_2.to({width: ok_2.width * 2, height: ok_2.height * 2, alpha: 1});
    okIn_2.time = 100;
    okIn_2.easing = Easing.inOutSine();

    okOut_2 = tweenManager.createTween(ok_2);
    okOut_2.to({width: ok_2.width / 2, height: ok_2.height / 2, alpha: 0});
    okOut_2.time = 100;
    okOut_2.easing = Easing.inOutSine();

    ok_3 = drawItem("ok_button", choice_3, [0.5, 0.5], [0.5, 90], 0, 0.5, true);

    okIn_3 = tweenManager.createTween(ok_3);
    okIn_3.to({width: ok_3.width * 2, height: ok_3.height * 2, alpha: 1});
    okIn_3.time = 100;
    okIn_3.easing = Easing.inOutSine();

    okOut_3 = tweenManager.createTween(ok_3);
    okOut_3.to({width: ok_3.width / 2, height: ok_3.height / 2, alpha: 0});
    okOut_3.time = 100;
    okOut_3.easing = Easing.inOutSine();

    //hammer

    hammer = drawItem("hammer", right, [0.5, 1], [1140, 322.5 + fixH], 0, 1, true);

    hammerIn = tweenManager.createTween(hammer);
    hammerIn.from({y: hammer.y - 50, alpha: 1});
    hammerIn.to({y: hammer.y, alpha: 1});
    hammerIn.time = 500;
    hammerIn.easing = Easing.outBounce(0.5);

    hammerOver = tweenManager.createTween(hammer);
    hammerOver.to({width: hammer.width * 1.2, height: hammer.height * 1.2});
    hammerOver.time = 100;
    hammerOver.easing = Easing.inOutSine();

    hammerOut = tweenManager.createTween(hammer);
    hammerOut.to({width: hammer.width, height: hammer.height});
    hammerOut.time = 100;
    hammerOut.easing = Easing.inOutSine();

    //packshot

    packshot = drawItem("packshot", scene, [0.5, 0.5], [695, 250.5 + fixH], 0, 1, false);

    // packshotIn = tweenManager.createTween(packshot);
    // packshotIn.to({width: packshot.width / 1.2, height: packshot.height / 1.2, alpha: 1});
    // packshotIn.time = 1000;
    // packshotIn.delay = 2000;
    // packshotIn.easing = Easing.outElastic(0.4, 0.8);

    //logo

    logo = drawItem("logo", scene, [0.5, 0.5], [180, 60 + fixH], 0, 1, true);

    logo.filters = [logoColor];

    // logoIn = addAnimation(logo, "in", 0, 0, 0.5, 500, 0, Easing.outElastic(0.4, 0.5));

    // logoIn = tweenManager.createTween(logo);
    // logoIn.from({width: logo.width * 0.5, height: logo.height * 0.5, alpha: 0});
    // logoIn.to({width: logo.width, height: logo.height, alpha: 1});
    // logoIn.time = 500;
    // logoIn.easing = Easing.outElastic(0.4, 0.5);

    //button

    button = drawItem("button", scene, [0.5, 0.5], [695, 561 + fixH], 1, 1, true);

    button.filters = [buttonColor];

    buttonLoop = tweenManager.createTween(button);
    buttonLoop.to({width: button.width * 1.1, height: button.height * 1.1});
    buttonLoop.time = 2000;
    buttonLoop.easing = Easing.inOutSine();
    buttonLoop.pingPong = true
    buttonLoop.loop = true;
    buttonLoop.start();

    buttonOver = tweenManager.createTween(button);
    buttonOver.to({width: button.width * 1.2, height: button.height * 1.2});
    buttonOver.time = 100;
    buttonOver.easing = Easing.inOutSine();

    // scene.addChild(dark);
    scene.setChildIndex(dark, scene.children.length - 1);
}


//Check OS
const   detect = new MobileDetect(window.navigator.userAgent),
        os = detect.os()

//Go to game page depending on OS
function openStore(){
    let href;
    if (os === "iOS"){
        href = "https://apps.apple.com/RU/app/id1195621598?mt=8";
    }
    else if (os === "AndroidOS"){
        href = "https://go.onelink.me/app/e35c91b";
    }
    else{
        href = "https://game.playrix.com/homescapes/lp/hs001v1";
    }
    window.open(href, "_self");
}



//INTERACTIONS

darkOut.start();
darkOut.on("end", logoShow);
function logoShow(){

    logoIn.start();
    // packshotIn.start();

    //logo interactions

    logo.on("pointerover", function(){

        logoColor.brightness(1.25);

        // logoOver.reset();
        // logoOver.start();
    });

    logo.on("pointerout", function(){

        logoColor.brightness(1);

        // logoOut.reset();
        // logoOut.start();
    });

    logo.on("pointerdown", openStore);

    //button interactions

    button.on("pointerover", function(){

        // buttonColor.brightness(1.25);
        buttonLoop.reset();
        buttonLoop.time = 500;

        // buttonLoop.stop();
        //
        // buttonOver.reset();
        // buttonOver.start();
    });

    button.on("pointerout", function(){

        // buttonColor.brightness(1);
        buttonLoop.reset();
        buttonLoop.time = 1000;

        // buttonLoop.start();
    });

    button.on("pointerdown", openStore);

    logoIn.on("end", hammerShow);
    function hammerShow(){

        hammerIn.start();

        hammerIn.on("end", function(){

            hammer.on('pointerover', function(){

                hammerOver.reset();
                hammerOver.start();
            });

            hammer.on('pointerout', function(){

                hammerOut.reset();
                hammerOut.start();
            });

            hammer.on("pointerdown", hammerClick);
            function hammerClick(){

                hammerOut.reset();
                hammerOut.start();

                hammerOut.on("end", choiceShow);
                function choiceShow(){

                    hammer.alpha = 0;

                    choiceIn_1.start();
                    choiceIn_2.start();
                    choiceIn_3.start();

                    choice_1.on("pointerdown", function(){

                        if (choice_active_1.alpha === 0){

                            choice_active_1.alpha = 1;
                            choice_active_2.alpha = 0;
                            choice_active_3.alpha = 0;

                            //show ok_button

                            okIn_2.stop();
                            okIn_3.stop();

                            ok_2.alpha = 0;
                            ok_3.alpha = 0;

                            okIn_1.reset();
                            okIn_1.start();

                            //hide all stairs

                            hideAllStairs();

                            //show stairs

                            for (let i in stairsIn) {
                                if (i.substring(0, 1) === "1"){
                                    stairsIn[i].reset();
                                    stairsIn[i].start();
                                }
                            }
                        }
                    });

                    choice_2.on("pointerdown", function(){

                        if (choice_active_2.alpha === 0){

                            choice_active_1.alpha = 0;
                            choice_active_2.alpha = 1;
                            choice_active_3.alpha = 0;

                            //show ok_button

                            okIn_1.stop();
                            okIn_3.stop();

                            ok_1.alpha = 0;
                            ok_3.alpha = 0;

                            okIn_2.reset();
                            okIn_2.start();

                            //hide all stairs

                            hideAllStairs();

                            //show stairs

                            for (let i in stairsIn) {
                                if (i.substring(0, 1) === "2"){
                                    stairsIn[i].reset();
                                    stairsIn[i].start();
                                }
                            }
                        }
                    });

                    choice_3.on("pointerdown", function(){

                        if (choice_active_3.alpha === 0){

                            choice_active_1.alpha = 0;
                            choice_active_2.alpha = 0;
                            choice_active_3.alpha = 1;

                            //show ok_button

                            okIn_1.stop();
                            okIn_2.stop();

                            ok_1.alpha = 0;
                            ok_2.alpha = 0;

                            okIn_3.reset();
                            okIn_3.start();

                            //hide all stairs

                            hideAllStairs();

                            //show stairs

                            for (let i in stairsIn) {
                                if (i.substring(0, 1) === "3"){
                                    stairsIn[i].reset();
                                    stairsIn[i].start();
                                }
                            }
                        }
                    });

                    ok_1.on("pointerdown", function(){

                        if (choice_active_1.alpha === 1){

                            okOut_1.start();

                            okOut_1.on("end", complete);
                        }
                    });

                    ok_2.on("pointerdown", function(){

                        if (choice_active_2.alpha === 1){

                            okOut_2.start();

                            okOut_2.on("end", complete);
                        }
                    });

                    ok_3.on("pointerdown", function(){

                        if (choice_active_3.alpha === 1){

                            okOut_3.start();

                            okOut_3.on("end", complete);
                        }
                    });

                    function hideAllStairs(){

                        for (let i in stairsIn) {
                            stairsIn[i].stop();
                        }

                        for (let i in stairs) {
                            stairs[i].alpha = 0;
                        }
                    }

                    function complete(){

                        choice_1.alpha = 0;
                        choice_2.alpha = 0;
                        choice_3.alpha = 0;

                        austin["idle"].alpha = 0;
                        austin["clap"].alpha = 1;
                        austin["clap"].play();

                        scene.setChildIndex(dark, scene.children.length - 4);

                        darkPackshot.start();

                        packshotIn.start();
                    }
                }
            }
        });
    }
}




//RENDER

app.stage.addChild(scene);

//Fits game content to the browser window
function resizeGame(){

    darkOut.reset();
    darkOut.start();

    let viewport, newGameWidth, newGameHeight, newGameX, newGameY;

    // Get the dimensions of the viewport
    viewport = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    if (detect.phone() === true){
        viewport.width = detect.maxPhoneWidth;
    }

    // Determine game size
    if (game.height / game.width > viewport.height / viewport.width) {
        if (game.safeHeight / game.width > viewport.height / viewport.width) {
            // A
            newGameHeight = viewport.height * game.height / game.safeHeight;
            newGameWidth = newGameHeight * game.width / game.height;
        } else {
            // B
            newGameWidth = viewport.width;
            newGameHeight = newGameWidth * game.height / game.width;
        }
    } else {
        if (game.height / game.safeWidth > viewport.height / viewport.width) {
            // C
            newGameHeight = viewport.height;
            newGameWidth = newGameHeight * game.width / game.height;
        } else {
            // D
            newGameWidth = viewport.width * game.width / game.safeWidth;
            newGameHeight = newGameWidth * game.height  / game.width;
        }
    }

    let gameScale = (viewport.height + (game.height - game.safeHeight)) / newGameHeight;

    // resize interface

    if (newGameWidth > viewport.width){

        if (game.height  / game.safeWidth > viewport.height / viewport.width){

            packshot.y = 250.5 + fixH + 50;

            logo.scale.set(1);

            logo.x = 180 + (newGameWidth - viewport.width) / 2 * gameScale;
            logo.y = 60 + (game.height - game.safeHeight) / 2;

            maskW.y = (game.height - game.safeHeight) / 2;
            scene.mask = maskW;

            right.y = 0;

            button.y = 561 + fixH;
        }
        else{
            logo.scale.set(1.3);

            logo.x = game.width / 2;
            logo.y = 120;

            scene.mask = maskH;

            right.y = 100;

            button.y = game.height - (game.safeHeight - 561) - 50;
        }
    }
    else{
        logo.scale.set(1);

        logo.x = 180;
        logo.y = 60 + (game.height - game.safeHeight) / 2;

        maskW.y = (game.height - game.safeHeight) / 2;
        scene.mask = maskW;

        button.y = 561 + fixH;

        right.y = 0;
    }

    // resize right

    if ((newGameWidth) / 2 * gameScale > viewport.width){

        packshot.scale.set(0.9);
        packshot.y = 250.5 + fixH + 50;

        right.x = 100 - (newGameWidth - viewport.width) / 2 * gameScale;
        choices.y = 300;
        choices.x = right.x / 2 + 50;
    }
    else{

        packshot.scale.set(1);
        packshot.y = 250.5 + fixH;

        right.x = 0;

        choices.y = 0;
        choices.x = 0;
    }

    game.element.style.width = newGameWidth + "px";
    game.element.style.height = newGameHeight + "px";

    newGameX = (viewport.width - newGameWidth) / 2;
    newGameY = (viewport.height - newGameHeight) / 2;

    // Set the new padding of the game so if it will be centered
    game.element.style.margin = newGameY + "px " + newGameX + "px";
}

window.onresize = (function(){

    darkIn.reset();
    darkIn.start();

    darkIn.on("end", resizeGame);
})

//Start game when loader ends
loader.onComplete.add(function(){
    resizeGame();

    logoIn = addAnimation(logo, "in", 0, 0, 0.5, 500, 0, Easing.outElastic(0.4, 0.5));
    packshotIn = addAnimation(packshot, "in", 0, 0, 1.2, 1000, 2000, Easing.outElastic(0.4, 0.5));

    //Listen for animate update and update the tween manager
    ticker.add(function(){
        tweenManager.update();
    });
});