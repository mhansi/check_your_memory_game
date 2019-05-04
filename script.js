const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard =false;
let lockBoard = false;
let firstCard, secondCard;
let score =0;
let win=0;
cards.forEach(card=>card.addEventListener('click',flipCard));

function flipCard(){
    if(lockBoard) return;
    if(this===firstCard) return;
    this.classList.add('flip');

   if(!hasFlippedCard){
       hasFlippedCard=true;
       firstCard=this;
       return;
   }
       hasFlippedCard=false;
       secondCard=this;
       checkForMatch();
    }
   
   function checkForMatch(){
       let isMatch =firstCard.dataset.framework=== secondCard.dataset.framework;
       isMatch? disableCards(): unFlipCards();
   
   }
   function disableCards(){
       score+=2;
       win++
       if(win==6){
           $("#restart-div").slideDown();
           document.getElementById("final_score").innerHTML="Score:"+score;
       }
       document.getElementById("score").innerHTML="Score:"+score;
    firstCard.removeEventListner('click',flipCard());
    secondCard.removeEventListner('click',flipCard());

    resetBoard();
   }
   function unFlipCards(){
       score--;
       document.getElementById("score").innerHTML="Score:"+score;
       lockBoard=true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
      },1200);
   }
function resetBoard(){
    [hasFlippedCard,lockBoard]=[false,false];
    [firstCard,secondCard]=[null,null];
}
(function shuffle(){
    cards.forEach(card=>{
        let randomPos=Math.floor(Math.random()*12);
        card.style.order=randomPos;
    });
})();
function refresh(){
    location.reload();
}