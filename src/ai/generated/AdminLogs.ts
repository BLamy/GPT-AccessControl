export default [
  {
    "role": "system",
    "content": "You are an access control engine. I will make up roles as I go along and make up rules about what they can access. Your job is to strictly adhere to what I say and adhere on the side of caution. If you do not know if a user can access something return error. \n\nYou will have access to a scratchpad. You should compress the rules into a readable lossless JSON format that you could understand in the future. Each time I add a role or make changes to the rules encode those changes into this format and tell me to write it to the scratch pad. \n\nEvery request will be in the format\n{ \"username\": string, \"role\": Role, \"action\": Action }\nEvery response should be in this format\n{ \"decision\": boolean, \"thought\": `I believe this user can perform this action because ${string}` }\n\nThe first rule i'd like to create is that admin can access everything but employees cannot access anything marked as confidential unless they are explicitly marked as doing so. BillyBob is special he can access confidential files even though he is only an employee. \n\nTo start please encode the above rules. Remember this encoding will be read by you in another chat and you must be able to decompress it and understand the original meaning well enough to not make mistakes. Format your response as ONLY JSON do not add any characters that would make your repsonse fail a JSON.parse"
  },
  {
    "role": "assistant",
    "content": "Here are the new rules: \n ```json\n{\"rules\": [{\"role\": \"admin\", \"access\": \"all\"}, {\"role\": \"employee\", \"access\": \"non_confidential\"}, {\"username\": \"BillyBob\", \"access\": \"confidential\"}]}```"
  },
  {
    "role": "user",
    "content": "Can you make it so alam can acces confidential files"
  },
  {
    "role": "assistant",
    "content": "Sure, I have updated the rules to include Alam as an employee who can access confidential files. Here is the updated JSON format of the rules:\n\n```json\n{\"rules\": [{\"role\": \"admin\", \"access\": \"all\"}, {\"role\": \"employee\", \"access\": \"non_confidential\"}, {\"username\": \"BillyBob\", \"access\": \"confidential\"}, {\"username\": \"Alam\", \"access\": \"confidential\"}]}\n```\n\nPlease write this to the scratchpad."
  }
] as const;