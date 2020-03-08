function NewsChain(){
    this.chain=[];
}
NewsChain.prototype.createNewArticle=function(author,title,description,category){
    const newArticle={
        author:author,
        title:title,
        description:description,
        category:category
    };
    this.chain.unshift(newArticle);
}
NewsChain.prototype.emptyChain=function(){
    this.chain=[];
}
module.exports=NewsChain;