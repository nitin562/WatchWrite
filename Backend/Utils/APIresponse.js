class APIresponse{
    constructor(statusCode,data,message){
        this.statusCode=statusCode,
        this.data=data,
        this.message=message,
        this.success=statusCode<400 //true
    }
}
module.exports=APIresponse