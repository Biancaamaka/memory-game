let hideInterval = null;
let hideCountInterval = null;

//stores clicked data

const marker = { frst: '' }
const hide = () => {
    document.querySelectorAll(".card-front:not(.clicked)").forEach(val => {
        val.setAttribute('style', "background:url(./images/brain.jpg)");
    })
}



function brain() {
    setTimeout(wait,3000)
    hideInterval = setInterval(hide, 3000)
    var added = [{
            val: 'cats',
            count: 0
        }, { val: 'dog', count: 0 }, { val: 'eagle', count: 0 }, { val: 'lion', count: 0 }, {
            val: 'pigeon',
            count: 0
        },
        { val: 'rabbit', count: 0 }
    ];

    document.querySelectorAll(".card-front").forEach(val => {
        //select elements with less than 2 occurrence
        const left = added.filter(arr => arr.count < 2)
            //get the items to which animals have not been assigned
        const index = Math.floor(Math.random() * left.length)
        let actualIndex;
        added.forEach((val, key) => {
            if (val['val'] == left[index]['val']) {
                //gets the actual index of the item 
                actualIndex = key

            }
        })

        if (left.length > 0) {
            added[actualIndex] = { val: left[index]['val'], count: left[index]['count'] + 1 };
            val.setAttribute('id', left[index]['val']);

        }

    })
    logic();
}

let score = 0;

function logic(){ 
    document.querySelectorAll('.card-front:not(.clicked)').forEach(val => {
        logicpane(val, 'click')
    })
    countInterval = setInterval(timer, 1000)
}

const logicpane = (element, eventType='click') => {
    element.addEventListener(eventType, handleClick);
};


function handleClick(e){
    val = e.target
    let firstObj = e.target.id;
    if (document.getElementById("timer").innerHTML > 1) {
        val.removeAttribute("style")
        if (marker.frst == '') {
            //if first clicked empty, make first clicked first item
            marker.frst = firstObj;
            val.removeEventListener('click', handleClick)
            val.classList.add('clicked')
        } else if (marker.frst == firstObj) {                
            val.removeEventListener('click', handleClick)
            val.classList.add('clicked')
            score += 1;
            //make first clicked empty
            marker.frst = '';
            document.getElementById("score").innerHTML = score;
            document.getElementById("gif").setAttribute("src", "images/gif.gif")

        } else {
            document.getElementById("gif").setAttribute("src", "images/gif2.gif");
        }
    }
}


let count = 0;

function timer() {
    count += 1
    document.getElementById("timer").innerHTML = count
    if (count == 59) {
        clearInterval(hideInterval)
        clearInterval(hideCountInterval)
        document.getElementById("hide").style.display = "none";
        document.getElementById("btn").innerHTML = "Game Over, Try Again";
        document.getElementById('results').innerHTML = `<b>CONGRATS! Score: ${score} </b>`
        document.getElementById("results").style.display = "block";
        document.getElementById("btn").removeEventListener('click', brain)
        document.getElementById("btn").addEventListener('click', ()=>{
            window.location.reload()
        })
        count = 0;

    }
}
function wait(){
    // setTimeout( setInterval(timer, 1000),3000)
    // setInterval(hide, 3000)
    hideCountInterval = setInterval(timer, 1000)
}