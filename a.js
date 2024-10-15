const cats = [
    "general_knowledge",
  "film_and_tv",
  "food_and_drink",
  "general_knowledge",
  "geography",
  "history",
  "music",
  "science",
  "society_and_culture",
  "sport_and_leisure"
  ];
function handleapierror(){    
    document.getElementById('page1').style.display='none'
document.getElementById('apierror').innerText='loading...'
setTimeout(()=>{
    document.getElementById('apierror').innerText='Network Error please check your internet'
},5000)
}
const total = [];
async function fetchData() {
  for (let i of cats) {
    try {
      const response = await fetch(`https://the-trivia-api.com/v2/questions?limit=20&categories=${i}`);
      const data = await response.json();
      total.push(...data); 
    } catch (error) {

      handleapierror(error)  
      console.error(`Error fetching data for ${cat}:`);
    }
  }
localStorage.setItem('questions',JSON.stringify(total))
}
if(!localStorage.getItem('questions')){
fetchData();
}
if(total.length==0){
    localStorage.removeItem("questions");
    fetchData()
}


  function shuffle(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

let win=false
let p1score=0
let p2score=0
let p=1
let isfirst=true
const catquestion=[]
const diff=[]
const correctans=[]
const playerone={name:'',score:0,catchose:[],isstart:false}
const playertwo={name:'',score:0,catchose:[],isstart:false}


const selections=document.getElementById('catagory')
cats.forEach(element=> {
    console.log(element);
    const option = document.createElement('option');
    option.value = element;
    option.textContent = element;
    option.id = element;
    if (playerone.catchose.includes(element)) {
      option.disabled = true;  
    }
    selections.appendChild(option);
  });

function handleEnd(){
    if(playerone.catchose.length==cats){
        document.getElementById('page1').style.display='none'
        theend()
    }
   else{
    const main = document.getElementById('page2');
    const m = document.getElementById('page3');
    main.style.display='none'
    m.style.display='block'
    
    const p1=document.getElementById('p3p1')
    const p2=document.getElementById('p3p2')
    const s1=document.getElementById('p1score')
    const s2=document.getElementById('p2score')
    const lead=document.getElementById('leading')
    const pointdiff =document.getElementById('pointdiff')
    p1.innerHTML=`Name: <span>${playerone.name} <span/>`
    s1.innerHTML=`Score: <span>${playerone.score} <span/>`
    p2.innerHTML=`Name: <span>${playertwo.name} <span/>`
    s2.innerHTML=`Score: <span>${playertwo.score} <span/>`

    let l=''
    if(playerone.score>playertwo.score){
        lead.innerHTML=`<span>Leading: ${playerone.name} </span>`
        pointdiff.innerHTML=`Lead By: <span>${playerone.score-playertwo.score} </span>`
    }
    else if(playerone.score<playertwo.score){ 
        lead.innerHTML=`Leading: <span>${playertwo.name} </span>`
        pointdiff.innerHTML=`Lead By: <span>${playertwo.score-playerone.score} </span>`

    }
    else{
        pointdiff.innerHTML='Equal'
    }

   }
}



function handlegame(q = 0) {
    if (q > catquestion.length - 1) {
        handleEnd(); 
    } 
    else {
        const main = document.getElementById('main');
        const ans = [...catquestion[q].ans]; 
        const qs = catquestion[q].qs; 
        const rightans=catquestion[q].crtans
        const   diff=catquestion[q].level
        shuffle(ans); 
       let p=''
       let s=''
       if(q%2==0){
p=playerone.name
s=playerone.score
       }
       else{
        p=playertwo.name
        s=playertwo.score
       }
        main.innerHTML = `
            <div>
       
             <p class="pname" id="pname">Name:${p} <br/> <br/> <span class="score" id="score"> Score:${s}</span></p>
                  <div class="nosel" id="nosel"></div>
                <p>${qs} (${diff})</p>
                <div>
                    <div>${ans[0]}
                        <input type='radio' name='ans' class='ans' value='${ans[0]}'/>
                    </div>
                    <div>${ans[1]}
                        <input type='radio' name='ans' class='ans' value='${ans[1]}'/>
                    </div>
                    <div>${ans[2]}
                        <input type='radio' name='ans' class='ans' value='${ans[2]}'/>
                    </div>
                    <div>${ans[3]}
                        <input type='radio' name='ans' class='ans' value='${ans[3]}'/>
                    </div>
                    <button onclick="submitAnswer(${q})">Submit</button>
                </div>
            </div>
        `;
    }
}
function submitAnswer(q) {
    const selectedAnswer = document.querySelector('input[name="ans"]:checked');
const rightans=catquestion[q].crtans
const difficulty=catquestion[q].level
    if (selectedAnswer) {
                document.getElementById('nosel').style.display='none'
        let s = 0;
        const value = selectedAnswer.value;
        console.log('Selected answer:', value, 'Correct answer:', rightans);

        if (value === rightans) {
            if (difficulty === 'easy') {
                console.log(difficulty);
                s = 10;
            } else if (difficulty === 'medium') {
           
                console.log(difficulty);
                s = 15;
            } else if (difficulty === 'hard') {
           
                console.log(difficulty);
                s = 20;
            }

            if (q % 2 === 0) {
           
                playerone.score += s;
                console.log('Player One score:', playerone.score);
            } else {
                console.log('p2');
                playertwo.score += s;
                console.log('Player Two score:', playertwo.score);
            }
        } else {
            console.log('Wrong answer');
        }

        handlegame(q + 1);
    } else {
    const err=document.getElementById('nosel')
err.style.display='block'
err.innerText='Please Select Any one of the Answer'
        console.log('No answer selected');
    }
}





let name1=''
let name2=''
let cat=''
const err=document.getElementById('err')

function example(){
const catagoy=document.getElementById('catagory').value
}


function handlename(e){
    
    if(isfirst){
        isstart=true
        const p1=document.getElementById('p1').value
        const p2=document.getElementById('p2').value
        const page1=document.getElementById('page1')
        const page2=document.getElementById('page2')
        let choosedcat=document.getElementById('catagory').value
        if(p1=='' || p2=='' || p1=='undefined' || p2=='undefined' || catagory==''|| catagory=='undefined' ){
        err.innerText='Fill All The Fields'
        }
        else{
            err.innerText=''
            playerone.name=''
            playertwo.name=''
            playerone.name=p1
            playertwo.name=p2
            cat=''
            cat=choosedcat
            let op=document.getElementById(cat)
            op.remove()
            playerone.catchose.push(catagory)
            playertwo.catchose.push(catagory)
            page1.style.display='none'
            page2.style.display='block'
        //questions ready
        const locals=localStorage.getItem('questions')
        const items=JSON.parse(locals)
        catquestion.splice(0,catquestion.length-1)
        catquestion.length=0
        console.log(cat);
        items.forEach((item, index) => {
            console.log(item.category);
            
            const easy = catquestion.filter(q => q.level === 'easy').length;
            const medium = catquestion.filter(q => q.level === 'medium').length;
            const hard = catquestion.filter(q => q.level === 'hard').length;
        
            if (item.category === cat && catquestion.length < 6) {
                if (easy < 2 && item.difficulty === 'easy') {
                    catquestion.push({
                        id: index,
                        qs: item.question.text,
                        crtans: item.correctAnswer,
                        level: item.difficulty,
                        ans: [...item.incorrectAnswers, item.correctAnswer]
                    });
                } else if (easy === 2 && medium < 2 && item.difficulty === 'medium') {
                    catquestion.push({
                        id: index,
                        qs: item.question.text,
                        crtans: item.correctAnswer,
                        level: item.difficulty,
                        ans: [...item.incorrectAnswers, item.correctAnswer]
                    });
                } else if (easy === 2 && medium === 2 && hard < 2 && item.difficulty === 'hard') {
                    catquestion.push({
                        id: index,
                        qs: item.question.text,
                        crtans: item.correctAnswer,
                        level: item.difficulty,
                        ans: [...item.incorrectAnswers, item.correctAnswer]
                    });
                }
        
                console.log('catqs', catquestion);
            }
        });
        
        
        
        const qus=document.getElementById('main')
    
        handlegame()}
    }
    else{
  
        let catagory=document.getElementById('catagory').value

        if(p1=='' || p2=='' || p1=='undefined' || p2=='undefined' || catagory==''|| catagory=='undefined' ){
        err.innerText='All field should give'
        }
        else{

            playerone.catchose.push(catagory)
            playertwo.catchose.push(catagory)
        document.getElementById(catagory).remove()
            const local=localStorage.getItem('questions')
            const objs=JSON.parse(local)
            catquestion.splice(0,catquestion.length-1)
            catquestion.length=0
            objs.forEach((item, index) => {
                console.log(item.category);
                const easy = catquestion.filter(q => q.level === 'easy').length;
                const medium = catquestion.filter(q => q.level === 'medium').length;
                const hard = catquestion.filter(q => q.level === 'hard').length;
            
                if (item.category === cat && catquestion.length < 6) {
                    if (easy < 2 && item.difficulty === 'easy') {
                        catquestion.push({
                            id: index,
                            qs: item.question.text,
                            crtans: item.correctAnswer,
                            level: item.difficulty,
                            ans: [...item.incorrectAnswers, item.correctAnswer]
                        });
                    } else if (easy === 2 && medium < 2 && item.difficulty === 'medium') {
                        catquestion.push({
                            id: index,
                            qs: item.question.text,
                            crtans: item.correctAnswer,
                            level: item.difficulty,
                            ans: [...item.incorrectAnswers, item.correctAnswer]
                        });
                    } else if (easy === 2 && medium === 2 && hard < 2 && item.difficulty === 'hard') {
                        catquestion.push({
                            id: index,
                            qs: item.question.text,
                            crtans: item.correctAnswer,
                            level: item.difficulty,
                            ans: [...item.incorrectAnswers, item.correctAnswer]
                        });
                    }
            console.log(catquestion);
            page1.style.display='none'
            page2.style.display='block'
            handlegame()
            }
            
        })

        }



}
    }



function theend(){
const page1=document.getElementById('page1')
    const page3=document.getElementById('page3')
    const finalpage=document.getElementById('lastpage')
    page1.style.display='none'
    page3.style.display='none'
    finalpage.style.display='block'
let wiinername=''
let winnerscore=0
let poientdif=0
if(playerone.score>playertwo.score){
wiinername=playerone.name
winnerscore=playerone.score
poientdif=playerone.score-playertwo.score
}
else if(playerone.score<playertwo.score){
wiinername=playertwo.name
winnerscore=playertwo.score
poientdif=playertwo.score-playerone.score
}
else{
    wiinername=''
    winnerscore=''
    poientdif='Match Die'
}
if(playertwo.score-playerone.score==0)
{
    finalpage.innerHTML=`<div>
    <div>Match Die. Scores are each</div>
    <div>player ${playerone.name} score ${playerone.score}</div>
        <div>player ${playertwo.name} score ${playertwo.score}</div>
    </div>`
}
else{
    finalpage.innerHTML=`<div>
<div id="fn">Winner Of the Match: ${wiinername} with Score ${winnerscore}</div>
<div id="fd">Point Difference ${poientdif}</div>

</div>`
}
}

function handlePlayagain(){
isfirst=false

if(playerone.catchose.length==cats.length){
    const page1=document.getElementById('page1').style.display='none'
    theend()
}
else{
    
const page1=document.getElementById('page1')
const lastpage=document.getElementById('page3')

const p1=document.getElementById('p1')
const p2=document.getElementById('p2')
page1.style.display='block'
p1.style.display='none'
p2.style.display='none'
lastpage.style.display='none'
const op=document.getElementById(cat).remove()
}


}