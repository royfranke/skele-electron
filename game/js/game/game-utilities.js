export default class GameUtilities {

    constructor() {

    }

    getFacing(facing, up, right, down, left) {
        if (left) {
            if (up) {
                facing = 'nw';
            }
            else if (down) {
                facing = 'sw';
            }
            else {
                facing = 'w';
            }
        }
        else if (right) {
            if (up) {
                facing = 'ne';
            }
            else if (down) {
                facing = 'se';
            }
            else {
                facing = 'e';
            }
        }
        else if (down) {
            facing = 's';
        }
        else if (up) {
            facing = 'n';
        }
        return facing;
    }

}