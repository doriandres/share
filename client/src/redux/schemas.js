import { schema } from 'normalizr';

const entityOptions = {
  idAttribute : '_id'
};

export const userSchema = new schema.Entity('users', {}, entityOptions);
export const commentSchema = new schema.Entity('comments',{
  user : userSchema
}, entityOptions);
export const likeSchema = new schema.Entity('likes',{
  user : userSchema
}, entityOptions);
export const postSchema = new schema.Entity('posts', {
  user : userSchema,
  comments : [commentSchema],
  likes : [likeSchema] 
}, entityOptions);
userSchema.define({
  followers : [userSchema],
  following : [userSchema],
  posts : [postSchema]
});