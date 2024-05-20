class ViewBanCo {
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