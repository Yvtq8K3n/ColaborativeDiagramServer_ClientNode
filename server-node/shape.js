/*jshint esversion: 6 */

const ORIGIN = {x:0.5, y:0.5}

class Shape {

    constructor(name, points, rotation = 0, creator) {
        this.name = name;
        this.points = points;
        this.size = points.length;
        this.creator = creator;
        if(rotation!=0) this.rotateShape(rotation);
    }

    /*Generates a Regular Polygon based in:
    * @param name a simple designation of the shape
    * @param edge will define the shape triangle - 3, rectangle - 4 
    * @param rotation in radians
    */
    static generate(name, edge, rotation) {
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
        return new Shape(name, points, rotation, "@SCD");
    }

    /** Rotates all points within the shape
     * @param rotation angle in radians
     */
    rotateShape(rotation) {
        for(let i=0; i < this.points.length; i++){
            let newPoint = Shape.rotatePoint(rotation, this.points[i].x , this.points[i].y);

            //Rotate Point
            this.points[i].x = newPoint.x; this.points[i].y = newPoint.y;
        }
    }


     /** Utilizes the math property: x′=xcosθ−ysinθ AND y′=ycosθ+xsinθ
     * in order to calculate the new rotated point.
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
}

module.exports = Shape;
