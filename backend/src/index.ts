import World from "./world";

const root = document.getElementById("elem");
const world = new World("Hello World!");

world.sayHello(root);