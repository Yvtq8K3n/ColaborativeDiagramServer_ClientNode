/*jshint esversion: 6 */
var Representation = require('./representation.js');

class RepresentationComposed extends Representation{

    constructor(name, parentrepresentation, creator, rotation = 0) {
        super(name, "composed", parentrepresentation.size, creator);
        this.parent = parentrepresentation;
        this.children = [];

        //Apply rotation if not 0
        if (rotation != 0) this.rotatePoints(this.parent, rotation);
    }

     /** Rotates parent points
     * @param rotation angle in radians
     */
    rotatePoints(representation, rotation) {
        if (representation.type=="composed"){
            this.rotation(representation.parent, rotation);
            return;
        }

        let points = representation.points;
        for(let i=0; i < points.length; i++){
            let newPoint = Representation.rotatePoint(rotation, points[i].x , points[i].y);

            //Rotate Point
            points[i].x = newPoint.x; points[i].y = newPoint.y;
        }
    }

    //Normal percentage varies betwen 0-1
    addChildren(representation, region, percentage, creator){

        //Moves the points to the desired position
        this.shiftPosition(representation, region, percentage);

        //Add children
    	this.children.push({id: this.children.length, representation: representation, region: region});

        //Adds a log registry 
        this.changed_by.push({
            changed_by: creator, 
            changed_at: new Date(), 
            summary: representation.name + " has been added has child."
        });

        return this.children.length-1;
    }

    //!!VER MELHOR
    //An method that reajust the position of the points
    //based in the region and the percentage
    shiftPosition(representation, region, percentage){
        if (representation.type=="composed"){
            this.shiftPosition(representation.parent, region, percentage);
            representation.children.forEach((element) => {
                this.shiftPosition(element.representation, region, percentage);
            });
            return;
        }

        let points = representation.points;
        //Converts to the given percentage
        for(let i=0; i< points.length; i++){
            points[i].id = this.size++;
            points[i].x = points[i].x * percentage;
            points[i].y = points[i].y * percentage;
        }

        //Moves based on region
        for(let i=0; i<points.length; i++){
            //Re-positinate based on Region
            if (region.x == 0.5) points[i].x = points[i].x + (1 - percentage)/2;
            if (region.y == 0.5) points[i].y = points[i].y + (1 - percentage)/2;

            //Moves points into the correct region
            if (region.x == 1) points[i].x = 1 - points[i].x;
            if (region.y == 1) points[i].y = 1 - points[i].y;
        }
    }

    //GridLayout
    /*addChildren(representation, region){
        let points = representation.points;


        //Converts to a 1/3 scale
        for(let i=0; i<points.length; i++){
            points[i].id = this.size++;
            points[i].x = points[i].x / 3;
            points[i].y = points[i].y / 3;
        }

        //Position the grid in the curret place 
        for(let i=0; i<points.length; i++){
            points[i].x = points[i].x * Math.round(region.x/0.3);
            points[i].y = points[i].y * Math.round(region.y/0.3);
        }

        this.children.push({representation: representation, region: region});
    }

    /*A method that delegates moviment to a point*/
    /*addMovimentConstraint(pointId, movimentType, creator){
        this.points[pointId][movimentType] = true;
        this.points[pointId].affected = [];

        //Adds a log registry 
        this.changed_by.push({
            changed_by: creator, 
            changed_at: new Date(), 
            summary:"A moviment restriction has been added to point "+ pointId
        });
    }*/

    /*A method that delegates moviment reflecting other point moviment */
    /*addMovimentRelativeConstraint(pointId, referenceId, movimentType, creator, inverse = true,){
        //Adds the Parent reference as well as if its moviment is opposite or not
        this.points[pointId].reference = referenceId;
        this.points[pointId][movimentType] = true;
        this.points[pointId].inverse = inverse;

        //Adds to Parent as a list
        this.points[referenceId].affected.push(pointId);

        //Adds a log registry 
        this.changed_by.push({
            name: creator, 
            changed_at: new Date(), 
            summary:"A moviment restriction related to point "+referenceId+" has been added on point "+ pointId
        });
    }*/
}

module.exports = RepresentationComposed, Representation;
