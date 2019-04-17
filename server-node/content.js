/*jshint esversion: 6 */

class Diagram {
    constructor(name, creator) {
        this.gameID = ID;
        this.creator=creator;
    }

    formatDate(date){
        let fill = function(value){
            return value < 10 ? '0' + value : value;
        }
        return fill(date.getHours()) + ':' + fill(date.getMinutes()) + ':' + fill(date.getSeconds());
    }
}

module.exports = Diagram;
