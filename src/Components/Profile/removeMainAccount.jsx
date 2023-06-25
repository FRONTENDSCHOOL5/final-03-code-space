export function removeFollowerById(obj, followerId) {
  if (obj && obj.follower) {
    obj.follower = obj.follower.filter(id => id !== followerId);
  }
  return obj;
}
