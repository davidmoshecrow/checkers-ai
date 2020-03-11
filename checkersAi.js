'use strict';



class Point{
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x,y){
     this.x = x;
     this.y = y;
    }
}

Array.prototype.clone = function(){
    return JSON.parse(JSON.stringify(this));
}


module.exports = class CheckersAi {

    
    constructor() {
       
        this.black = 1;
        this.white = 2;

        this.blackQ = 3;
        this.whiteQ = 4;

        //grid[y][x]
        this.grid = [
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0]
        ]


        this.isWhiteTurn = true;

    }


    nextTurn() {
        this.isWhiteTurn = !this.isWhiteTurn;
    }


    move(startX,startY,endX,endY) {

        let piece = this.getPiece(startX, startY);
        this.setPiece(startX, startY);
        this.setPiece(endX, endY, piece);
    }

    getPiece(x, y) {
         //grid[y][x]
        return this.grid[y, x];
    }

    setPiece(x, y, value) {
         //grid[y][x]
        this.grid[y, x] = value;
    }

     getMoves(x, y, piece) {
        switch (piece) {
            case this.black:
                return this.getBlackMoves(x, y);
            case this.blackQ:
                return this.getBlackQMoves(x, y);
            case this.white:
                return this.getWhiteMoves(x, y);
            case this.whiteQ:
                return this.getWhiteQMoves(x, y);
        }
    }
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @return {Point[]} list of moves
     */
    getBlackMoves(x, y) {
        /**@type {Point[]}*/
        let moves = [];
        if (y < 7) {
            if (x > 0) {
                if (this.getPiece(x - 1, y + 1) == 0) {
                    moves.push({ x: x - 1, y: y + 1 });
                }
            }
            if (x < 7) {
                if (this.getPiece(x + 1, y + 1) == 0) {
                    moves.push({ x: x + 1, y: y + 1 });
                }
            }
        }
        return moves;
    }

    /**
     * @description get all moves that a black piece can capture
     * @param {number} x 
     * @param {number} y
     * @returns {Point[]}
     */
    getBlackCaptureMoves(x, y) {
        /** @type Point[] */
        let moves = []
        if (y < 6) {
            if (x > 1) {
                if ((this.getPiece(x - 1, y + 1) == this.white || this.getPiece(x - 1, y + 1) == this.whiteQ) && this.getPiece(x - 2, y + 2) == 0) {
                    moves.push(new Point(x - 2,y + 2));
                }
            }
            if (x < 6) {
                if ((this.getPiece(x + 1, y + 1) == this.white || this.getPiece(x + 1, y + 1) == this.whiteQ) && this.getPiece(x + 2, y + 2) == 0) {
                    moves.push(new Point(x + 2,y + 2));
                }
            }
        }

        return moves;
    }
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    getWhiteMoves(x, y) {
        let moves = [];
        if (y > 0) {
            if (x > 0) {
                if (this.getPiece(x - 1, y - 1) == 0) {
                    moves.push({ x: x - 1, y: y - 1 });
                }
            }
            if (x < 7) {
                if (this.getPiece(x + 1, y - 1) == 0) {
                    moves.push({ x: x + 1, y: y - 1 });
                }
            }
        }

        return moves;
    }
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @returns {Point[]}
     */
    getWhiteCaptureMoves(x, y) {
        /** @type Point[] */
        let moves = []
        if (y > 1) {
            if (x > 1) {
                if ((this.getPiece(x - 1, y - 1) == this.black || this.getPiece(x - 1, y - 1) == this.blackQ) && this.getPiece(x - 2, y - 2) == 0) {
                    moves.push({ x: x - 2, y: y - 2 });
                }
            }
            if (x < 6) {
                if ((this.getPiece(x + 1, y - 1) == this.black || this.getPiece(x + 1, y - 1) == this.blackQ ) && this.getPiece(x + 2, y - 2) == 0) {
                    moves.push({ x: x + 2, y: y - 2 });
                }
            }
        }
        return moves;
    }
     
    getBlackQMoves(x, y) {
        let moves = [];

        if (y < 7) {
            if (x > 0) {
                if (this.getPiece(x - 1, y + 1) == 0) {
                    moves.push({ x: x - 1, y: y + 1 });
                }
            }
            if (x < 7) {
                if (this.getPiece(x + 1, y + 1) == 0) {
                    moves.push({ x: x + 1, y: y + 1 });
                }
            }
        }
        if (y > 0) {
            if (x > 0) {
                if (this.getPiece(x - 1, y - 1) == 0) {
                    moves.push({ x: x - 1, y: y - 1 });
                }
            }
            if (x < 7) {
                if (this.getPiece(x + 1, y - 1) == 0) {
                    moves.push({ x: x + 1, y: y - 1 });
                }
            }
        }
        return moves;
    }
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @returns {Point[]}
     */
    getBlackQCaptureMoves(x, y) {
        /** @type Point[]  */
        let moves = [];
        if (y < 6) {
            if (x > 1) {
                if ((this.getPiece(x - 1, y + 1) == this.white || this.getPiece(x - 1, y + 1) == this.whiteQ) && this.getPiece(x - 2, y + 2) == 0) {
                    moves.push({ x: x - 2, y: y + 2 });
                }
            }
            if (x < 6) {
                if ((this.getPiece(x + 1, y + 1) == this.white || this.getPiece(x + 1, y + 1) == this.whiteQ) && this.getPiece(x + 2, y + 2) == 0) {
                    moves.push({ x: x + 2, y: y + 2 });
                }
            }
        }
        if (y > 1) {
            if (x > 1) {
                if ((this.getPiece(x - 1, y - 1) == this.white || this.getPiece(x - 1, y - 1) == this.whiteQ) && this.getPiece(x - 2, y - 2) == 0) {
                    moves.push({ x: x - 2, y: y - 2 });
                }
            }
            if (x < 6) {
                if ((this.getPiece(x + 1, y - 1) == this.white || this.getPiece(x + 1, y - 1) == this.whiteQ) && this.getPiece(x + 2, y - 2) == 0) {
                    moves.push({ x: x + 2, y: y - 2 });
                }
            }
        }
        return moves;
    }

    getWhiteQMoves(x, y) {
        let moves = [];

        if (y < 7) {
            if (x > 0) {
                if (this.getPiece(x - 1, y + 1) == 0) {
                    moves.push({ x: x - 1, y: y + 1 });
                }
            }
            if (x < 7) {
                if (this.getPiece(x + 1, y + 1) == 0) {
                    moves.push({ x: x + 1, y: y + 1 });
                }
            }
        }
        if (y > 0) {
            if (x > 0) {
                if (this.getPiece(x - 1, y - 1) == 0) {
                    moves.push({ x: x - 1, y: y - 1 });
                }
            }
            if (x < 7) {
                if (this.getPiece(x + 1, y - 1) == 0) {
                    moves.push({ x: x + 1, y: y - 1 });
                }
            }
        }
        return moves;
    }

    getWhiteQCaptureMoves(x, y) {
        let moves = [];
        if (y < 6) {
            if (x > 1) {
                if ((this.getPiece(x - 1, y + 1) == this.black || this.getPiece(x - 1, y + 1) == this.blackQ) && this.getPiece(x - 2, y + 2) == 0) {
                    moves.push({ x: x - 2, y: y + 2 });
                }
            }
            if (x < 6) {
                if ((this.getPiece(x + 1, y + 1) == this.black || this.getPiece(x + 1, y + 1) == this.blackQ) && this.getPiece(x + 2, y + 2) == 0) {
                    moves.push({ x: x + 2, y: y + 2 });
                }
            }
        }
        if (y > 1) {
            if (x > 1) {
                if ((this.getPiece(x - 1, y - 1) == this.black || this.getPiece(x - 1, y - 1) == this.blackQ) && this.getPiece(x - 2, y - 2) == 0) {
                    moves.push({ x: x - 2, y: y - 2 });
                }
            }
            if (x < 6) {
                if ((this.getPiece(x + 1, y - 1) == this.black || this.getPiece(x + 1, y - 1) == this.blackQ) && this.getPiece(x + 2, y - 2) == 0) {
                    moves.push({ x: x + 2, y: y - 2 });
                }
            }
        }
        return moves;
    }

   
}