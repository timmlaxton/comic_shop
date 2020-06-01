const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

const app = express();
const mongoose = require('mongoose');
const async = require('async');
require('dotenv').config();
const path = require('path');
const moment = require('moment')

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "client/build")))

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})


const { auth } = require('./middleware/auth');
const {admin} = require('./middleware/admin');


const {User} = require('./models/user');
const {Publisher} = require('./models/publisher');
const {Product} = require('./models/product');
const {Character} = require('./models/character');
const {Catergory} = require('./models/catergory');
const {Shirt} = require('./models/shirt');
const {Payment} = require('./models/payment');
const {Site} = require ('./models/site');
const {Standing} = require('./models/standing')




app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
 
    next();
});



//Products

app.post('/api/product/update_cart', auth, async (req, res) => {

    // Add try catch to handle failure
    const cart = req.body.cart
    const response = await User.findOneAndUpdate({
        _id: req.user._id
    }, {
        cart
    })    
    res.send(JSON.stringify(response))
})

app.post('/api/product/shop/comics',(req,res)=>{

    var order = req.body.order ? req.body.order : "asc";
    var sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    var limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    var skip = parseInt(req.body.skip);
    var findArgs = {};

    for(var key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    findArgs['publish'] = true;
    console.log('args?', findArgs)

    Product.
    find(findArgs).
    populate('character').
    populate('publisher').
    populate('catergory').
    sort([[sortBy,order]]).
    skip(skip).
    limit(limit). 
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles: req.body.outOfStock ? articles : articles.filter(article => article.amount > 0)
        })
    })
})


app.get('/api/product', async (req, res) => {
    const { order = 'asc', sort = {}, limit = 20, page = 1, outOfStockOnly = 0, selectedDate } = req.query 
    const options = {
        order,
        sort,
        limit,
        page
    }
    const date = moment(selectedDate)
    console.log('Date format', date.format('MM-DD-YY'))
    const query = {
        ...outOfStockOnly === '1' && {amount: 0},
        ...(!!selectedDate) && {createdAt: {
            $lt: date.endOf('day').toDate(),
            $gte: date.startOf('day').toDate()
        }}
    }

    console.log('query', query)

    const response = await Product.paginate(query, options)
    console.log('product pagination', response)
    res.send(response)
})


app.put('/api/product/articles/:id', async (req, res) => {
    try {
      var  product  = await Product.findById(req.params.id).exec();
        product.set(req.body);
        var result = await product.save(); 
        res.send(result);  
    } catch (error) {
        res.status(jobbie).send(error)
    }
});


// By Sell
app.get('/api/product/articles', (req,res)=> {
    const {
        order = 'asc',
        sortBy = '_id',
        filterBy = null
    } = req.query
    
    var limit = req.query.limit ? parseInt(req.query.limit) : 100;
    let query = {}

    if (filterBy) {
        try {
            const filters = filterBy.split(',').reduce((acc, item) => {
                const [key, value] = item.split(':')
                acc[key] = [value]
                return acc
            }, {})
            console.log('filters', filters)
            query = {
                ...query,
                ...filters
            }
        } catch(error) {
            console.error('Error when setting filterBy for /api/product/articles', error)
        }
    }
    console.log('query?', query)
    Product.find(query).
    populate('character').
    populate('publisher').
    populate('catergory').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.send(articles)
    })

})

app.get('/api/product/articles_by_id',(req,res)=>{
    var type = req.query.type;
    var items = req.query.id;

    if(type === "array"){
        var ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Product.
    find({ '_id':{$in:items}}).
    populate('character').
    populate('publisher').
    populate('catergory').
    exec((err,docs)=>{
        return res.status(200).send(docs)
    })
});


app.post('/api/product/article_by_id', auth,admin, (req,res)=> {
    const product = new Product(req.body);

    product.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            article: doc
        })
    })
});

app.post('/api/product/article',auth,admin,(req,res)=>{
    const product = new Product(req.body);

    product.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            article: doc
        })
    })
})

app.delete('/api/product/articles/:id', auth,admin, (req, res)=> {
   Product.deleteOne({
       _id: req.params.id}).then(
           () => {
               res.status(200).json({
    });
        }
       ).catch(
           (err)=>{
               res.staus(400).json({

               })
           }
       )
        });
  
// Character
app.post('/api/product/character', auth,admin,(req,res)=> {
    const character = new Character(req.body);

    character.save((err,doc) => {
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            character: doc
        })
    })
});

app.get('/api/product/characters', (req,res)=> {

    Character.find({},(err, characters)=> {
        if(err) return res.status(400).send(err);
        res.status(200).send(characters)
    })
});


app.delete('/api/product/character/:name', (req,res)=> {
    const {name} = req.params;
    Character.findOneAndDelete({name}, (err, character) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(character)
    } )
})

//Publisher
app.post('/api/product/publisher',auth,admin,(req,res)=>{
    const publisher = new Publisher(req.body);

    publisher.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            publisher:doc
        })
    })
});


app.get('/api/product/publishers', (req,res)=> {
    Publisher.find({},(err, publishers)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(publishers)
    })
});

//Catergory

app.post('/api/product/catergory',auth,admin,(req,res)=>{
    const catergory = new Catergory(req.body);

    catergory.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            catergory:doc
        })
    })
});

app.get('/api/product/catergorys', (req,res)=> {
    Catergory.find({},(err, catergorys)=> {
        if(err) return res.status(400).send(err);
        res.status(200).send(catergorys)
    })
});



//Shirt

app.post('/api/product/shirt',auth,admin,(req,res)=>{
    const shirt = new Shirt(req.body);

    shirt.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            shirt:doc
        })
    })
});

app.get('/api/product/shirts', (req,res)=> {
    Shirt.find({},(err, shirts)=> {
        if(err) return res.status(400).send(err);
        res.status(200).send(shirts)
    })
});



//User
app.get('/api/users/auth',auth,(req,res)=>{
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })

})

app.post('/api/users/register',(req,res)=>{
    const user = new User(req.body);

    user.save((err,doc)=>{
        if(err) return res.json({success:false,err})
        res.status(200).json({
            success: true,
            userdata: doc
            
        })
    })
});

app.post('/api/users/login',(req,res)=> {
    
    User.findOne({'email':req.body.email}, (err, user)=>{
        if(!user) return res.json({loginSuccess:false,message: "Auth failed, email not found"});

        user.comparePassword(req.body.password,(err, isMatch)=>{
            if(!isMatch) return res.json({loginSuccess:false,message:'Wrong password'});

            user.generateToken((err,user)=> {
                if(err) return res.status(400).send(err);
                res.cookie('w_auth', user.token).status(200).json({
                    loginSuccess: true
                })

            })
        })

    })
})

app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate(
        { _id:req.user._id },
        { token: '' },
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success: true
            })
        }
    )
});



//images

app.post('/api/users/uploadimage',auth,admin,formidable(),(req,res)=>{
    cloudinary.uploader.upload(req.files.file.path,(result)=>{
        console.log(result);
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        })
    },{
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    })
})

app.get('/api/users/removeimage',auth,admin,(req,res)=>{
    var image_id = req.query.public_id;

    cloudinary.uploader.destroy(image_id,(error,result)=>{
        if(error) return res.json({succes:false,error});
        res.status(200).send('ok');
    })
})

//cart

app.post('/api/users/addToCart',auth,(req,res)=>{

    User.findOne({_id: req.user._id},(err,doc)=>{
        let duplicate = false;

        doc.cart.forEach((item)=>{
            if(item.id == req.query.productId){
                  duplicate = true;  
            }
        })

        if(duplicate){
            User.findOneAndUpdate(
                
                {_id: req.user._id, "cart.id":mongoose.Types.ObjectId(req.query.productId)},
                {$inc: {"cart.$.quantity":1}},
                {new:true},
                ()=> {
                    if(err) return res.json({success:false,err});
                    res.status(200).json(doc.cart)  
                }
                
            
            )
            

            User.findOneAndUpdate(
                {_id: req.user._id, "cart.id":mongoose.Types.ObjectId(req.query.productId)},
                { $inc: { "cart.$.quantity":1 } },
                { new:true },
                ()=>{
                    if(err) return res.json({success:false,err});
                    res.status(200).json(doc.cart)
                }
            )
        } else {
            User.findOneAndUpdate(
                {_id: req.user._id},
                { $push:{ cart:{
                    id: mongoose.Types.ObjectId(req.query.productId),
                    quantity:1,
                    date: Date.now()
                } }},
                { new: true },
                (err,doc)=>{
                    if(err) return res.json({success:false,err});
                    res.status(200).json(doc.cart)
                }
            )
        }
    })
})

app.get('/api/users/removeFromCart', auth,(req,res)=>{
 
    User.findOneAndUpdate(
        {_id: req.user._id},
        {"$pull":
            {"cart": {"id":mongoose.Types.ObjectId(req.query._id)}}
        },
        {new: true},
        (err,doc)=>{
            var cart = doc.cart;
            var array = cart.map(item=>{
                return mongoose.Types.ObjectId(item.id)
            });

        }
    );


})

//stock
app.post('/api/product/check_stock_available', async (req, res) => {
    const {data} = req.body
    const ids = data.map(item => item.id)
    const products = await Promise.all(data.map(item => {
        return new Promise((resolve, reject) => {
            // Add error handling in case it fails
            (async () => {
                const product = await Product.findById(item.id)
                const {amount} = product
                const newAmount = amount - item.quantity
                if (newAmount < 0) {
                    item.isAvailable = false
                } else {
                    item.isAvailable = true                    
                }
                resolve(item)
            })()
        })
    }))
    console.log('products?', products)
    res.send(JSON.stringify(products))
   
})


app.post('/api/users/successBuy', auth,(req, res)=>{
    var history = [];
    var transactionData = {}

    req.body.cartDetail.forEach((item)=>{
        history.push({
            dateOfPurchase: Date.now(),
            name: item.name,
            character: (item.character && item.character.name) || '',
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    })

    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email
    }
    transactionData.data = req.body.paymentData;
    transactionData.product = history;

    User.findOneAndUpdate(
        {_id: req.user._id},
        { $push:{history:history}, $set:{cart: []}},
        { new: true},
        (err,user)=>{
            if(err) return res.json({success:false,err});

            const payment = new Payment(transactionData);
            payment.save((err,doc)=>{
                if(err) return res.json({success:false,err});
                var products = [];
                doc.product.forEach(item=>{
                    products.push({id:item.id,quantity: item.quantity})
                })


                async.eachSeries(products, async (item,callback)=>{ 
                    const {id, quantity} = item
                    const product = await Product.findById(id)
                    const {amount} = product
                    const newAmount = amount - quantity
                    product.amount = newAmount
                    product.sold += quantity
                    await product.save(callback)
                },(err)=>{
                    if(err) return res.json({success:false,err})
                    res.status(200).json({
                        success:true,
                        cart: user.cart,
                        cartDetail:[]
                    })
                })
            });
        }
    )
})

//user profile
app.post('/api/users/update_profile',auth,(req,res)=>{

    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$set": req.body
        },
        { new: true },
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success:true
            })
        }
    );
})

//site info
app.get('/api/site/site_data',(req,res)=>{
    Site.find({},(err,site)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(site[0].siteInfo)
    });
});

app.post('/api/site/site_data',auth,admin,(req,res)=>{
    Site.findOneAndUpdate(
        { name: 'Site'},
        { "$set": { siteInfo: req.body }},
        { new: true },
        (err,doc )=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success: true,
                siteInfo: doc.siteInfo
            })
        }
    )
})

// standing order

app.post('/api/users/standing_order',(req,res)=>{
    const standing = new Standing(req.body);

    standing.save((err,doc)=>{
        if(err) return res.json({success:false,err})
        res.status(200).json({
            success: true,
            userdata: doc
            
        })
    })
});

app.get('/api/users/standing_order',(req,res)=>{
    Standing.find({},(err, standing) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(standing)
    });
});



// default

//if( process.env.NODE_ENV === 'production' ){
    app.get('/*', (req,res)=> {
        res.sendfile(path.join(__dirname,'client/build','index.html'))
    })
//}

const port = process.env.PORT || 3002;
app.listen(port,()=>{
    console.log(`Server Running at ${port}`)
})