//dynamically html elements ko banata hai
function createElementFromHtml(html){
    const template=document.createElement("template");
    template.innerHTML=html.trim();
    return template.content.firstElementChild;
}
export default createElementFromHtml;

