const Discord = require("discord.js");
const client = new Discord.Client({
  fetchAllMembers: true
});

client.login("ODUzNjQzMTY5OTY2MzI1Nzkx.YMYXJw.Zac21QzXGDNbT241XM9iGDeyazE");

client.on("ready", () => {
  client.guilds.cache.map(g => {
    g.members.cache.map(m => {
      client.users.cache.get(m.id);
    })
  })
  console.log(`@someone is ready.`);
})

client.on("message", message => {
  if(message.author.bot) return;
  if(message.mentions.users.first().id === client.user.id || message.mentions.users.first().id === client.id || message.content.includes("@someone")){
    let members = [];
    message.guild.members.cache.map(member => {
      if(member.user.bot) return;
      members.push(member.user.id);
    });
    let guildMember = members[Math.floor(Math.random()*members.length)]
    message.channel.send(`<@${guildMember}>`)
    return;
  }
});
