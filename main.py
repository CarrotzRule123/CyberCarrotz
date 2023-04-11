
import discord
import openai
import os

DISCORD_API_KEY = os.getenv("DISCORD_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

openai.api_key = OPENAI_API_KEY

intents = discord.Intents.default()
intents.message_content = True

client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('>chat'):
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant. You are CyberCarrotz. You are an AI language model created by CarrotzRule123."},
                {"role": "user", "content": message.content[4:]},
            ]
        )
        await message.channel.send(response.choices[0].message.content)

client.run(DISCORD_API_KEY)