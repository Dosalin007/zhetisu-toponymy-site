const menuBtn=document.querySelector('.menu'); const mobile=document.querySelector('.mobile-nav');
if(menuBtn) menuBtn.addEventListener('click',()=>mobile?.classList.toggle('open'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.querySelectorAll('.gallery figure').forEach(fig=>fig.addEventListener('click',()=>{const lb=document.querySelector('.lightbox');if(!lb)return;lb.querySelector('img').src=fig.querySelector('img').src;lb.classList.add('open')}));
document.querySelectorAll('.lightbox button,.lightbox').forEach(el=>el.addEventListener('click',e=>{if(e.target===el||el.tagName==='BUTTON')document.querySelector('.lightbox')?.classList.remove('open')}));
const quizData=[
{q:'Көкжазық ауылының бұрынғы кеңестік кезеңдегі атауы қандай?',o:['Троицкое','Жеңдік','Мологоровка','Қаратал'],a:0},
{q:'Көкжазық атауы қандай сөздерден құралған?',o:['көк + жазық','көк + жаз','көкорай + жазық','көк + жазықтық'],a:0},
{q:'«Бесбойдақ» аңызы қай ауылмен байланысты?',o:['Көкжазық','Теңлік','Бөктерлі','Қарабұлақ'],a:1},
{q:'Аңыз бойынша бес татар жігіті шамамен қай жылдары қоныстанған?',o:['1760–1765','1860–1865','1930–1935','2000–2006'],a:1},
{q:'Бөктерлі ауылының бұрынғы атауы қандай?',o:['Первомай','Троицкое','Мологоровка','Жеңдік'],a:2},
{q:'«Бөктерлі» атауындағы «-лі» қандай қызмет атқарады?',o:['Көптік жалғау','Сын есім тудыратын жұрнақ','Септік жалғау','Етістік жұрнағы'],a:1},
{q:'Зерттеу жобасы қай бағыттарды біріктіреді?',o:['Тек тарих','Тіл білімі, тарих, география, IT','Тек география','Математика және физика'],a:1},
{q:'Жоба нәтижесінде қандай цифрлық өнім қарастырылған?',o:['Тек кітап','Интерактивті веб-инфографикалық шежіре','Радиобағдарлама','Телефон анықтамалығы'],a:1}
];
let qi=0,score=0,locked=false;const q=document.querySelector('#qText'),opts=document.querySelector('#qOptions'),next=document.querySelector('#qNext'),prog=document.querySelector('#qProgress'),meta=document.querySelector('#qMeta');
function renderQuiz(){if(!q)return;if(qi>=quizData.length){q.textContent=`Нәтиже: ${score}/${quizData.length}`;opts.innerHTML=`<p>Сіз ${quizData.length} сұрақтың ${score}-іне дұрыс жауап бердіңіз.</p>`;next.textContent='Қайта бастау';next.disabled=false;prog.style.width='100%';meta.textContent='Аяқталды';next.onclick=()=>{qi=0;score=0;locked=false;renderQuiz()};return;}locked=false;const d=quizData[qi];q.textContent=d.q;opts.innerHTML='';meta.textContent=`${qi+1} / ${quizData.length}`;prog.style.width=`${qi/quizData.length*100}%`;next.disabled=true;next.textContent='Келесі →';d.o.forEach((t,i)=>{const b=document.createElement('button');b.className='option';b.textContent=t;b.onclick=()=>{if(locked)return;locked=true;[...opts.children].forEach((x,j)=>{if(j===d.a)x.classList.add('correct')});if(i!==d.a)b.classList.add('wrong');if(i===d.a)score++;next.disabled=false;};opts.appendChild(b)});next.onclick=()=>{qi++;renderQuiz()}}
renderQuiz();