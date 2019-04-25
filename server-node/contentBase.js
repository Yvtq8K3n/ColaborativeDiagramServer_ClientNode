/*jshint esversion: 6 */

const ORIGIN = {x:0.5, y:0.5}

class ContentBase {
    constructor(name, type, size, creator) {
        this.name = name;
        this.type = type;
        this.size = size;
        this.creator = creator;
        this.changed_by = [];

        //Adds a log registry 
        this.changed_by.push({
            changed_by: creator, 
            changed_at: new Date(), 
            summary:"Content was successfully created."
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
}

module.exports = ContentBase;
