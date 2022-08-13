import { hitInFox, a, searchFox, setTable, $table, checkArr } from './fn.js'

window.addEventListener('DOMContentLoaded', main)

function main() {
    document.addEventListener('click', getCoord)
    //Счётчик оставшихся шагов
    let steps = 0
    //Счётчик лис в начале игры. Приьбавляется при каждом попадании в лису
    let count = 0
    let $count = document.querySelector('#fox-count')
    const $footer = document.querySelector('#footer')
    let $steps = document.querySelector('#steps')
    const $win = document.querySelector('#win')
    let $pWin = document.querySelector('#win p:nth-child(3)')
    let h1 = document.querySelector('h1')
    let help = document.querySelector('#help')
    //Массив с id ячеек,которые уже были нажаты
    let array = []
    //Показать и скрыть справку
    h1.onclick = () => help.classList.add('active')
    help.onclick = e => e.target.classList.remove('active')
    //Скрыть окно победы
    $win.onclick = e => {
        e.target.classList.remove('active')
        restart()
    }
    //Установить количество шагов
    $steps.innerHTML = "Ходов осталось: " + (45 - steps)

    //Получение координат при нажатии
    function getCoord(e) {
        console.clear()
        let fox = 0
        if (e.target.localName !== 'td') return
        const x = +e.target.dataset.x
        const y = +e.target.dataset.y
        const id = +e.target.dataset.id
        
        //Проверка наличия уже нажатой ячейки
        if(checkArr(array, id)) return
        setSteps()
        if (steps === 45) {
            alert('Хватит бездумно нажимать на ячейки! Включите логику!')
            restart()
        }
        
        // console.log(steps)

        
        //При попадании точно в лису
        if (hitInFox(x, y, e)) {
            
            let div = document.createElement('div')
            div.classList.add('fox')
            $footer.prepend(div)
            count++
            $count.innerText = count

            if (count === a.length) {
                $win.classList.add("active")
                $pWin.innerHTML =`Попыток использовано: <strong>${steps}</strong>`
                return
            }
            return
        }
        //Условие поиска лис
        a.forEach(el => {
            //По горизонтали и вертикали
            if ((+el.x === x) || (+el.y === y)) fox++
            //По диагонали
            if (Math.abs(+el.x - x) === Math.abs(+el.y - y)) fox++
        })
        e.target.classList.add('show')
        e.target.innerText = fox

    }

    //Можно будет выводить подсказку и местонахождении лис
    //searchFox()

    function restart() {
        $footer.innerHTML = ''
        $table.innerHTML = ''
        steps = -1
        $footer.innerHTML = '<div id="fox-count"></div><div id="steps"></div>'
        $count = document.querySelector('#fox-count')
        count = 0
        array = []
        setTable($table)
        //searchFox()
        setSteps()
    }
    
    function setSteps() {
        ++steps
        $steps = document.querySelector('#steps')
        $steps.innerHTML = "Ходов осталось: " + (45 - steps)
    }

    


}


