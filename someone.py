import discord, os, random, json

intents = discord.Intents.default()
intents.members = True

def token():
	file = open("token.json", "r")
	json_object = json.load(file)
	file.close()
	token = str(json_object['token'])
	return token

async def random_members(ctx):
	ctx.guild.fetch_members(limit=None)
	members = ctx.guild.members
	random_members = random.choice(members)
	print(f'{members}')
	await ctx.send(f'{random_members.id}')

client = discord.Client(intents=intents)

@client.event
async def on_ready():
	print(f'Logged in as {client.user}.')
	await client.change_presence(game=discord.Game(name="Ping me!"))

@client.event
async def on_message(message):
	if message.author.bot == False:
		if message.mentions.pop(0).id == client.user.id:
			await random_members(message.channel)

client.run(get_token())
