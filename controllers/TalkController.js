var Talk = require('../models/Talk');
const Attendee = require('../models/Attendee');

// Display list of all Talks.
exports.talk_get_all = async function(req, res){
    try {
        const talk = await Talk.find().populate('attendees').exec();
        console.log(talk)
        if (!talk){
            res.status(404)
            res.json({ success: false, result: "No talks found"})
        }else{
            res.status(200)
            res.json({ success: true, result: talk})
        }
    } catch(err) {
        res.status(500)
        res.send({ error: "Server Error" })
    }
}

// Display information of specified talk
exports.talk_get = async function(req, res) {
    try {
        const talk = await Talk.findById(req.params.id).populate('attendees').exec()
        console.log(talk)
        if (!talk){
            res.status(404)
            res.json({ success: false, result: "No talk with provided ID found"})
        }else{
            res.status(200)
            res.json({ success: true, result: talk})
        }
    } catch(err) {
        res.status(500)
        res.send({ error: "Server Error" })
    }
};

// Create talk
exports.talk_create = async function(req, res) {

     try {
        let talk = new Talk({
            title: req.body.title,
            abstract: req.body.abstract,
            room: req.body.room,
			speaker: req.body.speaker,
			attendees: []
         })
        var result = await talk.save()
        res.status(200)
        res.json({ success: true, result: result})
    }catch(err) {
        res.status(500)
        res.json({ success: false, result: err})
    }
     
};

// Handle Talk create on POST.
exports.talk_update = async function(req, res) {
    try {
        var talkThenable = await Talk.findById(req.params.id).exec();
        talkThenable.set(req.body);
        var result = await talkThenable.save();
        res.status(200)
        res.json({ success: true, result: result})
    }catch(err) {
        res.status(500)
        res.json({ success: false, result: err})
    }

};

// Display Talk delete form on GET.
exports.talk_delete = async function(req, res) {
    try{
        const talk = await Talk.findById(req.params.id).exec();
        if (!talk) {
            res.status(404)
            res.json({ success: false, result: "No talk with the provided ID was found to delete" })
        }else{
            Talk.findByIdAndRemove(req.params.id)
            .then( () => {
                res.status(200)
                res.json({ success: true, result:"Talk with given ID was deleted successfully" })
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

exports.talk_add_new_attendee = async function(req, res){
	try{
		
		let talk = await Talk.findById(req.params.id).exec()
		let talkAttendees = talk.attendees

		attendee = new Attendee({
			name: req.body.name,
			company: req.body.company,
			email: req.body.email,
			registered: new Date()
		})

		let result = await attendee.save().exec()
		talkAttendees.push(attendee)
		Talk.updateOne({_id: req.params.id}, { $set:  {attendees : talkAttendees}}).exec()
		res.status(200)
		res.json({ success: true, result:"Attendee added to talk" })
		 

	}catch(err){
        res.status(500)
        res.json({ success: false, result:"Server Error: Unable to locate resource" })
	}
}