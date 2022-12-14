import mongoose from "mongoose";


const NoteSchema = new mongoose.Schema({
    note: {
        type: Object,
        required: false,
        default: null
    },
    plainText: {
        type: String,
        required: false,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
},
    {
        // timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }
        timestamps: true
    }
)


const ConnectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    profileUrl: {
        type: String,
        default: ""
    },
    uid: {
        type: mongoose.Types.ObjectId,
        auto: true
    },
    personnelNote: NoteSchema,

    meetingNotes: [NoteSchema],

    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now,
    // }

}, { timestamps: true })








const NotesSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        require: true,
        index: true,
    },

    personnelNote: NoteSchema,
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now,
    // },

    connections: [ConnectionSchema],

}, { timestamps: true });

export default mongoose.models.Notes || mongoose.model("Notes", NotesSchema);