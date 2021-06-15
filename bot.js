const Discord = require("discord.js");
const client = new Discord.Client({
  fetchAllMembers: true
});
login();

function login(){
  console.log(process.env.TOKEN)
  client.login(process.env.TOKEN)
  console.log("Logging in using process.env")
  //console.log("Logging in using raw token");
  //client.login("ODUzNjQzMTY5OTY2MzI1Nzkx.YMYXJw.Zac21QzXGDNbT241XM9iGDeyazE");
  // DON'T YOU LOOK AT THE TOKEN?! it was regenerated anyway :)
}

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
  const p = message.mentions.users.first();
  if(p && p.id === client.user.id || p && p.id === client.id){
    let members = [];
    message.guild.members.cache.map(member => {
      members.push(member.user.id);
    });
    let guildMember = members[Math.floor(Math.random()*members.length)]
    message.channel.send(`<@${guildMember}>`)
    return;
  } else return;
});
