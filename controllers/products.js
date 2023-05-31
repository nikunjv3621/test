
const Product = require("../model/products");
const getAllProducts = async (req, res) => {
    const {company, name,featured,sort,select} = req.query;
    const queryObject = {};

    if(company){
        queryObject.company = company;
    }

    if(featured){
        queryObject.featured = featured
    }

    if(name){
        queryObject.name = {$regex :name, $options:"i"};
    }

let apidata = Product.find(queryObject);

if(sort){
    let sortFix = sort.replace(","," ");
    apidata = apidata.sort(sortFix)
} 

if(select){
    let selectFix = select.split(",").join(" ");
    apidata = apidata.select(selectFix)
} 

// Pagination

let page = Number (req.query.page) || 1;
let limit  = Number (req.query.limit) || 3;

let skip = (page - 1) * limit;

apidata = apidata.skip(skip).limit(limit);

    console.log(apidata);
    const mydata = await apidata;
    res.status(200).json({ mydata, nbHites: mydata.length });
};

const getAllProductsTesting = async (req, res) => {

    const queryObject = {};

    let apidata = Product.find(queryObject);

    let page = Number (req.query.page) || 1;
    let limit  = Number (req.query.limit) || 3;
    
    let skip = (page - 1) * limit;
    
    apidata = apidata.skip(skip).limit(limit);
    

    const mydata = await Product.find(apidata);
    res.status(200).json({mydata,nbHites: mydata.length});
};

module.exports = { getAllProducts, getAllProductsTesting };