class ControllerBanCo {
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
        //UC-1
        if (event.target === this.view.btnHint) {
            //UC-2
            let list2CardHint = this.model.get2CardCanConnect();
            console.log(list2CardHint);
            //UC-3
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

        // UC1-2.
        let {row, col} = this.findRowColOfButton(this.view.arr2dBtn, event);
        if (row !== -1) {
            this.view.removeDrawLine();
            // UC1-3.
            this.model.changeStatusCellChoose(row, col);
            // UC1-4.
            this.updateViewBoard();
            // UC1-5.
            let listCellChoose = this.model.listCellChoose;
            // UC1-6.
            if (listCellChoose.length === 2) {
                // UC1-6.1.
                let stackRoad = this.model.findRoadAmong2Card(this.model.listCellChoose[0], this.model.listCellChoose[1]);
                console.log("dfs thôi: " + stackRoad.length + " cell");
                // UC1-6.2.
                if (stackRoad.length > 0) {
                    let listCellVertex = this.model.getListCellVertexFromStack(stackRoad);
                    let listBtnConnect = [];
                    for (let m = 0; m < listCellVertex.length; m++) {
                        let rowTemp = listCellVertex[m].i;
                        let colTemp = listCellVertex[m].j;
                        listBtnConnect.push(this.view.arr2dBtn[rowTemp][colTemp]);
                    }
                    console.log("Có " + (listBtnConnect.length - 1) + " cạnh");

                    this.view.setListBtnConnect(listBtnConnect);
                    // UC1-6.2.1.
                    this.view.drawConnectLine(listCellVertex);

                    setTimeout(function () {
                        // UC1-6.2.2.
                        this.view.removeDrawLine();
                    }.bind(this), 800);

                    // UC1-6.2.3.
                    this.set2CardTo0(this.model.listCellChoose[0], this.model.listCellChoose[1]);

                    console.log("2 card nối thành công");
                    // UC1-6.2.4.
                    this.updateViewBoard();
                    // UC1-6.2.5.
                    let isEndGame = this.model.checkEndGame();
                    if (isEndGame) { // UC1-6.2.6.
                        // UC1-6.2.6.1.
                        alert("Bạn đã chiến thắng, hãy thử sức ở những level cao hơn nhé!");
                        console.log("Chiến thắng");
                    } else { // UC1-6.2.7.
                        // UC1-6.2.7.1.
                        this.model.randomUntilBoardCanSolve();
                        // UC1-6.2.7.2.
                        this.updateViewBoard();
                    }
                } else {
                    console.log("2 card ko nối dc");
                }
                // UC1-6.3.
                this.model.clearListCellChoose();
                // UC1-6.4.
                this.updateViewBoard();
            }
        }
    }

    set2CardTo0(cell1, cell2) {
        this.model.setCardInBoard(cell1.i, cell1.j, 0);
        this.model.setCardInBoard(cell2.i, cell2.j, 0);
    }

    findRowColOfButton(arr2dBtn, event) {
        for (let i = 0; i < arr2dBtn.length; i++) {
            for (let j = 0; j < arr2dBtn[i].length; j++) {
                if (event.target === arr2dBtn[i][j]) {
                    return {row: i, col: j};
                }
            }
        }
        return {row: -1, col: -1};
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