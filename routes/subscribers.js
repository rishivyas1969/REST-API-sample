const express = require("express") ;
const router = express.Router() ;
const Subscriber = require("../models/subscriber");


// get all subs
router.get("/", async (req,res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers) ;
    } catch (err) {
        res.status(500).json({ message: err.message}) ;
    }
}) ;

// get one sub
router.get("/:id", getSubscriber, (req,res) => {
    res.status(202).json(res.subscriber) ;
}) ;

// create sub
router.post("/", async (req,res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedChannel: req.body.subscribedChannel
    })
    try{
        const newSubscriber = await subscriber.save() ;
        res.status(201).json(newSubscriber) ;
    } catch (err) {
        res.status(400).json( {message: err.message} ) ;
    }
}) ;

// update sub
router.patch("/:id", getSubscriber, async (req,res) => {
    if(req.body.name != null) {
        res.subscriber.name = req.body.name ;
    }

    if( req.body.subscribedChannel != null) {
        res.subscriber.subscribedChannel = req.body.subscribedChannel ;
    }

    try{
        const updatedSubscriber = await res.subscriber.save() ;
        res.json(updatedSubscriber) ;
    } catch(err) {
        res.status(400).json({ message: err.message}) ;
    }
}) ;

// delete sub
router.delete("/:id", getSubscriber, async (req, res) => {
    try{
        await res.subscriber.remove() ;
        res.json({ message: "Subscriber deleted!"}) ;
    } catch (err){
        res.status(500).json({ message: err.message}) ;
    }
}) ;


// find one Subscriber function
async function getSubscriber( req, res, next) {
    
    try{
        subscriber = await Subscriber.findById(req.params.id) ;
         
        if( subscriber === null){
            return res.status(404).json( {message: "Can't find Subscriber!"}) ;
        }
    } catch(err) {
        return res.status(500).json( {message: err.message}) ;
    }

    res.subscriber = subscriber ;
    next() ;
}

module.exports = router ;