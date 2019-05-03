/*jshint esversion: 6 */
var Content = require('./content.js');
var ContentComposed = require('./contentComposed.js');
var ContentBase = require('./contentBase.js');
var Selector = require('./selector.js');

class Diagram {

    constructor(name, creator) {
        this.diagramId = name;
        this.creator = creator;
        this.contents = [];
        this.selectors = [];
        this.generateDefaultContents();
        this.generateDefaultSelectors();
    }

    generateDefaultContents(){
        //Generate Contents
        let none = Content.generatePolygon("None", 0);
        let triangle = Content.generatePolygon("Triangle", 3);
        let square   = Content.generatePolygon("Square", 4, Math.PI/4);
        let rhombus  = Content.generatePolygon("Rhombus", 4);
        let pentagon = Content.generatePolygon("Pentagon", 5);
        let hexagon  = Content.generatePolygon("Hexagon", 6);

        //Adds Contents
        this.contents.push(none, triangle);
        this.contents.push(rhombus, square, pentagon, hexagon);
    }

    generateDefaultSelectors(){
        //Generate Selectors
        let none = new Selector("None");
        let defaultSelector = this.createSelector("Default", this.retrieveContent("Square"), 4);

        //Add Selectors
        this.selectors.push(none, defaultSelector);
    }

    createContent(obj, creator){
        try{
            //Check if object doenst exist
            this.retrieveContent(obj.name);

        }catch(err) {
        	let content;
        	if (typeof obj.points != "undefined"){
	            //Create object
	            content = new Content(obj.name, obj.points, creator, obj.rotation);
	            this.contents.push(content);
	        } else if (typeof obj.edge != "undefined"){
	        	//Create object
	            content = Content.generatePolygon(obj.name, obj.edge, obj.rotation, obj.creator);
	            this.contents.push(content);
	        }


            return content;
        }
        throw "Content already exists";
    }

    createContentComposed(name, parent, creator, rotation){
        //Create content composed
        let contentComposed = new ContentComposed(name, parent, creator, rotation);
        this.contents.push(contentComposed);

        return contentComposed;
    }

    createSelector(name, content, amount, corners, creator = "@SCD"){
        if (amount % 2 != 0) throw "The amount of selectorPoints must be even";

        let selector = new Selector(name, creator);
        selector.addSelectorPoints(content, amount, creator, corners);;
        this.selectors.push(selector);
        
        return selector;
    }

    retrieveContent(name){
        for(var i = 0; i < this.contents.length; i++) {
            if (this.contents[i].name == name) {
                return this.contents[i];
            }
        }
        throw "Content not found";
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

    getShapes(){
        return this.shapes;
    }

    getContents(){
        return this.contents;
    }

    getSelectors(){
        return this.selectors;
    }
}

module.exports = Diagram;
