/*jshint esversion: 6 */

const ORIGIN = {x:0.5, y:0.5}

class Content {
    constructor(name, points, creator, rotation = 0) {
        this.name = name;
        this.type = "basic";
        this.points = points; 
        this.creator = creator;
        this.changed_by = [];
        this.size = points.length;

        //Apply rotation if not 0
        if (rotation != 0) this.rotatePoints(rotation);

        //Adds a log registry 
        this.changed_by.push({
            changed_by: creator, 
            changed_at: new Date(), 
            summary:"Content was successfully created."
        });
    }

    /*Generates a Regular Polygon based in:
    * @param name a simple designation of the shape
    * @param edge will define the shape triangle - 3, rectangle - 4 
    * @param rotation in radians
    */
    static generatePolygon(name, edge, rotation) {
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
        return new Content(name, points, "@SCD", rotation);
    }

    /** Rotates all points
     * @param rotation angle in radians
     */
    rotatePoints(rotation) {
        for(let i=0; i < this.points.length; i++){
            let newPoint = Content.rotatePoint(rotation, this.points[i].x , this.points[i].y);

            //Rotate Point
            this.points[i].x = newPoint.x; this.points[i].y = newPoint.y;
        }
    }


     /** Utilizes the math property: x′=xcosθ−ysinθ AND y′=ycosθ+xsinθ
     * in order to calculate the new rotated point position.
     * However since the point inst (0,0) we need to translate it to it and revert
     * @param angle Amount of rotation wanted the new point to move
     * @param px coordinateX of the point that will suffer rotation
     * @param py coordinateY of the point that will suffer rotation
     * @return
     */
    static rotatePoint(angle, px, py)
    {
        let s = Math.sin(angle);
        let c = Math.cos(angle);

        // translate point back to origin:
        px -= ORIGIN.x;
        py -= ORIGIN.y;

        // rotate point
        let xnew = px * c - py * s;
        let ynew = px * s + py * c;

        // translate point back:
        px = xnew + ORIGIN.x;
        py = ynew + ORIGIN.y;

        return {x: px.toFixed(4), y: py.toFixed(4)};
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

module.exports = Content;
