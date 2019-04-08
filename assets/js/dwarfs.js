//@ts-check

class Dwarf {
    constructor(name, description, stats, imgSrc = "./assets/img/" + name + ".png") {
        this.name = name;
        this.description = description;
        this.imageSrc = imgSrc;
        this.stats = stats;
    }
}

class Stats {
    constructor(hp = 100, att = 10, ctatt = 5, def = 3, dodge = 10) {
        this.hp = hp;
        this.attack = att;
        this.counterAttack = ctatt;
        this.defence = def;
        this.dodgeChance = dodge;
    }
}

var bashful = new Dwarf(
    "Bashful",
    "the shy one",
    new Stats()
);

var doc = new Dwarf(
    "Doc",
    "leader of the group, not too good at speaking",
    new Stats()
);

var dopey = new Dwarf(
    "Dopey",
    "annoying, silly, the comic relief",
    new Stats()
);
var grumpy = new Dwarf(
    "Grumpy",
    "always annoyed and irritated, doesn't like snow white",
    new Stats()
);
var happy = new Dwarf(
    "Happy",
    "fat, jolly, friendly, spreading joy to everyone",
    new Stats()
);
var sleepy = new Dwarf(
    "Sleepy",
    "always tired, most observant",
    new Stats()
);
var sneezy = new Dwarf(
    "Sneezy",
    "likes to have fun, has never ending case of hay ",
    new Stats()
);

var dwarfs = [bashful, doc, dopey, grumpy, happy, sleepy, sneezy];
