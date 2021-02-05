const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    title: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId
            }

        }

    ],
    comments: [
        {
            commentbody: {
                type: String
            },
            commentuser: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }

        }
    ],
    user: {
       
            type: Schema.Types.ObjectId,
            ref: 'user'

       

    }
})

module.exports = mongoose.model("posts", Post)