(function () {
    let pattern = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    // 当前落子的样式，同时也代表着谁落子
    let color = 1;
    // 胜利则停止落子
    let over = 0;

    // render
    function show() {
        let board = document.getElementById("board");
        board.innerHTML = "" // 清空内容的同时原有挂载的事件也一起销毁了

        // 由于 pattern 是两层结构，故需要用两层 for 
        // 内外两层谁控制行谁控制列视需求而定
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // 如果是要行/列模式访问则是 pattern[i][j]
                // 如果是要列/行模式访问则是 pattern[j][i]
                // 当前需求逻辑是添加 3 个 cell 换一行所以应该使用行/列模式
                let cell = document.createElement("div");
                cell.classList.add("cell");
                board.appendChild(cell);

                cell.innerText =
                    pattern[i][j] == 2 ? "❌" :
                        pattern[i][j] == 1 ? "⭕️" : "";


                // 未结束则可为当前 cell 添加 click handler
                over || cell.addEventListener("click", () => mark(i, j));

            }
            board.appendChild(document.createElement("br"));
        }
    }

    // 落子
    function mark(x /* 行 */, y /* 列 */) {
        pattern[x][y] = color;
        console.log(pattern);

        if (isWin(pattern, color)) {
            console.log(color == 1 ? "⭕️ win" : "❌ win");
            over = 1;
        } else {
            // 判断当前落子的是否存在胜利的可能性
            // willWin(pattern, color)

            // 落子颜色置换
            // color = (color == 1 ? 2 : 1)
            color = 3 - color;

            // 判断下一个落子的是否存在胜利的可能性
            if (willWin(pattern, color)) {
                console.log(color == 1 ? "⭕️ will win" : "❌ will win");
            }
        }

        show();
    }

    // 判断当前落子用户是否胜利✌🏻
    function isWin(pattern, color) {
        // 1. 检查每一行每个落子是否与当前落子相同
        for (let i = 0; i < 3; i++) {
            let win = true;
            for (let j = 0; j < 3; j++) {
                if (pattern[i][j] != color) {
                    win = false;
                    break;
                }
            }

            if (win) return true
        }
        // 2. 检查每一列每个落子是否与当前落子相同
        for (let i = 0; i < 3; i++) {
            let win = true;
            for (let j = 0; j < 3; j++) {
                if (pattern[j][i] != color) {
                    win = false;
                    break;
                }
            }

            if (win) return true
        }
        // 3. 检查每个斜线每个落子是否与当前落子相同
        {
            // 3-1. 第一条斜线左上到右下 ↘ 横纵坐标每个点相同
            let win = true;
            for (let i = 0; i < 3; i++) {
                if (pattern[i][i] != color) {
                    win = false;
                    break;
                }
            }
            if (win) return true
        }

        {
            // 3-2. 第二条斜线右上到左下 ↙️ 横纵坐标关系为 x+y = 2
            let win = true;
            for (let i = 0; i < 3; i++) {
                if (pattern[i][2 - i] != color) {
                    win = false;
                    break;
                }
            }
            if (win) return true
        }
        return false
    }

    function clone(pattern) {
        return JSON.parse(JSON.stringify(pattern))
    }

    function willWin(pattern, color) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (pattern[i][j]) continue;

                let copyPattern = clone(pattern)
                copyPattern[i][j] = color

                if (isWin(copyPattern, color)) {
                    return true
                }
            }
        }

        return false
    }

    show();
})();