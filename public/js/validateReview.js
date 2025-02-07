const review=document.querySelector('.comment');
const rating=document.querySelector('.rating');
const btn=document.querySelector('.submit-button');

const validateReview=function(){
    btn.addEventListener('click',function(e){
        if(Comment.length==0||Comment===''){
            document.querySelector('.ivalidReviewFeedback').innerHTML="pls enter some comment"
        }
        e.preventDefault();
    })
    
}
export default validateReview;