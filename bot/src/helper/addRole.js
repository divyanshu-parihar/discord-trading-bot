function addRole(message, role_name) {
  const role = message.guild.roles.cache.find((el) => el.name == role_name);
  if (role) message.member.roles.add(role);
  else throw Error("Role not found");
}
module.exports = addRole;
