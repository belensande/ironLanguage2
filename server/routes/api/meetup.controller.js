const express		 = require("express");
const router		 = express.Router();
const Meetup		 = require("../../models/meetup");

router.post('/', function (req, res, next) {

	let meetupInfo = {
		owner: req.user._id,
		description: req.body.description,
		date: req.body.date,
		place: req.body.place,
		city: req.body.city
	};

	if (req.body.languages) {
		meetupInfo["languages"] = JSON.parse(req.body.languages);
	}

	let newMeetup = Meetup(meetupInfo);

	return newMeetup.save()
		.then(meetup => res.status(200).json(meetup))
		.catch(e => {
			return res.status(500).json(e);
		});
});

router.get('/:city?', function (req, res, next) {
	let query = { date: { $gt: new Date() } };
	if (req.params.city) {
		query['city'] = req.params.city;
	}
	Meetup.find(query)
		.populate({ path: 'owner', model: 'User' })
		.exec()
		.then(meetups => res.status(200).json(meetups))
		.catch(e => {
			return res.status(500).json({ message: "Something went wrong" });
		});;
});

module.exports = router;
