/*jshint esversion: 6 */
var Element = require('./Element.js');
var Composed = require('./Composed.js')
var Representation = require('./representation.js');
//var RepresentationComposed = require('./Representation.Composed.js');

class Diagram {

    constructor(name, creator) {
        this.diagramId = name;
        this.creator = creator;
        this.elements = [];
        this.representations = [];
        this.generateDefaultElements();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /// Elements                                                                                      ///
    /////////////////////////////////////////////////////////////////////////////////////////////////////

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

    createElement(obj){
        try{
            //Check if object doesn't exist
            this.retrieveElement(obj.name);

        }catch(err) {
        	let element;
        	if (typeof obj.type != "undefined"){

                //Create object
                if (obj.type == "Element.Composed") element = new Composed(obj.name, obj.parent, obj.type, obj.creator);
                else element = new Element(obj.name, obj.points, obj.type, obj.creator);
	           
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

    addElementComposedChild(obj){
        let composed = this.retrieveElement(obj.name);

        obj.children.forEach((children)=>{
            let child = composed.getChildren(children.id);
            if(child == null) {
                composed.addChildren(children.id, children.name, children.start, children.end, obj.creator);
            }
            //else could merge it, basicaly an update like i did on representations
        });
        return composed;
    }

    retrieveElement(name){
        for(var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].name == name) {
                return this.elements[i];
            }
        }
        throw "element not found";
    }

    getElements(){
        return this.elements;
    }




    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /// Representation                                                                                ///
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    createRepresentation(obj, creator){
        try{
            //Check if object doesn't exist
            this.retrieveRepresentation(obj.name);

        }catch(err) {
            let representation = new Representation(obj.name, obj.element, obj.location, obj.size, creator);
            this.representations.push(representation);
            return representation;
        }
        throw "representations already exists";
    }

    retrieveRepresentation(name){
        for(var i = 0; i < this.representations.length; i++) {

            if (this.representations[i].name == name) {
                return this.representations[i];
            }
        }
        throw "representation not found";
    }

    getRepresentations(){
        return this.representations;
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
