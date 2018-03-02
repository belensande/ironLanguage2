const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetupSchema = new Schema({
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'Owner is mandatory.']
	},
	descripion: {
		type: String
	},
	date: {
		type: Date,
		required: [true, 'Date is mandatory.']
	},
	place: {
		type: String,
		required: [true, 'Place is mandatory.']
	},
	location: {
		lat: Number,
		long: Number
	},
	city: {
		type: String,
		enum: ['Madrid','Barcelona', 'Other'],
        default: 'Other'
	},
	languages: {
		type: [String],
		enum: ["English", "French", "Spanish", "German"]
	},
	assist: {
		type: [Schema.Types.ObjectId],
		ref: 'User'
	}
}, {
	timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Meetup = mongoose.model("Meetup", meetupSchema);

module.exports = Meetup;