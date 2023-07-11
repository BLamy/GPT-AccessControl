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
      "username": "Zach",
      "role": "admin"
    }
  ]
} as const;