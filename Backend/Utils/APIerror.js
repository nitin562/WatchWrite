class APIerror extends Error{
    constructor(statusCode,msg,name){
        super()
        this.message=msg,
        this.name=name,
        this.success=0,
        this.statusCode=statusCode
    }
}

module.exports=APIerror