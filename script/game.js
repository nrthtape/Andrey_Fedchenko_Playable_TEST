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
    height: 640,
    safeWidth: 640,
    safeHeight: 640,
    element: document.body
}

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
game.element.appendChild(app.view);



//Add scene

const scene = new Container();



const mask = new Graphics();
mask.beginFill(0x111111);
mask.drawRect(0, 0, 1390, 640);
mask.endFill();

scene.addChild(mask);



const dark = new Graphics();
dark.beginFill(0x111111);
dark.drawRect(0, 0, 1390, 640);
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

    sprite.mask = mask;

    sprite.anchor.x = anchor[0];
    sprite.anchor.y = anchor[1];
    sprite.x = position[0] - sprite.width / 2 + sprite.width * anchor[0];
    sprite.y = position[1] - sprite.height / 2 + sprite.height * anchor[1];
    sprite.alpha = alpha;
    sprite.scale.set(scale);
    sprite.interactive = interactive;

    return sprite;
}



//Add color filters
const logoColor = new PIXI.filters.ColorMatrixFilter();
const buttonColor = new PIXI.filters.ColorMatrixFilter();

//Declare variables for images
let bg, sofa, plant_1, table, globe, plant_2, book,
    austin, austin_idle_sheet, austin_idle, austin_clap_sheet, austin_clap,
    stairs_old,
    stairs_1,
    stairs_1_1, stairs_1_2, stairs_1_3,
    stairs_2_1, stairs_2_2, stairs_2_3,
    stairs_3_1, stairs_3_2, stairs_3_3,
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
    stairsIn_1_1, stairsIn_1_2, stairsIn_1_3,
    stairsIn_2_1, stairsIn_2_2, stairsIn_2_3,
    stairsIn_3_1, stairsIn_3_2, stairsIn_3_3,
    packshotIn

//This function will run when the image has loaded
function setup() {

    //BG
    bg = new Sprite(resources["images/bg.png"].texture);
    scene.addChildAt(bg);

    sofa = drawItem("sofa", scene, [0.5, 0.5], [314.5, 477.5], 1, 1, false);
    plant_1 = drawItem("plant_1", scene, [0.5, 0.5], [513.5, 33.5], 1, 1, false);
    table = drawItem("table", scene, [0.5, 0.5], [353, 307], 1, 1, false);
    globe = drawItem("globe", scene, [0.5, 0.5], [160.5, 203], 1, 1, false);
    plant_2 = drawItem("plant_2", scene, [0.5, 0.5], [1192.5, 239.5], 1, 1, false);
    book = drawItem("book", scene, [0.5, 0.5], [904, 66.5], 1, 1, false);

    //AUSTIN

    austin_idle_sheet = resources["images/austin_idle.json"].spritesheet;
    austin_clap_sheet = resources["images/austin_clap.json"].spritesheet;

    austin_idle = new PIXI.AnimatedSprite(austin_idle_sheet.animations["Default_Pass8624_Main."]);
    austin_clap = new PIXI.AnimatedSprite(austin_clap_sheet.animations["Default_Pass8624_Main."]);

    austin_idle.anchor.set(0.5, 0.5);
    austin_idle.position.set(739.5, 266);
    austin_idle.scale.x = -1;
    austin_idle.animationSpeed = 0.2;
    austin_idle.play();
    austin_idle.alpha = 1;

    austin_clap.anchor.set(0.5, 0.5);
    austin_clap.position.set(739.5, 266);
    austin_clap.scale.x = -1;
    austin_clap.animationSpeed = 0.4;
    austin_clap.alpha = 0;

    scene.addChild(austin_idle);
    scene.addChild(austin_clap);

    // austin = drawItem("austin", [0.5, 0.5], [613.5, 266], scene);

    //STAIRS

    //stairs_old

    stairs_old = drawItem("stairs_old", scene, [0.5, 0.5], [1111.5, 382], 1, 1, false);

    //stairs_1

    // stairs_1 = {
    //     1: drawItem("stairs_1_1", scene, [0.5, 0.5], [1149, 393.5], 0, 1, false),
    //     2: drawItem("stairs_1_2", scene, [0.5, 0.5], [1149, 393.5], 0, 1, false),
    //     3: drawItem("stairs_1_3", scene, [0.5, 0.5], [1149, 393.5], 0, 1, false)
    // }

    stairs_1_1 = drawItem("stairs_1_1", scene, [0.5, 0.5], [1149, 393.5], 0, 1, false);

    stairsIn_1_1 = tweenManager.createTween(stairs_1_1);
    stairsIn_1_1.from({y: stairs_1_1.y - 100, alpha: 0});
    stairsIn_1_1.to({y: stairs_1_1.y, alpha: 1});
    stairsIn_1_1.time = 800;
    stairsIn_1_1.easing = Easing.outExpo();

    stairs_1_2 = drawItem("stairs_1_2", scene, [0.5, 0.5], [1128, 308], 0, 1, false);

    stairsIn_1_2 = tweenManager.createTween(stairs_1_2);
    stairsIn_1_2.from({y: stairs_1_2.y - 100, alpha: 0});
    stairsIn_1_2.to({y: stairs_1_2.y, alpha: 1});
    stairsIn_1_2.time = 800;
    stairsIn_1_2.delay = 200;
    stairsIn_1_2.easing = Easing.outExpo();

    stairs_1_3 = drawItem("stairs_1_3", scene, [0.5, 0.5], [1161, 387], 0, 1, false);

    stairsIn_1_3 = tweenManager.createTween(stairs_1_3);
    stairsIn_1_3.from({y: stairs_1_3.y - 100, alpha: 0});
    stairsIn_1_3.to({y: stairs_1_3.y, alpha: 1});
    stairsIn_1_3.time = 800;
    stairsIn_1_3.delay = 400;
    stairsIn_1_3.easing = Easing.outExpo();

    //stairs_2

    stairs_2_1 = drawItem("stairs_2_1", scene, [0.5, 0.5], [1149, 394], 0, 1, false);

    stairsIn_2_1 = tweenManager.createTween(stairs_2_1);
    stairsIn_2_1.from({y: stairs_2_1.y - 100, alpha: 0});
    stairsIn_2_1.to({y: stairs_2_1.y, alpha: 1});
    stairsIn_2_1.time = 800;
    stairsIn_2_1.easing = Easing.outExpo();

    stairs_2_2 = drawItem("stairs_2_2", scene, [0.5, 0.5], [1122, 301.5], 0, 1, false);

    stairsIn_2_2 = tweenManager.createTween(stairs_2_2);
    stairsIn_2_2.from({y: stairs_2_2.y - 100, alpha: 0});
    stairsIn_2_2.to({y: stairs_2_2.y, alpha: 1});
    stairsIn_2_2.time = 800;
    stairsIn_2_2.delay = 200;
    stairsIn_2_2.easing = Easing.outExpo();

    stairs_2_3 = drawItem("stairs_2_3", scene, [0.5, 0.5], [1144, 392], 0, 1, false);

    stairsIn_2_3 = tweenManager.createTween(stairs_2_3);
    stairsIn_2_3.from({y: stairs_2_3.y - 100, alpha: 0});
    stairsIn_2_3.to({y: stairs_2_3.y, alpha: 1});
    stairsIn_2_3.time = 800;
    stairsIn_2_3.delay = 400;
    stairsIn_2_3.easing = Easing.outExpo();

    //stairs_3

    stairs_3_1 = drawItem("stairs_3_1", scene, [0.5, 0.5], [1150, 394], 0, 1, false);

    stairsIn_3_1 = tweenManager.createTween(stairs_3_1);
    stairsIn_3_1.from({y: stairs_3_1.y - 100, alpha: 0});
    stairsIn_3_1.to({y: stairs_3_1.y, alpha: 1});
    stairsIn_3_1.time = 800;
    stairsIn_3_1.easing = Easing.outExpo();

    stairs_3_2 = drawItem("stairs_3_2", scene, [0.5, 0.5], [1140, 322], 0, 1, false);

    stairsIn_3_2 = tweenManager.createTween(stairs_3_2);
    stairsIn_3_2.from({y: stairs_3_2.y - 100, alpha: 0});
    stairsIn_3_2.to({y: stairs_3_2.y, alpha: 1});
    stairsIn_3_2.time = 800;
    stairsIn_3_2.delay = 200;
    stairsIn_3_2.easing = Easing.outExpo();

    stairs_3_3 = drawItem("stairs_3_3", scene, [0.5, 0.5], [1159.5, 378.5], 0, 1, false);

    stairsIn_3_3 = tweenManager.createTween(stairs_3_3);
    stairsIn_3_3.from({y: stairs_3_3.y - 100, alpha: 0});
    stairsIn_3_3.to({y: stairs_3_3.y, alpha: 1});
    stairsIn_3_3.time = 800;
    stairsIn_3_3.delay = 400;
    stairsIn_3_3.easing = Easing.outExpo();

    //bg

    plant_3 = drawItem("plant_3", scene, [0.5, 0.5], [1250.5, 560], 1, 1, false);

    //INTERFACE

    //choice

    choice_1 = drawItem("choice_1", scene, [0.5, 0.5], [910.5, 74.5], 0, 0.5, true);

    choiceIn_1 = tweenManager.createTween(choice_1);
    choiceIn_1.to({width: choice_1.width * 2, height: choice_1.height * 2, alpha: 1});
    choiceIn_1.time = 500;
    choiceIn_1.easing = Easing.outElastic(0.4, 0.5);

    choice_2 = drawItem("choice_2", scene, [0.5, 0.5], [1039.5, 74.5], 0, 0.5, true);

    choiceIn_2 = tweenManager.createTween(choice_2);
    choiceIn_2.to({width: choice_2.width * 2, height: choice_2.height * 2, alpha: 1});
    choiceIn_2.time = 500;
    choiceIn_2.delay = 100;
    choiceIn_2.easing = Easing.outElastic(0.4, 0.5);

    choice_3 = drawItem("choice_3", scene, [0.5, 0.5], [1167.5, 74.5], 0, 0.5, true);

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

    hammer = drawItem("hammer", scene, [0.5, 1], [1140, 322.5], 0, 1, true);

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

    packshot = drawItem("packshot", scene, [0.5, 0.5], [695, 250.5], 0, 1.2, false);

    packshotIn = tweenManager.createTween(packshot);
    packshotIn.to({width: packshot.width / 1.2, height: packshot.height / 1.2, alpha: 1});
    packshotIn.time = 1000;
    packshotIn.delay = 2000;
    packshotIn.easing = Easing.outElastic(0.4, 0.8);

    //logo

    logo = drawItem("logo", scene, [0.5, 0.5], [180, 60], 0, 0.5, true);

    logo.filters = [logoColor];

    logoIn = tweenManager.createTween(logo);
    logoIn.to({width: logo.width * 2, height: logo.height * 2, alpha: 1});
    logoIn.time = 500;
    logoIn.easing = Easing.outElastic(0.4, 0.5);

    // logoOver = tweenManager.createTween(logo);
    // logoOver.to({width: logo.width * 2 * 1.2, height: logo.height * 2 * 1.2});
    // logoOver.time = 100;
    // logoOver.easing = Easing.inOutSine();
    //
    // logoOut = tweenManager.createTween(logo);
    // logoOut.to({width: logo.width * 2, height: logo.height * 2});
    // logoOut.time = 100;
    // logoOut.easing = Easing.inOutSine();

    //button

    button = drawItem("button", scene, [0.5, 0.5], [695, 561], 1, 1, true);

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

                            stairsIn_1_1.reset();
                            stairsIn_1_1.start();
                            stairsIn_1_2.reset();
                            stairsIn_1_2.start();
                            stairsIn_1_3.reset();
                            stairsIn_1_3.start();
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

                            stairsIn_2_1.reset();
                            stairsIn_2_1.start();
                            stairsIn_2_2.reset();
                            stairsIn_2_2.start();
                            stairsIn_2_3.reset();
                            stairsIn_2_3.start();
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

                            stairsIn_3_1.reset();
                            stairsIn_3_1.start();
                            stairsIn_3_2.reset();
                            stairsIn_3_2.start();
                            stairsIn_3_3.reset();
                            stairsIn_3_3.start();
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

                        stairsIn_1_1.stop();
                        stairsIn_1_2.stop();
                        stairsIn_1_3.stop();
                        stairsIn_2_1.stop();
                        stairsIn_2_2.stop();
                        stairsIn_2_3.stop();
                        stairsIn_3_1.stop();
                        stairsIn_3_2.stop();
                        stairsIn_3_3.stop();

                        stairs_old.alpha = 0;

                        stairs_1_1.alpha = 0;
                        stairs_1_2.alpha = 0;
                        stairs_1_3.alpha = 0;
                        stairs_2_1.alpha = 0;
                        stairs_2_2.alpha = 0;
                        stairs_2_3.alpha = 0;
                        stairs_3_1.alpha = 0;
                        stairs_3_2.alpha = 0;
                        stairs_3_3.alpha = 0;
                    }

                    function complete(){

                        choice_1.alpha = 0;
                        choice_2.alpha = 0;
                        choice_3.alpha = 0;

                        austin_idle.alpha = 0;
                        austin_clap.alpha = 1;
                        austin_clap.play();

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
            newGameHeight = newGameWidth * game.height / game.width;
        }
    }

    game.element.style.width = newGameWidth + "px";
    game.element.style.height = newGameHeight + "px";

    newGameX = (viewport.width - newGameWidth) / 2;
    newGameY = (viewport.height - newGameHeight) / 2;

    // Set the new padding of the game so it will be centered
    game.element.style.margin = newGameY + "px " + newGameX + "px";
}

window.onresize = (function(){

    // darkIn.reset();
    // darkIn.start();
    //
    // darkIn.on("end", resizeGame);

    resizeGame();
})

//Make stage interactive so you can click on it too
window.interactive = true;
window.hitArea = app.renderer.screen;

//Start game when loader ends
loader.onComplete.add(() =>{
    resizeGame();
    //Listen for animate update and update the tween manager
    ticker.add(function(delta) {
        tweenManager.update();
    });
});