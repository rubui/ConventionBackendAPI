var Attendee = require('../models/Attendee');

// Display list of all Attendees.
exports.attendee_get_all = async function(req, res){
    console.log(req.query)
    try {
        var attendee = null;
        let queries = Object.keys(req.query).filter(query => query === "days");
        console.log(queries)
        if(queries.length === 0){
            attendee = await Attendee.find().exec()
        }else if ( queries.length === 1 && queries.includes('days')){
            console.log('here!')
            let endDate = new Date()
            endDate.setHours(23, 59, 59)
            let startDate = new Date()
            startDate.setHours(00, 00, 00)
            startDate.setDate( endDate.getDate() - parseInt(req.query.days))
   
            console.log(startDate)
            console.log(endDate)
            attendee = await Attendee.find({ 
                registered: {
                      $gte: new Date(startDate),
                      $lte: new Date(endDate)
                       }
                }).sort({ registered: 'asc'}).exec()
        }

        console.log(attendee)
        if (!attendee){
            res.status(404)
            res.json({ success: false, result: "No attendees found"})
        }else{
            res.status(200)
            res.json({ success: true, result: attendee})
        }
    } catch(err) {
        res.status(500)
        res.send({ error: "Server Error" })
    }
}

// Display information of specified attendee
exports.attendee_get = async function(req, res) {
    try {
        const attendee = await Attendee.findById(req.params.id).exec()
        console.log(attendee)
        if (!attendee){
            res.status(404)
            res.json({ success: false, result: "No attendee with provided ID found"})
        }else{
            res.status(200)
            res.json({ success: true, result: attendee})
        }
    } catch(err) {
        res.status(500)
        res.send({ error: "Server Error" })
    }
};

// Create attendee
exports.attendee_create = async function(req, res) {
     try {
        let attendee = new Attendee({
            name: req.body.name,
            company: req.body.company,
            email: req.body.email,
            registered: new Date()
         })
        var result = await attendee.save()
        res.status(200)
        res.json({ success: true, result: result})
    }catch(err) {
        res.status(500)
        res.json({ success: false, result: err})
    }
     
};

// Handle Attendee create on POST.
exports.attendee_update = async function(req, res) {
    try {
        var attendeeThenable = await Attendee.findById(req.params.id).exec();
        attendeeThenable.set(req.body);
        var result = await attendeeThenable.save();
        res.status(200)
        res.json({ success: true, result: result})
    }catch(err) {
        res.status(500)
        res.json({ success: false, result: err})
    }
};

// Display Attendee delete form on GET.
exports.attendee_delete = async function(req, res) {
    try{
        const attendee = await Attendee.findById(req.params.id, 'name length').exec();
        if (!attendee) {
            res.status(404)
            res.json({ success: false, result: "No attendee with the provided ID was found to delete" })
        }else{
            Attendee.findByIdAndRemove(req.params.id)
            .then( () => {
                res.status(200)
                res.json({ success: true, result:"Attendee with given ID was deleted successfully" })
            }).catch( err =>{
                res.status(500)
                res.json({ success: false, result:"Server Error: Unable to delete resource" })
            })

        }
    }catch(err){
        res.status(500)
        res.json({ success: false, result:"Server Error: Unable to locate resource" })
    }
};
