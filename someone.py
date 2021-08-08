import os
import random

import discord
from dotenv import load_dotenv

intents = discord.Intents.default()
intents.members = True

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')

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
			#members = message.guild.members
			#count = message.guild.member_count - 1
			#m = random.sample(members, count)
			#await message.channel.send('<@{m.id}>')
	else:
		return

client.run(TOKEN)
