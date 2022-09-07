import mongoose from "mongoose";


const NoteSchema = new mongoose.Schema({
    note: {
        type: Object,
        required: false,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})


const ConnectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    personnel_note: NoteSchema,

    meeting_notes: [NoteSchema],

    createdAt: {
        type: Date,
        default: Date.now,
    }

})








const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    emailVerified: {
        type: Boolean,
        required: true,
    },
    image: {
        type: String,
    },

    personnel_note: NoteSchema,

    createdAt: {
        type: Date,
        default: Date.now,
    },

    connections: [ConnectionSchema],

});

export default mongoose.models.User || mongoose.model("User", UserSchema);