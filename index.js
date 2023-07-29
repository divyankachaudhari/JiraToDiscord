const express = require('express');
const axios = require('axios');
const app = express();

const DISCORD_WEBHOOK_URL = 'Hidden';

app.use(express.json());

app.post('/jira-webhook', (req, res) => {
  // Extract information from Jira webhook payload
  const issueKey = req.body.issue.key;
  const summary = req.body.issue.fields.summary;
  const status = req.body.issue.fields.status.name;

  // Create message for Discord
  const message = {
    content: `Issue ${issueKey}: ${summary} is now in ${status}.`,
  };

  // Send message to Discord
  axios.post(DISCORD_WEBHOOK_URL, message);

  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
