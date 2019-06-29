/*jshint esversion: 6 */

const ORIGIN = {x:0.5, y:0.5}

class Element {
    constructor(name, type, size, points, creator) {
        this.name = name;
        this.type = type;
        this.size = size;
        this.points = points;
        this.creator = creator;
        this.changed_by = [];

        //Adds a log registry 
        this.changed_by.push({
            changed_by: creator, 
            changed_at: new Date(), 
            summary:"Element was successfully created."
        });
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
        return new Element(name, "Element.Polygon", points.length, points, creator);
    }
}

module.exports = Element;
