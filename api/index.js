const express = require('express');

import {fetchCodeChefData} from './functions/codechef';
import {fetchCodeforcesData} from './functions/codeforces';
import {fetchGeeksForGeeksData} from './functions/geeksforgeeks';
import {fetchLeetCodeData} from './functions/leetcode';

const app = express();

app.get('/', async (request, response) => {
    response.send('Hello World!');
});

// Fetch data from the platform based on the platform and username
app.get('/fetch/:platform/:username', async (request, response) => {
    const { platform, username } = request.params

    if (platform === 'codeforces') {
        const data = await fetchCodeforcesData(username)
        return response.json(data)
    } else if (platform === 'geeksforgeeks') {
        const data = await fetchGeeksForGeeksData(username)
        return response.json(data)
    } else if (platform === 'codechef') {
        const data = await fetchCodeChefData(username)
        return response.json(data)
    } else if (platform === 'leetcode') {
        const data = await fetchLeetCodeData(username)
        return response.json(data)
    } else {
        return response.json({ message: 'Invalid platform' })
    }
})

// Fetch data from all platforms based on the username
app.get('/fetch-all/:username', async (request, response) => {
    const { username } = request.params

    const codeforcesData = await fetchCodeforcesData(username)
    const geeksForGeeksData = await fetchGeeksForGeeksData(username)
    const codeChefData = await fetchCodeChefData(username)
    const leetCodeData = await fetchLeetCodeData(username)

    return response.json({ codeforces: codeforcesData, geeksforgeeks: geeksForGeeksData, codechef: codeChefData, leetcode: leetCodeData })
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

export default app;