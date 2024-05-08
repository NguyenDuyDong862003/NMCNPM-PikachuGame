class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
    }

    toString() {
        return `Cell [i=${this.i}, j=${this.j}]`;
    }

    equals(obj) {
        if (this === obj) return true;
        if (obj == null || this.constructor !== obj.constructor) return false;
        return this.i === obj.i && this.j === obj.j;
    }
}

class GamePikachuModel {

    constructor() {
        this.position4CellAround = [
            [-1, 0, 1, 0],
            [0, 1, 0, -1]
        ];
        // phần tử 0,0 là tọa độ i tương đối của ô bên trên so với ô đang xét
        // phần tử 0,1 là tọa độ i tương đối của ô bên phải so với ô đang xét
        // phần tử 0,2 là tọa độ i tương đối của ô bên dưới so với ô đang xét
        // phần tử 0,3 là tọa độ i tương đối của ô bên trái so với ô đang xét

        // phần tử 1,0 là tọa độ j tương đối của ô bên trên so với ô đang xét
        // phần tử 1,1 là tọa độ j tương đối của ô bên phải so với ô đang xét
        // phần tử 1,2 là tọa độ j tương đối của ô bên dưới so với ô đang xét
        // phần tử 1,3 là tọa độ j tương đối của ô bên trái so với ô đang xét
    }

    setBoard(row, col, numTypeCard, numEach1TypeCard) {
        // ví dụ board có 4 dòng, 3 cột, tổng 12 ô
        // số loại thẻ là 2, thì chỉ có đúng 2 loại thẻ trong board
        // số lượng mỗi loại thẻ là 6

        // row*col phải bằng numTypeCard*numEach1TypeCard
        if (row * col !== numTypeCard * numEach1TypeCard)
            throw new Error("row*col phải bằng numTypeCard*numEach1TypeCard");

        // chứa số thứ tự của ảnh trong icon skin và không trùng nhau
        this.listIconSkin = [];
        for (let i = 1; i <= numTypeCard; i++) {
            let r = Math.floor(Math.random() * this.listNumber.length);
            this.listIconSkin.push(this.listNumber[r]);
            console.log(i + ": " + r + ", " + this.listNumber[r]);
            this.listNumber.splice(r, 1);
        }

        this.row = row + 2;
        this.col = col + 2;

        this.board = [];
        for (let i = 0; i < this.row; i++) {
            let rowTemp = [];
            for (let j = 0; j < this.col; j++) {
                rowTemp.push(0);
            }
            this.board.push(rowTemp);
        }

        // tạo mảng card 1d theo thứ tự ví dụ: 1,1,2,2,3,3,...
        let listCard = [];
        for (let i = 1; i <= numTypeCard; i++) {
            for (let j = 1; j <= numEach1TypeCard; j++) {
                listCard.push(i);
            }
        }

        // Tạo main board từ mảng listCard và xáo trộn ngẫu nhiên
        this.setMainBoardFromArr1d(listCard);
        this.randomMainBoard();
        this.randomUntilBoardCanSolve();
        this.printBoard();

        this.listCellChoose = [];
    }

    setLevel(level) {
        // trong thự mục icon skin các ảnh có tên dưới dạng: 1.png, 2.png,... nhưng 1 số ảnh không có ví dụ như: 11.png,...
        // listNumber tổng hợp các số thứ tự hợp lệ trong thư mục icon skin
        // mỗi khi setLevel thì phải khôi phục listNumber vì sau khi random những ảnh ra thì phần tử trong listNumber cũng bị xóa đi
        this.listNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 231, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 262, 263, 265, 266, 267, 270, 271, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 313, 314, 315, 316, 317, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 331, 332, 333, 334, 335, 336, 337, 338, 339, 343, 344, 345, 346, 347, 349, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545];
        this.level = level;
        if (this.level === 1) {
            this.setBoard(8, 16, 8, 16);
        }
        if (this.level === 2) {
            this.setBoard(8, 16, 16, 8);
        }
        if (this.level === 3) {
            this.setBoard(8, 16, 32, 4);
        }
    }

    changeStatusCellChoose(cellChoose) { // khi cell được click thì thêm vào listCellChoose, click lần nữa thì xóa ra
        let index = this.listCellChoose.indexOf(cellChoose)
        if (index === -1)
            this.listCellChoose.push(cellChoose);
        else
            this.listCellChoose.splice(index, 1);
    }

    setCardInBoard(i, j, ele) {
        this.board[i][j] = ele;
    }

    clearListCellChoose() {
        this.listCellChoose.splice(0, this.listCellChoose.length);
    }

    randomUntilBoardCanSolve() {
        while (this.checkBoardHasCardCanConnect() === false) {
            this.randomMainBoard();
            console.log("Đổi board lại");
        }
    }

    directionFromCell1ToCell2(cell1, cell2) {
        // ví dụ từ cell 1 hướng lên trên là cell 2 --> kết quả là 0
        // kết quả có thể là 1 trong 4 giá trị: 0, 1, 2, 3
        for (let i = 0; i < this.position4CellAround[0].length; i++) {
            if (cell2.i - cell1.i === this.position4CellAround[0][i] && cell2.j - cell1.j === this.position4CellAround[1][i])
                return i;
        }
        return -1;
    }

    getListDirectionFromStack(stack) {
        // ví dụ stack=[cell1,cell2,cell3]
        // nếu kết quả listDirection là [-1,0,1] nghĩa là cell1 đi hướng lên sẽ gặp cell2, cell2 đi sang phải sẽ gặp cell3
        let listResult = [];
        listResult.push(-1); // -1 vì cell đầu tiên không có cell trước đó hướng về cell đầu tiên
        for (let i = 0; i < stack.length - 1; i++) {
            let direction = this.directionFromCell1ToCell2(stack[i], stack[i + 1]);
            listResult.push(direction);
        }
        return listResult;
    }

    printBoard() {
        let result = "";
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                result += this.board[i][j] + "\t";
            }
            result += "\n";
        }
        console.log(result);
    }

    checkEndGame() {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                if (this.board[i][j] !== 0)
                    return false;
            }
        }
        return true;
    }

    getList1dFromMainBoard() {
        let listResult = [];
        for (let i = 1; i < this.row - 1; i++) {
            for (let j = 1; j < this.col - 1; j++) {
                listResult.push(this.board[i][j]);
            }
        }
        return listResult;
    }

    setMainBoardFromArr1d(list1d) {
        // chuyển đổi card từ list 1d vào main board
        let rowMainBoard = this.row - 2;
        let colMainBoard = this.col - 2;

        if (rowMainBoard * colMainBoard !== list1d.length) {
            console.log("list1d có độ dài không hợp lệ");
            return;
        }

        for (let i = 0; i < list1d.length; i++) {
            let rowTemp = Math.floor(i / colMainBoard);
            let colTemp = i % colMainBoard;

            this.board[rowTemp + 1][colTemp + 1] = list1d[i];
        }
    }

    shuffleList(list) {
        let listResult = [];
        for (let i = list.length - 1; i >= 0; i--) {
            let r = Math.floor(Math.random() * list.length);
            listResult.push(list[r]);
            list.splice(r, 1);
        }
        return listResult;
    }

    randomMainBoard() {
        // lấy từ main board ra thành list1d
        let list1dFromMainBoard = this.getList1dFromMainBoard();

        // nếu như board main có ô trống (=0), thì không dc thay đổi vị trí ô
        // trống này, mà chỉ được thay đổi vị trí các card

        // lọc ra thành 1 list1d mới từ list1d mà ko chứa card 0
        let list1dNew = [];
        for (let i = list1dFromMainBoard.length - 1; i >= 0; i--) {
            if (list1dFromMainBoard[i] !== 0) {
                // thêm vào vị trí 0 thì sẽ đúng thứ tự do đang duyệt ngược
                list1dNew.unshift(list1dFromMainBoard[i]);
            }
        }

        // thay đổi vị trí ngẫu nhiên của các phần tử trong list1d mới
        list1dNew = this.shuffleList(list1dNew);
        console.log("Sau khi xáo " + list1dNew);

        // duyệt lại list1d, nếu gặp card 0 thì thêm vào list1d mới card 0 tại vị trí đó luôn
        for (let i = 0; i < list1dFromMainBoard.length; i++) {
            if (list1dFromMainBoard[i] === 0) {
                list1dNew.splice(i, 0, 0);
            }
        }

        // setMainBoard từ list1d mới
        this.setMainBoardFromArr1d(list1dNew);
    }

    getCellNeighbour(cell) {
        let listResult = [];
        for (let i = 0; i < this.position4CellAround[0].length; i++) {
            let iAround = cell.i + this.position4CellAround[0][i];
            let jAround = cell.j + this.position4CellAround[1][i];

            if (iAround < 0 || jAround < 0 || iAround >= this.row || jAround >= this.col) {
                continue;
            }

            listResult.push(new Cell(iAround, jAround));
        }
        return listResult;
    }

    getListCellVertexFromStack(stack) {
        // lấy ra các cell là đỉnh ở trong stack
        let listResult = [];
        let listDirection = this.getListDirectionFromStack(stack);
        for (let i = 0; i < listDirection.length - 1; i++) {
            if (listDirection[i] !== listDirection[i + 1]) {
                listResult.push(stack[i]);
            }
        }
        // phải add cell cuối cùng vô vì cell cuối cùng là đỉnh cuối trong stack
        listResult.push(stack[stack.length - 1]);
        return listResult;
    }

    getNumEdgeFromStack(stack) {
        return this.getListCellVertexFromStack(stack).length - 1;
    }

    getCurrentDirectionFromStack(stack) {
        let listDirection = this.getListDirectionFromStack(stack);
        return listDirection[listDirection.length - 1];
    }

    convertMainBoard2dTo1d() {
        let listResult = [];
        for (let i = 1; i < this.row - 1; i++) {
            for (let j = 1; j < this.col - 1; j++) {
                listResult.push(new Cell(i, j));
            }
        }
        return listResult;
    }

    get2CardCanConnect() {
        let listResult = [];
        let board1d = this.convertMainBoard2dTo1d();
        for (let i = 0; i < board1d.length - 1; i++) {
            for (let j = i + 1; j < board1d.length; j++) {
                let stackRoad = this.findRoadAmong2Card(board1d[i], board1d[j]);
                if (stackRoad.length > 0) {
                    listResult.push(board1d[i]);
                    listResult.push(board1d[j]);
                    return listResult;
                }
            }
        }
        return listResult;
    }

    checkBoardHasCardCanConnect() {
        return this.get2CardCanConnect().length === 2;
    }

    findRoadAmong2Card(cellRoot, cellTarget) {
        let listResult = [];
        // check xem card tại tọa độ root và target có giống nhau không?
        if (this.board[cellRoot.i][cellRoot.j] !== this.board[cellTarget.i][cellTarget.j]) {
            return listResult;
        }
        // check xem cell root và cell target có trùng nhau không?
        if (cellRoot.equals(cellTarget)) {
            return listResult;
        }
        // check xem cell root hoặc cell targrt có là ô trống?
        if (this.board[cellRoot.i][cellRoot.j] === 0 || this.board[cellTarget.i][cellTarget.j] === 0) {
            return listResult;
        }

        listResult = this.dfs2(cellRoot, cellTarget);

        return listResult;
    }

    dfs2(cellRoot, cellTarget) {
        let iRoot = cellRoot.i;
        let jRoot = cellRoot.j;
        let iTarget = cellTarget.i;
        let jTarget = cellTarget.j;

        let stack = [];
        stack.push(cellRoot);
        // tạo mảng 2d lưu các cell đã thăm
        let visited;

        function resetVisited(row, col) {
            visited = [];
            for (let i = 0; i < row; i++) {
                let row = []
                for (let j = 0; j < col; j++) {
                    row.push(false);
                }
                visited.push(row)
            }
        }

        resetVisited(this.row, this.col);

        visited[iRoot][jRoot] = true;

        // sẽ có trường hợp đi từ root về 1 hướng đến tận cùng mà vẫn ko tìm dc đường,
        // nhưng từ root đi qua hướng khác thì đáng lẽ ra phải tìm được,
        // nhưng đã bị chặn bởi những ô đã duyệt từ trước rồi,
        // vì thế cứ mỗi lần pop ra mà chỉ còn ô root,
        // thì đánh dấu là đã đi từ root đến hướng đó rồi,
        // đồng thời phải reset visited
        let visitedFromRoot = [false, false, false, false];

        while (stack.length > 0) {
            let cellPeek = stack[stack.length - 1];

            let cellNeighbours = this.getCellNeighbour(cellPeek);

            let numEdge = this.getNumEdgeFromStack(stack);
            let direction = this.getCurrentDirectionFromStack(stack);

            for (let i = 0; i < cellNeighbours.length; i++) {
                let cellNeighbour = cellNeighbours[i];

                let directionFromCellPeekToCellNeighBour = this.directionFromCell1ToCell2(cellPeek, cellNeighbour);

                if (stack.length === 1) {
                    if (visitedFromRoot[directionFromCellPeekToCellNeighBour] === true) {
                        continue;
                    }
                }

                if (this.board[cellNeighbour.i][cellNeighbour.j] !== 0) {
                    // ô này ko rỗng, (có thẻ chặn đường)
                    // nhưng nếu ô này là tọa độ cần tìm thì vẫn tính hợp lệ
                    if (cellNeighbour.equals(cellTarget))
                        ;
                    else
                        continue;

                }
                // cải thiện để bỏ bớt những đường đi ko cần thiết
                if (numEdge === 2) {
                    if (direction === 1 || direction === 3) {
                        // khi đường đi đã có 2 cạnh mà đang đi hướng theo chiều ngang, thì không xét
                        // những ô xung quanh nằm cùng cột khi
                        // card mục tiêu ko nằm trên cột đó
                        if (directionFromCellPeekToCellNeighBour === 0 || directionFromCellPeekToCellNeighBour === 2) {
                            if (cellNeighbour.j !== jTarget) {
                                continue;
                            }
                        }
                    } else {
                        // khi đường đi đã có 2 cạnh mà đang đi hướng theo chiều lên xuống, thì không
                        // xét những ô xung quanh nằm cùng dòng khi
                        // card mục tiêu ko nằm trên dòng đó
                        if (directionFromCellPeekToCellNeighBour === 1 || directionFromCellPeekToCellNeighBour === 3) {
                            if (cellNeighbour.i !== iTarget) {
                                continue;
                            }
                        }
                    }
                }
                // cải thiện để bỏ bớt những đường đi ko cần thiết
                if (numEdge === 3) {
                    // khi chạy vô đến cái này thì card mục tiêu chắc chắn nằm
                    // cùng hàng hoặc cùng cột tùy hướng đi
                    // khi đường đi đã có 3 cạnh rồi, thì chỉ xét tiếp theo hướng duy nhất đang xét
                    if (direction !== directionFromCellPeekToCellNeighBour) {
                        continue;
                    }
                }

                if (visited[cellNeighbour.i][cellNeighbour.j] !== true) {
                    visited[cellNeighbour.i][cellNeighbour.j] = true;
                    stack.push(cellNeighbour);
                    if (cellNeighbour.equals(cellTarget))
                        return stack;
                    break;
                }
            }

            if (cellPeek.equals(stack[stack.length - 1])) {
                stack.pop();
                if (stack.length === 1) {
                    visitedFromRoot[this.directionFromCell1ToCell2(cellRoot, cellPeek)] = true;
                    resetVisited(this.row, this.col);
                    visited[iRoot][jRoot] = true;
                }
            }
        }
        return stack;
    }
}

class View {
    constructor(row, col) {
        this.rowSize = 50; // height của 1 ô
        this.colSize = 50; // width của 1 ô
        this.lineThickness = 10;

        this.btnHint = document.getElementById("btnHint");
        this.btnSelectLevel = document.getElementById("selectLevel");
        this.btnResetLevel = document.getElementById("btnReset");

        this.resetBoard(row, col);
    }

    resetBoard(row, col) {
        let container = document.getElementById("board");

        // xóa toàn bộ btn cell đi
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        let str = "repeat(" + col + "," + this.colSize + "px)";
        container.style.gridTemplateColumns = str;

        this.arr2dBtn = [];
        for (let i = 0; i < row; i++) {
            let rowTemp = [];
            for (let j = 0; j < col; j++) {
                let div = document.createElement("button");
                div.classList.add("cell");
                container.appendChild(div);
                rowTemp.push(div);
            }
            this.arr2dBtn.push(rowTemp);
        }

        this.arrLine = [];// chứa 3 line và 1 hình tròn
        for (let i = 0; i < 3; i++) {
            let div = document.createElement("div");
            div.classList.add("line");
            container.appendChild(div);
            this.arrLine.push(div);
        }
        let div = document.createElement("div");
        div.classList.add("oval");
        container.appendChild(div);
        this.arrLine.push(div);

        this.listBtnConnect = [];
    }

    updateViewHint(listCellHint) {
        if (listCellHint.length === 0) {
            return;
        }

        for (let k = 0; k < listCellHint.length; k++) {
            let rowTemp = listCellHint[k].i;
            let colTemp = listCellHint[k].j;
            this.arr2dBtn[rowTemp][colTemp].style.backgroundColor = "greenyellow";
        }
    }

    updateCell(ele, listIconSkin, board, i, j) {
        ele.style.backgroundImage = 'url("img/icon skin/' + listIconSkin[board[i][j] - 1] + '.png")';
        ele.style.backgroundPosition = "center";
        ele.style.backgroundSize = "90%";
        ele.style.backgroundRepeat = "no-repeat";
    }

    updateViewBoard(board, listCellChoose, listIconSkin) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] !== 0) {
                    this.updateCell(this.arr2dBtn[i][j], listIconSkin, board, i, j);
                    this.arr2dBtn[i][j].style.backgroundColor = 'white';
                } else {
                    this.arr2dBtn[i][j].style.visibility = "hidden";
                }
            }
        }

        for (let k = 0; k < listCellChoose.length; k++) {
            let rowTemp = listCellChoose[k].i;
            let colTemp = listCellChoose[k].j;
            this.arr2dBtn[rowTemp][colTemp].style.backgroundColor = 'hotpink';
        }
    }

    setListBtnConnect(listBtnConnect) {
        this.listBtnConnect = listBtnConnect;
    }

    removeDrawLine() {
        for (let i = 0; i < this.arrLine.length; i++) {
            this.arrLine[i].style.visibility = "hidden";
        }
    }

    drawConnectLine(listCellVertex) {
        // sẽ chỉ có tối đa 4 cell trong listCellVertex
        // [cell1, cell2, cell3, cell4]
        // cell1 nối đến cell2, cell2 nối cell3,...
        for (let i = 0; i < listCellVertex.length - 1; i++) {
            let cellRoot = listCellVertex[i];
            let cellTarget = listCellVertex[i + 1];

            // dựa trên tọa độ để set pos cho line

            let xRoot = cellRoot.j * this.colSize + this.colSize / 2;
            let yRoot = cellRoot.i * this.rowSize + this.rowSize / 2;

            let xTarget = cellTarget.j * this.colSize + this.colSize / 2;
            let yTarget = cellTarget.i * this.rowSize + this.rowSize / 2;

            let widthLine = Math.abs(xRoot - xTarget);
            let heightLine = Math.abs(yRoot - yTarget);

            if (widthLine === 0) {
                xRoot -= this.lineThickness / 2;
                xTarget -= this.lineThickness / 2;
                heightLine += this.lineThickness;
            }
            if (heightLine === 0) {
                yRoot -= this.lineThickness / 2;
                yTarget -= this.lineThickness / 2;
                widthLine += this.lineThickness;
            }

            let xLine = Math.min(xRoot, xTarget);
            let yLine = Math.min(yRoot, yTarget);

            if (widthLine === 0) { // hình như chỗ này ko xài? có xài
                yLine -= this.lineThickness / 2;
                // heightLine += this.lineThickness;
            }
            if (heightLine === 0) { // hình như chỗ này ko xài? có xài
                xLine -= this.lineThickness / 2;
                // widthLine += this.lineThickness;
            }

            widthLine = Math.max(this.lineThickness, widthLine);
            heightLine = Math.max(this.lineThickness, heightLine);

            let lineTemp = this.arrLine[i];
            lineTemp.style.width = widthLine + "px";
            lineTemp.style.height = heightLine + "px";
            lineTemp.style.top = yLine + "px";
            lineTemp.style.left = xLine + "px";
            lineTemp.style.visibility = "visible";

            if (i === this.listBtnConnect.length - 2) {
                let diameterWidth = 30;
                let diameterHeight = 30;
                let xOval = cellTarget.j * this.colSize + this.colSize / 2 - diameterWidth / 2;
                let yOval = cellTarget.i * this.rowSize + this.rowSize / 2 - diameterHeight / 2;
                let oval = this.arrLine[3];
                oval.style.width = diameterWidth + "px";
                oval.style.height = diameterHeight + "px";
                oval.style.top = yOval + "px";
                oval.style.left = xOval + "px";
                oval.style.visibility = "visible";
            }
        }
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.setLevel(1);
    }

    registerEvent() {
        this.processClickBtn = this.processClickBtn.bind(this);

        this.view.btnHint.addEventListener('click', this.processClickBtn);
        this.view.btnSelectLevel.addEventListener('change', this.processClickBtn);
        this.view.btnResetLevel.addEventListener('click', this.processClickBtn);

        for (let i = 0; i < this.view.arr2dBtn.length; i++) {
            for (let j = 0; j < this.view.arr2dBtn[i].length; j++) {
                this.view.arr2dBtn[i][j].addEventListener('click', this.processClickBtn);
            }
        }
    }

    processClickBtn(event) {
        if (event.target === this.view.btnHint) {
            let list2CardHint = this.model.get2CardCanConnect();
            console.log(list2CardHint);
            this.view.updateViewHint(list2CardHint);
        }

        if (event.target === this.view.btnSelectLevel) {
            let chooseLevel = parseInt(event.target.value);
            this.setLevel(chooseLevel);
        }

        if (event.target === this.view.btnResetLevel) {
            let result = confirm("Bạn có chắc chắn muốn chơi lại màn này không?");
            if (result) {
                console.log("reset")
                this.setLevel(this.model.level);
            } else {
                console.log("Không reset")
            }
        }

        for (let i = 0; i < this.view.arr2dBtn.length; i++) {
            for (let j = 0; j < this.view.arr2dBtn[i].length; j++) {
                if (event.target === this.view.arr2dBtn[i][j]) {
                    this.view.removeDrawLine();
                    this.model.changeStatusCellChoose(new Cell(i, j));

                    this.updateViewBoard();

                    if (this.model.listCellChoose.length === 2) {
                        let stackRoad = this.model.findRoadAmong2Card(this.model.listCellChoose[0], this.model.listCellChoose[1]);
                        console.log("dfs thôi: " + stackRoad.length + " cell");

                        if (stackRoad.length !== 0) {
                            let listCellVertex = this.model.getListCellVertexFromStack(stackRoad);
                            let listBtnConnect = [];
                            for (let m = 0; m < listCellVertex.length; m++) {
                                let rowTemp = listCellVertex[m].i;
                                let colTemp = listCellVertex[m].j;
                                listBtnConnect.push(this.view.arr2dBtn[rowTemp][colTemp]);
                            }
                            console.log("Có " + (listBtnConnect.length - 1) + " cạnh");

                            this.view.setListBtnConnect(listBtnConnect);
                            this.view.drawConnectLine(listCellVertex);

                            setTimeout(function () {
                                this.view.removeDrawLine();
                            }.bind(this), 800);

                            this.model.setCardInBoard(this.model.listCellChoose[0].i, this.model.listCellChoose[0].j, 0);
                            this.model.setCardInBoard(this.model.listCellChoose[1].i, this.model.listCellChoose[1].j, 0);

                            console.log("2 card nối thành công");

                            this.updateViewBoard();

                            if (this.model.checkEndGame()) {
                                console.log("Chiến thắng");
                                alert("Bạn đã chiến thắng, hãy thử sức ở những level cao hơn nhé!");
                            } else {
                                this.model.randomUntilBoardCanSolve();
                                this.updateViewBoard();
                            }
                        } else {
                            console.log("2 card ko nối dc");
                        }
                        this.model.clearListCellChoose();
                        this.updateViewBoard();
                    }
                    return;
                }
            }
        }
    }

    updateViewBoard() {
        this.view.updateViewBoard(this.model.board, this.model.listCellChoose, this.model.listIconSkin);
    }

    setLevel(level) {
        this.model.setLevel(level);
        this.view.resetBoard(this.model.row, this.model.col);
        this.registerEvent();
        this.updateViewBoard();
    }
}

function main() {
    let model = new GamePikachuModel();
    let view = new View(model.row, model.col);
    let controller = new Controller(model, view);
}

main()

// bổ sung các pop up hướng dẫn và giới thiệu thành viên bên dưới
function popUpEvent(event) {
    if (event.target === btnShowPopUp) {
        divPopUp.style.visibility = "visible";
    }
    if (event.target === btnClosePopUp) {
        divPopUp.style.visibility = "hidden";
    }
    if (event.target === btnShowGuide) {
        divGuide.style.visibility = "visible";
    }
    if (event.target === btnCloseGuide) {
        divGuide.style.visibility = "hidden";
    }
}

let btnShowPopUp = document.getElementById("btnMyInfor");
let btnClosePopUp = document.getElementById("btnClosePopUp");

let divPopUp = document.getElementById("popUpMyInfor");

btnShowPopUp.addEventListener("click", popUpEvent);
btnClosePopUp.addEventListener("click", popUpEvent);

let btnShowGuide = document.getElementById("btnGuide");
let btnCloseGuide = document.getElementById("btnCloseGuide");

let divGuide = document.getElementById("popUpGuide");

btnShowGuide.addEventListener("click", popUpEvent);
btnCloseGuide.addEventListener("click", popUpEvent);