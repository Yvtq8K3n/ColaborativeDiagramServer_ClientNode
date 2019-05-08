/*jshint esversion: 6 */

var Representation = require('./representation.js');

const ORIGIN = {x:0.5, y:0.5}

class RepresentationSimple extends Representation{

    constructor(name, points, creator, rotation = 0) {
        super(name, "basic", points.length, creator);
        this.points = points;

        //Apply rotation if not 0
        if (rotation != 0) this.rotatePoints(rotation);
    }

    /*Generates a Regular Polygon based in:
    * @param name a simple designation of the shape
    * @param edge will define the shape triangle - 3, rectangle - 4 
    * @param rotation in radians
    */
    static generatePolygon(name, edge, rotation, creator = "@SCD") {
        let points = [];

        //Based in the amount of edges creates the points
        let angle =  2 * Math.PI / edge;

        //Create the starting point and adds it
        points.push({id:0, x:ORIGIN.x, y:0});

        //Generates points based in the Previous Points
        for(let i=1; i<edge; i++){
            let previous = points[i-1];
            let newPoint = this.rotatePoint(angle, previous.x , previous.y);
            points.push({id:i, x:newPoint.x, y:newPoint.y});
        }
        return new RepresentationSimple(name, points, creator, rotation);
    }

    /** Rotates all points
     * @param rotation angle in radians
     */
    rotatePoints(rotation) {
        for(let i=0; i < this.points.length; i++){
            let newPoint = Representation.rotatePoint(rotation, this.points[i].x , this.points[i].y);

            //Rotate Point
            this.points[i].x = newPoint.x; this.points[i].y = newPoint.y;
        }
    }


     

    //A method that delegates moviment to a point
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

    //A method that delegates moviment reflecting other point moviment
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

module.exports = RepresentationSimple, Representation;
