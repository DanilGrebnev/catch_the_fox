function getRandomId () {
    return Math.floor(Math.random() * 100000)
}
//Получаем случайное число
function getRandom(min = 1, max = 9) {
    // случайное число от min до (max+1)
    const rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
}
//Генерация и таблицы
const setTable = (table, n = 10) => {
    for (let i = 1; i < n; i++) {
        let s = ''
        for (let k = 1; k < n; k++) {
            s += `<td data-x="${k}" data-y="${i}" data-id="${getRandomId()}"></td>`
        }
        table.innerHTML += s
    }
}

const $table = document.querySelector('table tbody')
setTable($table)

//генерация объекта со случайными координатами лис
const getRandomFox = (n = 5) => {
    let arr = []
    for (let i = 0; i < n; i++) {
        let rand = { x: getRandom(), y: getRandom() }
        arr.forEach(el => {
            if (el.x === rand.x && el.y === rand.y) {
                arr = arr.filter(elem => elem !== el)
                arr.push({ x: getRandom(), y: getRandom() })
            }
        })
        arr.push(rand)
    }
    return arr
}

let a = getRandomFox(5)

//Проверка на попадание в лису
function hitInFox(x, y, e) {
    const check = el => {
        if (+el.x === x && +el.y === y) {
            return true
        }
    }
    if (a.some(check)) {
        e.target.style = 'none'
        e.target.classList.add('fox')
        return true
    }
}

//Можно будет выводить подсказку и местонахождении лис
function searchFox() {
    const $allTd = document.querySelectorAll('td')
    $allTd.forEach(td => {
        a.forEach(fox => {
            if (+td.dataset.x === +fox.x && +td.dataset.y === +fox.y) {
                td.style.background = 'blue'
            }
        })
    })
}
function checkArr(arr, id) {
    if (arr.includes(id)) return true
    arr.push(id)
}
export { getRandom, setTable, getRandomFox, hitInFox, searchFox, checkArr, a, $table }
