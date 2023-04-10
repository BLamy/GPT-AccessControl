export default {
  "rules": [
    {
      "role": "admin",
      "access": "all"
    },
    {
      "role": "employee",
      "access": "non_confidential"
    },
    {
      "username": "BillyBob",
      "access": "confidential"
    },
    {
      "access": "public",
      "ban_list": [
        "Mike"
      ]
    }
  ]
} as const;