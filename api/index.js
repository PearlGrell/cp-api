const express = require('express');

import {fetchCodeChefData} from './functions/codechef';
import {fetchCodeforcesData, codeforcesContest, codeforcesLatestContest, codeforcesCurrentContest, codeforcesUpcomingContest} from './functions/codeforces';
import {fetchGeeksForGeeksData} from './functions/geeksforgeeks';
import {fetchLeetCodeData} from './functions/leetcode';

const app = express();

app.use(express.json());

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
});

// Fetch data from all platforms based on the username
app.get('/fetch-all/:username', async (request, response) => {
    const { username } = request.params

    const codeforcesData = await fetchCodeforcesData(username)
    const geeksForGeeksData = await fetchGeeksForGeeksData(username)
    const codeChefData = await fetchCodeChefData(username)
    const leetCodeData = await fetchLeetCodeData(username)

    return response.json({ codeforces: codeforcesData, geeksforgeeks: geeksForGeeksData, codechef: codeChefData, leetcode: leetCodeData })
});

// Fetch contest data from the platform based on the platform and contestId
app.post('/contest/:platform', async (request, response) => {
    const { platform } = request.params

    const {usernames, contestId} = request.body

    if (platform === 'codeforces') {
        const data = await codeforcesContest(
            usernames,
            contestId
        )
        return response.json(data)
    } else {
        return response.json({ message: 'Invalid platform' })
    }
});

// Fetch latest contest data from the platform based on the platform
app.post('/contest/:platform/latest', async (request, response) => {
    const { platform } = request.params

    const {usernames} = request.body

    if (platform === 'codeforces') {
        const data = await codeforcesLatestContest(
            usernames
        )
        return response.json(data)
    } else {
        return response.json({ message: 'Invalid platform' })
    }
});

// Fetch ongoing contest data from the platform based on the platform
app.post('/contest/:platform/current', async (request, response) => {
    const { platform } = request.params

    const {usernames} = request.body

    if (platform === 'codeforces') {
        const data = await codeforcesCurrentContest(
            usernames
        )
        return response.json(data)
    } else {
        return response.json({ message: 'Invalid platform' })
    }
});

//Fetch upcoming contest data from the platform based on the platform
app.get('/contest/:platform/upcoming', async (request, response) => {
    const { platform } = request.params

    if (platform === 'codeforces') {
        const data = await codeforcesUpcomingContest()
        return response.json(data)
    } else {
        return response.json({ message: 'Invalid platform' })
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

export default app;