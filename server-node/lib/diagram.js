/*jshint esversion: 6 */
var Element = require('./element.js');
//var RepresentationComposed = require('./Representation.Composed.js');

class Diagram {

    constructor(name, creator) {
        this.diagramId = name;
        this.creator = creator;
        this.elements = [];
        this.selectors = [];
        this.generateDefaultElements();
    }

    generateDefaultElements(){
        //Generate elements
        let none     = Element.generatePolygon("None", 0);
        let triangle = Element.generatePolygon("Triangle", 3);
        let square   = Element.generatePolygon("Square", 4, Math.PI/4);
        let rhombus  = Element.generatePolygon("Rhombus", 4);
        let pentagon = Element.generatePolygon("Pentagon", 5);
        let hexagon  = Element.generatePolygon("Hexagon", 6);

        //Adds representations
        this.elements.push(none, triangle);
        this.elements.push(rhombus, square, pentagon, hexagon);
    }

    createElement(obj, creator){
        try{
            //Check if object doenst exist
            this.retrieveElement(obj.name);

        }catch(err) {
        	let element;
        	if (typeof obj.points != "undefined"){
	            //Create object
	            element = new Element(obj.name, obj.type, obj.points, creator);
	            this.elements.push(element);
	        } else if (typeof obj.edge != "undefined"){
	        	//Create object
	            element = Element.generatePolygon(obj.name, obj.edge, obj.rotation, obj.creator);
	            this.elements.push(element);
	        }  
            return element;
        }
        throw "element already exists";
    }

    retrieveElement(name){
        for(var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].name == name) {
                return this.elements[i];
            }
        }
        throw "representation not found";
    }

    getElements(){
        return this.elements;
    }

    createElementComposed(name, parent, creator, rotation){
        //Create representation composed
        //let representationComposed = new RepresentationComposed(name, parent, creator, rotation);
        //this.representations.push(representationComposed);

        //return representationComposed;
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

}

module.exports = Diagram;
