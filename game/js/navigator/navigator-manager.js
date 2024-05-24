import MAP_CONFIG from "../config/map.js";
/* global Phaser */
/*
 * Top level manager
 */
export default class NavigatorManager {

    constructor(scene) {
       this.scene = scene;
    }

    getIntersection (_x, _y) {
        return this.scene.exterior.getBlockNodeProperties(_x,_y);
    }

    getIntersectionStreetNames (_x,_y) {
        var node = this.getIntersection(_x,_y);
        var branches = [];
        if (node != null) {
            if (node.streets.n.found == 1) {
                branches.push(node.streets.n.name);
            }
            if (node.streets.e.found == 1) {
                branches.push(node.streets.e.name);
            }
            if (node.streets.s.found == 1) {
                if (branches.includes(node.streets.s.name) == false) {
                    branches.push(node.streets.s.name);
                }
            }
            if (node.streets.w.found == 1) {
                if (branches.includes(node.streets.w.name) == false) {
                    branches.push(node.streets.w.name);
                }
            }
        }
        return branches;
    }

    getIntersectionStreetString (_x,_y) {
        var names = this.getIntersectionStreetNames(_x,_y);
        var string = "";
        for (var i=0; i < names.length; i++) {
            string += names[i];
            if (i < names.length-1) {
                string += " and ";
            }
        }
        return string;
    }

    getDirectionMoved (start, end) {
        if (start[0] != end[0]) {
            if (start[0] < end[0]) {
                return 'e';
            }
            else {
                return 'w';
            }
        }
        else {
            if (start[1] < end[1]) {
                return 's';
            }
            else {
                return 'n';
            }
        }
    }

    routeStep (route,step=0,type='intersection') {
        if (type == 'intersection') {
            return this.routeIntersectionStep(route,step);
        }
    }

    routeIntersectionStep (route,step=0) {
        var node = this.getIntersection(route[step][0],route[step][1]);
        if (node != null) {
            if (step == 0) {
                var intersection_string = this.getIntersectionStreetString(route[step][0],route[step][1]);
                return "Start at "+intersection_string+"\n";
            }
            else if (step < route.length) {
                var direction = this.getDirectionMoved([route[step-1][0],route[step-1][1]],[route[step][0],route[step][1]]);

                if (direction == 'n') {
                    if (node.streets.n.found == 1) {
                        return "Go North on "+node.streets.n.name+"\n";
                    }
                }
                else if (direction == 'e') {
                    if (node.streets.e.found == 1) {
                        return "Go East on "+node.streets.e.name+"\n";
                    }
                }
                else if (direction == 'w') {
                    if (node.streets.w.found == 1) {
                        return "Go West on "+node.streets.w.name+"\n";
                    }
                }
                else if (direction == 's') {
                    if (node.streets.s.found == 1) {
                        return "Go South on "+node.streets.s.name+"\n";
                    }
                }
            }
        }
    }

    routeStepsArray (solution, type='intersection') {
        var steps = [];
        for (var i=0; i < solution.length; i++) {
            var step = this.routeStep(solution,i,type);
            steps.push(step);
        }
        return steps;
    }

    getFullRoute (a_x,a_y,b_x,b_y,type='intersection') {
        return this.plotRoutes(a_x,a_y,b_x,b_y,type);
    }

    plotRoutes (a_x,a_y,b_x,b_y,type='intersection') {
        console.log("Plotting route from "+a_x+","+a_y+" to "+b_x+","+b_y);
        var start = [a_x,a_y];
        var end = [b_x,b_y];
    
        var visited = [];
        var parents = [];
        var obey_laws = true;
        var solved = false;

        // Build a frontier from the next open intersections
        var frontier = [start];
        var solution = [];
        // While the frontier is populated...
        var counter = 0;
        while (frontier.length > 0 && !solved) {
            
            counter++;
            
            var next_ints = this.findRouteOptions(frontier,visited,type);
            visited.push(frontier[0]);
            
            for (var n = 0; n < next_ints.length;n++) {
                if (!visited.includes(next_ints[n]) && !frontier.includes(next_ints[n])) {
                    frontier.push(next_ints[n]);
                    parents.push([next_ints[n],frontier[0]]);
                    if (next_ints[n][0] == end[0] && next_ints[n][1] == end[1]) {
                        solved = true;
                        var place = frontier[0];
                        solution = [next_ints[n],frontier[0]];
                        while (place != start) {
                            for (var d = 0; d < parents.length; d++) {
                                if (parents[d][0] == place) {
                                    place = parents[d][1];
                                    solution.push(place);
                                }
                            }
                        }
                    }
                }
            }
            frontier.shift();
            if (counter > 10000) {
                console.log("Wayfinding counter exceeded 10000!");
                break;
            }
        }
        var way = solution.reverse();
        if (type == 'intersection') {
            return this.routeStepsArray(way,'intersection');
        }
        if (type == 'tile') {
            console.log('Solution:');
            console.log(way);
            return this.highlightRoute(way);
        }
        return way;
    }

    highlightRoute (route) {
        for (var i=0; i < route.length; i++) {
            this.scene.exterior.ground.highlightTile(route[i][0],route[i][1]);
        }
    }

    findRouteOptions (frontier,visited,type='intersection') {
        switch (type) {
            case 'intersection':
                return this.findIntersectionRouteOptions(frontier,visited);
            case 'tile':
                return this.findTileRouteOptions(frontier,visited);
        }
        return [];
    }

    findTileRouteOptions (frontier,visited, pref='CHILD') {
        var _x = frontier[0][0];
        var _y = frontier[0][1];
        var branches = [];
        var favored = 100;
        for (var y=-1; y < 2; y++) {
            for (var x=-1; x < 2; x++) {
                if (x == 0 && y == 0) {
                    continue;
                }
                if (x == -1 && y == 1) {
                    continue;
                }
                if (x == -1 && y == -1) {
                    continue;
                }
                if (x == 1 && y == -1) {
                    continue;
                }
                if (x == 1 && y == 1) {
                    continue;
                }
                var tile_x = _x + x;
                var tile_y = _y + y;
                
                if (!this.compareCoordinates(visited,[tile_x,tile_y]) && !this.compareCoordinates(frontier,[tile_x,tile_y])) {
                    var tile = this.scene.exterior.ground.getGround(tile_x,tile_y);
                    if (tile != undefined) {
                        if (tile[pref+"PREF"] <= favored) {
                            favored = tile[pref+"PREF"];
                            branches.unshift([tile_x,tile_y]);
                        }
                        else {
                            branches.push([tile_x,tile_y]);
                        }
                    }
                }
            }
        }
        return branches;
    }
    
    findIntersectionRouteOptions (frontier,visited) {
        var _x = frontier[0][0];
        var _y = frontier[0][1];
        var branches = [];
        if (!this.compareCoordinates(visited,[_x,_y])) {
            var node = this.getIntersection(_x,_y);
            if (node != null) {
                if (node.streets.n.found == 1) {
                    var dir = node.streets.n.dir;
                    if (dir == 'n' || dir == 'ns') {
                        var connect = node.streets.n.connect;
                        branches.push([_x,connect]);
                    }
                }
                if (node.streets.e.found == 1) {
                    var dir = node.streets.e.dir;
                    if (dir == 'e' || dir == 'ew') {
                        var connect = node.streets.e.connect;
                        branches.push([connect, _y]);
                    }
                }
                if (node.streets.w.found == 1) {
                    var dir = node.streets.w.dir;
                    if (dir == 'w' || dir == 'ew') {
                        var connect = node.streets.w.connect;
                        branches.push([connect,_y]);
                    }
                }
                if (node.streets.s.found == 1) {
                    var dir = node.streets.s.dir;
                    if (dir == 's' || dir == 'ns') {
                        var connect = node.streets.s.connect;
                        branches.push([_x,connect]);
                    }
                }
            }
        }
        return branches;
    }


    // Compare [x,y] coordinates to an array of coordinates and return true if the coordinate is found
    compareCoordinates(coordinates, target) {
        for (let i = 0; i < coordinates.length; i++) {
            const [x, y] = coordinates[i];
            if (x === target[0] && y === target[1]) {
                return true;
            }
        }
        return false;
    }
}