/*jshint esversion: 6 */
var Content = require('./content.js');
var ContentComposed = require('./contentComposed.js');

var Region = Object.freeze({
        "North":{x: 0.5, y:0}, "South":{x: 0.5, y:1}, 
        "West":{x: 0, y:0.5}, "East":{x: 1, y:0.5},
        "Northwest":{x: 0, y:0}, "Northeast":{x: 1, y:0},
        "Southwest":{x: 0, y:1}, "Southeast":{x: 1, y:1},
        "Center":{x: 0.5, y: 0.5}
    });
const MovimentType = ({"V":"vertical", "H":"horizontal", "DA":"diagonalasc", "DD":"diagonaldes", "ANY":"any"});

class Diagram {

    constructor(name, creator) {
        this.diagramId = name;
        this.creator = creator;
        this.contents = [];
        this.generateDefaultContents();
    }

    generateDefaultContents(){
        //Generate Contents
        let triangle = Content.generatePolygon("Triangle", 3);
        let square   = Content.generatePolygon("Square", 4, Math.PI/4);
        let rhombus  = Content.generatePolygon("Rhombus", 4);
        let pentagon = Content.generatePolygon("Pentagon", 5);
        let hexagon  = Content.generatePolygon("Hexagon", 6);

        //Adds Contents
        this.contents.push(triangle);
        this.contents.push(rhombus, square, pentagon, hexagon);
    }

    createContent(obj, creator){
        let content = new Content(obj.name, obj.points, creator, obj.rotation);
        this.contents.push(content);

        return content;
    }

    createContentComposed(name, parentName, creator){
        console.log(parentName);
        let parent = this.retrieveContent(parentName);

        console.log("part2");
        let contentComposed = new ContentComposed(name, parent, creator);
        this.contents.push(contentComposed);

        return contentComposed;
    }

    addChildren(composedName, contentName, region, percentage){
        let child = JSON.parse(JSON.stringify(this.retrieveContent(contentName)));

        let composedContent = this.retrieveContent(composedName);
        composedContent.addChildren(child, Region[region], percentage);
    }

    retrieveContent(name){
        console.log(name);
        for(var i = 0; i < this.contents.length; i++) {
            if (this.contents[i].name == name) {
                return this.contents[i];
            }
        }
        throw "Shape not found";
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
