const sudokuBox = document.getElementById("sudokuBox");
const sudokuBoxInfo = document.getElementById("sudokuInfo");
const resultInfo = document.getElementById("resultInfo");

const messageArrayExample = `* Put a correct datas like:
[
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
]`;
const messageSeccesfull = `* Sudoku has successful solution.`;
const zeroInfo = `* Sudoku has empty value 0.`;
const validNumbersInfo = `* Sudoku must contain only a values 
of 1 to 9.`;
const rowInfo = `* Sudoku has invalid row(s).`;
const columnInfo = `* Sudoku has invalid Column(s).`;
const squareInfo3x3 = `* Sudoku has invalid square(s) 3x3.`;
const trueInfo = "return: true";
const falseInfo = "return: false";

function validSolution() {

    if(!isValidSudokuString(sudokuBox.value))
    {
        showErrorMessage(messageArrayExample);
        return false;
    }

    let arr =  textToTwoDimensionalArray();
    
    if(hasZero(arr))
    {
        showErrorMessage(zeroInfo);
        return false;
    }
    if(hasValidNumbers(arr))
    {
        showErrorMessage(validNumbersInfo);
        return false;
    }
    if(!isValidRows(arr))
    {
        showErrorMessage(rowInfo);
        return false;
    }
    if(!isValidColumn(arr))
    {
        showErrorMessage(columnInfo);
        return false;
    }
    if(!isValid3x3(arr))
    {
        showErrorMessage(squareInfo3x3);
        return false;
    }

    showSuccessfulMessage();
    return true;
}

function showErrorMessage(message) {
    sudokuBoxInfo.innerHTML = `<pre class="active-error">${message}</pre>`;
    resultInfo.textContent = falseInfo;
}
function showSuccessfulMessage() {
    sudokuBoxInfo.classList.remove("active-error");
    sudokuBoxInfo.innerHTML = `<pre class="active-successful">${messageSeccesfull}</pre>`;
    resultInfo.textContent = trueInfo;
}
function textToTwoDimensionalArray() {
    text = sudokuBox.value.replace(/\n|\[|\]|\s/g, '');
    const arrayString = text.split(',');
    const twoDimensionalArray = [];
  
    for(let i = 0; i < arrayString.length; i += 9) {
      twoDimensionalArray.push(arrayString.slice(i, i + 9));
    }
  
    return twoDimensionalArray.map(row => row.map(cell => parseInt(cell)));
}

function isValidSudokuString(inputString) {
    const regex = /^\[\s*\[[\d\s,]*\],\s*\[[\d\s,]*\],\s*\[[\d\s,]*\],\s*\[[\d\s,]*\],\s*\[[\d\s,]*\],\s*\[[\d\s,]*\],\s*\[[\d\s,]*\],\s*\[[\d\s,]*\],\s*\[[\d\s,]*\]\s*\]$/;
    return regex.test(inputString.trim());
  }
function hasZero(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let y = 0; y < arr[i].length; y++) {
            if (typeof arr[i][y] !== "number" || arr[i][y] === 0) {
                return true;
            }
        }
    }
    return false;
}
function hasValidNumbers(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          if (arr[i][j] < 0 || arr[i][j] > 10) {
            return true;
          }
        }
      }
      return false;
}
function isValidRows(arr) {
    for (let i = 0; i < 9; i++) {
        const seen = {};
        for (let j = 0; j < 9; j++) {
            const value = arr[i][j];
            if (seen[value]) {
              return false;
            }
            seen[value] = true;
        }
      }

    return true;
}
function isValidColumn(arr) {
    for (let i = 0; i < 9; i++) {
        const seen = {};
        for (let j = 0; j < 9; j++) {
            const value = arr[j][i];
            if (seen[value]) {
                return false;
            }
            seen[value] = true;
        }
      }

    return true;
}
function isValid3x3(arr) {
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
          const seen = {};
          for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                const value = arr[i + x][j + y];
                if (seen[value]) {
                    return false;
                }
                seen[value] = true;
                }
          }
        }
      }

    return true;
}