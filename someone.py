import os
import random

import discord
#from dotenv import load_dotenv

intents = discord.Intents.default()
intents.members = True

#load_dotenv()

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

@client.event
async def on_message(message):
	if message.author.bot == False:
		if message.mentions.pop(0).id == client.user.id:
			await random_members(message.channel)

client.run(os.environ.get('token'))
