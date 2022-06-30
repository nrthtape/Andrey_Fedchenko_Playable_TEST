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
        log = console.log,
        gameSize = [1138, 640]


//Create a Pixi Application
const app = new Application({
        width: gameSize[0],             // default: 800
        height: gameSize[1],            // default: 600
        antialias: true,                // default: false
        transparent: false,             // default: false
        resolution: 1                   // default: 1
    }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

app.renderer.backgroundColor = 0x111111;

//Add scene

const scene = new Container();

const safeRect = new Graphics();
safeRect.beginFill(0x111111);
safeRect.drawRect(0, 0, gameSize[0], gameSize[1]);
safeRect.endFill();

const safeRectAlpha = tweenManager.createTween(safeRect);
safeRectAlpha.to({alpha: 0});
safeRectAlpha.time = 500;
safeRectAlpha.start();

scene.addChild(safeRect);

//Load an image and run the `setup` function when it's done
loader
    .add("images/atlas.json")
    .add("images/austin_idle.json")
    .add("images/austin_clap.json")
    .load(setup);

//Add sprite to parent and return
function drawItem(name, anchor, position, parent){

        const atlas = resources["images/atlas.json"].textures;

        const sprite = new Sprite(atlas[name + ".png"]);
        sprite.x = position[0];
        sprite.y = position[1];
        sprite.anchor.x = anchor[0];
        sprite.anchor.y = anchor[1];

        parent.addChild(sprite);

        return sprite;
}



//Add color filters
const logoColor = new PIXI.filters.ColorMatrixFilter();
const buttonColor = new PIXI.filters.ColorMatrixFilter();

//Declare variables for images
let bg, sofa, plant_1, table, globe, plant_2, book,
    austin, austin_idle_sheet, austin_idle, austin_clap_sheet, austin_clap,
    stairs_old,
    stairs_1_1, stairs_1_2, stairs_1_3,
    stairs_2_1, stairs_2_2, stairs_2_3,
    stairs_3_1, stairs_3_2, stairs_3_3,
    flower,
    choice_1, choice_2, choice_3,
    choice_active, choice_1_active, choice_2_active, choice_3_active,
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
    choiceIn_1, choiceIn_2, choiceIn_3

//This function will run when the image has loaded
function setup() {

        //BG

        bg = drawItem("bg", [0.5, 0.5], [569, 320], scene);
        sofa = drawItem("sofa", [0.5, 0.5], [188.5, 477.5], scene);
        plant_1 = drawItem("plant_1", [0.5, 0.5], [387.5, 33.5], scene);
        table = drawItem("table", [0.5, 0.5], [227, 307], scene);
        globe = drawItem("globe", [0.5, 0.5], [34.5, 203], scene);
        plant_2 = drawItem("plant_2", [0.5, 0.5], [1066.5, 239.5], scene);
        book = drawItem("book", [0.5, 0.5], [778, 66.5], scene);

        //AUSTIN

        austin_idle_sheet = resources["images/austin_idle.json"].spritesheet;
        austin_clap_sheet = resources["images/austin_clap.json"].spritesheet;

        austin_idle = new PIXI.AnimatedSprite(austin_idle_sheet.animations["Default_Pass8624_Main."]);
        austin_clap = new PIXI.AnimatedSprite(austin_clap_sheet.animations["Default_Pass8624_Main."]);

        austin_idle.anchor.set(0.5, 0.5);
        austin_idle.position.set(613.5, 266);
        austin_idle.scale.x = -1;
        austin_idle.animationSpeed = 0.2;
        austin_idle.play();
        austin_idle.alpha = 1;

        austin_clap.anchor.set(0.5, 0.5);
        austin_clap.position.set(613.5, 266);
        austin_clap.scale.x = -1;
        austin_clap.animationSpeed = 0.4;
        austin_clap.play();
        austin_clap.alpha = 0;

        scene.addChild(austin_idle);
        scene.addChild(austin_clap);

        // austin = drawItem("austin", [0.5, 0.5], [613.5, 266], scene);

        //STAIRS

        stairs_old = drawItem("stairs_old", [0.5, 0.5], [922.5, 404], scene);

        stairs_1_1 = drawItem("stairs_1_1", [0.5, 0.5], [960, 402.5], scene);
        stairs_1_2 = drawItem("stairs_1_2", [0.5, 0.5], [963, 339.5], scene);
        stairs_1_3 = drawItem("stairs_1_3", [0.5, 0.5], [972, 417.5], scene);

        stairs_2_1 = drawItem("stairs_2_1", [0.5, 0.5], [960, 403], scene);
        stairs_2_2 = drawItem("stairs_2_2", [0.5, 0.5], [960, 326.5], scene);
        stairs_2_3 = drawItem("stairs_2_3", [0.5, 0.5], [955, 421.5], scene);

        stairs_3_1 = drawItem("stairs_3_1", [0.5, 0.5], [961, 403], scene);
        stairs_3_2 = drawItem("stairs_3_2", [0.5, 0.5], [966.5, 358.5], scene);
        stairs_3_3 = drawItem("stairs_3_3", [0.5, 0.5], [970.5, 412.5], scene);

        flower = drawItem("flower", [0.5, 0.5], [1067, 539], scene);

        //INTERFACE

        //choice

        choice_1 = drawItem("choice_1", [0.5, 0.5], [784.5, 74.5], scene);

        choice_1.alpha = 0;
        choice_1.scale.set(0.5, 0.5);

        choice_1.interactive = true;

        choiceIn_1 = tweenManager.createTween(choice_1);
        choiceIn_1.to({width: choice_1.width * 2, height: choice_1.height * 2, alpha: 1});
        choiceIn_1.time = 500;
        choiceIn_1.easing = PIXI.tween.Easing.outElastic(0.4, 0.5);

        choice_2 = drawItem("choice_2", [0.5, 0.5], [913.5, 74.5], scene);
        choice_2.alpha = 0;
        choice_2.scale.set(0.5, 0.5);

        choice_2.interactive = true;

        choiceIn_2 = tweenManager.createTween(choice_2);
        choiceIn_2.to({width: choice_2.width * 2, height: choice_2.height * 2, alpha: 1});
        choiceIn_2.time = 500;
        choiceIn_2.delay = 100;
        choiceIn_2.easing = PIXI.tween.Easing.outElastic(0.4, 0.5);

        choice_3 = drawItem("choice_3", [0.5, 0.5], [1041.5, 74.5], scene);
        choice_3.alpha = 0;
        choice_3.scale.set(0.5, 0.5);

        choice_3.interactive = true;

        choiceIn_3 = tweenManager.createTween(choice_3);
        choiceIn_3.to({width: choice_3.width * 2, height: choice_3.height * 2, alpha: 1});
        choiceIn_3.time = 500;
        choiceIn_3.delay = 200;
        choiceIn_3.easing = PIXI.tween.Easing.outElastic(0.4, 0.5);

        //choice_active

        choice_2_active = drawItem("choice_active", [0.5, 0.5], [0, -4], choice_1);
        choice_2_active = drawItem("choice_active", [0.5, 0.5], [0, -4], choice_2);
        choice_2_active = drawItem("choice_active", [0.5, 0.5], [0, -4], choice_3);

        //icon

        icon_1 = drawItem("icon_1", [0.5, 0.5], [0, -2], choice_1);
        icon_2 = drawItem("icon_2", [0.5, 0.5], [1.5, -6], choice_2);
        icon_3 = drawItem("icon_3", [0.5, 0.5], [0, -3], choice_3);

        //ok_button

        ok_1 = drawItem("ok_button", [0.5, 0.5], [0.5, 90], choice_1);
        ok_1.alpha = 0;

        ok_2 = drawItem("ok_button", [0.5, 0.5], [0.5, 90], choice_2);
        ok_2.alpha = 0;

        ok_3 = drawItem("ok_button", [0.5, 0.5], [0.5, 90], choice_3);
        ok_3.alpha = 0;

        //hammer

        hammer = drawItem("hammer", [0.5, 1], [1014, 322.5], scene);

        hammer.alpha = 0;
        hammer.y += hammer.height / 2;
        hammer.scale.x = 0.5;
        hammer.scale.y = 0.5;

        hammer.interactive = true;

        hammerIn = tweenManager.createTween(hammer);
        hammerIn.to({width: hammer.width * 2, height: hammer.height * 2, alpha: 1});
        hammerIn.time = 500;
        hammerIn.easing = PIXI.tween.Easing.outElastic(0.4, 0.5);

        hammerOver = tweenManager.createTween(hammer);
        hammerOver.to({width: hammer.width * 2 * 1.2, height: hammer.height * 2 * 1.2});
        hammerOver.time = 100;
        hammerOver.easing = PIXI.tween.Easing.inOutSine();

        hammerOut = tweenManager.createTween(hammer);
        hammerOut.to({width: hammer.width * 2, height: hammer.height * 2});
        hammerOut.time = 100;
        hammerOut.easing = PIXI.tween.Easing.inOutSine();

        //packshot

        packshot = drawItem("packshot", [0.5, 0.5], [569, 250.5], scene);

        packshot.alpha = 0;

        //logo

        logo = drawItem("logo", [0.5, 0.5], [158, 60.5], scene);

        logo.alpha = 0;
        logo.scale.x = 0.5;
        logo.scale.y = 0.5;

        logo.interactive = true;

        logo.filters = [logoColor];

        logoIn = tweenManager.createTween(logo);
        logoIn.to({width: logo.width * 2, height: logo.height * 2, alpha: 1});
        logoIn.time = 500;
        logoIn.easing = PIXI.tween.Easing.outElastic(0.4, 0.5);

        // logoOver = tweenManager.createTween(logo);
        // logoOver.to({width: logo.width * 2 * 1.2, height: logo.height * 2 * 1.2});
        // logoOver.time = 100;
        // logoOver.easing = PIXI.tween.Easing.inOutSine();
        //
        // logoOut = tweenManager.createTween(logo);
        // logoOut.to({width: logo.width * 2, height: logo.height * 2});
        // logoOut.time = 100;
        // logoOut.easing = PIXI.tween.Easing.inOutSine();

        //button

        button = drawItem("button", [0.5, 0.5], [569, 561], scene);

        button.interactive = true;

        button.filters = [buttonColor];

        buttonLoop = tweenManager.createTween(button);
        buttonLoop.to({width: button.width * 1.1, height: button.height * 1.1});
        buttonLoop.time = 2000;
        buttonLoop.easing = PIXI.tween.Easing.inOutSine();
        buttonLoop.pingPong = true
        buttonLoop.loop = true;
        buttonLoop.start();

        // buttonOver = tweenManager.createTween(button);
        // buttonOver.to({width: button.width * 1.2, height: button.height * 1.2});
        // buttonOver.time = 100;
        // buttonOver.easing = PIXI.tween.Easing.inOutSine();
}



//Add interactions
safeRectAlpha.on("end", logoShow);
function logoShow(){

        logoIn.start();

        //logo interactions

        logo.on("pointerover", logoOverShow);
        function logoOverShow(){

                logoColor.brightness(1.2);

                // logoOver.reset();
                // logoOver.start();
        }

        logo.on("pointerout", logoOutShow);
        function logoOutShow(){

                logoColor.brightness(1);

                // logoOut.reset();
                // logoOut.start();
        }

        logo.on("pointerdown", logoClick);
        function logoClick(){


        }

        //button interactions

        button.on("pointerover", buttonOverShow);
        function buttonOverShow(){

                // buttonColor.brightness(1.1);
                buttonLoop.reset();
                buttonLoop.time = 500;

                // buttonLoop.stop();
                //
                // buttonOver.reset();
                // buttonOver.start();
        }

        button.on("pointerout", buttonOutShow);
        function buttonOutShow(){

                // buttonColor.brightness(1);
                buttonLoop.reset();
                buttonLoop.time = 2000;

                // buttonLoop.start();
        }

        button.on("pointerdown", buttonClick);
        function buttonClick(){


        }

        logoIn.on("end", hammerShow);
        function hammerShow(){

                hammerIn.start();

                //hammer interactions

                hammer.on('pointerover', hammerOverShow);
                function hammerOverShow(){

                        hammerOver.reset();
                        hammerOver.start();
                }

                hammer.on('pointerout', hammerOutShow);
                function hammerOutShow(){

                        hammerOut.reset();
                        hammerOut.start();
                }

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
                        }
                }
        }
}



//Make stage interactive so you can click on it too
window.interactive = true;
window.hitArea = app.renderer.screen;

app.stage.addChild(scene);

//Get true if loader ends
let loadingComplete = false;
loader.onComplete.add(() =>{
        loadingComplete = true;
})

//Listen for animate update and update the tween manager
app.ticker.add(function(delta) {
        if (loadingComplete){
                PIXI.tweenManager.update();
        }
});