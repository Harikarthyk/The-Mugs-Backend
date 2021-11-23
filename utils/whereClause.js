// base - Product.find({})

// bigQuery = All queries 

class WhereClause{
    constructor(base, bigQuery, role){
        this.base = base;
        this.bigQuery = bigQuery;
        this.role = role;
    }

    search(){

        const searchWord = this.bigQuery.search ? {
            name: {
                $regex: this.bigQuery.search,
                $options: "i",
            },
        } : {
        };

        this.base = this.base.find({...searchWord });

        if(this.role === "USER"){
            this.base = this.base.find({ isActive: true })
        }

        return this;
    }

    filter(){

        const copyOfBigQuery = {...this.bigQuery};

        delete copyOfBigQuery["page"];
        delete copyOfBigQuery["limit"];
        delete copyOfBigQuery["search"];

        let stringCopyOfBigQuery = JSON.stringify(copyOfBigQuery);

        stringCopyOfBigQuery = stringCopyOfBigQuery.replace(/\b(gte|lte)\b/g, m => `$${m}`);

        const jsonStringCopyOfBigQuery = JSON.parse(stringCopyOfBigQuery);

        this.base = this.base.find({...jsonStringCopyOfBigQuery}); 

        return this;

    }

    sort(){

    }

    pager(RESULT_PER_PAGE){
        
        const currPage = this.bigQuery.page;

        const skip = RESULT_PER_PAGE * (currPage - 1);

        this.base.skip(skip).limit(RESULT_PER_PAGE);

        this.base = this.base;

        return this;

    }

}

module.exports = WhereClause;