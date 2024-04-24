function memberRole(message, role_name) {
  const role = message.member.roles.cache.find((el) => el.name == role_name);
  return role;
}

module.exports = memberRole;
