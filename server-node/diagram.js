/*jshint esversion: 6 */
var Shape = require('./shape.js');
var Content = require('./content.js');

var Region = Object.freeze({"north":{x: 0.5, y:0}, "soulth":{x: 0.5, y:1}, "west":{x: 0, y:0.5}, "east":{x: 1, y:0.5}});
const MovimentType = ({"V":"vertical", "H":"horizontal", "DA":"diagonalasc", "DD":"diagonaldes", "ANY":"any"});

class Diagram {

    constructor(name, creator) {
        this.diagramId = name;
        this.creator = creator;
        this.shapes = [];
        this.contents = [];
        this.generateDefaultShapes();
    }

    generateDefaultShapes(){
        //Creates shapes
        let triangle = Shape.generate("Triangle", 3);
        let square   = Shape.generate("Square", 4, Math.PI/4);
        let rhombus  = Shape.generate("Rhombus", 4);
        let pentagon = Shape.generate("Rhombus", 5);
        let hexagon  = Shape.generate("Hexagon", 6);
        //let heptgon  = Shape.generate("Heptgon", 7);
        //let octagon  = Shape.generate("Octagon", 8);
        //let circle   = Shape.generate("Circle", 36);

        //Adds shapes
        this.shapes.push(triangle);
        this.shapes.push(rhombus, square, pentagon, hexagon);
        //this.shapes.push(heptgon, octagon, circle);
    }

    retrieveShape(name){
        for(var i = 0; i < this.shapes.length; i++) {
            if (this.shapes[i].name == name) {
                return this.shapes[i];
            }
        }
        throw "Shape not found";
    }

    createContent(obj, creator){
        let shape = this.retrieveShape(obj.shape);
        let content = new Content(obj.name, shape, creator);
        this.contents.push(content);

        return content;
        //let triangle = Shape.generate("Triangle", 3);
        //triangle.addMovimentConstraint(0, MovimentType.H); //if (MovimentType[movimentType] == undefined) throw "Invalid Moviment type";
    }

    createContentComposed(...names){
        let shape = Diagram.retrieveShape(name);
        this.content.push(shape);    
    }

    asdsa(){
        //Creates an triangle that can move its top vertice
        //let triangle = Shape.generate("Triangle", 3);
        //triangle.addMovimentConstraint(0, MovimentType.H); //if (MovimentType[movimentType] == undefined) throw "Invalid Moviment type";

        //Creates an square that can get bigger and smaller a.k.a future arrow
        /*let squareArrow = Shape.generate("ArrowBody", 4, Math.PI/4);
        squareArrow.addMovimentConstraint(3, MovimentType.V);
        squareArrow.addMovimentRelativeConstraint(0, 3, MovimentType.V, true);
        squareArrow.addMovimentRelativeConstraint(2, 3, MovimentType.V);
        squareArrow.addMovimentRelativeConstraint(1, 3, MovimentType.V);
        let triangleArrow = Shape.generate("ArrowHead", 3, -Math.PI/6);
        triangleArrow.addMovimentConstraint(0, MovimentType.H);
        triangleArrow.addMovimentRelativeConstraint(2, 0, MovimentType.V);
        triangleArrow.addMovimentRelativeConstraint(1, 0, MovimentType.V);*/
    }

    getShapes(){
        return this.shapes;
    }

    getContents(){
        return this.contents;
    }
}

module.exports = Diagram, MovimentType;
