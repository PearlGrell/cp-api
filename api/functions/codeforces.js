const fetch = require('node-fetch-commonjs');

exports.fetchCodeforcesData = async(username) =>{
  const baseUrl = 'https://codeforces.com/api'
  const url = `${baseUrl}/user.info?handles=${username}`

  try {
    const response = await fetch(url)

    const data = await response.json()

    if (data.status === 'OK' && data.result?.length > 0) {
      const user = data.result[0]

      if(user.firstName && user.lastName) {
        var name = `${user.firstName} ${user.lastName}`
      } else {
        var name = 'N/A'
      }
      
      return {
        name: name,
        rating: user.rating ?? 0,
        handle: user.handle ?? 'N/A',
        contribution: user.contribution ?? 0,
        rank: user.rank ?? 'N/A',
        maxRating: user.maxRating ?? 0,
        maxRank: user.maxRank ?? 'N/A',
      }
    } else {
        return { message: 'User not found' }
    }
  } catch (error) {
    console.error('Error fetching Codeforces data:', error)
    return { message: error?.message };
  }
}

exports.codeforcesContest = async (usernames, contestId) => {
  const baseUrl = 'https://codeforces.com/api';
  const url = `${baseUrl}/contest.standings?contestId=${contestId}&handles=${usernames.join(';')}`;
  
  try {
      const response = await fetch(url);
  
      const data = await response.json();
  
      if (data.status === 'OK') {
      const contest = data.result;
  
      const standings = contest.rows.map((row) => {
          return {
          rank: row.rank,
          handle: row.party.members[0].handle,
          points: row.points,
          penalty: row.penalty,
          successfulHackCount: row.successfulHackCount,
          unsuccessfulHackCount: row.unsuccessfulHackCount,
          problemResults: row.problemResults.map((problem) => {
              return {
              points: problem.points,
              rejectedAttemptCount: problem.rejectedAttemptCount,
              type: problem.type,
              };
          }),
          };
      });
  
      return {
          contestId: contest.contest.id,
          contestName: contest.contest.name,
          standings: standings,
      };
      } else {
      return { message: 'Contest not found' };
      }
  } catch (error) {
      console.error('Error fetching Codeforces contest data:', error);
      return { message: error?.message };
  }
}

exports.codeforcesLatestContest = async (usernames) => {
  const baseUrl = 'https://codeforces.com/api';
  const url = `${baseUrl}/contest.list?gym=false`;
  
  try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === "OK") {
          const contests = data.result;
          const finishedContests = contests.filter(c => c.phase === 'FINISHED');
          
          if (finishedContests.length === 0) {
              return { message: 'No finished contests found.' };
          }
  
          const latestContest = finishedContests[0];
          return await this.codeforcesContest(usernames, latestContest.id);
      } else {
          return { message: 'Contest list could not be fetched.' };
      }
  } catch (error) {
      console.error('Error fetching Codeforces contest data:', error);
      return { message: error?.message };
  }
};

exports.codeforcesCurrentContest = async (usernames) => {
  const baseUrl = 'https://codeforces.com/api';
  const url = `${baseUrl}/contest.list?gym=false`;
  
  try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === "OK") {
          const contests = data.result;
          const runningContests = contests.filter(c => c.phase === 'CODING');
          
          if (runningContests.length === 0) {
              return { message: 'No contests ongoing' };
          }
  
          const latestContest = runningContests[0];
          return await this.codeforcesContest(usernames, latestContest.id);
      } else {
          return { message: 'No contest is currently ongoing, or no participants from the provided list were found' };
      }
  } catch (error) {
      console.error('Error fetching Codeforces contest data:', error);
      return { message: error?.message };
  }
}

exports.codeforcesUpcomingContest = async () => {
  const baseUrl = 'https://codeforces.com/api';
  const url = `${baseUrl}/contest.list?gym=false`;
  
  try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === "OK") {
          const contests = data.result;
          const upcomingContests = contests.filter(c => c.phase === 'BEFORE');
          
          if (upcomingContests.length === 0) {
              return { message: 'No upcoming contests found.' };
          }
  
          const nextContest = upcomingContests[0];
          return {
              contestId: nextContest.id,
              contestName: nextContest.name,
              startTime: nextContest.startTimeSeconds,
          };
      } else {
          return { message: 'Contest list could not be fetched.' };
      }
  } catch (error) {
      console.error('Error fetching Codeforces contest data:', error);
      return { message: error?.message };
  }
}