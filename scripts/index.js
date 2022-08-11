import { hitInFox, a, help, setTable, $table } from './fn.js'

window.addEventListener('DOMContentLoaded', main)

function main() {
    document.addEventListener('click', getCoord)
    let steps = 0
    let count = 0
    let $count = document.querySelector('#fox-count')
    const $footer = document.querySelector('#footer')
    let h1 = document.querySelector('h1')
    let help = document.querySelector('#help')
    //Показать и скрыть справку
    h1.onclick = () => help.classList.add('active')
    help.onclick = e => e.target.classList.remove('active')

    //Получение координат при нажатии
    function getCoord(e) {
        console.clear()
        let fox = 0

        if (e.target.localName !== 'td') return

        if (steps === 45) {
            alert('Хватит бездумно нажимать на ячейки! Включите логику!')
            restart()
        }
        steps++
        console.log(steps)

        const x = +e.target.dataset.x
        const y = +e.target.dataset.y

        //При попадании точно в лису
        if (hitInFox(x, y, e)) {
            let div = document.createElement('div')
            div.classList.add('fox')
            $footer.prepend(div)
            count++
            $count.innerText = count

            if (count === a.length) {
                setTimeout(() => {
                    alert('Поздравляю! Вы нашли всех Лис!')
                }, 300)
                restart()
            } return
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
    // help($allTd)

    function restart() {
        $footer.innerHTML = ''
        $table.innerHTML = ''
        $footer.innerHTML = '<div id="fox-count"></div>'
        $count = document.querySelector('#fox-count')
        count = 0
        setTable($table)
        $allTd = document.querySelectorAll('td')
    }

}


