/*jshint esversion: 6 */
var Representation = require('./representation.js');
var RepresentationSimple = require('./Representation.Simple.js');
var RepresentationComposed = require('./Representation.Composed.js');
var Selector = require('./selector.js');

class Diagram {

    constructor(name, creator) {
        this.diagramId = name;
        this.creator = creator;
        this.representations = [];
        this.selectors = [];
        this.generateDefaultRepresentations();
        this.generateDefaultSelectors();
    }

    generateDefaultRepresentations(){
        //Generate representations
        let none     = RepresentationSimple.generatePolygon("None", 0);
        let triangle = RepresentationSimple.generatePolygon("Triangle", 3);
        let square   = RepresentationSimple.generatePolygon("Square", 4, Math.PI/4);
        let rhombus  = RepresentationSimple.generatePolygon("Rhombus", 4);
        let pentagon = RepresentationSimple.generatePolygon("Pentagon", 5);
        let hexagon  = RepresentationSimple.generatePolygon("Hexagon", 6);

        //Adds representations
        this.representations.push(none, triangle);
        this.representations.push(rhombus, square, pentagon, hexagon);
    }

    generateDefaultSelectors(){
        //Generate Selectors
        let none = new Selector("None");
        let defaultSelector = this.createSelector("Default", this.retrieveRepresentation("Square"), 4);

        //Add Selectors
        this.selectors.push(none, defaultSelector);
    }

    createRepresentationSimple(obj, creator){
        try{
            //Check if object doenst exist
            this.retrieveRepresentation(obj.name);

        }catch(err) {
        	let representation;
        	if (typeof obj.points != "undefined"){
	            //Create object
	            representation = new RepresentationSimple(obj.name, obj.points, creator, obj.rotation);
	            this.representations.push(representation);
	        } else if (typeof obj.edge != "undefined"){
	        	//Create object
	            representation = RepresentationSimple.generatePolygon(obj.name, obj.edge, obj.rotation, obj.creator);
	            this.representations.push(representation);
	        }


            return representation;
        }
        throw "representation already exists";
    }

    createRepresentationComposed(name, parent, creator, rotation){
        //Create representation composed
        let representationComposed = new RepresentationComposed(name, parent, creator, rotation);
        this.representations.push(representationComposed);

        return representationComposed;
    }

    createSelector(name, creator = "@SCD", representation, amount, corners, constructions){
        if (amount % 2 != 0) throw "The amount of selectorPoints must be even";

        let selector = new Selector(name, creator);
        selector.addPointsAmount(representation, creator, amount);
        if (corners == true) selector.addPointOnCorners(representation, creator);
        constructions.forEach(construction => {
           selector.addPointsConstruction(representation, creator, construction);
        };
       
        this.selectors.push(selector); 
        return selector;
    }

    retrieveRepresentation(name){
        for(var i = 0; i < this.representations.length; i++) {
            if (this.representations[i].name == name) {
                return this.representations[i];
            }
        }
        throw "representation not found";
    }

    retrieveSelector(name){
        for(var i = 0; i < this.selectors.length; i++) {
            if (this.selectors[i].name == name) {
                return this.selectors[i];
            }
        }
        throw "Selector not found";
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

    getRepresentations(){
        return this.representations;
    }

    getSelectors(){
        return this.selectors;
    }
}

module.exports = Diagram;
